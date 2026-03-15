"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
  const containerRef = useRef<HTMLElement>(null);
  const tagRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const accentRef = useRef<SVGSVGElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Showcase refs
  const showcaseRef = useRef<HTMLElement>(null);
  const introTextRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initial UI Setup to avoid layout shifts/flickers
    const textElements = [tagRef.current, titleRef.current, subtitleRef.current, accentRef.current].filter(Boolean);
    if (textElements.length > 0) {
      gsap.set(textElements, { y: 40, opacity: 0 });
    }

    if (imageContainerRef.current && imageRef.current) {
      gsap.set(imageContainerRef.current, { opacity: 0 });
      gsap.set(imageRef.current, { scale: 1.05 });
    }

    // Build timeline
    const tl = gsap.timeline();

    // 1. Text entrance (staggered fade-in-up)
    if (textElements.length > 0) {
      tl.to(textElements, {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2
      });
    }

    // 2. Image container entrance & slow scale down
    if (imageContainerRef.current && imageRef.current) {
      tl.to(imageContainerRef.current, {
        opacity: 1,
        duration: 1.5,
        ease: "power2.out"
      }, "-=0.8")
        .to(imageRef.current, {
          scale: 1,
          duration: 2.5,
          ease: "power2.out"
        }, "-=1.5");
    }

    // 3. Gentle floating animation for the image container
    if (imageContainerRef.current) {
      gsap.to(imageContainerRef.current, {
        y: "-15px",
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        // Start floating safely along with entrance
        delay: 0.5
      });
    }

    // 4. Scroll indicator loop
    gsap.fromTo(".scroll-line-anim",
      { scaleY: 0, transformOrigin: "top" },
      {
        scaleY: 1,
        duration: 1.5,
        ease: "expo.inOut",
        repeat: -1,
        repeatDelay: 0.5,
        yoyo: true // For a smooth draw and erase effect
      }
    );

    // 5. CuteShowcase Stagger animation
    if (showcaseRef.current) {
      if (introTextRef.current) {
        gsap.fromTo(introTextRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: showcaseRef.current,
              start: "top 75%",
            }
          }
        );
      }

      if (cardsRef.current.length > 0) {
        gsap.fromTo(cardsRef.current,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: showcaseRef.current,
              // Start slightly after the intro text breaches
              start: "top 60%",
            }
          }
        );
      }
    }
  }, []);

  const addToCardsRef = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <>
      <main
        ref={containerRef}
        className="relative flex min-h-screen w-full flex-col bg-white overflow-hidden"
      >
        {/* Giant Typography Background Watermark */}
        <div className="absolute top-[10%] left-[-5%] z-0 select-none pointer-events-none opacity-[0.03]">
          <span className="text-[24rem] md:text-[36rem] font-serif font-black leading-none text-black tracking-tighter mix-blend-multiply">
            1381
          </span>
        </div>

        {/* Main Grid Container */}
        <div className="relative z-10 mx-auto w-full max-w-[90rem] flex-1 flex flex-col justify-center px-6 py-20 lg:grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-8 items-center">

          {/* Left Column: Typography Storytelling */}
          <div className="flex flex-col items-start justify-center w-full lg:pr-8 xl:pr-24">
            <p
              ref={tagRef}
              className="text-xs uppercase tracking-[0.3em] text-gray-400 font-sans mb-8 font-semibold"
            >
              THE year 1381

            </p>

            <h1
              ref={titleRef}
              className="text-7xl md:text-8xl xl:text-[8rem] font-serif text-[#1c1c1e] text-left leading-[1.05] mb-10 font-black tracking-tight"
            >
              WA MAO
            </h1>

            <div className="relative w-full max-w-xl">
              <p
                ref={subtitleRef}
                className="text-xl md:text-2xl font-sans text-gray-600 font-light leading-relaxed"
              >
                A secret of power and clay hidden on the eaves in the clouds
              </p>

              {/* Hand-drawn underline accent (Extended to point right) */}
              <svg
                ref={accentRef}
                className="absolute -bottom-8 left-0 w-64 h-6 text-[#c05621] opacity-60"
                viewBox="0 0 200 15"
                fill="none"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 8 Q 20 2, 40 8 T 80 8 T 120 8 Q 160 8, 195 2"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* Right Column: Visual Subject */}
          <div className="flex justify-center w-full mt-16 lg:mt-0 xl:-ml-12 relative z-10">
            <div
              ref={imageContainerRef}
              className="relative w-full max-w-sm xl:max-w-md aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl shadow-black/10 bg-gray-50 border border-gray-100/50"
            >
              <img
                ref={imageRef}
                src="/背景.jpg"
                alt="Wa Mao on the eaves"
                className="absolute inset-0 w-full h-full object-cover object-[15%_center]"
              />
            </div>
          </div>

        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-6 lg:left-16 flex flex-col items-center gap-4 z-20 mix-blend-exclusion text-white">
          <span className="text-[0.65rem] uppercase tracking-[0.2em] font-sans font-medium mix-blend-difference text-black/40" style={{ writingMode: 'vertical-lr' }}>
            Scroll to discover
          </span>
          <div className="w-[1px] h-16 bg-gray-200 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[#1c1c1e] scroll-line-anim origin-top" />
          </div>
        </div>    </main>

      {/* CuteShowcase Section */}
      <section ref={showcaseRef} className="w-full bg-white py-32 px-6 flex flex-col items-center relative z-10 overflow-hidden">
        <div className="mx-auto w-full max-w-6xl flex flex-col items-center">

          {/* Section Header */}
          <div className="flex flex-col items-center text-center px-4">
            <div className="relative inline-block mb-10">
              <h2 className="text-3xl font-sans text-gray-600 font-bold relative z-10">
                Today: A little monster sitting on urban desks
              </h2>
              <svg
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-full max-w-[12rem] h-3 text-[#4ecdc4] opacity-60 -z-10"
                viewBox="0 0 100 10"
                fill="none"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 5 Q 25 2, 50 5 T 100 5" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
              </svg>
            </div>

            {/* Identity Intro Text */}
            <p
              ref={introTextRef}
              className="w-full max-w-2xl mx-auto mb-16 text-lg md:text-xl font-serif text-gray-600 text-center leading-relaxed"
            >
              As a unique{" "}
              <span className="relative inline-block px-1">
                <span className="relative z-10 font-medium text-gray-800">Intangible Cultural Heritage</span>
                <span className="absolute bottom-1 left-0 w-full h-3 bg-[#ff9f43]/30 -z-10 -rotate-1 rounded-sm"></span>
              </span>{" "}
              of Yunnan, Wa Mao was originally a house-guarding beast sitting on ancient{" "}
              <span className="relative inline-block px-1">
                <span className="relative z-10 font-medium text-gray-800">eaves</span>
                <span className="absolute bottom-1 left-0 w-full h-3 bg-[#4ecdc4]/30 -z-10 rotate-1 rounded-sm"></span>
              </span>{", "}
              with its giant mouth wide open to swallow evil spirits. But time seems to have smoothed its fangs. Today, it steps down from the high roofs, sheds the rough breath of clay, and transforms into the most adorable, healing blind-box on the desks of urban youth.
            </p>
          </div>

          {/* Polaroid Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 w-full">

            {/* Card 1 */}
            <div
              ref={addToCardsRef}
              className="bg-white p-4 pb-8 border border-gray-100 flex flex-col items-center transition-all duration-300 hover:scale-105 hover:rotate-0 -rotate-[3deg] shadow-[6px_6px_0px_#4ecdc4] group cursor-pointer"
            >
              <div className="w-full aspect-square bg-gray-100 rounded-md mb-6 overflow-hidden relative">
                <img src="/第一页2.jpg" alt="Wa Mao polaroid 1" className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <p className="font-handwriting text-lg text-gray-700 text-center leading-relaxed px-2">
                A giant mouth trying to act cute? It's actually to swallow evil spirits~
              </p>
            </div>

            {/* Card 2 */}
            <div
              ref={addToCardsRef}
              className="bg-white p-4 pb-8 border border-gray-100 flex flex-col items-center transition-all duration-300 hover:scale-105 hover:rotate-0 rotate-[2deg] shadow-[6px_6px_0px_#ff9f43] mt-0 md:mt-8 group cursor-pointer"
            >
              <div className="w-full aspect-square bg-gray-100 rounded-md mb-6 overflow-hidden relative">
                <img src="/第一页1.jpg" alt="Wa Mao polaroid 2" className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <p className="font-handwriting text-lg text-gray-700 text-center leading-relaxed px-2">
                A chubby body, dressed in a delicate blue-and-white porcelain coat ✨
              </p>
            </div>

            {/* Card 3 */}
            <div
              ref={addToCardsRef}
              className="bg-white p-4 pb-8 border border-gray-100 flex flex-col items-center transition-all duration-300 hover:scale-105 hover:rotate-0 -rotate-[1deg] shadow-[6px_6px_0px_#ff6b6b] mt-0 md:-mt-4 group cursor-pointer"
            >
              <div className="w-full aspect-square bg-gray-100 rounded-md mb-6 overflow-hidden relative">
                <img src="/第一页3.jpg" alt="Wa Mao polaroid 3" className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <p className="font-handwriting text-lg text-gray-700 text-center leading-relaxed px-2">
                Jumping from the eaves to the desk, it became a healing master meow in a blind box.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* History Scroll Transition Section */}
      <HistoryScrollTransition />

      {/* Craft Horizontal Scroll Section */}
      <CraftHorizontalScroll />

      {/* Evolution and Architecture Section */}
      <EvolutionAndArchitecture />

      {/* Witchcraft Taboo Section */}
      <WitchcraftTaboo />

      {/* Epilogue Spectacle Section */}
      <EpilogueSpectacle />

      {/* Credits Footer */}
      <CreditsFooter />
    </>
  );
}

const HistoryScrollTransition = () => {
  const containerRef = useRef<HTMLElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

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

const WitchcraftTaboo = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const block1Ref = useRef<HTMLDivElement>(null);
  const block2Ref = useRef<HTMLDivElement>(null);
  const dawnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
          start: "top 50%",
          end: "bottom 50%",
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
        <div className="md:w-1/2 md:sticky md:top-0 h-[50vh] md:h-screen flex items-center justify-center p-8">
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
        <div className="md:w-1/2 flex flex-col">
          {narrativeData.map((item, idx) => (
            <div
              key={`text-${idx}`}
              ref={(el) => addToBlocks(el, idx)}
              className={`min-h-screen flex flex-col justify-center px-4 md:px-16 ${idx === narrativeData.length - 1 ? "pb-[50vh]" : ""}`}
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
