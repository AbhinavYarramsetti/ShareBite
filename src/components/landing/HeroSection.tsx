import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Clock, MapPin, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { FreshnessBadge } from '../ui/FreshnessBadge';
import { ProcessDiagram } from './ProcessDiagram';
import { ImpactSummary } from './ImpactSummary';

export interface HeroSectionProps {
  onOpenAppAsRestaurant: () => void;
  onOpenAppAsInstitution: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenAppAsRestaurant,
  onOpenAppAsInstitution,
}) => {
  return (
    <div className="bg-cream">
      {/* Hero Section with 2-Column Desktop Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Core Messaging */}
          <div className="lg:col-span-7">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage-light text-primary-dark text-xs font-semibold uppercase tracking-wider mb-5 border border-sage/40">
              <ShieldCheck size={14} className="text-primary" aria-hidden="true" />
              <span>Surplus Food Redirection Network</span>
            </div>

            {/* Headline */}
            <h1 className="text-display text-primary-dark tracking-tight">
              Turn Surplus Meals Into Shared Meals.
            </h1>

            {/* Supporting text */}
            <p className="text-body text-slate text-lg mt-5 leading-relaxed max-w-xl">
              ShareBite connects Chennai restaurants and commercial kitchens with nearby child-care
              institutions and care centres. Every donation is tracked within its freshness window,
              helping redirect surplus food while it is still fresh.
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-8">
              <Button
                variant="primary"
                size="lg"
                icon={<ArrowRight size={18} />}
                iconPosition="right"
                onClick={onOpenAppAsRestaurant}
              >
                Donate Surplus Meals
              </Button>

              <Button
                variant="secondary"
                size="lg"
                onClick={onOpenAppAsInstitution}
              >
                Institution Portal
              </Button>
            </div>

            {/* Trust Guarantees */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 pt-8 border-t border-border-subtle text-charcoal">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={17} className="text-status-success flex-shrink-0" aria-hidden="true" />
                <span className="text-sm font-medium">Freshness Window Tracked</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={17} className="text-status-success flex-shrink-0" aria-hidden="true" />
                <span className="text-sm font-medium">Participating Institutions</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock size={17} className="text-primary flex-shrink-0" aria-hidden="true" />
                <span className="text-sm font-medium">Estimated Pickup &amp; Delivery</span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Donation Preview Card — Chennai sample data */}
          <div className="lg:col-span-5">
            <div className="bg-surface rounded-xl border border-border-subtle shadow-card p-6 relative overflow-hidden">
              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-border-subtle">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-status-success animate-pulse" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-charcoal">
                    Surplus Redirection
                  </span>
                </div>
                <span className="text-xs font-medium text-slate">Ready for Transit</span>
              </div>

              {/* Meal & Freshness Details */}
              <div className="py-4 space-y-3">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-3xl font-bold text-primary-dark">30 Meals</span>
                    <h3 className="text-base font-semibold text-charcoal mt-0.5">
                      Idli, Sambar &amp; Coconut Chutney
                    </h3>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded bg-cream border border-border-subtle uppercase text-slate">
                    Vegetarian
                  </span>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <FreshnessBadge urgency="fresh" minutesRemaining={52} />
                  <span className="text-xs text-slate">· Prepared 28 min ago</span>
                </div>
              </div>

              {/* Routing Flow */}
              <div className="p-3.5 bg-cream/70 rounded-lg border border-border-subtle space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate font-medium">
                  <span className="uppercase text-[11px] font-semibold text-charcoal">Matched Recipient</span>
                  <span className="inline-flex items-center gap-1 text-primary font-semibold">
                    <Sparkles size={12} /> Best Match
                  </span>
                </div>

                <div className="font-semibold text-charcoal text-sm">
                  Bala Mandir Kamaraj Trust
                </div>
                <div className="text-slate text-[11px]">G.N. Chetty Road, T. Nagar</div>

                <div className="flex items-center justify-between text-slate pt-1 border-t border-border-subtle/80">
                  <span className="flex items-center gap-1">
                    <MapPin size={12} /> Approx. 1.2 km away
                  </span>
                  <span className="flex items-center gap-1 text-charcoal font-medium">
                    <Clock size={12} /> Est. arrival: ~6 min
                  </span>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-4 pt-3 border-t border-border-subtle flex items-center justify-between text-xs">
                <span className="text-status-success font-medium flex items-center gap-1.5">
                  <CheckCircle2 size={14} /> Matched &amp; Handover Assigned
                </span>
                <span className="text-slate">Mathsya – T. Nagar</span>
              </div>
            </div>
          </div>
        </div>

        {/* Process Diagram */}
        <div id="how-it-works" className="mt-16 pt-8 border-t border-border-subtle/60 scroll-mt-20">
          <ProcessDiagram />
        </div>

        {/* Impact Summary Metrics */}
        <div id="impact" className="scroll-mt-20">
          <ImpactSummary />
        </div>

        {/* Food Safety & Quality Standards Section */}
        <div className="mt-12 p-6 sm:p-8 bg-surface rounded-xl border border-border-subtle shadow-card">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate">
              Verification Standards
            </span>
            <h2 className="text-xl sm:text-2xl font-semibold text-charcoal mt-1">
              Safety & Dignity in Every Delivery
            </h2>
            <p className="text-body text-charcoal/80 text-sm sm:text-base mt-3 leading-relaxed">
              We uphold consistent standards of trust. Only untouched commercial kitchen surplus is eligible for redistribution. Meals are sealed in food-grade thermal containers, tagged with preparation times, and coordinated directly with verified partner institutions.
            </p>
            <div className="mt-5 flex flex-wrap gap-4">
              <Button
                variant="secondary"
                size="sm"
                onClick={onOpenAppAsRestaurant}
              >
                Learn How Kitchens Partner With Us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
