# KAushik MRM Presentation Guide

## Purpose
- Reference for every slide: data sources, calculations, visualizations, and export steps.
- Covers React/Vite Reveal.js deck plus supporting data files in `data/` and aggregations in `src/data.js`.

## Stack and Entry Points
- React + Vite, Reveal.js layout in `src/Presentation.jsx`.
- Charts: Recharts (radar/bar/area/line/stacked/composed) and Chart.js (line, doughnut, multi-axis bar).
- Data hub: `src/data.js` aggregates CSV/JSON from `data/` into JS objects used across slides.

## Data Sources (key files)
- `data/*.csv|json`: incidents, line clearance/closure/reverification/verification counts, calibration, cartridge/device timings.
- `src/data.js`: consolidates into `incidentData`, `incidentTiming`, `changeControlData`, `lineClearanceData`, `CAPAData`, `oosData`, `actions`, `actionsImplemented`, `cartridgeProcesses`, `deviceProcesses`, `validationData`, `calibrationData/calibrationCounts`, and radar datasets.
- Slide components import from `src/data.js` or embed per-site metrics (especially IPQA and Lab QA overviews).

## Calculation Patterns
- Improvement %: `(start - end) / start * 100` (used for incident closure/investigation drops, change-control improvement, etc.).
- Before vs After windows: Jan–May (or Jan–Jun) vs Jul–Nov depending on slide; `EmptySlide` CAPA/OOS/CC cards split first-half vs second-half arrays.
- Approval %: `approved / (approved + notApproved)` (IPQA per-site tiles and stacks).
- CC improvement vs Jan: `(JanDays - monthDays) / JanDays * 100` computed in `EmptySlide` table.

## Slide Cheat Sheet (what to look for)
- Title & Agenda: Static framing.
- Executive Summary (`src/slides/ExecutiveSummary.jsx`): incident totals, avg closure/investigation, CC days, CAPA totals; before/after bars; QMS/IPQA composed charts; three radars; site score cards.
- Data Dashboard: Chart.js line (before vs after incidents) + doughnut distribution.
- Calibration Throughput: Chart.js line per equipment type (monthly counts).
- Incident Trend: Control-style line with UCL/LCL/Mean overlays.
- Line Clearance: Stacked bars across 12 departments; approval badge from `lineClearanceData.approval`.
- Process Improvements: Lists `actions` and `actionsImplemented`; highlights deltas for incidents, CC, CAPA/OOS.
- Recommendations: Text actions tied to observed gaps.
- Cartridge Assembly: `cartridgeProcesses` timing comparisons (clear/close/re-verif) for 11 activities; before (Jan–Aug) vs Sep/Oct/Nov trends.
- Device Assembly: `deviceProcesses` timing comparisons for four device types; same before/after split.
- Validation Reports: Cost/hours/throughput KPIs from `validationData`.
- EmptySlide (Ops Hub): Interactive; category cards feed Chart.js views for incidents, CA/PA/OOS/CC with before/after totals, avg days, and monthly trend/tables.
- Site Overview: Overall performance grid; per-site category cards open site detail components (I/III/V).
- IPQA Overview: Per-site tiles; Site I section; Site III & Site V dashboards with stacked bars, approval gauges, area/line trends, SVG department/cartridge charts, calibration SVG chart, improvements lists, sampling KPIs (IQC/IPQC/FQC); modals for departments/cartridge/manufacturing selections.
- Lab QA Overview: Three site cards; composed bar/line monthly charts; pie for test-type distribution with readable labels.

## Visualization Libraries
- Recharts: radars, stacked bars, area/line/composed charts in Executive Summary, Site Overview, IPQA Overview, Lab QA Overview.
- Chart.js: incident and calibration lines, doughnut, multi-axis CC chart, and other category charts in EmptySlide/DataDashboard.
- Custom SVG: Department/cartridge/manufacturing grids and calibration bars inside IPQA Overview.

## Running the Deck
- Install deps: `npm install`.
- Start dev server: `npm run dev` (use `-- --host --port 3000` if you need the slide export script’s default URL).
- Build (static): `npm run build`.

## Exporting Slides to PDF (Reveal deck)
1) Run the dev server on the port expected by `scripts/export-pdf.js` (default script targets `http://localhost:3000?print-pdf`; launch with `npm run dev -- --host --port 3000`).
2) In another terminal: `npm run export-pdf` (installs Playwright Chromium if missing, then writes `dist/presentation.pdf`).
3) Adjust `scripts/export-pdf.js` if you change ports or want different page ranges.

## Exporting This Guide to PDF
- Generate once you edit `docs/guide.md`:
  - `npm run doc:pdf` → outputs `docs/guide.pdf` via `md-to-pdf`.
- If `md-to-pdf` is not yet installed, `npm install` will pull it in as a dev dependency.

## Maintenance Tips
- Keep numeric changes centralized in `src/data.js`; avoid scattering constants in components.
- Preserve before/after window consistency when updating data arrays.
- For new charts, reuse existing color cues: incidents (red), CC (blue), CA/PA (amber/green), OOS (amber), sampling (site colors), approvals (green).
- When adding overlays/modals in IPQA Overview, ensure `hasOverlayOpen` state covers them to lock scroll.

