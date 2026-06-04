import ChapterBridge from "../../components/editorial/ChapterBridge";

export default function AboutPage() {
  return (
    <main className="min-h-screen w-full bg-[#F0EFEC] pt-20 text-[#1C1A17]">
      <div className="mx-auto max-w-[44rem] px-6 py-24 md:py-32">
        {/* ── About the Researcher ── */}
        <section>
          <p className="mb-5 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-[#B84221]">
            About the Researcher
          </p>
          <h1 className="mb-8 font-reading text-4xl font-semibold leading-tight text-[#1C1A17] md:text-5xl">
            Li Houjun
          </h1>
          <p className="font-reading text-[1.2rem] leading-[1.85] text-[#2A2723] [text-wrap:pretty] md:text-[1.3rem]">
            I am an independent researcher interested in the intersection of sociology, history, and digital culture. This project grew out of a personal puzzle (why a city I grew up in was suddenly full of clay creatures I had never seen before) and turned into a broader inquiry into how cultural objects get made, marketed, and consumed in contemporary China.
          </p>
          <p className="mt-7 font-reading text-[1.15rem] leading-[1.85] text-[#1C1A17]">
            Contact:{" "}
            <a
              href="mailto:s24037.li@stu.scie.com.cn"
              className="border-b border-[#B84221]/40 pb-0.5 text-[#B84221] transition-colors hover:border-[#B84221]"
            >
              s24037.li@stu.scie.com.cn
            </a>
          </p>
        </section>

        <hr className="my-16 border-t border-[#1C1A17]/10" />

        {/* ── Fieldwork & Gratitude ── */}
        <section>
          <p className="mb-5 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-[#B84221]">
            Fieldwork &amp; Gratitude
          </p>
          <h2 className="font-reading text-2xl font-medium leading-snug text-[#1C1A17] md:text-3xl">
            Yuqing Kiln Workshop
          </h2>
          <h2 className="mt-1 mb-7 font-reading text-2xl font-medium leading-snug text-[#1C1A17] md:text-3xl">
            Wamao Daren Studio
          </h2>
          <p className="font-reading text-[1.2rem] leading-[1.85] text-[#2A2723] [text-wrap:pretty] md:text-[1.3rem]">
            Thank you for opening your doors, sharing your work, and letting me sit with you while you shaped clay and talked about what it means.
          </p>
        </section>

        <hr className="my-16 border-t border-[#1C1A17]/10" />

        {/* ── Methodology Note ── */}
        <section>
          <p className="mb-5 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-[#B84221]">
            Methodology Note
          </p>
          <div className="space-y-7 font-reading text-[1.15rem] leading-[1.85] text-[#2A2723] [text-wrap:pretty] md:text-[1.2rem]">
            <p>
              This project&apos;s fieldwork was conducted over seven days (June 16–22, 2025) in Yuxi, Yunnan, involving semi-structured interviews with four workshop personnel across two sites, supplemented by participant observation as an apprentice. The digital component analyzed 200 Xiaohongshu posts collected via keyword-based web scraping, with AI-assisted content classification. All interview quotations are drawn from field notes and reflect the substance of what was said, not verbatim transcripts. The literature review covers eleven studies published between 2002 and 2025.
            </p>
            <p>
              This project does not attempt a comprehensive survey of Yunnan&apos;s Wamao traditions; that work has been accomplished by scholars including Ma Jia (2018, 2022), Lu Jun &amp; Sirivesmas (2025), Cao Anli &amp; Xin Beini (2025), and Wang Xinyuan (2024). It focuses on a question they have not addressed: how a city without a Wamao tradition produced one.
            </p>
          </div>
        </section>

        <hr className="my-16 border-t border-[#1C1A17]/10" />

        {/* ── References ── */}
        <section>
          <p className="mb-6 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-[#B84221]">
            References
          </p>
          <ul className="space-y-4 font-reading text-[0.98rem] leading-[1.7] text-[#3A3631]">
            <li>
              Zhang, T., et al. (1974). <em>Ming shi</em> [History of Ming]. Zhonghua Book Company.
            </li>
            <li>
              Yang, Z. (c. 2002). &ldquo;Tiger shadows, cat forms: House-guardian beasts in Yunnan vernacular architecture.&rdquo; <em>Ethnic Today</em>.
            </li>
            <li>
              Ma, J. (2018). <em>Fieldwork Images of Intangible Cultural Heritage: The Wamao of Beibanbang Village</em>. Yunnan Fine Arts Publishing House.
            </li>
            <li>Ma, J. (2022a). &ldquo;Fieldwork report on Binchuan Wamao.&rdquo;</li>
            <li>
              Ma, J. (2022b). &ldquo;Revisiting the house-warding function of Heqing Wamao.&rdquo; <em>Chinese National Expo</em>, 12, pp. 51–54.
            </li>
            <li>Ma, J. (2022c). &ldquo;A comparative study of Heqing and Binchuan Wamao.&rdquo;</li>
            <li>
              Wang, X. (2024). <em>A study on the origins of Yunnan Wamao</em>. Master&apos;s thesis, Kunming University of Science and Technology.
            </li>
            <li>
              Lu, J. &amp; Sirivesmas, V. (2025). &ldquo;The stylistic genealogy of Yunnan&apos;s tile cats.&rdquo; <em>Asian Journal of Arts and Culture</em>, 25(3).
            </li>
            <li>
              Cao, A. &amp; Xin, B. (2025). &ldquo;A study on the composite forms of tile cats in Yunnan, China.&rdquo; <em>Journal of Asian Architecture and Building Engineering</em>. DOI: 10.1080/13467581.2025.2589525.
            </li>
            <li>
              Hobsbawm, E. &amp; Ranger, T. (1983). <em>The Invention of Tradition</em>. Cambridge University Press.
            </li>
            <li>
              Frazer, J. G. (1922). <em>The Golden Bough</em>. Macmillan.
            </li>
            <li>
              State Council of the PRC. (1993). &ldquo;Decision on implementing the tax-sharing fiscal management system.&rdquo; State Council Gazette, 1994(1).
            </li>
            <li>
              Yuxi Municipal Government. (2014). &ldquo;Kun-Yu-Hong Tourism-Culture Industry Economic Belt: Yuxi Action Plan (2013–2017).&rdquo;
            </li>
            <li>
              Yuxi Tourism Development Commission. (2016). &ldquo;Yuxi Tourism Industry 13th Five-Year Development Plan.&rdquo;
            </li>
            <li>
              Yuxi Municipal Bureau of Statistics. (2024). &ldquo;The ballast role of Yuxi&apos;s tobacco manufacturing industry remains solid.&rdquo;
            </li>
          </ul>
        </section>
      </div>
      <ChapterBridge
        eyebrow="[ RETURN ]"
        title="Introduction"
        description="A digital ethnography of clay, fire, and memory."
        href="/"
      />
    </main>
  );
}
