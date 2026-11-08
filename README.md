# NESTORA — Shared Living & Building Management Frontend

> **One platform. Better shared living.**

Nestora unites co-living households, multi-family condominium communities, supervised operational intelligence, and platform administration into a cohesive, responsive web application.

---

## 1. Architectural Architecture & Stack

- **Framework**: React 19 + Vite 8 + TypeScript
- **Styling**: Tailwind CSS v4 + Plus Jakarta Sans typography + Custom Design Tokens
- **Routing**: React Router (`createBrowserRouter`) with persistent layouts
- **Icons**: Lucide React
- **Data Layer**: Centralized typed state repository with local session persistence (`DataContext.tsx`)
- **Theme Engine**: Centralized under `Profile → Settings → Appearance` strictly supporting `Light`, `Dark`, and `System Default` (syncing with `prefers-color-scheme`)

---

## 2. Final Screen Inventory

The application contains **exactly 36 application screens + 1 separate Appearance settings screen** (37 total routes):

### A. Shared Core (8 Application Screens)
1. `/auth/login` — Authentication: Sign In
2. `/auth/register` — Tenant Registration & Onboarding Flow
3. `/auth/forgot-password` — Password Reset & Security Recovery
4. `/workspaces` — Workspace Selection & Fleet Hub Management
5. `/workspace/members` — Workspace Members, Roles & Permissions
6. `/notifications` — Notifications Center & Activity Stream
7. `/audit-logs` — Global Audit Logs & Compliance Forensic Inspector
8. `/profile` — User Profile & Account Settings *(Identified missing 36th application screen)*

### B. Nestora Living (12 Application Screens)
9. `/living` — Shared Household Living Dashboard
10. `/living/members` — Roommates & Members Profile Roster
11. `/living/rules` — Household Rules & Community Agreement
12. `/living/expenses` — Shared Expenses & Splits Ledger (Equal, Percentage, Exact Splits)
13. `/living/debts` — Debts, Balances & Internal Settlement Hub
14. `/living/tasks` — Tasks, Chores & Rotation Rules
15. `/living/shopping` — Shared Shopping Lists & Pantry Restocking
16. `/living/bills` — Bills & Recurring Calendar Reminders
17. `/living/budgets` — Household Budgets & Financial Analytics
18. `/living/maintenance` — Household Maintenance & Landlord Dispatch Flow
19. `/living/amenities` — Multi-Household Shared Facilities Hub
20. `/living/guests` — Courtesy Visitor Passes & Sublet Onboarding

### C. Nestora Buildings (11 Application Screens)
21. `/buildings` — Buildings Management Master Dashboard
22. `/buildings/units` — Buildings & Units Management
23. `/buildings/residents` — Residents, Owners & Occupancy Directory
24. `/buildings/contributions` — Common Contributions & Assessment Dues
25. `/buildings/maintenance` — Maintenance Dispatch Center
26. `/buildings/providers` — Service Providers & Certified Vendor Directory
27. `/buildings/calendar` — Master Calendar & Event Hub
28. `/buildings/documents` — Documents & Legal Repository
29. `/buildings/announcements` — Announcements & Community Notices
30. `/buildings/meetings` — Owners Assembly & Digital Voting Hub
31. `/buildings/reports` — Financial Reports, Reserve Studies & Budget Forecasting

### D. Platform Administration (3 Application Screens)
32. `/admin/monitoring` — Platform System Monitoring Console
33. `/admin/tenants` — Platform Tenant Fleet Management
34. `/admin/users` — Global User Directory & IAM Console

### E. Nestora Intelligence (2 Application Screens)
35. `/intelligence` — AI Assistant Copilot Command Center
36. `/intelligence/actions` — Proposed Action Preview & 2-Step Approval Hub

### F. Separate Appearance Screen (1 Screen, excluded from 36 count)
+1. `/settings/appearance` — Centralized Global Appearance Settings (`Light` / `Dark` / `System Default`)

---

## 3. User Story Coverage Matrix (41 Stories)

