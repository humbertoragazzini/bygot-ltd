import React from "react";
import { Container } from "@/components/atoms/Container";
import { SectionLabel } from "@/components/atoms/SectionLabel";
import { SectionHeading } from "@/components/atoms/SectionHeading";

export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-20 sm:py-28 md:py-36 border-b border-border"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Section Indicator Column */}
          <div className="lg:col-span-3">
            <SectionLabel>01 / ABOUT</SectionLabel>
          </div>

          {/* Content Column */}
          <div className="lg:col-span-9 space-y-8 sm:space-y-12">
            <SectionHeading id="about-heading" className="max-w-3xl">
              A small company with room to build ambitious things.
            </SectionHeading>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 pt-4">
              <div className="space-y-6 text-base sm:text-lg text-muted leading-relaxed">
                <p className="text-foreground font-normal">
                  BYGOT LTD is a UK software company focused on building useful
                  digital products and interactive experiences.
                </p>
                <p>
                  Our work sits between engineering and design: systems should
                  be technically sound, but they should also be clear,
                  responsive and enjoyable to use.
                </p>
              </div>

              <div className="space-y-6 text-base sm:text-lg text-muted leading-relaxed">
                <p>
                  We prefer focused products, maintainable technology and careful
                  execution over unnecessary complexity.
                </p>
                <div className="pt-4 border-t border-border">
                  <span className="font-mono text-xs text-muted block uppercase tracking-wider mb-1">
                    Operating Philosophy
                  </span>
                  <p className="font-mono text-xs text-foreground/80 leading-normal">
                    Quality over volume. High technical standards. Clear intent.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
