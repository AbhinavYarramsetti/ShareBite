import React from 'react';
import { Utensils, Sparkles, ShieldCheck, HeartHandshake, ArrowRight } from 'lucide-react';

export const ProcessDiagram: React.FC = () => {
  const steps = [
    {
      title: '1. Restaurant Partner',
      subtitle: 'Surplus Prepared Food',
      description: 'Hot, untouched catering or buffet surplus logged within minutes of service close.',
      icon: <Utensils size={24} className="text-primary" aria-hidden="true" />,
      accent: 'border-primary/20 bg-cream-surface',
    },
    {
      title: '2. Fresh Meals',
      subtitle: 'Safety & Temperature',
      description: 'Logged with prep time, temperature status, and a tracked freshness countdown.',
      icon: <Sparkles size={24} className="text-sage-dark" aria-hidden="true" />,
      accent: 'border-sage/40 bg-sage-light/30',
    },
    {
      title: '3. ShareBite Engine',
      subtitle: 'Routing & Match',
      description: 'Directed to participating care institutions using freshness, dietary, and proximity matching.',
      icon: <ShieldCheck size={24} className="text-primary" aria-hidden="true" />,
      accent: 'border-primary/30 bg-cream-surface',
    },
    {
      title: '4. Care Institution',
      subtitle: 'Immediate Nourishment',
      description: 'Wholesome, warm nutrition received with a verified digital handover confirmation.',
      icon: <HeartHandshake size={24} className="text-status-success" aria-hidden="true" />,
      accent: 'border-status-success/30 bg-status-success/5',
    },
  ];

  return (
    <div className="w-full my-8">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate">
          The Rescue Pathway
        </span>
        <h3 className="text-xl sm:text-2xl font-semibold text-charcoal mt-1">
          From Commercial Kitchen to Child-Care Caregiver
        </h3>
        <p className="text-metadata text-slate mt-2">
          A disciplined, zero-waste logistics flow ensuring food safety and speed at every step.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
        {steps.map((step, idx) => (
          <div key={step.title} className="relative flex flex-col">
            <div
              className={`p-5 rounded-lg border ${step.accent} bg-surface shadow-card flex-1 flex flex-col justify-between`}
            >
              <div>
                <div className="w-12 h-12 rounded-lg bg-cream flex items-center justify-center mb-3 border border-border-subtle">
                  {step.icon}
                </div>
                <h4 className="text-base font-semibold text-charcoal">{step.title}</h4>
                <div className="text-xs font-medium text-slate uppercase tracking-wide mt-0.5">
                  {step.subtitle}
                </div>
                <p className="text-xs text-charcoal/80 leading-relaxed mt-2.5">
                  {step.description}
                </p>
              </div>
            </div>

            {/* Connecting Arrow for Desktop */}
            {idx < steps.length - 1 && (
              <div
                className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-cream border border-border-subtle items-center justify-center text-slate"
                aria-hidden="true"
              >
                <ArrowRight size={12} strokeWidth={2.5} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
