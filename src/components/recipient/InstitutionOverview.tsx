import React from 'react';
import {
  Utensils,
  Truck,
  Users,
  Timer,
  ShieldCheck,
  HeartHandshake,
  ArrowRight,
  BarChart3,
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { StatTile } from '../ui/StatTile';
import { PageHeader } from '../shared/PageHeader';
import { EmptyState } from '../shared/EmptyState';
import { DonationRow } from '../shared/DonationRow';
import { FreshnessBadge } from '../ui/FreshnessBadge';
import { DeliveryMission, DonationItem, RecipientInstitution } from '../../types';
import { isAwaitingMatch, isInFlight, summarizeDonations } from '../../utils/donationStats';

export interface InstitutionOverviewProps {
  institution?: RecipientInstitution;
  donations: DonationItem[];
  mission: DeliveryMission;
  onOpenTab: (tab: string) => void;
}

/**
 * Institution → Dashboard tab.
 * What the facility coordinator needs at a glance: what is offered right now,
 * what is already on its way here, and the dietary rules meals must respect.
 */
export const InstitutionOverview: React.FC<InstitutionOverviewProps> = ({
  institution,
  donations,
  mission,
  onOpenTab,
}) => {
  const available = donations.filter((d) => isAwaitingMatch(d) && d.urgency !== 'expired');
  const incoming = donations.filter(
    (d) => isInFlight(d) && (!institution || !d.claimedBy || d.claimedBy === institution.name)
  );
  const stats = summarizeDonations(donations.filter((d) => d.claimedBy === institution?.name));
  const soonest = available.reduce<DonationItem | null>(
    (best, d) => (!best || d.minutesRemaining < best.minutesRemaining ? d : best),
    null
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <PageHeader
        eyebrow="Recipient Institution · Dashboard"
        title={institution?.name || 'Recipient Institution'}
        subtitle={
          institution
            ? `${institution.address} · Sample institution account`
            : 'Sample institution account'
        }
        badge={
          <span className="inline-flex items-center gap-1 text-xs font-medium text-status-success bg-status-success/10 px-2 py-0.5 rounded-full border border-status-success/20">
            <ShieldCheck size={12} /> Care Institution
          </span>
        }
        actions={
          <Button variant="primary" onClick={() => onOpenTab('available-meals')}>
            Browse available meals
          </Button>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-6">
        <StatTile
          label="Meals offered now"
          value={`${available.reduce((t, d) => t + d.quantity, 0)}`}
          hint={`${available.length} open donation${available.length === 1 ? '' : 's'}`}
          icon={<Utensils size={18} />}
          tone={available.length > 0 ? 'primary' : 'default'}
        />
        <StatTile
          label="On the way here"
          value={`${incoming.length}`}
          hint={incoming.length ? 'Courier in transit' : 'Nothing in transit'}
          icon={<Truck size={18} />}
        />
        <StatTile
          label="Children supported"
          value={`${institution?.capacityChildren ?? '—'}`}
          hint="Registered facility capacity"
          icon={<Users size={18} />}
        />
        <StatTile
          label="Soonest deadline"
          value={soonest ? `${soonest.minutesRemaining} min` : '—'}
          hint={soonest ? 'Freshness window on best offer' : 'No open offers'}
          icon={<Timer size={18} />}
          tone={soonest && soonest.minutesRemaining <= 20 ? 'warning' : 'default'}
        />
      </div>

      {/* Next arrival */}
      <div className="my-8">
        <h2 className="text-lg font-semibold text-charcoal mb-4">Next arrival</h2>
        {incoming.length === 0 ? (
          <EmptyState
            icon={<HeartHandshake size={38} />}
            title="No delivery inbound"
            description="Accept a donation from the available meals tab and the courier's live progress will show up here and under Deliveries."
            action={
              <Button variant="primary" onClick={() => onOpenTab('available-meals')}>
                See available meals
              </Button>
            }
          />
        ) : (
          <Card padding="lg" highlight className="border-primary/30">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate">
                  Mission #{mission.id}
                </span>
                <h3 className="text-xl font-semibold text-charcoal mt-1">
                  {incoming[0].quantity} Meals • {incoming[0].title}
                </h3>
                <p className="text-metadata text-slate mt-1">
                  From {incoming[0].donorName}
                  {incoming[0].donorBranch ? ` – ${incoming[0].donorBranch}` : ''} · Courier{' '}
                  {incoming[0].volunteerName || 'ShareBite volunteer'}
                </p>
              </div>
              <FreshnessBadge
                urgency={incoming[0].urgency}
                minutesRemaining={incoming[0].minutesRemaining}
                size="lg"
              />
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Button variant="primary" icon={<Truck size={16} />} onClick={() => onOpenTab('deliveries')}>
                Track this delivery
              </Button>
              <Button variant="secondary" icon={<BarChart3 size={16} />} onClick={() => onOpenTab('impact')}>
                Facility impact
              </Button>
            </div>
          </Card>
        )}
      </div>

      {/* Dietary requirements + recently accepted */}
      <div className="my-8 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card padding="md">
          <h2 className="text-base font-semibold text-charcoal">Dietary requirements on file</h2>
          <ul className="mt-3 flex flex-col gap-2">
            {(institution?.dietaryPreferences ?? []).map((pref) => (
              <li key={pref} className="text-sm text-charcoal flex items-start gap-2">
                <ShieldCheck size={14} className="text-primary mt-0.5 flex-shrink-0" />
                {pref}
              </li>
            ))}
          </ul>
          <p className="text-metadata text-slate mt-3 pt-3 border-t border-border-subtle">
            {institution?.openHours || 'Operating hours on file'} · Contact{' '}
            {institution?.contactPerson || 'facility coordinator'}
          </p>
        </Card>

        <div className="lg:col-span-2">
          <h2 className="text-base font-semibold text-charcoal mb-3">
            Recently accepted by this facility
          </h2>
          {stats.total === 0 ? (
            <Card padding="md" className="border-dashed">
              <p className="text-metadata text-slate">
                Donations this facility accepts will be listed here with the kitchen they came from.
              </p>
            </Card>
          ) : (
            <div className="flex flex-col gap-3">
              {donations
                .filter((d) => d.claimedBy === institution?.name)
                .map((d) => (
                  <DonationRow key={d.id} donation={d} showDonor showRoute />
                ))}
            </div>
          )}
          <span className="text-metadata text-slate flex items-center gap-1.5 mt-3">
            <ArrowRight size={13} /> All activity shown is sample demo data.
          </span>
        </div>
      </div>
    </div>
  );
};
