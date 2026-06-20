"use client";

import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll";
import { useMagneticEffect } from "@/hooks/use-magnetic-effect";

export function ContactSection() {
  useRevealOnScroll();
  useMagneticEffect();

  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop" id="contact">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white border border-stone-border rounded-2xl premium-shadow overflow-hidden relative reveal-on-scroll">
          <div className="p-10 md:p-20 text-center relative z-10">
            <h2 className="font-display text-[48px] mb-6 reveal-on-scroll" style={{ transitionDelay: "100ms" }}>
              Let's build something exceptional.
            </h2>
            <p className="font-body-md text-body-lg text-[#44474d] mb-12 max-w-xl mx-auto reveal-on-scroll" style={{ transitionDelay: "200ms" }}>
              Available for freelance projects, full-time engineering roles, and technical consulting.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <a
                className="flex items-center gap-3 px-8 py-4 bg-primary-container text-on-primary rounded-full magnetic-btn font-label-md reveal-on-scroll"
                href="mailto:harshpanchal7979@gmail.com"
                style={{ transitionDelay: "300ms" }}
              >
                <span className="material-symbols-outlined">mail</span>
                Email Me
              </a>
              <div className="flex gap-4 reveal-on-scroll" style={{ transitionDelay: "400ms" }}>
                <a
                  className="w-14 h-14 border border-stone-border rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all magnetic-btn"
                  href="https://github.com/harshpanchal2601"
                  title="GitHub"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path>
                  </svg>
                </a>
                <a
                  className="w-14 h-14 border border-stone-border rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all magnetic-btn"
                  href="https://www.linkedin.com/in/harshpanchal2601/"
                  title="LinkedIn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
