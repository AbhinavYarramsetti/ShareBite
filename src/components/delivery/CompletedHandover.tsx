import React from 'react';
import { CheckCircle2, ShieldCheck, HeartHandshake } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export interface CompletedHandoverProps {
  quantity: number;
  recipientName: string;
  onReset: () => void;
  onGoHome: () => void;
}

export const CompletedHandover: React.FC<CompletedHandoverProps> = ({
  quantity,
  recipientName,
  onReset,
  onGoHome,
}) => {
  return (
    <Card padding="lg" className="max-w-2xl mx-auto my-8 text-center border-status-success/30 shadow-card">
      <div className="w-16 h-16 rounded-full bg-status-success/10 border border-status-success/20 text-status-success flex items-center justify-center mx-auto mb-4">
        <CheckCircle2 size={36} strokeWidth={2.2} aria-hidden="true" />
      </div>

      <span className="text-xs font-semibold uppercase tracking-wider text-status-success flex items-center justify-center gap-1.5">
        <ShieldCheck size={14} /> Direct Handover Verified
      </span>

      <h2 className="text-h1 text-charcoal mt-2">
        ✓ Delivery Completed
      </h2>

      <p className="text-lg font-medium text-primary-dark mt-2">
        {quantity} meals reached {recipientName}.
      </p>

      <p className="text-body text-slate max-w-md mx-auto mt-2 text-sm leading-relaxed">
        Food was delivered while it was still within its freshness window.
      </p>

      <div className="grid grid-cols-3 gap-3 my-6 text-center max-w-lg mx-auto">
        <div className="p-3 bg-cream rounded-lg border border-border-subtle">
          <div className="text-xl font-bold text-primary-dark">{quantity}</div>
          <div className="text-[11px] text-slate font-medium uppercase mt-0.5">Meals Shared</div>
        </div>

        <div className="p-3 bg-cream rounded-lg border border-border-subtle">
          <div className="text-xl font-bold text-primary-dark">1</div>
          <div className="text-[11px] text-slate font-medium uppercase mt-0.5">Recipient Supported</div>
        </div>

        <div className="p-3 bg-cream rounded-lg border border-border-subtle">
          <div className="text-xl font-bold text-status-success">0 kg</div>
          <div className="text-[11px] text-slate font-medium uppercase mt-0.5">Food Wasted</div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button variant="primary" onClick={onReset}>
          Review Next Dispatch
        </Button>
        <Button variant="secondary" onClick={onGoHome}>
          Return to Overview
        </Button>
      </div>
    </Card>
  );
};
