import React from 'react';
import { Card } from '../ui/Card';

export interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, description, action }) => (
  <Card padding="lg" className="text-center py-12 border-dashed">
    <div className="mx-auto text-slate mb-3 flex justify-center">{icon}</div>
    <h3 className="text-lg font-semibold text-charcoal">{title}</h3>
    <p className="text-metadata text-slate mt-1 max-w-md mx-auto">{description}</p>
    {action && <div className="mt-5 flex justify-center">{action}</div>}
  </Card>
);
