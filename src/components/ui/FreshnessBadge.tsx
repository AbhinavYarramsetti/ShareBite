import React from 'react';
import { Check, AlertTriangle, AlertCircle, X } from 'lucide-react';
import { UrgencyLevel } from '../../types';

export interface FreshnessBadgeProps {
  urgency: UrgencyLevel;
  minutesRemaining?: number;
  showTimeOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const FreshnessBadge: React.FC<FreshnessBadgeProps> = ({
  urgency,
  minutesRemaining,
  showTimeOnly = false,
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs sm:text-sm px-2.5 py-1 gap-1.5',
    lg: 'text-sm font-medium px-3 py-1.5 gap-2',
  }[size];

  const iconSizes = {
    sm: 13,
    md: 15,
    lg: 17,
  }[size];

  switch (urgency) {
    case 'fresh':
      return (
        <span
          className={`inline-flex items-center font-medium rounded-full bg-status-success/10 text-status-success border border-status-success/20 ${sizeClasses}`}
          role="status"
          aria-label={`Fresh: ${minutesRemaining !== undefined ? `${minutesRemaining} minutes remaining` : 'Optimal freshness'}`}
        >
          <Check size={iconSizes} strokeWidth={2.5} aria-hidden="true" />
          <span>{showTimeOnly && minutesRemaining !== undefined ? `${minutesRemaining}m remaining` : 'Fresh'}</span>
        </span>
      );

    case 'time-sensitive':
      return (
        <span
          className={`inline-flex items-center font-medium rounded-full bg-status-warning/10 text-status-warning border border-status-warning/30 ${sizeClasses}`}
          role="status"
          aria-label={`Time-sensitive: ${minutesRemaining !== undefined ? `${minutesRemaining} minutes remaining` : 'Approaching deadline'}`}
        >
          <AlertTriangle size={iconSizes} strokeWidth={2.5} aria-hidden="true" />
          <span>
            {minutesRemaining !== undefined ? `${minutesRemaining} min remaining` : 'Time-sensitive'}
          </span>
        </span>
      );

    case 'urgent':
      return (
        <span
          className={`inline-flex items-center font-semibold rounded-full bg-status-warning/20 text-status-warning border border-status-warning/50 ${sizeClasses}`}
          role="status"
          aria-label={`Urgent: ${minutesRemaining !== undefined ? `${minutesRemaining} minutes remaining` : 'Immediate action required'}`}
        >
          <AlertCircle size={iconSizes} strokeWidth={2.5} aria-hidden="true" />
          <span>
            {minutesRemaining !== undefined ? `! ${minutesRemaining} min remaining` : '! Urgent'}
          </span>
        </span>
      );

    case 'expired':
      return (
        <span
          className={`inline-flex items-center font-medium rounded-full bg-status-critical/10 text-status-critical border border-status-critical/30 ${sizeClasses}`}
          role="status"
          aria-label="Expired food"
        >
          <X size={iconSizes} strokeWidth={2.5} aria-hidden="true" />
          <span>Expired</span>
        </span>
      );
  }
};
