import React from "react";
import { Container } from "@/components/atoms/Container";
import { SectionLabel } from "@/components/atoms/SectionLabel";
import { TextLink } from "@/components/atoms/TextLink";

export function Hero() {
  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative pt-12 sm:pt-20 md:pt-28 pb-16 sm:pb-24 md:pb-32 border-b border-border"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Main Hero Area (8 columns on large screens) */}
          <div className="lg:col-span-8 space-y-8 sm:space-y-12">
            <div>
              <SectionLabel className="mb-4 sm:mb-6">
                INDEPENDENT SOFTWARE COMPANY · UNITED KINGDOM
              </SectionLabel>

              <h1 className="text-foreground text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[4.75rem] font-medium tracking-tight leading-[1.06] text-balance">
                Software and interactive products, built deliberately.
              </h1>
            </div>

            <div className="max-w-2xl space-y-4 text-muted text-base sm:text-lg md:text-xl font-normal leading-relaxed">
              <p>
                BYGOT LTD designs and develops digital products across software,
                web applications and interactive entertainment.
              </p>
              <p className="text-muted/90">
                We focus on clear systems, reliable engineering and experiences
                that feel considered rather than generic.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6 sm:gap-10 pt-2">
              <TextLink href="#work" variant="primary" showArrow>
                Explore what we build
              </TextLink>
              <TextLink href="#contact" variant="secondary">
                Contact
              </TextLink>
            </div>
          </div>

          {/* Architectural Secondary Column (4 columns on large screens) */}
          <div className="lg:col-span-4 lg:border-l lg:border-border lg:pl-10 pt-4 lg:pt-2 flex flex-col justify-between space-y-10 lg:space-y-16">
            <div className="space-y-6">
              <div>
                <span className="font-mono text-[10px] uppercase text-muted tracking-widest block">
                  Studio Focus
                </span>
                <span className="font-mono text-xs text-foreground tracking-wider block mt-1">
                  SOFTWARE / INTERACTIVE
                </span>
              </div>

              <div>
                <span className="font-mono text-[10px] uppercase text-muted tracking-widest block">
                  Jurisdiction
                </span>
                <span className="font-mono text-xs text-foreground tracking-wider block mt-1">
                  UNITED KINGDOM
                </span>
              </div>

              <div>
                <span className="font-mono text-[10px] uppercase text-muted tracking-widest block">
                  Engineering Scope
                </span>
                <span className="font-mono text-xs text-foreground tracking-wider block mt-1">
                  APPLICATIONS · SIMULATIONS · PLATFORMS
                </span>
              </div>
            </div>

            <div className="pt-6 border-t border-border space-y-2">
              <span className="font-mono text-[10px] text-accent tracking-widest uppercase block">
                Index Ref. 00
              </span>
              <p className="text-xs text-muted leading-relaxed font-mono">
                Engineered for longevity, performance and deliberate digital
                craft.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
