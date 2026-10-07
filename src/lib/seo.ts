import type { Metadata } from "next";
import { absoluteUrl, platforms, site, social } from "./site";

export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = true,
}: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
}): Metadata {
  const url = absoluteUrl(path);
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      siteName: site.name,
      locale: site.locale,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

type Json = Record<string, unknown>;

export const organizationLd = (): Json => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${site.url}/#organization`,
  name: site.name,
  url: site.url,
  logo: absoluteUrl("/icon.svg"),
  ...(social.length ? { sameAs: social.map((s) => s.url) } : {}),
});

export const websiteLd = (): Json => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  name: site.name,
  url: site.url,
  description: site.description,
  publisher: { "@id": `${site.url}/#organization` },
  inLanguage: "en",
});

/** Only states facts: OS list reflects platforms that are actually available. */
export const softwareLd = (): Json => {
  const available = platforms.filter((p) => p.status === "available");
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: site.name,
    applicationCategory: "DeveloperApplication",
    applicationSubCategory: "Workspace manager",
    operatingSystem: available.length ? available.map((p) => p.name).join(", ") : "Windows 10, Windows 11",
    description: site.description,
    url: site.url,
    publisher: { "@id": `${site.url}/#organization` },
    ...(available[0]?.downloadUrl ? { downloadUrl: available[0].downloadUrl } : {}),
    offers: { "@type": "Offer", price: "6", priceCurrency: "USD" },
  };
};

export const breadcrumbLd = (items: { name: string; path: string }[]): Json => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: absoluteUrl(it.path),
  })),
});

export const faqLd = (faqs: { q: string; a: string }[]): Json => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});
