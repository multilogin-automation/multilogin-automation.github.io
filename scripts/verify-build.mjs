import { readFileSync, existsSync } from "node:fs";

const catalog = JSON.parse(readFileSync("src/data/catalog.json", "utf8"));
const html = readFileSync("dist/index.html", "utf8");

let failed = 0;
const pass = (msg) => console.log("PASS", msg);
const fail = (msg) => {
  console.log("FAIL", msg);
  failed++;
};

console.log("=== CATALOG ===");
if (catalog.length === 120) pass("120 tools in catalog");
else fail(`Expected 120 tools, got ${catalog.length}`);

const spots = [
  { num: "001", name: "List Profiles", slug: "001-list-profiles" },
  { num: "026", name: "Google Search Warmup", slug: "026-google-search-warmup" },
  { num: "054", name: "Instagram Warmup", slug: "054-instagram-warmup" },
  { num: "100", name: "Google Scholar", slug: "100-google-scholar" },
  { num: "120", name: "Hacker News", slug: "120-hacker-news" },
];

for (const s of spots) {
  const t = catalog.find((x) => x.number === s.num);
  const toolPage = `dist/tools/${s.slug}/index.html`;
  if (t && t.name === s.name && existsSync(toolPage)) {
    pass(`#${s.num} ${s.name} page exists`);
  } else {
    fail(`#${s.num} ${s.name}`);
  }
}

const cardCount = (html.match(/class="tool-card/g) || []).length;
if (cardCount === 120) pass("120 tool cards on homepage");
else fail(`Expected 120 tool cards, got ${cardCount}`);

console.log("\n=== SEO (homepage) ===");
const seoChecks = [
  ["title pattern", /<title>Multilogin X Automation SDK \| 120 Antidetect Browser Tools<\/title>/],
  ["description", /name="description" content="/],
  ["og:title", /property="og:title"/],
  ["og:description", /property="og:description"/],
  ["og:url", /property="og:url"/],
  ["og:image", /property="og:image"/],
  ["canonical", /rel="canonical" href="https:\/\/multilogin-automation\.github\.io\/"/],
  ["lang=en", /<html lang="en">/],
  ["json-ld WebSite", /"@type":"WebSite"/],
  ["json-ld ItemList", /"@type":"ItemList"/],
  ["keywords", /name="keywords"/],
  ["twitter:card", /twitter:card/],
];

for (const [name, re] of seoChecks) {
  if (html.match(re)) pass(name);
  else fail(name);
}

console.log("\n=== CONTENT & COPY ===");
const contentChecks = [
  ["Hero headline", "Multilogin X Automation SDK — 120 Antidetect Browser Tools"],
  ["Stats bar", "120 Tools · 14 Categories · Open Source · Playwright CDP"],
  ["FAQ section", 'id="faq"'],
  ["Browse Tools CTA", 'href="/tools"'],
  ["View source links", "View source"],
  ["Legal disclaimer", "Legal use only — browse, warmup, and QA workflows only."],
  ["catalog.json sync note", "catalog.json"],
  ["Sticky header", "sticky top-0"],
];

for (const [name, text] of contentChecks) {
  if (html.includes(text)) pass(name);
  else fail(name);
}

const visibleText = html
  .replace(/<script[\s\S]*?<\/script>/gi, "")
  .replace(/<style[\s\S]*?<\/style>/gi, "")
  .replace(/href="[^"]*"/gi, "")
  .replace(/<[^>]+>/g, " ");
const banned = [
  { word: /\bfake review\b/i, label: "fake review" },
  { word: /\bfraud\b/i, label: "fraud" },
  { word: /\bscam\b/i, label: "scam" },
  { word: /\bbot\b/i, label: "bot" },
];
for (const { word, label } of banned) {
  if (word.test(visibleText)) fail(`Banned word: ${label}`);
  else pass(`No "${label}" in UI`);
}

console.log("\n=== PAGES ===");
const pages = [
  "dist/index.html",
  "dist/tools/index.html",
  "dist/category/social/index.html",
  "dist/tools/001-list-profiles/index.html",
  "dist/docs/quick-start/index.html",
  "dist/faq/index.html",
  "dist/robots.txt",
  "dist/sitemap-index.xml",
];

const quickStart = readFileSync("dist/docs/quick-start/index.html", "utf8");
const faqPage = readFileSync("dist/faq/index.html", "utf8");
if (quickStart.includes("RUN-DEMOS.bat")) pass("Quick start: RUN-DEMOS.bat");
else fail("Quick start: RUN-DEMOS.bat");
if (quickStart.includes("copy-btn")) pass("Quick start: copy buttons");
else fail("Quick start: copy buttons");
if (faqPage.includes('"@type":"FAQPage"')) pass("FAQ JSON-LD");
else fail("FAQ JSON-LD");
if ((faqPage.match(/<dt/g) || []).length === 8) pass("FAQ: 8 questions");
else fail("FAQ question count");

for (const p of pages) {
  if (existsSync(p)) pass(p);
  else fail(`Missing ${p}`);
}

if (!html.includes("fetch(") && !html.includes("fetch-catalog")) {
  pass("No runtime catalog fetch");
} else {
  fail("Runtime catalog fetch in HTML");
}

console.log("\n=== TOOL PAGES ===");
const toolHtml = readFileSync("dist/tools/001-list-profiles/index.html", "utf8");
if (toolHtml.includes("List Profiles — Multilogin X Tool #001")) pass("Tool H1 pattern");
else fail("Tool H1 pattern");
if (toolHtml.includes("View Source on GitHub")) pass("View source CTA");
else fail("View source CTA");
if (toolHtml.includes("Back to Catalog")) pass("Back to catalog CTA");
else fail("Back to catalog CTA");
if (toolHtml.includes('"@type":"SoftwareApplication"')) pass("SoftwareApplication JSON-LD");
else fail("SoftwareApplication JSON-LD");
const metaDesc = toolHtml.match(/name="description" content="([^"]+)"/);
if (metaDesc) {
  const len = metaDesc[1].length;
  if (len >= 100 && len <= 165) pass(`Tool meta description (${len} chars)`);
  else fail(`Tool meta description length: ${len}`);
} else fail("Tool meta description missing");

console.log(`\n=== RESULT: ${failed === 0 ? "ALL PASS" : failed + " FAILED"} ===`);
process.exit(failed > 0 ? 1 : 0);
