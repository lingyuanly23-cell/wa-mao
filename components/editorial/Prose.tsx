"use client";

import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Prose({
  children,
  dropcap = false,
}: {
  children: React.ReactNode;
  dropcap?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const paras = ref.current?.querySelectorAll(":scope > p");
    const triggers: ScrollTrigger[] = [];
    paras?.forEach((p) => {
      const tween = gsap.fromTo(
        p,
        { y: 26, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: { trigger: p, start: "top 90%" },
        }
      );
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    });
    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <div
      ref={ref}
      className={`mx-auto max-w-[36rem] space-y-7 px-6 font-reading text-[1.2rem] leading-[1.85] text-[#2A2723] [text-wrap:pretty] md:text-[1.3rem] ${
        dropcap ? "prose-dropcap" : ""
      }`}
    >
      {children}
    </div>
  );
}
