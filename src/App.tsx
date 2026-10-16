import { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { MobileNav } from './components/layout/MobileNav';
import { HeroSection } from './components/landing/HeroSection';
import { DonorDashboard } from './components/donor/DonorDashboard';
import { RestaurantOverview } from './components/donor/RestaurantOverview';
import { RestaurantDeliveries } from './components/donor/RestaurantDeliveries';
import { RecipientDashboard } from './components/recipient/RecipientDashboard';
import { InstitutionOverview } from './components/recipient/InstitutionOverview';
import { DeliveryTracker } from './components/delivery/DeliveryTracker';
import { ImpactPanel } from './components/impact/ImpactPanel';
import { LogisticsOverview } from './components/logistics/LogisticsOverview';
import { AssignmentsPanel } from './components/logistics/AssignmentsPanel';
import { DeliveryHistory } from './components/logistics/DeliveryHistory';
import { Alert } from './components/ui/Alert';
import { Logo } from './components/ui/Logo';
import { MatchRecommendationModal } from './components/donor/MatchRecommendationModal';
import { CreateDonationModal } from './components/donor/CreateDonationModal';
import { INITIAL_DONATIONS, INITIAL_MISSION, INITIAL_RECIPIENTS, INITIAL_RESTAURANTS, SEED_DATA_VERSION } from './data/mockData';
import { AppView, UserRole, UserAccount, DonationItem, DeliveryMission, RecipientInstitution } from './types';
import { donationsForRestaurant } from './utils/donationStats';
import { resolveRoute, restaurantIdForDonation } from './utils/routeDisplay';

// ── Storage Keys (ShareBite v2) ───────────────────────────────────────────
const STORAGE_KEYS = {
  ROLE: 'sharebite_role_v1',
  DONATIONS: 'sharebite_donations_v1',
  MISSION: 'sharebite_mission_v1',
  INSTITUTIONS: 'sharebite_institutions_v1',
  SEED_VERSION: 'sharebite_seed_version',
};

// Old ServeLink key prefixes — cleared during migration
const LEGACY_KEYS = [
  'servelink_role_v1',
  'servelink_donations_v1',
  'servelink_mission_v1',
  'servelink_institutions_v1',
];

/**
 * Migration: if the browser has old ServeLink data, clear it.
 * Also clear ShareBite data if the seed version has changed
 * (prevents stale donation IDs referencing deleted restaurants).
 */
function migrateLocalStorage(): void {
  // Clear legacy ServeLink keys
  const hasLegacy = LEGACY_KEYS.some((k) => localStorage.getItem(k) !== null);
  if (hasLegacy) {
    LEGACY_KEYS.forEach((k) => localStorage.removeItem(k));
    // Also clear any existing ShareBite keys so the new Chennai dataset starts fresh
    Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k));
    return;
  }

  // If seed version has changed, reset data
  const storedVersion = localStorage.getItem(STORAGE_KEYS.SEED_VERSION);
  if (storedVersion !== SEED_DATA_VERSION) {
    Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k));
  }
}

// ── Demo Accounts ─────────────────────────────────────────────────────────
// Populated from the central Chennai restaurant dataset (10 verified + 29 seed branches)
// along with sample institution and delivery accounts.
const ACCOUNTS: UserAccount[] = [
  ...INITIAL_RESTAURANTS.map((r) => ({
    id: `acc-${r.id}`,
    restaurantId: r.id,
    name: r.branch ? `${r.name} — ${r.branch}` : `${r.name} — ${r.neighbourhood}`,
    role: 'restaurant' as const,
    roleTitle: `${r.cuisine} · Sample`,
    facility: r.address,
  })),
  {
    id: 'acc-institution',
    name: 'Bala Mandir Kamaraj Trust',
    role: 'institution',
    roleTitle: 'Institution Account · Sample',
    facility: 'Bala Mandir Kamaraj Trust, T. Nagar',
  },
  {
    id: 'acc-logistics',
    name: 'Kavya Rajan',
    role: 'logistics',
    roleTitle: 'Delivery Partner · Sample',
    facility: 'ShareBite Logistics, Chennai',
  },
];

