# SITE-III Color & Design Reference Guide

## Color Palette

### Primary Colors by Section
```
Manufacturing Section
├── Primary: Purple (#8b5cf6)
├── Light BG: #f5f3ff
├── Border: #c4b5fd
└── Accent: #7c3aed

Cartridge Assembly Section
├── Primary: Green (#10b981)
├── Light BG: #f0fdf4
├── Border: #86efac
└── Accent: #059669

Calibration Section
├── Primary: Purple (#7c3aed)
├── Light BG: #f5f3ff
├── Border: #c4b5fd
└── Accent: #6d28d9

Sampling & QA Section
├── Primary: Orange (#f59e0b)
├── Light BG: #fffbeb
├── Border: #fbbf24
└── Accent: #d97706
```

## Component Colors

### Sampling Type Cards
```
IQC Sampling
├── Icon: 🔍
├── Color: #ef4444 (Red)
├── BG: #fef2f2
└── Border: #ef4444

FQC Sampling
├── Icon: ✓
├── Color: #3b82f6 (Blue)
├── BG: #eff6ff
└── Border: #3b82f6

IPQC Sampling
├── Icon: 🎯
├── Color: #f59e0b (Orange)
├── BG: #fffbeb
└── Border: #f59e0b
```

### Process Card Colors (Cartridge Assembly)
```
1. QR Code Generation: Blue (#3b82f6)
2. QR Pasting: Purple (#8b5cf6)
3. Grommet Fixing: Pink (#ec4899)
4. Smiley Assembly: Teal (#06b6d4)
5. Sample Filter Washing: Green (#10b981)
6. Sample Filter Heating: Orange (#f59e0b)
7. Dump to Annealing: Red (#ef4444)
8. Matrix Pallet to Pouch: Teal (#06b6d4)
9. Rework: Blue (#3b82f6)
10. Packing Verification: Purple (#8b5cf6)
11. LINE-G Automation: Pink (#ec4899)
```

## Typography Scale

```
Dashboard Title: 0.95em, fontWeight: 800
Section Headers: 0.95em, fontWeight: 800, with colored badge
Subsections: 0.9em, fontWeight: 800
Metric Labels: 0.8em-0.85em, fontWeight: 700-800
Data Values: 1.2em-2.2em, fontWeight: 900
Small Text: 0.65em-0.75em, fontWeight: 600-700
```

## Spacing Standards

```
Section Margins: 32-40px top, 24px padding-top
Card Padding: 14px-20px
Grid Gap: 12px-18px
Border Radius: 10px-14px
Shadows: 0 2px 8px rgba(0, 0, 0, 0.06-0.1)
Hover Shadow: 0 6px-8px 16px-20px color20
```

## Responsive Grid

```
Auto-fit Grid: minmax(100px to 280px, 1fr)
Gap: 12px-18px
Desktop: 3-4 columns
Tablet: 2 columns
Mobile: 1 column
```

## Status Badges

```
Badge Style:
├── Background: Color specific (purple, green, orange)
├── Text: White
├── Border-radius: 6px
├── Padding: 4px 10px
├── Font-size: 0.7em
├── Font-weight: 700
├── Text-transform: uppercase
└── Examples: "All On Track", "Optimized", "On Schedule"
```

## Interactive Elements

### Hover Effects
```
Cards:
├── Transform: translateY(-2px to -4px)
├── Box-shadow: Increased by 2-4x
├── Transition: 0.3s ease
└── Cursor: pointer

Buttons/Badges:
├── Opacity change
├── Scale: 1.05x
└── Shadow increase
```

### Focus States
```
All interactive elements:
├── Box-shadow: Color-specific highlight
├── Border: Enhanced color
└── Opacity: 0.9-0.95
```

## Section Separator Design

```
Separator Line:
├── Height: 3px
├── Background: Gradient (color fade in/out)
├── Border-radius: 2px
└── Margin: 40px 0

Separator Text:
├── Font-size: 0.7em
├── Font-weight: 700
├── Letter-spacing: 1.5px
├── Color: #94a3b8
├── Text-transform: uppercase
├── Example: "━━ Section 2 ━━"
```

## Card Styles

### Standard Card
```
Background: Light colored (based on section)
Border: 2px solid, color-specific
Border-radius: 12px
Padding: 16px-18px
Box-shadow: 0 1px-2px rgba(0, 0, 0, 0.06-0.1)
Transition: all 0.3s ease
```

### Summary Card
```
Background: Gradient background (light version of primary)
Border: 2px solid, bright version of color
Border-radius: 14px
Padding: 16px-20px
Display: Grid with centered text
Font-size: 1.8em-2.2em for values
```

## Icon Guidelines

```
Section Icons:
├── Manufacturing: ⚙️
├── Cartridge: 📦
├── Calibration: 🔧
├── Sampling: 📊
├── IQC: 🔍
├── FQC: ✓
├── IPQC: 🎯
├── Dashboard: 📈
└── Size: 1.4em-1.6em
```

## Chart Styling

```
Bar Chart:
├── Background: color gradient (dark to normal)
├── Border-radius: 4px 4px 0 0
├── Display: Flex, align-items flex-end
├── Gap: 8px between bars
├── Data label: 0.65em, white, bold
└── Month label: 0.7em, grey, below chart

Month Card in Chart:
├── Font-size: 0.7em
├── Font-weight: 600
├── Color: #0f172a
└── Text-align: center
```

## Accessibility Considerations

```
Text Colors:
├── Primary text: #0f172a (99% contrast)
├── Secondary text: #1e293b (93% contrast)
├── Tertiary text: #475569 (73% contrast)
├── Disabled: #cbd5e1 (30% contrast)

Button/Badge Text:
├── On colored bg: White for contrast
├── Large text: 18px+ (WCAG AA)
├── Small text: 12px+ (WCAG AA)
└── Icons: Alt text and aria-labels recommended
```

## Animation Guidelines

```
Transition Timing:
├── Hover effects: 0.3s ease
├── Focus effects: 0.2s ease
├── Page load: 0.4s ease-out
└── No animation: For motion-sensitive users (prefers-reduced-motion)

Recommended CSS:
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; }
}
```

## Print Styles (Optional)

```
For PDF Export:
├── Remove hover effects
├── Use solid backgrounds
├── Black text on white
├── Adjust sizing for A4
├── Remove gradients or use patterns
└── Preserve color meaning with patterns
```

---

## Implementation Notes

1. All colors are CSS hex values
2. Gradients use linear-gradient with 135deg for depth
3. Shadows are rgba(0,0,0) with varying opacity
4. Responsive design uses CSS Grid with auto-fit
5. All animations use ease timing functions
6. Icons are Unicode emoji characters
7. Fonts use default system stack (no external fonts)

## File Location
- Main implementation: `src/slides/IPQAOverview.jsx`
- Apply this guide consistently across all site dashboards


