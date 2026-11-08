---
name: Serene Forest Architectural
colors:
  surface: '#F8FAF7'
  surface-dim: '#D8DBD8'
  surface-bright: '#F8FAF7'
  surface-container-lowest: '#FFFFFF'
  surface-container-low: '#F2F4F1'
  surface-container: '#ECEEEB'
  surface-container-high: '#E6E8E5'
  surface-container-highest: '#E0E3E0'
  on-surface: '#181C1A'
  on-surface-variant: '#404943'
  inverse-surface: '#2e312f'
  inverse-on-surface: '#eff1ee'
  outline: '#707973'
  outline-variant: '#BFC9C1'
  surface-tint: '#3e6654'
  primary: '#093425'
  on-primary: '#FFFFFF'
  primary-container: '#E7EFE8'
  on-primary-container: '#202B25'
  inverse-primary: '#a5d0ba'
  secondary: '#4d6357'
  on-secondary: '#FFFFFF'
  secondary-container: '#CFE9D9'
  on-secondary-container: '#0A1F16'
  tertiary: '#033240'
  on-tertiary: '#FFFFFF'
  tertiary-container: '#C1E8FB'
  on-tertiary-container: '#001F2A'
  error: '#BA1A1A'
  on-error: '#FFFFFF'
  error-container: '#FFDAD6'
  on-error-container: '#410002'
  primary-fixed: '#c0ecd5'
  primary-fixed-dim: '#a5d0ba'
  on-primary-fixed: '#002115'
  on-primary-fixed-variant: '#264e3d'
  secondary-fixed: '#d0e8d9'
  secondary-fixed-dim: '#b4ccbd'
  on-secondary-fixed: '#0a1f16'
  on-secondary-fixed-variant: '#364b40'
  tertiary-fixed: '#c1e8fb'
  tertiary-fixed-dim: '#a5ccdf'
  on-tertiary-fixed: '#001f29'
  on-tertiary-fixed-variant: '#244c5b'
  background: '#f8faf7'
  on-background: '#191c1b'
  surface-variant: '#e1e3e0'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 3.5rem
    fontWeight: '700'
    lineHeight: 4rem
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 2.25rem
    fontWeight: '700'
    lineHeight: 2.75rem
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.75rem
    fontWeight: '700'
    lineHeight: 2.25rem
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.75rem
    fontWeight: '700'
    lineHeight: 2.25rem
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.25rem
    fontWeight: '600'
    lineHeight: 1.75rem
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 1rem
    fontWeight: '600'
    lineHeight: 1.5rem
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: 1.75rem
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.9375rem
    fontWeight: '400'
    lineHeight: 1.5rem
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.8125rem
    fontWeight: '400'
    lineHeight: 1.25rem
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.875rem
    fontWeight: '600'
    lineHeight: 1.25rem
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.75rem
    fontWeight: '600'
    lineHeight: 1rem
    letterSpacing: 0.02em
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
  space-xl: 2.5rem
---

---
name: Nestora Official Unified Design System
colors:
  primary: '#234B3A'
  primary-container: '#E7EFE8'
  on-primary: '#FFFFFF'
  on-primary-container: '#202B25'
  surface: '#F8FAF7'
  surface-dim: '#D8DBD8'
  surface-bright: '#F8FAF7'
  surface-container-lowest: '#FFFFFF'
  surface-container-low: '#F2F4F1'
  surface-container: '#ECEEEB'
  surface-container-high: '#E6E8E5'
  surface-container-highest: '#E0E3E0'
  on-surface: '#181C1A'
  on-surface-variant: '#404943'
  outline: '#707973'
  outline-variant: '#BFC9C1'
  secondary: '#4D6357'
  secondary-container: '#CFE9D9'
  on-secondary: '#FFFFFF'
  on-secondary-container: '#0A1F16'
  tertiary: '#3D6373'
  tertiary-container: '#C1E8FB'
  on-tertiary: '#FFFFFF'
  on-tertiary-container: '#001F2A'
  error: '#BA1A1A'
  error-container: '#FFDAD6'
  on-error: '#FFFFFF'
  on-error-container: '#410002'
typography:
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif
  headings:
    font-family: 'Plus Jakarta Sans', system-ui, sans-serif
    font-weight: 700
  body:
    font-family: 'Plus Jakarta Sans', system-ui, sans-serif
    font-weight: 400
theme:
  mode: 'system'
  theme_location: 'Profile → Settings → Appearance (Light, Dark, System Default)'
  header_toggles: false
backend_alignment:
  payments: 'Internal record-keeping only. No Stripe, Plaid, or bank payment processing.'
  reservations: 'Internal schedule and meeting calendar only. No IoT lock dispatch or automated fee gateways.'
  ai: 'Draft proposal and explicit user approval workflow. No autonomous background execution.'
---
# Nestora Unified Design System

## Global Theme Policy
- Theme selection is strictly centralized under **Profile → Settings → Appearance**.
- All top headers and individual page toggles are removed.
- Light, Dark, and System Default options cascade globally via standard CSS variables.

## Backend Compatibility Contract
- **Financials**: Internal records, ledger calculations, expense splitting, and manual settlement confirmation. No external gateway or payment processing integrations.
- **Access & Keys**: Manual contact info and badge/pass logging; no automated NFC hardware or biometric IoT gateways.
- **AI Copilot**: 2-step proposed action review (AI drafts proposal -> User reviews delta -> Explicit User Approval -> Server-side permission execution).
