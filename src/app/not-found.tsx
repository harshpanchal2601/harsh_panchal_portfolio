import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page Not Found | Harsh Panchal",
  description: "The requested page does not exist.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#efe4d2",
        color: "#17130f",
        padding: "2rem",
        textAlign: "center",
        fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
      }}
    >
      <div style={{ maxWidth: "36rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>
        <p
          style={{
            margin: 0,
            fontSize: "0.85rem",
            fontWeight: 600,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#9a5a38",
          }}
        >
          404 / Error
        </p>

        <h1
          style={{
            margin: 0,
            fontSize: "clamp(2.75rem, 8vw, 4.5rem)",
            fontWeight: 450,
            letterSpacing: "-0.04em",
            lineHeight: 1.0,
            textTransform: "uppercase",
          }}
        >
          Wrong Turn.
        </h1>

        <p
          style={{
            margin: 0,
            fontSize: "clamp(1rem, 2vw, 1.25rem)",
            color: "rgba(23, 19, 15, 0.72)",
            lineHeight: 1.45,
            maxWidth: "28rem",
          }}
        >
          The page you&apos;re looking for doesn&apos;t exist, was moved, or is no longer available.
        </p>

        <Link
          href="/"
          style={{
            marginTop: "1rem",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.9rem 2rem",
            backgroundColor: "#17130f",
            color: "#f3e4d0",
            textDecoration: "none",
            fontSize: "0.85rem",
            fontWeight: 500,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            transition: "background-color 200ms ease",
          }}
        >
          <span>← Back to Home</span>
        </Link>
      </div>
    </main>
  );
}
