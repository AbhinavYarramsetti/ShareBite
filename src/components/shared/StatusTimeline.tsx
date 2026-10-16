import React from 'react';
import { DonationStatus } from '../../types';

interface Stage {
  id: string;
  label: string;
  statuses: DonationStatus[];
}

const STAGES: Stage[] = [
  { id: 'published', label: 'Published', statuses: ['draft', 'submitted'] },
  { id: 'matched', label: 'Recipient matched', statuses: ['matching'] },
  { id: 'accepted', label: 'Accepted', statuses: ['accepted'] },
  { id: 'pickup', label: 'Picked up', statuses: ['pickup-confirmed'] },
  { id: 'transit', label: 'In transit', statuses: ['in-transit'] },
  { id: 'handover', label: 'Handover', statuses: ['delivered', 'completed'] },
];

function currentStageIndex(status: DonationStatus): number {
  const idx = STAGES.findIndex((s) => s.statuses.includes(status));
  return idx === -1 ? 0 : idx;
}

export interface StatusTimelineProps {
  status: DonationStatus;
  /** Expired and cancelled donations stop wherever they got to. */
  halted?: boolean;
}

/** Compact read-only progress strip for a single donation. */
export const StatusTimeline: React.FC<StatusTimelineProps> = ({ status, halted = false }) => {
  const activeIdx = currentStageIndex(status);

  return (
    <ol className="flex flex-wrap items-center gap-x-2 gap-y-1.5" aria-label="Donation progress">
      {STAGES.map((stage, idx) => {
        const done = idx < activeIdx || (idx === activeIdx && status === 'completed');
        const current = idx === activeIdx && !done;
        const tone = halted
          ? idx <= activeIdx
            ? 'bg-slate-muted/20 text-slate border-slate-muted/40'
            : 'bg-cream text-slate/60 border-border-subtle'
          : done
          ? 'bg-status-success/10 text-status-success border-status-success/30'
          : current
          ? 'bg-primary text-white border-primary'
          : 'bg-cream text-slate/70 border-border-subtle';

        return (
          <li key={stage.id} className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[11px] font-medium ${tone}`}
              aria-current={current ? 'step' : undefined}
            >
              {done && !halted && <span aria-hidden="true">✓</span>}
              {stage.label}
            </span>
            {idx < STAGES.length - 1 && (
              <span className="text-slate-muted text-[11px]" aria-hidden="true">
                ·
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
};
