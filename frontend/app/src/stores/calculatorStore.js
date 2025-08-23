import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

import { characters } from '@/data/characters.js';
import { wEngines } from '@/data/wEngines.js';
import { calculateDamage } from '@/logic/damageCalculator.js';

export const useCalculatorStore = defineStore('calculator', () => {
  // --- STATE ---
  const selectedCharacterId = ref(null);
  const selectedWeaponId = ref(null);
  const calculationResults = ref([]);

  // Player-provided stats that add to the base stats
  const playerStats = ref({
    bonus_atk_flat: 0,
    bonus_atk_percent: 0,
    crit_rate: 0,
    crit_dmg: 0,
    dmg_bonus: 0,
    // ... more stats can be added here
  });

  // --- GETTERS ---
  const selectedCharacter = computed(() => {
    return characters.find(c => c.id === selectedCharacterId.value) || null;
  });

  const selectedWeapon = computed(() => {
    return wEngines.find(w => w.id === selectedWeaponId.value) || null;
  });

  // This is the core getter that combines all stats for the calculation
  const finalStats = computed(() => {
    if (!selectedCharacter.value) {
      return { total_atk: 0, crit_rate: 0, crit_dmg: 0, dmg_bonus: 0 };
    }

    // Start with character's base stats (e.g., at level 80)
    const charBaseStats = selectedCharacter.value.stats.level_80;
    const weaponBaseAtk = selectedWeapon.value ? selectedWeapon.value.base_atk : 0;

    // Calculate Total ATK
    const total_base_atk = charBaseStats.base_atk + weaponBaseAtk;
    const total_atk = total_base_atk * (1 + playerStats.value.bonus_atk_percent) + playerStats.value.bonus_atk_flat;

    // Combine other stats
    const crit_rate = charBaseStats.crit_rate + playerStats.value.crit_rate;
    const crit_dmg = charBaseStats.crit_dmg + playerStats.value.crit_dmg;
    const dmg_bonus = playerStats.value.dmg_bonus;

    return {
      total_atk,
      crit_rate,
      crit_dmg,
      dmg_bonus,
    };
  });


  // --- ACTIONS ---
  function setCharacter(characterId) {
    selectedCharacterId.value = characterId;
    calculationResults.value = []; // Reset results when character changes
  }

  function setWeapon(weaponId) {
    selectedWeaponId.value = weaponId;
  }

  function updatePlayerStat(stat, value) {
    if (playerStats.value.hasOwnProperty(stat)) {
      playerStats.value[stat] = Number(value) || 0;
    }
  }

  function performCalculation() {
    if (!selectedCharacter.value) return;

    const stats = finalStats.value;
    const abilities = selectedCharacter.value.abilities;
    const results = [];

    // For now, calculate for all basic attack hits and special attack
    if (abilities.basic_attack) {
      abilities.basic_attack.multipliers.forEach(m => {
        results.push({
          name: `${abilities.basic_attack.name} (${m.label})`,
          damage: calculateDamage(stats, m.value)
        });
      });
    }
    if (abilities.special_attack) {
      abilities.special_attack.multipliers.forEach(m => {
        results.push({
          name: `${abilities.special_attack.name} (${m.label})`,
          damage: calculateDamage(stats, m.value)
        });
      });
    }

    calculationResults.value = results;
  }

  return {
    // State
    selectedCharacterId,
    selectedWeaponId,
    playerStats,
    calculationResults,
    // Getters
    selectedCharacter,
    selectedWeapon,
    finalStats,
    // Actions
    setCharacter,
    setWeapon,
    updatePlayerStat,
    performCalculation,
  };
});
