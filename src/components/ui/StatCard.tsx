import React from 'react';
import { Card } from './Card';

export interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  subtitle?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'accent' | 'highlight';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  changeType = 'neutral',
  subtitle,
  icon,
  variant = 'default',
}) => {
  return (
    <Card
      className={`relative overflow-hidden transition-all duration-200 hover:shadow-md ${
        variant === 'highlight'
          ? 'bg-gradient-to-br from-[#E7EFE8]/80 to-white dark:from-[#354A3D]/40 dark:to-[#26372E]'
          : variant === 'accent'
          ? 'bg-gradient-to-br from-[#fbf4ea]/80 to-white dark:from-[#3f3123]/30 dark:to-[#26372E]'
          : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#78847C] dark:text-[#B1BDB4]">
            {title}
          </p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold tracking-tight text-[#202B25] dark:text-[#F1F4F0]">
              {value}
            </h3>
            {change && (
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  changeType === 'positive'
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300'
                    : changeType === 'negative'
                    ? 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300'
                    : 'bg-[#EAECE8] text-[#78847C] dark:bg-[#304338] dark:text-[#B1BDB4]'
                }`}
              >
                {change}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-xs text-[#78847C] dark:text-[#B1BDB4] pt-0.5">{subtitle}</p>
          )}
        </div>
        {icon && (
          <div className="p-2.5 rounded-xl bg-[#E7EFE8] dark:bg-[#354A3D] text-[#234B3A] dark:text-[#8FAF9A]">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
};
