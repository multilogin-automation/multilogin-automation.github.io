export interface FaqItem {
  q: string;
  a: string;
}

export const faqs: FaqItem[] = [
  {
    q: "What is Multilogin X?",
    a: "Multilogin X is a commercial antidetect browser platform for managing isolated browser profiles with unique fingerprints and proxies. The Multilogin X Automation SDK is a separate open-source Python project that provides Playwright CDP scripts to automate those profiles for legitimate browse, warmup, and QA workflows.",
  },
  {
    q: "What is Playwright CDP and how does the SDK use it?",
    a: "Playwright CDP (Chrome DevTools Protocol) lets Python scripts control a running browser through a debug port. Multilogin X exposes each profile via CDP when started. SDK demos connect Playwright to that port to automate navigation, screenshots, and session tasks without modifying browser fingerprints manually.",
  },
  {
    q: "What are acceptable legal use cases?",
    a: "Legal use only — browse, warmup, and QA workflows only. Acceptable uses include session testing, proxy validation, UI QA in staging environments, browser research, and profile warmup for development. Users are responsible for complying with platform terms of service and applicable laws.",
  },
  {
    q: "Is the SDK free? What does Telegram offer?",
    a: "All 120 demo scripts are free and MIT licensed on GitHub. The Telegram channel provides script delivery, updates, and community support — it does not replace the open-source repository. Clone the GitHub repo for full source code, dependencies, and local execution.",
  },
  {
    q: "What is the SAAS50 Multilogin discount code?",
    a: "SAAS50 is an affiliate discount code for Multilogin commercial plans, available via multilogin.com?a_aid=saas. The SDK itself is free; SAAS50 applies only if you purchase a Multilogin X subscription for running antidetect browser profiles.",
  },
  {
    q: "Can I migrate profiles from AdsPower or other browsers?",
    a: "Yes. The SDK includes migration demos in the migrate category — AdsPower to Multilogin transfer, AdsPower export, and Incogniton sync scripts. These are for legitimate profile transfer and QA validation during platform evaluation. See /category/migrate for all migration tools.",
  },
  {
    q: "How do proxies work with Multilogin X automation?",
    a: "Each Multilogin X profile can use its own proxy configuration. SDK core tools include single proxy check, bulk proxy validation, and proxy rotator demos. Run proxy checks before automation to confirm connectivity and geolocation from within the isolated browser session.",
  },
  {
    q: "How many tools are in the catalog and how are they updated?",
    a: "The catalog contains 120 open-source Playwright CDP demo scripts across 14 categories. Tool data is synced from catalog.json in the SDK GitHub repository at build time. When new demos are added to the repo, this site rebuilds to reflect the updated catalog automatically.",
  },
];

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}
