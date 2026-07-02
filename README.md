# Pynest — Luxury Villas & Private Retreats, Pondicherry

Production static site for [pynest.in](https://pynest.in), deployed via GitHub Pages.
No build tools, no npm, no backend — plain HTML/CSS/JS.

## Status

- **Phase 1 — Homepage:** ✅ Live, untouched, treated as final (`index.html`).
- **Phase 2 — Site structure:** 🚧 In progress. This stage adds the shared
  component system and the first inner page (`/about/`).

## How pages are built

Every inner page (everything except `index.html`, which stays fully
self-contained) follows this pattern:

```html
<body data-nav-key="about">
  <div id="site-social-dock"></div>
  <div id="site-header"></div>

  <main id="main-content">
    <!-- page content -->
  </main>

  <div id="site-footer"></div>
  <script src="/assets/js/include.js"></script>
</body>
```

`/assets/js/include.js` fetches `/components/navbar.html`,
`/components/footer.html`, and `/components/social-dock.html` and injects
them into the placeholder `<div>`s above. `data-nav-key` on `<body>`
auto-highlights the matching link in the navbar.

Because all component/asset paths are **absolute** (start with `/`), this
works identically no matter how deep a page lives
(e.g. `/villas/private-pool-villas/`).

## Design system

All shared tokens (colors, fonts, spacing, shadows) and shared components
(nav, footer, buttons, social dock, scroll-reveal) live in:

- `assets/css/base.css` — extracted verbatim from the homepage. Do not
  redesign; only extend.
- `assets/css/inner-page.css` — new layout patterns for inner pages
  (page hero, breadcrumb, content prose, value/team grids, CTA band),
  built entirely from the same tokens.

`index.html` keeps its own inline `<style>`/`<script>` and is not wired
into this system — it is treated as final, production-approved.

## Folder structure

```
/
├── index.html              ← homepage (final, do not touch)
├── 404.html
├── robots.txt
├── sitemap.xml
├── CNAME
├── manifest.webmanifest
├── browserconfig.xml
├── assets/
│   ├── css/                ← base.css, inner-page.css
│   ├── js/                 ← include.js
│   ├── fonts/
│   ├── icons/
│   └── images/
│       ├── villas/ destinations/ blog/ testimonials/ gallery/ team/ brand/ og/
├── components/              ← navbar.html, footer.html, social-dock.html
├── about/                   ← ✅ built (sample pattern page)
├── villas/ villa-details/ destinations/ experiences/ blog/ faq/
├── privacy-policy/ cancellation-policy/ terms-of-use/
├── careers/ become-host/ partner/ wishlist/ search/ booking/
└── contact/
```

Empty page folders are scaffolded and ready for content in the next
stages — no restructuring will be needed as they fill in.

## Before deploying

1. Add the real logo file at `assets/images/brand/pynestlogo.png`
   (inner pages reference it there; the homepage still uses its own
   `/pynestlogo.png` at the repo root — keep both in sync).
2. Add `favicon.ico` and `apple-touch-icon.png` at the repo root.
3. Replace Unsplash placeholder imagery on the About page with real
   Pynest photography once available.

## Roadmap

See project brief — Phases 3–14 (villa listings, details, search/filters,
booking engine, dashboards, CMS, AI concierge, native apps) will be added
incrementally without requiring a rebuild of this foundation.