// The demo institution account is Bala Mandir; acceptances resolve against it.
const ACCEPTING_INSTITUTION_ID = 'institution-bala-mandir-tnagar';

/** Must match the tab ids rendered by Header and MobileNav. */
function getDefaultTabForRole(role: UserRole): string {
  if (role === 'restaurant') return 'dashboard';
  if (role === 'institution') return 'dashboard';
  return 'dashboard';
}

export function App() {
  // Run migration before initialising state
  migrateLocalStorage();

  const [appView, setAppView] = useState<AppView>(() => {
    const savedRole = localStorage.getItem(STORAGE_KEYS.ROLE);
    return savedRole && savedRole !== 'landing' ? 'app' : 'landing';
  });

  const [currentAccount, setCurrentAccount] = useState<UserAccount>(() => {
    const savedRole = localStorage.getItem(STORAGE_KEYS.ROLE) as UserRole | null;
    if (savedRole && (savedRole as string) !== 'landing') {
      const found = ACCOUNTS.find((a) => a.role === savedRole);
      if (found) return found;
    }
    return ACCOUNTS[0];
  });

  const [activeTab, setActiveTab] = useState<string>(() =>
    getDefaultTabForRole(currentAccount.role)
  );

  const [donations, setDonations] = useState<DonationItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.DONATIONS);
    if (saved) {
      try { return JSON.parse(saved); } catch { return INITIAL_DONATIONS; }
    }
    return INITIAL_DONATIONS;
  });

  const [institutions] = useState<RecipientInstitution[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.INSTITUTIONS);
    if (saved) {
      try { return JSON.parse(saved); } catch { return INITIAL_RECIPIENTS; }
    }
    return INITIAL_RECIPIENTS;
  });

  const [mission, setMission] = useState<DeliveryMission>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.MISSION);
    if (saved) {
      try { return JSON.parse(saved); } catch { return INITIAL_MISSION; }
    }
    return INITIAL_MISSION;
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Restaurant flows (create + matching) are owned here so both the Dashboard
  // and Donations tabs can open them.
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [matchingDonation, setMatchingDonation] = useState<DonationItem | null>(null);

  // ── Sync to localStorage ───────────────────────────────────────────────
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ROLE, appView === 'landing' ? 'landing' : currentAccount.role);
    localStorage.setItem(STORAGE_KEYS.SEED_VERSION, SEED_DATA_VERSION);
  }, [appView, currentAccount]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DONATIONS, JSON.stringify(donations));
  }, [donations]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MISSION, JSON.stringify(mission));
  }, [mission]);

  // ── Reset Demo ─────────────────────────────────────────────────────────
  const handleResetDemo = () => {
    Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k));
    setDonations(INITIAL_DONATIONS);
    setMission(INITIAL_MISSION);
    setAppView('landing');
    setCurrentAccount(ACCOUNTS[0]);
    showToast('Application reset to initial state.');
  };

  // ── Account Switching ──────────────────────────────────────────────────
  const handleSelectAccount = (account: UserAccount) => {
    setCurrentAccount(account);
    setActiveTab(getDefaultTabForRole(account.role));
    setAppView('app');
  };

  const handleOpenAppAsRestaurant = () => {
    setCurrentAccount(ACCOUNTS[0]);
    setActiveTab('donations');
    setAppView('app');
  };

  const handleOpenAppAsInstitution = () => {
    const institutionAcc = ACCOUNTS.find((a) => a.role === 'institution') || ACCOUNTS[0];
    setCurrentAccount(institutionAcc);
    setActiveTab('available-meals');
    setAppView('app');
  };

  // ── Restaurant: Create Donation ────────────────────────────────────────
  const handleCreateDonation = (newDonationData: Omit<DonationItem, 'id' | 'createdAt' | 'status'>) => {
    const newDonation: DonationItem = {
      ...newDonationData,
      id: `don-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString(),
      status: 'submitted',
      deliveryTimeline: { acceptedAt: undefined },
    };
    setDonations([newDonation, ...donations]);
    showToast(`Donation created. Finding suitable recipients for ${newDonation.quantity} meals…`);
  };

  // ── Restaurant: Select Recipient ───────────────────────────────────────
  const handleSelectRecipientForDonation = (donationId: string, recipient: RecipientInstitution) => {
    setDonations((prev) =>
      prev.map((d) => {
        if (d.id === donationId) {
          // Only attach a distance when a researched route exists for this
          // donor → institution corridor; never guess one.
          const route = resolveRoute(restaurantIdForDonation(d), recipient.id);
          return {
            ...d,
            status: 'matching',
            selectedRecipientId: recipient.id,
            claimedBy: recipient.name,
            distanceKm: route.distanceKm,
            etaMinutes: route.etaMinutes,
          };
        }
        return d;
      })
    );
    showToast(`Request sent to ${recipient.name}. Awaiting confirmation.`);
  };

  // ── Institution: Accept Donation ───────────────────────────────────────
  const handleAcceptDonation = (donationId: string) => {
    let acceptedItem: DonationItem | undefined;

    setDonations((prev) =>
      prev.map((d) => {
        if (d.id === donationId) {
          const route = resolveRoute(restaurantIdForDonation(d), ACCEPTING_INSTITUTION_ID);
          acceptedItem = {
            ...d,
            status: 'accepted',
            claimedBy: 'Bala Mandir Kamaraj Trust',
            claimedAt: 'Just now',
            distanceKm: d.distanceKm ?? route.distanceKm,
            etaMinutes: d.etaMinutes ?? route.etaMinutes,
          };
          return acceptedItem;
        }
        return d;
      })
    );

    const target = acceptedItem || donations.find((d) => d.id === donationId);
    if (target) {
      setMission({
        id: `SL-${Date.now().toString().slice(-4)}`,
        donationId: target.id,
        donationTitle: target.title,
        donorName: target.donorBranch
          ? `${target.donorName} – ${target.donorBranch}`
          : target.donorName,
        donorAddress: target.donorAddress,
        recipientName: 'Bala Mandir Kamaraj Trust',
        recipientAddress: 'No. 8, G.N. Chetty Road, T. Nagar, Chennai – 600 017',
        quantity: target.quantity,
        dietaryType: target.dietaryType,
        minutesRemaining: target.minutesRemaining,
        urgency: target.urgency,
        step: 'transit',
        safetyChecks: {
          packagingIntact: true,
          foodLabelled: true,
          preparedTimeVerified: true,
          recipientDetailsConfirmed: true,
        },
      });
      showToast('Donation accepted. A courier has been assigned and is on the way.');
    }
  };

  // ── Logistics: Complete Delivery ───────────────────────────────────────
  const handleCompleteMission = (_missionId: string) => {
    setDonations((prev) =>
      prev.map((d) => {
        if (d.id === mission.donationId) {
          return { ...d, status: 'completed' };
        }
        return d;
      })
    );
    showToast(`Delivery completed. ${mission.quantity} meals reached ${mission.recipientName}.`);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 6000);
  };

  const currentRole: UserRole = currentAccount.role;

  // Donations published by the branch whose account is selected
  const branchDonations =
    currentRole === 'restaurant' ? donationsForRestaurant(donations, currentAccount) : [];

  const acceptingInstitution = institutions.find((i) => i.id === ACCEPTING_INSTITUTION_ID);

  const renderRestaurantTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <RestaurantOverview
            account={currentAccount}
            branchDonations={branchDonations}
            allDonations={donations}
            onCreateDonation={() => setIsCreateOpen(true)}
            onFindRecipient={setMatchingDonation}
            onOpenTab={setActiveTab}
          />
        );
      case 'deliveries':
        return (
          <RestaurantDeliveries
            account={currentAccount}
            branchDonations={branchDonations}
            mission={mission}
            onOpenTab={setActiveTab}
          />
        );
      case 'impact':
        return (
          <ImpactPanel scope="restaurant" scopeName={currentAccount.name} donations={branchDonations} />
        );
      case 'donations':
      default:
        return (
          <DonorDashboard
            donations={branchDonations}
            onOpenCreate={() => setIsCreateOpen(true)}
            onFindRecipient={setMatchingDonation}
            onViewDelivery={() => setActiveTab('deliveries')}
            currentAccount={currentAccount}
          />
        );
    }
  };

  const renderInstitutionTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <InstitutionOverview
            institution={acceptingInstitution}
            donations={donations}
            mission={mission}
            onOpenTab={setActiveTab}
          />
        );
      case 'deliveries':
        return (
          <DeliveryTracker
            mission={mission}
            onMissionComplete={handleCompleteMission}
            onGoHome={() => setAppView('landing')}
          />
        );
      case 'impact':
        return (
          <ImpactPanel
            scope="institution"
            scopeName={acceptingInstitution?.name || 'Recipient Institution'}
            donations={donations.filter((d) => d.claimedBy === acceptingInstitution?.name)}
          />
        );
      case 'available-meals':
      default:
        return (
          <RecipientDashboard
            donations={donations}
            onAcceptDonation={handleAcceptDonation}
            onViewDelivery={() => setActiveTab('deliveries')}
          />
        );
    }
  };

  const renderLogisticsTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <LogisticsOverview
            account={currentAccount}
            donations={donations}
            mission={mission}
            onOpenTab={setActiveTab}
          />
        );
      case 'history':
        return <DeliveryHistory donations={donations} />;
      case 'deliveries':
        return (
          <DeliveryTracker
            mission={mission}
            onMissionComplete={handleCompleteMission}
            onGoHome={() => setAppView('landing')}
          />
        );
      case 'assignments':
      default:
        return <AssignmentsPanel donations={donations} mission={mission} onOpenTab={setActiveTab} />;
    }
  };

  const renderAppContent = () => {
    if (currentRole === 'restaurant') return renderRestaurantTab();
    if (currentRole === 'institution') return renderInstitutionTab();
    return renderLogisticsTab();
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col font-sans selection:bg-sage-light selection:text-primary-dark pb-16 md:pb-0">
      <Header
        appView={appView}
        currentRole={currentRole}
        currentAccount={currentAccount}
        activeTab={activeTab}
        accounts={ACCOUNTS}
        onSelectAccount={handleSelectAccount}
        onSelectTab={setActiveTab}
        onNavigateHome={() => setAppView('landing')}
        onOpenApp={() => setAppView('app')}
        onResetDemo={handleResetDemo}
      />

      {/* Global Feedback Toast */}
      {toastMessage && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 w-full">
          <Alert type="success" title="ShareBite">
            {toastMessage}
          </Alert>
        </div>
      )}

      <main className="flex-1">
        {appView === 'landing' && (
          <HeroSection
            onOpenAppAsRestaurant={handleOpenAppAsRestaurant}
            onOpenAppAsInstitution={handleOpenAppAsInstitution}
          />
        )}

        {appView === 'app' && renderAppContent()}
      </main>

      {/* Restaurant flows, reachable from both the Dashboard and Donations tabs */}
      {appView === 'app' && currentRole === 'restaurant' && (
        <>
          <CreateDonationModal
            isOpen={isCreateOpen}
            onClose={() => setIsCreateOpen(false)}
            onSubmit={handleCreateDonation}
            currentAccount={currentAccount}
          />

          <MatchRecommendationModal
            isOpen={!!matchingDonation}
            onClose={() => setMatchingDonation(null)}
            donation={matchingDonation}
            institutions={institutions}
            onSelectRecipient={handleSelectRecipientForDonation}
          />
        </>
      )}

      {/* Footer */}
      <footer className="border-t border-border-subtle bg-surface text-charcoal py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-slate">
              <Logo size={22} label="" />
              <span>
                <strong>ShareBite</strong> · Fresh food, shared while it's still fresh · Chennai
              </span>
            </div>
            <div className="text-xs text-slate text-center sm:text-right max-w-sm">
              ShareBite uses publicly available organisation and business information for
              demonstration purposes. Listings do not imply affiliation, participation or endorsement.
            </div>
          </div>
        </div>
      </footer>

      <MobileNav
        appView={appView}
        currentRole={currentRole}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onNavigateHome={() => setAppView('landing')}
        onOpenApp={() => setAppView('app')}
      />
    </div>
  );
}

export default App;
