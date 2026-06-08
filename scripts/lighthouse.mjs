import { spawn } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";

const URL = "http://127.0.0.1:4321/";
const OUT = "lighthouse-report.json";

async function checkServer() {
  try {
    const res = await fetch(URL);
    return res.ok;
  } catch {
    return false;
  }
}

if (!(await checkServer())) {
  console.error("Preview server not running. Start with: npm run preview -- --host 127.0.0.1 --port 4321");
  process.exit(1);
}

const args = [
  URL,
  "--only-categories=performance,seo",
  "--output=json",
  `--output-path=${OUT}`,
  "--chrome-flags=--headless --no-sandbox",
  "--quiet",
];

await new Promise((resolve, reject) => {
  const child = spawn("npx", ["lighthouse", ...args], {
    shell: true,
    stdio: "inherit",
  });
  child.on("close", (code) => (code === 0 ? resolve() : reject(new Error(`lighthouse exit ${code}`))));
});

if (!existsSync(OUT)) {
  console.error("Lighthouse report not generated");
  process.exit(1);
}

const report = JSON.parse(readFileSync(OUT, "utf8"));
const perf = Math.round((report.categories.performance?.score ?? 0) * 100);
const seo = Math.round((report.categories.seo?.score ?? 0) * 100);

console.log("\n=== LIGHTHOUSE SCORES ===");
console.log(`Performance: ${perf}`);
console.log(`SEO:         ${seo}`);

let failed = 0;
if (perf >= 90) console.log("PASS Performance >= 90");
else { console.log(`FAIL Performance ${perf} < 90`); failed++; }
if (seo >= 90) console.log("PASS SEO >= 90");
else { console.log(`FAIL SEO ${seo} < 90`); failed++; }

process.exit(failed > 0 ? 1 : 0);
