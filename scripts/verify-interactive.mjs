import { readFileSync } from "node:fs";

const catalog = JSON.parse(readFileSync("src/data/catalog.json", "utf8"));
const html = readFileSync("dist/index.html", "utf8");

const cardRe =
  /data-category="([^"]+)" data-name="([^"]+)" data-description="([^"]+)"/g;
const cards = [];
let m;
while ((m = cardRe.exec(html)) !== null) {
  cards.push({ category: m[1], name: m[2], description: m[3] });
}

let failed = 0;
const pass = (msg) => console.log("PASS", msg);
const fail = (msg) => {
  console.log("FAIL", msg);
  failed++;
};

function filterCards(category, query) {
  const q = query.trim().toLowerCase();
  return cards.filter((c) => {
    const matchCat = category === "all" || c.category === category;
    const matchSearch = !q || c.name.includes(q) || c.description.includes(q);
    return matchCat && matchSearch;
  });
}

console.log("=== FILTER / SEARCH ===");

const socialCount = catalog.filter((t) => t.category === "social").length;
const filteredSocial = filterCards("social", "").length;
if (filteredSocial === socialCount) pass(`Filter social: ${socialCount}`);
else fail(`Filter social: expected ${socialCount}, got ${filteredSocial}`);

const instagram = filterCards("all", "Instagram");
if (instagram.length >= 1) pass(`Search Instagram: ${instagram.length} results`);
else fail("Search Instagram: 0 results");

const stripe = filterCards("all", "Stripe");
if (stripe.length >= 1) pass(`Search Stripe: ${stripe.length} results`);
else fail("Search Stripe: 0 results");

const uniswap = filterCards("all", "Uniswap");
if (uniswap.length >= 1) pass(`Search Uniswap: ${uniswap.length} results`);
else fail("Search Uniswap: 0 results");

const all = filterCards("all", "");
if (all.length === 120) pass("Filter all: 120");
else fail(`Filter all: ${all.length}`);

console.log("\n=== GITHUB URL LIVE CHECK (spot) ===");
const spotNums = ["001", "026", "054", "100", "120"];
for (const num of spotNums) {
  const t = catalog.find((x) => x.number === num);
  const raw = t.github_url
    .replace("github.com", "raw.githubusercontent.com")
    .replace("/blob/", "/");
  try {
    const res = await fetch(raw, { method: "HEAD", redirect: "follow" });
    if (res.ok) pass(`#${num} ${t.name} (${res.status})`);
    else fail(`#${num} ${t.name} HTTP ${res.status}`);
  } catch (e) {
    fail(`#${num} ${t.name}: ${e.message}`);
  }
}

console.log("\n=== RESPONSIVE CLASSES ===");
const responsive = ["sm:px-6", "sm:grid-cols-2", "lg:grid-cols-3", "lg:flex-row", "overflow-x-auto", "min-[375px]"];
for (const cls of responsive) {
  if (html.includes(cls)) pass(`Responsive class: ${cls}`);
  else fail(`Missing: ${cls}`);
}

console.log(`\n=== RESULT: ${failed === 0 ? "ALL PASS" : failed + " FAILED"} ===`);
process.exit(failed > 0 ? 1 : 0);
