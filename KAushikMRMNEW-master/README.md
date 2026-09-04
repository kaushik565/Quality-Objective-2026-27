# MRM IPQA Review Deck (Slidev)

Interactive management review deck built with [Slidev](https://sli.dev) plus Chart.js. Data is extracted from `IPQA PPT - MRM -01-12-2025 (1) (2) (1).pptx` into CSV/JSON under `data/`.

## What’s here

- `slides.md` — Slidev deck with charts and status chips
- `components/BarChart.vue` — lightweight Chart.js wrapper
- `components/StatusChip.vue` — simple status pill component
- `data/` — extracted tables (`line_clearance.csv`, `incident_data.json`, etc.) and bundled `data.json`

## Setup

```bash
npm install
```

## Local preview

```bash
npm run dev
```

## Build & PDF export

```bash
npm run build        # static bundle in dist/
npm run export       # PDF at dist/slidev.pdf
```

## GitHub Pages deploy

```bash
npm run deploy:gh    # builds then publishes dist/ to gh-pages branch
```

> Tip: set your repo pages source to `gh-pages` after the first publish.

## Azure Static Web Apps (optional)

1) `npm run build`
2) Point SWA to `dist/` as the app artifact (no API). The `build` command is `npm run build`.

## Refreshing data

If the PPT changes, re-run the Python extraction (already executed once) or adapt the script below. It emits fresh CSV/JSON into `data/`.

```python
# sketch
# - load PPTX via zipfile
# - parse tables (xml) into CSV and data.json
```

## Notes

- Charts read from `data/data.json`; keep numeric fields numeric (remove `%` or `NA` if you add new data).
- Theme: Slidev default, with custom background gradient.
- Meeting dates: 15–16 Dec 2025.

