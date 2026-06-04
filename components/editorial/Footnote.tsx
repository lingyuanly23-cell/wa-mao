"use client";

export default function Footnote({ n, source }: { n: number; source: string }) {
  return (
    <sup className="group relative ml-[1px] cursor-help font-sans text-[0.62em] font-bold text-[#B84221] align-super">
      {n}
      <span className="pointer-events-none absolute bottom-[1.4em] left-1/2 z-30 w-56 -translate-x-1/2 rounded-sm bg-[#1C1A17] px-3 py-2 text-center font-sans text-[0.7rem] font-normal leading-snug tracking-normal text-[#F0EFEC] opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
        {source}
      </span>
    </sup>
  );
}
