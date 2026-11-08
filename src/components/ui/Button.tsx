import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed select-none';

  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-5 py-2.5 gap-2.5',
  };

  const variantClasses = {
    primary:
      'bg-[#234B3A] text-white hover:bg-[#1b3a2d] dark:bg-[#8FAF9A] dark:text-[#18231E] dark:hover:bg-[#a1c2ac] focus:ring-[#234B3A] shadow-sm',
    secondary:
      'bg-[#E7EFE8] text-[#234B3A] hover:bg-[#d6e5d8] dark:bg-[#354A3D] dark:text-[#F1F4F0] dark:hover:bg-[#405a4a] focus:ring-[#8FAF9A]',
    outline:
      'border border-[#E3EAE4] dark:border-[#354A3D] text-[#202B25] dark:text-[#F1F4F0] hover:bg-black/5 dark:hover:bg-white/5 focus:ring-[#8FAF9A]',
    ghost:
      'text-[#78847C] dark:text-[#B1BDB4] hover:text-[#202B25] dark:hover:text-[#F1F4F0] hover:bg-black/5 dark:hover:bg-white/5',
    danger:
      'bg-red-600 text-white hover:bg-red-700 dark:bg-red-500/80 dark:hover:bg-red-600 focus:ring-red-500 shadow-sm',
    accent:
      'bg-[#D9A66F] text-[#202B25] hover:bg-[#c9955d] focus:ring-[#D9A66F] font-semibold shadow-sm',
  };

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          />
        </svg>
      ) : icon && iconPosition === 'left' ? (
        <span className="shrink-0">{icon}</span>
      ) : null}
      <span>{children}</span>
      {!isLoading && icon && iconPosition === 'right' ? (
        <span className="shrink-0">{icon}</span>
      ) : null}
    </button>
  );
};
