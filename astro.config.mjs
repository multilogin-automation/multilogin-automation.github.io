import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://multilogin-automation.github.io",
  output: "static",
  trailingSlash: "never",
  integrations: [tailwind(), sitemap()],
});
