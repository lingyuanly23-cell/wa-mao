"use client";

import { useEffect, useRef } from "react";

interface TimelineNodeProps {
  date: string;
  imageSlot?: React.ReactNode;
  textContent: React.ReactNode;
  /** Which side the image appears on desktop: "left" or "right" */
  imagePosition?: "left" | "right";
  /** If true, text spans full width (no image column) */
  fullWidth?: boolean;
}

export default function TimelineNode({
  date,
  imageSlot,
  textContent,
}: TimelineNodeProps) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    // Fade-in animation
    node.style.opacity = "0";
    node.style.transform = "translateY(2rem)";
    node.style.transition = "opacity 700ms ease-out, transform 700ms ease-out";

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            node.style.opacity = "1";
            node.style.transform = "translateY(0)";

            // Pulse the dot
            if (dotRef.current) {
              dotRef.current.animate(
                [
                  { transform: "translate(-50%, -50%) scale(1)", boxShadow: "0 0 10px rgba(184,66,33,0.5)" },
                  { transform: "translate(-50%, -50%) scale(1.3)", boxShadow: "0 0 20px rgba(184,66,33,0.8)" },
                  { transform: "translate(-50%, -50%) scale(1)", boxShadow: "0 0 10px rgba(184,66,33,0.5)" },
                ],
                { duration: 600, easing: "ease-out" }
              );
            }

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={nodeRef} className="relative w-full pl-12 md:pl-20">
      {/* Dot sitting on the left spine */}
      <div
        ref={dotRef}
        className="absolute left-4 md:left-8 top-2 -translate-x-1/2 w-4 h-4 bg-white border-4 border-[#B84221] rounded-full shadow-[0_0_10px_rgba(184,66,33,0.4)] z-20"
      />
      <span className="font-sans text-base md:text-lg font-bold uppercase tracking-[0.18em] text-[#B84221] block mb-5">
        {date}
      </span>
      {imageSlot && <div className="mb-8 w-full max-w-md">{imageSlot}</div>}
      <div className="w-full max-w-2xl">{textContent}</div>
    </div>
  );
}
