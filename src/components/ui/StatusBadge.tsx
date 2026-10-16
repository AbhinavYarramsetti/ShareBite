import React from 'react';
import {
  FileEdit,
  Send,
  Sparkles,
  Check,
  PackageCheck,
  Truck,
  CheckCircle2,
  Trophy,
  XCircle,
  Ban,
} from 'lucide-react';
import { DonationStatus } from '../../types';

export interface StatusBadgeProps {
  status: DonationStatus;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const sizeClasses =
    size === 'sm' ? 'text-xs px-2 py-0.5 gap-1' : 'text-xs sm:text-sm px-2.5 py-1 gap-1.5';
  const iconSize = size === 'sm' ? 12 : 14;

  switch (status) {
    case 'draft':
      return (
        <span className={`inline-flex items-center font-medium rounded-full bg-cream text-charcoal border border-border-subtle ${sizeClasses}`}>
          <FileEdit size={iconSize} className="text-slate" aria-hidden="true" />
          <span>Draft</span>
        </span>
      );

    case 'submitted':
      return (
        <span className={`inline-flex items-center font-medium rounded-full bg-cream text-primary-dark border border-slate-muted ${sizeClasses}`}>
          <Send size={iconSize} className="text-primary" aria-hidden="true" />
          <span>Submitted</span>
        </span>
      );

    case 'matching':
      return (
        <span className={`inline-flex items-center font-medium rounded-full bg-sage-light text-primary-dark border border-sage/40 ${sizeClasses}`}>
          <Sparkles size={iconSize} className="text-primary" aria-hidden="true" />
          <span>Matching Recipient</span>
        </span>
      );

    case 'accepted':
      return (
        <span className={`inline-flex items-center font-medium rounded-full bg-status-success/10 text-status-success border border-status-success/20 ${sizeClasses}`}>
          <Check size={iconSize} strokeWidth={2.5} aria-hidden="true" />
          <span>Accepted by Institution</span>
        </span>
      );

    case 'pickup-confirmed':
      return (
        <span className={`inline-flex items-center font-medium rounded-full bg-cream-surface text-charcoal border border-slate-muted ${sizeClasses}`}>
          <PackageCheck size={iconSize} className="text-primary" aria-hidden="true" />
          <span>Pickup Confirmed</span>
        </span>
      );

    case 'in-transit':
      return (
        <span className={`inline-flex items-center font-medium rounded-full bg-cream-surface text-charcoal border border-slate-muted ${sizeClasses}`}>
          <Truck size={iconSize} className="text-slate" aria-hidden="true" />
          <span>In Transit</span>
        </span>
      );

    case 'delivered':
      return (
        <span className={`inline-flex items-center font-medium rounded-full bg-status-success/15 text-status-success border border-status-success/30 ${sizeClasses}`}>
          <CheckCircle2 size={iconSize} strokeWidth={2.5} aria-hidden="true" />
          <span>Delivered</span>
        </span>
      );

    case 'completed':
      return (
        <span className={`inline-flex items-center font-medium rounded-full bg-status-success/20 text-status-success border border-status-success/40 ${sizeClasses}`}>
          <Trophy size={iconSize} strokeWidth={2} aria-hidden="true" />
          <span>Rescue Completed</span>
        </span>
      );

    case 'expired':
      return (
        <span className={`inline-flex items-center font-medium rounded-full bg-status-critical/10 text-status-critical border border-status-critical/20 ${sizeClasses}`}>
          <XCircle size={iconSize} strokeWidth={2} aria-hidden="true" />
          <span>Expired Window</span>
        </span>
      );

    case 'cancelled':
      return (
        <span className={`inline-flex items-center font-medium rounded-full bg-status-critical/10 text-status-critical border border-status-critical/20 ${sizeClasses}`}>
          <Ban size={iconSize} strokeWidth={2} aria-hidden="true" />
          <span>Cancelled</span>
        </span>
      );
  }
};
