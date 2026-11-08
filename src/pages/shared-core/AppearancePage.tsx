import React from 'react';
import { Sun, Moon, Laptop, CheckCircle2, Sparkles, Palette, Shield } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { useTheme, ThemePreference } from '../../contexts/ThemeContext';

export const AppearancePage: React.FC = () => {
  const { themePreference, resolvedTheme, setThemePreference } = useTheme();

  const themes: {
    id: ThemePreference;
    title: string;
    description: string;
    icon: React.ReactNode;
    previewBg: string;
    previewCard: string;
    previewPrimary: string;
    previewText: string;
  }[] = [
    {
      id: 'light',
      title: 'Light Theme',
      description: 'Soft warm grayish green canvas (#F3F5F2) with deep forest emerald primary (#234B3A).',
      icon: <Sun className="w-5 h-5 text-amber-600" />,
      previewBg: 'bg-[#F3F5F2]',
      previewCard: 'bg-white border-[#E3EAE4]',
      previewPrimary: 'bg-[#234B3A]',
      previewText: 'text-[#202B25]',
    },
    {
      id: 'dark',
      title: 'Dark Theme',
      description: 'Deep twilight forest (#18231E) with elevated jade card surfaces (#26372E) and sage accents (#8FAF9A).',
      icon: <Moon className="w-5 h-5 text-emerald-400" />,
      previewBg: 'bg-[#18231E]',
      previewCard: 'bg-[#26372E] border-[#354A3D]',
      previewPrimary: 'bg-[#8FAF9A]',
      previewText: 'text-[#F1F4F0]',
    },
    {
      id: 'system',
      title: 'System Default',
      description: 'Automatically synchronizes with your operating system or browser display preference.',
      icon: <Laptop className="w-5 h-5 text-[#78847C] dark:text-[#B1BDB4]" />,
      previewBg: 'bg-gradient-to-r from-[#F3F5F2] to-[#18231E]',
      previewCard: 'bg-gradient-to-r from-white to-[#26372E] border-[#E3EAE4] dark:border-[#354A3D]',
      previewPrimary: 'bg-gradient-to-r from-[#234B3A] to-[#8FAF9A]',
      previewText: 'text-[#202B25] dark:text-[#F1F4F0]',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="primary" size="sm">
            Centralized Appearance Engine
          </Badge>
          <span className="text-xs text-[#78847C] dark:text-[#B1BDB4]">
            Profile → Settings → Appearance
          </span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-[#202B25] dark:text-[#F1F4F0]">
          Appearance & Theme Preferences
        </h1>
        <p className="text-sm text-[#78847C] dark:text-[#B1BDB4] mt-0.5">
          Select your global display theme. Per design system specification, theme controls are exclusively located on this screen.
        </p>
      </div>

      {/* Theme Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {themes.map((t) => {
          const isSelected = themePreference === t.id;
          return (
            <div
              key={t.id}
              onClick={() => setThemePreference(t.id)}
              className={`cursor-pointer rounded-2xl border-2 transition-all p-5 flex flex-col justify-between ${
                isSelected
                  ? 'border-[#234B3A] dark:border-[#8FAF9A] bg-white dark:bg-[#26372E] shadow-lg shadow-[#234B3A]/10'
                  : 'border-[#E3EAE4] dark:border-[#354A3D] bg-white/60 dark:bg-[#26372E]/50 hover:border-[#78847C]/40'
              }`}
            >
              <div className="space-y-4">
                {/* Visual Mini Preview Window */}
                <div className={`h-28 rounded-xl p-3 ${t.previewBg} flex flex-col justify-between overflow-hidden shadow-inner border border-black/5 dark:border-white/5`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className={`w-4 h-4 rounded-md ${t.previewPrimary}`} />
                      <div className="w-12 h-2 rounded bg-black/20 dark:bg-white/20" />
                    </div>
                    <div className="w-4 h-4 rounded-full bg-black/10 dark:bg-white/10" />
                  </div>
                  <div className={`p-2 rounded-lg ${t.previewCard} shadow-sm border space-y-1`}>
                    <div className="w-16 h-2 rounded bg-black/30 dark:bg-white/30" />
                    <div className="w-24 h-1.5 rounded bg-black/15 dark:bg-white/15" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-[#F3F5F2] dark:bg-[#1D2A23] border border-[#E3EAE4] dark:border-[#354A3D]">
                      {t.icon}
                    </div>
                    <h3 className="text-base font-bold text-[#202B25] dark:text-[#F1F4F0]">
                      {t.title}
                    </h3>
                  </div>
                  {isSelected && (
                    <CheckCircle2 className="w-5 h-5 text-[#234B3A] dark:text-[#8FAF9A]" />
                  )}
                </div>

                <p className="text-xs text-[#78847C] dark:text-[#B1BDB4] leading-relaxed">
                  {t.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#E3EAE4] dark:border-[#354A3D]">
                <button
                  type="button"
                  className={`w-full py-2 px-3 rounded-xl text-xs font-semibold transition-colors ${
                    isSelected
                      ? 'bg-[#234B3A] text-white dark:bg-[#8FAF9A] dark:text-[#18231E]'
                      : 'bg-[#F3F5F2] dark:bg-[#1D2A23] text-[#202B25] dark:text-[#F1F4F0] hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  {isSelected ? 'Active Preference' : 'Apply Theme'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Palette Specifications Card */}
      <Card className="space-y-4">
        <div className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-[#234B3A] dark:text-[#8FAF9A]" />
          <h2 className="text-base font-bold text-[#202B25] dark:text-[#F1F4F0]">
            Nestora Color Tokens & Typography
          </h2>
        </div>
        <p className="text-xs text-[#78847C] dark:text-[#B1BDB4]">
          Resolved display mode:{' '}
          <span className="font-bold uppercase tracking-wider text-[#234B3A] dark:text-[#8FAF9A]">
            {resolvedTheme}
          </span>{' '}
          (Selected: {themePreference}). Typography set to Plus Jakarta Sans.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-3 rounded-xl border border-[#E3EAE4] dark:border-[#354A3D] bg-white dark:bg-[#26372E] space-y-2">
            <div className="w-full h-8 rounded-lg bg-[#234B3A] dark:bg-[#8FAF9A] shadow-sm" />
            <div>
              <p className="text-xs font-bold text-[#202B25] dark:text-[#F1F4F0]">Primary Brand</p>
              <p className="text-[10px] text-[#78847C] dark:text-[#B1BDB4] font-mono">
                {resolvedTheme === 'dark' ? '#8FAF9A' : '#234B3A'}
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl border border-[#E3EAE4] dark:border-[#354A3D] bg-white dark:bg-[#26372E] space-y-2">
            <div className="w-full h-8 rounded-lg bg-[#E7EFE8] dark:bg-[#354A3D] shadow-sm" />
            <div>
              <p className="text-xs font-bold text-[#202B25] dark:text-[#F1F4F0]">Container Tint</p>
              <p className="text-[10px] text-[#78847C] dark:text-[#B1BDB4] font-mono">
                {resolvedTheme === 'dark' ? '#354A3D' : '#E7EFE8'}
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl border border-[#E3EAE4] dark:border-[#354A3D] bg-white dark:bg-[#26372E] space-y-2">
            <div className="w-full h-8 rounded-lg bg-[#D9A66F] shadow-sm" />
            <div>
              <p className="text-xs font-bold text-[#202B25] dark:text-[#F1F4F0]">Warm Accent</p>
              <p className="text-[10px] text-[#78847C] dark:text-[#B1BDB4] font-mono">#D9A66F</p>
            </div>
          </div>

          <div className="p-3 rounded-xl border border-[#E3EAE4] dark:border-[#354A3D] bg-white dark:bg-[#26372E] space-y-2">
            <div className="w-full h-8 rounded-lg bg-[#F3F5F2] dark:bg-[#18231E] border border-[#E3EAE4] dark:border-[#354A3D] shadow-sm" />
            <div>
              <p className="text-xs font-bold text-[#202B25] dark:text-[#F1F4F0]">Page Canvas</p>
              <p className="text-[10px] text-[#78847C] dark:text-[#B1BDB4] font-mono">
                {resolvedTheme === 'dark' ? '#18231E' : '#F3F5F2'}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
