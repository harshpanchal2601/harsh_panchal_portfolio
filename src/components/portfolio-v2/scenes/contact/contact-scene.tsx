"use client";

import { FormEvent, useLayoutEffect, useRef } from "react";

import { playContactScene } from "@/components/portfolio-v2/scenes/contact/contact-motion";

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

function openMailto(name: string, email: string): void {
  const subject = encodeURIComponent("Let's talk — Harsh Panchal");
  const body = encodeURIComponent(
    `Hi Harsh,\n\nMy name is ${name || "[name]"}.\nEmail: ${email || "[email]"}\n\n`,
  );

  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
}

export function ContactScene() {
  const rootRef = useRef<HTMLElement>(null);

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

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    openMailto(name, email);
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

        <form className="v2-contact-form" data-contact-form="" onSubmit={onSubmit}>
          <label className="v2-contact-field">
            <span>Name</span>
            <input autoComplete="name" name="name" type="text" />
          </label>
          <label className="v2-contact-field">
            <span>Email</span>
            <input autoComplete="email" name="email" type="email" />
          </label>
          <button className="v2-contact-submit" type="submit">
            <span>Let&apos;s Talk</span>
            <span aria-hidden="true" className="v2-contact-submit-arrow">
              ↗
            </span>
          </button>
        </form>

        <div className="v2-contact-rail" data-contact-rail="">
          <div className="v2-contact-rail-group">
            <span>Follow</span>
            <a href={LINKEDIN_HREF} rel="noopener noreferrer" target="_blank">
              LinkedIn
            </a>
            <a href={GITHUB_HREF} rel="noopener noreferrer" target="_blank">
              GitHub
            </a>
            <a href={RESUME_HREF} rel="noopener noreferrer" target="_blank">
              Resume
            </a>
          </div>
          <div className="v2-contact-rail-group v2-contact-rail-group--write">
            <span>Write</span>
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </div>
        </div>

        <footer className="v2-contact-end" data-contact-end="">
          <p>© 2026 Harsh Panchal</p>
          <p>Thanks for scrolling.</p>
        </footer>
      </div>
    </section>
  );
}
