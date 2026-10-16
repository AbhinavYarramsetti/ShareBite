import React from 'react';
import { Card } from './Card';

export interface StatTileProps {
  label: string;
  value: string;
  hint?: string;
  icon?: React.ReactNode;
  tone?: 'default' | 'primary' | 'success' | 'warning' | 'critical';
}

const toneStyles: Record<NonNullable<StatTileProps['tone']>, string> = {
  default: 'text-charcoal',
  primary: 'text-primary',
  success: 'text-status-success',
  warning: 'text-status-warning',
  critical: 'text-status-critical',
};

export const StatTile: React.FC<StatTileProps> = ({
  label,
  value,
  hint,
  icon,
  tone = 'default',
}) => (
  <Card padding="sm" className="flex flex-col justify-between gap-2 min-h-[104px]">
    <div className="flex items-start justify-between gap-2">
      <span className="text-xs font-medium uppercase tracking-wider text-slate">{label}</span>
      {icon && <span className="text-slate flex-shrink-0">{icon}</span>}
    </div>
    <div>
      <div className={`text-2xl font-semibold tracking-tight ${toneStyles[tone]}`}>{value}</div>
      {hint && <span className="text-metadata text-slate mt-0.5 inline-block">{hint}</span>}
    </div>
  </Card>
);
