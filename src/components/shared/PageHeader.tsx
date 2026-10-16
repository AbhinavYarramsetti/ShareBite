import React from 'react';

export interface PageHeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  badge?: React.ReactNode;
  actions?: React.ReactNode;
}

/** Shared top-of-page block so every role tab is labelled the same way. */
export const PageHeader: React.FC<PageHeaderProps> = ({
  eyebrow,
  title,
  subtitle,
  badge,
  actions,
}) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-border-subtle">
    <div className="min-w-0">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate">{eyebrow}</span>
        {badge}
      </div>
      <h1 className="text-h1 text-charcoal mt-1">{title}</h1>
      {subtitle && <p className="text-metadata text-slate mt-1">{subtitle}</p>}
    </div>
    {actions && <div className="flex flex-wrap items-center gap-3">{actions}</div>}
  </div>
);
