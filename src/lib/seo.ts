import type { Tool } from "../types";
import { toolSlug } from "./catalog";
import { SITE_NAME, SITE_URL } from "./constants";
import { sanitizeDisplay } from "./display";

export function homeTitle(toolCount: number): string {
  return `Multilogin X Automation SDK | ${toolCount} Antidetect Browser Tools`;
}

export function homeDescription(toolCount: number): string {
  return `Official catalog of ${toolCount} open-source Playwright CDP tools for Multilogin X antidetect browser automation. Browse, warmup, QA & research workflows.`;
}

export function toolTitle(tool: Tool): string {
  return `${tool.name} — Multilogin X Tool #${tool.number} | Automation SDK`;
}

export function toolDescription(tool: Tool): string {
  const desc = sanitizeDisplay(tool.description);
  const base = `${tool.name} — Multilogin X Tool #${tool.number}. ${desc}. Open-source Playwright CDP demo for warmup, QA & browser research.`;
  if (base.length <= 160) return base;
  const short = `${tool.name} — Multilogin X Tool #${tool.number}. ${desc}. Playwright CDP demo for QA & warmup.`;
  return short.length <= 160 ? short : short.slice(0, 157) + "...";
}

export function categoryTitle(label: string): string {
  return `${label} Automation Tools | Multilogin X SDK`;
}

export function categoryDescription(label: string, count: number, slug: string): string {
  const topics: Record<string, string> = {
    core: "profile management, proxy validation, cookie sessions",
    warmup: "browse warmup, session trust, navigation flows",
    social: "social platform browse, session QA, warmup",
    shop: "e-commerce navigation, storefront QA, shopping research",
    crypto: "Web3 wallets, DEX interfaces, DeFi QA",
    seo: "search engines, SERP research, local listings",
    checkout: "payment flows, checkout QA, ticket testing",
    crawler: "page extraction, anti-detection research, crawl QA",
    migrate: "profile migration, AdsPower transfer, platform sync",
    media: "streaming platforms, media session QA",
    gaming: "game stores, gaming platform research",
    work: "productivity tools, freelance platforms, workplace QA",
    ads: "Google Ads, Meta Ads, campaign dashboard QA",
    learn: "e-learning platforms, course navigation, education QA",
  };
  const topic = topics[slug] ?? "browser automation";
  const base = `${count} ${label} automation tools for Multilogin X. Playwright CDP demos for ${topic}. Open-source Python scripts.`;
  return base.length <= 160 ? base : base.slice(0, 157) + "...";
}

export function categoryJsonLd(label: string, slug: string, catTools: Tool[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${label} Automation Tools`,
    numberOfItems: catTools.length,
    itemListElement: catTools.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      url: `${SITE_URL}/tools/${toolSlug(t)}`,
    })),
  };
}

export function toolsPageTitle(toolCount: number): string {
  return `Tool Catalog — ${toolCount} Multilogin X Automation Demos`;
}

export function toolsPageDescription(toolCount: number): string {
  return `Browse all ${toolCount} open-source Playwright CDP automation demos for Multilogin X. Filter by category, search by name, view source on GitHub.`;
}

export function canonicalUrl(path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (clean === "/") return SITE_URL + "/";
  return SITE_URL + clean;
}

export function catalogItemListJsonLd(
  name: string,
  tools: Tool[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: tools.length,
    itemListElement: tools.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      url: `${SITE_URL}/tools/${toolSlug(t)}`,
    })),
  };
}

export function homeJsonLd(toolCount: number, tools: Tool[]) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL + "/",
      description: homeDescription(toolCount),
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_URL}/tools?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    catalogItemListJsonLd("Multilogin X Automation Tool Catalog", tools),
  ];
}

export function toolJsonLd(tool: Tool, slug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${tool.name} — Multilogin X Tool #${tool.number}`,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Windows, macOS, Linux",
    description: sanitizeDisplay(tool.description),
    url: `${SITE_URL}/tools/${slug}`,
    downloadUrl: tool.github_url,
    softwareVersion: "1.0",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Organization",
      name: "multilogin-automation",
      url: "https://github.com/multilogin-automation",
    },
  };
}
