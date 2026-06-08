import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

const catalog = JSON.parse(readFileSync("src/data/catalog.json", "utf8"));
const html = readFileSync("dist/index.html", "utf8");
const workflow = readFileSync(".github/workflows/deploy.yml", "utf8");
const astroConfig = readFileSync("astro.config.mjs", "utf8");

let failed = 0;
const pass = (msg) => console.log("PASS", msg);
const fail = (msg) => {
  console.log("FAIL", msg);
  failed++;
};

// --- 120 tools + github_url in homepage ---
console.log("=== 120 TOOLS + GITHUB URLS ===");
if (catalog.length === 120) pass("catalog.json has 120 tools");
else fail(`catalog count: ${catalog.length}`);

let missingUrls = 0;
for (const t of catalog) {
  if (!html.includes(t.github_url)) missingUrls++;
}
if (missingUrls === 0) pass("All 120 github_url present on homepage");
else fail(`${missingUrls} github_url missing from homepage`);

const cardCount = (html.match(/class="tool-card/g) || []).length;
if (cardCount === 120) pass("120 tool cards rendered");
else fail(`tool cards: ${cardCount}`);

function countToolPages(dir) {
  if (!existsSync(dir)) return 0;
  return readdirSync(dir, { withFileTypes: true }).filter((d) => d.isDirectory()).length;
}
const toolPageCount = countToolPages("dist/tools");
if (toolPageCount === 120) pass("120 tool detail pages built");
else fail(`tool pages: ${toolPageCount}`);

// --- CTA links ---
console.log("\n=== CTA LINKS ===");
const ctas = [
  ["GitHub SDK", "https://github.com/multilogin-automation/multilogin-automation"],
  ["Telegram", "https://t.me/Multilogin_Scripts_Bot"],
  ["Multilogin affiliate", "https://multilogin.com?a_aid=saas"],
  ["Browse Tools", 'href="/tools"'],
  ["View on GitHub", "github.com/multilogin-automation/multilogin-automation"],
];
for (const [label, href] of ctas) {
  if (html.includes(href)) pass(label);
  else fail(label);
}

// --- Mobile ---
console.log("\n=== MOBILE ===");
if (html.includes('name="viewport" content="width=device-width')) pass("viewport meta");
else fail("viewport meta");
const mobileClasses = ["sm:px-6", "sm:grid-cols-2", "lg:grid-cols-3", "overflow-x-auto", "min-[375px]"];
for (const cls of mobileClasses) {
  if (html.includes(cls)) pass(`responsive: ${cls}`);
  else fail(`missing: ${cls}`);
}

// --- SEO files ---
console.log("\n=== SEO FILES ===");
if (existsSync("dist/robots.txt")) {
  const robots = readFileSync("dist/robots.txt", "utf8");
  if (robots.includes("Sitemap:")) pass("robots.txt + Sitemap directive");
  else fail("robots.txt missing Sitemap");
} else fail("dist/robots.txt");

if (existsSync("dist/sitemap-index.xml")) pass("sitemap-index.xml");
else fail("sitemap-index.xml");

if (existsSync("dist/sitemap-0.xml")) {
  const sitemap = readFileSync("dist/sitemap-0.xml", "utf8");
  const urlCount = (sitemap.match(/<loc>/g) || []).length;
  const toolUrls = (sitemap.match(/\/tools\/\d{3}-/g) || []).length;
  if (urlCount >= 138) pass(`sitemap-0.xml has ${urlCount} URLs`);
  else fail(`sitemap URLs: ${urlCount} (expected >=138)`);
  if (toolUrls === 120) pass(`sitemap includes 120 tool URLs`);
  else fail(`sitemap tool URLs: ${toolUrls} (expected 120)`);
} else fail("sitemap-0.xml");

// --- JSON-LD ---
console.log("\n=== JSON-LD ===");
if (html.includes('"@type":"WebSite"')) pass("WebSite schema");
else fail("WebSite schema");
if (html.includes('"@type":"ItemList"')) pass("ItemList schema");
else fail("ItemList schema");

const toolHtml = readFileSync("dist/tools/001-list-profiles/index.html", "utf8");
if (toolHtml.includes('"@type":"SoftwareApplication"')) pass("SoftwareApplication on tool page");
else fail("SoftwareApplication on tool page");

// --- Deploy workflow ---
console.log("\n=== GITHUB PAGES WORKFLOW ===");
const wfChecks = [
  ["trigger: push main", /branches:\s*\[main\]/],
  ["npm ci", /npm ci/],
  ["npm run build", /npm run build/],
  ["upload-pages-artifact", /upload-pages-artifact/],
  ["deploy-pages", /deploy-pages/],
  ["artifact path: dist", /path:\s*dist/],
  ["pages permissions", /pages:\s*write/],
];
for (const [label, re] of wfChecks) {
  if (workflow.match(re)) pass(label);
  else fail(label);
}

if (astroConfig.includes("multilogin-automation.github.io") && !astroConfig.includes("base:")) {
  pass("site URL set, no custom base path (user site /)");
} else if (astroConfig.includes('base: "/"') || !astroConfig.includes("base:")) {
  pass("base path OK for user site");
} else {
  fail("base path may be wrong for GitHub Pages user site");
}

// --- Preview server (optional — run `npm run preview` first) ---
console.log("\n=== PREVIEW SERVER ===");
try {
  const res = await fetch("http://127.0.0.1:4321/", { signal: AbortSignal.timeout(3000) });
  if (res.ok) {
    const body = await res.text();
    pass(`preview HTTP ${res.status} (${body.length} bytes)`);
    if (body.includes("tool-card")) pass("preview serves tool cards");
    else fail("preview missing tool cards");
  } else {
    fail(`preview HTTP ${res.status}`);
  }
} catch {
  console.log("SKIP preview (start with: npm run preview -- --host 127.0.0.1 --port 4321)");
}

console.log(`\n=== FINAL: ${failed === 0 ? "ALL PASS" : failed + " FAILED"} ===`);
process.exit(failed > 0 ? 1 : 0);
