# VRArena Loyalty — B2B Landing Site

B2B-сайт для продажи системы лояльности VRArena Loyalty: мобильные приложения для клиентов, приложение для операторов и веб-админка.

## Tech Stack

- **Framework**: [Astro 6](https://astro.build) (Static Site Generation)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com) via `@tailwindcss/vite`
- **Content**: Astro Content Collections (Markdown)
- **Hosting**: [Vercel](https://vercel.com) (`@astrojs/vercel` adapter)
- **SEO**: `@astrojs/sitemap`, Open Graph meta tags

## Architecture

```
src/
├── components/
│   ├── layout/          # Header (nav + lang switcher), Footer
│   ├── landing/         # Hero, Features, ProductDemo, HowItWorks, ContactForm
│   └── ui/              # Button (pill-shaped), Card, Section
├── content/
│   └── blog/            # Markdown articles organized by language
│       ├── en/
│       ├── ru/
│       └── ...          # es/, pt/, de/, zh/ when content is added
├── content.config.ts    # Content Collections schema
├── i18n/
│   ├── index.ts         # t(), getLangFromUrl(), getLocalizedPath()
│   ├── en.json          # English
│   ├── ru.json          # Russian
│   ├── es.json          # Spanish
│   ├── pt.json          # Portuguese
│   ├── de.json          # German
│   └── zh.json          # Chinese (Simplified)
├── layouts/
│   ├── BaseLayout.astro # HTML shell, <head>, fonts, OG tags
│   └── BlogLayout.astro # Article layout with back-link, date, author
├── pages/
│   ├── index.astro      # Redirect → /en/
│   └── [lang]/
│       ├── index.astro  # Landing page (all sections)
│       ├── blog/
│       │   ├── index.astro    # Blog listing
│       │   └── [slug].astro   # Single article
│       ├── privacy.astro
│       └── terms.astro
└── styles/
    └── global.css       # Tailwind import + CSS custom properties (design tokens)
```

### Design System

Dark theme based on [vr-arena.games](https://vr-arena.games) visual identity:

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg-base` | `#0f0f14` | Page background |
| `--color-bg-muted` | `#141420` | Elevated sections (Features, HowItWorks) |
| `--color-bg-surface` | `#1a1a2e` | Cards, forms, dropdowns |
| `--color-bg-dark` | `#0a0a0a` | Footer |
| `--color-cta` | `#0693e3` | Primary CTA buttons |
| `--color-accent` | `#9b51e0` | Purple accent |
| `--gradient-hero` | cyan → purple | Hero background |
| Button shape | `border-radius: 9999px` | Pill-shaped (matches vr-arena.games) |

### i18n

URL-based routing via `[lang]/` dynamic param:

- `/en/` — English (default)
- `/ru/` — Русский
- `/es/` — Espanol
- `/pt/` — Portugues
- `/de/` — Deutsch
- `/zh/` — 中文

Adding a new language:
1. Create `src/i18n/{code}.json` (copy structure from `en.json`)
2. Add entry to `languages` in `src/i18n/index.ts`
3. Add enum value to `lang` in `src/content.config.ts`
4. (Optional) Add blog content in `src/content/blog/{code}/`

### Blog

Articles are Markdown files in `src/content/blog/{lang}/`. Frontmatter schema:

```yaml
---
title: "Article Title"
description: "Short description for cards and meta"
pubDate: 2026-04-01
author: "Author Name"        # optional
image: "/images/article.jpg" # optional
lang: en                     # required: en|ru|es|pt|de|zh
tags: ["loyalty", "vr"]      # optional
---
```

## Commands

```sh
# Requires Node.js >= 22
export PATH="/opt/homebrew/bin:$PATH"  # macOS with Homebrew node

npm install          # Install dependencies
npm run dev          # Dev server at localhost:4321
npm run build        # Production build to ./dist/
npm run preview      # Preview production build
```

## Deployment

Configured for Vercel with `@astrojs/vercel` adapter (static output).

1. Connect repo to Vercel
2. Build command: `npm run build`
3. Output directory: `dist`
4. Set `SITE` env var if domain differs from `loyalty.vr-arena.games`

## TODO

- [ ] Add real product screenshots to ProductDemo section
- [ ] Integrate contact form with email service (Resend / SendGrid)
- [ ] Fill in Privacy Policy and Terms of Service content
- [ ] Add blog articles for all languages
- [ ] Configure custom domain on Vercel
