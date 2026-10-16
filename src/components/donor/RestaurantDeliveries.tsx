import React from 'react';
import { Truck, CheckCircle2, PackageCheck, MapPin, Clock, Building2 } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { StatTile } from '../ui/StatTile';
import { PageHeader } from '../shared/PageHeader';
import { EmptyState } from '../shared/EmptyState';
import { DonationRow } from '../shared/DonationRow';
import { FreshnessBadge } from '../ui/FreshnessBadge';
import { StatusTimeline } from '../shared/StatusTimeline';
import { DeliveryMission, DonationItem, UserAccount } from '../../types';
import { isInFlight, isFulfilled, summarizeDonations } from '../../utils/donationStats';
import { distanceLabel, travelTimeLabel } from '../../utils/routeDisplay';

export interface RestaurantDeliveriesProps {
  account: UserAccount;
  branchDonations: DonationItem[];
  mission: DeliveryMission;
  onOpenTab: (tab: string) => void;
}

/**
 * Restaurant → Deliveries tab.
 * Read-only dispatch view for the kitchen: who is carrying their food right
 * now, how far along it is, and which handovers are already closed. The
 * courier-side controls stay in the delivery partner view.
 */
export const RestaurantDeliveries: React.FC<RestaurantDeliveriesProps> = ({
  account,
  branchDonations,
  mission,
  onOpenTab,
}) => {
  const stats = summarizeDonations(branchDonations);
  const inFlight = branchDonations.filter(isInFlight);
  const fulfilled = branchDonations.filter(isFulfilled);

  // The seeded mission tracks one donation; show it live when it is this branch's.
  const liveDonation = inFlight.find((d) => d.id === mission.donationId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <PageHeader
        eyebrow="Restaurant Operations · Deliveries"
        title="Dispatch & handover status"
        subtitle={`${account.name} · courier progress for food leaving this kitchen`}
        actions={
          <Button variant="secondary" onClick={() => onOpenTab('donations')}>
            Back to donations
          </Button>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-6">
        <StatTile
          label="With a courier"
          value={`${inFlight.length}`}
          hint={`${stats.mealsInFlight} meals in transit`}
          icon={<Truck size={18} />}
          tone={inFlight.length > 0 ? 'primary' : 'default'}
        />
        <StatTile
          label="Handed over"
          value={`${fulfilled.length}`}
          hint={`${stats.mealsFulfilled} meals delivered`}
          icon={<CheckCircle2 size={18} />}
          tone={fulfilled.length > 0 ? 'success' : 'default'}
        />
        <StatTile
          label="Institutions served"
          value={`${stats.institutionsReached}`}
          hint="Distinct care facilities"
          icon={<Building2 size={18} />}
        />
        <StatTile
          label="Active mission"
          value={liveDonation ? `#${mission.id}` : '—'}
          hint={liveDonation ? 'Courier assigned' : 'No live mission for this branch'}
          icon={<PackageCheck size={18} />}
        />
      </div>

      {/* Live mission summary */}
      {liveDonation && (
        <Card padding="lg" highlight className="my-8 border-primary/30">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate">
                Live mission #{mission.id}
              </span>
              <h2 className="text-xl font-semibold text-charcoal mt-1">
                {liveDonation.quantity} Meals • {liveDonation.title}
              </h2>
            </div>
            <FreshnessBadge
              urgency={liveDonation.urgency}
              minutesRemaining={liveDonation.minutesRemaining}
              size="lg"
            />
          </div>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 text-charcoal">
              <Building2 size={16} className="text-slate flex-shrink-0" aria-hidden="true" />
              <span>To: {mission.recipientName}</span>
            </div>
            <div className="flex items-center gap-2 text-charcoal">
              <PackageCheck size={16} className="text-slate flex-shrink-0" aria-hidden="true" />
              <span>Courier: {liveDonation.volunteerName || 'ShareBite volunteer'}</span>
            </div>
            <div className="flex items-center gap-2 text-charcoal">
              <MapPin size={16} className="text-slate flex-shrink-0" aria-hidden="true" />
              <span>{distanceLabel(liveDonation)}</span>
            </div>
            <div className="flex items-center gap-2 text-charcoal">
              <Clock size={16} className="text-slate flex-shrink-0" aria-hidden="true" />
              <span>{travelTimeLabel(liveDonation)}</span>
            </div>
          </div>

          <div className="mt-5 pt-5 border-t border-border-subtle">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate block mb-2.5">
              Progress
            </span>
            <StatusTimeline status={liveDonation.status} />
          </div>
        </Card>
      )}

      {/* In-flight list */}
      <div className="my-8">
        <h2 className="text-lg font-semibold text-charcoal mb-4">Out for delivery</h2>
        {inFlight.length === 0 ? (
          <EmptyState
            icon={<Truck size={38} />}
            title="Nothing in transit"
            description="Once an institution accepts a donation from this branch, the courier's progress appears here."
            action={
              <Button variant="primary" onClick={() => onOpenTab('donations')}>
                Review open donations
              </Button>
            }
          />
        ) : (
          <div className="flex flex-col gap-3">
            {inFlight.map((d) => (
              <DonationRow
                key={d.id}
                donation={d}
                showRecipient
                showFreshness
                showRoute
                showTimeline
              />
            ))}
          </div>
        )}
      </div>

      {/* Completed list */}
      <div className="my-8">
        <h2 className="text-lg font-semibold text-charcoal mb-4">Completed handovers</h2>
        {fulfilled.length === 0 ? (
          <Card padding="md" className="border-dashed">
            <p className="text-metadata text-slate">
              Completed handovers from this branch will be listed here with the receiving
              institution.
            </p>
          </Card>
        ) : (
          <div className="flex flex-col gap-3">
            {fulfilled.map((d) => (
              <DonationRow
                key={d.id}
                donation={d}
                showRecipient
                actions={
                  <span className="text-xs font-medium text-status-success flex items-center gap-1">
                    <CheckCircle2 size={14} /> Verified
                  </span>
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
