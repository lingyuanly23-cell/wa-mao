import type { Metadata } from "next";
import { LenisProvider } from "./lenis-provider";
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
        <body className={`font-sans antialiased`}>
          {children}
        </body>
      </LenisProvider>
    </html>
  );
}
