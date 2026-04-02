"use client";

import { useEffect, useRef } from "react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import TimelineNode from "./TimelineNode";

function TimelinePhoto({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-full max-w-md aspect-[4/3] rounded-xl overflow-hidden shadow-[8px_8px_0px_rgba(0,0,0,0.05)]">
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
  );
}

function FeaturedQuote() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.opacity = "0";
    el.style.transform = "scale(0.98)";
    el.style.transition = "opacity 800ms ease-out, transform 800ms ease-out";

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.style.opacity = "1";
            el.style.transform = "scale(1)";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative py-16 md:py-24 my-12 md:my-20">
      {/* Decorative quote mark */}
      <span
        className="absolute -top-4 left-1/2 -translate-x-1/2 md:left-[15%] md:translate-x-0 text-8xl font-serif text-[#ff9f43]/20 select-none pointer-events-none leading-none"
        aria-hidden="true"
      >
        &ldquo;
      </span>

      <blockquote className="text-3xl md:text-5xl font-serif font-light italic text-[#1C1A17] text-center leading-snug max-w-5xl mx-auto px-6">
        Wamao was never anything to begin with. As long as you keep the giant
        open mouth, you can do whatever you want.
      </blockquote>
      <p className="text-center text-lg text-[#4A4A4A] mt-6 font-sans">
        — Li Ping
      </p>
    </div>
  );
}

