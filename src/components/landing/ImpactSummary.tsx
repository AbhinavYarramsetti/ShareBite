import React from 'react';
import { Utensils, Building2, Clock, Leaf } from 'lucide-react';
import { Card } from '../ui/Card';
import { IMPACT_METRICS } from '../../data/mockData';

export const ImpactSummary: React.FC = () => {
  const metrics = [
    {
      label: 'Wholesome Meals Shared',
      value: IMPACT_METRICS.totalMealsRescued.toLocaleString(),
      subtext: 'Provided to participating care institutions',
      icon: <Utensils size={20} className="text-primary" aria-hidden="true" />,
    },
    {
      label: 'Participating Care Centres',
      value: `${IMPACT_METRICS.activeInstitutions}`,
      subtext: 'Active care centres and shelters',
      icon: <Building2 size={20} className="text-primary" aria-hidden="true" />,
    },
    {
      label: 'Avg Response Time',
      value: `${IMPACT_METRICS.averageDispatchMinutes} min`,
      subtext: 'From donor to institution arrival',
      icon: <Clock size={20} className="text-primary" aria-hidden="true" />,
    },
    {
      label: 'CO₂ Averted From Landfill',
      value: `${(IMPACT_METRICS.co2PreventedKg / 1000).toFixed(1)} tonnes`,
      subtext: 'Food waste diverted from disposal',
      icon: <Leaf size={20} className="text-status-success" aria-hidden="true" />,
    },
  ];

  return (
    <div className="my-12">
      <div className="text-left mb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate">
          Accountable Impact
        </span>
        <h3 className="text-2xl font-semibold text-charcoal mt-1">
          Estimated Impact Across Chennai
        </h3>
        <p className="text-metadata text-slate mt-1 max-w-xl">
          Illustrative metrics based on simulated meal redirections across Chennai care homes and community centres.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <Card key={m.label} padding="md" className="flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-slate uppercase tracking-wider">{m.label}</span>
              <div className="p-2 rounded bg-cream border border-border-subtle">{m.icon}</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-semibold text-charcoal tracking-tight">
                {m.value}
              </div>
              <div className="text-metadata mt-1 text-slate">{m.subtext}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
