# Contributing to EasySorting

Thank you for helping make EasySorting better. This is a plain HTML, CSS, and
vanilla JavaScript project with no build step. That keeps it deployable to
Netlify as a static site and installable as a PWA.

## Table of contents

1. [Code of conduct](#code-of-conduct)
2. [Ways to contribute](#ways-to-contribute)
3. [Project structure](#project-structure)
4. [Before you start](#before-you-start)
5. [Making changes](#making-changes)
6. [Style guide](#style-guide)
7. [Commit messages](#commit-messages)
8. [Pull request checklist](#pull-request-checklist)
9. [Questions](#questions)

## Code of conduct

This project follows the Contributor Covenant. Read
[CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) before contributing.

## Ways to contribute

- Report bugs via the GitHub issue tracker using the bug report template.
- Request or upvote new features using the feature request template.
- Improve the educational copy, algorithm explanations, or SEO metadata.
- Add code for more programming languages to existing algorithm pages.
- Fix accessibility, layout, or animation issues.
- Expand tests, charts, or interactive tools such as the Algorithm Race.

## Project structure

```
.
+-- *.html                  One self-contained page per algorithm and guide
+-- styles.css               Design system for the visualizer pages
+-- hig.css                  iOS HIG inspired design system for guide tools
+-- hig.js                   Shared runtime: theme, nav, charts, reveal
+-- script.js                Shared visualizer logic
+-- app.js                   Site-wide app helpers
+-- service-worker.js        Offline cache
+-- manifest.json            PWA manifest
+-- _redirects               Netlify clean URL rules
+-- _headers                 Netlify security and caching headers
+-- sitemap.xml              Search index
+-- images/                  Icons and social media card
```

## Before you start

1. Read the [README](README.md) to understand the site map.
2. Open the page you want to change in a browser to see current behavior.
3. Check `service-worker.js` for the `CACHE_VERSION` number. When you ship
   changes to page assets, bump it so visitors receive the new version.

## Making changes

Steps:

- If you are the maintainer, create a branch: `git checkout -b fix/topic`.
- Make focused changes. One logical change per contribution.
- Test locally by opening the HTML files in a browser or running a local
  server from the repo root:
  `python -m http.server 8000` or `npx serve`.

### New pages

All pages must follow the existing SEO conventions:

- Descriptive `<title>` and `<meta name="description">`.
- A canonical link pointing at the clean URL, for example
  `https://easysorting.netlify.app/<page>`.
- Open Graph and Twitter meta tags.
- Matching `<script type="application/ld+json">` structured data.
- A row in `sitemap.xml`.
- A rule in `_redirects` (`/<page>  /<page>.html  200`) and a 301 rule for
  the `.html` variant if you want it.
- Internal links from at least one existing page, since pages are only
  reachable through the site when linked.

Guide pages (sorting-algorithms, big-o-notation, and friends) use `hig.css`
and include `hig.js` for theming and animations. Visualizer pages use
`styles.css` and `script.js`.

## Style guide

- HTML: lowercase tags, double quoted attributes, semantic elements.
- CSS: custom properties are defined in theme blocks at the top of the
  stylesheet. Follow the section comments.
- JS: vanilla JavaScript, no framework, no external runtime dependencies.
  "use strict" IIFEs at the top. Keep ES2015+ (const, let, arrow functions).
- Text: do not use em dashes or other long dashes, and do not use emojis in
  visible copy or file content. Prefer hyphens and plain ASCII punctuation.
- Accessibility: every interactive control needs a focus style; charts and
  trees need aria labels; color is never the only signal.

## Commit messages

Follow the Conventional Commits style:

```
feat: add heap visualizer tool
fix: correct merge sort swap count in the race
docs: clarify stable sort definition in the guide
chore: bump service worker cache version
```

## Pull request checklist

Before opening a pull request:

- Verify your page renders in both light and dark theme if it uses `hig.css`.
- Verify there are no broken links from the pages you touched.
- Confirm JSON-LD blocks are valid JSON.
- Confirm no em dashes or emojis were introduced.
- Answer the bug or feature template in the body if one was used.

## Questions

Open a discussion or issue with the question. For anything that does not
belong on GitHub, use the contact page on the site.