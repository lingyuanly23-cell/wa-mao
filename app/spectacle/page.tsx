"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Link from "next/link";
export default function SpectaclePage() {
  return (
    <main className="flex min-h-screen w-full flex-col pt-20">
      <EpilogueSpectacle />
      <CreditsFooter />
    </main>
  );
}

const EpilogueSpectacle = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textBlocksRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!sectionRef.current) return;

    const rafId = requestAnimationFrame(() => {
      const blocks = textBlocksRef.current;

      blocks.forEach((block, index) => {
        if (!block) return;

        ScrollTrigger.create({
          trigger: block,
          start: "top 65%",
          end: "bottom 65%",
          onEnter: () => setActiveIndex(index),
          onEnterBack: () => setActiveIndex(index),
        });
      });
    });

    return () => {
      cancelAnimationFrame(rafId);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  const addToBlocks = (el: HTMLDivElement | null, idx: number) => {
    textBlocksRef.current[idx] = el;
  };

  const narrativeData = [
    {
      title: "The Roofs are Gone",
      body: "Stripped of the traditional \u2018Yikeyin\u2019 courtyards, the guardian loses its physical anchor. It descends from the wind-swept tiles into the sterile light of modern galleries.",
      imgSrc: "/第六页1.jpg",
    },
    {
      title: "A Designed Smile",
      body: "The raw, blood-red earth is covered by smooth, colorful glaze. The terrifying maw, once meant to swallow demons, is re-shaped and softened to appease the modern consumer.",
      imgSrc: "/第六页2.jpg",
    },
    {
      title: "The Plastic Clone",
      body: "A million copies roll off the assembly line. Cuteness becomes the new currency. The fierce historical totem is shrunken, boxed, and sold as a blind-box toy on an office desk.",
      imgSrc: "/第六页3.jpg",
    },
    {
      title: "Echoes of the Red Earth",
      body: "When you gaze at the cute monster beside your keyboard, do you still hear the clashing swords of the 300,000 Ming soldiers? The totem survives, but the memory fades.",
      imgSrc: "/第六页4.jpg",
      italic: true,
    },
  ];

  return (
    <section
      id="epilogue"
      ref={sectionRef}
      className="relative w-full bg-[#FAFAFA] text-[#1a1a1a] z-20 pt-32 pb-48"
    >
      {/* Chapter Header */}
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center text-center px-6 mb-32">
        <p className="text-xs font-sans tracking-[0.3em] uppercase text-gray-400 mb-8">
          Act IV&nbsp;&nbsp;·&nbsp;&nbsp;The Spectacle
        </p>
        <h2 className="font-serif text-6xl md:text-8xl leading-tight text-[#1a1a1a]">
          From Totem to Toy.
        </h2>
        <p className="text-xl md:text-2xl font-sans text-gray-500 max-w-3xl mt-12 leading-relaxed">
          The red earth is glazed, the fangs are filed, and the guardian descends from the roof to the display window.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row relative">

        {/* Left: Sticky Media Column */}
        <div className="w-full md:w-1/2 sticky top-0 h-[45vh] md:h-screen flex items-center justify-center bg-[#FAFAFA] z-20 pointer-events-none p-6 md:p-8">
          <div className="w-full aspect-square rounded-2xl shadow-2xl overflow-hidden relative bg-gray-200">
            {narrativeData.map((item, idx) => (
              <div
                key={`img-${idx}`}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${activeIndex === idx ? "opacity-100" : "opacity-0"}`}
              >
                <img src={item.imgSrc} alt={item.title} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Scrolling Text Column */}
        <div className="w-full md:w-1/2 flex flex-col relative z-10 bg-[#FAFAFA]">
          {narrativeData.map((item, idx) => (
            <div
              key={`text-${idx}`}
              ref={(el) => addToBlocks(el, idx)}
              className={`min-h-[60vh] md:min-h-screen flex flex-col justify-start md:justify-center px-6 md:px-16 pt-[45vh] md:pt-0 pb-12 bg-[#FAFAFA] ${idx === narrativeData.length - 1 ? "pb-[50vh]" : ""}`}
            >
              <h3 className="font-serif text-4xl md:text-5xl mb-6 text-[#1a1a1a] leading-tight">
                {item.title}
              </h3>
              <p className={`text-xl leading-relaxed text-gray-600 ${item.italic ? "italic" : ""}`}>
                {item.body}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

const CreditsFooter = () => {
  return (
    <footer id="credits" className="bg-[#0a0a0a] text-gray-400 py-32 px-6 relative z-30 border-t border-white/5">

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

        {/* Left: The Gratitude Card */}
        <div className="lg:col-span-7 group flex flex-col bg-[#161616] border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]">

          {/* Card top: photo */}
          <div className="w-full aspect-[3/2] bg-gray-800 relative overflow-hidden">
            <img src="/结尾.jpg" alt="Fieldwork in Yunnan" className="absolute inset-0 w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 ease-out" />
          </div>

          {/* Card bottom: text */}
          <div className="p-8 md:p-12 flex flex-col">
            <span className="text-xs tracking-[0.2em] text-gray-500 mb-6 uppercase font-sans">
              Fieldwork & Gratitude
            </span>
            <h4 className="font-serif text-2xl md:text-3xl text-white leading-snug mb-4">
              Yuqing Kiln Workshop (&#x7389;&#x6E05;&#x70E7;&#x5DE5;&#x574A;)
            </h4>
            <h4 className="font-serif text-2xl md:text-3xl text-white leading-snug mb-8">
              Wamao Daren Studio (&#x74E6;&#x732B;&#x5927;&#x4EBA;&#x5DE5;&#x4F5C;&#x5BA4;)
            </h4>
            <p className="text-gray-400 leading-relaxed">
              Deepest gratitude for opening your doors, sharing your fires, and allowing me to document the living soul of the red earth craft.
            </p>
          </div>
        </div>

        {/* Right: Author & Refs */}
        <div className="lg:col-span-4 lg:col-start-9 flex flex-col space-y-20 pt-4">

          {/* Block A: About the Researcher */}
          <div className="flex flex-col">
            <span className="text-xs tracking-[0.2em] text-gray-500 mb-6 uppercase font-sans">
              The Researcher
            </span>
            <h4 className="text-white font-serif text-3xl mb-4">
              By Li Houjun
            </h4>
            <p className="text-gray-400 leading-relaxed">
              An independent researcher exploring the intersection of sociology, history, and digital humanities. Fascinated by how cultural totems survive and mutate.
            </p>
            <a
              href="mailto:s24037.li@stu.scie.com.cn"
              className="mt-6 inline-block text-white border-b border-gray-600 hover:border-white pb-1 transition-colors w-max"
            >
              Get in touch &rarr;
            </a>
          </div>

          {/* Block B: References & Colophon */}
          <div className="flex flex-col">
            <span className="text-xs tracking-[0.2em] text-gray-500 mb-6 uppercase font-sans">
              Archives & Tech
            </span>
            <ul className="space-y-4 text-sm leading-relaxed">
              <li>Zhang, T., et al. (1974). <em>Ming shi</em> [History of Ming]. Zhonghua Book Company.</li>
              <li>Tu, B., et al. (1998). <em>Yunnan tongzhi</em> [General Annals of Yunnan] (Wanli ed.). Yunnan Historical Materials Collection.</li>
              <li>Shaanxi Provincial Institute of Archaeology. (1998). <em>Shaanxi Tongchuan Yaozhou yaozhi fajue baogao</em>. Science Press.</li>
              <li>Frazer, J. G. (1922). <em>The Golden Bough: A Study in Magic and Religion</em>. Macmillan.</li>
              <li>Anonymous. (n.d.). Yizu hu wenhua yu hu xingxiang. <em>Yi People Network</em>. Retrieved March 14, 2026, from <a href="http://www.yizuren.com/yistudy/yxyjjx/48819.html" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white underline underline-offset-2 transition-colors">yizuren.com</a></li>
            </ul>
            <p className="mt-8 text-xs text-gray-600">
              Designed & built with Next.js, Tailwind CSS. Typography set in [Font Name].
            </p>
          </div>

        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-32 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
        <span>&copy; 2026 Li Houjun. All rights reserved.</span>
        <span className="mt-4 md:mt-0">From the red earth of Yunnan to the digital archive.</span>
      </div>

    </footer>
  );
}
