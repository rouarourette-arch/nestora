import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Plus, Home, Building2, Sparkles } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { useNavigate } from 'react-router-dom';

export const WorkspaceSwitcher: React.FC = () => {
  const { workspaces, activeWorkspace, switchWorkspace } = useData();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-2.5 rounded-xl border border-[#E3EAE4] dark:border-[#354A3D] bg-white dark:bg-[#26372E] hover:bg-[#F3F5F2] dark:hover:bg-[#304338] transition-all text-left group"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-[#E7EFE8] dark:bg-[#354A3D] flex items-center justify-center text-base shrink-0">
            {activeWorkspace.avatar || (activeWorkspace.type === 'LIVING' ? '🏡' : '🏢')}
          </div>
          <div className="truncate">
            <p className="text-xs font-bold text-[#202B25] dark:text-[#F1F4F0] truncate group-hover:text-[#234B3A] dark:group-hover:text-[#8FAF9A]">
              {activeWorkspace.name}
            </p>
            <span className="inline-flex items-center text-[10px] text-[#78847C] dark:text-[#B1BDB4] font-medium">
              {activeWorkspace.type === 'LIVING' ? 'Co-Living Residence' : 'Condo Association'} • {activeWorkspace.role.replace('_', ' ')}
            </span>
          </div>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-[#78847C] dark:text-[#B1BDB4] shrink-0 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1.5 w-full bg-white dark:bg-[#26372E] border border-[#E3EAE4] dark:border-[#354A3D] rounded-xl shadow-xl z-50 p-1.5 animate-in fade-in slide-in-from-top-1">
          <div className="px-2 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#78847C] dark:text-[#B1BDB4]">
            Your Workspaces
          </div>
          <div className="space-y-1">
            {workspaces.map((ws) => {
              const isCurrent = ws.id === activeWorkspace.id;
              return (
                <button
                  key={ws.id}
                  onClick={() => {
                    switchWorkspace(ws.id);
                    setIsOpen(false);
                    // Navigate to appropriate module dashboard
                    if (ws.type === 'LIVING') {
                      navigate('/living');
                    } else {
                      navigate('/buildings');
                    }
                  }}
                  className={`w-full flex items-center justify-between p-2 rounded-lg text-left text-xs transition-colors ${
                    isCurrent
                      ? 'bg-[#E7EFE8] text-[#234B3A] dark:bg-[#354A3D] dark:text-[#8FAF9A] font-semibold'
                      : 'hover:bg-black/5 dark:hover:bg-white/5 text-[#202B25] dark:text-[#F1F4F0]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span className="text-base">{ws.avatar || (ws.type === 'LIVING' ? '🏡' : '🏢')}</span>
                    <div className="truncate">
                      <p className="truncate font-medium">{ws.name}</p>
                      <p className="text-[10px] text-[#78847C] dark:text-[#B1BDB4]">
                        {ws.type === 'LIVING' ? 'Co-Living' : 'Building'} • {ws.membersCount} members
                      </p>
                    </div>
                  </div>
                  {isCurrent && <Check className="w-4 h-4 shrink-0 text-[#234B3A] dark:text-[#8FAF9A]" />}
                </button>
              );
            })}
          </div>

          <div className="border-t border-[#E3EAE4] dark:border-[#354A3D] mt-1.5 pt-1.5">
            <button
              onClick={() => {
                setIsOpen(false);
                navigate('/workspaces');
              }}
              className="w-full flex items-center gap-2 p-2 rounded-lg text-xs font-medium text-[#234B3A] dark:text-[#8FAF9A] hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Manage or Create Workspace</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
