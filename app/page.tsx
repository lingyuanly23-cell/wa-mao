"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Prose from "../components/editorial/Prose";
import HomeTwoReadings from "../components/editorial/HomeTwoReadings";
import ChapterBridge from "../components/editorial/ChapterBridge";

export default function Home() {
  const containerRef = useRef<HTMLElement>(null);
  const tagRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const accentRef = useRef<SVGSVGElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

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
        yoyo: true
      }
    );
  }, []);

  return (
    <>
      <main className="relative flex flex-col min-h-screen w-full overflow-x-clip bg-[#F0EFEC] z-10">
      <section
        ref={containerRef}
        className="relative flex min-h-screen w-full flex-col bg-transparent"
      >
        {/* Giant Typography Background Watermark */}
        <div className="absolute top-[10%] left-[-5%] z-0 select-none pointer-events-none opacity-[0.04]">
          <span className="text-[24rem] md:text-[36rem] font-serif font-black leading-none text-[#1C1A17] tracking-tighter mix-blend-multiply">
            1381
          </span>
        </div>

        {/* Main Grid Container */}
        <div className="relative z-10 mx-auto w-full max-w-[90rem] flex-1 flex flex-col justify-center px-6 py-20 lg:grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-8 items-center">

          {/* Left Column: Typography Storytelling */}
          <div className="flex flex-col items-start justify-center w-full lg:pr-8 xl:pr-24">
            <p
              ref={tagRef}
              className="text-[#B84221] tracking-[0.22em] text-xs font-bold uppercase mb-8 font-sans"
            >
              [ THE YEAR 1381 ]
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
                className="font-reading text-[clamp(1.05rem,1.6vw,1.25rem)] text-[#2A2723] leading-[1.75] [text-wrap:pretty]"
              >
                The Wamao (literally &ldquo;tile cat&rdquo;) is a clay guardian figure placed on the
                rooftops of traditional houses across Yunnan, southwestern China. Across the province
                it goes by different names, for example &ldquo;ridge-taming tiger&rdquo; in Heqing,
                &ldquo;clay cat&rdquo; in Binchuan, &ldquo;unicorn&rdquo; in Jianchuan (Ma Jia, 2022).
                The word &ldquo;Wamao&rdquo; itself is a central-Yunnan term that academics later
                adopted as a province-wide label for these mythical-beast figures; it is not a name all
                the makers themselves use (Ma Jia, 2022). This project traces how that label, and the
                object it names, became the centerpiece of a heritage industry in a city that never had
                one.
              </p>

              {/* Hand-drawn underline accent */}
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
              className="relative w-full max-w-sm xl:max-w-md aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl shadow-black/10 bg-[#E6E4DF] border border-black/5"
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
        <div className="absolute bottom-12 left-6 lg:left-16 flex flex-col items-center gap-4 z-20">
          <span className="text-[0.65rem] uppercase tracking-[0.2em] font-sans font-medium text-black/40" style={{ writingMode: 'vertical-lr' }}>
            Scroll to discover
          </span>
          <div className="w-[1px] h-16 bg-black/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[#1C1A17] scroll-line-anim origin-top" />
          </div>
        </div>    </section>


      {/* Project Archive Section */}
      <div className="w-full text-[#1C1A17] relative overflow-hidden flex items-center pt-40 pb-20 z-10">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-[55%_45%] gap-20 relative z-10">

          {/* Left: Project Abstract */}
          <div className="flex flex-col justify-start lg:pr-12">
            <span className="text-[#B84221] tracking-[0.22em] text-xs font-bold uppercase mb-8 font-sans">
              [ PROJECT ARCHIVE ]
            </span>
            <h2 className="text-[clamp(3rem,6vw,5.5rem)] leading-[0.95] tracking-tight font-serif text-[#1C1A17] mix-blend-multiply font-bold mb-12">
              A digital ethnography of clay, fire, and memory.
            </h2>

            <Prose dropcap>
              <p>
                This project is an independent research archive dedicated to the Yunnan Wamao. It
                documents a cultural object whose origins remain debated among scholars. This project
                traces its recent history, documenting the evolution of Wamao from &hellip; onwards.
                Since 2013, the city of Yuxi has transformed this figure from a little-known folk item
                into a branded cultural product marketed under the banner of &ldquo;Intangible Cultural
                Heritage&rdquo;, a provincial-level designation the Wamao itself only officially
                received in 2023 (Wang Xinyuan, 2024).
              </p>
              <p>
                Through fieldwork in Yuxi&rsquo;s workshops, digital analysis of China&rsquo;s social
                media platforms, and engagement with the academic literature on Yunnan&rsquo;s
                architectural traditions, the goal of this project is to answer a simple question: what
                is the cultural and social significance of a city adopting, branding, and selling as
                its own heritage an object it never traditionally possessed?
              </p>
            </Prose>
          </div>

          {/* Right: The 3 Acts Overview */}
          <div className="flex flex-col justify-center">

            {/* Act I */}
            <Link href="/inquiry" className="group cursor-pointer border-b border-black/10 py-8 relative w-full block">
              <div className="transform transition-all duration-300 ease-out group-hover:translate-x-3 origin-left flex justify-between items-center w-full">
                <div className="w-full">
                  <span className="font-sans font-bold text-2xl text-[#1C1A17] group-hover:text-[#B84221] transition-colors duration-300 block">
                    ACT I: The Inquiry
                  </span>
                  <p className="text-base font-sans text-[#5b5751] mt-2 font-light group-hover:text-[#2A2723] transition-colors duration-300">
                    Fieldwork in Yuxi: four artisans, two workshops, and a heritage industry built from scratch.
                  </p>
                </div>
              </div>
            </Link>

            {/* Act II */}
            <Link href="/descent" className="group cursor-pointer border-b border-black/10 py-8 relative w-full block">
              <div className="transform transition-all duration-300 ease-out group-hover:translate-x-3 origin-left">
                <span className="font-sans font-bold text-2xl text-[#1C1A17] group-hover:text-[#B84221] transition-colors duration-300 block">
                  ACT II: Historical Background
                </span>
                <p className="text-base font-sans text-[#5b5751] mt-2 font-light group-hover:text-[#2A2723] transition-colors duration-300">
                  What scholars have found: the deep history, regional diversity, and ritual life of the Wamao across Yunnan.
                </p>
              </div>
            </Link>

            {/* Act III */}
            <Link href="/afterlife" className="group cursor-pointer border-b border-black/10 py-8 relative w-full block">
              <div className="transform transition-all duration-300 ease-out group-hover:translate-x-3 origin-left">
                <span className="font-sans font-bold text-2xl text-[#1C1A17] group-hover:text-[#B84221] transition-colors duration-300 block">
                  ACT III: The Digital Afterlife
                </span>
                <p className="text-base font-sans text-[#5b5751] mt-2 font-light group-hover:text-[#2A2723] transition-colors duration-300">
                  How 200 Xiaohongshu posts reveal what happens to a cultural object when it enters the consumer internet.
                </p>
              </div>
            </Link>

          </div>
        </div>
      </div>

      {/* Fieldwork & Methodology Section */}
      <section className="w-full py-40 relative z-10 bg-[#F0EFEC]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left Column: The Field Photos */}
          <div className="relative h-[500px] w-full max-w-md mx-auto md:max-w-none group cursor-pointer">
            {/* Image 1 */}
            <div className="absolute top-0 right-4 w-3/4 bg-white p-3 pb-10 border border-black/5 shadow-xl z-10 rotate-3 transition-all duration-500 ease-out group-hover:z-30 group-hover:scale-105 group-hover:-rotate-2 group-hover:-translate-x-4 group-hover:-translate-y-4">
              <img
                src="/第一页4.jpg"
                alt="Modern Wamao Display"
                className="w-full aspect-[4/3] object-cover bg-[#E6E4DF]"
              />
            </div>

            {/* Image 2 */}
            <div className="absolute bottom-4 left-0 w-2/3 bg-white p-3 pb-10 border border-black/5 shadow-xl z-20 -rotate-3 transition-all duration-500 ease-out group-hover:z-10 group-hover:scale-95 group-hover:rotate-4 group-hover:translate-x-4 group-hover:translate-y-4">
              <img
                src="/第一页5.jpg"
                alt="Artisans at work"
                className="w-full aspect-[4/5] object-cover bg-[#E6E4DF]"
              />
            </div>
          </div>

          {/* Right Column: The Methodology Text */}
          <div className="flex flex-col justify-center">
            <span className="text-[#B84221] tracking-[0.22em] text-xs font-bold uppercase mb-6 font-sans">
              [ FIELDWORK ]
            </span>
            <h2 className="text-[clamp(2.5rem,4vw,3.5rem)] leading-[0.95] tracking-tight font-serif text-[#1C1A17] mix-blend-multiply font-bold mb-10">
              Fieldwork Experience
            </h2>

            <Prose>
              <p>
                This archive is grounded in qualitative fieldwork I conducted in Yuxi, Yunnan Province,
                from June 16 to June 22, 2025. Over seven days, I interviewed four artisans and
                workshop personnel across two active ceramic workshops, focusing on how they produce
                Wamao, how they sell them, and what they think the objects actually mean. I also spent
                time learning the craft myself: shaping clay alongside the potters, getting a feel for
                the material and the labor that goes into each figure. Alongside this fieldwork, I
                collected 200 Xiaohongshu (Little Red Book) posts tagged with &ldquo;Wamao,&rdquo;
                scraped by keyword, and classified their content to see how this object is spread and
                understood in China&rsquo;s digital consumer culture.
              </p>
              <p>
                All quotations in this project are drawn from detailed field notes I took during and
                immediately after semi-structured interviews; they reflect the substance of what was
                said rather than verbatim transcripts. All interviewees are identified by their real
                names with their consent.
              </p>
            </Prose>
          </div>

        </div>
      </section>

      {/* TODAY Section */}
      <section className="w-full bg-[#F0EFEC] pt-40 pb-20 relative z-10 overflow-x-clip">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl flex flex-col items-center text-center px-6 mb-20">
          <span className="text-[#B84221] tracking-[0.22em] text-xs font-bold uppercase mb-6 font-sans">
            [ TODAY ]
          </span>
          <h2 className="text-[clamp(2.5rem,4vw,3.5rem)] leading-[0.95] tracking-tight font-serif text-[#1C1A17] mix-blend-multiply font-bold">
            A Quotidian Cultural Totem
          </h2>
        </div>

        {/* Opening TODAY paragraph (ritual in Heqing & Binchuan) */}
        <Prose dropcap>
          <p>
            The Wamao was once a house-guarding beast perched on ancient eaves, its giant mouth opened
            wide to swallow evil spirits. In the villages of Heqing and Binchuan, that mouth still
            carries ritual meaning. A Binchuan geomancer, interviewed by ethnographer Ma Jia in 2021,
            put it bluntly: a Wamao without a consecration ceremony is nothing more than &ldquo;a lump
            of clay, with no spiritual power whatsoever.&rdquo; In Heqing, the installation ritual is
            called &ldquo;sealing the dragon&rsquo;s mouth&rdquo;, and involves selecting an auspicious
            date, sacrificing a rooster, daubing its blood on the figure&rsquo;s eyes, mouth, and ears,
            and reciting prayers to unite the five cardinal directions into a single protective force
            (Ma Jia, 2018; Ma Jia, 2022b). The object on the roof is constructed and understood through
            this ritual: its protective power is taken to derive not from the clay or the open mouth,
            but from the act of consecration that binds the figure to a particular house and its
            occupants.
          </p>
        </Prose>

        {/* The approved scroll animation: same object, two readings */}
        <div className="my-12">
          <HomeTwoReadings />
        </div>

        {/* Remaining TODAY paragraphs (Yuxi no ritual; green coin bestseller; ICH 2023 vs 2014) */}
        <Prose>
          <p>
            In Yuxi, the Wamao is not coupled with any such ritual. The consecration that gives the
            figure its significance in Heqing and Binchuan plays no part in how it is made or sold here,
            and so it has shed whatever ritual weight it once carried and become something else: a
            palm-sized desk ornament, a ceramic cup accessory, a blind-box collectible.
          </p>
          <p>
            The bestselling model at one Yuxi workshop is a green figure with a coin lodged in its
            mouth. The open mouth, which in the older ritual context was meant to swallow and ward off
            evil spirits, has here been repurposed to attract wealth. If the coin sits inside, the back
            of the figure is sealed so that money cannot leak out; if the mouth is left empty, a hole is
            opened at the back to draw fortune in. In neither version does the design retain any
            reference to spirits or protection. Its logic is organized entirely around the promise of
            luck, and behind that, around what will sell to tourists.
          </p>
          <p>
            Yunnan Province officially designated the Wamao as a provincial-level Intangible Cultural
            Heritage item in 2023 (Wang Xinyuan, 2024). But Yuxi had already been marketing it as
            &ldquo;ICH&rdquo; for nearly a decade before that designation arrived. In 2014, the city
            secured ICH status for a different ceramic tradition, Yuxi blue-and-white porcelain (Yunnan
            Gateway, 2020). For the next nine years, the Wamao rode on that credential, bundled into the
            same &ldquo;ceramics heritage&rdquo; brand even though it had no ICH designation of its own.
          </p>
        </Prose>
      </section>

      <ChapterBridge
        eyebrow="[ BEGIN ]"
        title="ACT I: The Inquiry"
        description="Fieldwork in Yuxi: four artisans, two workshops, and a heritage industry built from scratch."
        href="/inquiry"
      />

      </main>
    </>
  );
}
