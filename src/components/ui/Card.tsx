import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverEffect?: boolean;
  highlight?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  padding = 'md',
  hoverEffect = false,
  highlight = false,
  className = '',
  ...props
}) => {
  const paddingStyles = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-4 sm:p-6',
    lg: 'p-6 sm:p-8',
  }[padding];

  const hoverStyles = hoverEffect
    ? 'transition-all duration-200 hover:border-slate-muted hover:shadow-subtle'
    : '';

  const highlightBorder = highlight ? 'border-primary/40' : 'border-border-subtle';

  return (
    <div
      className={`bg-surface rounded-lg border ${highlightBorder} shadow-card text-charcoal ${paddingStyles} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
