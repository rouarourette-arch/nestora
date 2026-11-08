import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppLayout } from '../layouts/AppLayout';
import { AuthLayout } from '../layouts/AuthLayout';

// Shared Core Pages
import { SignInPage } from '../pages/shared-core/SignInPage';
import { RegisterPage } from '../pages/shared-core/RegisterPage';
import { PasswordResetPage } from '../pages/shared-core/PasswordResetPage';
import { WorkspaceSelectionPage } from '../pages/shared-core/WorkspaceSelectionPage';
import { WorkspaceMembersPage } from '../pages/shared-core/WorkspaceMembersPage';
import { NotificationsPage } from '../pages/shared-core/NotificationsPage';
import { AuditLogsPage } from '../pages/shared-core/AuditLogsPage';
import { UserProfilePage } from '../pages/shared-core/UserProfilePage';
import { AppearancePage } from '../pages/shared-core/AppearancePage';

// Nestora Living Pages
import { LivingDashboardPage } from '../pages/living/LivingDashboardPage';
import { LivingMembersPage } from '../pages/living/LivingMembersPage';
import { LivingRulesPage } from '../pages/living/LivingRulesPage';
import { LivingExpensesPage } from '../pages/living/LivingExpensesPage';
import { LivingDebtsPage } from '../pages/living/LivingDebtsPage';
import { LivingTasksPage } from '../pages/living/LivingTasksPage';
import { LivingShoppingPage } from '../pages/living/LivingShoppingPage';
import { LivingBillsPage } from '../pages/living/LivingBillsPage';
import { LivingBudgetsPage } from '../pages/living/LivingBudgetsPage';
import { LivingMaintenancePage } from '../pages/living/LivingMaintenancePage';
import { LivingAmenitiesPage } from '../pages/living/LivingAmenitiesPage';
import { LivingGuestsPage } from '../pages/living/LivingGuestsPage';

// Nestora Buildings Pages
import { BuildingsDashboardPage } from '../pages/buildings/BuildingsDashboardPage';
import { BuildingsUnitsPage } from '../pages/buildings/BuildingsUnitsPage';
import { BuildingsResidentsPage } from '../pages/buildings/BuildingsResidentsPage';
import { BuildingsContributionsPage } from '../pages/buildings/BuildingsContributionsPage';
import { BuildingsMaintenancePage } from '../pages/buildings/BuildingsMaintenancePage';
import { BuildingsProvidersPage } from '../pages/buildings/BuildingsProvidersPage';
import { BuildingsCalendarPage } from '../pages/buildings/BuildingsCalendarPage';
import { BuildingsDocumentsPage } from '../pages/buildings/BuildingsDocumentsPage';
import { BuildingsAnnouncementsPage } from '../pages/buildings/BuildingsAnnouncementsPage';
import { BuildingsMeetingsPage } from '../pages/buildings/BuildingsMeetingsPage';
import { BuildingsReportsPage } from '../pages/buildings/BuildingsReportsPage';

// Platform Administration Pages
import { AdminMonitoringPage } from '../pages/administration/AdminMonitoringPage';
import { AdminTenantsPage } from '../pages/administration/AdminTenantsPage';
import { AdminUsersPage } from '../pages/administration/AdminUsersPage';

// Nestora Intelligence Pages
import { IntelligenceCopilotPage } from '../pages/intelligence/IntelligenceCopilotPage';
import { IntelligenceActionsPage } from '../pages/intelligence/IntelligenceActionsPage';

export const router = createBrowserRouter([
  // Auth Layout Routes
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <SignInPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'forgot-password', element: <PasswordResetPage /> },
      { index: true, element: <Navigate to="/auth/login" replace /> },
    ],
  },

  // Main Authenticated App Layout Routes
  {
    path: '/',
    element: <AppLayout />,
    children: [
      // Default to Living Dashboard
      { index: true, element: <Navigate to="/living" replace /> },

      // Shared Core Routes
      { path: 'workspaces', element: <WorkspaceSelectionPage /> },
      { path: 'workspace/members', element: <WorkspaceMembersPage /> },
      { path: 'notifications', element: <NotificationsPage /> },
      { path: 'audit-logs', element: <AuditLogsPage /> },
      { path: 'profile', element: <UserProfilePage /> },
      { path: 'settings/appearance', element: <AppearancePage /> },

      // Nestora Living Routes
      { path: 'living', element: <LivingDashboardPage /> },
      { path: 'living/members', element: <LivingMembersPage /> },
      { path: 'living/rules', element: <LivingRulesPage /> },
      { path: 'living/expenses', element: <LivingExpensesPage /> },
      { path: 'living/debts', element: <LivingDebtsPage /> },
      { path: 'living/tasks', element: <LivingTasksPage /> },
      { path: 'living/shopping', element: <LivingShoppingPage /> },
      { path: 'living/bills', element: <LivingBillsPage /> },
      { path: 'living/budgets', element: <LivingBudgetsPage /> },
      { path: 'living/maintenance', element: <LivingMaintenancePage /> },
      { path: 'living/amenities', element: <LivingAmenitiesPage /> },
      { path: 'living/guests', element: <LivingGuestsPage /> },

      // Nestora Buildings Routes
      { path: 'buildings', element: <BuildingsDashboardPage /> },
      { path: 'buildings/units', element: <BuildingsUnitsPage /> },
      { path: 'buildings/residents', element: <BuildingsResidentsPage /> },
      { path: 'buildings/contributions', element: <BuildingsContributionsPage /> },
      { path: 'buildings/maintenance', element: <BuildingsMaintenancePage /> },
      { path: 'buildings/providers', element: <BuildingsProvidersPage /> },
      { path: 'buildings/calendar', element: <BuildingsCalendarPage /> },
      { path: 'buildings/documents', element: <BuildingsDocumentsPage /> },
      { path: 'buildings/announcements', element: <BuildingsAnnouncementsPage /> },
      { path: 'buildings/meetings', element: <BuildingsMeetingsPage /> },
      { path: 'buildings/reports', element: <BuildingsReportsPage /> },

      // Platform Administration Routes
      { path: 'admin/monitoring', element: <AdminMonitoringPage /> },
      { path: 'admin/tenants', element: <AdminTenantsPage /> },
      { path: 'admin/users', element: <AdminUsersPage /> },

      // Nestora Intelligence Routes
      { path: 'intelligence', element: <IntelligenceCopilotPage /> },
      { path: 'intelligence/actions', element: <IntelligenceActionsPage /> },

      // Catch-all
      { path: '*', element: <Navigate to="/living" replace /> },
    ],
  },
]);
