"use client";

import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Interstitial({ children }: { children: React.ReactNode }) {
  const lineRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!lineRef.current) return;
    const tween = gsap.fromTo(
      lineRef.current,
      { opacity: 0, y: 30, scale: 0.985 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: { trigger: lineRef.current, start: "top 78%" },
      }
    );
    return () => {
      tween.scrollTrigger?.kill();
    };
  }, []);

  return (
    <section className="my-28 flex min-h-[78vh] w-full items-center justify-center bg-[#1C1A17] px-6">
      <p
        ref={lineRef}
        className="mx-auto max-w-4xl text-center font-reading text-[clamp(1.8rem,4.6vw,3.4rem)] font-light leading-[1.25] text-[#F0EFEC]"
      >
        {children}
      </p>
    </section>
  );
}
