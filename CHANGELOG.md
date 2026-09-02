# Changelog

All notable changes to EasySorting are documented here. The format follows a
trimmed version of Keep a Changelog, and the project uses semantic versioning.

## [1.2.0] - 2026-09-02

### Added

- Guide hub page: `/sorting-algorithms` with an interactive decision panel,
  algorithm cards, and a live growth chart.
- Big O guide page: `/big-o-notation` with a six-class growth chart, a
  practical operations table, and complexity tables for every sort.
- Interactive heap visualizer: `/heap-visualizer` for building max and min
  heaps with animated heapify, insertion, and extraction on a live tree.
- Algorithm benchmark race: `/sorting-algorithm-race` measuring comparisons,
  data moves, and wall time across all eight sorts.
- Custom 404 page with animated bars and rotating error lines.
- Offline fallback page for the service worker.
- iOS HIG inspired design system (`hig.css`) and runtime (`hig.js`) with
  light and dark themes, reveal animations, and SVG charts.
- Professional repository files: LICENSE, CONTRIBUTING, CODE_OF_CONDUCT,
  SECURITY, CHANGELOG, issue and pull request templates, FUNDING, editorconfig,
  netlify.toml, and an architecture document.

### Changed

- Rebuilt the comparison page as an interactive article with charts.
- Reworked all site copy to avoid em dashes and emojis.
- Extended internal linking between visualizers, guides, and tools.

## [1.1.0] - 2026-09-01

### Added

- SEO, AEO, and GEO metadata across all algorithm pages: FAQ schema, internal
  links, and education sections.
- Social sharing card `images/social-card.png` used by all pages.
- PWA shortcuts in the manifest and a bump to the service worker cache.

## [1.0.0] - 2026-08-30

### Added

- Initial visualizers: Bubble, Selection, Insertion, Merge, Quick, Heap,
  Radix, and Shell Sort with step-by-step animation and code in C, C++, Java,
  Python, and JavaScript.
- PWA support, Netlify deployments, and a search index.

[1.2.0]: https://easysorting.netlify.app
[1.1.0]: https://easysorting.netlify.app
[1.0.0]: https://easysorting.netlify.app