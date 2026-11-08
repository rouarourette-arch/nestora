---
name: Warm Shared Living Modernism
colors:
  surface: '#f8faf7'
  surface-dim: '#d8dbd8'
  surface-bright: '#f8faf7'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f1'
  surface-container: '#eceeeb'
  surface-container-high: '#e7e9e6'
  surface-container-highest: '#e1e3e0'
  on-surface: '#191c1b'
  on-surface-variant: '#414844'
  inverse-surface: '#2e312f'
  inverse-on-surface: '#eff1ee'
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
  background: '#f8faf7'
  on-background: '#191c1b'
  surface-variant: '#e1e3e0'
  warm-ivory: '#F7F6F0'
  surface-secondary: '#ECEFEC'
  soft-green: '#E7EFE8'
  pale-green: '#DDEDE2'
  text-primary: '#202B25'
  text-secondary: '#78847C'
  border-subtle: '#E3EAE4'
  dark-background: '#18231E'
  dark-sidebar: '#1D2A23'
  dark-surface: '#26372E'
  dark-surface-secondary: '#202E27'
  dark-surface-elevated: '#304338'
  dark-primary: '#8FAF9A'
  dark-secondary: '#A9C5AF'
  dark-soft-green: '#354A3D'
  dark-text-primary: '#F1F4F0'
  dark-text-secondary: '#B1BDB4'
  dark-border: '#3B4B41'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 30px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 17px
    fontWeight: '600'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-medium:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 18px
  caption-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.25rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-tablet: 1.5rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
---

# Nestora Design System — Light & Dark Theme Specifications
**Product:** Nestora  
**Tagline:** One platform. Better shared living.  
**Style:** Soft & Friendly, Modern Premium SaaS  
**Font:** Plus Jakarta Sans  

## 1. Color Palette Tokens

### Light Theme
- `primary`: `#234B3A` (Primary Forest Green — Main actions & brand identity)
- `background`: `#F3F5F2` (Main background — Warm light grey/green, never pure white)
- `surface`: `#FFFFFF` (Cards and content panels)
- `surface-secondary`: `#ECEFEC` (Secondary surfaces, container headers)
- `warm-ivory`: `#F7F6F0` (Selected warm surfaces & subtle highlights)
- `secondary`: `#8FAF9A` (Sage Green — Secondary accents & pills)
- `soft-green`: `#E7EFE8` (Selected states & soft alert containers)
- `pale-green`: `#DDEDE2` (Subtle tint highlights)
- `accent`: `#D9A66F` (Warm Amber Accent — Highlights & financial accents)
- `text-primary`: `#202B25` (Main text — High contrast deep forest grey)
- `text-secondary`: `#78847C` (Muted labels, metadata, secondary copy)
- `border`: `#E3EAE4` (Subtle borders)

### Dark Theme
- `background`: `#18231E` (Deep green-tinted charcoal — Never flat black #000000)
- `surface-secondary`: `#202E27` (Secondary sections & container backgrounds)
- `sidebar`: `#1D2A23` (Sidebar navigation background)
- `surface`: `#26372E` (Cards, panels & interactive elements)
- `surface-elevated`: `#304338` (Dialogs, dropdowns & elevated cards)
- `primary`: `#8FAF9A` (Sage Green — Primary actions and accents)
- `secondary`: `#A9C5AF` (Soft mint accents)
- `soft-green`: `#354A3D` (Selected backgrounds & active pills)
- `accent`: `#D9A66F` (Warm amber highlights)
- `text-primary`: `#F1F4F0` (High contrast crisp warm white)
- `text-secondary`: `#B1BDB4` (Readable muted secondary text)
- `border`: `#3B4B41` (Subtle dark border)

## 2. Typography & Rhythm
- Font family: `Plus Jakarta Sans`, sans-serif
- Hierarchy:
  - Display / Greeting: 28px - 32px, font-bold, tracking-tight
  - Section Titles (H2): 20px - 22px, font-semibold
  - Card Titles (H3): 16px - 17px, font-semibold
  - Body & Form labels: 14px, font-medium / regular
  - Caption / Metadata: 12px - 13px, font-medium

## 3. UI Component Patterns
- Border radius: `rounded-2xl` (16px) for cards, `rounded-xl` (12px) for inner containers, `rounded-full` for badges & pills
- Shadows: Subtle layered ambient shadows (`shadow-sm` to `shadow-md` with green tint)
- Theme Switcher: Fixed in top utility header with Sun (Light) / Moon (Dark) toggle and persistence
- Navigation: Left persistent sidebar with Workspace selector (Buildings vs Living switch), active indicator with soft green background pill
- Modals & Drawers: Clean backdrop blur with role-based badges
