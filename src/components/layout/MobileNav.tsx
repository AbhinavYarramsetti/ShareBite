import React from 'react';
import {
  LayoutDashboard,
  Utensils,
  Truck,
  BarChart3,
  HeartHandshake,
  Clock,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { UserRole, AppView } from '../../types';

export interface MobileNavProps {
  appView: AppView;
  currentRole: UserRole;
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onNavigateHome: () => void;
  onOpenApp: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  appView,
  currentRole,
  activeTab,
  onSelectTab,
  onNavigateHome,
  onOpenApp,
}) => {
  if (appView === 'landing') {
    return (
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface border-t border-border-subtle shadow-modal"
        aria-label="Mobile Landing Navigation"
      >
        <div className="grid grid-cols-4 h-16">
          <button
            type="button"
            onClick={onNavigateHome}
            className="flex flex-col items-center justify-center gap-1 min-h-[48px] py-1 text-primary font-semibold"
          >
            <HeartHandshake size={20} />
            <span className="text-[11px] leading-none">Home</span>
          </button>
          <a
            href="#how-it-works"
            className="flex flex-col items-center justify-center gap-1 min-h-[48px] py-1 text-slate hover:text-charcoal"
          >
            <Sparkles size={20} />
            <span className="text-[11px] leading-none">Process</span>
          </a>
          <a
            href="#impact"
            className="flex flex-col items-center justify-center gap-1 min-h-[48px] py-1 text-slate hover:text-charcoal"
          >
            <BarChart3 size={20} />
            <span className="text-[11px] leading-none">Impact</span>
          </a>
          <button
            type="button"
            onClick={onOpenApp}
            className="flex flex-col items-center justify-center gap-1 min-h-[48px] py-1 text-primary font-medium"
          >
            <ArrowRight size={20} />
            <span className="text-[11px] leading-none">Sign In</span>
          </button>
        </div>
      </nav>
    );
  }

  // Role-Specific Navigation Tabs
  const items = {
    restaurant: [
      { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={19} /> },
      { id: 'donations', label: 'Donations', icon: <Utensils size={19} /> },
      { id: 'deliveries', label: 'Deliveries', icon: <Truck size={19} /> },
      { id: 'impact', label: 'Impact', icon: <BarChart3 size={19} /> },
    ],
    institution: [
      { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={19} /> },
      { id: 'available-meals', label: 'Available', icon: <Utensils size={19} /> },
      { id: 'deliveries', label: 'Deliveries', icon: <Truck size={19} /> },
      { id: 'impact', label: 'Impact', icon: <BarChart3 size={19} /> },
    ],
    logistics: [
      { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={19} /> },
      { id: 'assignments', label: 'Tasks', icon: <Clock size={19} /> },
      { id: 'deliveries', label: 'Deliveries', icon: <Truck size={19} /> },
      { id: 'history', label: 'History', icon: <BarChart3 size={19} /> },
    ],
  }[currentRole];

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface border-t border-border-subtle shadow-modal"
      aria-label="Mobile Navigation"
    >
      <div className="grid grid-cols-4 h-16">
        {items.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectTab(item.id)}
              className={`flex flex-col items-center justify-center gap-1 min-h-[48px] py-1 transition-colors select-none ${
                isActive ? 'text-primary font-semibold' : 'text-slate hover:text-charcoal'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <div className={isActive ? 'text-primary scale-105 transition-transform' : 'text-slate'}>
                {item.icon}
              </div>
              <span className="text-[11px] leading-none tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
