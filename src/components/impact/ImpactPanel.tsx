import React from 'react';
import { Utensils, Leaf, Building2, Trash2, Info, Trophy } from 'lucide-react';
import { Card } from '../ui/Card';
import { StatTile } from '../ui/StatTile';
import { PageHeader } from '../shared/PageHeader';
import { DonationItem } from '../../types';
import {
  CO2E_KG_PER_MEAL,
  FOOD_KG_PER_MEAL,
  donorTally,
  recipientTally,
  summarizeDonations,
} from '../../utils/donationStats';
import { IMPACT_METRICS } from '../../data/mockData';

export interface ImpactPanelProps {
  /** 'restaurant' counts meals given; 'institution' counts meals received. */
  scope: 'restaurant' | 'institution';
  scopeName: string;
  /** Donations in scope (this branch, or those claimed by the institution). */
  donations: DonationItem[];
}

/**
 * Impact tab for both the restaurant and institution views.
 * Figures are derived from the demo donation records in front of the user —
 * the conversion assumptions are printed alongside them rather than implied.
 */
export const ImpactPanel: React.FC<ImpactPanelProps> = ({ scope, scopeName, donations }) => {
  const stats = summarizeDonations(donations);
  const isRestaurant = scope === 'restaurant';
  const partners = isRestaurant ? recipientTally(donations) : donorTally(donations);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <PageHeader
        eyebrow={`${isRestaurant ? 'Restaurant Operations' : 'Recipient Institution'} · Impact`}
        title={isRestaurant ? 'Meals shared from this kitchen' : 'Meals received at this facility'}
        subtitle={`${scopeName} · derived from this demo's donation records`}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-6">
        <StatTile
          label={isRestaurant ? 'Meals shared' : 'Meals received'}
          value={`${stats.mealsFulfilled}`}
          hint={`${stats.fulfilled} completed handover${stats.fulfilled === 1 ? '' : 's'}`}
          icon={<Utensils size={18} />}
          tone="primary"
        />
        <StatTile
          label={isRestaurant ? 'Institutions reached' : 'Partner kitchens'}
          value={`${partners.length}`}
          hint={isRestaurant ? 'Care facilities served' : 'Restaurants contributing'}
          icon={<Building2 size={18} />}
        />
        <StatTile
          label="Food diverted"
          value={`${stats.foodKgDiverted} kg`}
          hint={`At ${FOOD_KG_PER_MEAL} kg per meal`}
          icon={<Trash2 size={18} />}
        />
        <StatTile
          label="CO₂e averted"
          value={`${stats.co2eKgAverted} kg`}
          hint={`At ${CO2E_KG_PER_MEAL} kg per meal`}
          icon={<Leaf size={18} />}
          tone="success"
        />
      </div>

      {/* Where the meals went / came from */}
      <div className="my-8">
        <h2 className="text-lg font-semibold text-charcoal mb-4">
          {isRestaurant ? 'Where these meals went' : 'Where these meals came from'}
        </h2>

        {partners.length === 0 ? (
          <Card padding="lg" className="border-dashed text-center py-10">
            <Trophy size={34} className="mx-auto text-slate mb-3" />
            <h3 className="text-base font-semibold text-charcoal">No completed handovers yet</h3>
            <p className="text-metadata text-slate mt-1 max-w-md mx-auto">
              {isRestaurant
                ? 'Complete a delivery in the demo and the receiving institutions will be listed here.'
                : 'Accept a donation and follow it through handover to populate this breakdown.'}
            </p>
          </Card>
        ) : (
          <Card padding="none">
            <ul className="divide-y divide-border-subtle">
              {partners.map((p) => {
                const share = stats.mealsFulfilled
                  ? Math.round((p.meals / stats.mealsFulfilled) * 100)
                  : 0;
                return (
                  <li key={p.name} className="p-4 sm:p-5 flex items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-charcoal truncate">{p.name}</div>
                      <div className="text-metadata text-slate">
                        {p.deliveries} handover{p.deliveries === 1 ? '' : 's'} · {share}% of meals
                      </div>
                      <div
                        className="mt-2 h-1.5 rounded-full bg-cream border border-border-subtle overflow-hidden"
                        role="presentation"
                      >
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${Math.max(share, 4)}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-lg font-semibold text-primary-dark">{p.meals}</div>
                      <div className="text-metadata text-slate">meals</div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Card>
        )}
      </div>

      {/* Platform context + methodology */}
      <div className="my-8 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card padding="md" className="lg:col-span-2">
          <h2 className="text-lg font-semibold text-charcoal">Platform-wide sample activity</h2>
          <p className="text-metadata text-slate mt-1">
            Illustrative ShareBite totals across Chennai, shown for context only.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 pt-4 border-t border-border-subtle">
            <div>
              <div className="text-xl font-semibold text-charcoal">
                {IMPACT_METRICS.totalMealsRescued.toLocaleString()}
              </div>
              <div className="text-metadata text-slate">Meals shared</div>
            </div>
            <div>
              <div className="text-xl font-semibold text-charcoal">
                {IMPACT_METRICS.activeInstitutions}
              </div>
              <div className="text-metadata text-slate">Care centres</div>
            </div>
            <div>
              <div className="text-xl font-semibold text-charcoal">
                {IMPACT_METRICS.averageDispatchMinutes} min
              </div>
              <div className="text-metadata text-slate">Avg dispatch</div>
            </div>
            <div>
              <div className="text-xl font-semibold text-charcoal">
                {(IMPACT_METRICS.co2PreventedKg / 1000).toFixed(1)} t
              </div>
              <div className="text-metadata text-slate">CO₂e averted</div>
            </div>
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center gap-2">
            <Info size={16} className="text-primary flex-shrink-0" aria-hidden="true" />
            <h2 className="text-base font-semibold text-charcoal">How these are calculated</h2>
          </div>
          <ul className="mt-3 text-metadata text-slate space-y-2 list-disc pl-4">
            <li>Meals counted only once a handover is marked delivered or completed.</li>
            <li>
              Food weight assumes {FOOD_KG_PER_MEAL} kg per meal; CO₂e assumes{' '}
              {CO2E_KG_PER_MEAL} kg per meal.
            </li>
            <li>
              These are illustrative demo estimates, not audited outcomes, and not claims about any
              listed business.
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};
