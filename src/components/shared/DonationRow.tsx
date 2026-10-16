import React from 'react';
import { MapPin, Clock, Building2 } from 'lucide-react';
import { Card } from '../ui/Card';
import { StatusBadge } from '../ui/StatusBadge';
import { FreshnessBadge } from '../ui/FreshnessBadge';
import { StatusTimeline } from './StatusTimeline';
import { DonationItem } from '../../types';
import { distanceLabel, travelTimeLabel } from '../../utils/routeDisplay';
import { isClosed } from '../../utils/donationStats';

export interface DonationRowProps {
  donation: DonationItem;
  /** Show which kitchen it came from (institution & courier views). */
  showDonor?: boolean;
  /** Show the receiving institution (restaurant view). */
  showRecipient?: boolean;
  showFreshness?: boolean;
  showTimeline?: boolean;
  showRoute?: boolean;
  actions?: React.ReactNode;
}

/** Shared donation list row used across the delivery, assignment and history tabs. */
export const DonationRow: React.FC<DonationRowProps> = ({
  donation,
  showDonor = false,
  showRecipient = false,
  showFreshness = false,
  showTimeline = false,
  showRoute = false,
  actions,
}) => (
  <Card padding="md" className="hover:border-slate-muted transition-colors">
    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1.5">
          <StatusBadge status={donation.status} size="sm" />
          {showFreshness && (
            <FreshnessBadge
              urgency={donation.urgency}
              minutesRemaining={donation.minutesRemaining}
              size="sm"
            />
          )}
          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-cream border border-border-subtle uppercase text-slate">
            {donation.dietaryType}
          </span>
          <span className="text-metadata text-xs">Prepared {donation.prepTimeMinutesAgo}m ago</span>
        </div>

        <h3 className="text-base font-semibold text-charcoal">
          {donation.quantity} Meals • {donation.title}
        </h3>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5 text-xs text-charcoal/80">
          {showDonor && (
            <span className="flex items-center gap-1.5">
              <MapPin size={13} className="text-slate flex-shrink-0" aria-hidden="true" />
              {donation.donorName}
              {donation.donorBranch ? ` – ${donation.donorBranch}` : ''}
            </span>
          )}

          {showRecipient && (
            <span className="flex items-center gap-1.5">
              <Building2 size={13} className="text-slate flex-shrink-0" aria-hidden="true" />
              {donation.claimedBy || 'No recipient yet'}
            </span>
          )}

          {showRoute && (
            <>
              <span className="flex items-center gap-1.5 text-slate">
                <MapPin size={13} className="flex-shrink-0" aria-hidden="true" />
                {distanceLabel(donation)}
              </span>
              <span className="flex items-center gap-1.5 text-slate">
                <Clock size={13} className="flex-shrink-0" aria-hidden="true" />
                {travelTimeLabel(donation)}
              </span>
            </>
          )}
        </div>

        {showTimeline && (
          <div className="mt-3 pt-3 border-t border-border-subtle">
            <StatusTimeline status={donation.status} halted={isClosed(donation)} />
          </div>
        )}
      </div>

      {actions && <div className="flex items-center gap-3 flex-shrink-0">{actions}</div>}
    </div>
  </Card>
);
