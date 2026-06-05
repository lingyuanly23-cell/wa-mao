"use client";

import { useScrollReveal } from "../../hooks/useScrollReveal";
import TimelineNode from "./TimelineNode";
import Prose from "../../components/editorial/Prose";
import PullQuote from "../../components/editorial/PullQuote";
import PivotChart from "../../components/editorial/PivotChart";
import AnimatedExhibit from "../../components/editorial/AnimatedExhibit";

function TimelinePhoto({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-full max-w-md aspect-[4/3] rounded-xl overflow-hidden shadow-[8px_8px_0px_rgba(0,0,0,0.05)]">
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
  );
}

export default function TimelineSection() {
  const headerRef = useScrollReveal<HTMLDivElement>({ staggerDelay: 120 });

  return (
    <section className="relative w-full bg-[#F0EFEC] py-40 overflow-x-clip">
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
          className="font-reading text-[1rem] md:text-[1.05rem] leading-[1.65] text-[#4A4A4A] max-w-3xl mx-auto"
          data-reveal
        >
          This section is a narrative account of my fieldwork rather than a set of
          raw field notes: it draws on the notes I took each day in Yuxi, together
          with relevant scholarship, to present what I observed in context.
          Quotations are translated from Chinese and reflect the substance of what
          was said.
        </p>
      </div>

      {/* Timeline container */}
      <div className="relative w-full max-w-5xl mx-auto px-6">
        <div className="flex flex-col w-full gap-24 md:gap-32 relative z-10">
          {/* Left spine */}
          <div className="absolute top-0 bottom-0 left-4 md:left-8 border-l-2 border-dashed border-[#B84221]/40 z-0" />
          {/* June 16 — Qinghua Street */}
          <TimelineNode
            date="June 16"
            imagePosition="left"
            imageSlot={
              <TimelinePhoto src="/inquiry-workshop.jpg" alt="Interior of Yuqing Kiln workshop" />
            }
            textContent={
              <div>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#1C1A17] mb-6">
                  Qinghua Street
                </h3>
                <Prose>
                  <p>
                    Qinghua Street was purpose-built. Yuxi is a tobacco city, the
                    home of the Hongta Group, one of China&rsquo;s largest cigarette
                    makers. According to figures published by the Yuxi Municipal
                    Bureau of Statistics in July 2024, tobacco still accounts for 60
                    to 70 percent of the city&rsquo;s above-scale industrial output.
                    Its taxes once funded virtually everything. But in 1994, the
                    State Council&rsquo;s tax-sharing reform redirected tobacco
                    excise revenue to the central government, and by 2001 the Hongta
                    Group&rsquo;s annual tax contribution had fallen from over 20
                    billion yuan to roughly 12.7 billion, a drop of more than 30
                    percent (MBA Library; Sohu News, citing contemporary financial
                    reporting). The city needed something else. In January 2013,
                    Yuxi&rsquo;s party secretary Zhang Zulin stood up at the
                    provincial People&rsquo;s Congress and declared that the city
                    would &ldquo;vigorously develop the modern service sector, led
                    by tourism&rdquo; (Yuxi Municipal Government, &ldquo;2013 Year in
                    Review&rdquo;). That same year, the municipal government released
                    its Cultural Tourism Strategy and the Kun-Yu-Hong
                    Tourism-Culture Industry Belt Action Plan (Yuxi Municipal
                    Government, 2014), and a local kiln successfully refired
                    blue-and-white porcelain (a technical achievement, it turns out,
                    that had already been accomplished privately by a single artisan
                    back in 1992). In 2014, Yuxi blue-and-white porcelain received
                    provincial-level ICH status (Yunnan Gateway, 2020). In 2019, the
                    city broke ground on a 4.5-billion-yuan ceramics art town
                    (Yunnan Daily, 2024; Yuxi Municipal Government, 2024). Qinghua
                    Street, which opened in October 2020, is its commercial
                    centerpiece.
                  </p>
                  <p>
                    The street is lined with red brick facades, calligraphy
                    banners, and the words &ldquo;Intangible Heritage&rdquo; printed
                    on every awning. It was originally pitched as a
                    cultural-creative hub, then drifted into a food street, and has
                    only recently swung back toward heritage branding. At the
                    entrance to Yuqing Kiln, a shelf of Wamao fridge magnets greeted
                    us by the door. Inside: two people shaping clay at long
                    worktables in a brick-walled courtyard. At the back, a
                    half-height kiln.
                  </p>
                  <p>
                    Yang Ayi, a shop attendant, walked me through the product logic.
                    Stick a miniature Wamao onto a ceramic cup, and the price goes
                    from 60 to 140 yuan. The figures with coins sell best: the green
                    ones, with a big open mouth. If the coin is inside, the back is
                    sealed, so the wealth stays in. No coin means the back is left
                    open, to pull fortune in from outside. I asked about the
                    original meaning of the open mouth, the spirit-swallowing
                    function documented in the ethnographic literature. She did not
                    mention it. Nobody in the shop did.
                  </p>
                </Prose>
              </div>
            }
          />
        </div>

        {/* Pivot animation — tobacco → tourism economics (breaks out of timeline) */}
        <AnimatedExhibit
          title="How a heritage industry got funded"
          description="Scroll through three charts: tobacco's grip on Yuxi, the tax collapse that gutted that revenue, and the tourism build-out the city turned to next."
        >
          <PivotChart />
        </AnimatedExhibit>

        <div className="flex flex-col w-full gap-32 md:gap-48 relative z-10">
          {/* June 18 — The Woman Who Pivoted */}
          <TimelineNode
            date="June 18"
            imagePosition="right"
            imageSlot={
              <TimelinePhoto src="/inquiry-zheng.jpg" alt="Zheng Popo at her worktable" />
            }
            textContent={
              <div>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#1C1A17] mb-6">
                  The Woman Who Pivoted
                </h3>
                <Prose>
                  <p>
                    Zheng Popo is not a Wamao artisan. She is a ceramicist who spent
                    twenty years making glazed roof tiles alongside her husband, Liu
                    Jialiang. Between 2002 and 2013, their main business was tiles
                    and building materials. She had never made a Wamao in her life.
                  </p>
                  <p>
                    That changed when the city&rsquo;s cultural-industries push
                    began. Around 2013, a government agency called the Hongta
                    District Cultural Industries Office started connecting workshops
                    to trade fairs and providing promotional channels. Zheng Popo
                    saw an opportunity: Wamao were cheap to make, easy to transport,
                    and increasingly in demand at the fairs. She started producing
                    them, not out of any attachment to the tradition but to keep the
                    workshop running.
                  </p>
                  <p>
                    Today her operation has a clear division of labor: she molds the
                    clay bodies in bulk, her daughter-in-law paints them, and her
                    son handles the finishing and firing. They produce for
                    wholesale: 200 to 300 pieces at a time, costing 50 to 200 yuan
                    per unit, retailing at roughly double in tourist areas. Walk-in
                    local sales barely exist. In the two days I spent sitting in the
                    shop, almost no one from Yuxi came through the door. The visitors
                    were tourists from out of town, browsing, occasionally picking
                    something up and putting it back.
                  </p>
                  <p>
                    Around 2017, the Cultural Industries Office was folded into the
                    Municipal Bureau of Culture and Tourism. Zheng Popo&rsquo;s
                    account of what changed is sharp: she says the new bureau turned
                    cultural support into a transaction, that awards and market
                    access now go to people with money or connections rather than
                    skilled craftspeople. I have no way to independently verify that
                    claim, and she has known tensions with other workshops in the
                    area, so I present it as what it is: one artisan&rsquo;s
                    experience of a felt shift in how the system works. But the
                    bitterness in her voice was real, and it came up more than once.
                  </p>
                </Prose>
              </div>
            }
          />

          {/* June 20 — The Kiln Guardian */}
          <TimelineNode
            date="June 20"
            imagePosition="left"
            imageSlot={
              <TimelinePhoto src="/第三页1.jpg" alt="The kiln at Liu Jialiang's workshop" />
            }
            textContent={
              <div>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#1C1A17] mb-6">
                  The Kiln Guardian
                </h3>
                <Prose>
                  <p>
                    Liu Jialiang, Zheng Popo&rsquo;s husband, did not want to talk
                    about Wamao. He wanted to talk about the kiln.
                  </p>
                  <p>
                    He is a man whose life runs on ceramic infrastructure. He
                    started learning to make pottery and mix glazes as a teenager,
                    rose to become technical deputy director of the Yuxi Municipal
                    Kiln Factory, and in 1992, when the Yuxi Dragon Kiln
                    archaeological excavation turned up shards of blue-and-white
                    porcelain, he was the one who figured out how to reproduce the
                    technique. No formula survived; he developed his own glaze
                    composition and firing process from scratch. This was two
                    decades before the city government officially announced the
                    &ldquo;revival&rdquo; of Yuxi blue-and-white porcelain as part
                    of its 2013 cultural-tourism push. The revival had already
                    happened, quietly, in one man&rsquo;s workshop.
                  </p>
                  <p>
                    In 1993, frustrated by what he called cronyism in the state-run
                    kiln system, Liu left and started his own business. The Yuxi
                    Municipal Kiln Factory was eventually taken over and repurposed.
                    Its former site, on a road still called Ancient Kiln Road, is
                    where Liu chose to set up his current workshop. He moved there on
                    purpose. &ldquo;The root of Yuxi ceramics is here,&rdquo; he told
                    me. &ldquo;You can&rsquo;t surrender this land to food
                    vendors.&rdquo;
                  </p>
                  <p>
                    He does not make Wamao. Blue-and-white porcelain, glaze
                    chemistry, kiln construction: those are his domains. The workshop
                    started producing Wamao only around 2020, because customers kept
                    asking for them. For Liu, they are a side product, not a calling.
                    His energy goes into the infrastructure: he has lobbied the
                    Bureau of Culture and Tourism to waive rent for young artisans
                    who might set up workshops in the area. They turned him down.
                  </p>
                  <p>
                    There is an irony here that Liu himself does not dwell on but
                    that the project cannot ignore: the man who literally re-created
                    Yuxi&rsquo;s ceramic heritage from archaeological fragments now
                    occupies a workshop where the bestselling item is a product he
                    considers peripheral, and that product is the one the city calls
                    its &ldquo;intangible cultural heritage.&rdquo;
                  </p>
                </Prose>
              </div>
            }
          />

          {/* June 21 — It Was Never Anything */}
          <TimelineNode
            date="June 21"
            imagePosition="right"
            imageSlot={
              <TimelinePhoto src="/inquiry-liping.jpg" alt="Li Ping at her studio" />
            }
            textContent={
              <div>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#1C1A17] mb-6">
                  It Was Never Anything
                </h3>
                <Prose>
                  <p>
                    Li Ping&rsquo;s studio, Wamao Daren, occupies a residential
                    building about ten minutes from the city center. She and her
                    husband Wang Ziqiang studied ceramics together at university. In
                    2013, still students, they picked the Wamao as their direction,
                    &ldquo;because it was cute to make, and nobody else was doing
                    it.&rdquo; After graduating in 2015, they launched the studio.
                    Today it is the largest Wamao brand in Yuxi.
                  </p>
                  <p>
                    Li Ping is the most clear-eyed person I met about the nature of
                    what she sells. &ldquo;Wamao was never anything to begin
                    with,&rdquo; she told me. &ldquo;As long as you keep the giant
                    open mouth, you can do whatever you want with it.&rdquo; She said
                    this not as a confession but as a design principle. The absence
                    of a fixed form is, for her, creative freedom.
                  </p>
                </Prose>
              </div>
            }
          />
        </div>

        {/* Li Ping pull quote — breaks out of timeline, full width */}
        <PullQuote quote="Wamao was never anything to begin with." />

        {/* June 21 continuation — normal reading column, not shifted to the right half */}
        <div className="flex flex-col w-full gap-32 md:gap-48 relative z-10">
          <div>
            <Prose>
              <p>
                Her real frustration is not about authenticity but about marketing.
                After ten years, the brand is still mid-tier. The problem, she
                believes, is that the Wamao lacks a story. &ldquo;If only it were
                like the Broken Bridge and the White Snake Lady,&rdquo; she said,
                naming the Hangzhou legend that turns a place into a destination.
                &ldquo;We don&rsquo;t have anything like that. We don&rsquo;t have a
                story that sticks.&rdquo;
              </p>
              <p>
                She used a word that stayed with me: &ldquo;laundering.&rdquo; She
                borrowed it from a case study of a funeral home that had been
                redesigned to look like a luxury boutique, &ldquo;the kind of place
                you&rsquo;d actually want to walk into.&rdquo; What the Wamao needs,
                she said, is something similar: a reframing that makes people accept
                its presence in their daily lives, &ldquo;giving it a meaning that
                goes beyond what it physically is.&rdquo;
              </p>
              <p>
                I asked about the time the Wamao first went viral. Merchants who had
                no stock, she told me, filled orders with stone lions shipped in
                from Fujian province. The lions sold just fine. &ldquo;Tourists
                don&rsquo;t care about origins,&rdquo; she said. &ldquo;They
                don&rsquo;t care what&rsquo;s inside.&rdquo;
              </p>
              <p>
                In a market where a Fujian lion can stand in for a Yunnan cat and
                nobody notices the difference, the question of what the Wamao
                &ldquo;really is&rdquo; starts to matter less than the question of
                who gets to decide what it means, and who profits from the answer.
              </p>
            </Prose>
          </div>
        </div>
      </div>
    </section>
  );
}
