"use client";

export default function AboutPage() {
  return (
    <main className="flex min-h-screen w-full flex-col pt-20">
      <section className="w-full bg-[#0a0a0a] text-white py-32 px-6 min-h-screen">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* ── Left column: Photo + Fieldwork ── */}
          <div className="lg:col-span-7 flex flex-col">
            {/* Photo */}
            <div className="aspect-[3/2] rounded-2xl overflow-hidden shadow-2xl mb-10">
              <img
                src="/结尾.jpg"
                alt="Fieldwork in Yunnan"
                className="w-full h-full object-contain bg-[#161616]"
              />
            </div>

            {/* Fieldwork & Gratitude */}
            <span className="text-xs tracking-[0.2em] text-gray-500 uppercase font-sans mb-5 block">
              Fieldwork & Gratitude
            </span>
            <h2 className="font-serif text-2xl md:text-3xl text-white leading-snug mb-1">
              Yuqing Kiln Workshop (&#x7389;&#x6E05;&#x70E7;&#x5DE5;&#x574A;)
            </h2>
            <h2 className="font-serif text-2xl md:text-3xl text-white leading-snug mb-6">
              Wamao Daren Studio (&#x74E6;&#x732B;&#x5927;&#x4EBA;&#x5DE5;&#x4F5C;&#x5BA4;)
            </h2>
            <p className="text-gray-500 leading-relaxed text-base max-w-lg">
              Deepest gratitude for opening your doors, sharing your fires, and allowing me to document the living soul of the red earth craft.
            </p>
          </div>

          {/* ── Right column: About + References ── */}
          <div className="lg:col-span-5 flex flex-col justify-between pt-2">
            {/* About the Researcher */}
            <div className="mb-16">
              <span className="text-xs tracking-[0.2em] text-gray-500 uppercase font-sans mb-5 block">
                About the Researcher
              </span>
              <h1 className="font-serif text-4xl md:text-5xl font-black text-white leading-tight mb-6">
                Li Houjun
              </h1>
              <p className="text-base font-sans font-light text-gray-400 leading-relaxed mb-6">
                An independent researcher exploring the intersection of sociology, history, and digital humanities. Fascinated by how cultural totems survive and mutate.
              </p>
              <a
                href="mailto:s24037.li@stu.scie.com.cn"
                className="inline-block text-white border-b border-gray-600 hover:border-white pb-1 transition-colors text-base w-max"
              >
                Get in touch &rarr;
              </a>
            </div>

            {/* References */}
            <div>
              <span className="text-xs tracking-[0.2em] text-gray-500 uppercase font-sans mb-5 block">
                Archives & References
              </span>
              <ul className="space-y-3 text-sm text-gray-600 leading-relaxed">
                <li>Zhang, T., et al. (1974). <em className="text-gray-500">Ming shi</em>. Zhonghua Book Company.</li>
                <li>Tu, B., et al. (1998). <em className="text-gray-500">Yunnan tongzhi</em> (Wanli ed.). Yunnan Historical Materials.</li>
                <li>Shaanxi Provincial Institute of Archaeology. (1998). <em className="text-gray-500">Yaozhou yaozhi fajue baogao</em>. Science Press.</li>
                <li>Frazer, J. G. (1922). <em className="text-gray-500">The Golden Bough</em>. Macmillan.</li>
                <li>Anonymous. (n.d.). Yizu hu wenhua. <em className="text-gray-500">Yi People Network</em>.{" "}
                  <a href="http://www.yizuren.com/yistudy/yxyjjx/48819.html" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white underline underline-offset-2 transition-colors">yizuren.com</a>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0a0a] pb-16 pt-8 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
          <span>&copy; 2026 Li Houjun. All rights reserved.</span>
          <span className="mt-4 md:mt-0">From the red earth of Yunnan to the digital archive.</span>
        </div>
      </footer>
    </main>
  );
}
