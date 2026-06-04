import type { Metadata } from "next";
import { LenisProvider } from "./lenis-provider";
import Navbar from "../components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wamao Epic",
  description: "A cat that has been sitting on the roof for 600 years",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <LenisProvider>
        <body className={`font-sans antialiased bg-[#F0EFEC] text-[#4A4A4A] relative`}>
          {/* Editorial typefaces (React 19 hoists these to <head>) */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&family=Noto+Serif+SC:wght@400;500;600;700;900&family=Source+Serif+4:ital,wght@0,400;0,500;0,600;1,400&display=swap"
            rel="stylesheet"
          />

          {/* Global subtle noise texture */}
          <div className="pointer-events-none fixed inset-0 z-[1] opacity-[0.04] mix-blend-overlay" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")" }}></div>
          
          <div className="relative z-10">
            <Navbar />
            {children}
          </div>
        </body>
      </LenisProvider>
    </html>
  );
}
