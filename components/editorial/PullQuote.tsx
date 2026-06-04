"use client";

import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function PullQuote({
  quote,
  cite,
}: {
  quote: string;
  cite?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!ref.current) return;
    const tween = gsap.fromTo(
      ref.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: { trigger: ref.current, start: "top 85%" },
      }
    );
    return () => {
      tween.scrollTrigger?.kill();
    };
  }, []);

  return (
    <figure
      ref={ref}
      className="mx-auto my-20 max-w-[44rem] border-l-2 border-[#B84221] py-2 pl-8 pr-6"
    >
      <blockquote className="font-reading text-[clamp(1.6rem,3vw,2.4rem)] font-medium leading-[1.25] tracking-tight text-[#1C1A17]">
        {quote}
      </blockquote>
      {cite && (
        <figcaption className="mt-5 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-[#B84221]">
          {cite}
        </figcaption>
      )}
    </figure>
  );
}
