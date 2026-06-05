"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Prose from "@/components/editorial/Prose";
import ChapterBridge from "@/components/editorial/ChapterBridge";

/** All visible text is verbatim from _v4_extract.txt, Act II (English only). */

export default function DescentPage() {
  return (
    <main className="flex min-h-screen w-full flex-col bg-[#F0EFEC] pt-20">
      <ActOpener />
      <FiveTheories />
      <HistoryScrollTransition />
      <CraftHorizontalScroll />
      <CraftDetail />
      <ChapterBridge
        title="ACT III: The Digital Afterlife"
        description="How 200 Xiaohongshu posts reveal what happens to a cultural object when it enters the consumer internet."
        href="/afterlife"
      />
    </main>
  );
}

/* ───────────────────────────── Opening ───────────────────────────── */

const ActOpener = () => {
  return (
    <section className="mx-auto flex min-h-[52vh] max-w-3xl flex-col justify-center px-6 pt-24 pb-12">
      <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#B84221]">
        [ ACT II · LITERATURE REVIEW &amp; HISTORY ]
      </p>
      <h1 className="mt-5 font-reading text-[clamp(2.4rem,6vw,4.4rem)] font-semibold leading-[1.05] text-[#1C1A17]">
        A past more complicated<br className="hidden md:block" /> than the label.
      </h1>
      <div className="mt-10">
        <Prose>
          <p>
            The Wamao&rsquo;s past is more complicated than the &ldquo;600-year-old
            heritage&rdquo; label suggests, and less settled than any single origin
            story would have you believe.
          </p>
          <p>
            Where Act I documented the fieldwork, this Act turns to the scholarship: a
            review of what scholars have found about the deep history, regional
            diversity, and ritual life of the Wamao across Yunnan, drawing on a
            literature review of eleven studies published between 2002 and 2025.
          </p>
          <p>
            This project does not attempt a comprehensive survey of Yunnan&rsquo;s
            Wamao traditions; that work has been accomplished by scholars including
            Ma Jia (2018, 2022), Lu Jun &amp; Sirivesmas (2025), Cao Anli &amp; Xin
            Beini (2025), and Wang Xinyuan (2024).
          </p>
        </Prose>
      </div>
    </section>
  );
};

/* ───────────────────── Five Theories (typographic) ───────────────────── */

const THEORIES = [
  {
    num: "01",
    text: (
      <>
        a domestic cat protecting grain stores, rooted in Neolithic agricultural
        settlements (Wang Xinyuan, 2024)
      </>
    ),
  },
  {
    num: "02",
    text: (
      <>
        a stand-in for the tiger, linked to Yi and Bai ethnic cosmologies (Yang
        Zhaolin, 2002)
      </>
    ),
  },
  {
    num: "03",
    text: <>an owl or phoenix from Han-dynasty funerary traditions</>,
  },
  {
    num: "04",
    text: (
      <>
        a composite creature blending features of the chiwen ridge-swallower, the
        ao fish, the xiezhi, and the jiaoduan, four mythical beasts from the
        Chinese architectural vocabulary (Cao Anli &amp; Xin Beini, 2025)
      </>
    ),
  },
  {
    num: "05",
    text: (
      <>
        or a practical smoke-ventilation device whose spiritual overlay was added
        later, as evidenced by soot marks found inside door-mounted Wamao in
        Yiliang County (Wang Xinyuan, 2024)
      </>
    ),
  },
];

