# Nestora Official Design System Specification (v3.0 - Backend Aligned)

## 1. Product Identity & Architecture
Nestora is a dual-purpose property and co-living SaaS platform:
- **Shared Core**: Auth, Workspaces, Role-based Access, Profiles, Appearance, Notifications, Audit Logs.
- **Nestora Living**: Co-living households, chore rotations, shared shopping lists, bills reminders, split expenses, internal debt records, and mutual settlement logs.
- **Nestora Buildings**: Multi-family buildings, units, residents & owners, ownership shares, common contributions & expenses, maintenance dispatch & service provider interventions, document repository, meetings & assembly voting, announcements.
- **Nestora Intelligence**: Supervised AI Copilot operating strictly on a 2-step human-in-the-loop workflow (`PROPOSED` → `APPROVED`/`REJECTED` → `EXECUTED`/`FAILED`). No autonomous mutation of financial or critical records.
- **Administration**: Platform-level tenant workspace fleet & global user directory.

**Core Financial Rule**: Nestora strictly records financial information and internal debt records. It **does not transfer money**, connect to banking APIs (no Stripe, Plaid, Chase), process auto-debits, or execute automated payment gateway operations. All settlements are internal records marked as `Pending`, `Recorded`, or `Confirmed`.

**Core Facility Rule**: Calendars track meetings, maintenance windows, and reminders. There are no automated amenity booking engines, smart lock/IoT hardware integrations, or RFID/NFC key systems.

---

## 2. Global Theming Engine

Theme selection is centralized **strictly and exclusively** under:
`Profile → Settings → Appearance`

Available options:
1. `Light` (Default)
2. `Dark`
3. `System Default` (Respects OS `prefers-color-scheme`)

No header-level theme toggles, page-level switches, or redundant mode controls exist on individual screens.

### Design Tokens

#### Light Theme
- Page Background: `#F3F5F2` (Soft warm grayish green)
- Secondary Background / Canvas: `#EAECE8`
- Surface / Cards: `#FFFFFF`
- Elevated Surface / Drawers / Modals: `#FFFFFF`
- Primary Brand Green: `#234B3A` (Deep forest emerald)
- Primary Container: `#E7EFE8` (Soft sage tint)
- Secondary Accent Green: `#8FAF9A`
- Pale Accent Green: `#DDEDE2`
- Warm Accent / Alert: `#D9A66F`
- Main Typography Text: `#202B25`
- Secondary / Muted Typography Text: `#78847C`
- Borders & Dividers: `#E3EAE4`
- Focus Ring: `rgba(35, 75, 58, 0.25)`

#### Dark Theme
- Page Background: `#18231E` (Deep twilight forest)
- Secondary Background / Canvas: `#202E27`
- Sidebar: `#1D2A23`
- Surface / Cards: `#26372E`
- Elevated Surface / Drawers / Modals: `#304338`
- Primary Brand Accent: `#8FAF9A`
- Primary Container: `#354A3D`
- Secondary Accent: `#A9C5AF`
- Warm Accent / Alert: `#D9A66F`
- Main Typography Text: `#F1F4F0`
- Secondary / Muted Typography Text: `#B1BDB4`
- Borders & Dividers: `#3B4B41`
- Focus Ring: `rgba(143, 175, 154, 0.35)`

---

## 3. Typography & UI Components
- Font Family: `Plus Jakarta Sans`, system-ui, -apple-system, sans-serif
- Corner Radii:
  - Cards: `12px` to `16px` (`rounded-xl` / `rounded-2xl`)
  - Badges & Buttons: `8px` (`rounded-lg`) or fully pill-shaped (`rounded-full`)
  - Modals & Floating Drawers: `16px` to `24px`
- Shadows:
  - Light mode: `0 1px 3px rgba(0,0,0,0.05)`, `0 4px 12px rgba(35, 75, 58, 0.04)`
  - Dark mode: `0 1px 3px rgba(0,0,0,0.25)`, `0 4px 16px rgba(0, 0, 0, 0.35)`
