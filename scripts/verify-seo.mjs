import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

let failed = 0;
const pass = (msg) => console.log("PASS", msg);
const fail = (msg) => { console.log("FAIL", msg); failed++; };

const SITE = "https://multilogin-automation.github.io";

function walkHtml(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) walkHtml(p, files);
    else if (entry === "index.html") files.push(p);
  }
  return files;
}

function extract(html, re) {
  const m = html.match(re);
  return m ? m[1] : null;
}

console.log("=== ROBOTS.TXT ===");
const robots = readFileSync("dist/robots.txt", "utf8");
if (robots.includes("Allow: /")) pass("robots.txt Allow: /");
else fail("robots.txt Allow");
if (robots.includes(`${SITE}/sitemap-index.xml`)) pass("robots.txt sitemap URL");
else fail("robots.txt sitemap URL");

console.log("\n=== SITEMAP URL COUNTS ===");
const sitemap = readFileSync("dist/sitemap-0.xml", "utf8");
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const counts = {
  total: urls.length,
  home: urls.filter((u) => u === `${SITE}/` || u === SITE).length,
  toolsIndex: urls.filter((u) => u === `${SITE}/tools`).length,
  toolPages: urls.filter((u) => /\/tools\/\d{3}-/.test(u)).length,
  categories: urls.filter((u) => /\/category\//.test(u)).length,
  docs: urls.filter((u) => u.includes("/docs/")).length,
  faq: urls.filter((u) => u === `${SITE}/faq`).length,
};

console.log(`  Total URLs: ${counts.total}`);
console.log(`  Home: ${counts.home}`);
console.log(`  /tools: ${counts.toolsIndex}`);
console.log(`  Tool pages: ${counts.toolPages}`);
console.log(`  Categories: ${counts.categories}`);
console.log(`  Docs: ${counts.docs}`);
console.log(`  /faq: ${counts.faq}`);

if (counts.total >= 138) pass(`Sitemap total >= 138 (${counts.total})`);
else fail(`Sitemap total ${counts.total}`);
if (counts.home === 1) pass("Sitemap: home");
else fail("Sitemap: home");
if (counts.toolsIndex === 1) pass("Sitemap: /tools");
else fail("Sitemap: /tools");
if (counts.toolPages === 120) pass("Sitemap: 120 tool pages");
else fail(`Sitemap tool pages: ${counts.toolPages}`);
if (counts.categories === 14) pass("Sitemap: 14 categories");
else fail(`Sitemap categories: ${counts.categories}`);
if (counts.docs >= 1) pass("Sitemap: /docs");
else fail("Sitemap: /docs");
if (counts.faq === 1) pass("Sitemap: /faq");
else fail("Sitemap: /faq");

console.log("\n=== PER-PAGE META (sample + all pages) ===");
const htmlFiles = walkHtml("dist");
const titles = new Map();
const descriptions = new Map();
let metaFail = 0;

for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  const title = extract(html, /<title>([^<]+)<\/title>/);
  const desc = extract(html, /name="description" content="([^"]+)"/);
  const canonical = extract(html, /rel="canonical" href="([^"]+)"/);
  const ogTitle = extract(html, /property="og:title" content="([^"]+)"/);
  const ogImage = extract(html, /property="og:image" content="([^"]+)"/);
  const ogUrl = extract(html, /property="og:url" content="([^"]+)"/);
  const twitterCard = html.includes('name="twitter:card" content="summary_large_image"');

  if (!title || !desc || !canonical) metaFail++;
  if (!canonical?.startsWith(SITE)) metaFail++;
  if (!ogTitle || !ogImage || !ogUrl) metaFail++;
  if (!twitterCard) metaFail++;
  if (canonical !== ogUrl) metaFail++;

  if (titles.has(title)) titles.set(title, titles.get(title) + 1);
  else titles.set(title, 1);
  if (descriptions.has(desc)) descriptions.set(desc, descriptions.get(desc) + 1);
  else descriptions.set(desc, 1);
}

if (metaFail === 0) pass(`All ${htmlFiles.length} pages have full meta`);
else fail(`${metaFail} pages missing meta fields`);

const dupTitles = [...titles.entries()].filter(([, c]) => c > 1);
const dupDescs = [...descriptions.entries()].filter(([, c]) => c > 1);
if (dupTitles.length === 0) pass("No duplicate titles");
else fail(`Duplicate titles: ${dupTitles.map(([t]) => t).join("; ")}`);
if (dupDescs.length === 0) pass("No duplicate descriptions");
else fail(`Duplicate descriptions: ${dupDescs.length}`);

console.log("\n=== JSON-LD ===");
const home = readFileSync("dist/index.html", "utf8");
const toolsIdx = readFileSync("dist/tools/index.html", "utf8");
const faqPage = readFileSync("dist/faq/index.html", "utf8");

if (home.includes('"@type":"WebSite"')) pass("Home: WebSite schema");
else fail("Home: WebSite schema");
if (home.includes('"@type":"ItemList"')) pass("Home: ItemList schema");
else fail("Home: ItemList schema");
const homeListCount = (home.match(/"@type":"ListItem"/g) || []).length;
if (homeListCount === 120) pass(`Home ItemList: 120 items`);
else fail(`Home ItemList items: ${homeListCount}`);

const toolsListCount = (toolsIdx.match(/"@type":"ListItem"/g) || []).length;
if (toolsIdx.includes('"@type":"ItemList"')) pass("/tools: ItemList schema");
else fail("/tools: ItemList schema");
if (toolsListCount === 120) pass(`/tools ItemList: 120 items`);
else fail(`/tools ItemList items: ${toolsListCount}`);

if (faqPage.includes('"@type":"FAQPage"')) pass("/faq: FAQPage schema");
else fail("/faq: FAQPage schema");

console.log("\n=== OG IMAGE ===");
if (existsSync("dist/og-image.svg")) pass("og-image.svg in dist");
else fail("og-image.svg missing");
const sampleOg = extract(home, /property="og:image" content="([^"]+)"/);
if (sampleOg?.includes("og-image")) pass("og:image URL set");
else fail("og:image URL");
if (home.includes("og:image:width") && home.includes("og:image:alt")) pass("og:image dimensions + alt");
else fail("og:image dimensions/alt");

console.log("\n=== INTERNAL LINKING (homepage) ===");
if (home.includes('href="/tools/')) pass("Home → tool pages");
else fail("Home → tool pages");
if (home.includes('href="/category/')) pass("Home → category pages");
else fail("Home → category pages");
if (home.includes("github.com/multilogin-automation/multilogin-automation")) pass("Home → GitHub source");
else fail("Home → GitHub source");

const toolPage = readFileSync("dist/tools/001-list-profiles/index.html", "utf8");
if (toolPage.includes('href="/category/')) pass("Tool → category");
else fail("Tool → category");
if (toolPage.includes("github.com/multilogin-automation")) pass("Tool → GitHub source");
else fail("Tool → GitHub source");
if (toolPage.includes('href="/tools"')) pass("Tool → catalog");
else fail("Tool → catalog");

console.log(`\n=== SEO RESULT: ${failed === 0 ? "ALL PASS" : failed + " FAILED"} ===`);
process.exit(failed > 0 ? 1 : 0);
