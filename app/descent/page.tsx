"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Link from "next/link";
export default function DescentPage() {
  return (
    <main className="flex min-h-screen w-full flex-col pt-20">
      <HistoryScrollTransition />
      <CraftHorizontalScroll />
    </main>
  );
}

const HistoryScrollTransition = () => {
  const containerRef = useRef<HTMLElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
      // 1. Background color transition to warm paper color for the entire section
      gsap.to(containerRef.current, {
        backgroundColor: "#FDFBF7",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom bottom",
          scrub: true,
        }
      });

      // 2. Animate each row (Image and Text stagger)
      rowsRef.current.forEach((row) => {
        if (!row) return;

        // Find the image and text containers within the row
        const elements = row.children;

        gsap.fromTo(elements,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2, // Image and text appear slightly offset
            ease: "power2.out",
            scrollTrigger: {
              trigger: row,
              start: "top 80%", // Reveal when row is 80% into the viewport
              toggleActions: "play none none reverse", // play on scroll down, reverse when scrolling all the way back up
            }
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const addToRowsRef = (el: HTMLDivElement | null, index: number) => {
    rowsRef.current[index] = el;
  };

  const narrativeData = [
    {
      title: "1381 • The Great Expedition",
      desc: "The Ming Dynasty dispatched 300,000 troops to the southwest frontier. Imperial power officially extended into the rugged red earth of Yunnan, bringing an end to the chaotic era.",
      imgSrc: "/第二页4.png"
    },
    {
      title: "Swords to Plowshares • The 'Jun Tun' System",
      desc: "To secure the border, soldiers became farmers. Massive military colonies were established across the province, fundamentally transforming the local demographic and economic landscape.",
      imgSrc: "/第二页3.png"
    },
    {
      title: "A Cultural Transplant",
      desc: "Millions of Han immigrants followed the army. Along with their families, they brought the architectural styles, folk beliefs, and cultural memories of the Central Plains to this foreign land.",
      imgSrc: "/第二页2.png"
    },
    {
      title: "Mud and Fire • The Artisans",
      desc: "Skilled craftsmen from the military built kilns to fire bricks for new courtyard homes. In these very kilns, driven by survival anxiety and cultural memory, the prototype of 'Wamao' was about to be molded.",
      imgSrc: "/第二页1.png"
    }
  ];

  return (
    <section ref={containerRef} className="relative w-full bg-white flex flex-col items-center py-40 overflow-hidden">

      {/* 卷轴引言 (Optional header to keep spacing) */}
      <h2 className="text-4xl font-serif text-[#4b5563] text-center z-10 mb-32 px-6 relative">
        But wait... is this the whole story?
      </h2>

      {/* 核心容器：长卷轴时间线 */}
      <div className="relative w-full max-w-6xl mx-auto px-6">

        {/* 中央的绝对定位橙色虚线 */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 border-l-2 border-dashed border-[#ff9f43] opacity-60 z-0" />

        {/* 历史节点列表 */}
        <div className="flex flex-col w-full gap-32 md:gap-48 relative z-10 pb-32">
          {narrativeData.map((data, index) => {
            // Alternate layout for variety (optional, but strictly adhering to your 'Left Image, Right Text' ask -> keeping them consistent here, 
            // but usually timelines alternate. I will stick exactly to: Left 50% image, Right 50% text).
            return (
              <div
                key={`row-${index}`}
                ref={(el) => addToRowsRef(el, index)}
                className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-0 w-full items-center"
              >
                {/* 左侧：图片容器 */}
                <div className="w-full flex justify-end md:pr-16">
                  <div className="relative w-full max-w-md aspect-[4/3] rounded-xl overflow-hidden shadow-[8px_8px_0px_rgba(0,0,0,0.05)] border border-gray-100 bg-gray-50">
                    <img src={data.imgSrc} alt={data.title} className="absolute inset-0 w-full h-full object-cover" />
                  </div>
                </div>

                {/* 右侧：文本内容 */}
                <div className="w-full flex justify-start md:pl-16 relative">
                  {/* 中央的时间线节点（小锚点）- Hidden on mobile, absolutely positioned to align with the center line */}
                  <div className="hidden md:block absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#FDFBF7] border-4 border-[#ff9f43] rounded-full shadow-[0_0_10px_rgba(255,159,67,0.5)] z-20" />

                  <div className="flex flex-col max-w-lg">
                    <h3 className="text-[#ff9f43] font-handwriting text-3xl md:text-5xl mb-6 leading-tight">
                      {data.title}
                    </h3>
                    <p className="text-[#4b5563] font-serif text-lg md:text-xl leading-relaxed">
                      {data.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

const CraftHorizontalScroll = () => {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !titleRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
      // Fade in up for the section title
      gsap.fromTo(titleRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%", // Triggers slightly before the section fully enters
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const craftSteps = [
    {
      num: "01",
      title: "Gathering the Earth",
      desc: "Artisans used leftover red or black clay from firing bricks. This cheap, local material gave Wamao its inherent roughness.",
      topClass: "top-[5vh]",
      zIndex: "z-10",
      imgSrc: "/第三页1.jpg"
    },
    {
      num: "02",
      title: "Shaping the Body",
      desc: "Forming the basic torso. This crucial step would later branch into two entirely different techniques across the province.",
      topClass: "top-[10vh]",
      zIndex: "z-20",
      imgSrc: "/第三页2.jpg"
    },
    {
      num: "03",
      title: "Awakening the Soul",
      desc: "Using knives and fingers to carve exaggerated eyes and horns. The most vital part: the giant, spirit-devouring maw.",
      topClass: "top-[15vh]",
      zIndex: "z-30",
      imgSrc: "/第三页3.jpg"
    },
    {
      num: "04",
      title: "Trial by Fire",
      desc: "Fired in low-temperature wood kilns. Extremely prone to weathering, yet this gave it the heavy, historical texture of the earth itself.",
      topClass: "top-[20vh]",
      zIndex: "z-40",
      imgSrc: "/第三页4.jpg"
    }
  ];

  return (
    <section ref={containerRef} className="relative w-full bg-white py-32 md:py-48 px-4 md:px-8 flex flex-col items-center">

      {/* 全局章节标题区域 */}
      <div ref={titleRef} className="w-full max-w-4xl text-center flex flex-col items-center mb-24 md:mb-32 px-4 z-10 relative">
        <span className="text-gray-400 font-sans text-sm tracking-[0.2em] uppercase mb-6 font-medium">
          THE CRAFT
        </span>
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif text-[#1c1c1e] font-black leading-[1.1] tracking-tight">
          Mud and Fire:<br className="md:hidden" /> The Birth of a Totem
        </h2>
        <p className="mt-8 text-xl md:text-2xl font-sans font-light text-[#c05621] max-w-2xl leading-relaxed italic">
          "A pair of rough hands, a lump of leftover clay, and the beginning of a spiritual defense."
        </p>
      </div>

      <div className="w-full max-w-6xl relative z-20">
        {craftSteps.map((step, index) => (
          <div
            key={`craft-card-${index}`}
            className={`sticky ${step.topClass} ${step.zIndex} w-full min-h-[85vh] bg-[#FDFBF7] rounded-3xl shadow-[0_-15px_40px_-15px_rgba(0,0,0,0.15)] border border-gray-100 flex flex-col md:flex-row items-center justify-center p-8 md:p-16 ${index === craftSteps.length - 1 ? 'mb-0' : 'mb-[50vh]'} overflow-hidden`}
          >
            {/* Giant background number watermark */}
            <div className="absolute top-1/2 right-12 md:right-24 -translate-y-1/2 text-[15rem] md:text-[30rem] font-serif font-black text-black opacity-[0.03] pointer-events-none z-0">
              {step.num}
            </div>

            {/* Left Column: Image Box */}
            <div className="w-full md:w-1/2 flex justify-center z-10 mb-12 md:mb-0">
              <div className="relative w-full max-w-sm aspect-square bg-[#e8e6e1] rounded-2xl shadow-inner flex items-center justify-center border border-gray-200/50 overflow-hidden">
                <img src={step.imgSrc} alt={step.title} className="absolute inset-0 w-full h-full object-cover" />
              </div>
            </div>

            {/* Right Column: Text Content */}
            <div className="w-full md:w-1/2 flex flex-col items-start justify-center z-10 md:pl-12">
              <span className="text-[#c05621] font-sans font-bold text-xl tracking-widest mb-4">
                STEP {step.num}
              </span>
              <h3 className="text-4xl md:text-5xl font-serif text-[#1c1c1e] mb-6 font-black leading-tight">
                {step.title}
              </h3>
              <p className="text-lg md:text-xl font-serif text-gray-600 leading-relaxed max-w-xl">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

