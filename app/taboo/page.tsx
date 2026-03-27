"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Link from "next/link";
export default function TabooPage() {
  return (
    <main className="flex min-h-screen w-full flex-col pt-20">
      <EvolutionAndArchitecture />
      <WitchcraftTaboo />
    </main>
  );
}

const WitchcraftTaboo = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const block1Ref = useRef<HTMLDivElement>(null);
  const block2Ref = useRef<HTMLDivElement>(null);
  const dawnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    // ── Fade-in-up for each content block ──
    const targets = [headerRef.current, block1Ref.current, block2Ref.current];
    targets.forEach((el) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // ── Dawn Transition: black → white, scrub-driven ──
    if (sectionRef.current && dawnRef.current) {
      gsap.to(sectionRef.current, {
        backgroundColor: "#f9fafb",
        color: "#1a1a1a",
        ease: "none",
        scrollTrigger: {
          trigger: dawnRef.current,
          start: "top 70%",
          end: "bottom top",
          scrub: true,
        },
      });
    }
  }, []);

  const maskStyle: React.CSSProperties = {
    maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 55%, transparent 100%)",
    WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 55%, transparent 100%)",
  };

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#111111] text-gray-200 py-32 md:py-48 overflow-hidden"
    >
      {/* ── Header: The Giant Question ── */}
      <div ref={headerRef} className="max-w-4xl mx-auto px-6 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-gray-500 font-sans mb-12 font-semibold">
          Chapter III&nbsp;&nbsp;·&nbsp;&nbsp;The Linguistic Disguise
        </p>
        <h2 className="font-serif text-5xl md:text-7xl leading-tight">
          Why call a fierce, house-guarding tiger&hellip; a docile &lsquo;cat&rsquo;?
        </h2>
      </div>

      {/* ── Block 1: Sympathetic Magic — image left, text right ── */}
      <div
        ref={block1Ref}
        className="mt-32 grid grid-cols-1 md:grid-cols-2 gap-16 max-w-7xl mx-auto px-6 items-center"
      >
        {/* Left — masked image */}
        <div
          className="w-full aspect-[4/5] bg-transparent overflow-hidden relative group"
          style={maskStyle}
        >
          <img
            src="/第五页1.jpg"
            alt="Ritual / Shaman"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[10000ms] ease-out group-hover:scale-105"
          />
        </div>

        {/* Right — text */}
        <div>
          <h3 className="font-serif text-3xl mb-6 leading-snug">
            The Weight of a Name
          </h3>
          <p className="text-xl md:text-2xl leading-relaxed text-gray-400">
            In the ancient logic of sympathetic magic, a name is not just a label; it is the entity itself. To explicitly call upon a &lsquo;Tiger&rsquo; on your roof might summon the real, man-eating beast from the dark mountains. The fear was physical.
          </p>
        </div>
      </div>

      {/* ── Block 2: The Compromise — text left, image right ── */}
      <div
        ref={block2Ref}
        className="mt-32 grid grid-cols-1 md:grid-cols-2 gap-16 max-w-7xl mx-auto px-6 items-center"
      >
        {/* Left — text */}
        <div className="order-2 md:order-1">
          <h3 className="font-serif text-3xl mb-6 leading-snug">
            The Psychological Compromise
          </h3>
          <p className="text-xl md:text-2xl leading-relaxed text-gray-400">
            So, the artisans engaged in a cunning linguistic disguise. They molded a monster, but named it a &lsquo;Cat&rsquo;. By domesticating its title, they tamed its wild ferocity, achieving a perfect psychological balance between protection and safety.
          </p>
        </div>

        {/* Right — masked image */}
        <div
          className="order-1 md:order-2 w-full aspect-[4/5] bg-transparent overflow-hidden relative group"
          style={maskStyle}
        >
          <img
            src="/第五页2.jpg"
            alt="Wamao Detail"
            className="w-full h-full object-cover transition-transform duration-[10000ms] ease-out group-hover:scale-105"
          />
        </div>
      </div>

      {/* ── Dawn Transition Trigger ── */}
      <div ref={dawnRef} className="h-[50vh] w-full" />

    </section>
  );
}



