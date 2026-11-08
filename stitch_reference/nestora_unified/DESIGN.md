---
name: Nestora Unified
colors:
  surface: '#f0fdf3'
  surface-dim: '#d1ddd4'
  surface-bright: '#f0fdf3'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eaf7ed'
  surface-container: '#e4f1e7'
  surface-container-high: '#dfebe2'
  surface-container-highest: '#d9e6dc'
  on-surface: '#131e18'
  on-surface-variant: '#414844'
  inverse-surface: '#28332d'
  inverse-on-surface: '#e7f4ea'
  outline: '#717974'
  outline-variant: '#c1c8c2'
  surface-tint: '#3e6654'
  primary: '#093425'
  on-primary: '#ffffff'
  primary-container: '#234b3a'
  on-primary-container: '#8fbaa4'
  inverse-primary: '#a5d0ba'
  secondary: '#476553'
  on-secondary: '#ffffff'
  secondary-container: '#c9ebd4'
  on-secondary-container: '#4d6b59'
  tertiary: '#442700'
  on-tertiary: '#ffffff'
  tertiary-container: '#5f3c0e'
  on-tertiary-container: '#daa770'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c0ecd5'
  primary-fixed-dim: '#a5d0ba'
  on-primary-fixed: '#002115'
  on-primary-fixed-variant: '#264e3d'
  secondary-fixed: '#c9ebd4'
  secondary-fixed-dim: '#adceb8'
  on-secondary-fixed: '#032113'
  on-secondary-fixed-variant: '#304d3c'
  tertiary-fixed: '#ffddbb'
  tertiary-fixed-dim: '#f2bc84'
  on-tertiary-fixed: '#2b1700'
  on-tertiary-fixed-variant: '#633f11'
  background: '#f0fdf3'
  on-background: '#131e18'
  surface-variant: '#d9e6dc'
typography:
  display:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  display-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.005em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

The design system establishes an architectural, grounded, and tranquil atmosphere tailored for systematic management, internal financial settlements, and operational workflows. It communicates institutional permanence, environmental balance, and precision.

### Design Principles
- **Organic Precision:** Combines organic botanical tones with rigorous typographic rhythm and layout grids.
- **Quiet Authority:** Surfaces favor tonal variation, low-contrast structural borders, and subtle contrast shifts over loud dropshadows or theatrical animations.
- **Internal Clarity:** Interface elements prioritize dense data comprehension, non-destructive workflows, and transparent internal book-keeping without commercial clutter or consumer payment distractions.
- **Intentional Context:** Global settings, including theme modes, are deliberately situated in dedicated configuration spaces (Profile → Settings → Global Appearance) to maintain visual stability and focused operational context.

## Colors

The palette operates across dual themes, balancing deep deep-forest greens, pale organic tints, and warm ochre highlights. Theme configuration is intentionally absent from primary navigation headers and resides strictly under `Profile -> Settings -> Global Appearance`.

### Light Palette
- **Canvas Background:** `#F3F5F2`
- **Surface (Primary Panels, Cards):** `#FFFFFF`
- **Warm Ivory (Containers, Recessed Zones):** `#F7F6F0`
- **Primary Brand / Action:** `#234B3A`
- **Secondary Accent:** `#8FAF9A`
- **Soft Green (Subtle Tints, Selected Rows):** `#E7EFE8`
- **Pale Green (Pills, Counter Badges):** `#DDEDE2`
- **Accent Ochre (Status, Callouts, Internal Settlement Markers):** `#D9A66F`
- **Main Text:** `#202B25`
- **Secondary / Supporting Text:** `#78847C`
- **Border / Divider:** `#E3EAE4`

### Dark Palette
- **Canvas Background:** `#18231E`
- **Secondary Background (Recessed Views):** `#202E27`
- **Sidebar Surface:** `#1D2A23`
- **Card Background:** `#26372E`
- **Elevated Surface (Modals, Popovers):** `#304338`
- **Primary Interactive:** `#8FAF9A`
- **Secondary Interactive:** `#A9C5AF`
- **Soft Green (Active States, Badges):** `#354A3D`
- **Accent Ochre:** `#D9A66F`
- **Main Text:** `#F1F4F0`
- **Secondary Text:** `#B1BDB4`
- **Border / Structural Lines:** `#3B4B41`

### Application Rules
- Use `Accent Ochre` (`#D9A66F`) strictly for attention-critical indicators, internal ledger alerts, pending verification states, and active focal points.
- Never use consumer checkout or third-party payment conventions; internal settlement states use tonal pale green badges for balanced ledgers and ochre badges for reconciliation holds.

## Typography

The typography is built around Plus Jakarta Sans, using its clean geometry and humanist terminals to offer high legibility across dense data tables, settlement summaries, and administrative layouts.

