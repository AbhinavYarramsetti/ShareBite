import React from 'react';
import { History, CheckCircle2, XCircle, Utensils } from 'lucide-react';
import { Card } from '../ui/Card';
import { StatTile } from '../ui/StatTile';
import { PageHeader } from '../shared/PageHeader';
import { EmptyState } from '../shared/EmptyState';
import { DonationRow } from '../shared/DonationRow';
import { DonationItem } from '../../types';
import { isClosed, isFulfilled, summarizeDonations } from '../../utils/donationStats';

export interface DeliveryHistoryProps {
  donations: DonationItem[];
}

/**
 * Delivery partner → History tab.
 * Closed-out record: completed handovers plus runs that lapsed, so the
 * expired-window case stays visible rather than disappearing.
 */
export const DeliveryHistory: React.FC<DeliveryHistoryProps> = ({ donations }) => {
  const completed = donations.filter(isFulfilled);
  const lapsed = donations.filter(isClosed);
  const stats = summarizeDonations(donations);
  const completionRate = stats.total
    ? Math.round((completed.length / stats.total) * 100)
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <PageHeader
        eyebrow="Delivery Partner · History"
        title="Completed and closed runs"
        subtitle="Every mission that reached handover, and every one that lapsed before pickup"
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-6">
        <StatTile
          label="Handovers completed"
          value={`${completed.length}`}
          hint="Verified at the door"
          icon={<CheckCircle2 size={18} />}
          tone={completed.length > 0 ? 'success' : 'default'}
        />
        <StatTile
          label="Meals delivered"
          value={`${stats.mealsFulfilled}`}
          hint="Across all completed runs"
          icon={<Utensils size={18} />}
        />
        <StatTile
          label="Lapsed runs"
          value={`${lapsed.length}`}
          hint="Freshness window closed"
          icon={<XCircle size={18} />}
          tone={lapsed.length > 0 ? 'critical' : 'default'}
        />
        <StatTile
          label="Completion rate"
          value={`${completionRate}%`}
          hint="Of all donations in the demo"
          icon={<History size={18} />}
        />
      </div>

      <div className="my-8">
        <h2 className="text-lg font-semibold text-charcoal mb-4">Completed handovers</h2>
        {completed.length === 0 ? (
          <EmptyState
            icon={<History size={38} />}
            title="No completed runs yet"
            description="Finish the active mission in the Deliveries tab and it will be recorded here."
          />
        ) : (
          <div className="flex flex-col gap-3">
            {completed.map((d) => (
              <DonationRow key={d.id} donation={d} showDonor showRecipient showRoute />
            ))}
          </div>
        )}
      </div>

      <div className="my-8">
        <h2 className="text-lg font-semibold text-charcoal mb-4">Lapsed before pickup</h2>
        {lapsed.length === 0 ? (
          <Card padding="md" className="border-dashed">
            <p className="text-metadata text-slate">
              Nothing has lapsed. Donations whose safe freshness window closes before collection are
              listed here.
            </p>
          </Card>
        ) : (
          <div className="flex flex-col gap-3">
            {lapsed.map((d) => (
              <DonationRow key={d.id} donation={d} showDonor showTimeline />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