const EvolutionAndArchitecture = () => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let ctx = gsap.context(() => {
      // 1. 全局平滑暗场动画 (Smooth Twilight Transition)
      // Transition from light beige to deep charcoal/night grey
      gsap.to(containerRef.current, {
        "--bg-color": "#1e1b18", // Deep museum dark
        "--text-base": "#e5e7eb", // Soft gray-white
        "--text-muted": "#9ca3af", // Gray-400
        "--border-accent": "rgba(255,255,255,0.1)",
        duration: 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "0% 50%", // Start fading when the top of the block hits the middle of the screen
          end: "30% 50%", // Complete fading when 30% of the block has been scrolled
          scrub: true,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const regions = [
    {
      city: "Kunming",
      title: "Kunming: The Imprint of Rational Order",
      desc: "In Kunming, the central core where imperial power was strictly monitored, artisans utilized wheel-thrown pottery techniques (forming the neat base seen here). The Wamao\u2019s form is symmetrical and regular, preserving the rational, structured order brought by Han immigrants. Its aesthetic still echoes the formal stone guardian lions of the Central Plains.",
      imgSrc: "/第四页2.jpg"
    },
    {
      city: "Yuxi",
      title: "Yuxi: The Subtle Torsion of Form",
      desc: "Moving slightly outward from the strict core, the rules begin to bend. In Yuxi, while the wheel-thrown pottery base remains, the clay is often rougher and unglazed. The facial features exhibit a subtle torsion; the eyes begin to bulge and the mouth widens, signaling a quiet rebellion against standard anatomy as indigenous wildness begins to test the rules.",
      imgSrc: "/第四页3.jpg"
    },
    {
      city: "Chuxiong",
      title: "Chuxiong: The Indigenous Deconstruction",
      desc: "In the periphery of Chuxiong, central architectural norms are thoroughly deconstructed. The indigenous Yi and Bai ancestors possessed profound animistic beliefs and tiger totem worship (the Yi creation epic, Meige, states: \u2018The tiger\u2019s bones are the columns that prop up the sky, its flesh becomes the vegetation\u2019). Artisans abandon the pottery wheel entirely for free, pure hand-molding. To maximize its defensive function of \u2018swallowing evil,\u2019 the head swells disproportionately with monstrous fangs, defying anatomical logic. It is a successful indigenous \u2018Possession\u2019 of the imperial norm.",
      imgSrc: "/第四页4.jpg"
    },
    {
      city: "Lijiang",
      title: "Lijiang: The Primal Descent",
      desc: "In the remote areas of Lijiang, the Naxi region, the \u2018cat\u2019 disguise is entirely stripped away. The Wamao ceases to have any rational symmetry; it is a manifestation of primal terror, molded raw and dark from the red earth. It is a raw roar against a cruel nature and unknown spirits\u2014the final form where the totem breaks free from the empire\u2019s shadow to stand alone.",
      imgSrc: "/第四页5.jpg"
    }
  ];

  return (
    <section
      ref={containerRef}
      className="relative w-full py-32 flex flex-col items-center overflow-hidden"
      style={{
        backgroundColor: "var(--bg-color, #FDFBF7)",
        color: "var(--text-base, #1c1c1e)",
        "--bg-color": "#FDFBF7",
        "--text-base": "#1c1c1e",
        "--text-muted": "#4b5563",
        "--border-accent": "rgba(0,0,0,0.05)"
      } as React.CSSProperties}
    >

      {/* 阶段一：原乡的图腾 (The Ancestral Tiger) */}
      <div className="w-full max-w-4xl flex flex-col items-center pt-32 px-6">

        {/* 图片展示 (平面画) */}
        <div className="relative w-full max-w-2xl p-4 md:p-6 rounded-sm shadow-[0_0_60px_rgba(255,255,255,0.06)] mb-12 bg-[#FDFBF7]">
          <div className="aspect-[3/4] md:aspect-square w-full overflow-hidden relative border border-[#e5e7eb] bg-[#FDFBF7]">
            <img src="/第四页1.jpg" alt="Zhenzhai Tiger Ancestor" className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-95" />
          </div>
        </div>

        {/* 文本描述 */}
        <div className="text-center max-w-2xl">
          <h3 className="text-4xl md:text-5xl font-serif mb-6 font-medium tracking-wide">
            The Blueprint: The 'Zhenzhai' Tiger
          </h3>
          <p
            className="text-lg md:text-xl font-sans font-light leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            Before it took shape in clay, it was an ink talisman. The migrating Han army brought this 2D memory from the Central Plains to ward off the unknown.
          </p>
        </div>
      </div>

      {/* 阶段二：权力的屋顶与物理要塞 (The Architectural Anchor) */}
      <div className="w-full max-w-7xl flex flex-col items-center pt-40 px-4 md:px-8 relative z-10">

        <div className="w-full aspect-[21/9] relative rounded-xl overflow-hidden shadow-2xl bg-black/5 mb-16">
          <img src="/第四页6.jpg" alt="Traditional Yikeyin Courtyard" className="absolute inset-0 w-full h-full object-cover opacity-90" />
          {/* Subtle overlay for better text integration if needed later */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

          <div className="absolute bottom-8 left-8 md:bottom-16 md:left-16 max-w-2xl text-white">
            <h3 className="text-4xl md:text-6xl font-serif mb-4 font-black tracking-tight text-white drop-shadow-md">
              The Fortress of Memory
            </h3>
          </div>
        </div>

        <div className="w-full max-w-3xl text-left md:text-center px-4">
          <p
            className="text-xl md:text-2xl font-serif leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            The immigrants didn't just bring swords; they brought enclosed courtyards. In the unfamiliar, disease-ridden frontiers, the traditional architecture was their physical fortress. And at the highest point of this fortress—the roof ridge—they needed a psychological guardian. The Wamao was born out of this spatial anxiety.
          </p>
        </div>
      </div>

      {/* 过渡引言 (The Turning Point) */}
      <div className="w-full max-w-4xl text-center py-40 px-6">
        <p className="text-3xl md:text-5xl font-serif text-[#c05621] leading-relaxed italic font-light tracking-wide">
          "But as these roofs spread further from the imperial center, the guardians began to mutate..."
        </p>
      </div>

      {/* 阶段三：静态矩阵陈列厅 (The Museum Matrix) */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-16 mx-auto mt-24 px-6 pb-32 relative z-10">
        {regions.map((region, idx) => {
          return (
            <div
              key={`region-${idx}`}
              className="flex flex-col items-center group cursor-pointer w-full text-center"
            >

              {/* 图片区域: 统一 4:3 画框，含 Hover 隐微放大效果 */}
              <div
                className="w-full aspect-[4/3] rounded-xl overflow-hidden shadow-2xl bg-gray-900 border border-white/5 transition-transform duration-700 ease-out group-hover:-translate-y-2 group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
              >
                <img
                  src={region.imgSrc}
                  alt={region.city}
                  className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                />
              </div>

              {/* 文本区域: 统一置于下方对齐 */}
              <div className="mt-8 flex flex-col items-center">
                <span className="text-[#c05621] font-sans text-sm tracking-[0.3em] uppercase mb-4 font-bold">
                  {region.city}
                </span>
                <h4 className="text-3xl font-serif text-white mb-4 font-medium">
                  {region.title}
                </h4>
                <p className="text-lg font-sans text-gray-400 font-light leading-relaxed max-w-md group-hover:text-gray-300 transition-colors duration-500">
                  {region.desc}
                </p>
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
}