| # | User Story Description | Implemented Screen / Flow | Status |
|---|---|---|---|
| US-01 | User can log in with demo credentials | `/auth/login` | Verified |
| US-02 | New tenant can register household & workspace | `/auth/register` | Verified |
| US-03 | User can request password reset link | `/auth/forgot-password` | Verified |
| US-04 | User can switch active workspaces | `/workspaces`, Header Switcher | Verified |
| US-05 | Manager can create new living or building workspace | `/workspaces` modal | Verified |
| US-06 | Manager can invite new members with specific roles | `/workspace/members` modal | Verified |
| US-07 | Manager can reassign roles across members | `/workspace/members` role select | Verified |
| US-08 | User can view global notification stream & filter categories | `/notifications` | Verified |
| US-09 | User can mark individual or all notifications read | `/notifications` action | Verified |
| US-10 | Auditor can search and filter compliance audit logs | `/audit-logs` | Verified |
| US-11 | User can export audit logs in JSON format | `/audit-logs` export action | Verified |
| US-12 | User can edit personal profile and emergency contact | `/profile` | Verified |
| US-13 | User can toggle notification delivery preferences | `/profile` checkboxes | Verified |
| US-14 | User can switch theme between Light, Dark, System | `/settings/appearance` | Verified |
| US-15 | User can inspect design token color swatches | `/settings/appearance` | Verified |
| US-16 | Roommate can view household chore summary & stats | `/living` | Verified |
| US-17 | Roommate can see active pantry shortage items | `/living` | Verified |
| US-18 | Roommate can browse room assignments and points | `/living/members` | Verified |
| US-19 | Roommate can view house rules and sign agreement | `/living/rules` | Verified |
| US-20 | Roommate can propose new co-living house rule | `/living/rules` modal | Verified |
| US-21 | Roommate can log shared grocery/utility expense | `/living/expenses` modal | Verified |
| US-22 | System calculates equal/percentage splits per person | `/living/expenses` calculation | Verified |
| US-23 | Roommate can inspect net owes/owed balances | `/living/debts` | Verified |
| US-24 | Roommate can record mutual offline settlement | `/living/debts` modal | Verified |
| US-25 | Recipient can confirm settlement receipt | `/living/debts` confirmation | Verified |
| US-26 | Roommate can mark completed chores & claim points | `/living/tasks` | Verified |
| US-27 | Roommate can schedule new chore with rotation frequency | `/living/tasks` modal | Verified |
| US-28 | Roommate can check off restocked shopping items | `/living/shopping` | Verified |
| US-29 | Roommate can add urgent grocery pantry items | `/living/shopping` modal | Verified |
| US-30 | Roommate can track upcoming recurring bills & due dates | `/living/bills` | Verified |
| US-31 | Roommate can mark recurring bills paid | `/living/bills` action | Verified |
| US-32 | Roommates can review category budget caps & trajectory | `/living/budgets` | Verified |
| US-33 | Roommate can submit maintenance dispatch to landlord | `/living/maintenance` modal | Verified |
| US-34 | Roommate can view shared facilities guidelines & hours | `/living/amenities` | Verified |
| US-35 | Roommate can issue guest pass for overnight visitor | `/living/guests` modal | Verified |
| US-36 | Building manager can inspect occupancy & reserve KPIs | `/buildings` | Verified |
| US-37 | Manager can register and view condominium units | `/buildings/units` modal | Verified |
| US-38 | Manager can manage owner deed roster & parking stalls | `/buildings/residents` | Verified |
| US-39 | Manager can record monthly common contribution payment | `/buildings/contributions` action | Verified |
| US-40 | Manager can dispatch building repairs to vendors | `/buildings/maintenance` modal | Verified |
| US-41 | Owners can cast digital assembly ballots (FOR/AGAINST) | `/buildings/meetings` ballot | Verified |

---

## 4. Features Intentionally Left Unconnected (Frontend Demo Mode)

Per strict specifications in Section 9:
- **No external financial integrations**: No Stripe, Stripe Connect, Plaid, Chase Treasury, ACH payment links, or automatic bank debits. All financial adjustments are recorded in the internal ledger as `RECORDED` or `CONFIRMED`.
- **No physical access hardware**: No IoT smart locks, RFID badges, or Brivo/Schlage hardware connections.
- **No autonomous AI execution**: All AI proposals strictly follow the supervised 2-step approval workflow (`PROPOSED` → `APPROVED`/`REJECTED` → `EXECUTED`/`FAILED`).

---

## 5. Development & Build Verification

```bash
# Start development server
npm run dev

# TypeScript type check (zero errors)
npm run lint

# Production bundle build
npm run build
```
