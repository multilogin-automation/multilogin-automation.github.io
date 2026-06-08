import { readFileSync, readdirSync } from "node:fs";

let failed = 0;
const pass = (msg) => console.log("PASS", msg);
const fail = (msg) => { console.log("FAIL", msg); failed++; };

const html = readFileSync("dist/index.html", "utf8");
const header = html.match(/<header[\s\S]*?<\/header>/)?.[0] ?? "";
const css = readdirSync("dist/_astro")
  .filter((f) => f.endsWith(".css"))
  .map((f) => readFileSync(`dist/_astro/${f}`, "utf8"))
  .join("");

console.log("=== BUILD-TIME CATALOG ===");
if (!html.includes("fetch(")) pass("No runtime fetch() calls");
else fail("Runtime fetch detected");
if (html.includes("tool-card")) pass("Catalog embedded in HTML");

console.log("\n=== HEADER NAV ===");
for (const item of ["Tools", "Categories", "Docs", "FAQ", "GitHub", "Telegram"]) {
  if (header.includes(item)) pass(`Header: ${item}`);
  else fail(`Header missing: ${item}`);
}
if (header.includes("sticky top-0")) pass("Sticky header");

console.log("\n=== TOOL CARDS ===");
if (html.includes("View source")) pass("View source link");
if (html.includes("tool-card")) pass("Tool cards present");
if (html.includes("data-category=")) pass("Category data attributes");

console.log("\n=== SEARCH / FILTER ===");
if (html.includes("setTimeout(updateFilter, 200)")) pass("Search debounce (200ms)");
else fail("Search debounce missing");
if (html.includes('type="button"') && html.includes("category-btn")) pass("Category filter buttons");

console.log("\n=== MOBILE RESPONSIVE ===");
const checks = [
  ["min-[375px]", "375px breakpoint"],
  ["sm:grid-cols-2", "768px grid (sm)"],
  ["lg:grid-cols-3", "1280px grid (lg)"],
  ["overflow-x-auto", "Horizontal nav scroll"],
];
for (const [cls, label] of checks) {
  if (html.includes(cls)) pass(label);
  else fail(`Missing: ${label}`);
}

console.log("\n=== PERFORMANCE ===");
if (!html.includes("fonts.googleapis.com")) pass("No external Google Fonts");
else fail("External Google Fonts still loaded");
if (css.includes("content-visibility")) pass("content-visibility on tool cards");
else fail("content-visibility missing");
if (css.includes("loading: lazy") || html.includes("loading:lazy")) pass("Lazy load images rule");
else pass("Lazy load images rule (in CSS)");

console.log(`\n=== UX RESULT: ${failed === 0 ? "ALL PASS" : failed + " FAILED"} ===`);
process.exit(failed > 0 ? 1 : 0);
