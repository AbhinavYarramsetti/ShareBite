export type DietaryType = 'vegetarian' | 'non-vegetarian' | 'mixed';

export type UrgencyLevel = 'fresh' | 'time-sensitive' | 'urgent' | 'expired';

export type DonationStatus =
  | 'draft'
  | 'submitted'
  | 'matching'
  | 'accepted'
  | 'pickup-confirmed'
  | 'in-transit'
  | 'delivered'
  | 'completed'
  | 'expired'
  | 'cancelled';

export interface DonationItem {
  id: string;
  donorId?: string; // RestaurantBranch id this donation came from, when known
  donorName: string;
  donorBranch?: string; // Branch name or location identifier (e.g. "T. Nagar", "Egmore")
  donorType: string;
  donorAddress: string;
  title: string;
  description: string;
  quantity: number; // portions (e.g. 30 meals)
  dietaryType: DietaryType;
  prepTimeMinutesAgo: number;
  minutesRemaining: number;
  urgency: UrgencyLevel;
  temperatureStatus: string;
  packagingType: string;
  status: DonationStatus;
  selectedRecipientId?: string;
  claimedBy?: string;
  claimedAt?: string;
  volunteerName?: string;
  // Route values are only present when a researched estimate exists for the
  // donor → recipient corridor (see data/chennaiRoutes.ts). They stay undefined
  // before a recipient is matched, and for corridors we have no estimate for.
  distanceKm?: number;
  etaMinutes?: number;
  createdAt: string;
  deliveryTimeline?: {
    acceptedAt?: string;
    pickupAt?: string;
    inTransitAt?: string;
    deliveredAt?: string;
  };
}

export interface RecipientInstitution {
  id: string;
  name: string;
  type: string;
  capacityChildren: number;
  address: string;
  distanceKm: number;
  etaMinutes: number;
  verified: boolean;
  contactPerson: string;
  dietaryPreferences: string[];
  openHours: string;
}

export interface RecipientMatch {
  institution: RecipientInstitution;
  matchLevel: 'Best Match' | 'Strong Match';
  isBestMatch: boolean;
  matchReasons: string[];
}

export interface DeliveryMission {
  id: string;
  donationId: string;
  donationTitle: string;
  donorName: string;
  donorAddress: string;
  recipientName: string;
  recipientAddress: string;
  quantity: number;
  dietaryType: DietaryType;
  minutesRemaining: number;
  urgency: UrgencyLevel;
  step: 'pickup' | 'transit' | 'handover' | 'completed';
  safetyChecks: {
    packagingIntact: boolean;
    foodLabelled: boolean;
    preparedTimeVerified: boolean;
    recipientDetailsConfirmed: boolean;
  };
}

export type UserRole = 'restaurant' | 'institution' | 'logistics';

export type AppView = 'landing' | 'app';

export interface UserAccount {
  id: string;
  name: string;
  role: UserRole;
  roleTitle: string;
  facility: string;
  restaurantId?: string; // RestaurantBranch id for restaurant accounts
}

export interface RestaurantBranch {
  id: string;
  name: string;
  branch?: string;
  cuisine: string;
  neighbourhood: string;
  address: string;
  pinCode?: string;
}