export default function TimelineSection() {
  const headerRef = useScrollReveal<HTMLDivElement>({ staggerDelay: 120 });

  return (
    <section className="relative w-full bg-[#F0EFEC] py-40 overflow-hidden">
      {/* Section header */}
      <div ref={headerRef} className="max-w-7xl mx-auto px-6 mb-32 text-center">
        <span
          className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-[#B84221] mb-6 block"
          data-reveal
        >
          [ THE FIELDWORK ]
        </span>
        <h2
          className="text-5xl md:text-7xl font-serif font-black text-[#1C1A17] mb-6"
          data-reveal
        >
          Seven Days in Yuxi
        </h2>
        <p
          className="text-xl font-sans font-light text-[#4A4A4A] max-w-2xl mx-auto"
          data-reveal
        >
          June 16–22, 2025. Two workshops, three artisans, and a question that
          got harder to answer.
        </p>
      </div>

      {/* Timeline container */}
      <div className="relative w-full max-w-6xl mx-auto px-6 pl-8 md:pl-6">
        {/* Center dashed line — desktop: center, mobile: left edge */}
        <div className="absolute top-0 bottom-0 left-4 md:left-1/2 md:-translate-x-1/2 border-l-2 border-dashed border-[#ff9f43]/60 z-0" />

        <div className="flex flex-col w-full gap-32 md:gap-48 relative z-10">
          {/* Node 1: The Street */}
          <TimelineNode
            date="June 16"
            imagePosition="left"
            imageSlot={
              <TimelinePhoto src="/inquiry-workshop.jpg" alt="Interior of Yuqing Kiln workshop" />
            }
            textContent={
              <div className="text-xl font-sans font-light leading-relaxed text-[#4A4A4A] space-y-6">
                <p>
                  Qinghua Street was built to save the local economy after
                  Yuxi&apos;s tobacco industry declined. Red brick, calligraphy
                  banners, &ldquo;Intangible Heritage&rdquo; everywhere.
                </p>
                <p>
                  Inside Yuqing Kiln: brick walls, a half-height kiln, two
                  worktables, two people shaping clay. By the door, a shelf of
                  Wamao fridge magnets — crudely made.
                </p>
                <p>
                  The bestseller was a green figure with a coin in its mouth. If
                  the coin is inside, the back is sealed — to prevent wealth from
                  leaking. If there is no coin, the hole stays open — to draw
                  wealth in.
                </p>
                <p>
                  The logic had nothing to do with heritage. It was engineered for
                  luck.
                </p>
              </div>
            }
          />

          {/* Node 2: The Woman Who Pivoted */}
          <TimelineNode
            date="June 18"
            imagePosition="right"
            imageSlot={
              <TimelinePhoto src="/inquiry-zheng.jpg" alt="Zheng Popo at her worktable" />
            }
            textContent={
              <div className="text-xl font-sans font-light leading-relaxed text-[#4A4A4A] space-y-6">
                <p>
                  Zheng Popo and her husband, Liu Jialiang, are ceramicists — not
                  Wamao artisans. He reverse-engineered Yuxi blue-and-white
                  porcelain in 1992. She spent twenty years firing glazed roof
                  tiles by his side. She never made Wamao.
                </p>
                <p>
                  That changed in 2013, when the city launched a cultural
                  industries campaign. A new agency connected workshops to trade
                  fairs. She began producing Wamao — a product she never cared
                  about — to keep the workshop alive.
                </p>
                <p>
                  By 2017, the system changed. Awards and channels went to those
                  who paid or had connections.
                </p>

                {/* Pull quote */}
                <blockquote className="border-l-4 border-[#c05621] pl-6 italic text-[#c05621] text-xl md:text-2xl my-8">
                  <p>&ldquo;Real craftspeople get nothing.&rdquo;</p>
                  <p className="text-base not-italic mt-2">— Zheng Popo</p>
                </blockquote>

                <p>
                  Their workshop sits on the ruins of the old Yuxi Kiln — the
                  factory Liu once directed. He moved here on purpose.
                </p>
                <p>
                  &ldquo;The root of Yuxi ceramics is here. You can&apos;t surrender this
                  land to food vendors.&rdquo;
                </p>
                <p>
                  He was financially secure. He didn&apos;t need to be here. He stayed,
                  petitioning the Bureau to waive rent for young artisans. They
                  declined.
                </p>
              </div>
            }
          />

          {/* Node 3: It Was Never Anything */}
          <TimelineNode
            date="June 20"
            imagePosition="left"
            imageSlot={
              <TimelinePhoto src="/inquiry-liping.jpg" alt="Li Ping loading the kiln" />
            }
            textContent={
              <div className="text-xl font-sans font-light leading-relaxed text-[#4A4A4A] space-y-4">
                <p>
                  Li Ping&apos;s studio was the largest Wamao brand in Yuxi. She
                  chose Wamao in 2013 because &ldquo;it was cute to make, and nobody
                  else was doing it.&rdquo;
                </p>
              </div>
            }
          />
        </div>

        {/* Li Ping's quote — breaks out of timeline, full width */}
        <FeaturedQuote />

        {/* Post-quote continuation, tighter spacing */}
        <div className="flex flex-col w-full gap-32 md:gap-48 relative z-10">
          <div className="md:ml-[50%] pl-8 md:pl-16 -mt-8 md:-mt-16">
            <div className="text-xl font-sans font-light leading-relaxed text-[#4A4A4A] space-y-4 max-w-lg">
              <p>
                Her real frustration was storytelling. After a decade, her brand
                remained mid-tier because Wamao had no transmissible myth.
              </p>
              <p>
                When it first went viral, merchants without stock substituted
                stone lions from Fujian. They sold just as well.
              </p>
              <p>Tourists do not care about origins.</p>
            </div>
          </div>

          {/* Node 4: What I Learned */}
          <TimelineNode
            date="June 22"
            imagePosition="right"
            imageSlot={
              <TimelinePhoto src="/inquiry-wamao.jpg" alt="Handmade Wamao figure" />
            }
            textContent={
              <div className="font-serif text-xl leading-relaxed text-[#4A4A4A] space-y-6">
                <p>
                  I arrived with a thesis already formed: Wamao is an invented
                  tradition. Seven days confirmed it.
                </p>
                <p>
                  But what I did not expect was this: the invention is not the
                  story. Zheng Popo made Wamao to survive. Liu Jialiang does not
                  care about Wamao — he cares about the kiln beneath his feet. Li
                  Ping openly admits she sells something fabricated.
                </p>
                <p>
                  None of them are deceiving anyone. They are navigating a system
                  in which &ldquo;heritage&rdquo; is an economic instrument, and their
                  livelihoods depend on performing it.
                </p>
              </div>
            }
          />
        </div>
      </div>
    </section>
  );
}
