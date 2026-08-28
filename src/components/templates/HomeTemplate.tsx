"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Header } from "@/components/organisms/Header";
import { Hero } from "@/components/organisms/Hero";
import { AboutSection } from "@/components/organisms/AboutSection";
import { WorkSection } from "@/components/organisms/WorkSection";
import { PrinciplesSection } from "@/components/organisms/PrinciplesSection";
import { ContactSection } from "@/components/organisms/ContactSection";
import { Footer } from "@/components/organisms/Footer";
import type { CompanyInfo } from "@/types/company";

const FluidBackground = dynamic(
  () =>
    import("@/components/organisms/fluid-background/FluidBackground").then(
      (mod) => mod.FluidBackground
    ),
  { ssr: false }
);

interface HomeTemplateProps {
  company: CompanyInfo;
}

export function HomeTemplate({ company }: HomeTemplateProps) {
  return (
    <div className="relative min-h-screen flex flex-col bg-white text-foreground selection:bg-foreground selection:text-white">
      {/* Real GPU Navier-Stokes Fluid Background (Fixed Layer 0) */}
      <FluidBackground />

      {/* Website Content (Relative Layer 10 with transparent background) */}
      <div className="relative z-10 flex flex-col min-h-screen bg-transparent">
        <Header />
        <main id="main-content" className="flex-1 bg-transparent">
          <Hero />
          <AboutSection />
          <WorkSection />
          <PrinciplesSection />
          <ContactSection company={company} />
        </main>
        <Footer />
      </div>
    </div>
  );
}
