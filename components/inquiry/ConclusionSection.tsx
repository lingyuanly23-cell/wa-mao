"use client";

import { useEffect, useRef } from "react";

export default function ConclusionSection() {
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const line1 = line1Ref.current;
    const line2 = line2Ref.current;
    if (!line1 || !line2) return;

    line1.style.opacity = "0";
    line1.style.transform = "translateY(2rem)";
    line1.style.transition = "opacity 700ms ease-out, transform 700ms ease-out";

    line2.style.opacity = "0";
    line2.style.transform = "translateX(2rem)";
    line2.style.transition = "opacity 700ms ease-out, transform 700ms ease-out";

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            line1.style.opacity = "1";
            line1.style.transform = "translateY(0)";

            setTimeout(() => {
              line2.style.opacity = "1";
              line2.style.transform = "translateX(0)";
            }, 400);

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(line1);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative w-full bg-white py-40 overflow-hidden">
      {/* Subtle radial gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(253,251,247,0.8) 0%, rgba(255,255,255,1) 70%)",
        }}
      />

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <div
          ref={line1Ref}
          className="text-3xl md:text-5xl font-serif font-black tracking-tight leading-tight text-[#4A4A4A]"
        >
          The object is hollow.
        </div>
        <div
          ref={line2Ref}
          className="text-3xl md:text-5xl font-serif font-black tracking-tight leading-tight text-[#1C1A17] mt-4"
        >
          The struggle around it is not.
        </div>

        {/* Decorative SVG underline */}
        <svg
          className="mx-auto mt-10 opacity-60"
          width="120"
          height="8"
          viewBox="0 0 120 8"
          fill="none"
        >
          <path
            d="M2 6C20 2 40 2 60 4C80 6 100 6 118 2"
            stroke="#c05621"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </section>
  );
}
