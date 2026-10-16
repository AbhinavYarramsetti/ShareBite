import React from 'react';
import { Truck, PackageCheck, Clock, CheckCircle2, MapPin, Building2, ListChecks } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { StatTile } from '../ui/StatTile';
import { PageHeader } from '../shared/PageHeader';
import { FreshnessBadge } from '../ui/FreshnessBadge';
import { StatusTimeline } from '../shared/StatusTimeline';
import { DeliveryMission, DonationItem, UserAccount } from '../../types';
import { isInFlight, isFulfilled, summarizeDonations } from '../../utils/donationStats';

export interface LogisticsOverviewProps {
  account: UserAccount;
  donations: DonationItem[];
  mission: DeliveryMission;
  onOpenTab: (tab: string) => void;
}

/**
 * Delivery partner → Dashboard tab.
 * Shift summary for the courier: the mission on hand, the queue behind it and
 * what has already been handed over.
 */
export const LogisticsOverview: React.FC<LogisticsOverviewProps> = ({
  account,
  donations,
  mission,
  onOpenTab,
}) => {
  const stats = summarizeDonations(donations);
  const queue = donations.filter(isInFlight);
  const done = donations.filter(isFulfilled);
  const activeDonation = donations.find((d) => d.id === mission.donationId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <PageHeader
        eyebrow="Delivery Partner · Dashboard"
        title={`Shift overview — ${account.name}`}
        subtitle={`${account.facility} · Sample delivery partner account`}
        actions={
          <Button variant="primary" icon={<Truck size={18} />} onClick={() => onOpenTab('deliveries')}>
            Open active mission
          </Button>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-6">
        <StatTile
          label="Assignments queued"
          value={`${queue.length}`}
          hint={`${stats.mealsInFlight} meals to move`}
          icon={<ListChecks size={18} />}
          tone={queue.length > 0 ? 'primary' : 'default'}
        />
        <StatTile
          label="Completed today"
          value={`${done.length}`}
          hint={`${stats.mealsFulfilled} meals handed over`}
          icon={<CheckCircle2 size={18} />}
          tone={done.length > 0 ? 'success' : 'default'}
        />
        <StatTile
          label="Current mission"
          value={`#${mission.id}`}
          hint={`${mission.quantity} meals · ${mission.step}`}
          icon={<PackageCheck size={18} />}
        />
        <StatTile
          label="Freshness remaining"
          value={`${mission.minutesRemaining} min`}
          hint="On the active mission"
          icon={<Clock size={18} />}
          tone={mission.minutesRemaining <= 20 ? 'warning' : 'default'}
        />
      </div>

      <Card padding="lg" highlight className="my-8 border-primary/30">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate">
              Active mission #{mission.id}
            </span>
            <h2 className="text-xl font-semibold text-charcoal mt-1">
              {mission.quantity} Meals • {mission.donationTitle}
            </h2>
          </div>
          <FreshnessBadge
            urgency={mission.urgency}
            minutesRemaining={mission.minutesRemaining}
            size="lg"
          />
        </div>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="flex items-start gap-2 text-charcoal">
            <MapPin size={16} className="text-slate flex-shrink-0 mt-0.5" aria-hidden="true" />
            <span>
              <span className="font-medium">Pickup</span>
              <br />
              {mission.donorName}
              <br />
              <span className="text-metadata text-slate">{mission.donorAddress}</span>
            </span>
          </div>
          <div className="flex items-start gap-2 text-charcoal">
            <Building2 size={16} className="text-slate flex-shrink-0 mt-0.5" aria-hidden="true" />
            <span>
              <span className="font-medium">Drop-off</span>
              <br />
              {mission.recipientName}
              <br />
              <span className="text-metadata text-slate">{mission.recipientAddress}</span>
            </span>
          </div>
        </div>

        {activeDonation && (
          <div className="mt-5 pt-5 border-t border-border-subtle">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate block mb-2.5">
              Progress
            </span>
            <StatusTimeline status={activeDonation.status} />
          </div>
        )}

        <div className="mt-5 flex flex-wrap gap-3">
          <Button variant="primary" onClick={() => onOpenTab('deliveries')}>
            Continue mission
          </Button>
          <Button variant="secondary" onClick={() => onOpenTab('assignments')}>
            View assignment queue
          </Button>
        </div>
      </Card>
    </div>
  );
};
