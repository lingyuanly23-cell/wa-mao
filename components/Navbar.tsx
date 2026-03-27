"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { name: "INTRODUCTION", href: "/" },
    { name: "ACT II: DESCENT", href: "/descent" },
    { name: "ACT III: TABOO", href: "/taboo" },
    { name: "ACT IV: SPECTACLE", href: "/spectacle" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#EAE8E3]/80 backdrop-blur-md border-b border-black/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link 
          href="/" 
          className="font-serif tracking-widest text-[#1C1A17] text-lg font-bold hover:text-[#B84221] transition-colors"
        >
          WAMAO EPIC
        </Link>
        <div className="hidden md:flex gap-8">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`font-sans uppercase text-sm font-semibold transition-colors duration-300 ${
                pathname === link.href 
                  ? "text-[#B84221]" 
                  : "text-[#4A4A4A] hover:text-[#1C1A17]"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
