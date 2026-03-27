"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
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
      <main className="relative flex flex-col min-h-screen w-full overflow-x-hidden bg-white bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.03)_100%)] z-10">
      <section
        ref={containerRef}
        className="relative flex min-h-screen w-full flex-col bg-transparent"
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
              className="text-[#B84221] tracking-[0.2em] text-xs font-bold uppercase mb-8 font-sans"
            >
              THE year 1381
            </p>

            <h1
              ref={titleRef}
              className="text-[clamp(4rem,10vw,8rem)] font-serif text-[#1C1A17] mix-blend-multiply text-left leading-[0.95] mb-10 font-black tracking-tight"
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
        </div>    </section>


      {/* Project Archive Section */}
      <div className="w-full text-[#1A1A1A] relative overflow-hidden flex items-center pt-40 pb-20 z-10">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-[55%_45%] gap-20 relative z-10">
          
          {/* Left: Project Abstract */}
          <div className="flex flex-col justify-center lg:pr-12">
            <span className="text-[#B84221] tracking-[0.2em] text-xs font-bold uppercase mb-8 font-sans">
              [ PROJECT ARCHIVE ]
            </span>
            <h2 className="text-[clamp(3rem,6vw,5.5rem)] leading-[0.95] tracking-tight font-serif text-[#1C1A17] mix-blend-multiply font-bold mb-10">
              A digital ethnography of clay, fire, and memory.
            </h2>
            <p className="text-xl font-sans text-[#4A4A4A] leading-relaxed max-w-2xl font-light">
              This project is an independent digital archive dedicated to the Yunnan 'Wamao' (瓦猫). It traces the 600-year evolution of a fierce, roof-guarding beast born from Ming Dynasty military settlements, down to its current iteration as a docile, mass-produced desk toy. The goal is not merely to showcase a traditional craft, but to deconstruct how cultural totems survive, mutate, and are ultimately consumed by the modern spectacle.
            </p>
          </div>

          {/* Right: The 4 Acts Overview */}
          <div className="flex flex-col justify-center">
            
            {/* Act I */}
            <Link href="/" className="group cursor-pointer border-b border-gray-200/50 py-8 relative w-full block">
              <div className="transform transition-all duration-300 ease-out group-hover:translate-x-3 origin-left flex justify-between items-center w-full">
                <div className="w-full">
                  <span className="font-sans font-bold text-2xl text-[#1A1A1A] group-hover:text-[#B84221] transition-colors duration-300 block">
                    ACT I: The Illusion
                  </span>
                  <p className="text-base font-sans text-gray-500 mt-2 font-light group-hover:text-gray-700 transition-colors duration-300">
                    The modern misunderstanding of a cute desk ornament.
                  </p>
                </div>
              </div>
              
              {/* Playful light-cyan illustration */}
              <div className="absolute right-[-1rem] top-1/2 -translate-y-1/2 text-cyan-300 z-0 opacity-40 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-500 w-16 h-16 pointer-events-none mix-blend-multiply">
                 <svg viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                   <path d="M50 10 Q 70 5, 80 20 T 90 40 Q 95 60, 80 80 T 50 90 Q 20 95, 10 80 T 10 40 Q 20 5, 50 10" />
                   {/* Tiny eyes and mouth */}
                   <circle cx="35" cy="40" r="4" fill="#1A1A1A" />
                   <circle cx="65" cy="40" r="4" fill="#1A1A1A" />
                   <path d="M40 60 Q 50 70, 60 60" stroke="#1A1A1A" strokeWidth="3" fill="none" strokeLinecap="round" />
                 </svg>
              </div>
            </Link>

            {/* Act II */}
            <Link href="/descent" className="group cursor-pointer border-b border-gray-200/50 py-8 relative w-full block">
              <div className="transform transition-all duration-300 ease-out group-hover:translate-x-3 origin-left">
                <span className="font-sans font-bold text-2xl text-[#1A1A1A] group-hover:text-[#B84221] transition-colors duration-300 block">
                  ACT II: The Descent
                </span>
                <p className="text-base font-sans text-gray-500 mt-2 font-light group-hover:text-gray-700 transition-colors duration-300">
                  Geographical mutation from imperial order to primal roar.
                </p>
              </div>
            </Link>

            {/* Act III */}
            <Link href="/taboo" className="group cursor-pointer border-b border-gray-200/50 py-8 relative w-full block">
              <div className="transform transition-all duration-300 ease-out group-hover:translate-x-3 origin-left">
                <span className="font-sans font-bold text-2xl text-[#1A1A1A] group-hover:text-[#B84221] transition-colors duration-300 block">
                  ACT III: The Name Taboo
                </span>
                <p className="text-base font-sans text-gray-500 mt-2 font-light group-hover:text-gray-700 transition-colors duration-300">
                  The linguistic magic of calling a tiger a 'cat'.
                </p>
              </div>
            </Link>

            {/* Act IV */}
            <Link href="/spectacle" className="group cursor-pointer border-b border-gray-200/50 py-8 relative w-full block">
              <div className="transform transition-all duration-300 ease-out group-hover:translate-x-3 origin-left">
                <span className="font-sans font-bold text-2xl text-[#1A1A1A] group-hover:text-[#B84221] transition-colors duration-300 block">
                  ACT IV: The Spectacle
                </span>
                <p className="text-base font-sans text-gray-500 mt-2 font-light group-hover:text-gray-700 transition-colors duration-300">
                  The final surrender to consumerism.
                </p>
              </div>
            </Link>

          </div>
        </div>
      </div>
      
      {/* Fieldwork & Methodology Section */}
      <section className="w-full py-40 relative z-10 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: The Field Photos */}
          <div className="relative h-[500px] w-full max-w-md mx-auto md:max-w-none group cursor-pointer">
            {/* Image 1 (Originally Background) */}
            <div className="absolute top-0 right-4 w-3/4 bg-white p-3 pb-10 border border-gray-100 shadow-xl z-10 rotate-3 transition-all duration-500 ease-out group-hover:z-30 group-hover:scale-105 group-hover:-rotate-2 group-hover:-translate-x-4 group-hover:-translate-y-4">
              <img 
                src="/第一页4.jpg" 
                alt="Modern Wamao Display" 
                className="w-full aspect-[4/3] object-cover bg-gray-200"
              />
            </div>
            
            {/* Image 2 (Originally Foreground) */}
            <div className="absolute bottom-4 left-0 w-2/3 bg-white p-3 pb-10 border border-gray-100 shadow-xl z-20 -rotate-3 transition-all duration-500 ease-out group-hover:z-10 group-hover:scale-95 group-hover:rotate-4 group-hover:translate-x-4 group-hover:translate-y-4">
              <img 
                src="/第一页5.jpg" 
                alt="Artisans at work" 
                className="w-full aspect-[4/5] object-cover bg-gray-300"
              />
            </div>
          </div>

          {/* Right Column: The Methodology Text */}
          <div className="flex flex-col justify-center">
            <span className="text-[#B84221] tracking-[0.2em] text-xs font-bold uppercase mb-6 font-sans">
              [ THE FIELDWORK ]
            </span>
            <h2 className="text-[clamp(2.5rem,4vw,3.5rem)] leading-[0.95] tracking-tight font-serif text-[#1C1A17] mix-blend-multiply font-bold mb-8">
              Grounding the myth in reality.
            </h2>
            <p className="text-xl font-sans text-[#4A4A4A] leading-relaxed max-w-xl font-light mb-10">
              This digital archive is built upon extensive qualitative fieldwork across Yunnan. To understand how a 600-year-old architectural guardian transforms into a modern consumer spectacle, we had to trace the clay from the kiln to the city.
            </p>
            <ul className="space-y-5">
              <li className="flex items-start">
                <span className="text-[#C84B31] mr-4 mt-1.5 text-lg">•</span>
                <span className="text-lg font-sans text-[#4A4A4A] font-light leading-relaxed">In-depth interviews with independent artisans and workshop owners.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#C84B31] mr-4 mt-1.5 text-lg">•</span>
                <span className="text-lg font-sans text-[#4A4A4A] font-light leading-relaxed">Extensive oral history conversations with local residents.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#C84B31] mr-4 mt-1.5 text-lg">•</span>
                <span className="text-lg font-sans text-[#4A4A4A] font-light leading-relaxed">Consultations and dialogues with municipal city planning and cultural departments.</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* CuteShowcase Section */}
      <section ref={showcaseRef} className="w-full bg-transparent py-40 px-6 flex flex-col items-center relative z-10 overflow-hidden">
        <div className="mx-auto w-full max-w-6xl flex flex-col items-center">

          {/* Section Header */}
          <div className="flex flex-col items-center text-center px-4">
            <span className="text-[#B84221] tracking-[0.2em] text-xs font-bold uppercase mb-6 font-sans">
              [ TODAY ]
            </span>
            <div className="relative inline-block mb-10">
              <h2 className="text-[clamp(2.5rem,4vw,3.5rem)] leading-[0.95] tracking-tight font-serif text-[#1C1A17] mix-blend-multiply font-bold relative z-10">
                A little monster sitting on urban desks
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

      </main>
    </>
  );
}
