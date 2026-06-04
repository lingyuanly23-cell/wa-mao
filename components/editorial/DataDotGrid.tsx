"use client";

import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Act III — "The Data"
 * 200 Xiaohongshu posts as 200 dots. On scroll they colorize, sort into six
 * unit-bars, collapse into the 80 / 20 split, then resolve into a donut made
 * of the same dots. This is the upgraded, living version of the original pie
 * chart in DataVizSection — every dot is one post.
 */

export const VIEW_W = 1000;
export const VIEW_H = 780;
const BASELINE = 640;

// Round so server and client serialize identical coordinate strings (no hydration mismatch).
const r2 = (v: number) => Math.round(v * 100) / 100;

type Cat = {
  key: string;
  label: string;
  short: string;
  pct: number;
  count: number;
  color: string;
};

export const CATS: Cat[] = [
  { key: "consumption", label: "Consumption & Purchase", short: "Buy", pct: 40, count: 80, color: "#ff6b6b" },
  { key: "tourism", label: "Tourism & Check-in", short: "Visit", pct: 25, count: 50, color: "#ff9f43" },
  { key: "diy", label: "DIY Experience", short: "DIY", pct: 15, count: 30, color: "#4ecdc4" },
  { key: "history", label: "History & Origins", short: "History", pct: 8, count: 16, color: "#c05621" },
  { key: "craft", label: "Craft & Artisans", short: "Craft", pct: 7, count: 14, color: "#B84221" },
  { key: "discussion", label: "Cultural Discussion", short: "Talk", pct: 5, count: 10, color: "#4A4A4A" },
];

type Dot = { id: number; cat: number; color: string; kInCat: number };

export const DOTS: Dot[] = (() => {
  const out: Dot[] = [];
  let id = 0;
  CATS.forEach((c, ci) => {
    for (let k = 0; k < c.count; k++) out.push({ id: id++, cat: ci, color: c.color, kInCat: k });
  });
  return out;
})();

type P = { x: number; y: number };

function layoutGrid(): P[] {
  const cols = 20;
  const sx = 34;
  const sy = 30;
  const rows = Math.ceil(DOTS.length / cols);
  const ox = (VIEW_W - (cols - 1) * sx) / 2;
  const oy = (VIEW_H - (rows - 1) * sy) / 2 - 20;
  return DOTS.map((d) => ({ x: r2(ox + (d.id % cols) * sx), y: r2(oy + Math.floor(d.id / cols) * sy) }));
}

function layoutBars(): P[] {
  const barW = 5;
  const sx = 22;
  const sy = 21;
  const colGap = VIEW_W / CATS.length;
  return DOTS.map((d) => {
    const col = d.kInCat % barW;
    const row = Math.floor(d.kInCat / barW);
    const center = colGap * (d.cat + 0.5);
    const blockW = (barW - 1) * sx;
    return { x: r2(center - blockW / 2 + col * sx), y: r2(BASELINE - row * sy) };
  });
}

function layoutBlocs(): P[] {
  const barW = 12;
  const sx = 22;
  const sy = 21;
  let a = 0;
  let b = 0;
  return DOTS.map((d) => {
    const isA = d.cat <= 2;
    const idx = isA ? a++ : b++;
    const col = idx % barW;
    const row = Math.floor(idx / barW);
    const center = isA ? VIEW_W * 0.34 : VIEW_W * 0.7;
    const blockW = (barW - 1) * sx;
    return { x: r2(center - blockW / 2 + col * sx), y: r2(BASELINE - row * sy) };
  });
}

function layoutDonut(): P[] {
  const cx = 500;
  const cy = 350;
  const R = 180;
  const rings = [-15, 0, 15];
  return DOTS.map((d, i) => {
    const ang = (i / DOTS.length) * Math.PI * 2 - Math.PI / 2;
    const r = R + rings[i % 3];
    return { x: r2(cx + Math.cos(ang) * r), y: r2(cy + Math.sin(ang) * r) };
  });
}

export const GRID = layoutGrid();
export const BARS = layoutBars();
export const BLOCS = layoutBlocs();
export const DONUT = layoutDonut();

