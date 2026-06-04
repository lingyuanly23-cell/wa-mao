"use client";

import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Act III "What Disappears Online" — five diverse regional forms collapse
 *  into one repeated image. Restrained ending (single thumbnail). Verbatim copy. */

const ACCENT = "#c05621";
const MEME = "/第一页1.jpg";

function PhotoTile({ img, left, top }: { img: string; left: string; top: string }) {
  return (
    <div className="tile-pos absolute" style={{ left, top, transform: "translate(-50%,-50%)" }}>
      <div className="tile w-[24vw] max-w-[280px] overflow-hidden rounded-xl border border-white/10 shadow-2xl">
        <div className="aspect-[4/3]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img} alt="" className="h-full w-full object-cover" />
        </div>
      </div>
    </div>
  );
}

function TextTile({ region, phrase, left, top }: { region: string; phrase: React.ReactNode; left: string; top: string }) {
  return (
    <div className="tile-pos absolute" style={{ left, top, transform: "translate(-50%,-50%)" }}>
      <div className="tile flex aspect-[4/3] w-[24vw] max-w-[280px] flex-col justify-between rounded-xl border border-white/10 bg-[#16130f] p-5 text-left shadow-2xl">
        <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-white/25">No photographed specimen</span>
        <span className="font-serif text-3xl font-semibold leading-none text-white/90">{region}</span>
        <p className="font-serif text-lg leading-tight text-gray-300">{phrase}</p>
      </div>
    </div>
  );
}

export default function GreatFlattening() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.set(".meme", { opacity: 0, scale: 0.6 });
      gsap.set([".cap-1", ".cap-2"], { opacity: 0 });

      gsap.from(".tile", {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: { trigger: stageRef.current, start: "top 70%" },
      });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: wrapRef.current, start: "top top", end: "bottom bottom", scrub: 0.6 },
      });

      tl
        .to(".tile", { scale: 0.12, opacity: 0, duration: 1.0, ease: "power2.in", stagger: 0.1 }, 1.0)
        .to(".cap-0", { opacity: 0, duration: 0.4 }, 1.2)
        .to(".cap-1", { opacity: 1, duration: 0.5 }, 1.5)
        .to(".meme", { opacity: 1, scale: 1, duration: 0.9, ease: "back.out(1.4)" }, 2.4)
        .to(".cap-1", { opacity: 0, duration: 0.4 }, 3.4)
        .to(".cap-2", { opacity: 1, duration: 0.5 }, 3.7);
    }, stageRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={wrapRef} className="relative" style={{ height: "480vh" }}>
      <div ref={stageRef} className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-24 z-20 px-6">
          <div className="relative mx-auto h-28 max-w-3xl text-center">
            <p className="cap-0 absolute inset-x-0 font-serif text-[clamp(1.2rem,2.6vw,1.8rem)] leading-snug text-[#2A2723]">
              The academic literature records a striking diversity of Wamao forms across Yunnan.
            </p>
            <p className="cap-1 absolute inset-x-0 font-serif text-[clamp(1.4rem,3vw,2.1rem)] font-medium leading-snug text-[#B84221]">
              None of this variety is visible on Xiaohongshu.
            </p>
            <p className="cap-2 absolute inset-x-0 font-serif text-[clamp(1.1rem,2.4vw,1.6rem)] leading-snug text-[#2A2723]">
              What consumers see is one image, repeated with minor variations: a small, round, cute
              creature with a big mouth and bright colors.
            </p>
          </div>
        </div>

        {/* one repeated image */}
        <div className="meme absolute left-1/2 top-[57%] z-0 w-[30vw] max-w-[330px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-black/10 shadow-2xl">
          <div className="aspect-square">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={MEME} alt="" className="h-full w-full object-cover" />
          </div>
        </div>

        {/* five diverse forms */}
        <div className="absolute inset-0 z-10">
          <PhotoTile img="/第四页2.jpg" left="20%" top="44%" />
          <PhotoTile img="/wenshan.jpg" left="50%" top="42%" />
          <PhotoTile img="/第四页4.jpg" left="80%" top="44%" />
          <TextTile
            region="Heqing"
            left="35%"
            top="76%"
            phrase={
              <>
                a single horn and a gaping <span style={{ color: ACCENT }}>red mouth</span>
              </>
            }
          />
          <TextTile
            region="Jianchuan"
            left="65%"
            top="76%"
            phrase={
              <>
                <span style={{ color: ACCENT }}>four nostrils</span> and{" "}
                <span style={{ color: ACCENT }}>four ear-holes</span>
              </>
            }
          />
        </div>
      </div>
    </section>
  );
}
