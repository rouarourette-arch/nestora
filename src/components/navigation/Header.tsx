import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Menu,
  Bell,
  Sparkles,
  User as UserIcon,
  Palette,
  LogOut,
  ChevronDown,
  Shield,
  Check,
} from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../types';

interface HeaderProps {
  onOpenMobileMenu: () => void;
}

const ROLES: { id: UserRole; label: string }[] = [
  { id: 'WORKSPACE_MANAGER', label: 'Workspace Manager' },
  { id: 'WORKSPACE_OWNER', label: 'Workspace Owner' },
  { id: 'RESIDENT', label: 'Resident' },
  { id: 'ROOMMATE', label: 'Roommate' },
  { id: 'PLATFORM_ADMIN', label: 'Platform Admin' },
  { id: 'PROVIDER', label: 'Service Provider' },
];

export const Header: React.FC<HeaderProps> = ({ onOpenMobileMenu }) => {
  const { currentUser, setUserRole, notifications, activeWorkspace } = useData();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isRoleOpen, setIsRoleOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);

  const unreadNotifications = notifications.filter((n) => !n.read);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
      if (roleRef.current && !roleRef.current.contains(e.target as Node)) {
        setIsRoleOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-16 px-4 sm:px-6 bg-white dark:bg-[#1D2A23] border-b border-[#E3EAE4] dark:border-[#354A3D] flex items-center justify-between z-30 select-none">
      {/* Left: Mobile trigger & Contextual Path */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-xl text-[#78847C] dark:text-[#B1BDB4] hover:bg-black/5 dark:hover:bg-white/5"
          aria-label="Open sidebar navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2 text-xs">
          <span className="font-semibold text-[#202B25] dark:text-[#F1F4F0]">
            {activeWorkspace.name}
          </span>
          <span className="text-[#78847C] dark:text-[#B1BDB4]">/</span>
          <span className="text-[#78847C] dark:text-[#B1BDB4] capitalize">
            {location.pathname.replace(/^\//, '').split('/')[0] || 'Dashboard'}
          </span>
        </div>
      </div>

      {/* Right Controls: Role Switcher, Copilot, Notifications, Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Role Switcher Pill (Preview QA helper) */}
        <div className="relative" ref={roleRef}>
          <button
            onClick={() => setIsRoleOpen(!isRoleOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-[#E3EAE4] dark:border-[#354A3D] bg-[#F3F5F2] dark:bg-[#26372E] text-xs font-medium text-[#202B25] dark:text-[#F1F4F0] hover:bg-[#EAECE8] dark:hover:bg-[#304338] transition-colors"
            title="Switch demo preview role"
          >
            <Shield className="w-3.5 h-3.5 text-[#234B3A] dark:text-[#8FAF9A]" />
            <span className="hidden md:inline font-semibold">Role:</span>
            <span className="text-[#234B3A] dark:text-[#8FAF9A] font-semibold">
              {currentUser.role.replace('_', ' ')}
            </span>
            <ChevronDown className="w-3 h-3 text-[#78847C] dark:text-[#B1BDB4]" />
          </button>

          {isRoleOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-[#26372E] border border-[#E3EAE4] dark:border-[#354A3D] rounded-xl shadow-xl z-50 p-1 animate-in fade-in">
              <div className="px-2 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#78847C] dark:text-[#B1BDB4]">
                Preview Role Access
              </div>
              {ROLES.map((r) => (
                <button
                  key={r.id}
                  onClick={() => {
                    setUserRole(r.id);
                    setIsRoleOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                    currentUser.role === r.id
                      ? 'bg-[#E7EFE8] text-[#234B3A] dark:bg-[#354A3D] dark:text-[#8FAF9A] font-semibold'
                      : 'text-[#202B25] dark:text-[#F1F4F0] hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  <span>{r.label}</span>
                  {currentUser.role === r.id && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Intelligence Quick Access */}
        <button
          onClick={() => navigate('/intelligence')}
          className="p-2 rounded-xl text-[#78847C] dark:text-[#B1BDB4] hover:text-[#234B3A] dark:hover:text-[#8FAF9A] hover:bg-black/5 dark:hover:bg-white/5 transition-colors relative"
          title="Nestora Intelligence Copilot"
        >
          <Sparkles className="w-5 h-5 text-[#D9A66F]" />
        </button>

        {/* Notification Bell */}
        <button
          onClick={() => navigate('/notifications')}
          className="p-2 rounded-xl text-[#78847C] dark:text-[#B1BDB4] hover:text-[#202B25] dark:hover:text-[#F1F4F0] hover:bg-black/5 dark:hover:bg-white/5 transition-colors relative"
          title="Notification Center"
        >
          <Bell className="w-5 h-5" />
          {unreadNotifications.length > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500" />
          )}
        </button>

        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 p-1 pl-1.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            <img
              src={currentUser.avatarUrl}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full object-cover border border-[#E3EAE4] dark:border-[#354A3D]"
            />
            <div className="hidden lg:block text-left pr-1">
              <p className="text-xs font-bold text-[#202B25] dark:text-[#F1F4F0] leading-none">
                {currentUser.name}
              </p>
              <p className="text-[10px] text-[#78847C] dark:text-[#B1BDB4] leading-tight mt-0.5">
                {currentUser.email}
              </p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[#78847C] dark:text-[#B1BDB4]" />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#26372E] border border-[#E3EAE4] dark:border-[#354A3D] rounded-xl shadow-xl z-50 p-1.5 animate-in fade-in">
              <div className="px-3 py-2 border-b border-[#E3EAE4] dark:border-[#354A3D] mb-1">
                <p className="text-xs font-bold text-[#202B25] dark:text-[#F1F4F0]">
                  {currentUser.name}
                </p>
                <p className="text-[11px] text-[#78847C] dark:text-[#B1BDB4] truncate">
                  {currentUser.email}
                </p>
              </div>

              <div className="space-y-0.5">
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    navigate('/profile');
                  }}
                  className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs text-[#202B25] dark:text-[#F1F4F0] hover:bg-black/5 dark:hover:bg-white/5"
                >
                  <UserIcon className="w-4 h-4 text-[#78847C] dark:text-[#B1BDB4]" />
                  <span>Profile & Account</span>
                </button>

                {/* Appearance Settings - strictly here as specified */}
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    navigate('/settings/appearance');
                  }}
                  className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs text-[#202B25] dark:text-[#F1F4F0] hover:bg-black/5 dark:hover:bg-white/5"
                >
                  <Palette className="w-4 h-4 text-[#8FAF9A]" />
                  <span>Appearance / Theme</span>
                </button>

                <div className="border-t border-[#E3EAE4] dark:border-[#354A3D] my-1" />

                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    logout();
                    navigate('/auth/login');
                  }}
                  className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
