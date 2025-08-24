import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useCharacterStore } from './characterStore.js';
import { wEngines } from '@/data/wEngines.js'; // Note: W-Engine data is now outdated vs character data
import { calculateDamage } from '@/logic/damageCalculator.js';

export const useCalculatorStore = defineStore('calculator', () => {
  // --- STATE ---
  const selectedCharacterId = ref(null);
  const selectedWeaponId = ref(null);
  const characterLevel = ref(60);
  const talentLevel = ref(1); // New: Assume talent level 1 for now
  const selectedAbilityKey = ref(null); // e.g., 'basic_attack_1'
  const calculationResults = ref([]);

  const playerStats = ref({
    bonus_atk_flat: 0,
    bonus_atk_percent: 0,
    crit_rate: 0,
    crit_dmg: 0,
    dmg_bonus: 0,
  });

  // --- GETTERS ---
  const characterStore = useCharacterStore();

  const selectedCharacter = computed(() => {
    if (!selectedCharacterId.value) return null;
    return characterStore.getCharacterById(selectedCharacterId.value);
  });

  const selectedWeapon = computed(() => {
    return wEngines.find(w => w.id === selectedWeaponId.value) || null;
  });

  const finalStats = computed(() => {
    if (!selectedCharacter.value) {
      return { total_atk: 0, crit_rate: 0, crit_dmg: 0, dmg_bonus: 0 };
    }

    const charData = selectedCharacter.value;
    const level = characterLevel.value;

    // Find the correct stat row from the new data structure
    let baseStats = { atk: 0, def: 0, hp: 0 };
    for (const key in charData.stats) {
        if (key.startsWith('ascension_')) {
            const ascData = charData.stats[key][0];
            if (level >= ascData.level) {
                baseStats.atk = ascData.atk_post || ascData.atk;
                baseStats.hp = ascData.hp_post || ascData.hp;
                baseStats.def = ascData.def_post || ascData.def_field;
            }
        }
    }

    const base_crit_rate = parseFloat(charData.stats.base.crit_rate) / 100;
    const base_crit_dmg = parseFloat(charData.stats.base.crit_dmg) / 100;

    const weaponBaseAtk = selectedWeapon.value ? selectedWeapon.value.base_atk : 0;

    const total_base_atk = baseStats.atk + weaponBaseAtk;
    const total_atk = total_base_atk * (1 + playerStats.value.bonus_atk_percent) + playerStats.value.bonus_atk_flat;

    const crit_rate = base_crit_rate + playerStats.value.crit_rate;
    const crit_dmg = base_crit_dmg + playerStats.value.crit_dmg;
    const dmg_bonus = playerStats.value.dmg_bonus;

    return { total_atk, crit_rate, crit_dmg, dmg_bonus };
  });

  // --- ACTIONS ---
  function setCharacter(characterId) {
    selectedCharacterId.value = characterId;
    selectedAbilityKey.value = null;
    calculationResults.value = [];
  }

  function performCalculation() {
    if (!selectedCharacter.value || !selectedAbilityKey.value) return;

    const stats = finalStats.value;
    const skill = selectedCharacter.value.skills[selectedAbilityKey.value];
    if (!skill) return;

    const results = [];
    const skillMultipliers = skill.multipliers.damage;

    // Find the multipliers for the current talent level (or closest)
    const talentIdx = talentLevel.value - 1;
    const multipliers = skillMultipliers[talentIdx] || skillMultipliers[0];

    for (let i = 0; i < multipliers.values.length; i++) {
        const multiplierValue = parseFloat(multipliers.values[i]) / 100;
        const abilityName = `${skill.name} (${skill.multipliers.headers[i+1]})`;
        results.push({
            name: abilityName,
            damage: calculateDamage(stats, multiplierValue)
        });
    }

    calculationResults.value = results;
  }

  return {
    selectedCharacterId,
    selectedAbilityKey,
    playerStats,
    characterLevel,
    talentLevel,
    calculationResults,
    selectedCharacter,
    finalStats,
    setCharacter,
    performCalculation,
  };
});
