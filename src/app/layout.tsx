import type { Metadata } from "next";
import { Manrope, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { getCompanyInfo, getCompanyJsonLd } from "@/lib/company";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

const company = getCompanyInfo();

export const metadata: Metadata = {
  metadataBase: new URL(company.siteUrl || "https://example.com"),
  title: "BYGOT LTD — Software & Interactive Products",
  description:
    "BYGOT LTD is a UK software company building software, web applications, digital products and interactive experiences.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "BYGOT LTD — Software & Interactive Products",
    description:
      "BYGOT LTD is a UK software company building software, web applications, digital products and interactive experiences.",
    url: "/",
    siteName: "BYGOT LTD",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BYGOT LTD — Software & Interactive Products",
    description:
      "BYGOT LTD is a UK software company building software, web applications, digital products and interactive experiences.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = getCompanyJsonLd(company);

  return (
    <html lang="en" className={`${manrope.variable} ${ibmPlexMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans bg-canvas text-foreground min-h-screen antialiased selection:bg-foreground selection:text-canvas">
        {children}
      </body>
    </html>
  );
}
