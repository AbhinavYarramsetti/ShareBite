/**
 * ShareBite — Chennai Static Route Estimates
 *
 * These are approximate road distances and estimated travel times
 * for selected restaurant-to-institution routes in Chennai.
 *
 * Values are static demonstration estimates derived from public
 * mapping data (OpenStreetMap / Google Maps approximate readings)
 * and are NOT live routing results.
 *
 * Label honestly in the UI: "Approx. road distance", "Estimated travel time".
 * Do NOT present these as real-time or GPS-tracked values.
 *
 * Source: OpenStreetMap routing approximations, last checked Oct 2024.
 */

export interface RouteEstimate {
  restaurantId: string;
  institutionId: string;
  distanceKm: number;
  estimatedTravelMinutes: number;
  distanceType: 'road-estimate' | 'straight-line-approx';
  notes?: string;
  lastVerified: string; // ISO date string (approximate check date)
}

export const CHENNAI_ROUTES: RouteEstimate[] = [
  // ── Mathsya T. Nagar → Bala Mandir T. Nagar ──────────────────────
  // Both on T. Nagar; very short road distance
  {
    restaurantId: 'restaurant-mathsya-tnagar',
    institutionId: 'institution-bala-mandir-tnagar',
    distanceKm: 1.2,
    estimatedTravelMinutes: 6,
    distanceType: 'road-estimate',
    notes: 'Both within T. Nagar; route via GN Chetty Road / Usman Road',
    lastVerified: '2024-10-01',
  },
  // ── Coffee Shastra T. Nagar → Bala Mandir T. Nagar ───────────────
  {
    restaurantId: 'restaurant-coffee-shastra-tnagar',
    institutionId: 'institution-bala-mandir-tnagar',
    distanceKm: 0.9,
    estimatedTravelMinutes: 5,
    distanceType: 'road-estimate',
    notes: 'Sub-1 km; both on Bazulla / GN Chetty Road area',
    lastVerified: '2024-10-01',
  },
  // ── A2B T. Nagar → Bala Mandir T. Nagar ──────────────────────────
  {
    restaurantId: 'restaurant-a2b-tnagar',
    institutionId: 'institution-bala-mandir-tnagar',
    distanceKm: 1.5,
    estimatedTravelMinutes: 7,
    distanceType: 'road-estimate',
    notes: 'Pondy Bazaar to GN Chetty Road',
    lastVerified: '2024-10-01',
  },
  // ── Saravanaa Bhavan Egmore → Bala Mandir T. Nagar ───────────────
  {
    restaurantId: 'restaurant-saravanaa-egmore',
    institutionId: 'institution-bala-mandir-tnagar',
    distanceKm: 4.2,
    estimatedTravelMinutes: 16,
    distanceType: 'road-estimate',
    notes: 'Kennet Lane Egmore → Nungambakkam → T. Nagar via Anna Salai',
    lastVerified: '2024-10-01',
  },
  // ── Mathsya Egmore → Bala Mandir T. Nagar ────────────────────────
  {
    restaurantId: 'restaurant-mathsya-egmore',
    institutionId: 'institution-bala-mandir-tnagar',
    distanceKm: 4.0,
    estimatedTravelMinutes: 15,
    distanceType: 'road-estimate',
    notes: 'Tamil Salai Egmore → Anna Salai → T. Nagar',
    lastVerified: '2024-10-01',
  },
  // ── Anjappar Anna Nagar → Bala Mandir T. Nagar ───────────────────
  {
    restaurantId: 'restaurant-anjappar-anna-nagar',
    institutionId: 'institution-bala-mandir-tnagar',
    distanceKm: 5.5,
    estimatedTravelMinutes: 18,
    distanceType: 'road-estimate',
    notes: '3rd Avenue Anna Nagar → Kilpauk → Nungambakkam → T. Nagar',
    lastVerified: '2024-10-01',
  },
  // ── Saravanaa Bhavan Anna Nagar → Hope Ambattur ──────────────────
  {
    restaurantId: 'restaurant-saravanaa-anna-nagar',
    institutionId: 'institution-hope-ambattur',
    distanceKm: 8.0,
    estimatedTravelMinutes: 22,
    distanceType: 'road-estimate',
    notes: 'Anna Nagar → Aminjikarai → Ambattur O.T.',
    lastVerified: '2024-10-01',
  },
  // ── Anjappar Anna Nagar → Sri Arunodayam Kolathur ────────────────
  {
    restaurantId: 'restaurant-anjappar-anna-nagar',
    institutionId: 'institution-arunodayam-boys-kolathur',
    distanceKm: 9.0,
    estimatedTravelMinutes: 26,
    distanceType: 'road-estimate',
    notes: 'Anna Nagar East → Perambur → Kolathur',
    lastVerified: '2024-10-01',
  },
  // ── Mathsya Adyar → All The Children Karapakkam ──────────────────
  // OMR corridor; long but viable for fresh donations early in window
  {
    restaurantId: 'restaurant-mathsya-adyar',
    institutionId: 'institution-all-children-karapakkam',
    distanceKm: 18.0,
    estimatedTravelMinutes: 38,
    distanceType: 'road-estimate',
    notes: 'Adyar → Taramani → Perungudi → Karapakkam OMR. Only viable if freshness window > 55 min.',
    lastVerified: '2024-10-01',
  },
  // ── A2B Adyar → Bala Mandir T. Nagar ─────────────────────────────
  {
    restaurantId: 'restaurant-a2b-adyar',
    institutionId: 'institution-bala-mandir-tnagar',
    distanceKm: 7.5,
    estimatedTravelMinutes: 24,
    distanceType: 'road-estimate',
    notes: 'L.B. Road Adyar → Kotturpuram → T. Nagar',
    lastVerified: '2024-10-01',
  },
  // ── Anjappar Adyar → All The Children Karapakkam ─────────────────
  {
    restaurantId: 'restaurant-anjappar-adyar',
    institutionId: 'institution-all-children-karapakkam',
    distanceKm: 17.5,
    estimatedTravelMinutes: 36,
    distanceType: 'road-estimate',
    notes: 'KB Nagar Adyar → OMR Karapakkam. Long; only suitable with generous freshness buffer.',
    lastVerified: '2024-10-01',
  },
];

/**
 * Look up a route estimate for a restaurant–institution pair.
 * Returns undefined if no researched route exists.
 * Do NOT fabricate a distance if this returns undefined.
 */
export function getRouteEstimate(
  restaurantId: string,
  institutionId: string
): RouteEstimate | undefined {
  return CHENNAI_ROUTES.find(
    (r) => r.restaurantId === restaurantId && r.institutionId === institutionId
  );
}
