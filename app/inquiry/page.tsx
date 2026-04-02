"use client";

import HeroSection from "../../components/inquiry/HeroSection";
import DataVizSection from "../../components/inquiry/DataVizSection";
import TimelineSection from "../../components/inquiry/TimelineSection";
import ConclusionSection from "../../components/inquiry/ConclusionSection";
import BridgeSection from "../../components/inquiry/BridgeSection";

export default function InquiryPage() {
  return (
    <main className="flex min-h-screen w-full flex-col pt-20">
      <HeroSection />
      <DataVizSection />
      <TimelineSection />
      <ConclusionSection />
      <BridgeSection />
    </main>
  );
}
