import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
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
  // Base sizing with minimum touch targets for accessibility
  const sizeStyles = {
    sm: 'text-sm px-3 py-1.5 min-h-[36px] gap-1.5',
    md: 'text-base px-4 py-2 min-h-[44px] gap-2',
    lg: 'text-base font-medium px-6 py-3 min-h-[48px] gap-2.5',
  }[size];

  // Action Hierarchy styles
  // Primary: Forest Green background
  // Secondary: White or transparent background with a subtle border
  // Tertiary: Text-style action
  let variantStyles = '';
  switch (variant) {
    case 'primary':
      variantStyles =
        'bg-primary text-white hover:bg-primary-dark active:bg-primary-dark shadow-subtle border border-transparent focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2';
      break;
    case 'secondary':
      variantStyles =
        'bg-white text-charcoal border border-border-subtle hover:bg-cream hover:border-slate-muted active:bg-cream-surface focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2';
      break;
    case 'tertiary':
      variantStyles =
        'bg-transparent text-charcoal hover:text-primary hover:underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-primary';
      break;
  }

  const disabledStyles = disabled || isLoading ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer active:scale-[0.99]';

  return (
    <button
      className={`inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 ease-out select-none ${sizeStyles} ${variantStyles} ${disabledStyles} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        icon && iconPosition === 'left' && <span className="flex-shrink-0" aria-hidden="true">{icon}</span>
      )}
      <span>{children}</span>
      {!isLoading && icon && iconPosition === 'right' && (
        <span className="flex-shrink-0" aria-hidden="true">{icon}</span>
      )}
    </button>
  );
};
