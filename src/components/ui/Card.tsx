import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'bordered';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  className = '',
  ...props
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-3 sm:p-4',
    md: 'p-4 sm:p-6',
    lg: 'p-6 sm:p-8',
  };

  const variantClasses = {
    default:
      'bg-white dark:bg-[#26372E] border border-[#E3EAE4] dark:border-[#354A3D] shadow-sm shadow-[#234B3A]/5',
    elevated:
      'bg-white dark:bg-[#304338] shadow-md shadow-[#234B3A]/10 dark:shadow-black/30 border border-[#E3EAE4]/60 dark:border-[#354A3D]',
    bordered:
      'bg-transparent border border-[#E3EAE4] dark:border-[#354A3D]',
  };

  return (
    <div
      className={`rounded-2xl transition-all duration-200 ${variantClasses[variant]} ${paddingClasses[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
