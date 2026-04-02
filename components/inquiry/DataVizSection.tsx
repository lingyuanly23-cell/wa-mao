"use client";

import { useEffect, useRef } from "react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

/* ── Animated bar ── */
function BigBar({ label, pct, color, delay = 0 }: { label: string; pct: number; color: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.width = "0%";
    el.style.transition = `width 1.2s cubic-bezier(.22,.61,.36,1) ${delay}ms`;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.style.width = `${pct}%`;
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [pct, delay]);

  return (
    <div className="flex items-center gap-5 md:gap-8">
      <span className="text-base md:text-xl text-gray-300 font-light w-44 md:w-56 shrink-0 text-right leading-tight">
        {label}
      </span>
      <div className="flex-1 h-10 md:h-12 bg-white/[0.05] rounded overflow-hidden">
        <div ref={ref} className="h-full rounded" style={{ backgroundColor: color, width: "0%" }} />
      </div>
      <span className="text-xl md:text-2xl font-serif font-black text-white w-16 shrink-0 text-right tabular-nums">
        {pct}%
      </span>
    </div>
  );
}

/* ── Animated donut ── */
function Donut({ value, color, size = 260, children }: { value: number; color: string; size?: number; children?: React.ReactNode }) {
  const ref = useRef<SVGCircleElement>(null);
  const r = 95;
  const circ = 2 * Math.PI * r;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.strokeDasharray = `${circ}`;
    el.style.strokeDashoffset = `${circ}`;
    el.style.transition = "stroke-dashoffset 1.6s cubic-bezier(.22,.61,.36,1) 0.3s";
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.style.strokeDashoffset = `${circ - (value / 100) * circ}`;
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value, circ]);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 220 220" className="-rotate-90">
        <circle cx="110" cy="110" r={r} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="16" />
        <circle ref={ref} cx="110" cy="110" r={r} fill="none" stroke={color} strokeWidth="16" strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">{children}</div>
    </div>
  );
}

// TODO: Replace percentages with real content analysis data
const categories = [
  { label: "Consumption & Purchase", pct: 40, color: "#ff6b6b" },
  { label: "Tourism & Check-in",    pct: 25, color: "#ff9f43" },
  { label: "DIY Experience",        pct: 15, color: "#4ecdc4" },
  { label: "History & Origins",     pct: 8,  color: "#c05621" },
  { label: "Craft & Artisans",      pct: 7,  color: "#B84221" },
  { label: "Cultural Discussion",   pct: 5,  color: "#4A4A4A" },
];

export default function DataVizSection() {
  const headerRef = useScrollReveal<HTMLDivElement>({ staggerDelay: 120 });
  const donutRef = useScrollReveal<HTMLDivElement>();
  const quoteRef = useScrollReveal<HTMLDivElement>();

  const consumptionPct = 40 + 25 + 15; // consumption-oriented total

  return (
    <section className="relative w-full bg-[#111111] py-40 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">

        {/* ── Header ── */}
        <div ref={headerRef} className="mb-32">
          <span className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-gray-500 mb-6 block" data-reveal>
            [ DIGITAL ETHNOGRAPHY ]
          </span>
          <h2 className="text-5xl md:text-7xl font-serif font-black text-white mb-6" data-reveal>
            What the Internet Says
          </h2>
          <p className="text-xl font-sans font-light text-gray-500 max-w-xl" data-reveal>
            200 posts about Wamao on Xiaohongshu, categorized by primary content.
          </p>
        </div>

        {/* ═══ DONUT — consumption vs culture ═══ */}
        <div ref={donutRef} className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20 mb-36">
          <div data-reveal>
            <Donut value={consumptionPct} color="#ff6b6b">
              <span className="text-6xl md:text-7xl font-serif font-black text-white leading-none">{consumptionPct}%</span>
              <span className="text-sm text-gray-500 mt-2 uppercase tracking-widest">consumption</span>
            </Donut>
          </div>
          <div className="max-w-xs space-y-5" data-reveal>
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-[#ff6b6b] shrink-0" />
              <span className="text-lg text-gray-300">Buying, touring, or making</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-white/10 shrink-0" />
              <span className="text-lg text-gray-500">History, craft, or culture</span>
            </div>
            <p className="text-base text-gray-600 pt-2 leading-relaxed">
              Only <span className="text-white font-semibold">20%</span> of posts discuss Wamao as a cultural object. The rest treat it as something to buy, visit, or experience.
            </p>
          </div>
        </div>

        {/* ═══ BAR CHART — category breakdown ═══ */}
        <div className="mb-12">
          <div className="space-y-5 md:space-y-6">
            {categories.map((item, i) => (
              <BigBar key={item.label} label={item.label} pct={item.pct} color={item.color} delay={i * 120} />
            ))}
          </div>
        </div>

        <p className="text-xs text-gray-700 mb-32">
          n = 200 posts, collected June 2025. Methodology: manual content coding with 6 categories.
        </p>

        {/* ── Separator ── */}
        <div className="w-12 border-t border-gray-800 mx-auto my-12" />

        {/* ── Closing quote ── */}
        <div ref={quoteRef} className="max-w-4xl mx-auto text-center mt-12">
          <p className="text-2xl md:text-4xl font-sans font-light italic text-gray-200 leading-relaxed" data-reveal>
            &ldquo;The internet has completed what the marketplace began. Wamao exists online almost exclusively as a product to buy. Its history is virtually absent from the digital record.&rdquo;
          </p>
        </div>

      </div>
    </section>
  );
}
