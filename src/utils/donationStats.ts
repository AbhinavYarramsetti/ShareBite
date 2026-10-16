import { DonationItem, DonationStatus, UserAccount } from '../types';

/**
 * Illustrative conversion factors for demo impact figures.
 * These are rough public-domain averages, not measured ShareBite outcomes —
 * every surface that prints them also states the assumption.
 */
export const FOOD_KG_PER_MEAL = 0.4;
export const CO2E_KG_PER_MEAL = 0.75;

const AWAITING_MATCH: DonationStatus[] = ['draft', 'submitted', 'matching'];
const IN_FLIGHT: DonationStatus[] = ['accepted', 'pickup-confirmed', 'in-transit'];
const FULFILLED: DonationStatus[] = ['delivered', 'completed'];
const CLOSED: DonationStatus[] = ['expired', 'cancelled'];

export const isAwaitingMatch = (d: DonationItem) => AWAITING_MATCH.includes(d.status);
export const isInFlight = (d: DonationItem) => IN_FLIGHT.includes(d.status);
export const isFulfilled = (d: DonationItem) => FULFILLED.includes(d.status);
export const isClosed = (d: DonationItem) => CLOSED.includes(d.status);
export const isActive = (d: DonationItem) => isAwaitingMatch(d) || isInFlight(d);

export interface DonationSummary {
  total: number;
  awaitingMatch: number;
  inFlight: number;
  fulfilled: number;
  closed: number;
  mealsAwaitingMatch: number;
  mealsInFlight: number;
  mealsFulfilled: number;
  mealsTotal: number;
  institutionsReached: number;
  foodKgDiverted: number;
  co2eKgAverted: number;
  /** Smallest remaining freshness window across active donations, if any. */
  tightestWindowMinutes: number | null;
}

const sumMeals = (items: DonationItem[]) => items.reduce((total, d) => total + d.quantity, 0);

export function summarizeDonations(donations: DonationItem[]): DonationSummary {
  const awaiting = donations.filter(isAwaitingMatch);
  const inFlight = donations.filter(isInFlight);
  const fulfilled = donations.filter(isFulfilled);
  const closed = donations.filter(isClosed);

  const activeWindows = donations
    .filter((d) => isActive(d) && d.minutesRemaining > 0)
    .map((d) => d.minutesRemaining);

  const mealsFulfilled = sumMeals(fulfilled);

  return {
    total: donations.length,
    awaitingMatch: awaiting.length,
    inFlight: inFlight.length,
    fulfilled: fulfilled.length,
    closed: closed.length,
    mealsAwaitingMatch: sumMeals(awaiting),
    mealsInFlight: sumMeals(inFlight),
    mealsFulfilled,
    mealsTotal: sumMeals(donations),
    institutionsReached: new Set(
      donations.filter((d) => d.claimedBy).map((d) => d.claimedBy as string)
    ).size,
    foodKgDiverted: Math.round(mealsFulfilled * FOOD_KG_PER_MEAL * 10) / 10,
    co2eKgAverted: Math.round(mealsFulfilled * CO2E_KG_PER_MEAL * 10) / 10,
    tightestWindowMinutes: activeWindows.length ? Math.min(...activeWindows) : null,
  };
}

/** Accounts are named "<Restaurant> — <Branch>"; seed donations predate donorId. */
function matchesAccountName(donation: DonationItem, account: UserAccount): boolean {
  const donorLabel = donation.donorBranch
    ? `${donation.donorName} — ${donation.donorBranch}`
    : donation.donorName;
  return donorLabel === account.name;
}

export function donationsForRestaurant(
  donations: DonationItem[],
  account: UserAccount
): DonationItem[] {
  return donations.filter((d) =>
    d.donorId && account.restaurantId
      ? d.donorId === account.restaurantId
      : matchesAccountName(d, account)
  );
}

export interface PartnerTally {
  name: string;
  meals: number;
  deliveries: number;
}

/** Who received the meals — used on the restaurant impact tab. */
export function recipientTally(donations: DonationItem[]): PartnerTally[] {
  return tally(donations.filter(isFulfilled), (d) => d.claimedBy || 'Recipient pending');
}

/** Which kitchens the meals came from — used on the institution impact tab. */
export function donorTally(donations: DonationItem[]): PartnerTally[] {
  return tally(donations.filter(isFulfilled), (d) =>
    d.donorBranch ? `${d.donorName} – ${d.donorBranch}` : d.donorName
  );
}

function tally(donations: DonationItem[], keyOf: (d: DonationItem) => string): PartnerTally[] {
  const byName = new Map<string, PartnerTally>();
  donations.forEach((d) => {
    const name = keyOf(d);
    const row = byName.get(name) || { name, meals: 0, deliveries: 0 };
    row.meals += d.quantity;
    row.deliveries += 1;
    byName.set(name, row);
  });
  return [...byName.values()].sort((a, b) => b.meals - a.meals);
}
