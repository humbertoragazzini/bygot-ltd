import React from "react";
import type { CompanyInfo } from "@/types/company";

interface ContactDetailsProps {
  company: CompanyInfo;
}

export function ContactDetails({ company }: ContactDetailsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 pt-8 sm:pt-12 border-t border-border">
      {/* Registered Company Info */}
      <div className="md:col-span-6 space-y-6">
        <div>
          <span className="font-mono text-xs text-muted uppercase tracking-wider block mb-1">
            Company Entity
          </span>
          <p className="text-foreground text-lg font-medium">
            {company.legalName}
          </p>
        </div>

        <div>
          <span className="font-mono text-xs text-muted uppercase tracking-wider block mb-1">
            Company Registration No.
          </span>
          <p className="font-mono text-sm text-foreground">
            {company.companyNumber}
          </p>
        </div>

        <div>
          <span className="font-mono text-xs text-muted uppercase tracking-wider block mb-1">
            Registered Office
          </span>
          <address className="not-italic text-sm sm:text-base text-muted space-y-0.5 font-normal">
            <div>{company.addressLine1}</div>
            {company.addressLine2 && <div>{company.addressLine2}</div>}
            <div>
              {company.city}
              {company.county ? `, ${company.county}` : ""}
            </div>
            <div className="font-mono text-xs sm:text-sm text-foreground">
              {company.postcode}
            </div>
            <div>{company.country}</div>
          </address>
        </div>
      </div>

      {/* Direct Contact Enquiries */}
      <div className="md:col-span-6 space-y-6">
        <div>
          <span className="font-mono text-xs text-muted uppercase tracking-wider block mb-1">
            Direct Enquiries
          </span>
          <a
            href={`mailto:${company.email}`}
            className="inline-block text-lg sm:text-xl font-medium text-foreground hover:text-accent border-b border-foreground/40 hover:border-accent transition-colors pb-0.5"
          >
            {company.email}
          </a>
        </div>

        <div>
          <span className="font-mono text-xs text-muted uppercase tracking-wider block mb-1">
            Telephone
          </span>
          <a
            href={`tel:${company.phone.replace(/\s+/g, "")}`}
            className="inline-block font-mono text-sm sm:text-base text-muted hover:text-foreground transition-colors"
          >
            {company.phone}
          </a>
        </div>

        <div className="pt-4">
          <span className="font-mono text-[11px] text-muted/80 tracking-wide uppercase block">
            Registered in England and Wales
          </span>
        </div>
      </div>
    </div>
  );
}
