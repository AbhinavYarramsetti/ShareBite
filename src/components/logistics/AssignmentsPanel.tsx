import React from 'react';
import { ListChecks, Truck, Sparkles, ArrowRight } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { StatTile } from '../ui/StatTile';
import { PageHeader } from '../shared/PageHeader';
import { EmptyState } from '../shared/EmptyState';
import { DonationRow } from '../shared/DonationRow';
import { DeliveryMission, DonationItem } from '../../types';
import { isAwaitingMatch, isInFlight, summarizeDonations } from '../../utils/donationStats';

export interface AssignmentsPanelProps {
  donations: DonationItem[];
  mission: DeliveryMission;
  onOpenTab: (tab: string) => void;
}

/**
 * Delivery partner → Assignments tab.
 * The courier work queue: accepted runs needing movement, plus donations still
 * being matched that will likely need a courier next.
 */
export const AssignmentsPanel: React.FC<AssignmentsPanelProps> = ({
  donations,
  mission,
  onOpenTab,
}) => {
  const assigned = donations.filter(isInFlight);
  const upcoming = donations.filter((d) => isAwaitingMatch(d) && d.urgency !== 'expired');
  const stats = summarizeDonations(donations);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <PageHeader
        eyebrow="Delivery Partner · Assignments"
        title="Courier work queue"
        subtitle="Runs assigned to you, and donations that will need a courier shortly"
        actions={
          <Button variant="secondary" icon={<Truck size={16} />} onClick={() => onOpenTab('deliveries')}>
            Open active mission
          </Button>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-6">
        <StatTile
          label="Assigned to you"
          value={`${assigned.length}`}
          hint={`${stats.mealsInFlight} meals`}
          icon={<ListChecks size={18} />}
          tone={assigned.length > 0 ? 'primary' : 'default'}
        />
        <StatTile
          label="Awaiting a recipient"
          value={`${upcoming.length}`}
          hint={`${stats.mealsAwaitingMatch} meals being matched`}
          icon={<Sparkles size={18} />}
        />
        <StatTile label="Active mission" value={`#${mission.id}`} hint={mission.recipientName} icon={<Truck size={18} />} />
        <StatTile
          label="Expired / cancelled"
          value={`${stats.closed}`}
          hint="No longer collectable"
          icon={<ArrowRight size={18} />}
          tone={stats.closed > 0 ? 'critical' : 'default'}
        />
      </div>

      <div className="my-8">
        <h2 className="text-lg font-semibold text-charcoal mb-4">Assigned runs</h2>
        {assigned.length === 0 ? (
          <EmptyState
            icon={<Truck size={38} />}
            title="No runs assigned"
            description="When an institution accepts a donation, the pickup lands in this queue with its freshness deadline."
          />
        ) : (
          <div className="flex flex-col gap-3">
            {assigned.map((d) => (
              <DonationRow
                key={d.id}
                donation={d}
                showDonor
                showRecipient
                showFreshness
                showRoute
                showTimeline
                actions={
                  <Button
                    variant={d.id === mission.donationId ? 'primary' : 'secondary'}
                    size="sm"
                    onClick={() => onOpenTab('deliveries')}
                  >
                    {d.id === mission.donationId ? 'Continue' : 'Open mission'}
                  </Button>
                }
              />
            ))}
          </div>
        )}
      </div>

      <div className="my-8">
        <h2 className="text-lg font-semibold text-charcoal mb-4">Likely next pickups</h2>
        {upcoming.length === 0 ? (
          <Card padding="md" className="border-dashed">
            <p className="text-metadata text-slate">
              Nothing is currently being matched. New donations appear here while institutions
              decide.
            </p>
          </Card>
        ) : (
          <div className="flex flex-col gap-3">
            {upcoming.map((d) => (
              <DonationRow
                key={d.id}
                donation={d}
                showDonor
                showFreshness
                showRoute
                actions={
                  <span className="text-xs text-slate font-medium">Awaiting acceptance</span>
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
