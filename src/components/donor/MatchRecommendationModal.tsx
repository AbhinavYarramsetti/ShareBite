import React from 'react';
import { Sparkles, MapPin, Clock, Users, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { FreshnessBadge } from '../ui/FreshnessBadge';
import { DonationItem, RecipientInstitution, RecipientMatch } from '../../types';
import { calculateRecipientMatches } from '../../utils/matchingEngine';

export interface MatchRecommendationModalProps {
  isOpen: boolean;
  onClose: () => void;
  donation: DonationItem | null;
  institutions: RecipientInstitution[];
  onSelectRecipient: (donationId: string, recipient: RecipientInstitution) => void;
}

export const MatchRecommendationModal: React.FC<MatchRecommendationModalProps> = ({
  isOpen,
  onClose,
  donation,
  institutions,
  onSelectRecipient,
}) => {
  if (!donation) return null;

  const matches: RecipientMatch[] = calculateRecipientMatches(donation, institutions);

  const handleSelect = (recipient: RecipientInstitution) => {
    onSelectRecipient(donation.id, recipient);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Recommended Recipient Institutions"
      description="Deterministic matching prioritizing freshness window safety, dietary compatibility, and facility capacity."
      maxWidth="lg"
    >
      <div className="flex flex-col gap-5">
        {/* Donation Header Banner */}
        <div className="p-3.5 bg-cream rounded-lg border border-border-subtle flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-charcoal">
              {donation.quantity} Meals • {donation.title}
            </span>
            <span className="px-2 py-0.5 rounded bg-surface border border-border-subtle font-medium uppercase text-slate">
              {donation.dietaryType}
            </span>
          </div>
          <FreshnessBadge urgency={donation.urgency} minutesRemaining={donation.minutesRemaining} size="sm" />
        </div>

        {/* Explainability Callout */}
        <div className="text-xs text-slate flex items-center gap-1.5">
          <Sparkles size={14} className="text-primary flex-shrink-0" />
          <span>
            Ranked deterministically using: <strong>Freshness buffer → Dietary match → Capacity fit → Distance & ETA</strong>.
          </span>
        </div>

        {/* List of Scored Matches */}
        <div className="flex flex-col gap-3.5 max-h-[60vh] overflow-y-auto pr-1">
          {matches.map(({ institution, matchLevel, isBestMatch, matchReasons }) => (
            <Card
              key={institution.id}
              padding="md"
              highlight={isBestMatch}
              className={`transition-all ${isBestMatch ? 'border-primary shadow-subtle' : 'border-border-subtle'}`}
            >
              <div className="flex flex-col gap-3">
                {/* Header line */}
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-semibold text-charcoal">
                        {institution.name}
                      </h4>
                      {isBestMatch && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-primary text-white">
                          <CheckCircle2 size={12} /> Best Match
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate mt-0.5 flex items-center gap-1">
                      <ShieldCheck size={12} className="text-status-success" />
                      <span>{institution.type} • Capacity: {institution.capacityChildren} Children</span>
                    </div>
                  </div>

                  {/* Match level pill */}
                  <div className="text-right">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full inline-block border ${
                      isBestMatch
                        ? 'bg-primary text-white border-primary'
                        : 'bg-cream text-primary-dark border-border-subtle'
                    }`}>
                      {matchLevel}
                    </span>
                  </div>
                </div>

                {/* Logistics metadata */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-charcoal/90 pt-2 border-t border-border-subtle/80">
                  <div className="flex items-center gap-1.5">
                    <MapPin size={13} className="text-slate" />
                    <span>Approx. {institution.distanceKm} km</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={13} className="text-slate" />
                    <span>Est. ~{institution.etaMinutes} min travel</span>
                  </div>
                  <div className="flex items-center gap-1.5 col-span-2 sm:col-span-1">
                    <Users size={13} className="text-slate" />
                    <span>{institution.openHours}</span>
                  </div>
                </div>

                {/* Explainability Reasons */}
                <div className="bg-cream/60 p-2.5 rounded border border-border-subtle/60 text-xs">
                  <div className="font-semibold text-charcoal mb-1">Why recommended:</div>
                  <ul className="space-y-0.5 text-slate">
                    {matchReasons.map((r, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-primary font-bold">•</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action button */}
                <div className="flex items-center justify-end pt-1">
                  <Button
                    variant={isBestMatch ? 'primary' : 'secondary'}
                    size="sm"
                    icon={<ArrowRight size={14} />}
                    iconPosition="right"
                    onClick={() => handleSelect(institution)}
                  >
                    Select & Route to {institution.name}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end pt-3 border-t border-border-subtle">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};
