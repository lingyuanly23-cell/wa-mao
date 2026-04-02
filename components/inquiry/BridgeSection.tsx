"use client";

import Link from "next/link";
import { useScrollReveal } from "../../hooks/useScrollReveal";

export default function BridgeSection() {
  const ref = useScrollReveal<HTMLDivElement>({ staggerDelay: 150 });

  return (
    <section className="relative w-full bg-[#F7F6F4] py-32 overflow-hidden">
      <div ref={ref} className="max-w-2xl mx-auto px-6 text-center">
        <p
          className="text-xl font-sans font-light text-[#4A4A4A] leading-relaxed mb-16"
          data-reveal
        >
          If today&apos;s Wamao is a modern invention, what is the real history it
          claims to inherit?
        </p>

        {/* Navigation card to Act 2 */}
        <Link href="/descent" data-reveal>
          <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 text-left inline-block w-full max-w-md mx-auto">
            <span className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-[#B84221] mb-4 block">
              [ CONTINUE ]
            </span>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-serif font-bold text-[#1C1A17] mb-2">
                  ACT II: THE DESCENT
                </h3>
                <p className="text-base font-sans text-[#4A4A4A]">
                  Geographical mutation from imperial order to primal roar.
                </p>
              </div>
              <span className="text-2xl text-[#B84221] transition-transform duration-300 group-hover:translate-x-2 ml-4 shrink-0">
                &rarr;
              </span>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
