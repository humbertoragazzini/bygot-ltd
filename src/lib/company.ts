import type { CompanyInfo } from "@/types/company";

export function getCompanyInfo(): CompanyInfo {
  return {
    legalName: process.env.COMPANY_LEGAL_NAME || "BYGOT LTD",
    companyNumber: process.env.COMPANY_NUMBER || "00000000",
    addressLine1: process.env.COMPANY_ADDRESS_LINE_1 || "Company Address",
    addressLine2: process.env.COMPANY_ADDRESS_LINE_2 || undefined,
    city: process.env.COMPANY_CITY || "London",
    county: process.env.COMPANY_COUNTY || undefined,
    postcode: process.env.COMPANY_POSTCODE || "AA0 0AA",
    country: process.env.COMPANY_COUNTRY || "United Kingdom",
    phone: process.env.COMPANY_PHONE || "+44 0000 000000",
    email: process.env.COMPANY_EMAIL || "hello@example.com",
    siteUrl: process.env.SITE_URL || "https://example.com",
  };
}

export function getCompanyJsonLd(company: CompanyInfo) {
  const addressParts: Record<string, string> = {
    "@type": "PostalAddress",
    streetAddress: [company.addressLine1, company.addressLine2]
      .filter(Boolean)
      .join(", "),
    addressLocality: company.city,
    postalCode: company.postcode,
    addressCountry: company.country,
  };

  if (company.county) {
    addressParts.addressRegion = company.county;
  }

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.legalName,
    url: company.siteUrl,
    email: company.email,
    telephone: company.phone,
    address: addressParts,
  };
}
