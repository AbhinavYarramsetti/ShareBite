import React from 'react';
import { Clock, MapPin, CheckCircle2, Sparkles, Truck } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { FreshnessCard } from '../ui/FreshnessCard';
import { StatusBadge } from '../ui/StatusBadge';
import { DonationItem } from '../../types';
import { distanceLabel, travelTimeLabel } from '../../utils/routeDisplay';

export interface ActiveRescueCardProps {
  donation: DonationItem;
  onFindRecipient: (donation: DonationItem) => void;
  onTrackDelivery: () => void;
  heading?: string;
}

/**
 * The dominant "one thing happening right now" card for a restaurant branch.
 * Used by the Dashboard tab; the Donations tab shows the same donation inside
 * the full list instead.
 */
export const ActiveRescueCard: React.FC<ActiveRescueCardProps> = ({
  donation,
  onFindRecipient,
  onTrackDelivery,
  heading = 'Active food rescue in progress',
}) => {
  const awaitingRecipient = donation.status === 'submitted' || donation.status === 'matching';

  return (
    <div className="my-8">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-charcoal">{heading}</h2>
        <StatusBadge status={donation.status} />
      </div>

      <Card padding="lg" highlight className="border-primary/30">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5">
            <FreshnessCard
              urgency={donation.urgency}
              minutesRemaining={donation.minutesRemaining}
              prepTimeMinutesAgo={donation.prepTimeMinutesAgo}
              temperatureStatus={donation.temperatureStatus}
            />
          </div>

          <div className="lg:col-span-7 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-bold text-primary-dark">
                  {donation.quantity} Meals
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold uppercase tracking-wider bg-sage-light text-primary-dark border border-sage/30">
                  {donation.dietaryType}
                </span>
              </div>

              <h3 className="text-xl font-semibold text-charcoal mt-2">{donation.title}</h3>

              <p className="text-body text-charcoal/80 text-sm mt-1.5 leading-relaxed">
                {donation.description}
              </p>

              <div className="mt-4 pt-4 border-t border-border-subtle grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 text-charcoal">
                  <MapPin size={16} className="text-slate flex-shrink-0" aria-hidden="true" />
                  <span>{distanceLabel(donation)}</span>
                </div>

                <div className="flex items-center gap-2 text-charcoal">
                  <Clock size={16} className="text-slate flex-shrink-0" aria-hidden="true" />
                  <span>{travelTimeLabel(donation)}</span>
                </div>

                {donation.claimedBy && (
                  <div className="col-span-full flex items-center gap-2 text-status-success font-medium bg-status-success/5 p-2.5 rounded border border-status-success/20">
                    <CheckCircle2 size={16} aria-hidden="true" />
                    <span>Connected to: {donation.claimedBy}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {awaitingRecipient ? (
                <Button
                  variant="primary"
                  icon={<Sparkles size={16} />}
                  onClick={() => onFindRecipient(donation)}
                >
                  View Recommended Recipients
                </Button>
              ) : (
                <Button variant="primary" icon={<Truck size={16} />} onClick={onTrackDelivery}>
                  Track Active Dispatch
                </Button>
              )}

              <span className="text-metadata text-slate">Safety window monitored continuously</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
