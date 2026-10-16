import { DonationItem } from '../types';
import { getRouteEstimate } from '../data/chennaiRoutes';
import { INITIAL_RESTAURANTS } from '../data/mockData';

/**
 * Honest route labelling.
 *
 * ShareBite only has researched road estimates for a small set of
 * restaurant → institution corridors (see data/chennaiRoutes.ts). A donation
 * therefore has three possible route states, and the UI must say which one
 * it is rather than printing a fabricated number:
 *
 *   1. No recipient chosen yet        → the distance is simply not known yet
 *   2. Recipient chosen, route known  → show the researched estimate
 *   3. Recipient chosen, no estimate  → say the corridor is not estimated
 */

export type RouteState = 'pending-match' | 'estimated' | 'unavailable';

type RouteFields = Pick<DonationItem, 'distanceKm' | 'etaMinutes' | 'selectedRecipientId' | 'claimedBy'>;

export function getRouteState(donation: RouteFields): RouteState {
  if (typeof donation.distanceKm === 'number' || typeof donation.etaMinutes === 'number') {
    return 'estimated';
  }
  return donation.selectedRecipientId || donation.claimedBy ? 'unavailable' : 'pending-match';
}

export function distanceLabel(donation: RouteFields): string {
  switch (getRouteState(donation)) {
    case 'estimated':
      return `Approx. ${donation.distanceKm} km by road`;
    case 'unavailable':
      return 'Road distance not estimated for this corridor';
    default:
      return 'Distance confirmed once a recipient is matched';
  }
}

export function travelTimeLabel(donation: RouteFields): string {
  switch (getRouteState(donation)) {
    case 'estimated':
      return `Estimated travel: ~${donation.etaMinutes} mins`;
    case 'unavailable':
      return 'Travel time not estimated for this corridor';
    default:
      return 'Travel time confirmed once a recipient is matched';
  }
}

/** Short form for dense list rows. */
export function routeSummary(donation: RouteFields): string {
  switch (getRouteState(donation)) {
    case 'estimated':
      return `~${donation.distanceKm} km · ~${donation.etaMinutes} min`;
    case 'unavailable':
      return 'Route estimate unavailable';
    default:
      return 'Route pending match';
  }
}

/**
 * Look up the researched estimate for a donor → institution pair.
 * Returns empty route fields when no estimate exists — never a guess.
 */
export function resolveRoute(
  donorId: string | undefined,
  institutionId: string
): { distanceKm?: number; etaMinutes?: number } {
  if (!donorId) return {};
  const route = getRouteEstimate(donorId, institutionId);
  if (!route) return {};
  return { distanceKm: route.distanceKm, etaMinutes: route.estimatedTravelMinutes };
}

/**
 * The restaurant branch a donation came from. Donations created in-session
 * carry donorId; the seeded ones predate it and are matched on name + branch.
 */
export function restaurantIdForDonation(
  donation: Pick<DonationItem, 'donorId' | 'donorName' | 'donorBranch'>
): string | undefined {
  if (donation.donorId) return donation.donorId;
  const match = INITIAL_RESTAURANTS.find(
    (r) => r.name === donation.donorName && (!r.branch || r.branch === donation.donorBranch)
  );
  return match?.id;
}