export default function DataDotGrid() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".dg-dot", {
        opacity: 0,
        duration: 0.6,
        stagger: { amount: 1.2, from: "random" },
        scrollTrigger: { trigger: stageRef.current, start: "top 70%" },
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
        },
      });

      tl
        // 1 — colorize into six kinds
        .to(".dg-cap-0", { opacity: 0, duration: 0.4 }, 0)
        .to(".dg-cap-1", { opacity: 1, duration: 0.5 }, 0.2)
        .to(".dg-dot", { fill: (i: number) => DOTS[i].color, duration: 1, stagger: { amount: 0.6 } }, 0)
        // 2 — sort into six unit-bars
        .to(
          ".dg-dot",
          {
            attr: { cx: (i: number) => BARS[i].x, cy: (i: number) => BARS[i].y },
            duration: 1.4,
            ease: "power2.inOut",
            stagger: { amount: 0.6, from: "random" },
          },
          1.1
        )
        .to(".dg-barlabel", { opacity: 1, duration: 0.5 }, 2.0)
        // 3 — collapse into the 80 / 20 split
        .to(".dg-barlabel", { opacity: 0, duration: 0.4 }, 2.7)
        .to(".dg-cap-1", { opacity: 0, duration: 0.4 }, 2.7)
        .to(".dg-cap-2", { opacity: 1, duration: 0.5 }, 2.9)
        .to(
          ".dg-dot",
          {
            attr: { cx: (i: number) => BLOCS[i].x, cy: (i: number) => BLOCS[i].y },
            duration: 1.4,
            ease: "power2.inOut",
            stagger: { amount: 0.5 },
          },
          2.8
        )
        .to(".dg-bloclabel", { opacity: 1, duration: 0.5 }, 3.6)
        // 4 — resolve into the donut
        .to(".dg-bloclabel", { opacity: 0, duration: 0.4 }, 4.6)
        .to(".dg-cap-2", { opacity: 0, duration: 0.4 }, 4.6)
        .to(".dg-cap-3", { opacity: 1, duration: 0.5 }, 4.9)
        .to(
          ".dg-dot",
          {
            attr: { cx: (i: number) => DONUT[i].x, cy: (i: number) => DONUT[i].y },
            duration: 1.8,
            ease: "power2.inOut",
            stagger: { amount: 0.7, from: "start" },
          },
          4.7
        )
        .to(".dg-center, .dg-legend", { opacity: 1, duration: 0.6 }, 6.0);
    }, stageRef);

    return () => ctx.revert();
  }, []);

  const colGap = VIEW_W / CATS.length;

  return (
    <section ref={wrapRef} className="relative bg-[#F0EFEC]" style={{ height: "560vh" }}>
      <div
        ref={stageRef}
        className="sticky top-0 flex h-screen flex-col overflow-hidden"
      >
        {/* caption band */}
        <div className="pointer-events-none shrink-0 px-6 pt-20 pb-1">
          <div className="relative mx-auto h-24 max-w-3xl text-center">
            <p className="dg-cap-0 absolute inset-x-0 font-reading text-[clamp(1.1rem,2.4vw,1.7rem)] leading-snug text-[#2A2723]">
              n = 200 posts, collected June 2025.
            </p>
            <p className="dg-cap-1 absolute inset-x-0 font-reading text-[clamp(1.05rem,2.2vw,1.5rem)] leading-snug text-[#2A2723] opacity-0">
              Each post&rsquo;s full text was extracted and classified into one of six content categories.
            </p>
            <p className="dg-cap-2 absolute inset-x-0 font-reading text-[clamp(1.1rem,2.4vw,1.6rem)] font-medium leading-snug text-[#1C1A17] opacity-0">
              Eighty percent of the content treats the Wamao as something to buy, visit, or experience.
            </p>
            <p className="dg-cap-3 absolute inset-x-0 font-reading text-[clamp(1.1rem,2.4vw,1.6rem)] font-medium leading-snug text-[#1C1A17] opacity-0">
              Only one in five posts engages with what the object is or where it comes from.
            </p>
          </div>
        </div>

        {/* chart band */}
        <div className="flex min-h-0 w-full flex-1 items-center justify-center px-6">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="mx-auto h-full w-full max-w-[920px]" preserveAspectRatio="xMidYMid meet">
          {DOTS.map((d) => (
            <circle key={d.id} className="dg-dot" cx={GRID[d.id].x} cy={GRID[d.id].y} r={7} fill="#1C1A17" />
          ))}

          {CATS.map((c, ci) => (
            <text
              key={c.key}
              className="dg-barlabel"
              x={colGap * (ci + 0.5)}
              y={690}
              textAnchor="middle"
              fontSize={28}
              fontWeight={600}
              fill="#4A4A4A"
              opacity={0}
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {c.short} {c.pct}%
            </text>
          ))}

          <text className="dg-bloclabel" x={340} y={252} textAnchor="middle" fontSize={64} fontWeight={700} fill="#B84221" opacity={0} style={{ fontFamily: "var(--font-reading)" }}>
            80%
          </text>
          <text className="dg-bloclabel" x={340} y={290} textAnchor="middle" fontSize={26} fontWeight={600} fill="#4A4A4A" opacity={0} style={{ fontFamily: "var(--font-sans)", letterSpacing: "0.12em" }}>
            BUY · VISIT · EXPERIENCE
          </text>
          <text className="dg-bloclabel" x={700} y={252} textAnchor="middle" fontSize={64} fontWeight={700} fill="#1C1A17" opacity={0} style={{ fontFamily: "var(--font-reading)" }}>
            20%
          </text>
          <text className="dg-bloclabel" x={700} y={290} textAnchor="middle" fontSize={26} fontWeight={600} fill="#4A4A4A" opacity={0} style={{ fontFamily: "var(--font-sans)", letterSpacing: "0.12em" }}>
            WHAT IT IS
          </text>

          <text className="dg-center" x={500} y={342} textAnchor="middle" fontSize={88} fontWeight={700} fill="#1C1A17" opacity={0} style={{ fontFamily: "var(--font-reading)" }}>
            80%
          </text>
          <text className="dg-center" x={500} y={388} textAnchor="middle" fontSize={26} fontWeight={500} fill="#4A4A4A" opacity={0} style={{ fontFamily: "var(--font-sans)", letterSpacing: "0.1em" }}>
            OF 200 POSTS
          </text>
        </svg>
        </div>

        {/* legend band */}
        <div className="dg-legend pointer-events-none shrink-0 flex flex-wrap justify-center gap-x-6 gap-y-2 px-6 pb-[4vh] pt-2 opacity-0">
          {CATS.map((c) => (
            <span key={c.key} className="flex items-center gap-2 font-sans text-sm font-medium text-[#4A4A4A]">
              <span className="inline-block h-3 w-3 rounded-full" style={{ backgroundColor: c.color }} />
              {c.label} <span className="font-semibold text-[#1C1A17]">{c.pct}%</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
