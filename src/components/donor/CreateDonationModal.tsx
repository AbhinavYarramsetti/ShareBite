import React, { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { SelectionPill } from '../ui/SelectionPill';
import { DietaryType, DonationItem, UserAccount } from '../../types';

export interface CreateDonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (donation: Omit<DonationItem, 'id' | 'createdAt' | 'status'>) => void;
  currentAccount?: UserAccount;
}

export const CreateDonationModal: React.FC<CreateDonationModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  currentAccount,
}) => {
  const DEFAULT_TITLE = 'Idli & Vegetable Sambar';
  const DEFAULT_QUANTITY = 30;
  const DEFAULT_PREP_MINUTES = 20;

  const [dietaryType, setDietaryType] = useState<DietaryType>('vegetarian');
  const [quantity, setQuantity] = useState<number>(DEFAULT_QUANTITY);
  const [title, setTitle] = useState<string>(DEFAULT_TITLE);
  const [description] = useState<string>(
    'Freshly steamed, surplus from lunchtime service. Packed in food-grade stainless containers.'
  );
  const [prepMinutesAgo, setPrepMinutesAgo] = useState<number>(DEFAULT_PREP_MINUTES);
  const [temperatureVerified, setTemperatureVerified] = useState<boolean>(true);
  const [sealedHygienic, setSealedHygienic] = useState<boolean>(true);

  // The modal instance is kept mounted by App, so each opening starts fresh
  // rather than inheriting whatever the previous branch typed.
  useEffect(() => {
    if (!isOpen) return;
    setDietaryType('vegetarian');
    setQuantity(DEFAULT_QUANTITY);
    setTitle(DEFAULT_TITLE);
    setPrepMinutesAgo(DEFAULT_PREP_MINUTES);
    setTemperatureVerified(true);
    setSealedHygienic(true);
  }, [isOpen]);

  const dietaryOptions: { value: DietaryType; label: string; icon?: React.ReactNode }[] = [
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'non-vegetarian', label: 'Non-Vegetarian' },
    { value: 'mixed', label: 'Mixed Assortment' },
  ];

  const portionOptions: { value: number; label: string; hint?: string }[] = [
    { value: 15, label: '15 Meals', hint: 'Small home' },
    { value: 30, label: '30 Meals', hint: 'Standard centre' },
    { value: 50, label: '50 Meals', hint: 'Large shelter' },
    { value: 80, label: '80+ Meals', hint: 'Multi-centre' },
  ];

  const prepTimeOptions: { value: number; label: string }[] = [
    { value: 15, label: '15 min ago' },
    { value: 30, label: '30 min ago' },
    { value: 45, label: '45 min ago' },
    { value: 60, label: '60 min ago' },
  ];

  // Donor details come from the selected sample restaurant account.
  // Account names are built as "<Restaurant> — <Branch / Neighbourhood>" in App.tsx,
  // and roleTitle as "<Cuisine> · Sample".
  const [accountName, accountBranch] = (currentAccount?.name ?? '').split(' — ');
  const donorName = accountName?.trim() || 'Mathsya Restaurant';
  const donorBranch = accountBranch?.trim() || 'T. Nagar';
  const donorType =
    currentAccount?.roleTitle.replace(/\s*·\s*Sample$/, '').trim() || 'South Indian Restaurant';
  const donorAddress =
    currentAccount?.facility ||
    '29/31, Thanikachalam Road, Parthasarathi Puram, T. Nagar, Chennai – 600 017';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || quantity <= 0) return;

    // Remaining window calculated from a 90-minute freshness guideline
    const remaining = Math.max(0, 90 - prepMinutesAgo);
    const urgency = remaining > 40 ? 'fresh' : remaining > 15 ? 'time-sensitive' : 'urgent';

    onSubmit({
      donorId: currentAccount?.restaurantId,
      donorName,
      donorBranch,
      donorType,
      donorAddress,
      title,
      description,
      quantity,
      dietaryType,
      prepTimeMinutesAgo: prepMinutesAgo,
      minutesRemaining: remaining,
      urgency,
      temperatureStatus: 'Hot holding – ≥ 65°C',
      packagingType: 'Thermal sealed stainless trays',
      // Distance and travel time are deliberately left unset: they are only
      // known once a recipient is matched and a researched route exists for
      // that corridor. See utils/routeDisplay.ts.
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Surplus Donation"
      description="Quickly publish untouched surplus meals. Nearby child-care institutions will be notified instantly."
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Dietary Classification Selection */}
        <SelectionPill<DietaryType>
          label="Dietary Classification"
          options={dietaryOptions}
          value={dietaryType}
          onChange={setDietaryType}
        />

        {/* Portions selection pills */}
        <SelectionPill<number>
          label="Portion Quantity"
          options={portionOptions}
          value={quantity}
          onChange={setQuantity}
        />

        {/* Meal Title and Prep Details */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="meal-title" className="text-xs font-semibold uppercase tracking-wider text-slate">
            Meal Description / Menu Items
          </label>
          <input
            id="meal-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-md border border-border-subtle bg-surface text-charcoal focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none min-h-[44px]"
            required
            placeholder="e.g. Steamed Basmati Rice & Roasted Vegetables"
          />
        </div>

        {/* Prep Time Selection */}
        <SelectionPill<number>
          label="Time When Prepared / Service Ended"
          options={prepTimeOptions}
          value={prepMinutesAgo}
          onChange={setPrepMinutesAgo}
        />

        {/* Food Safety Confirmation checkboxes */}
        <div className="bg-cream p-4 rounded-lg border border-border-subtle flex flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate">
            Food Safety Confirmation
          </span>

          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={temperatureVerified}
              onChange={(e) => setTemperatureVerified(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-border-subtle text-primary focus:ring-primary"
            />
            <span className="text-sm text-charcoal">
              Food has been stored according to the restaurant's food-safety procedures and remains within the freshness window.
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={sealedHygienic}
              onChange={(e) => setSealedHygienic(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-border-subtle text-primary focus:ring-primary"
            />
            <span className="text-sm text-charcoal">
              Untouched back-of-house surplus sealed in sanitary, food-safe containers.
            </span>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-border-subtle">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={!temperatureVerified || !sealedHygienic}
            icon={<Check size={18} />}
          >
            Publish Donation ({quantity} Meals)
          </Button>
        </div>
      </form>
    </Modal>
  );
};
