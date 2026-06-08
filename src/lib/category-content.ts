/** Category page intros — 150–250 words each, English, legal use cases only. */

export const categoryIntroFooter =
  "Individual tool pages include script filenames, category metadata, related demos, and direct GitHub source links. This documentation site is generated from the official SDK catalog at build time. Explore the full tool catalog or return to the homepage to browse all one hundred twenty MIT-licensed Playwright CDP scripts.";

export const categoryIntros: Record<string, string[]> = {
  core: [
    "Profile & Proxy (Core) automation tools cover the essential Multilogin X workflows: listing profiles, starting and stopping browser sessions, proxy validation, cookie backup, fingerprint scanning, and bulk profile operations. These Playwright CDP scripts are the foundation of every antidetect browser automation project built on isolated fingerprint profiles.",
    "Typical legitimate use cases include QA testing of profile configurations, validating proxy connectivity before production runs, exporting and restoring session cookies for research, and running repeatable tasks across multiple browser profiles. Each demo is a standalone Python script that connects to Multilogin X via Chrome DevTools Protocol.",
    "Whether you are setting up a development environment, auditing profile health, or building internal automation pipelines, these core tools provide production-ready patterns. All scripts are open source under the MIT license on GitHub. Users are responsible for complying with platform terms of service and applicable laws.",
    "Browse the tools below for direct links to individual demo pages and GitHub source files. Return to the full catalog or homepage to explore all one hundred twenty SDK scripts across fourteen categories.",
  ],
  warmup: [
    "Warm-up and browsing automation tools simulate natural navigation patterns across antidetect browser profiles. These scripts visit news sites, search engines, video platforms, and general web destinations to build session familiarity through structured browse workflows.",
    "Legitimate applications include preparing profiles for QA environments, testing how isolated fingerprints render across different sites, validating session persistence after proxy changes, and researching browser behavior under realistic navigation sequences. All demos use Playwright CDP with Multilogin X.",
    "Warmup workflows are commonly used in development and research settings where reproducible browse patterns matter. Each script is configurable and open source. Use these tools only for legal browse, warmup, and QA purposes in compliance with applicable laws and platform policies.",
    "Each tool below links to a dedicated page with description, related demos, and GitHub source. Explore the full catalog or homepage to browse all Multilogin X automation scripts in the SDK.",
  ],
  social: [
    "Social media browser automation demos cover major platforms including Facebook, Twitter, Instagram, LinkedIn, TikTok, Reddit, Discord, Pinterest, Threads, and more. Each script runs inside an isolated Multilogin X antidetect profile with a unique browser fingerprint.",
    "These tools support legitimate session research, platform UI QA testing, warmup browse flows, and automation workflow development. They demonstrate how Playwright CDP connects to Multilogin X profiles for structured navigation without sharing cookies or fingerprints between sessions.",
    "Developers use social category scripts to prototype integrations, validate login flows in test environments, and build reproducible research pipelines. All source code is MIT licensed on GitHub. Users must comply with each platform's terms of service and applicable regulations.",
    "Select any tool below to view its demo page, source code on GitHub, and related scripts in this category. Visit the full tool catalog or homepage to discover all SDK categories.",
  ],
  shop: [
    "E-commerce and shopping automation tools cover marketplaces and retail platforms including Amazon, eBay, Etsy, Shopify, Walmart, Shopee, AliExpress, Temu, and travel booking sites. Scripts navigate product pages, wishlists, and storefront interfaces using isolated antidetect profiles.",
    "Legitimate use cases include checkout flow QA testing, session validation for e-commerce research, browse warmup before user-acceptance testing, and prototyping automation against staging environments. Each demo uses Playwright Python with Multilogin X CDP integration.",
    "These scripts are designed for developers and QA engineers who need reproducible browser sessions across multiple isolated profiles. All demos are open source. Use only for legal testing, research, and browse workflows in accordance with platform terms and applicable laws.",
    "The grid below lists every shopping and e-commerce demo with links to tool pages and GitHub. Browse the complete catalog or return home to explore all fourteen SDK categories.",
  ],
  crypto: [
    "Crypto and Web3 browser tools automate navigation of wallet interfaces, DEX platforms, testnet faucets, NFT marketplaces, and exchange dashboards using Multilogin X antidetect profiles. Scripts cover MetaMask setup, Uniswap, OpenSea, Binance, Coinbase, Phantom, and DeFi research workflows.",
    "Legitimate applications include UI QA testing of Web3 interfaces, session research across isolated wallet profiles, testnet workflow validation, and browser fingerprint testing on blockchain applications. All scripts connect via Playwright CDP.",
    "These demos help developers build and test Web3 automation pipelines in controlled environments. Source code is MIT licensed on GitHub. Users are responsible for compliance with financial regulations, platform terms of service, and applicable laws in their jurisdiction.",
    "Click any tool below for its dedicated page, Playwright CDP source, and related Web3 demos. View the full catalog or homepage for all one hundred twenty SDK scripts.",
  ],
  seo: [
    "SEO and search automation tools cover Google, Bing, DuckDuckGo, Google Maps, Yelp, Trustpilot, and related search interfaces. Scripts test SERP rendering, local listing navigation, and search warmup flows using isolated Multilogin X browser profiles.",
    "Legitimate use cases include search UI QA testing, SERP display research across different fingerprints, validating proxy behavior on search platforms, and building reproducible browse sequences for session testing. Each demo uses Playwright CDP with Python.",
    "SEO researchers and QA engineers use these scripts to understand how antidetect profiles interact with search engines in controlled test environments. All tools are open source. Use only for legal research, QA, and browse workflows.",
    "Each search and SEO demo below links to its tool page and GitHub source. Explore the full SDK catalog or homepage to browse all Multilogin X automation categories.",
  ],
  checkout: [
    "Checkout and payment flow tools automate ticket platforms, sneaker releases, Stripe checkout QA, PayPal sessions, and payment gateway testing with isolated antidetect browser profiles. These scripts validate form flows, session handling, and page rendering.",
    "Legitimate applications include payment UI QA testing, checkout flow research in staging environments, session persistence validation, and prototyping e-commerce integrations. All demos connect to Multilogin X via Playwright CDP.",
    "Developers use checkout category scripts to test payment workflows without cross-contaminating browser sessions. Each script is open source under MIT license. Use only for legal QA, testing, and research purposes in compliance with platform terms and applicable laws.",
    "Browse payment and checkout demos below with links to individual tool pages and source code. Return to the full catalog or homepage for all SDK tools.",
  ],
  crawler: [
    "Crawler and data collection tools demonstrate browser-based page navigation, structured extraction, and anti-detection research using Multilogin X profiles. Scripts cover Cloudflare Turnstile, DataDome templates, reCAPTCHA probing, and general crawl patterns.",
    "Legitimate use cases include QA testing of crawl-resistant pages, researching browser fingerprint behavior, validating proxy configurations against protected endpoints, and building reproducible data collection workflows for internal research. All scripts use Playwright CDP.",
    "These demos are intended for developers studying browser automation patterns in controlled environments. Source code is MIT licensed on GitHub. Users must comply with website terms of service, robots directives, and applicable laws.",
    "Select a crawler demo below to open its tool page and GitHub source. View the complete catalog or homepage to explore all Multilogin X SDK categories.",
  ],
  migrate: [
    "Profile migration tools help transfer browser profiles and sessions between antidetect browser platforms. Scripts include AdsPower to Multilogin migration, AdsPower export, Incogniton sync, and related profile transfer workflows using Playwright automation.",
    "Legitimate applications include migrating test profiles between platforms during vendor evaluation, QA validation of profile import/export pipelines, session research during platform transitions, and building internal migration tooling. All demos are open source Python scripts.",
    "Migration workflows are commonly used when teams standardize on Multilogin X for development and testing environments. Each script demonstrates CDP patterns for profile management. Users are responsible for complying with platform terms and applicable data protection laws.",
    "Each migration tool below links to its demo page and open-source GitHub file. Browse the full tool catalog or homepage for all SDK automation scripts.",
  ],
  media: [
    "Media and streaming automation tools cover YouTube, Twitch, TikTok Live, Spotify, SoundCloud, Netflix, and other content platforms. Scripts navigate media interfaces, test session behavior, and validate streaming page rendering with isolated antidetect profiles.",
    "Legitimate use cases include media platform UI QA testing, session research for streaming applications, browse warmup for content sites, and prototyping automation against media dashboards. All scripts use Playwright CDP with Multilogin X.",
    "Developers and QA engineers use media category demos to build reproducible test environments across multiple browser profiles. All source is MIT licensed on GitHub. Use only for legal browse, warmup, and QA workflows.",
    "Stream and media demos are listed below with links to tool pages and GitHub source. Explore the full catalog or return home to browse all fourteen categories.",
  ],
  gaming: [
    "Gaming platform browser tools automate Steam store navigation, Roblox discovery, and gaming site research using Multilogin X antidetect profiles. Scripts demonstrate session management, page navigation, and UI testing patterns for gaming platforms.",
    "Legitimate applications include gaming storefront QA testing, session validation across isolated profiles, browse research for platform integrations, and prototyping automation in development environments. Each demo connects via Playwright CDP.",
    "These open-source scripts help developers test gaming-related browser workflows without sharing fingerprints between sessions. All code is MIT licensed. Users must comply with gaming platform terms of service and applicable laws.",
    "Gaming platform demos below link to individual tool pages and GitHub source files. Visit the full SDK catalog or homepage for all automation tools.",
  ],
  work: [
    "Productivity and work automation tools cover Upwork, Indeed, Fiverr, Glassdoor, Slack, Outlook, Notion, Canva, Zoom, Microsoft Teams, and other workplace platforms. Scripts navigate professional interfaces with isolated Multilogin X browser profiles.",
    "Legitimate use cases include workplace platform UI QA testing, session research for SaaS integrations, browse warmup for professional tools, and validating automation workflows in staging environments. All demos use Playwright CDP with Python.",
    "Teams use work category scripts to prototype internal automation and test multi-profile workflows for legitimate business applications. Source code is open source under MIT license. Comply with platform terms of service and applicable laws.",
    "Productivity and work tools are listed below with direct links to demo pages and GitHub. Browse the complete catalog or homepage for all one hundred twenty SDK scripts.",
  ],
  ads: [
    "Advertising platform tools automate Google Ads and Meta Ads dashboard navigation, campaign interface research, and ad platform session testing with antidetect browser profiles. Scripts demonstrate Playwright CDP patterns for advertising platform workflows.",
    "Legitimate applications include ad dashboard QA testing, session validation for marketing tool integrations, UI research across isolated profiles, and prototyping automation in controlled test accounts. All demos are open source Python scripts.",
    "Marketing engineers and QA teams use these tools to build reproducible test environments for advertising platform automation. MIT licensed on GitHub. Use only for legal QA, research, and browse workflows in compliance with platform policies.",
    "Advertising demos below link to tool pages and GitHub source. Explore the full Multilogin X SDK catalog or homepage for all categories.",
  ],
  learn: [
    "E-learning and education platform tools cover Coursera, Udemy, Stack Overflow, and related learning interfaces. Scripts navigate course pages, forum layouts, and education dashboards using isolated Multilogin X antidetect profiles.",
    "Legitimate use cases include education platform UI QA testing, session research for e-learning integrations, browse warmup for course sites, and validating multi-profile test environments. All scripts connect via Playwright CDP.",
    "Developers use learning category demos to prototype automation for education technology workflows in controlled settings. All source is MIT licensed on GitHub. Users are responsible for complying with platform terms of service and applicable laws.",
    "E-learning tools below link to individual demo pages and GitHub source. Return to the full catalog or homepage to browse all SDK automation categories.",
  ],
};
