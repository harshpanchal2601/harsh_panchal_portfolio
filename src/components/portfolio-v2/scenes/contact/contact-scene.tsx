"use client";

import { FormEvent, useLayoutEffect, useRef, useState } from "react";

import { playContactScene } from "@/components/portfolio-v2/scenes/contact/contact-motion";
import { trackEvent } from "@/lib/analytics";

import "@/components/portfolio-v2/scenes/contact/contact-scene.css";

const CONTACT_EMAIL = "harshpanchal7979@gmail.com";
const LINKEDIN_HREF = "https://www.linkedin.com/in/harshpanchal2601/";
const GITHUB_HREF = "https://github.com/harshpanchal2601";
const RESUME_HREF = "/Harsh-Panchal-Resume.pdf";

const HEADLINE_LINES = [
  "READY TO TURN",
  "YOUR NEXT IDEA INTO",
  "PRODUCTION",
] as const;

function HeadlineCopy() {
  return (
    <>
      <span className="v2-contact-line">{HEADLINE_LINES[0]}</span>
      <span className="v2-contact-line">{HEADLINE_LINES[1]}</span>
      <span className="v2-contact-line">
        {HEADLINE_LINES[2]}
        <span className="v2-contact-mark">?</span>
      </span>
    </>
  );
}

type FormState = "idle" | "validating" | "sending" | "success" | "error";

export function ContactScene() {
  const rootRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState<FormState>("idle");
  const [statusMessage, setStatusMessage] = useState<string>("");

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const context = playContactScene(root);
    return () => {
      context.revert();
    };
  }, []);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formState === "sending") {
      return;
    }

    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const website = String(data.get("website") ?? "").trim();

    // Client-side quick checks
    if (!name) {
      setFormState("error");
      setStatusMessage("Please enter your name.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setFormState("error");
      setStatusMessage("Please enter a valid email address.");
      return;
    }

    if (!message || message.length < 2) {
      setFormState("error");
      setStatusMessage("Please provide a short message or project context.");
      return;
    }

    setFormState("sending");
    setStatusMessage("");
    trackEvent("contact_submit", { nameLength: name.length });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, website }),
      });

      const resData = await response.json().catch(() => ({}));

      if (response.ok && resData.ok) {
        setFormState("success");
        setStatusMessage("MESSAGE SENT. I'LL GET BACK TO YOU SOON.");
        trackEvent("contact_success");
        form.reset();
      } else {
        setFormState("error");
        setStatusMessage(
          resData.error || "COULDN'T SEND THAT. TRY AGAIN OR EMAIL ME DIRECTLY.",
        );
        trackEvent("contact_error", { error: resData.error });
      }
    } catch {
      setFormState("error");
      setStatusMessage("COULDN'T SEND THAT. TRY AGAIN OR EMAIL ME DIRECTLY.");
      trackEvent("contact_error", { error: "Network/Fetch error" });
    }
  };

  return (
    <section
      aria-labelledby="v2-contact-heading"
      className="v2-contact"
      data-scene-header-tone="light"
      data-v2-scene="contact"
      id="contact"
      ref={rootRef}
    >
      <div className="v2-contact-inner">
        <p className="v2-contact-kicker" data-contact-kicker="">
          06 / Contact
        </p>

        <div
          className="v2-contact-visual"
          data-contact-pointer=""
          data-contact-visual=""
        >
          <div className="v2-contact-layers">
            <h1
              className="v2-contact-layer v2-contact-layer--base"
              id="v2-contact-heading"
            >
              <HeadlineCopy />
            </h1>
            <div
              aria-hidden="true"
              className="v2-contact-layer v2-contact-layer--accent"
            >
              <HeadlineCopy />
            </div>
          </div>
        </div>

        <form
          className="v2-contact-form"
          data-contact-form=""
          data-form-state={formState}
          onSubmit={onSubmit}
          ref={formRef}
          noValidate
        >
          {/* Honeypot field for bot protection */}
          <div style={{ display: "none" }} aria-hidden="true">
            <label htmlFor="v2-contact-website">Website</label>
            <input
              id="v2-contact-website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <label className="v2-contact-field">
            <span>Name</span>
            <input
              autoComplete="name"
              id="v2-contact-name"
              maxLength={100}
              name="name"
              placeholder="Your name"
              required
              type="text"
            />
          </label>

          <label className="v2-contact-field">
            <span>Email</span>
            <input
              autoComplete="email"
              id="v2-contact-email"
              maxLength={254}
              name="email"
              placeholder="name@domain.com"
              required
              type="email"
            />
          </label>

          <label className="v2-contact-field v2-contact-field--message">
            <span>Message / Project</span>
            <input
              autoComplete="off"
              id="v2-contact-message"
              maxLength={2000}
              name="message"
              placeholder="Project details or timeline..."
              required
              type="text"
            />
          </label>

          <button
            aria-label="Send contact inquiry"
            className="v2-contact-submit"
            disabled={formState === "sending"}
            type="submit"
          >
            <span>
              {formState === "sending"
                ? "Sending..."
                : formState === "success"
                  ? "Sent"
                  : "Let's Talk"}
            </span>
            <span aria-hidden="true" className="v2-contact-submit-arrow">
              ↗
            </span>
          </button>
        </form>

        {/* Editorial status feedback */}
        {statusMessage ? (
          <div
            aria-live="polite"
            className={`v2-contact-status v2-contact-status--${formState}`}
            role="status"
          >
            <p>{statusMessage}</p>
          </div>
        ) : null}

        <div className="v2-contact-rail" data-contact-rail="">
          <div className="v2-contact-rail-group">
            <span>Follow</span>
            <a
              aria-label="Harsh Panchal on LinkedIn (opens in new tab)"
              href={LINKEDIN_HREF}
              onClick={() => trackEvent("linkedin_click")}
              rel="noopener noreferrer"
              target="_blank"
            >
              LinkedIn ↗
            </a>
            <a
              aria-label="Harsh Panchal on GitHub (opens in new tab)"
              href={GITHUB_HREF}
              onClick={() => trackEvent("github_click", { url: GITHUB_HREF })}
              rel="noopener noreferrer"
              target="_blank"
            >
              GitHub ↗
            </a>
            <a
              aria-label="Harsh Panchal Resume PDF (opens in new tab)"
              href={RESUME_HREF}
              onClick={() => trackEvent("resume_click")}
              rel="noopener noreferrer"
              target="_blank"
            >
              Resume ↗
            </a>
          </div>
          <div className="v2-contact-rail-group v2-contact-rail-group--write">
            <span>Write</span>
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </div>
        </div>

        <footer className="v2-contact-end" data-contact-end="">
          <p>© {new Date().getFullYear()} Harsh Panchal</p>
          <p>Thanks for scrolling.</p>
        </footer>
      </div>
    </section>
  );
}
