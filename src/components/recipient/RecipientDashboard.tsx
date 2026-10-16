import React, { useState } from 'react';
import { Utensils, MapPin, Clock, ShieldCheck, HeartHandshake } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { FreshnessBadge } from '../ui/FreshnessBadge';
import { AcceptanceModal } from './AcceptanceModal';
import { SelectionPill } from '../ui/SelectionPill';
import { DonationItem, DietaryType } from '../../types';
import { distanceLabel, travelTimeLabel } from '../../utils/routeDisplay';

export interface RecipientDashboardProps {
  donations: DonationItem[];
  onAcceptDonation: (donationId: string) => void;
  onViewDelivery: () => void;
}

export const RecipientDashboard: React.FC<RecipientDashboardProps> = ({
  donations,
  onAcceptDonation,
  onViewDelivery,
}) => {
  const [filter, setFilter] = useState<'all' | DietaryType>('all');
  const [selectedDonation, setSelectedDonation] = useState<DonationItem | null>(null);

  // Available meals are in submitted or matching status and not expired
  const availableDonations = donations.filter(
    (d) => (d.status === 'submitted' || d.status === 'matching') && d.urgency !== 'expired'
  );

  const filteredDonations =
    filter === 'all'
      ? availableDonations
      : availableDonations.filter((d) => d.dietaryType === filter);

  const filterOptions: { value: 'all' | DietaryType; label: string }[] = [
    { value: 'all', label: 'All Diets' },
    { value: 'vegetarian', label: 'Vegetarian Only' },
    { value: 'non-vegetarian', label: 'Non-Vegetarian' },
    { value: 'mixed', label: 'Mixed Assortment' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-border-subtle">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate">
              Recipient Institution
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-status-success bg-status-success/10 px-2 py-0.5 rounded-full border border-status-success/20">
              <ShieldCheck size={12} /> Care Institution
            </span>
          </div>
          <h1 className="text-h1 text-charcoal mt-1">Bala Mandir Kamaraj Trust</h1>
          <p className="text-metadata text-slate">
            No. 8, G.N. Chetty Road, T. Nagar, Chennai – 600 017 · Sample institution account
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="secondary" onClick={onViewDelivery}>
            Active Deliveries
          </Button>
        </div>
      </div>

      {/* Filter and Overview Counts */}
      <div className="my-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <SelectionPill<'all' | DietaryType>
          options={filterOptions}
          value={filter}
          onChange={setFilter}
        />

        <div className="text-sm text-slate">
          Showing <span className="font-semibold text-charcoal">{filteredDonations.length}</span> verified fresh meal opportunities
        </div>
      </div>

      {/* Available Meals Feed */}
      <div className="space-y-4 my-6">
        {filteredDonations.length === 0 ? (
          /* Empty State */
          <Card padding="lg" className="text-center py-12 border-dashed">
            <HeartHandshake size={38} className="mx-auto text-slate mb-3" />
            <h3 className="text-lg font-semibold text-charcoal">No suitable meals right now.</h3>
            <p className="text-metadata text-slate mt-1 max-w-md mx-auto">
              We'll show available donations here when fresh meals match your facility's needs and dietary preferences.
            </p>
          </Card>
        ) : (
          filteredDonations.map((item) => (
            <Card
              key={item.id}
              padding="lg"
              highlight={item.urgency === 'urgent'}
              className="hover:border-slate-muted transition-colors"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Left/Middle Column: Focus Hierarchy */}
                {/* 1. Freshness, 2. Quantity, 3. Food type, 4. Dietary, 5. Distance/ETA, 6. Primary Action */}
                <div className="md:col-span-8 flex flex-col gap-2">
                  <div className="flex flex-wrap items-center gap-2.5">
                    {/* 1. Freshness remaining */}
                    <FreshnessBadge urgency={item.urgency} minutesRemaining={item.minutesRemaining} />
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-cream border border-border-subtle uppercase text-slate">
                      {item.dietaryType}
                    </span>
                    <span className="text-metadata text-xs">
                      Cooked {item.prepTimeMinutesAgo}m ago
                    </span>
                  </div>

                  {/* 2. Quantity + 3. Food type */}
                  <div className="mt-1">
                    <h2 className="text-xl sm:text-2xl font-bold text-charcoal">
                      {item.quantity} Meals • {item.title}
                    </h2>
                    <p className="text-sm text-charcoal/80 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* 5. Distance / ETA & packaging */}
                  <div className="flex flex-wrap items-center gap-4 text-xs text-charcoal/80 pt-2 border-t border-border-subtle/70 mt-1">
                    <div className="flex items-center gap-1.5">
                      <MapPin size={14} className="text-slate flex-shrink-0" />
                      <span>
                        {item.donorName}
                        {item.donorBranch ? ` – ${item.donorBranch}` : ''} · {distanceLabel(item)}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Clock size={14} className="text-slate flex-shrink-0" />
                      <span>{travelTimeLabel(item)}</span>
                    </div>

                    <div className="text-slate">
                      Packaging: <span className="text-charcoal font-medium">{item.packagingType}</span>
                    </div>
                  </div>
                </div>

                {/* Right Column: 6. Dominant Primary Action */}
                <div className="md:col-span-4 flex flex-col items-start md:items-end justify-center gap-3">
                  <Button
                    variant="primary"
                    size="md"
                    className="w-full sm:w-auto"
                    onClick={() => setSelectedDonation(item)}
                  >
                    Accept Donation
                  </Button>
                  <span className="text-xs text-slate">
                    Coordinated delivery service
                  </span>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Recipient Acceptance Modal */}
      <AcceptanceModal
        isOpen={!!selectedDonation}
        onClose={() => setSelectedDonation(null)}
        donation={selectedDonation}
        onConfirmAccept={onAcceptDonation}
      />
    </div>
  );
};
