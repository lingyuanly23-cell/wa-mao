"use client";

import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import DataDotGrid from "../../components/editorial/DataDotGrid";
import GreatFlattening from "../../components/editorial/GreatFlattening";
import Prose from "../../components/editorial/Prose";
import PullQuote from "../../components/editorial/PullQuote";
import ChapterBridge from "../../components/editorial/ChapterBridge";
import AnimatedExhibit from "../../components/editorial/AnimatedExhibit";

/* ------------------------------------------------------------------ */
/*  Section heading — small terracotta rule + reading-serif title.     */
/* ------------------------------------------------------------------ */

function SectionHeading({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!ref.current) return;
    const tween = gsap.fromTo(
      ref.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: { trigger: ref.current, start: "top 85%" },
      }
    );
    return () => {
      tween.scrollTrigger?.kill();
    };
  }, []);

  return (
    <div ref={ref} className="mx-auto max-w-[36rem] px-6 pt-28 pb-10">
      <span className="block h-px w-12 bg-[#B84221]" />
      <h2 className="mt-7 font-reading text-[clamp(2rem,5vw,3.2rem)] font-semibold leading-[1.08] text-[#1C1A17]">
        {children}
      </h2>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  The Three Compressions — built anew. Three numbered text blocks,   */
/*  each scroll-revealing, light theme, terracotta accents.            */
/* ------------------------------------------------------------------ */

const COMPRESSIONS: { lead: string; body: React.ReactNode }[] = [
  {
    lead: "Ritual compressed into object.",
    body: (
      <>
        In Heqing and Binchuan, the Wamao is activated by ceremony: rooster blood, prayers, an
        auspicious date. Without the ritual, as the Binchuan geomancer put it, it is &ldquo;just a
        lump of clay.&rdquo; In Yuxi, the ritual has been stripped away entirely. The object is sold
        as-is, with no activation required and none expected. What once needed a geomancer, a
        carpenter, and a prayer now needs only a price tag.
      </>
    ),
  },
  {
    lead: "Object compressed into brand.",
    body: (
      <>
        In the villages, each Wamao was shaped by hand for a specific house, a specific ridge, a
        specific set of spiritual circumstances. In Yuxi, the object has become a product line: Li
        Ping&rsquo;s &ldquo;Wamao Daren&rdquo; series, Zheng Popo&rsquo;s wholesale batches, Yang
        Ayi&rsquo;s cup attachments. The figure no longer sits on a roof. It sits on a shelf, waiting
        to be picked.
      </>
    ),
  },
  {
    lead: "Regional form compressed into platform meme.",
    body: (
      <>
        Across Yunnan, the Wamao exists in at least five distinct stylistic families, each tied to a
        specific ethnic group, geographic zone, and belief system. On Xiaohongshu, all of this
        collapses into a single image: small, cute, colorful, mouth open. The platform does not
        distinguish between a Heqing ridge-tamer and a Yuxi desk ornament. It does not need to. The
        consumer doesn&rsquo;t ask.
      </>
    ),
  },
];

function ThreeCompressions() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const blocks = gsap.utils.toArray<HTMLElement>(".compression");
      blocks.forEach((b) => {
        gsap.fromTo(
          b,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: b, start: "top 82%" },
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="mx-auto max-w-[44rem] px-6 pb-10">
      <ol className="space-y-20">
        {COMPRESSIONS.map((c, i) => (
          <li key={i} className="compression grid grid-cols-[auto_1fr] gap-x-7 sm:gap-x-10">
            <span
              aria-hidden
              className="font-reading text-[clamp(2.4rem,6vw,4rem)] font-semibold leading-none text-[#B84221]/35 tabular-nums"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="pt-1">
              <p className="font-reading text-[1.2rem] leading-[1.85] text-[#2A2723] md:text-[1.3rem] [text-wrap:pretty]">
                <strong className="font-semibold text-[#1C1A17]">{c.lead}</strong> {c.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function AfterlifePage() {
  return (
    <main className="bg-[#F0EFEC] pb-40">
      {/* ── Opener ── */}
      <section className="mx-auto flex min-h-[48vh] max-w-3xl flex-col justify-center px-6 pt-36 pb-10">
        <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#B84221]">
          [ ACT III · THE DIGITAL AFTERLIFE ]
        </p>
        <h1 className="mt-5 font-reading text-[clamp(2.4rem,6vw,4.4rem)] font-semibold leading-[1.06] text-[#1C1A17]">
          What Happens When a Cultural Object Enters the Consumer Internet
        </h1>
      </section>

      <Prose dropcap>
        <p>
          Everything described in Act I happened in physical space: in workshops, on streets, between
          people. But the Wamao&rsquo;s second life takes place on screens. To understand what becomes
          of this object once it leaves Yuxi&rsquo;s kilns and enters China&rsquo;s digital consumer
          ecosystem, I turned to Xiaohongshu (Little Red Book), the country&rsquo;s dominant lifestyle
          and shopping platform.
        </p>
        <p>
          My question was specific: when ordinary people encounter the Wamao online, do they engage
          with it as a cultural object (something with a history, a region, a ritual meaning), or do
          they treat it as a product to purchase and display?
        </p>
      </Prose>

      {/* ── The Data ── */}
      <SectionHeading>The Data</SectionHeading>

      <Prose>
        <p>
          Using a keyword-based web scraper, I collected 200 posts tagged or titled with
          &ldquo;Wamao.&rdquo; Each post&rsquo;s full text was extracted and classified into one of
          six content categories using AI-assisted categorization. Posts that used &ldquo;Intangible
          Cultural Heritage&rdquo; language or historical narratives specifically as a sales frame,
          rather than as genuine cultural discussion, were flagged separately.
        </p>
      </Prose>

      {/* the approved living chart: 200-post breakdown + donut */}
      <AnimatedExhibit
        title="200 posts, sorted"
        description="Scroll: every dot is one Xiaohongshu post tagged 瓦猫, sorting itself into six kinds of attention — and then into the 80 / 20 split."
      >
        <DataDotGrid />
      </AnimatedExhibit>

      <Prose>
        <p>
          Eighty percent of the content treats the Wamao as something to buy, visit, or experience.
          Only one in five posts engages with what the object is or where it comes from. The word
          &ldquo;Intangible Cultural Heritage&rdquo; appears frequently in the consumption-oriented
          posts, but almost always as a marketing label, not as a subject of discussion.
        </p>
      </Prose>

      {/* ── What Disappears Online ── */}
      <SectionHeading>What Disappears Online</SectionHeading>

      {/* the approved animation: five regional forms collapse into one image */}
      <AnimatedExhibit
        title="Five forms become one"
        description="Scroll: the five regional varieties of the Wamao collapse into the single small, cute, big-mouthed image the platform rewards."
      >
        <GreatFlattening />
      </AnimatedExhibit>

      <Prose>
        <p>
          Heqing&rsquo;s ridge-taming tiger, Chuxiong&rsquo;s stone cat, Jianchuan&rsquo;s unicorn:
          none of these survive the platform. What spreads instead is the same standardized form, made
          to photograph well and sell fast. The ethnographer Ma Jia (2022) documented that in Heqing
          itself, a traditional system of eleven Wamao categories (each corresponding to a specific
          house orientation and protective function, with names like &ldquo;Welcoming Fortune&rdquo;
          and &ldquo;Gazing at Prosperity&rdquo;) has largely disappeared. The now-iconic &ldquo;big
          round face&rdquo; of the Heqing Wamao turns out to be a relatively recent innovation,
          developed in the 1980s by the artisan Gao Jinfu; older examples had more three-dimensional,
          tiger-like or qilin-like features (Ma Jia, 2022; independently confirmed by Cao Anli &amp;
          Xin Beini, 2025). Even within what passes for &ldquo;tradition,&rdquo; forms have been
          standardized and simplified over the past four decades.
        </p>
        <p>
          What the digital platform does is accelerate this process to its logical endpoint. In
          Heqing, the flattening took forty years and left traces: old villagers still remember the
          categories; a few artisans still experiment. Online, the flattening is instantaneous and
          total. A post performs well or it doesn&rsquo;t. An image gets shared or it doesn&rsquo;t.
          The algorithm does not care whether a Wamao has one horn or four nostrils, whether it was
          fired in a coal kiln for seventeen days or mass-produced in a factory. It cares about
          engagement. And engagement, on Xiaohongshu, is driven by cuteness, novelty, and price.
        </p>
      </Prose>

      {/* ── What Li Ping Understood ── */}
      <SectionHeading>What Li Ping Understood</SectionHeading>

      <Prose>
        <p>
          Li Ping, the Wamao Daren founder, grasped this logic before I had the data to confirm it.
          Her description of the Wamao as something that &ldquo;was never anything to begin with&rdquo;
          is not cynicism but market intelligence. She knows that the object&rsquo;s lack of a fixed
          identity is precisely what makes it adaptable to whatever the platform rewards. Her
          frustration is not that the Wamao has no tradition; it is that no one has yet figured out how
          to manufacture a compelling one.
        </p>
      </Prose>

      <PullQuote quote="The mechanism is the same; the actors have changed." />

      <Prose>
        <p>
          Her word for it, &ldquo;laundering,&rdquo; is more exact than it first sounds. The Wamao
          isn&rsquo;t fake; it just doesn&rsquo;t mean much on its own. What she adds is the meaning: a
          story, a look, a presence on the feed, repeated until people take it for granted. This is, in
          functional terms, what the historian Eric Hobsbawm (1983) called &ldquo;the invention of
          tradition,&rdquo; except that Hobsbawm imagined the process being driven by states and
          elites. Li Ping is doing it from a residential apartment with a packing table and a
          Xiaohongshu account. The mechanism is the same; the actors have changed.
        </p>
      </Prose>

      {/* ── The Three Compressions ── */}
      <SectionHeading>The Three Compressions</SectionHeading>

      <Prose>
        <p>
          Taken together, the journey from Heqing&rsquo;s ritual rooftops to Yuxi&rsquo;s Xiaohongshu
          feeds traces a pattern of progressive compression:
        </p>
      </Prose>

      <div className="pt-12">
        <ThreeCompressions />
      </div>

      <ChapterBridge
        title="About"
        description="The researcher, the fieldwork and gratitude, a methodology note, and the references."
        href="/about"
      />
    </main>
  );
}
