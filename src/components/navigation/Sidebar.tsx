import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Home,
  Building2,
  Users,
  Receipt,
  Scale,
  CheckSquare,
  ShoppingCart,
  CalendarDays,
  PieChart,
  Wrench,
  KeyRound,
  ShieldAlert,
  Sparkles,
  CheckCircle2,
  FolderLock,
  Megaphone,
  Vote,
  FileSpreadsheet,
  Activity,
  Server,
  Layers,
  Bell,
  SlidersHorizontal,
  ChevronDown,
  ChevronRight,
  UserCheck,
  Building,
  UserCircle,
  HelpCircle,
  Lock,
} from 'lucide-react';
import { WorkspaceSwitcher } from './WorkspaceSwitcher';
import { useData } from '../../contexts/DataContext';

interface SidebarProps {
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onCloseMobile }) => {
  const { activeWorkspace, proposedActions, notifications } = useData();
  const location = useLocation();

  // Collapsible sections
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    living: true,
    buildings: true,
    intelligence: true,
    admin: false,
    core: true,
  });

  const toggleSection = (sec: string) => {
    setOpenSections((prev) => ({ ...prev, [sec]: !prev[sec] }));
  };

  const pendingApprovalsCount = proposedActions.filter((a) => a.status === 'PROPOSED').length;
  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
      isActive
        ? 'bg-[#234B3A] text-white font-semibold shadow-sm dark:bg-[#8FAF9A] dark:text-[#18231E]'
        : 'text-[#78847C] dark:text-[#B1BDB4] hover:bg-black/5 dark:hover:bg-white/5 hover:text-[#202B25] dark:hover:text-[#F1F4F0]'
    }`;

  return (
    <aside className="w-64 h-full flex flex-col bg-white dark:bg-[#1D2A23] border-r border-[#E3EAE4] dark:border-[#354A3D] select-none">
      {/* Brand Header */}
      <div className="p-4 border-b border-[#E3EAE4] dark:border-[#354A3D] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#234B3A] dark:bg-[#8FAF9A] flex items-center justify-center text-white dark:text-[#18231E] font-extrabold text-base shadow-sm">
            N
          </div>
          <div>
            <h1 className="font-extrabold text-base tracking-tight text-[#202B25] dark:text-[#F1F4F0] leading-none">
              NESTORA
            </h1>
            <p className="text-[10px] text-[#78847C] dark:text-[#B1BDB4] tracking-wider uppercase font-medium mt-0.5">
              Shared Living Platform
            </p>
          </div>
        </div>
      </div>

      {/* Workspace Switcher */}
      <div className="p-3 border-b border-[#E3EAE4] dark:border-[#354A3D]">
        <WorkspaceSwitcher />
      </div>

      {/* Navigation Links Scrollable Area */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {/* NESTORA LIVING SECTION */}
        <div>
          <button
            onClick={() => toggleSection('living')}
            className="w-full flex items-center justify-between px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-[#78847C] dark:text-[#B1BDB4] hover:text-[#202B25] dark:hover:text-[#F1F4F0] transition-colors"
          >
            <div className="flex items-center gap-1.5">
              <Home className="w-3.5 h-3.5 text-[#234B3A] dark:text-[#8FAF9A]" />
              <span>Nestora Living</span>
            </div>
            {openSections.living ? (
              <ChevronDown className="w-3.5 h-3.5" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5" />
            )}
          </button>

          {openSections.living && (
            <div className="mt-1.5 space-y-0.5" onClick={onCloseMobile}>
              <NavLink to="/living" end className={navLinkClass}>
                <Home className="w-4 h-4 shrink-0" />
                <span>Household Dashboard</span>
              </NavLink>
              <NavLink to="/living/members" className={navLinkClass}>
                <Users className="w-4 h-4 shrink-0" />
                <span>Roommates & Roster</span>
              </NavLink>
              <NavLink to="/living/expenses" className={navLinkClass}>
                <Receipt className="w-4 h-4 shrink-0" />
                <span>Expenses & Splits</span>
              </NavLink>
              <NavLink to="/living/debts" className={navLinkClass}>
                <Scale className="w-4 h-4 shrink-0" />
                <span>Debts & Settlements</span>
              </NavLink>
              <NavLink to="/living/tasks" className={navLinkClass}>
                <CheckSquare className="w-4 h-4 shrink-0" />
                <span>Tasks & Chores</span>
              </NavLink>
              <NavLink to="/living/shopping" className={navLinkClass}>
                <ShoppingCart className="w-4 h-4 shrink-0" />
                <span>Shopping & Pantry</span>
              </NavLink>
              <NavLink to="/living/bills" className={navLinkClass}>
                <CalendarDays className="w-4 h-4 shrink-0" />
                <span>Bills & Reminders</span>
              </NavLink>
              <NavLink to="/living/budgets" className={navLinkClass}>
                <PieChart className="w-4 h-4 shrink-0" />
                <span>Household Budgets</span>
              </NavLink>
              <NavLink to="/living/maintenance" className={navLinkClass}>
                <Wrench className="w-4 h-4 shrink-0" />
                <span>Landlord Dispatch</span>
              </NavLink>
              <NavLink to="/living/amenities" className={navLinkClass}>
                <Layers className="w-4 h-4 shrink-0" />
                <span>Shared Facilities</span>
              </NavLink>
              <NavLink to="/living/guests" className={navLinkClass}>
                <KeyRound className="w-4 h-4 shrink-0" />
                <span>Roommate Onboarding</span>
              </NavLink>
              <NavLink to="/living/rules" className={navLinkClass}>
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>House Rules</span>
              </NavLink>
            </div>
          )}
        </div>

        {/* NESTORA BUILDINGS SECTION */}
        <div>
          <button
            onClick={() => toggleSection('buildings')}
            className="w-full flex items-center justify-between px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-[#78847C] dark:text-[#B1BDB4] hover:text-[#202B25] dark:hover:text-[#F1F4F0] transition-colors"
          >
            <div className="flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-[#234B3A] dark:text-[#8FAF9A]" />
              <span>Nestora Buildings</span>
            </div>
            {openSections.buildings ? (
              <ChevronDown className="w-3.5 h-3.5" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5" />
            )}
          </button>

          {openSections.buildings && (
            <div className="mt-1.5 space-y-0.5" onClick={onCloseMobile}>
              <NavLink to="/buildings" end className={navLinkClass}>
                <Building2 className="w-4 h-4 shrink-0" />
                <span>Buildings Dashboard</span>
              </NavLink>
              <NavLink to="/buildings/units" className={navLinkClass}>
                <Building className="w-4 h-4 shrink-0" />
                <span>Units & Apartments</span>
              </NavLink>
              <NavLink to="/buildings/residents" className={navLinkClass}>
                <UserCheck className="w-4 h-4 shrink-0" />
                <span>Residents & Owners</span>
              </NavLink>
              <NavLink to="/buildings/contributions" className={navLinkClass}>
                <Receipt className="w-4 h-4 shrink-0" />
                <span>Common Contributions</span>
              </NavLink>
              <NavLink to="/buildings/maintenance" className={navLinkClass}>
                <Wrench className="w-4 h-4 shrink-0" />
                <span>Maintenance Dispatch</span>
              </NavLink>
              <NavLink to="/buildings/providers" className={navLinkClass}>
                <Users className="w-4 h-4 shrink-0" />
                <span>Service Providers</span>
              </NavLink>
              <NavLink to="/buildings/calendar" className={navLinkClass}>
                <CalendarDays className="w-4 h-4 shrink-0" />
                <span>Master Calendar</span>
              </NavLink>
              <NavLink to="/buildings/documents" className={navLinkClass}>
                <FolderLock className="w-4 h-4 shrink-0" />
                <span>Documents & Legal</span>
              </NavLink>
              <NavLink to="/buildings/announcements" className={navLinkClass}>
                <Megaphone className="w-4 h-4 shrink-0" />
                <span>Announcements</span>
              </NavLink>
              <NavLink to="/buildings/meetings" className={navLinkClass}>
                <Vote className="w-4 h-4 shrink-0" />
                <span>Assembly & Voting</span>
              </NavLink>
              <NavLink to="/buildings/reports" className={navLinkClass}>
                <FileSpreadsheet className="w-4 h-4 shrink-0" />
                <span>Financial Reports</span>
              </NavLink>
            </div>
          )}
        </div>

        {/* NESTORA INTELLIGENCE SECTION */}
        <div>
          <button
            onClick={() => toggleSection('intelligence')}
            className="w-full flex items-center justify-between px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-[#78847C] dark:text-[#B1BDB4] hover:text-[#202B25] dark:hover:text-[#F1F4F0] transition-colors"
          >
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#D9A66F]" />
              <span>Nestora Intelligence</span>
            </div>
            {openSections.intelligence ? (
              <ChevronDown className="w-3.5 h-3.5" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5" />
            )}
          </button>

          {openSections.intelligence && (
            <div className="mt-1.5 space-y-0.5" onClick={onCloseMobile}>
              <NavLink to="/intelligence" end className={navLinkClass}>
                <Sparkles className="w-4 h-4 shrink-0 text-[#D9A66F]" />
                <span>Copilot Command Center</span>
              </NavLink>
              <NavLink to="/intelligence/actions" className={navLinkClass}>
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span className="flex-1">2-Step Action Approvals</span>
                {pendingApprovalsCount > 0 && (
                  <span className="text-[10px] font-bold bg-[#D9A66F] text-[#202B25] px-1.5 py-0.2 rounded-full">
                    {pendingApprovalsCount}
                  </span>
                )}
              </NavLink>
            </div>
          )}
        </div>

        {/* PLATFORM ADMINISTRATION SECTION */}
        <div>
          <button
            onClick={() => toggleSection('admin')}
            className="w-full flex items-center justify-between px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-[#78847C] dark:text-[#B1BDB4] hover:text-[#202B25] dark:hover:text-[#F1F4F0] transition-colors"
          >
            <div className="flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-[#234B3A] dark:text-[#8FAF9A]" />
              <span>Platform Admin</span>
            </div>
            {openSections.admin ? (
              <ChevronDown className="w-3.5 h-3.5" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5" />
            )}
          </button>

          {openSections.admin && (
            <div className="mt-1.5 space-y-0.5" onClick={onCloseMobile}>
              <NavLink to="/admin/monitoring" className={navLinkClass}>
                <Activity className="w-4 h-4 shrink-0" />
                <span>System Monitoring</span>
              </NavLink>
              <NavLink to="/admin/tenants" className={navLinkClass}>
                <Server className="w-4 h-4 shrink-0" />
                <span>Tenant Fleet</span>
              </NavLink>
              <NavLink to="/admin/users" className={navLinkClass}>
                <UserCircle className="w-4 h-4 shrink-0" />
                <span>Global User Directory</span>
              </NavLink>
            </div>
          )}
        </div>

        {/* SHARED CORE & SETTINGS */}
        <div>
          <button
            onClick={() => toggleSection('core')}
            className="w-full flex items-center justify-between px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-[#78847C] dark:text-[#B1BDB4] hover:text-[#202B25] dark:hover:text-[#F1F4F0] transition-colors"
          >
            <div className="flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#234B3A] dark:text-[#8FAF9A]" />
              <span>Shared Core</span>
            </div>
            {openSections.core ? (
              <ChevronDown className="w-3.5 h-3.5" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5" />
            )}
          </button>

          {openSections.core && (
            <div className="mt-1.5 space-y-0.5" onClick={onCloseMobile}>
              <NavLink to="/workspaces" className={navLinkClass}>
                <Layers className="w-4 h-4 shrink-0" />
                <span>Workspaces Hub</span>
              </NavLink>
              <NavLink to="/workspace/members" className={navLinkClass}>
                <Users className="w-4 h-4 shrink-0" />
                <span>Members & Roles</span>
              </NavLink>
              <NavLink to="/notifications" className={navLinkClass}>
                <Bell className="w-4 h-4 shrink-0" />
                <span className="flex-1">Notification Center</span>
                {unreadNotificationsCount > 0 && (
                  <span className="text-[10px] font-bold bg-[#234B3A] text-white dark:bg-[#8FAF9A] dark:text-[#18231E] px-1.5 py-0.2 rounded-full">
                    {unreadNotificationsCount}
                  </span>
                )}
              </NavLink>
              <NavLink to="/audit-logs" className={navLinkClass}>
                <Lock className="w-4 h-4 shrink-0" />
                <span>Audit & Forensic Logs</span>
              </NavLink>
              <NavLink to="/profile" className={navLinkClass}>
                <UserCircle className="w-4 h-4 shrink-0" />
                <span>Profile & Account</span>
              </NavLink>
            </div>
          )}
        </div>
      </div>

      {/* Footer System Status Notice */}
      <div className="p-3 border-t border-[#E3EAE4] dark:border-[#354A3D] bg-[#F3F5F2]/40 dark:bg-[#18231E]/40">
        <div className="flex items-center justify-between text-[11px] text-[#78847C] dark:text-[#B1BDB4]">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-medium">Frontend Demo Mode</span>
          </div>
          <span className="font-mono text-[10px]">v3.0-RC</span>
        </div>
      </div>
    </aside>
  );
};
