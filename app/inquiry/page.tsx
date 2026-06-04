"use client";

import HeroSection from "../../components/inquiry/HeroSection";
import TimelineSection from "../../components/inquiry/TimelineSection";
import BridgeSection from "../../components/inquiry/BridgeSection";

export default function InquiryPage() {
  return (
    <main className="flex min-h-screen w-full flex-col pt-20">
      <HeroSection />
      <TimelineSection />
      <BridgeSection />
    </main>
  );
}
