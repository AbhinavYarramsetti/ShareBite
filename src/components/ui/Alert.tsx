import React from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info } from 'lucide-react';

export interface AlertProps {
  type?: 'success' | 'warning' | 'critical' | 'info';
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  type = 'info',
  title,
  children,
  className = '',
}) => {
  const configs = {
    success: {
      icon: <CheckCircle2 size={18} className="text-status-success flex-shrink-0" aria-hidden="true" />,
      container: 'bg-status-success/5 border-status-success/30 text-charcoal',
      titleColor: 'text-status-success',
    },
    warning: {
      icon: <AlertTriangle size={18} className="text-status-warning flex-shrink-0" aria-hidden="true" />,
      container: 'bg-status-warning/10 border-status-warning/30 text-charcoal',
      titleColor: 'text-status-warning font-semibold',
    },
    critical: {
      icon: <AlertCircle size={18} className="text-status-critical flex-shrink-0" aria-hidden="true" />,
      container: 'bg-status-critical/10 border-status-critical/30 text-charcoal',
      titleColor: 'text-status-critical font-semibold',
    },
    info: {
      icon: <Info size={18} className="text-primary flex-shrink-0" aria-hidden="true" />,
      container: 'bg-cream-surface border-border-subtle text-charcoal',
      titleColor: 'text-primary font-semibold',
    },
  }[type];

  return (
    <div
      role="alert"
      className={`p-4 rounded-lg border flex gap-3 text-sm leading-relaxed ${configs.container} ${className}`}
    >
      <div className="pt-0.5">{configs.icon}</div>
      <div className="flex-1">
        {title && <h4 className={`text-sm font-semibold mb-0.5 ${configs.titleColor}`}>{title}</h4>}
        <div className="text-charcoal/90 text-body text-sm">{children}</div>
      </div>
    </div>
  );
};
