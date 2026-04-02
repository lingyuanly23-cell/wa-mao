"use client";

import { useEffect, useRef, useCallback } from "react";

interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  staggerDelay?: number;
  once?: boolean;
}

export function useScrollReveal<T extends HTMLElement>(
  options: ScrollRevealOptions = {}
) {
  const {
    threshold = 0.15,
    rootMargin = "0px 0px -50px 0px",
    staggerDelay = 100,
    once = true,
  } = options;

  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const children = el.querySelectorAll("[data-reveal]");
    const targets = children.length > 0 ? Array.from(children) : [el];

    targets.forEach((target) => {
      (target as HTMLElement).style.opacity = "0";
      (target as HTMLElement).style.transform = "translateY(2rem)";
      (target as HTMLElement).style.transition = `opacity 700ms ease-out, transform 700ms ease-out`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (children.length > 0) {
              targets.forEach((target, i) => {
                setTimeout(() => {
                  (target as HTMLElement).style.opacity = "1";
                  (target as HTMLElement).style.transform = "translateY(0)";
                }, i * staggerDelay);
              });
            } else {
              (el as HTMLElement).style.opacity = "1";
              (el as HTMLElement).style.transform = "translateY(0)";
            }
            if (once) observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, staggerDelay, once]);

  return ref;
}

export function useBarAnimation<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const bars = el.querySelectorAll("[data-bar]");
    bars.forEach((bar) => {
      const target = (bar as HTMLElement).dataset.bar || "0%";
      (bar as HTMLElement).style.width = "0%";
      (bar as HTMLElement).style.transition = "width 1000ms ease-out";
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bars = el.querySelectorAll("[data-bar]");
            bars.forEach((bar, i) => {
              const target = (bar as HTMLElement).dataset.bar || "0%";
              setTimeout(() => {
                (bar as HTMLElement).style.width = target;
              }, i * 150);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
