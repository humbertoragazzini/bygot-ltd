import React from "react";
import { Container } from "@/components/atoms/Container";
import { SectionLabel } from "@/components/atoms/SectionLabel";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { CapabilityRow } from "@/components/molecules/CapabilityRow";

const capabilities = [
  {
    number: "01",
    title: "Interactive experiences",
    description:
      "Games, simulations and real-time experiences where technology, interaction and visual design need to work as one system.",
    metadata: "GAMES / REAL-TIME / INTERACTION",
  },
  {
    number: "02",
    title: "Web platforms",
    description:
      "Fast, accessible web applications and digital experiences designed around clarity, maintainability and performance.",
    metadata: "WEB / APPLICATIONS / EXPERIENCES",
  },
  {
    number: "03",
    title: "Product engineering",
    description:
      "Prototypes, software products and internal tools built to turn an idea into something concrete, testable and useful.",
    metadata: "PRODUCT / PROTOTYPING / SOFTWARE",
  },
];

export function WorkSection() {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="py-20 sm:py-28 md:py-36 border-b border-border"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 mb-12 sm:mb-16">
          <div className="lg:col-span-3">
            <SectionLabel>02 / WHAT WE BUILD</SectionLabel>
          </div>
          <div className="lg:col-span-9">
            <SectionHeading id="work-heading" className="max-w-3xl">
              Different products. One engineering mindset.
            </SectionHeading>
          </div>
        </div>

        <div className="w-full">
          {capabilities.map((item, index) => (
            <CapabilityRow
              key={item.number}
              number={item.number}
              title={item.title}
              description={item.description}
              metadata={item.metadata}
              isLast={index === capabilities.length - 1}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
