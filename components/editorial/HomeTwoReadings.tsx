"use client";

import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import WamaoFigure from "./WamaoFigure";

const CLAY = "#a89488";
const GREEN = "#7e9c6b";
const COOL = "#5b6b73";
const TERRA = "#B84221";

/** "Same object, two readings" — the homepage TODAY animation.
 *  The figure never moves; only the meaning around it rewrites. Verbatim copy. */

function Label({
  cls,
  x,
  y,
  w,
  align,
  color,
  text,
}: {
  cls: string;
  x: number;
  y: number;
  w: number;
  align: "left" | "right";
  color: string;
  text: string;
}) {
  return (
    <foreignObject className={cls} x={x} y={y} width={w} height={96}>
      <div
        // @ts-expect-error xmlns is valid on the embedded HTML root
        xmlns="http://www.w3.org/1999/xhtml"
        style={{ textAlign: align, fontFamily: "var(--font-reading)", fontSize: "19px", lineHeight: 1.35, color, fontWeight: 500 }}
      >
        {text}
      </div>
    </foreignObject>
  );
}

export default function HomeTwoReadings() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.set(".wm-skin", { fill: CLAY });
      gsap.set(".wm-coin", { opacity: 0, y: -60 });
      gsap.set([".rd-line", ".mk-line"], { strokeDashoffset: 1 });
      gsap.set([".rd-text", ".mk-text", ".rd-dot", ".mk-dot"], { opacity: 0 });
      gsap.set([".cap-1", ".cap-2", ".cap-3"], { opacity: 0 });

      gsap.from(".wm-figure", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: stageRef.current, start: "top 70%" },
      });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: wrapRef.current, start: "top top", end: "bottom bottom", scrub: 0.6 },
      });

      tl
        .to(".rd-dot", { opacity: 1, duration: 0.3 }, 0.6)
        .to(".rd-line", { strokeDashoffset: 0, duration: 0.8, stagger: 0.25 }, 0.7)
        .to(".rd-text", { opacity: 1, duration: 0.6, stagger: 0.25 }, 1.0)
        .to(".rd-anno", { opacity: 0, duration: 0.6 }, 2.6)
        .to(".cap-0", { opacity: 0, duration: 0.4 }, 2.6)
        .to(".cap-1", { opacity: 1, duration: 0.5 }, 2.9)
        .to(".wm-coin", { opacity: 1, y: 0, duration: 0.7, ease: "bounce.out" }, 3.0)
        .to(".wm-skin", { fill: GREEN, duration: 0.9 }, 3.1)
        .to(".cap-1", { opacity: 0, duration: 0.4 }, 4.4)
        .to(".cap-2", { opacity: 1, duration: 0.5 }, 4.7)
        .to(".mk-dot", { opacity: 1, duration: 0.3 }, 4.7)
        .to(".mk-line", { strokeDashoffset: 0, duration: 0.8, stagger: 0.25 }, 4.8)
        .to(".mk-text", { opacity: 1, duration: 0.6, stagger: 0.25 }, 5.1)
        .to(".cap-2", { opacity: 0, duration: 0.4 }, 6.8)
        .to(".cap-3", { opacity: 1, duration: 0.6 }, 7.1);
    }, stageRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={wrapRef} className="relative" style={{ height: "560vh" }}>
      <div ref={stageRef} className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-24 z-10 px-6">
          <div className="relative mx-auto h-28 max-w-3xl text-center">
            <p className="cap-0 absolute inset-x-0 font-reading text-[clamp(1.1rem,2.4vw,1.6rem)] font-medium leading-snug text-[#5b6b73]">
              In the villages of Heqing and Binchuan, that mouth still carries ritual meaning.
            </p>
            <p className="cap-1 absolute inset-x-0 font-reading text-[clamp(1.1rem,2.4vw,1.6rem)] leading-snug text-[#2A2723]">
              In Yuxi, the Wamao is not coupled with any such ritual.
            </p>
            <p className="cap-2 absolute inset-x-0 font-reading text-[clamp(1.1rem,2.3vw,1.55rem)] font-medium leading-snug text-[#B84221]">
              The open mouth, which in the older ritual context was meant to swallow and ward off evil
              spirits, has here been repurposed to attract wealth.
            </p>
            <p className="cap-3 absolute inset-x-0 font-reading text-[clamp(1.15rem,2.5vw,1.7rem)] font-semibold leading-snug text-[#1C1A17]">
              Its logic is organized entirely around the promise of luck, and behind that, around what
              will sell to tourists.
            </p>
          </div>
        </div>

        <svg viewBox="0 0 1200 500" className="h-auto w-full max-w-[1120px]">
          <g transform="translate(400,18)">
            <WamaoFigure />
          </g>

          <g className="rd-anno">
            <circle className="rd-dot" cx={556} cy={208} r={4} fill={COOL} />
            <path className="rd-line" d="M556,208 L352,160" pathLength={1} fill="none" stroke={COOL} strokeWidth={2} strokeDasharray={1} />
            <Label cls="rd-text" x={20} y={118} w={330} align="right" color={COOL} text="daubing its blood on the figure’s eyes, mouth, and ears" />

            <circle className="rd-dot" cx={600} cy={372} r={4} fill={COOL} />
            <path className="rd-line" d="M600,372 L352,398" pathLength={1} fill="none" stroke={COOL} strokeWidth={2} strokeDasharray={1} />
            <Label cls="rd-text" x={20} y={356} w={330} align="right" color={COOL} text="its giant mouth opened wide to swallow evil spirits" />

            <circle className="rd-dot" cx={726} cy={262} r={4} fill={COOL} />
            <path className="rd-line" d="M726,262 L850,290" pathLength={1} fill="none" stroke={COOL} strokeWidth={2} strokeDasharray={1} />
            <Label cls="rd-text" x={850} y={248} w={330} align="left" color={COOL} text="a lump of clay, with no spiritual power whatsoever" />
          </g>

          <g className="mk-anno">
            <circle className="mk-dot" cx={600} cy={344} r={4} fill={TERRA} />
            <path className="mk-line" d="M600,344 L352,366" pathLength={1} fill="none" stroke={TERRA} strokeWidth={2} strokeDasharray={1} />
            <Label cls="mk-text" x={20} y={330} w={330} align="right" color={TERRA} text="repurposed to attract wealth" />

            <circle className="mk-dot" cx={576} cy={228} r={4} fill={TERRA} />
            <path className="mk-line" d="M576,228 L850,182" pathLength={1} fill="none" stroke={TERRA} strokeWidth={2} strokeDasharray={1} />
            <Label cls="mk-text" x={850} y={138} w={330} align="left" color={TERRA} text="the back is sealed so that money cannot leak out" />

            <circle className="mk-dot" cx={576} cy={300} r={4} fill={TERRA} />
            <path className="mk-line" d="M576,300 L850,402" pathLength={1} fill="none" stroke={TERRA} strokeWidth={2} strokeDasharray={1} />
            <Label cls="mk-text" x={850} y={360} w={330} align="left" color={TERRA} text="a hole is opened at the back to draw fortune in" />
          </g>
        </svg>
      </div>
    </section>
  );
}
