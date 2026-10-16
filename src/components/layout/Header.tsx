import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, RotateCcw, LogOut, ArrowRight } from 'lucide-react';
import { UserRole, AppView, UserAccount } from '../../types';
import { Logo } from '../ui/Logo';

export interface HeaderProps {
  appView: AppView;
  currentRole: UserRole;
  currentAccount: UserAccount;
  activeTab: string;
  accounts: UserAccount[];
  onSelectAccount: (account: UserAccount) => void;
  onSelectTab: (tab: string) => void;
  onNavigateHome: () => void;
  onOpenApp: () => void;
  onResetDemo: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  appView,
  currentRole,
  currentAccount,
  activeTab,
  accounts,
  onSelectAccount,
  onSelectTab,
  onNavigateHome,
  onOpenApp,
  onResetDemo,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Role-specific navigation tabs
  const roleTabs = {
    restaurant: [
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'donations', label: 'Donations' },
      { id: 'deliveries', label: 'Deliveries' },
      { id: 'impact', label: 'Impact' },
    ],
    institution: [
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'available-meals', label: 'Available Meals' },
      { id: 'deliveries', label: 'Deliveries' },
      { id: 'impact', label: 'Impact' },
    ],
    logistics: [
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'assignments', label: 'Assignments' },
      { id: 'deliveries', label: 'Deliveries' },
      { id: 'history', label: 'History' },
    ],
  }[currentRole];

  return (
    <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-sm border-b border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Name */}
          <button
            type="button"
            onClick={onNavigateHome}
            className="flex items-center gap-2.5 text-left focus-visible:outline-none select-none group"
            aria-label="ShareBite Home"
          >
            <Logo
              size={34}
              label=""
              className="transition-transform group-hover:-rotate-6 group-hover:scale-105"
            />
            <span className="text-xl font-bold tracking-tight text-primary-dark">
              Share<span className="text-primary">Bite</span>
            </span>
          </button>

          {/* Navigation Model: Landing vs Role-Specific App Navigation */}
          {appView === 'landing' ? (
            /* Public Landing Navigation */
            <nav className="hidden md:flex items-center gap-6" aria-label="Public Navigation">
              <button
                type="button"
                onClick={onNavigateHome}
                className="text-sm font-medium text-charcoal hover:text-primary transition-colors"
              >
                Home
              </button>
              <a
                href="#how-it-works"
                className="text-sm font-medium text-charcoal hover:text-primary transition-colors"
              >
                How It Works
              </a>
              <a
                href="#impact"
                className="text-sm font-medium text-charcoal hover:text-primary transition-colors"
              >
                Impact
              </a>
            </nav>
          ) : (
            /* Role-Specific Tabs */
            <nav className="hidden md:flex items-center gap-1" aria-label="Account Navigation">
              {roleTabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => onSelectTab(tab.id)}
                    className={`px-3.5 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-primary-dark font-semibold bg-cream border-b-2 border-primary'
                        : 'text-charcoal/80 hover:text-primary-dark hover:bg-cream/50'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          )}

          {/* Right Header Action / Account Dropdown */}
          <div className="flex items-center gap-3">
            {appView === 'landing' ? (
              <button
                type="button"
                onClick={onOpenApp}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors shadow-subtle min-h-[40px]"
              >
                <span>Sign In</span>
                <ArrowRight size={15} />
              </button>
            ) : (
              /* Account Dropdown */
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg border border-border-subtle bg-cream/60 hover:bg-cream transition-colors text-left min-h-[40px]"
                  aria-expanded={isDropdownOpen}
                  aria-haspopup="true"
                >
                  <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs uppercase">
                    {currentAccount.name.charAt(0)}
                  </div>
                  <div className="hidden sm:block text-left">
                    <div className="text-xs font-semibold text-charcoal leading-tight">
                      {currentAccount.name}
                    </div>
                    <div className="text-[11px] text-slate font-medium">
                      {currentAccount.roleTitle}
                    </div>
                  </div>
                  <ChevronDown size={14} className="text-slate" />
                </button>

                {/* Account Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-surface rounded-xl border border-border-subtle shadow-modal z-50 py-2 animate-in fade-in-50 duration-150">
                    <div className="px-4 py-2 border-b border-border-subtle">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate">
                        Switch Account
                      </span>
                    </div>

                    {/* Scrollable: the Chennai dataset provides 39 sample restaurant accounts */}
                    <div className="py-1 max-h-[60vh] overflow-y-auto">
                      {accounts.map((acc) => {
                        const isSelected = acc.id === currentAccount.id;
                        return (
                          <button
                            key={acc.id}
                            type="button"
                            onClick={() => {
                              onSelectAccount(acc);
                              setIsDropdownOpen(false);
                            }}
                            className="w-full px-4 py-2.5 flex items-center justify-between text-left hover:bg-cream transition-colors text-xs"
                          >
                            <div>
                              <div className={`font-semibold ${isSelected ? 'text-primary' : 'text-charcoal'}`}>
                                {acc.name}
                              </div>
                              <div className="text-[11px] text-slate">
                                {acc.roleTitle}
                              </div>
                            </div>
                            {isSelected && <Check size={15} className="text-primary" />}
                          </button>
                        );
                      })}
                    </div>

                    <div className="border-t border-border-subtle mt-1 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          onNavigateHome();
                          setIsDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2 flex items-center gap-2 text-xs text-charcoal hover:bg-cream transition-colors text-left"
                      >
                        <LogOut size={13} className="text-slate" />
                        <span>Public Homepage</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          onResetDemo();
                          setIsDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2 flex items-center gap-2 text-xs text-slate hover:text-charcoal hover:bg-cream transition-colors text-left"
                      >
                        <RotateCcw size={13} className="text-slate" />
                        <span>Reset demo data</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
