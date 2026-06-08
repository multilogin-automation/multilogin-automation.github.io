import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const CATALOG_URL =
  "https://raw.githubusercontent.com/multilogin-automation/multilogin-automation/main/demos/catalog.json";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, "..", "src", "data", "catalog.json");

async function fetchCatalog() {
  console.log(`Fetching catalog from ${CATALOG_URL}...`);

  const res = await fetch(CATALOG_URL);
  if (!res.ok) {
    throw new Error(`Failed to fetch catalog: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();

  if (!Array.isArray(data) || data.length === 0) {
    throw new Error("Catalog is empty or invalid");
  }

  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, JSON.stringify(data, null, 2) + "\n", "utf-8");

  console.log(`Cached ${data.length} tools → src/data/catalog.json`);
}

fetchCatalog().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
