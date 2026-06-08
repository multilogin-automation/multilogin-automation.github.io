import type { Tool } from "../types";
import catalog from "../data/catalog.json";
import { sanitizeDisplay } from "./display";

export const tools = catalog as Tool[];

export function toolSlug(tool: Tool): string {
  const nameSlug = tool.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `${tool.number}-${nameSlug}`;
}

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => toolSlug(t) === slug);
}

export function getToolsByCategory(category: string): Tool[] {
  return tools.filter((t) => t.category === category);
}

export function getCategories(): {
  slug: string;
  label: string;
  count: number;
}[] {
  const map = new Map<string, string>();
  for (const t of tools) {
    if (!map.has(t.category)) map.set(t.category, t.category_label);
  }
  return [...map.entries()]
    .map(([slug, label]) => ({
      slug,
      label: sanitizeDisplay(label),
      count: tools.filter((t) => t.category === slug).length,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

export const categoryColors: Record<string, string> = {
  core: "bg-blue-500/15 text-blue-300 border-blue-500/30",
  warmup: "bg-orange-500/15 text-orange-300 border-orange-500/30",
  social: "bg-pink-500/15 text-pink-300 border-pink-500/30",
  shop: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  crypto: "bg-yellow-500/15 text-yellow-300 border-yellow-500/30",
  seo: "bg-purple-500/15 text-purple-300 border-purple-500/30",
  checkout: "bg-red-500/15 text-red-300 border-red-500/30",
  crawler: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
  migrate: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
  media: "bg-rose-500/15 text-rose-300 border-rose-500/30",
  gaming: "bg-lime-500/15 text-lime-300 border-lime-500/30",
  work: "bg-slate-400/15 text-slate-300 border-slate-400/30",
  ads: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  learn: "bg-teal-500/15 text-teal-300 border-teal-500/30",
};

export { categoryIntros } from "./category-content";

export function toolUseCases(tool: Tool): string[] {
  const label = sanitizeDisplay(tool.category_label).toLowerCase();
  return [
    `Use this ${label} demo for legitimate browser warmup, session QA, and structured browse workflows with isolated Multilogin X antidetect profiles.`,
    `The script connects via Playwright CDP (Python) and supports automation research, proxy validation, and reproducible profile testing.`,
    `Source code is MIT licensed on GitHub. Users must comply with platform terms of service and applicable laws.`,
  ];
}
