"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isMobileMenuOpen]);

  const links = [
    { name: "INTRODUCTION", href: "/" },
    { name: "ACT I: INQUIRY", href: "/inquiry" },
    { name: "ACT II: DESCENT", href: "/descent" },
    { name: "ACT III: TABOO", href: "/taboo" },
    { name: "ABOUT", href: "/about" },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${isMobileMenuOpen ? 'bg-transparent border-transparent' : 'bg-[#F0EFEC]/80 backdrop-blur-md border-b border-black/5'}`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative z-50">
          <Link 
            href="/" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="font-serif tracking-widest text-[#1C1A17] text-lg font-bold hover:text-[#B84221] transition-colors"
          >
            WAMAO EPIC
          </Link>
          
          {/* Desktop Nav */}
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

          {/* Mobile Hamburger Button */}
          <button 
            className="flex md:hidden text-[#1C1A17] p-2 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-8 h-8 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-8 h-8 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Full-Screen Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-40 bg-[#F0EFEC] transition-opacity duration-500 flex flex-col items-center justify-center ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Noise filter background matching the global layout */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")" }}></div>
        
        <div className="flex flex-col items-center w-full px-6 z-10 w-full max-w-md mx-auto">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-4xl font-serif mb-8 text-center transition-colors duration-300 w-full border-b border-black/5 pb-4 ${
                pathname === link.href 
                  ? "text-[#B84221]" 
                  : "text-[#1C1A17] hover:text-[#B84221]"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
        
        <div className="absolute bottom-16 text-[#4A4A4A] font-sans text-xs tracking-[0.3em] uppercase z-10">
          Wamao Epic Archive
        </div>
      </div>
    </>
  );
}
