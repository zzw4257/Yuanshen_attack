import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

import { useCharacterStore } from './characterStore.js';
import { wEngines } from '@/data/wEngines.js';
import { calculateDamage } from '@/logic/damageCalculator.js';

export const useCalculatorStore = defineStore('calculator', () => {
  // --- STATE ---
  const selectedCharacterId = ref(null);
  const selectedWeaponId = ref(null);
  const characterLevel = ref(60);
  const selectedAbility = ref(null); // e.g., 'AX' or 'EQ'
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

  const selectedCharacterSkills = computed(() => {
    if (!selectedCharacterId.value) return null;
    return characterStore.getSkillsByCharId(selectedCharacterId.value);
  });

  const selectedWeapon = computed(() => {
    return wEngines.find(w => w.id === selectedWeaponId.value) || null;
  });

  const finalStats = computed(() => {
    if (!selectedCharacter.value) {
      return { total_atk: 0, crit_rate: 0, crit_dmg: 0, dmg_bonus: 0 };
    }
    const charData = selectedCharacter.value;
    const base_atk = charData.attack;
    const base_crit_rate = charData.crit / 10000;
    const base_crit_dmg = charData.critDamage / 10000;
    const weaponBaseAtk = selectedWeapon.value ? selectedWeapon.value.base_atk : 0;
    const total_base_atk = base_atk + weaponBaseAtk;
    const total_atk = total_base_atk * (1 + playerStats.value.bonus_atk_percent) + playerStats.value.bonus_atk_flat;
    const crit_rate = base_crit_rate + playerStats.value.crit_rate;
    const crit_dmg = base_crit_dmg + playerStats.value.crit_dmg;
    const dmg_bonus = playerStats.value.dmg_bonus;

    return { total_atk, crit_rate, crit_dmg, dmg_bonus };
  });

  // --- ACTIONS ---
  function setCharacter(characterId) {
    selectedCharacterId.value = characterId;
    selectedAbility.value = null; // Reset selected ability
    calculationResults.value = [];
    characterStore.fetchSkillData(characterId); // Fetch skills for the new character
  }

  function performCalculation() {
    if (!selectedCharacter.value || !selectedAbility.value || !selectedCharacterSkills.value) return;

    const stats = finalStats.value;
    const skillSet = selectedCharacterSkills.value.skill;
    const abilityMultipliers = skillSet[selectedAbility.value];

    if (!abilityMultipliers || abilityMultipliers.length === 0) {
      console.error(`No multipliers found for ability ${selectedAbility.value}`);
      return;
    }

    // For now, just use the first level multiplier (level 1 talent)
    const multiplier = abilityMultipliers[0];

    const results = [{
      name: `技能 [${selectedAbility.value}]`,
      damage: calculateDamage(stats, multiplier)
    }];

    calculationResults.value = results;
  }

  return {
    selectedCharacterId,
    selectedAbility,
    playerStats,
    characterLevel,
    calculationResults,
    selectedCharacter,
    selectedCharacterSkills,
    finalStats,
    setCharacter,
    performCalculation,
  };
});
