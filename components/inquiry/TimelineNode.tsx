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
  imagePosition = "left",
  fullWidth = false,
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
                  { transform: "translate(-50%, -50%) scale(1)", boxShadow: "0 0 10px rgba(255,159,67,0.5)" },
                  { transform: "translate(-50%, -50%) scale(1.3)", boxShadow: "0 0 20px rgba(255,159,67,0.8)" },
                  { transform: "translate(-50%, -50%) scale(1)", boxShadow: "0 0 10px rgba(255,159,67,0.5)" },
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

  if (fullWidth) {
    return (
      <div ref={nodeRef} className="relative w-full">
        {/* Timeline dot */}
        <div
          ref={dotRef}
          className="hidden md:block absolute left-1/2 top-8 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white border-4 border-[#ff9f43] rounded-full shadow-[0_0_10px_rgba(255,159,67,0.5)] z-20"
        />

        {/* Mobile dot */}
        <div className="md:hidden absolute left-0 top-8 -translate-x-1/2 w-4 h-4 bg-white border-4 border-[#ff9f43] rounded-full shadow-[0_0_10px_rgba(255,159,67,0.5)] z-20" />

        <div className="md:ml-[55%] pl-8 md:pl-16">
          <span className="font-handwriting text-3xl md:text-5xl text-[#ff9f43] block mb-6">
            {date}
          </span>
          <div className="max-w-lg">{textContent}</div>
        </div>
      </div>
    );
  }

  const imageBlock = imageSlot && (
    <div className="w-full flex justify-end md:pr-16">
      {imageSlot}
    </div>
  );

  const textBlock = (
    <div className="w-full flex justify-start md:pl-16 relative">
      {/* Desktop timeline dot */}
      <div
        ref={dotRef}
        className="hidden md:block absolute left-0 top-8 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white border-4 border-[#ff9f43] rounded-full shadow-[0_0_10px_rgba(255,159,67,0.5)] z-20"
      />

      <div className="flex flex-col max-w-lg">
        <span className="font-handwriting text-3xl md:text-5xl text-[#ff9f43] mb-6">
          {date}
        </span>
        {textContent}
      </div>
    </div>
  );

  return (
    <div
      ref={nodeRef}
      className="relative grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-0 w-full items-start"
    >
      {/* Mobile dot */}
      <div className="md:hidden absolute left-0 top-0 -translate-x-1/2 w-4 h-4 bg-white border-4 border-[#ff9f43] rounded-full shadow-[0_0_10px_rgba(255,159,67,0.5)] z-20" />

      {imagePosition === "left" ? (
        <>
          {imageBlock}
          {textBlock}
        </>
      ) : (
        <>
          {textBlock}
          {imageBlock}
        </>
      )}
    </div>
  );
}
