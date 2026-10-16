import React from 'react';
import { Check, AlertTriangle, AlertCircle, X, Clock, Thermometer } from 'lucide-react';
import { UrgencyLevel } from '../../types';

export interface FreshnessCardProps {
  urgency: UrgencyLevel;
  minutesRemaining: number;
  prepTimeMinutesAgo: number;
  temperatureStatus?: string;
  className?: string;
}

export const FreshnessCard: React.FC<FreshnessCardProps> = ({
  urgency,
  minutesRemaining,
  prepTimeMinutesAgo,
  temperatureStatus = 'Maintained ≥ 65°C / Hot',
  className = '',
}) => {
  // Urgency styling configurations
  const config = {
    fresh: {
      label: 'FRESH',
      icon: <Check size={18} strokeWidth={2.5} className="text-status-success" aria-hidden="true" />,
      border: 'border-status-success/30',
      badgeBg: 'bg-status-success/10 text-status-success',
      headerBg: 'bg-status-success/5',
      countdownColor: 'text-charcoal',
      accessibleStatus: 'Fresh food item in prime safety window',
    },
    'time-sensitive': {
      label: 'TIME-SENSITIVE',
      icon: <AlertTriangle size={18} strokeWidth={2.5} className="text-status-warning" aria-hidden="true" />,
      border: 'border-status-warning/40',
      badgeBg: 'bg-status-warning/10 text-status-warning',
      headerBg: 'bg-status-warning/5',
      countdownColor: 'text-charcoal',
      accessibleStatus: 'Time-sensitive: requires dispatch within safety window',
    },
    urgent: {
      label: 'URGENT ATTENTION',
      icon: <AlertCircle size={18} strokeWidth={2.5} className="text-status-warning" aria-hidden="true" />,
      border: 'border-status-warning/60',
      badgeBg: 'bg-status-warning/20 text-status-warning',
      headerBg: 'bg-status-warning/10',
      countdownColor: 'text-status-warning font-semibold',
      accessibleStatus: 'Urgent: approaching freshness cutoff, prioritized delivery needed',
    },
    expired: {
      label: 'EXPIRED',
      icon: <X size={18} strokeWidth={2.5} className="text-status-critical" aria-hidden="true" />,
      border: 'border-status-critical/30',
      badgeBg: 'bg-status-critical/10 text-status-critical',
      headerBg: 'bg-status-critical/5',
      countdownColor: 'text-status-critical',
      accessibleStatus: 'Expired: safety window exceeded, donation no longer distributable',
    },
  }[urgency];

  return (
    <div
      className={`bg-surface rounded-lg border ${config.border} shadow-card overflow-hidden ${className}`}
      aria-label={config.accessibleStatus}
    >
      {/* Freshness Status Header */}
      <div className={`px-4 py-2.5 border-b border-border-subtle flex items-center justify-between ${config.headerBg}`}>
        <div className="flex items-center gap-2">
          {config.icon}
          <span className="text-xs font-semibold tracking-wider uppercase">
            {config.label}
          </span>
        </div>
        <span className="text-metadata text-xs font-medium">Safe Food Window</span>
      </div>

      <div className="p-4 sm:p-5 flex flex-col gap-3">
        {/* Main Countdown Line */}
        <div>
          <div className="flex items-baseline justify-between">
            <span className={`text-xl sm:text-2xl tracking-tight font-medium ${config.countdownColor}`}>
              {urgency === 'expired' ? (
                'Window Closed'
              ) : (
                <>
                  <span className="font-semibold">{minutesRemaining}</span> minutes remaining
                </>
              )}
            </span>
          </div>

          {/* Contextual description */}
          <p className="text-metadata mt-0.5">
            {urgency === 'fresh' && 'Optimal temperature and nutritional freshness.'}
            {urgency === 'time-sensitive' && 'Courier dispatch recommended within 15 minutes.'}
            {urgency === 'urgent' && 'High-priority rescue: recipient institution waiting.'}
            {urgency === 'expired' && 'Per safety protocol, this surplus can no longer be claimed.'}
          </p>
        </div>

        {/* Supporting Metadata: Prepared time & temperature */}
        <div className="pt-3 border-t border-border-subtle/80 flex flex-wrap items-center justify-between gap-2 text-metadata">
          <div className="flex items-center gap-1.5">
            <Clock size={14} className="text-slate flex-shrink-0" aria-hidden="true" />
            <span>Prepared {prepTimeMinutesAgo} min ago</span>
          </div>

          {temperatureStatus && (
            <div className="flex items-center gap-1.5 text-xs text-charcoal/80">
              <Thermometer size={14} className="text-slate flex-shrink-0" aria-hidden="true" />
              <span>{temperatureStatus}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
