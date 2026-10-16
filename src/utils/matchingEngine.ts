import { DonationItem, RecipientInstitution, RecipientMatch } from '../types';

/**
 * Deterministic, Explainable Matching Engine
 * Evaluates candidate recipient institutions based on:
 * 1. Freshness window vs travel ETA (Freshness compatibility)
 * 2. Dietary preferences vs meal composition (Food compatibility)
 * 3. Meal quantity vs institution capacity (Capacity fit)
 * 4. Spatial distance (Distance & ETA)
 */
export function calculateRecipientMatches(
  donation: DonationItem,
  institutions: RecipientInstitution[]
): RecipientMatch[] {
  const scoredMatches = institutions.map((institution, index) => {
    let score = 50; // Internal ranking weight
    const reasons: string[] = [];

    // 1. Freshness Compatibility
    const bufferMinutes = donation.minutesRemaining - institution.etaMinutes;
    if (bufferMinutes > 30) {
      score += 25;
      reasons.push(`Ample freshness window (${donation.minutesRemaining} min remaining vs ~${institution.etaMinutes} min travel)`);
    } else if (bufferMinutes > 15) {
      score += 15;
      reasons.push(`Viable dispatch window (~${bufferMinutes} min safety buffer remaining)`);
    } else if (bufferMinutes > 0) {
      score += 5;
      reasons.push(`Tight dispatch window (~${bufferMinutes} min safety buffer)`);
    } else {
      score -= 30;
      reasons.push('Estimated travel time exceeds remaining safe freshness window');
    }

    // 2. Food & Dietary Compatibility
    const requiresVeg = institution.dietaryPreferences.some((p) =>
      p.toLowerCase().includes('vegetarian')
    );
    if (donation.dietaryType === 'vegetarian') {
      score += 15;
      reasons.push('Compatible dietary profile (Vegetarian meal satisfies care facility preferences)');
    } else if (requiresVeg) {
      score -= 20;
      reasons.push('Institution prioritizes strictly vegetarian nutrition');
    } else {
      score += 10;
      reasons.push(`Dietary match confirmed for ${donation.dietaryType}`);
    }

    // 3. Recipient Capacity Fit
    const capacityRatio = donation.quantity / institution.capacityChildren;
    if (capacityRatio >= 0.5 && capacityRatio <= 1.2) {
      score += 15;
      reasons.push(`Optimal portion sizing (${donation.quantity} meals for ${institution.capacityChildren} capacity)`);
    } else if (capacityRatio < 0.5) {
      score += 5;
      reasons.push(`Supplemental portions (${donation.quantity} meals for ${institution.capacityChildren} capacity)`);
    } else {
      score += 5;
      reasons.push(`Full facility coverage (${donation.quantity} meals serves population)`);
    }

    // 4. Distance & ETA
    if (institution.distanceKm <= 2.5) {
      score += 10;
      reasons.push(`High proximity (approx. ${institution.distanceKm} km, ~${institution.etaMinutes} min travel)`);
    } else if (institution.distanceKm <= 4.0) {
      score += 5;
      reasons.push(`Moderate proximity (approx. ${institution.distanceKm} km away)`);
    }

    return {
      institution,
      internalScore: score,
      matchLevel: (index === 0 ? 'Best Match' : 'Strong Match') as 'Best Match' | 'Strong Match',
      isBestMatch: false,
      matchReasons: reasons,
    };
  });

  // Sort descending by internal ranking score
  scoredMatches.sort((a, b) => b.internalScore - a.internalScore);

  // Assign Best Match to top rank, Strong Match to remaining
  return scoredMatches.map((item, idx) => ({
    institution: item.institution,
    matchLevel: idx === 0 ? 'Best Match' : 'Strong Match',
    isBestMatch: idx === 0,
    matchReasons: item.matchReasons,
  }));
}
