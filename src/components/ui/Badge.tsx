import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'accent';
  size?: 'sm' | 'md';
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  dot = false,
  className = '',
  ...props
}) => {
  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 font-medium tracking-tight',
    md: 'text-xs px-2.5 py-1 font-semibold',
  };

  const variantClasses = {
    primary:
      'bg-[#E7EFE8] text-[#234B3A] dark:bg-[#354A3D] dark:text-[#A9C5AF] border border-[#234B3A]/10 dark:border-[#8FAF9A]/20',
    success:
      'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/40',
    warning:
      'bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/40',
    danger:
      'bg-rose-50 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200/60 dark:border-rose-800/40',
    info:
      'bg-sky-50 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300 border border-sky-200/60 dark:border-sky-800/40',
    neutral:
      'bg-[#EAECE8] text-[#78847C] dark:bg-[#304338] dark:text-[#B1BDB4] border border-[#E3EAE4] dark:border-[#3B4B41]',
    accent:
      'bg-[#fbf4ea] text-[#935e29] dark:bg-[#3f3123] dark:text-[#D9A66F] border border-[#D9A66F]/30',
  };

  const dotColors = {
    primary: 'bg-[#234B3A] dark:bg-[#8FAF9A]',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    danger: 'bg-rose-500',
    info: 'bg-sky-500',
    neutral: 'bg-[#78847C] dark:bg-[#B1BDB4]',
    accent: 'bg-[#D9A66F]',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full select-none ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColors[variant]}`} />}
      <span>{children}</span>
    </span>
  );
};
