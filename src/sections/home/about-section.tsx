"use client";

import { useEffect, useState } from "react";
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll";

export function AboutSection() {
  useRevealOnScroll();
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = { 
        timeZone: "Asia/Kolkata", 
        hour: "2-digit", 
        minute: "2-digit", 
        hour12: true 
      };
      setTime(new Intl.DateTimeFormat("en-US", options).format(new Date()) + " IST");
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto" id="about">
      <div className="mb-16">
        <h2 className="font-headline-lg text-headline-lg mb-4 reveal-on-scroll">Core Identity</h2>
        <div className="w-12 h-1 bg-primary reveal-on-scroll" style={{ transitionDelay: "100ms" }}></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Large Card */}
        <div className="md:col-span-2 bg-white border border-stone-border p-10 rounded-xl premium-shadow reveal-on-scroll">
          <span className="material-symbols-outlined text-primary text-4xl mb-6">rocket_launch</span>
          <h3 className="font-headline-md text-headline-md mb-4 reveal-on-scroll" style={{ transitionDelay: "50ms" }}>Current Focus</h3>
          <p className="font-body-md text-body-md text-[#44474d] leading-relaxed reveal-on-scroll" style={{ transitionDelay: "100ms" }}>
            I am currently architecting scalable web applications that prioritize user experience without compromising on performance. My philosophy centers on "The Work" – ensuring every line of code serves a functional and aesthetic purpose.
          </p>
        </div>
        
        {/* Location Card */}
        <div className="bg-white border border-stone-border p-10 rounded-xl premium-shadow flex flex-col justify-between reveal-on-scroll" style={{ transitionDelay: "150ms" }}>
          <div>
            <span className="material-symbols-outlined text-primary text-4xl mb-6">location_on</span>
            <h3 className="font-headline-md text-headline-md mb-2 reveal-on-scroll" style={{ transitionDelay: "50ms" }}>India</h3>
            <p className="font-label-md text-label-md text-[#44474d] reveal-on-scroll" style={{ transitionDelay: "100ms" }}>Working Remotely Globally</p>
          </div>
          <div className="mt-8 border-t border-stone-border pt-4">
            <div className="flex justify-between items-center">
              <span className="font-label-sm text-label-sm uppercase opacity-50 reveal-on-scroll" style={{ transitionDelay: "150ms" }}>Local Time</span>
              <span className="font-label-md text-label-md reveal-on-scroll" style={{ transitionDelay: "200ms" }}>{time}</span>
            </div>
          </div>
        </div>

        {/* Tech Stack Card */}
        <div className="bg-white border border-stone-border p-10 rounded-xl premium-shadow reveal-on-scroll" style={{ transitionDelay: "200ms" }}>
          <h3 className="font-label-md text-label-md uppercase tracking-widest mb-6 opacity-50 reveal-on-scroll" style={{ transitionDelay: "50ms" }}>Tech Stack</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-3 reveal-on-scroll" style={{ transitionDelay: "100ms" }}>
              <span className="w-4 h-[1px] bg-primary"></span>
              <span className="font-body-md text-body-md">React / Next.js</span>
            </li>
            <li className="flex items-center gap-3 reveal-on-scroll" style={{ transitionDelay: "150ms" }}>
              <span className="w-4 h-[1px] bg-primary"></span>
              <span className="font-body-md text-body-md">TypeScript</span>
            </li>
            <li className="flex items-center gap-3 reveal-on-scroll" style={{ transitionDelay: "200ms" }}>
              <span className="w-4 h-[1px] bg-primary"></span>
              <span className="font-body-md text-body-md">Node.js / Express</span>
            </li>
          </ul>
        </div>

        {/* Experience Card */}
        <div className="md:col-span-2 bg-primary-container text-on-primary p-10 rounded-xl reveal-on-scroll" style={{ transitionDelay: "250ms" }}>
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="font-headline-md text-headline-md mb-2 reveal-on-scroll" style={{ transitionDelay: "50ms" }}>Full Stack Mastery</h3>
              <p className="opacity-70 font-body-md text-body-md reveal-on-scroll" style={{ transitionDelay: "100ms" }}>Developing end-to-end digital experiences.</p>
            </div>
            <span className="material-symbols-outlined text-4xl opacity-20">code</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="reveal-on-scroll" style={{ transitionDelay: "150ms" }}>
              <div className="text-[40px] leading-tight font-bold mb-1">20+</div>
              <div className="text-label-sm uppercase tracking-tighter opacity-50">Projects Built</div>
            </div>
            <div className="reveal-on-scroll" style={{ transitionDelay: "200ms" }}>
              <div className="text-[40px] leading-tight font-bold mb-1">03+</div>
              <div className="text-label-sm uppercase tracking-tighter opacity-50">Years Exp</div>
            </div>
            <div className="reveal-on-scroll" style={{ transitionDelay: "250ms" }}>
              <div className="text-[40px] leading-tight font-bold mb-1">99%</div>
              <div className="text-label-sm uppercase tracking-tighter opacity-50">Uptime Focus</div>
            </div>
            <div className="reveal-on-scroll" style={{ transitionDelay: "300ms" }}>
              <div className="text-[40px] leading-tight font-bold mb-1">15+</div>
              <div className="text-label-sm uppercase tracking-tighter opacity-50">Tools Used</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
