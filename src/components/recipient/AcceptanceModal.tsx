import React, { useState } from 'react';
import { Check, ShieldCheck, MapPin, Clock } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { FreshnessBadge } from '../ui/FreshnessBadge';
import { DonationItem } from '../../types';
import { distanceLabel, travelTimeLabel } from '../../utils/routeDisplay';

export interface AcceptanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  donation: DonationItem | null;
  onConfirmAccept: (donationId: string) => void;
}

export const AcceptanceModal: React.FC<AcceptanceModalProps> = ({
  isOpen,
  onClose,
  donation,
  onConfirmAccept,
}) => {
  const [caregiverConfirmed, setCaregiverConfirmed] = useState(true);

  if (!donation) return null;

  const handleConfirm = () => {
    onConfirmAccept(donation.id);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Accept Surplus Meal Donation"
      description="Confirm receipt details for your institution. ShareBite will coordinate a courier for the estimated route."
      maxWidth="md"
    >
      <div className="flex flex-col gap-5">
        {/* Donation Summary Card */}
        <div className="p-4 bg-cream rounded-lg border border-border-subtle flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <FreshnessBadge urgency={donation.urgency} minutesRemaining={donation.minutesRemaining} />
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-surface border border-border-subtle uppercase text-slate">
              {donation.dietaryType}
            </span>
          </div>

          <div>
            <h3 className="text-xl font-bold text-primary-dark">
              {donation.quantity} Meals • {donation.title}
            </h3>
            <p className="text-xs text-charcoal/80 mt-1">{donation.description}</p>
          </div>

          <div className="pt-3 border-t border-border-subtle text-xs text-charcoal grid grid-cols-2 gap-2">
            <div className="flex items-center gap-1.5">
              <MapPin size={14} className="text-slate" />
              <span>{donation.donorName} · {distanceLabel(donation)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={14} className="text-slate" />
              <span>{travelTimeLabel(donation)}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate">
            Receiving Facility
          </span>
          <div className="p-3 bg-surface rounded border border-border-subtle text-sm">
            <div className="font-semibold text-charcoal">Bala Mandir Kamaraj Trust</div>
            <div className="text-xs text-slate mt-0.5">No. 8, G.N. Chetty Road, T. Nagar, Chennai – 600 017</div>
            <div className="text-xs text-primary-dark font-medium mt-1 flex items-center gap-1">
              <ShieldCheck size={14} /> Children's Residential Home
            </div>
          </div>
        </div>

        {/* Acknowledgment */}
        <label className="flex items-start gap-3 cursor-pointer select-none bg-cream-surface p-3 rounded border border-border-subtle">
          <input
            type="checkbox"
            checked={caregiverConfirmed}
            onChange={(e) => setCaregiverConfirmed(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-border-subtle text-primary focus:ring-primary"
          />
          <span className="text-xs text-charcoal leading-relaxed">
            I confirm our kitchen staff is available to inspect temperature and receive this donation within 20 minutes of arrival.
          </span>
        </label>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-border-subtle">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            disabled={!caregiverConfirmed}
            icon={<Check size={18} />}
            onClick={handleConfirm}
          >
            Confirm & Dispatch Courier
          </Button>
        </div>
      </div>
    </Modal>
  );
};
