"use client";

import Link from "next/link";

/** Reusable "continue to the next chapter" card, shared across acts.
 *  Descriptions are the verbatim [SITE STRUCTURE] lines from the manuscript. */

export default function ChapterBridge({
  title,
  description,
  href,
  eyebrow = "[ CONTINUE ]",
}: {
  title: string;
  description: string;
  href: string;
  eyebrow?: string;
}) {
  return (
    <section className="relative w-full bg-[#F7F6F4] py-32">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <Link href={href}>
          <div className="group mx-auto inline-block w-full max-w-md rounded-2xl bg-white p-8 text-left shadow-lg transition-shadow duration-300 hover:shadow-xl">
            <span className="mb-4 block font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#B84221]">
              {eyebrow}
            </span>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="mb-2 font-serif text-2xl font-bold text-[#1C1A17]">{title}</h3>
                <p className="font-sans text-base text-[#4A4A4A]">{description}</p>
              </div>
              <span className="ml-4 shrink-0 text-2xl text-[#B84221] transition-transform duration-300 group-hover:translate-x-2">
                &rarr;
              </span>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
