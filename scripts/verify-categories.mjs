import { readFileSync, existsSync, readdirSync } from "node:fs";

const catalog = JSON.parse(readFileSync("src/data/catalog.json", "utf8"));

const expected = [
  "core", "warmup", "social", "shop", "crypto", "seo", "checkout",
  "crawler", "migrate", "media", "gaming", "work", "ads", "learn",
];

let failed = 0;
const pass = (msg) => console.log("PASS", msg);
const fail = (msg) => { console.log("FAIL", msg); failed++; };

console.log("=== CATEGORY PAGES ===\n");

const counts = {};
for (const t of catalog) {
  counts[t.category] = (counts[t.category] || 0) + 1;
}

let total = 0;
for (const slug of expected) {
  const count = counts[slug] || 0;
  total += count;
  const page = `dist/category/${slug}/index.html`;
  if (existsSync(page)) {
    const html = readFileSync(page, "utf8");
    const cards = (html.match(/View tool page/g) || []).length;
    if (cards === count) pass(`/category/${slug}: ${count} tools (${cards} links)`);
    else fail(`/category/${slug}: expected ${count} tool links, got ${cards}`);
    if (html.includes(" Automation Tools</h1>") || html.includes(" Automation Tools<"))
      pass(`/category/${slug}: H1 pattern`);
    else fail(`/category/${slug}: H1 pattern`);
  } else {
    fail(`Missing ${page}`);
  }
}

console.log(`\nTotal tools across categories: ${total}`);
if (total === 120) pass("Category sum = 120");
else fail(`Category sum = ${total}, expected 120`);

if (expected.length === 14) pass("14 category slugs defined");
else fail(`Expected 14 categories, got ${expected.length}`);

const sitemap = readFileSync("dist/sitemap-0.xml", "utf8");
const catUrls = (sitemap.match(/\/category\//g) || []).length;
if (catUrls === 14) pass("Sitemap has 14 category URLs");
else fail(`Sitemap category URLs: ${catUrls}`);

console.log(`\n=== RESULT: ${failed === 0 ? "ALL PASS" : failed + " FAILED"} ===`);
process.exit(failed > 0 ? 1 : 0);
