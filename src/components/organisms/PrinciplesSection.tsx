import React from "react";
import { Container } from "@/components/atoms/Container";
import { SectionLabel } from "@/components/atoms/SectionLabel";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { Principle } from "@/components/molecules/Principle";

const principles = [
  {
    number: "PRINCIPLE 01",
    title: "Clear before clever",
    description:
      "Technology should make a product easier to understand, not harder.",
  },
  {
    number: "PRINCIPLE 02",
    title: "Performance is part of design",
    description:
      "Responsiveness, stability and efficiency directly affect how a product feels.",
  },
  {
    number: "PRINCIPLE 03",
    title: "Details matter",
    description:
      "The difference between functional and considered often lives in the smallest interactions.",
  },
];

export function PrinciplesSection() {
  return (
    <section
      id="principles"
      aria-labelledby="principles-heading"
      className="py-20 sm:py-28 md:py-36 border-b border-border"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 mb-16 sm:mb-20">
          <div className="lg:col-span-3">
            <SectionLabel>03 / PRINCIPLES</SectionLabel>
          </div>
          <div className="lg:col-span-9">
            <SectionHeading id="principles-heading" className="max-w-3xl">
              How we approach the work.
            </SectionHeading>
          </div>
        </div>

        {/* 3-Column Editorial Grid with structural dividers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-12 divide-y md:divide-y-0 md:divide-x divide-border">
          {principles.map((item, index) => (
            <Principle
              key={item.number}
              number={item.number}
              title={item.title}
              description={item.description}
              className={index > 0 ? "pt-8 md:pt-0 md:pl-10 lg:pl-12" : ""}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
