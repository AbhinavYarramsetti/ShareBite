import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, ShieldCheck, MapPin, Clock, PackageCheck } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { FreshnessBadge } from '../ui/FreshnessBadge';
import { CompletedHandover } from './CompletedHandover';
import { DeliveryMission } from '../../types';

export interface DeliveryTrackerProps {
  mission: DeliveryMission;
  onMissionComplete: (missionId: string) => void;
  onGoHome: () => void;
}

export const DeliveryTracker: React.FC<DeliveryTrackerProps> = ({
  mission,
  onMissionComplete,
  onGoHome,
}) => {
  // Timeline stages
  const [timelineStage, setTimelineStage] = useState<
    'accepted' | 'pickup' | 'transit' | 'arriving' | 'delivered'
  >('transit');

  // Safety checklist
  const [safetyChecked, setSafetyChecked] = useState({
    packagingIntact: true,
    foodLabelled: true,
    preparedTimeVerified: true,
    recipientDetailsConfirmed: true,
  });

  const timelineSteps = [
    { id: 'accepted', label: 'Donation Accepted' },
    { id: 'pickup', label: 'Pickup Confirmed' },
    { id: 'transit', label: 'In Transit' },
    { id: 'arriving', label: 'Arriving Soon' },
    { id: 'delivered', label: 'Delivered' },
  ];

  const currentIdx = timelineSteps.findIndex((s) => s.id === timelineStage);

  const handleAdvance = () => {
    if (timelineStage === 'accepted') setTimelineStage('pickup');
    else if (timelineStage === 'pickup') setTimelineStage('transit');
    else if (timelineStage === 'transit') setTimelineStage('arriving');
    else if (timelineStage === 'arriving') {
      setTimelineStage('delivered');
      onMissionComplete(mission.id);
    }
  };

  if (timelineStage === 'delivered') {
    return (
      <CompletedHandover
        quantity={mission.quantity}
        recipientName={mission.recipientName}
        onReset={() => setTimelineStage('pickup')}
        onGoHome={onGoHome}
      />
    );
  }

  const allChecksPass =
    safetyChecked.packagingIntact &&
    safetyChecked.foodLabelled &&
    safetyChecked.preparedTimeVerified &&
    safetyChecked.recipientDetailsConfirmed;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <div className="pb-6 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate">
            Delivery Partner View
          </span>
          <span className="text-xs font-medium text-primary bg-cream px-2 py-0.5 rounded border border-border-subtle">
            Delivery #{mission.id}
          </span>
        </div>
        <h1 className="text-h1 text-charcoal mt-1">Delivery Progress & Safety</h1>
        <p className="text-metadata text-slate">
          Assigned Courier: Kavya Rajan • High-priority surplus food transit
        </p>
      </div>

      {/* Delivery Timeline */}
      <div className="my-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate block mb-3">
          Delivery Progress
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {timelineSteps.map((step, idx) => {
            const isCompleted = idx < currentIdx;
            const isCurrent = idx === currentIdx;

            return (
              <div
                key={step.id}
                className={`p-3 rounded-lg border text-left flex flex-col justify-between min-h-[72px] transition-colors ${
                  isCurrent
                    ? 'border-primary bg-surface shadow-subtle'
                    : isCompleted
                    ? 'border-status-success/40 bg-status-success/5'
                    : 'border-border-subtle bg-surface/50 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate">
                    Step {idx + 1}
                  </span>
                  {isCompleted && (
                    <span className="text-status-success text-xs font-bold" aria-label="Completed">
                      ✓
                    </span>
                  )}
                  {isCurrent && (
                    <span className="text-primary text-xs font-bold animate-pulse" aria-label="Current">
                      ●
                    </span>
                  )}
                  {!isCompleted && !isCurrent && (
                    <span className="text-slate/60 text-xs font-bold" aria-label="Upcoming">
                      ○
                    </span>
                  )}
                </div>
                <div className="text-xs font-semibold text-charcoal mt-1 leading-snug">
                  {step.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Current Active Step Details */}
      <Card padding="lg" highlight className="mb-8 border-primary/40">
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate">
                Current Operation
              </span>
              <h2 className="text-2xl font-bold text-charcoal mt-0.5">
                {timelineStage === 'accepted' && 'Donation Accepted: Prepare for Pickup'}
                {timelineStage === 'pickup' && 'Pickup & Verify Temperature at Kitchen'}
                {timelineStage === 'transit' && 'In Transit: Courier En Route'}
                {timelineStage === 'arriving' && 'Arriving Soon at Recipient Facility'}
              </h2>
            </div>
            <FreshnessBadge urgency={mission.urgency} minutesRemaining={mission.minutesRemaining} />
          </div>

          {/* Route & Cargo Specifications */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-cream rounded-lg border border-border-subtle text-sm">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate mb-1">
                Pickup Location (Restaurant)
              </div>
              <div className="font-semibold text-charcoal">{mission.donorName}</div>
              <div className="text-xs text-slate mt-0.5">{mission.donorAddress}</div>
            </div>

            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate mb-1">
                Dropoff Location (Care Institution)
              </div>
              <div className="font-semibold text-charcoal">{mission.recipientName}</div>
              <div className="text-xs text-slate mt-0.5">{mission.recipientAddress}</div>
            </div>

            <div className="pt-2 border-t border-border-subtle sm:col-span-2 flex flex-wrap justify-between text-xs text-charcoal">
              <span><strong>Quantity:</strong> {mission.quantity} Meals ({mission.dietaryType})</span>
              <span><strong>Item:</strong> {mission.donationTitle}</span>
              <span><strong>Transport:</strong> Insulated thermal container</span>
            </div>
          </div>

          {/* Volunteer Safety Checklist */}
          <div className="flex flex-col gap-3 p-4 bg-surface rounded-lg border border-border-subtle">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-primary" />
              Volunteer Safety Checklist
            </span>

            <label className="flex items-center gap-3 cursor-pointer text-xs sm:text-sm text-charcoal select-none">
              <input
                type="checkbox"
                checked={safetyChecked.packagingIntact}
                onChange={(e) =>
                  setSafetyChecked((prev) => ({ ...prev, packagingIntact: e.target.checked }))
                }
                className="h-4 w-4 rounded border-border-subtle text-primary focus:ring-primary"
              />
              <span>✓ Packaging intact and sanitary</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer text-xs sm:text-sm text-charcoal select-none">
              <input
                type="checkbox"
                checked={safetyChecked.foodLabelled}
                onChange={(e) =>
                  setSafetyChecked((prev) => ({ ...prev, foodLabelled: e.target.checked }))
                }
                className="h-4 w-4 rounded border-border-subtle text-primary focus:ring-primary"
              />
              <span>✓ Food labelled with menu items & dietary tags</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer text-xs sm:text-sm text-charcoal select-none">
              <input
                type="checkbox"
                checked={safetyChecked.preparedTimeVerified}
                onChange={(e) =>
                  setSafetyChecked((prev) => ({ ...prev, preparedTimeVerified: e.target.checked }))
                }
                className="h-4 w-4 rounded border-border-subtle text-primary focus:ring-primary"
              />
              <span>✓ Prepared time verified — food is within its freshness window</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer text-xs sm:text-sm text-charcoal select-none">
              <input
                type="checkbox"
                checked={safetyChecked.recipientDetailsConfirmed}
                onChange={(e) =>
                  setSafetyChecked((prev) => ({
                    ...prev,
                    recipientDetailsConfirmed: e.target.checked,
                  }))
                }
                className="h-4 w-4 rounded border-border-subtle text-primary focus:ring-primary"
              />
              <span>✓ Recipient details and caregiver arrival confirmed</span>
            </label>
          </div>

          {/* Advance Step Action Button */}
          <div className="pt-4 border-t border-border-subtle flex items-center justify-between">
            <span className="text-xs text-slate">
              {timelineStage === 'transit'
                ? 'Transit ETA ~7 mins remaining'
                : 'All safety checklist items required'}
            </span>

            <Button
              variant="primary"
              size="lg"
              icon={<ArrowRight size={18} />}
              iconPosition="right"
              disabled={!allChecksPass}
              onClick={handleAdvance}
            >
              {timelineStage === 'accepted' && 'Confirm Pickup & Begin Route'}
              {timelineStage === 'pickup' && 'Confirm Pickup Complete'}
              {timelineStage === 'transit' && 'Mark Arriving Soon'}
              {timelineStage === 'arriving' && 'Confirm Handover & Complete'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