const FiveTheories = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLElement>(".theory-row");
      rows.forEach((row) => {
        gsap.fromTo(
          row,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 85%" },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full border-y border-[#1C1A17]/10 bg-[#F0EFEC] px-6 py-28 md:py-40"
    >
      <div className="mx-auto w-full max-w-5xl">
        <span className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#B84221]">
          [ What it might have been ]
        </span>
        <h2 className="mt-6 max-w-4xl font-reading text-[clamp(1.9rem,4.4vw,3.2rem)] font-semibold leading-[1.12] text-[#1C1A17]">
          Scholars have proposed at least five different theories about what the
          Wamao originally was:
        </h2>

        <ol className="mt-16 flex flex-col">
          {THEORIES.map((t, i) => (
            <li
              key={t.num}
              className={`theory-row grid grid-cols-[auto_1fr] items-baseline gap-x-6 gap-y-2 py-8 md:gap-x-12 ${
                i === 0 ? "border-t" : ""
              } border-b border-[#1C1A17]/12`}
            >
              <span className="font-reading text-[clamp(2.4rem,6vw,4rem)] font-semibold leading-none text-[#B84221]/35 tabular-nums">
                {t.num}
              </span>
              <p className="font-reading text-[1.2rem] md:text-[1.3rem] font-medium leading-[1.55] text-[#1C1A17] [text-wrap:pretty]">
                {t.text}
              </p>
            </li>
          ))}
        </ol>

        <p className="mt-16 max-w-3xl font-reading text-[0.975rem] md:text-[1.05rem] leading-[1.65] text-[#2A2723] [text-wrap:pretty]">
          There is no consensus, and the name &ldquo;Wamao&rdquo; itself turns out
          to be a regional label from central Yunnan that scholars adopted as a
          province-wide term, not a universal folk name (Ma Jia, 2022).
        </p>

        <p className="mt-10 max-w-3xl font-reading text-[1.2rem] md:text-[1.35rem] font-medium leading-[1.5] text-[#1C1A17]">
          What is clear is that the Wamao&rsquo;s history cannot be separated from
          the history of migration and kiln culture in Yunnan.
        </p>
      </div>
    </section>
  );
};

/* ───────────────────── 1381 vertical timeline (kept) ───────────────────── */

const HistoryScrollTransition = () => {
  const containerRef = useRef<HTMLElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
      // 1. Background color transition to warm paper color for the entire section
      gsap.to(containerRef.current, {
        backgroundColor: "#F7F6F4",
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
      desc: "In 1381, the Ming Dynasty sent 300,000 troops into the southwestern frontier under General Fu Youde. Soldiers were settled as military colonists (军屯), given land to farm, and expected to hold the border permanently.",
      imgSrc: "/第二页4.png"
    },
    {
      title: "Beibanbang • Founded 1382",
      desc: "In the Heqing region, ethnographic fieldwork has confirmed that the village of Beibanbang, one of the best-documented centers of Wamao production, was founded by Han Chinese military settlers who arrived in 1382 under General Lan Yu (Ma Jia, 2018). These settlers built courtyard houses modeled on Central Plains architecture, and they brought the practice of placing guardian figures on roof ridges.",
      imgSrc: "/第二页3.png"
    },
    {
      title: "Kilns for Brick, Kilns for Wamao",
      desc: "The kilns these colonists built to fire bricks for their new homes also fired the earliest Wamao prototypes. The ethnographer Ma Jia has argued that Wamao production is structurally tied to the brick-and-tile industry: “Where there are no brick kilns, there are no Wamao” (Ma Jia, 2018).",
      imgSrc: "/第二页2.png"
    },
    {
      title: "Side Products of the Kiln",
      desc: "The figures were not made by specialist craftsmen. They were side products, shaped from leftover clay by kiln workers as favors for neighbors who were building new houses. In the village of Beibanbang, an elderly worker recalled that in the old days, “if you were friends with someone, you’d make one for them during your spare time at the kiln, and fire it alongside the regular batch of tiles” (Ma Jia, 2018).",
      imgSrc: "/第二页1.png"
    }
  ];

  return (
    <section ref={containerRef} className="relative w-full bg-white flex flex-col items-center py-40 overflow-hidden">

      {/* Section header — editorial kicker + headline, matching the rest of the act */}
      <div className="w-full max-w-6xl mx-auto px-6 mb-24 md:mb-32 relative z-10">
        <span className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#B84221]">
          [ Migration &amp; kiln culture ]
        </span>
        <h2 className="mt-6 font-reading text-[clamp(1.9rem,4.4vw,3.2rem)] font-semibold leading-[1.12] text-[#1C1A17]">
          1381 — The Great Expedition
        </h2>
      </div>

      {/* 核心容器：长卷轴时间线 */}
      <div className="relative w-full max-w-6xl mx-auto px-6">

        {/* 中央的绝对定位陶红虚线 */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 border-l-2 border-dashed border-[#B84221] opacity-50 z-0" />

        {/* 历史节点列表 */}
        <div className="flex flex-col w-full gap-32 md:gap-48 relative z-10 pb-32">
          {narrativeData.map((data, index) => {
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
                  <div className="hidden md:block absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#F7F6F4] border-4 border-[#B84221] rounded-full shadow-[0_0_10px_rgba(184,66,33,0.5)] z-20" />

                  <div className="flex flex-col max-w-lg">
                    <h3 className="text-[#1C1A17] font-serif text-2xl md:text-3xl font-bold mb-6 leading-tight">
                      {data.title}
                    </h3>
                    <p className="text-[#2A2723] font-reading text-[0.975rem] md:text-[1.05rem] leading-[1.65]">
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

/* ───────────────────── Craft horizontal scroll (kept) ───────────────────── */

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
      title: "Gathering the Earth.",
      desc: "Artisans use locally sourced red or black clay, the same material used for bricks and roof tiles.",
      topClass: "top-[5vh]",
      zIndex: "z-10",
      imgSrc: "/第三页1.jpg"
    },
    {
      num: "02",
      title: "Shaping the Body.",
      desc: "In Heqing, the Wamao is entirely hand-molded without molds. In Binchuan, artisans use a different method: carving the figure from a solid clay block.",
      topClass: "top-[10vh]",
      zIndex: "z-20",
      imgSrc: "/第三页2.jpg"
    },
    {
      num: "03",
      title: "Awakening the Face.",
      desc: "The face is the hardest part. Using fingers and a few simple tools, the artisan sculpts bulging eyes, flared nostrils, and the defining feature: the wide-open mouth.",
      topClass: "top-[15vh]",
      zIndex: "z-30",
      imgSrc: "/第三页3.jpg"
    },
    {
      num: "04",
      title: "Trial by Fire.",
      desc: "Traditional Wamao are fired in dome-shaped coal kilns known locally as \"black-tile kilns,\" at temperatures between 1,000 and 1,400 degrees Celsius.",
      topClass: "top-[20vh]",
      zIndex: "z-40",
      imgSrc: "/第三页4.jpg"
    }
  ];

  return (
    <section ref={containerRef} className="relative w-full bg-white py-32 md:py-48 px-4 md:px-8 flex flex-col items-center">

      {/* 全局章节标题区域 */}
      <div ref={titleRef} className="w-full max-w-4xl text-center flex flex-col items-center mb-24 md:mb-32 px-4 z-10 relative">
        <span className="text-[#B84221] font-sans text-xs font-bold tracking-[0.2em] uppercase mb-6">
          [ THE CRAFT ]
        </span>
        <h2 className="font-reading text-[clamp(1.9rem,4.4vw,3.2rem)] font-semibold text-[#1C1A17] leading-[1.12]">
          The Craft:<br className="md:hidden" /> How a Wamao is Made
        </h2>
        <p className="mt-6 font-reading text-[1.05rem] md:text-[1.15rem] text-[#2A2723] max-w-2xl leading-[1.7]">
          The making of a traditional Wamao, as documented in the kilns of Heqing, follows four stages.
        </p>
      </div>

      <div className="w-full max-w-6xl relative z-20">
        {craftSteps.map((step, index) => (
          <div
            key={`craft-card-${index}`}
            className={`sticky ${step.topClass} ${step.zIndex} w-full min-h-[85vh] bg-[#F7F6F4] rounded-3xl shadow-[0_-15px_40px_-15px_rgba(0,0,0,0.15)] border border-gray-100 flex flex-col md:flex-row items-center justify-center p-8 md:p-16 ${index === craftSteps.length - 1 ? 'mb-0' : 'mb-[50vh]'} overflow-hidden`}
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
              <span className="text-[#B84221] font-sans font-bold text-xs uppercase tracking-[0.2em] mb-4">
                STEP {step.num}
              </span>
              <h3 className="text-2xl md:text-3xl font-serif text-[#1C1A17] mb-6 font-bold leading-tight">
                {step.title}
              </h3>
              <p className="text-[0.975rem] md:text-[1.05rem] font-reading text-[#2A2723] leading-[1.65] max-w-xl">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────── Full craft-stage text (Prose columns) ─────────────── */

const CraftDetail = () => {
  return (
    <section className="w-full bg-[#F0EFEC] py-24 md:py-32">
      <Prose>
        <p>
          <strong className="font-semibold text-[#B84221]">Gathering the Earth.</strong>{" "}
          Artisans use locally sourced red or black clay, the same material used for
          bricks and roof tiles. In Beibanbang village, the clay comes from a deposit
          called Nangongyu, covering over a thousand acres between the village and its
          neighbor. The best clay is low in sand, slightly white, and highly plastic.
          It costs 60 to 80 yuan per cartload. One master artisan, Gao Jinfu, a
          nationally recognized ICH inheritor, uses roughly 30 tons per year (Ma Jia,
          2018).
        </p>
        <p>
          <strong className="font-semibold text-[#B84221]">Shaping the Body.</strong>{" "}
          In Heqing, the Wamao is entirely hand-molded without molds. In Binchuan,
          artisans use a different method: carving the figure from a solid clay block.
          Either way, the body is left hollow, which serves both an acoustic and a
          symbolic function: elder craftsmen say that when wind passes through, the
          Wamao produces a low moaning sound (Ma Jia, 2018). The hollow body also
          carries the meaning of &ldquo;swallowing iron and excreting gold,&rdquo; a
          prosperity metaphor that persists in the commercial versions made today. A
          skilled artisan can finish one in about an hour; a husband-and-wife team may
          turn out 17 to 20 in a day.
        </p>
        <p>
          <strong className="font-semibold text-[#B84221]">Awakening the Face.</strong>{" "}
          The face is the hardest part. Using fingers and a few simple tools (a cutting
          bow, a small knife, a bamboo tube), the artisan sculpts bulging eyes, flared
          nostrils, and the defining feature: the wide-open mouth. Five or six fangs are
          individually attached. Ears are scored with fine lines. Ma Jia (2018) calls
          this step &ldquo;the most demanding test of the maker&rsquo;s skill and the
          key moment of the Wamao&rsquo;s formation.&rdquo;
        </p>
        <p>
          <strong className="font-semibold text-[#B84221]">Trial by Fire.</strong>{" "}
          Traditional Wamao are fired in dome-shaped coal kilns known locally as
          &ldquo;black-tile kilns,&rdquo; at temperatures between 1,000 and 1,400
          degrees Celsius. A full cycle runs 17 to 18 days: one or two days loading,
          seven or eight days burning, six or seven days cooling with water poured over
          the kiln, and another day or two to unload. The figures come out unglazed.
          Their color (ideally a blue-grey, &ldquo;neither black nor red,&rdquo; as kiln
          masters describe it) depends entirely on temperature control (Ma Jia, 2018).
        </p>
      </Prose>
    </section>
  );
};
