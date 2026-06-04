"use client";

import { useEffect, useRef } from "react";

import gsap from "gsap";

export default function ActHero({
  eyebrow,
  title,
  deck,
}: {
  eyebrow: string;
  title: string;
  deck?: string;
}) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = root.current?.querySelectorAll("[data-rise]");
    if (els && els.length) {
      gsap.fromTo(
        els,
        { y: 44, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, stagger: 0.16, ease: "power3.out", delay: 0.15 }
      );
    }
  }, []);

  return (
    <header
      ref={root}
      className="relative mx-auto flex min-h-[82vh] w-full max-w-[90rem] flex-col justify-center px-6 md:px-12"
    >
      {/* faint oversized act numeral */}
      <span className="pointer-events-none absolute right-[-2%] top-[8%] select-none font-serif text-[16rem] font-black leading-none text-black opacity-[0.035] md:text-[26rem]">
        I
      </span>

      <p
        data-rise
        className="mb-8 font-sans text-xs font-bold uppercase tracking-[0.25em] text-[#B84221]"
      >
        {eyebrow}
      </p>

      <h1
        data-rise
        className="mb-10 font-serif text-[clamp(3.5rem,11vw,9rem)] font-black leading-[0.95] tracking-tight text-[#1C1A17] mix-blend-multiply"
      >
        {title}
      </h1>

      {deck && (
        <p
          data-rise
          className="max-w-2xl font-serif text-xl font-light leading-relaxed text-[#4A4A4A] md:text-2xl"
        >
          {deck}
        </p>
      )}

      <div
        data-rise
        className="mt-16 flex items-center gap-4 font-sans text-[0.65rem] uppercase tracking-[0.2em] text-black/35"
      >
        <span>Scroll to read</span>
        <span className="block h-[1px] w-16 bg-black/25" />
      </div>
    </header>
  );
}
