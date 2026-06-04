"use client";

import { useEffect, useRef } from "react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

export default function HeroSection() {
  const revealRef = useScrollReveal<HTMLDivElement>({ staggerDelay: 150 });
  const scrollLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const line = scrollLineRef.current;
    if (!line) return;
    line.style.animation = "scrollPulse 2s ease-in-out infinite";
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Giant watermark year */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[24rem] md:text-[36rem] font-serif font-black opacity-[0.03] mix-blend-multiply select-none pointer-events-none leading-none"
        aria-hidden="true"
      >
        2025
      </div>

      <div className="max-w-[90rem] mx-auto px-6 w-full">
        <div
          ref={revealRef}
          className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-20 items-center"
        >
          {/* Left column — text */}
          <div className="flex flex-col justify-center" data-reveal>
            <span className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-[#B84221] mb-6">
              [ ACT I ]
            </span>
            <h1
              className="font-serif font-black tracking-tight mix-blend-multiply text-[#1C1A17] mb-8"
              style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)" }}
            >
              THE INQUIRY
            </h1>
            <div className="text-xl font-sans font-light leading-relaxed text-[#4A4A4A] max-w-xl space-y-6">
              <p>
                I grew up in Yuxi, Yunnan. In eighteen years, I never saw a Wamao
                in any house, any temple, or any rooftop. Then, around 2020, it
                appeared: on Douyin livestreams tagged &ldquo;Intangible Cultural
                Heritage,&rdquo; in blind-box collections on Xiaohongshu, on
                government banners along a newly built cultural street called
                Qinghua Jie.
              </p>
              <p>
                A creature I had never encountered was suddenly everywhere,
                claiming to be ancient.
              </p>
              <p>
                That puzzled me, because the Wamao is not a homegrown product of
                Yuxi. Across Yunnan, roof-guardian figures have deep and genuine
                roots: in Heqing, where Bai-ethnic potters have crafted them for
                generations as part of a house-building ritual called &ldquo;sealing
                the dragon&rsquo;s mouth&rdquo; (Ma Jia, 2018); in Binchuan, where
                Han-Chinese settlers brought them along pilgrimage routes to Jizu
                Mountain (Ma Jia, 2022a). But Yuxi had none of that. The artisans I
                later interviewed had no family lineage in Wamao-making. The
                workshops I visited had all pivoted to Wamao production after 2013,
                when local government launched a cultural tourism campaign. My
                grandmother remembers seeing Wamao figures on rooftops when she was
                young: people kept them for luck, rubbed them before mahjong games,
                occasionally placed one facing a wealthier neighbor&rsquo;s house to
                &ldquo;draw their fortune over.&rdquo; But as she put it, this was a
                minor folk habit tied to old courtyard houses, not something anyone
                would have called a community tradition.
              </p>
              <p>
                So I spent seven days in June 2025 embedded in two Yuxi workshops,
                talking to four people who make or sell Wamao for a living, and
                learning to shape clay alongside them. I also scraped 200
                Xiaohongshu posts and classified their content to see what happens
                to this object once it enters the consumer internet. And I read
                through the academic literature (the ethnographies, the
                art-historical analyses, the policy documents) to understand what
                scholars already know and where the gaps are.
              </p>
            </div>
          </div>

          {/* Right column — photo placeholder */}
          <div data-reveal>
            <div className="aspect-[3/4] rounded-2xl shadow-2xl shadow-black/10 overflow-hidden">
              <img src="/inquiry-hero.jpg" alt="Wamao figures in museum display" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span
          className="text-xs font-sans tracking-[0.2em] uppercase text-[#4A4A4A]/60"
          style={{ writingMode: "vertical-lr" }}
        >
          Scroll to discover
        </span>
        <div
          ref={scrollLineRef}
          className="w-px h-12 bg-[#4A4A4A]/30 origin-top"
        />
      </div>

      <style jsx>{`
        @keyframes scrollPulse {
          0%, 100% { transform: scaleY(1); opacity: 0.3; }
          50% { transform: scaleY(1.5); opacity: 0.8; }
        }
      `}</style>
    </section>
  );
}
