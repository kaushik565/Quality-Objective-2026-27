# MRMNEW Project - Complete Overview

## Project Overview
This is an **IPQA Manufacturing Review Meeting (MRM)** presentation system built with **React, Vite, and Reveal.js**. It's a modern, interactive presentation framework for displaying manufacturing quality metrics across multiple sites (Site-I, Site-III, and Site-V).

**Event:** Management Review Meeting - December 15-16, 2025  
**Company:** Molbio Diagnostics Limited  
**Purpose:** Comprehensive presentation of manufacturing, quality assurance, and compliance metrics

---

## Architecture Overview

### Technology Stack
- **Frontend Framework:** React 18
- **Build Tool:** Vite
- **Presentation Engine:** Reveal.js (for slide management and navigation)
- **Charts:** Chart.js & Recharts (for data visualization)
- **Styling:** CSS (custom with reveal.js theming)
- **Code Splitting:** Lazy loading for heavy components

### Project Structure
```
src/
├── main.jsx                 # React app entry point
├── Presentation.jsx         # Main presentation controller (manages Reveal.js)
├── styles.css              # Global styling
├── slides/                 # All presentation slides
│   ├── TitleSlide.jsx      # Opening slide
│   ├── QMSOverview.jsx     # Quality Management System metrics
│   ├── IPQAOverview.jsx    # In-Process Quality Assurance (2975 lines - largest)
│   ├── LabQAOverview.jsx   # Laboratory Quality Assurance
│   ├── QualityObjectives.jsx # Quality targets and KPIs
│   ├── ClosingSlide.jsx    # Thank you slide
│   ├── SiteOverview.jsx    # [HIDDEN - removed from main presentation]
│   ├── ipqa-details/       # Detailed IPQA breakdowns per site
│   ├── site-details/       # Additional site-specific details
│   └── modals/             # Modal windows for detailed views
├── components/
│   ├── ErrorBoundary.jsx   # Error handling wrapper
│   ├── IPQAOverallPerformance.jsx
│   └── SlideSkeleton.jsx   # Loading skeleton
└── data/
    └── *.csv, *.json       # Raw data files
```

---

## Current Slide Sequence

The presentation flows in this exact order:

1. **TitleSlide** - Opening slide with company logo and event details
2. **QMSOverview** - Quality Management System metrics (currently HIDDEN by default)
   - Shows: Closure days reduction by category across all three sites
   - Features: "Show details" toggle for expanded view
3. **IPQAOverview** - In-Process Quality Assurance metrics (largest, 2975 lines)
   - Site-I, Site-III, Site-V performance metrics
   - Line clearance, closure, verification, sampling data
4. **LabQAOverview** - Lab quality assurance verification data
   - Reports verified, logbooks, equipment calibration
   - Test type breakdowns
5. **QualityObjectives** - Quality targets and improvement initiatives (1221 lines)
   - Expandable cards for each objective
   - Training metrics and KPI details
6. **ClosingSlide** - Thank you / closing message

**Removed:** SiteOverview slide (previously slide 2, now hidden from navigation)

---

## Key Slides & Features

### 1. TitleSlide.jsx
- Company logo from GitHub CDN
- Event title: "Management Review Meeting"
- Date: December 15-16, 2025
- Simple, professional opening

### 2. QMSOverview.jsx (NEWLY HIDDEN FEATURE)
**Status:** Hidden by default, shown on demand via toggle button
- **Data:** Closure days comparison for 5 QMS categories:
  - Change Controls
  - Incidents
  - Corrective Actions
  - Preventive Actions
  - Out of Specs
- **Visualization:** Before/after comparison by site with improvement percentages
- **Interactive:** 
  - "Show slide" / "Hide slide" button to toggle visibility
  - "Show details" / "Hide details" button for breakdown view
  - Radar chart comparison overlay
  - Fullscreen radar modal

**State Management:**
```javascript
const [isSlideVisible, setIsSlideVisible] = useState(false)  // Slide visibility toggle
const [showQmsDetails, setShowQmsDetails] = useState(false) // Details visibility within slide
```

### 3. IPQAOverview.jsx (LARGEST SLIDE - 2975 lines)
**Most complex and data-heavy slide**
- **Scope:** Multi-site IPQA performance across 3 facilities
- **Data Coverage:**
  - Site-I metrics: 262 incidents, corrective/preventive actions
  - Site-III metrics: 82 incidents, strong change control performance
  - Site-V metrics: 196 incidents, best incident reduction
