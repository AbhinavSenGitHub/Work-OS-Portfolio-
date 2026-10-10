import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { JsonLd } from "@/components/site/JsonLd";
import { SiteChrome } from "@/components/site/SiteChrome";
import { analytics, site } from "@/lib/site";
import { organizationLd, websiteLd } from "@/lib/seo";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "WorkOS — Your Computer, Organized Around Your Work",
    template: "%s | WorkOS",
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    url: site.url,
    title: "WorkOS — Your Computer, Organized Around Your Work",
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#060808",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-dvh">
        <SiteChrome header={<Header />} footer={<Footer />}>
          {children}
        </SiteChrome>
        <JsonLd data={[organizationLd(), websiteLd()]} />
        {analytics.domain && <Script defer data-domain={analytics.domain} src={analytics.src} strategy="afterInteractive" />}
      </body>
    </html>
  );
}
