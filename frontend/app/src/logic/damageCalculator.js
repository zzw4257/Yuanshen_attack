/**
 * A simplified damage calculation function for the ZZZ Damage Calculator MVP.
 *
 * @param {object} finalStats - The character's final stats after all bonuses.
 * @param {number} finalStats.total_atk - Total Attack of the character.
 * @param {number} finalStats.crit_rate - Critical Hit Rate (e.g., 0.75 for 75%).
 * @param {number} finalStats.crit_dmg - Critical Hit Damage (e.g., 1.50 for 150%).
 * @param {number} finalStats.dmg_bonus - All Damage Bonus % (e.g., 0.466 for 46.6%).
 * @param {number} abilityMultiplier - The multiplier for the specific ability being used.
 * @returns {object} An object containing the calculated non-crit, crit, and average damage.
 */
export function calculateDamage(finalStats, abilityMultiplier) {
  // Basic validation
  if (!finalStats || typeof abilityMultiplier !== 'number') {
    return { nonCrit: 0, crit: 0, average: 0 };
  }

  const {
    total_atk = 0,
    crit_rate = 0,
    crit_dmg = 0,
    dmg_bonus = 0
  } = finalStats;

  // 1. Calculate Base Damage
  const baseDamage = total_atk * abilityMultiplier;

  // 2. Apply Damage Bonus
  const damageWithBonus = baseDamage * (1 + dmg_bonus);

  // 3. Calculate Non-Crit and Crit Damage
  const nonCritDamage = damageWithBonus;
  const critDamage = damageWithBonus * (1 + crit_dmg);

  // 4. Calculate Average Damage considering Crit Rate
  // Clamp crit_rate between 0 and 1
  const effectiveCritRate = Math.max(0, Math.min(1, crit_rate));
  const averageDamage = (nonCritDamage * (1 - effectiveCritRate)) + (critDamage * effectiveCritRate);

  return {
    nonCrit: Math.round(nonCritDamage),
    crit: Math.round(critDamage),
    average: Math.round(averageDamage),
  };
}

// Example Usage:
/*
const sampleStats = {
  total_atk: 2000,
  crit_rate: 0.7,
  crit_dmg: 1.8,
  dmg_bonus: 0.466,
};
const sampleMultiplier = 2.5; // 250%

const result = calculateDamage(sampleStats, sampleMultiplier);
console.log(result); // { nonCrit: 7330, crit: 20524, average: 16566 }
*/
