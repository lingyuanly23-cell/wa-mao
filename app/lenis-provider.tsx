"use client";

import { ReactLenis } from "@studio-freight/react-lenis";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  // @ts-ignore Type mismatch with older react-lenis ReactNode definition
  return <ReactLenis root>{children}</ReactLenis>;
}
