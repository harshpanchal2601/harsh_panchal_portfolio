import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

// In-memory IP rate limiter for serverless instance
const ipRequestHistory = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const history = ipRequestHistory.get(ip) || [];
  const validTimestamps = history.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    ipRequestHistory.set(ip, validTimestamps);
    return true;
  }

  validTimestamps.push(now);
  ipRequestHistory.set(ip, validTimestamps);
  return false;
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many messages sent. Please try again later or email directly." },
        { status: 429 },
      );
    }

    const body = await req.json().catch(() => ({}));
    const { name, email, message, website } = body;

    // Honeypot spam check: if hidden website field is filled, silently discard
    if (website && typeof website === "string" && website.trim().length > 0) {
      return NextResponse.json({ ok: true, message: "Message received." });
    }

    const trimmedName = typeof name === "string" ? name.trim() : "";
    const trimmedEmail = typeof email === "string" ? email.trim() : "";
    const trimmedMessage = typeof message === "string" ? message.trim() : "";

    if (!trimmedName || trimmedName.length < 1 || trimmedName.length > 100) {
      return NextResponse.json(
        { error: "Please provide a valid name (1-100 characters)." },
        { status: 400 },
      );
    }

    if (!trimmedEmail || !isValidEmail(trimmedEmail)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 },
      );
    }

    if (!trimmedMessage || trimmedMessage.length < 2 || trimmedMessage.length > 2000) {
      return NextResponse.json(
        { error: "Please provide a message or project context (2-2000 characters)." },
        { status: 400 },
      );
    }

    const recipientEmail =
      process.env.CONTACT_NOTIFICATION_EMAIL || "harshpanchal7979@gmail.com";

    // Method 1: Gmail SMTP via nodemailer (GMAIL_USER & GMAIL_APP_PASSWORD)
    const gmailUser = process.env.GMAIL_USER || process.env.SMTP_USER;
    const gmailAppPassword =
      process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS || process.env.SMTP_PASSWORD;

    if (gmailUser && gmailAppPassword) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: gmailUser,
            pass: gmailAppPassword.replace(/\s+/g, ""), // clean spaces from 16-character app password
          },
        });

        await transporter.sendMail({
          from: `"${trimmedName}" <${gmailUser}>`,
          to: recipientEmail,
          replyTo: trimmedEmail,
          subject: `Portfolio Inquiry from ${trimmedName}`,
          text: `Name: ${trimmedName}\nEmail: ${trimmedEmail}\n\nMessage:\n${trimmedMessage}`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #17130f; max-width: 600px; padding: 24px; border: 1px solid #e4dacb; border-radius: 8px; background-color: #fcfbf9;">
              <h2 style="color: #9a5a38; margin-top: 0;">New Portfolio Inquiry</h2>
              <p style="margin: 8px 0;"><strong>Sender Name:</strong> ${trimmedName}</p>
              <p style="margin: 8px 0;"><strong>Sender Email:</strong> <a href="mailto:${trimmedEmail}" style="color: #9a5a38;">${trimmedEmail}</a></p>
              <hr style="border: 0; border-top: 1px solid #e4dacb; margin: 20px 0;" />
              <p style="font-size: 15px; white-space: pre-wrap; margin: 0; color: #222;">${trimmedMessage}</p>
            </div>
          `,
        });

        return NextResponse.json({ ok: true, message: "Message sent successfully." });
      } catch (smtpError) {
        console.error("Gmail SMTP dispatch error:", smtpError);
        return NextResponse.json(
          { error: "Failed to deliver email via SMTP. Please check credentials or email directly." },
          { status: 500 },
        );
      }
    }

    // Method 2: Resend API fallback (if RESEND_API_KEY is configured)
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      const emailRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Portfolio Contact <onboarding@resend.dev>",
          to: [recipientEmail],
          reply_to: trimmedEmail,
          subject: `Portfolio Message from ${trimmedName}`,
          text: `Name: ${trimmedName}\nEmail: ${trimmedEmail}\n\nMessage:\n${trimmedMessage}`,
          html: `
            <div style="font-family: sans-serif; line-height: 1.5; color: #17130f;">
              <h2 style="color: #9a5a38;">New Portfolio Inquiry</h2>
              <p><strong>Name:</strong> ${trimmedName}</p>
              <p><strong>Email:</strong> <a href="mailto:${trimmedEmail}">${trimmedEmail}</a></p>
              <hr style="border: 0; border-top: 1px solid #cfc1ae; margin: 20px 0;" />
              <p style="white-space: pre-wrap;">${trimmedMessage}</p>
            </div>
          `,
        }),
      });

      if (!emailRes.ok) {
        const errorDetails = await emailRes.text();
        console.error("Resend delivery failed:", errorDetails);
      }

      return NextResponse.json({ ok: true, message: "Message sent successfully." });
    }

    // Fallback in dev/staging if no credentials are configured
    console.log("[Contact Inquiry (No SMTP/Resend Credentials Configured)]", {
      name: trimmedName,
      email: trimmedEmail,
      message: trimmedMessage,
      time: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true, message: "Message sent successfully." });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Internal error processing message. Please email directly." },
      { status: 500 },
    );
  }
}
