"use client";

import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TOBACCO = "#9c6f3f";
const TERRA = "#B84221";
const TRACK = "#ddd9d2";

/** Act I, June 16 — the economic pivot that manufactured a heritage industry.
 *  Tobacco's grip -> the 1994 tax collapse -> the heritage build-out. Verbatim. */

function TLabel({ x, y, w, date, text }: { x: number; y: number; w: number; date: string; text: string }) {
  return (
    <foreignObject className="tl-label" x={x} y={y} width={w} height={160}>
      <div
        // @ts-expect-error xmlns is valid on the embedded HTML root
        xmlns="http://www.w3.org/1999/xhtml"
        style={{ fontFamily: "var(--font-reading)" }}
      >
        <div style={{ fontSize: "26px", fontWeight: 700, color: TERRA, lineHeight: 1.1 }}>{date}</div>
        <div style={{ marginTop: "5px", fontSize: "20px", lineHeight: 1.3, color: "#2A2723" }}>{text}</div>
      </div>
    </foreignObject>
  );
}

export default function PivotChart() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.set(".beat-1", { opacity: 1 });
      gsap.set(".b1-fill", { attr: { width: 0 } });
      gsap.set(".b1-num", { opacity: 0 });
      gsap.set(".beat-2", { opacity: 0 });
      gsap.set(".b2-bar", { attr: { y: 200, height: 320 } });
      gsap.set([".b2-drop", ".b2-num2"], { opacity: 0 });
      gsap.set(".beat-4", { opacity: 0 });
      gsap.set([".tl-dot", ".tl-label", ".tl-line"], { opacity: 0 });
      gsap.set([".cap-1", ".cap-2", ".cap-3"], { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: wrapRef.current, start: "top top", end: "bottom bottom", scrub: 0.6 },
      });

      tl
        .to(".b1-fill", { attr: { width: 455 }, duration: 1.2, ease: "power2.out" }, 0.4)
        .to(".b1-num", { opacity: 1, duration: 0.5 }, 0.9)
        .to(".beat-1", { opacity: 0, duration: 0.5 }, 2.0)
        .to(".cap-0", { opacity: 0, duration: 0.4 }, 2.0)
        .to(".beat-2", { opacity: 1, duration: 0.5 }, 2.2)
        .to(".cap-1", { opacity: 1, duration: 0.5 }, 2.3)
        .to(".b2-bar", { attr: { y: 317, height: 203 }, duration: 1.1, ease: "power3.in" }, 3.2)
        .to([".b2-drop", ".b2-num2"], { opacity: 1, duration: 0.5 }, 3.9)
        .to(".beat-2", { opacity: 0, duration: 0.5 }, 4.8)
        .to(".cap-1", { opacity: 0, duration: 0.4 }, 4.8)
        .to(".cap-2", { opacity: 1, duration: 0.5 }, 5.1)
        .to(".beat-4", { opacity: 1, duration: 0.3 }, 5.6)
        .to(".tl-line", { opacity: 1, duration: 0.6 }, 5.7)
        .to(".cap-2", { opacity: 0, duration: 0.4 }, 6.0)
        .to(".cap-3", { opacity: 1, duration: 0.5 }, 6.3)
        .to(".tl-dot", { opacity: 1, duration: 0.4, stagger: 0.3 }, 6.0)
        .to(".tl-label", { opacity: 1, duration: 0.5, stagger: 0.3 }, 6.2);
    }, stageRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={wrapRef} className="relative" style={{ height: "640vh" }}>
      <div ref={stageRef} className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <div className="pointer-events-none shrink-0 px-6 pt-20 pb-1">
          <div className="relative mx-auto h-32 max-w-3xl text-center">
            <p className="cap-0 absolute inset-x-0 font-reading text-[clamp(1.1rem,2.4vw,1.6rem)] leading-snug text-[#2A2723]">
              Yuxi is a tobacco city, the home of the Hongta Group, one of China&rsquo;s largest cigarette makers.
            </p>
            <p className="cap-1 absolute inset-x-0 font-reading text-[clamp(1rem,2.1vw,1.35rem)] leading-snug text-[#1C1A17] opacity-0">
              But in 1994, the State Council&rsquo;s tax-sharing reform redirected tobacco excise revenue to the central government, and by 2001 the Hongta Group&rsquo;s annual tax contribution had fallen from over 20 billion yuan to roughly 12.7 billion, a drop of more than 30 percent.
            </p>
            <p className="cap-2 absolute inset-x-0 font-reading text-[clamp(1.3rem,3vw,2.1rem)] font-semibold leading-snug text-[#B84221] opacity-0">
              The city needed something else.
            </p>
            <p className="cap-3 absolute inset-x-0 font-reading text-[clamp(1rem,2.1vw,1.4rem)] leading-snug text-[#2A2723] opacity-0">
              In January 2013, Yuxi&rsquo;s party secretary Zhang Zulin stood up at the provincial People&rsquo;s Congress and declared that the city would &ldquo;vigorously develop the modern service sector, led by tourism.&rdquo;
            </p>
          </div>
        </div>

        {/* chart band */}
        <div className="flex min-h-0 w-full flex-1 items-center justify-center px-6 pb-[4vh]">
        <svg viewBox="0 0 1000 620" className="mx-auto h-full w-full max-w-[980px]" preserveAspectRatio="xMidYMid meet">
          <g className="beat-1">
            <text x={500} y={232} textAnchor="middle" fontSize={22} fontWeight={600} fill="#4A4A4A" style={{ fontFamily: "var(--font-sans)", letterSpacing: "0.04em" }}>
              the city&rsquo;s above-scale industrial output
            </text>
            <rect x={150} y={300} width={700} height={70} rx={8} fill={TRACK} />
            <rect className="b1-fill" x={150} y={300} width={0} height={70} rx={8} fill={TOBACCO} />
            <text className="b1-num" x={377} y={347} textAnchor="middle" fontSize={44} fontWeight={700} fill="#F0EFEC" style={{ fontFamily: "var(--font-reading)" }}>
              60–70%
            </text>
            <text className="b1-num" x={150} y={404} textAnchor="start" fontSize={24} fontWeight={600} fill={TOBACCO} style={{ fontFamily: "var(--font-sans)" }}>
              tobacco
            </text>
          </g>

          <g className="beat-2">
            <line x1={360} y1={520} x2={650} y2={520} stroke="#c9bfb0" strokeWidth={2} />
            <rect className="b2-ghost" x={430} y={200} width={140} height={320} fill="none" stroke="#b6ab9b" strokeWidth={2} strokeDasharray="6 6" />
            <rect className="b2-bar" x={430} y={200} width={140} height={320} fill={TOBACCO} />
            <text x={500} y={188} textAnchor="middle" fontSize={28} fontWeight={700} fill="#4A4A4A" style={{ fontFamily: "var(--font-reading)" }}>
              20 billion
            </text>
            <text className="b2-num2" x={500} y={305} textAnchor="middle" fontSize={28} fontWeight={700} fill="#F0EFEC" style={{ fontFamily: "var(--font-reading)" }}>
              12.7 billion
            </text>
            <g className="b2-drop">
              <line x1={620} y1={200} x2={620} y2={317} stroke={TERRA} strokeWidth={2} strokeDasharray="5 5" />
              <text x={636} y={266} textAnchor="start" fontSize={38} fontWeight={700} fill={TERRA} style={{ fontFamily: "var(--font-reading)" }}>
                −30%
              </text>
            </g>
          </g>

          <g className="beat-4">
            <line className="tl-line" x1={110} y1={360} x2={890} y2={360} stroke="#c9bfb0" strokeWidth={2} />
            <circle className="tl-dot" cx={160} cy={360} r={10} fill={TERRA} />
            <circle className="tl-dot" cx={330} cy={360} r={10} fill={TERRA} />
            <circle className="tl-dot" cx={680} cy={360} r={10} fill={TERRA} />
            <circle className="tl-dot" cx={850} cy={360} r={10} fill={TERRA} />
            <TLabel x={60} y={386} w={230} date="January 2013" text="vigorously develop the modern service sector, led by tourism" />
            <TLabel x={230} y={208} w={230} date="2014" text="Yuxi blue-and-white porcelain received provincial-level ICH status" />
            <TLabel x={580} y={386} w={230} date="2019" text="broke ground on a 4.5-billion-yuan ceramics art town" />
            <TLabel x={740} y={200} w={250} date="October 2020" text="Qinghua Street, which opened in October 2020, is its commercial centerpiece" />
          </g>
        </svg>
        </div>
      </div>
    </section>
  );
}
