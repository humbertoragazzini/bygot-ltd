import React from "react";
import { Container } from "@/components/atoms/Container";
import { SectionLabel } from "@/components/atoms/SectionLabel";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { ContactDetails } from "@/components/molecules/ContactDetails";
import type { CompanyInfo } from "@/types/company";

interface ContactSectionProps {
  company: CompanyInfo;
}

export function ContactSection({ company }: ContactSectionProps) {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-20 sm:py-28 md:py-36 border-b border-border"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 mb-12 sm:mb-16">
          <div className="lg:col-span-3">
            <SectionLabel>04 / CONTACT</SectionLabel>
          </div>
          <div className="lg:col-span-9 space-y-6">
            <SectionHeading id="contact-heading" className="max-w-2xl">
              Start a conversation.
            </SectionHeading>
            <p className="text-muted text-lg sm:text-xl max-w-xl font-normal leading-relaxed">
              For business enquiries, software projects or information about
              BYGOT LTD, contact us directly.
            </p>
          </div>
        </div>

        {/* Registered & Direct Details */}
        <ContactDetails company={company} />
      </Container>
    </section>
  );
}
