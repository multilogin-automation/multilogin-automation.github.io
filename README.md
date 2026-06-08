# multilogin-automation.github.io

Landing page & tool catalog for [Multilogin X Automation SDK](https://github.com/multilogin-automation/multilogin-automation).

**Live:** https://multilogin-automation.github.io

## Stack

- [Astro](https://astro.build) static export
- Tailwind CSS
- Catalog fetched at build time from the SDK repo

## Development

```bash
npm install
npm run dev      # fetch catalog + dev server
npm run build    # fetch catalog + static build → dist/
npm run preview  # preview production build
```

## Data source

**This repo is frontend-only.** No Python SDK, no `demos/*.py`, no local `catalog.json` in git.

At build time, `scripts/fetch-catalog.mjs` downloads:

```
https://raw.githubusercontent.com/multilogin-automation/multilogin-automation/main/demos/catalog.json
```

When new tools are added to the SDK repo, push to `main` here (or re-run the deploy workflow) to refresh the catalog.

## Deploy

GitHub Actions (`.github/workflows/deploy.yml`) builds and deploys `dist/` to GitHub Pages on every push to `main`.

**Repo settings:** Settings → Pages → Source: **GitHub Actions**.

## Links

- SDK: https://github.com/multilogin-automation/multilogin-automation
- Telegram: https://t.me/Multilogin_Scripts_Bot
- Multilogin affiliate (SAAS50): https://multilogin.com?a_aid=saas
