import React from 'react';
import { Plus, CheckCircle2, Sparkles, Utensils, Truck } from 'lucide-react';
import { Button } from '../ui/Button';
import { PageHeader } from '../shared/PageHeader';
import { EmptyState } from '../shared/EmptyState';
import { DonationRow } from '../shared/DonationRow';
import { DonationItem, UserAccount } from '../../types';
import { isActive, isClosed, isFulfilled, summarizeDonations } from '../../utils/donationStats';

export interface DonorDashboardProps {
  /** Donations published by the selected branch. */
  donations: DonationItem[];
  onOpenCreate: () => void;
  onFindRecipient: (donation: DonationItem) => void;
  onViewDelivery: () => void;
  currentAccount?: UserAccount;
}

/**
 * Restaurant → Donations tab.
 * Working list for the kitchen: publish surplus, run the matching engine on an
 * open donation, and see where every donation from this branch stands.
 */
export const DonorDashboard: React.FC<DonorDashboardProps> = ({
  donations,
  onOpenCreate,
  onFindRecipient,
  onViewDelivery,
  currentAccount,
}) => {
  const stats = summarizeDonations(donations);
  const openDonations = donations.filter(isActive);
  const closedDonations = donations.filter((d) => isFulfilled(d) || isClosed(d));

  const rowActions = (item: DonationItem) => {
    if (isActive(item) && item.status !== 'accepted' && item.status !== 'pickup-confirmed' && item.status !== 'in-transit') {
      return (
        <Button
          variant="secondary"
          size="sm"
          icon={<Sparkles size={14} />}
          onClick={() => onFindRecipient(item)}
        >
          Find Recipient
        </Button>
      );
    }
    if (isActive(item)) {
      return (
        <Button variant="secondary" size="sm" icon={<Truck size={14} />} onClick={onViewDelivery}>
          Track Courier
        </Button>
      );
    }
    if (isFulfilled(item)) {
      return (
        <span className="text-xs font-medium text-status-success flex items-center gap-1">
          <CheckCircle2 size={14} /> Completed
        </span>
      );
    }
    return <span className="text-xs text-slate">Safe window expired</span>;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <PageHeader
        eyebrow="Restaurant Operations · Donations"
        title={currentAccount ? currentAccount.name : 'Restaurant Account'}
        subtitle={
          currentAccount
            ? `${currentAccount.facility} · Sample restaurant account`
            : 'Sample restaurant account'
        }
        actions={
          <Button
            variant="primary"
            size="lg"
            icon={<Plus size={20} />}
            onClick={onOpenCreate}
          >
            Create Donation
          </Button>
        }
      />

      <div className="my-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
        <span className="text-charcoal">
          <strong className="font-semibold">{stats.total}</strong> donation
          {stats.total === 1 ? '' : 's'} from this branch
        </span>
        <span className="text-slate">
          {stats.awaitingMatch} awaiting a recipient · {stats.inFlight} out for delivery ·{' '}
          {stats.fulfilled} completed
        </span>
      </div>

      {/* Open donations */}
      <div className="my-8">
        <h2 className="text-lg font-semibold text-charcoal mb-4">Open donations</h2>
        {openDonations.length === 0 ? (
          <EmptyState
            icon={<Utensils size={40} />}
            title="No open donations"
            description="When this kitchen has safe surplus food, you can publish a donation in under a minute and the matching engine will rank suitable care institutions."
            action={
              <Button variant="primary" onClick={onOpenCreate}>
                Create Donation
              </Button>
            }
          />
        ) : (
          <div className="flex flex-col gap-3">
            {openDonations.map((item) => (
              <DonationRow
                key={item.id}
                donation={item}
                showFreshness
                showRecipient
                showRoute
                showTimeline
                actions={rowActions(item)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Closed donations */}
      {closedDonations.length > 0 && (
        <div className="my-8">
          <h2 className="text-lg font-semibold text-charcoal mb-4">Closed donations</h2>
          <div className="flex flex-col gap-3">
            {closedDonations.map((item) => (
              <DonationRow
                key={item.id}
                donation={item}
                showRecipient
                actions={rowActions(item)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