- **Visualizations:**
  - KPI tiles with color-coded status
  - Line clearance, closure, verification performance
  - Sampling types breakdown
  - Equipment calibration tracking
- **Interactive Elements:**
  - Multiple expandable detail modals
  - Chart modal overlays
  - Department & manufacturing breakdowns
  - Responsive tables

**Modal System:** Lazy-loaded modals for:
- Site-specific detail sections
- Chart expansions
- Info panels
- Department overviews

### 4. LabQAOverview.jsx
- Reports verification metrics
- Logbook verification tracking
- Equipment calibration status
- Test type distribution (pie charts)
- Site-specific monthly trend data
- Pass/fail analysis for Site-III

### 5. QualityObjectives.jsx (1221 lines)
- Multiple quality improvement objectives
- Expandable card UI for each objective
- Training completion tracking
- KPI targets vs. actual performance
- Detailed implementation metrics

### 6. ClosingSlide.jsx
- Company logo
- "Thank You" message
- Professional closing statement

---

## Component Architecture

### Presentation.jsx (Main Controller)
**Responsibilities:**
- Initializes Reveal.js presentation engine
- Configures slide navigation (arrow keys, overview, history)
- Manages global modal close event
- Handles scroll reset between slides
- Logo visibility toggle (hidden on title/closing slides)

**Key Configuration:**
```javascript
{
  width: 1920,
  height: 1080,
  transition: 'fade',
  slideNumber: 'c/t', // Current / Total
  keyboard: false,    // Custom key handling
  overview: true,
  history: true
}
```

### ErrorBoundary.jsx
- Catches React rendering errors in any slide
- Displays user-friendly error message with error details (dev mode)
- Provides "Skip to next slide" and "Reload" options
- Prevents single slide error from crashing presentation

### IPQAOverallPerformance.jsx
- Separate component for overall IPQA dashboard
- Displays comprehensive quality score (98.8%)
- Before/after comparison metrics
- Business impact summary

### Lazy-Loaded Components
Heavy components are code-split for faster initial load:
```javascript
const QMSOverview = lazy(() => import('./slides/QMSOverview'))
const IPQAOverview = lazy(() => import('./slides/IPQAOverview'))
const LabQAOverview = lazy(() => import('./slides/LabQAOverview'))
const QualityObjectives = lazy(() => import('./slides/QualityObjectives'))
const ClosingSlide = lazy(() => import('./slides/ClosingSlide'))
```

---

## Data Structure

