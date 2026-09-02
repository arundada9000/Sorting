# EasySorting architecture

EasySorting is a static, dependency-free web application. It has no build
step, no framework, and no server-side code, so it deploys to any static host
and runs fully offline as a progressive web app (PWA).

## Overview

```
Browser request
   |
   v
Netlify edge        _redirects (clean URLs), _headers (security/cache)
   |
   v
Static files        *.html, *.css, *.js, images, manifest, service worker
   |
   v
Client runtime      vanilla JS: visualizer loop, heap tree, race, charts
```

## Page groups

### 1. Visualizer pages

One self-contained page per algorithm: bubble, selection, insertion, merge,
quick, heap, radix, shell. Each page contains:

- Its own copy of the sorting code and the animation loop.
- A language selector exposing code (C, C++, Java, Python, JavaScript).
- SEO/AEO/GEO metadata: FAQ JSON-LD, internal links, and education sections.

The visualizer pages share `styles.css` and `script.js`.

### 2. Guide and tool pages

New iOS HIG style pages built on a shared design system:

| Page | Route | Tool or content |
| --- | --- | --- |
| Guide hub | `/sorting-algorithms` | Cards, decision panel, growth chart |
| Big O | `/big-o-notation` | Six class growth chart, operation tables |
| Heap visualizer | `/heap-visualizer` | Live max/min heap tree with animations |
| Algorithm race | `/sorting-algorithm-race` | Benchmark with measured counters and replay |
| Comparison | `/summary` | Interactive table, charts, decision cards |
| 404 | `/404` | Rotating error messages, animated bars |
| Offline | `/offline` | PWA fallback |

These pages link `hig.css` and `hig.js`. Light and dark themes are switched by
the `data-theme` attribute on the root element, defaulting to the system
preference. All icons and artwork come from `images/`; nothing is loaded from
external image CDNs.

### 3. Support pages

About, contact, feedback, and privacy policy. They follow the older visualizer
shell but link to the same clean URLs.

## Shared runtime

### `hig.js`

A single IIFE that exposes `window.FastSort.hig`:

- Theme management with `localStorage` persistence.
- Mobile nav toggle.
- IntersectionObserver reveal animation with stagger delay.
- Clip-to-copy buttons.
- `drawGrowthCurve(svg, series, opts)`: log-scaled SVG line chart with a
  draw-on animation.
- `drawBars(container, items, opts)`: horizontal bar chart with grow-in
  animation.
- `drawRacers(container, items)`: staggered race-track playback.
- 404 joke rotation.

### `service-worker.js`

A cache-first strategy. The `CACHE_VERSION` constant must be bumped whenever
page assets change so installed clients refresh their cache. Reads
precached URLs from the `assets` array.

## Routing

`_redirects` maps two URL shapes to files:

1. Legacy or explicit `.html` routes redirect with a 301 to the clean URL.
2. Clean URLs such as `/quicksort` are served via a 200 rewrite to the file.

Every page in the site links using clean URLs so the browser address bar
stays canonical.

## Theming tokens

`hig.css` defines light tokens on `:root` (iOS system colors) and dark tokens
on `html[data-theme="dark"]`. The visualizer pages keep their own older dark
shell; both share the same `images/sort.png` brand icon.

## SEO/AEO/GEO conventions

Every content page must have:

- A unique title and description that answers the likely query.
- A canonical URL pointing to the clean route.
- Open Graph and Twitter cards that reference `images/social-card.png`.
- At least one JSON-LD block (Article, FAQPage, HowTo, SoftwareApplication,
  or BreadcrumbList) that mirrors on-page content.
- Internal links from at least one other page, since semantic linking is the
  primary discovery mechanism.
- A `<loc>` entry in `sitemap.xml`.

## Cache and headers

`_headers` sets HSTS, X-Frame-Options, X-Content-Type-Options,
Referrer-Policy, and Permissions-Policy. Static assets use long immutable
cache headers; the service worker and HTML use no-cache so updates flow
through.

## Adding a new page

1. Copy the head of an existing guide page and adapt the metadata.
2. Write the page with clean-URL internal links.
3. Add the route to `_redirects` and the page to `sitemap.xml`.
4. Add the asset to the service worker precache list and bump
   `CACHE_VERSION`.
5. Link it from the related-links section of at least one existing page.