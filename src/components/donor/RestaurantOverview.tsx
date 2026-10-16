import React from 'react';
import { Plus, Utensils, Truck, CheckCircle2, Timer, Sparkles, ArrowRight, Building2 } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { StatTile } from '../ui/StatTile';
import { PageHeader } from '../shared/PageHeader';
import { EmptyState } from '../shared/EmptyState';
import { ActiveRescueCard } from './ActiveRescueCard';
import { DonationItem, UserAccount } from '../../types';
import { summarizeDonations, isActive } from '../../utils/donationStats';

export interface RestaurantOverviewProps {
  account: UserAccount;
  /** Donations published by this branch. */
  branchDonations: DonationItem[];
  /** Every donation in the demo, for the network strip. */
  allDonations: DonationItem[];
  onCreateDonation: () => void;
  onFindRecipient: (donation: DonationItem) => void;
  onOpenTab: (tab: string) => void;
}

/**
 * Restaurant → Dashboard tab.
 * Branch-level situation report: what needs attention now, what is in flight,
 * and how this branch sits against activity across the other kitchens.
 */
export const RestaurantOverview: React.FC<RestaurantOverviewProps> = ({
  account,
  branchDonations,
  allDonations,
  onCreateDonation,
  onFindRecipient,
  onOpenTab,
}) => {
  const stats = summarizeDonations(branchDonations);
  const network = summarizeDonations(allDonations);
  const dominant = branchDonations.find(isActive);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <PageHeader
        eyebrow="Restaurant Operations · Dashboard"
        title={account.name}
        subtitle={`${account.facility} · Sample restaurant account`}
        actions={
          <Button variant="primary" size="lg" icon={<Plus size={20} />} onClick={onCreateDonation}>
            Create Donation
          </Button>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-6">
        <StatTile
          label="Awaiting a recipient"
          value={`${stats.awaitingMatch}`}
          hint={`${stats.mealsAwaitingMatch} meals ready to pledge`}
          icon={<Sparkles size={18} />}
          tone={stats.awaitingMatch > 0 ? 'primary' : 'default'}
        />
        <StatTile
          label="Out for delivery"
          value={`${stats.inFlight}`}
          hint={`${stats.mealsInFlight} meals with a courier`}
          icon={<Truck size={18} />}
        />
        <StatTile
          label="Handovers completed"
          value={`${stats.fulfilled}`}
          hint={`${stats.mealsFulfilled} meals served`}
          icon={<CheckCircle2 size={18} />}
          tone={stats.fulfilled > 0 ? 'success' : 'default'}
        />
        <StatTile
          label="Tightest safety window"
          value={
            stats.tightestWindowMinutes === null ? '—' : `${stats.tightestWindowMinutes} min`
          }
          hint={
            stats.tightestWindowMinutes === null
              ? 'No active donation'
              : 'Soonest freshness deadline'
          }
          icon={<Timer size={18} />}
          tone={
            stats.tightestWindowMinutes !== null && stats.tightestWindowMinutes <= 20
              ? 'warning'
              : 'default'
          }
        />
      </div>

      {dominant ? (
        <ActiveRescueCard
          donation={dominant}
          onFindRecipient={onFindRecipient}
          onTrackDelivery={() => onOpenTab('deliveries')}
        />
      ) : (
        <div className="my-8">
          <EmptyState
            icon={<Utensils size={40} />}
            title="No active donation for this branch"
            description="When this kitchen has safe surplus food, publishing a donation takes under a minute. Seeded demo activity sits with the branches that already have sample donations."
            action={
              <Button variant="primary" onClick={onCreateDonation}>
                Create Donation
              </Button>
            }
          />
        </div>
      )}

      {/* Branch vs network — makes clear whose numbers are whose */}
      <div className="my-8 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card padding="md" className="lg:col-span-2">
          <h2 className="text-lg font-semibold text-charcoal">Across ShareBite kitchens today</h2>
          <p className="text-metadata text-slate mt-1">
            Sample demo activity from every participating kitchen in the dataset, not just this
            branch.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 pt-4 border-t border-border-subtle text-sm">
            <div>
              <div className="text-xl font-semibold text-charcoal">{network.total}</div>
              <div className="text-metadata text-slate">Donations posted</div>
            </div>
            <div>
              <div className="text-xl font-semibold text-charcoal">{network.mealsTotal}</div>
              <div className="text-metadata text-slate">Meals offered</div>
            </div>
            <div>
              <div className="text-xl font-semibold text-charcoal">{network.inFlight}</div>
              <div className="text-metadata text-slate">In transit now</div>
            </div>
            <div>
              <div className="text-xl font-semibold text-charcoal">{network.institutionsReached}</div>
              <div className="text-metadata text-slate">Institutions engaged</div>
            </div>
          </div>
        </Card>

        <Card padding="md" className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-charcoal">Jump to</h2>
          <Button
            variant="secondary"
            icon={<Utensils size={16} />}
            onClick={() => onOpenTab('donations')}
            className="justify-start"
          >
            Manage donations
          </Button>
          <Button
            variant="secondary"
            icon={<Truck size={16} />}
            onClick={() => onOpenTab('deliveries')}
            className="justify-start"
          >
            Delivery status
          </Button>
          <Button
            variant="secondary"
            icon={<Building2 size={16} />}
            onClick={() => onOpenTab('impact')}
            className="justify-start"
          >
            Branch impact
          </Button>
          <span className="text-metadata text-slate flex items-center gap-1.5 mt-1">
            <ArrowRight size={13} /> All figures are sample demo data.
          </span>
        </Card>
      </div>
    </div>
  );
};