### Three Manufacturing Sites
1. **SITE-I** (Red #dc2626)
   - Largest volume facility
   - 262 total incidents
   - 89 corrective actions, 29 preventive actions
   - Strong improvements in PA (60%) and OOS (19%)

2. **SITE-III** (Purple #8b5cf6)
   - 82 total incidents
   - 52 corrective actions, 66 preventive actions
   - Strongest change control improvement (61%)
   - 36% OOS improvement

3. **SITE-V** (Blue #0ea5e9)
   - 196 total incidents
   - 70 corrective actions, 37 preventive actions
   - Best incident reduction (59%)
   - Strong CA (NC) improvements (52%)

### QMS Categories (5 types)
- **Change Controls:** Process modification tracking
- **Incidents:** Safety/quality issues
- **Corrective Actions:** Problem fixes
- **Preventive Actions:** Proactive measures
- **Out of Specs:** Non-conformances

### IPQA Activities
- **Line Clearance:** Equipment readiness verification
- **Line Closure:** Completion verification
- **Re-verification:** Quality double-checks
- **Sampling Types:** Multi-stage sampling
- **Equipment Calibration:** Instrument accuracy

---

## State Management Patterns

### Global Modal Closing
When navigating between slides, a custom event closes all open modals:
```javascript
window.dispatchEvent(new CustomEvent('closeAllModals'))
```

All slides listen for this event:
```javascript
useEffect(() => {
  window.addEventListener('closeAllModals', handleCloseAllModals)
  return () => window.removeEventListener('closeAllModals', handleCloseAllModals)
}, [])
```

### Scroll Reset
When slides change, the presentation resets scroll position:
```javascript
current.scrollTop = 0
current.querySelectorAll('div[style*="overflow"]').forEach(el => el.scrollTop = 0)
```

---

## Recent Changes & Features

### QMS Metrics Slide Toggle (Latest Update)
- **Feature:** Hide/show QMS slide at will
- **Default State:** Hidden (slide says "QMS metrics slide is hidden")
- **Button Actions:**
  - "Show slide" - reveals full QMS content
  - "Hide slide" - collapses QMS to hidden state
  - "Show details" - expands breakdown grids
  - "Hide details" - collapses breakdown grids
- **Structure:**
  - Header with title and controls
  - Optional message when hidden
  - Conditional details grid & radar chart

### SiteOverview Removal
- **Status:** Removed from main slide sequence (Presentation.jsx)
- **File:** Still exists at `src/slides/SiteOverview.jsx` but not imported
- **Reason:** User requested slide list to exclude this slide

---

## Build & Deployment

### Development
```bash
npm install
npm run dev          # Starts Vite dev server on port 3000
```

### Production
```bash
npm run build        # Vite builds to `dist/`
```

### Build Configuration
- **Output:** `dist/` directory
- **Assets:** `dist/assets/`
- **Code Splitting:**
  - `react-vendor.js` (React + React-DOM)
  - `chart-vendor.js` (Chart.js, Recharts)
  - `reveal-vendor.js` (Reveal.js)
  - Individual slide chunks (lazy-loaded)

---

## Styling & Theming

### CSS Classes
Key slide container classes:
- `.reveal` - Main Reveal.js container
- `.slides` - Slide wrapper
- `.content-slide` - Standard slide styling
- `.title-slide` - Title slide styling
- `.closing-slide` - Closing slide styling
- `.error-slide` - Error state styling

### Color Scheme
- **Primary Red:** #dc2626 (Site-I, accents)
- **Purple:** #8b5cf6 (Site-III)
- **Blue:** #0ea5e9 (Site-V, primary)
- **Green:** #22c55e (Positive indicators)
- **Gray:** #475569, #0f172a (Text, secondary)

---

## Navigation & Controls

### Keyboard Controls
- **Arrow Right:** Next slide
- **Arrow Left:** Previous slide
- **Escape:** Close all modals
- **Overview Mode:** View all slides at once

### UI Controls
- Modal open/close buttons
- Expandable cards & accordions
- Chart zoom/fullscreen overlays
- Toggle switches for visibility

---

## Error Handling

### Error Boundary Wrapping
All lazy-loaded slides are wrapped:
```jsx
<ErrorBoundary>
  <Suspense fallback={<SlideSkeleton />}>
    <TargetSlide />
  </Suspense>
</ErrorBoundary>
```

### Error Display
Shows user-friendly message with:
- Icon & heading
- Explanation text
- Error details (dev mode only)
- Action buttons (Skip / Reload)
- Error count tracking

---

## Data Files

Located in `data/` directory:
- `avg_times_slide2.csv` - QMS metrics
- `calibration_data.csv` - Equipment calibration
- `incident_data.csv` - Incident tracking
- `calibration_data.json` - JSON format calibration
- `incident_data.json` - JSON format incidents
- `data.json` - Master data file

---

## Performance Optimizations

1. **Lazy Component Loading** - Slides load on demand
2. **Code Splitting** - Vendor libraries in separate chunks
3. **Memoization** - useMemo for static data calculations
4. **Callback Memoization** - useCallback for event handlers
5. **Suspense Fallbacks** - Loading skeletons while chunks load
6. **Error Boundaries** - Prevents cascading failures

---

## Known States & Behavior

### QMS Slide States
1. **Hidden State** - Placeholder message, "Show slide" button visible
2. **Visible + Collapsed** - Header visible, "Details hidden" message
3. **Visible + Expanded** - Full breakdown grids, radar chart, modals

### Modal System
- One modal open at a time
- Auto-close on slide change
- Overlay prevents interaction outside modal
- Escape key closes modals

### Scroll Behavior
- Auto-reset on slide navigation
- Manual scroll within slides allowed
- Scrollable overflow containers managed

---

## Summary

**This is a sophisticated, production-ready presentation system:**
- ✅ Multi-site manufacturing metrics tracking
- ✅ Interactive charts and modals
- ✅ Responsive error handling
- ✅ Performance-optimized with code splitting
- ✅ Clean, professional UI
- ✅ Comprehensive data visualization
- ✅ Slide-level control (QMS hidden/shown on demand)
- ✅ Cross-slide state management
- ✅ Accessibility considerations (ARIA labels, semantic HTML)

**Key Metrics Covered:**
- Quality Management System (QMS) - Closure days & incident tracking
- In-Process Quality Assurance (IPQA) - Manufacturing stage metrics
- Laboratory QA - Verification & calibration
- Quality Objectives - Strategic improvement targets

The presentation is designed for a formal management review meeting with stakeholders from Molbio Diagnostics Limited.