### Hierarchy & Usage
- **Display & Large Headlines:** Used exclusively for high-level module dashboards and administrative section overviews.
- **Headline Medium / Small:** Applied to card headers, drawer titles, modal dialogs, and breakdown clusters.
- **Body Regular (`body-md`, `body-sm`):** Standard for system logs, audit reports, records tables, and help texts.
- **Labels (`label-lg`, `label-md`, `label-sm`):** Optimized for uppercase metadata labels, interactive buttons, tabs, settlement statuses, and numeric metrics.

## Layout & Spacing

The layout is structured upon an adaptable 12-column grid system paired with strict 8pt incremental spacing.

### Layout Rules
- **Desktop (1024px+):** 12-column fluid grid, `2rem` outer margins, `1.5rem` gutters. Persistent sidebar width fixed at `260px`.
- **Tablet (768px - 1023px):** 8-column layout, `1.5rem` outer margins, `1rem` gutters. Collapsible navigation bar.
- **Mobile (Below 768px):** 4-column layout, `1rem` outer margins, `1rem` gutters. Reflow multi-column settlement tables into stacked card summaries.
- **Density:** Ledger entries and data tables utilize compact heights with `space-sm` vertical cell padding and `space-md` horizontal cell padding.

## Elevation & Depth

Visual hierarchy relies on structural borders and subtle tone-on-tone layering rather than dramatic, deep drop-shadows.

### Layer Hierarchy
- **Base Canvas (Level 0):** Light `#F3F5F2` / Dark `#18231E`. Foundation level.
- **Surfaces & Cards (Level 1):** Light `#FFFFFF` / Dark `#26372E`. Outlined with a 1px border (`#E3EAE4` in light, `#3B4B41` in dark). Shadows are minimal ambient occlusions: `0 1px 3px rgba(32, 43, 37, 0.04)`.
- **Recessed Areas:** Light `#F7F6F0` / Dark `#202E27`. Used inside cards for secondary ledgers, summary blocks, and code or record views.
- **Floating Modals & Flyouts (Level 2):** Light `#FFFFFF` / Dark `#304338`. Surrounded by crisp borders with an expanded ambient soft shadow: `0 12px 28px -4px rgba(24, 35, 30, 0.12)`.

## Shapes

The design system standardizes on a balanced curve language of `12px` (`rounded-md` / standard components) and `16px` (`rounded-lg` / containers and cards).

### Radius Specifications
- **Cards, Panels, & Modal Containers:** Fixed at `16px` (`1rem`).
- **Interactive Controls (Buttons, Inputs, Selectors):** Fixed at `12px` (`0.75rem`).
- **Pills & Status Badges:** Fully rounded radius (`9999px`) or `8px` (`0.5rem`) for compact tags.
- **Checkboxes & Inner Selectors:** `4px` subtle corner soft curves.

## Components

### Buttons
- **Primary:** Solid `#234B3A` with `#FFFFFF` text in light mode; `#8FAF9A` with `#18231E` text in dark mode. Radius: `12px`. Hover shifts opacity or introduces 10% lightness tint.
- **Secondary:** Transparent surface with 1px border (`#E3EAE4` / `#3B4B41`) and primary text.
- **Destructive/Critical:** Tinted soft rose background with deep crimson typography; no harsh neon red.

### Input Fields & Controls
- **Height & Radius:** `44px` height, `12px` border radius.
- **Surfaces:** `#FFFFFF` in light mode, `#202E27` in dark mode with a 1px border. Focus introduces a 1.5px ring in primary green with zero layout shift.
- **Checkboxes & Radios:** `18px` structural frame, checking triggers smooth primary green fill with crisp checkmark or center pip.

### Chips & Status Badges
- **Settlement Status (Balanced/Recorded):** Light mode: `#DDEDE2` background, `#234B3A` text. Dark mode: `#354A3D` background, `#A9C5AF` text.
- **Settlement Pending / Review:** `#D9A66F` at 15% opacity with dark ochre text (`#8F5E28` light, `#E8B884` dark).
- Shape: 12px horizontal padding, 4px vertical padding, rounded-full.

### Data Tables & Internal Settlements
- **Structure:** Crisp `#E3EAE4` (light) or `#3B4B41` (dark) bottom borders. No vertical grid lines.
- **Header:** Uppercase `label-sm` with secondary text tint and warm background (`#F7F6F0` light, `#202E27` dark).
- **Semantics:** Settlement references represent internal book records only. Explicitly exclude external bank transfer mechanisms, card gateways, or payment provider branding.

### Navigation & Settings Panel
- **Sidebar:** Light mode `#FFFFFF` / Dark mode `#1D2A23`. Clear item separation with `12px` active item backgrounds.
- **Global Settings Route:** Dedicated section `Profile -> Settings -> Global Appearance` containing radio selector cards for Light, Dark, or System mode.