<script setup>
import { computed } from 'vue';
import { useCalculatorStore } from '@/stores/calculatorStore.js';

const store = useCalculatorStore();

const availableSkills = computed(() => {
  if (!store.selectedCharacterSkills || !store.selectedCharacterSkills.skill) {
    return [];
  }
  // Convert the skill dictionary into an array for v-for
  return Object.keys(store.selectedCharacterSkills.skill).map(key => ({
    id: key,
    // A real implementation would have a mapping from 'AX' to a proper name
    name: `技能 - ${key}`
  }));
});

function onAbilityChange(event) {
  store.selectedAbility = event.target.value;
}
</script>

<template>
  <div class="selector-container">
    <label for="ability-select">选择技能:</label>
    <select
      id="ability-select"
      :value="store.selectedAbility"
      @change="onAbilityChange"
      class="custom-select"
      :disabled="availableSkills.length === 0"
    >
      <option :value="null" disabled>--请选择一个技能--</option>
      <option
        v-for="skill in availableSkills"
        :key="skill.id"
        :value="skill.id"
      >
        {{ skill.name }}
      </option>
    </select>
  </div>
</template>

<style scoped>
/* Styles are identical to CharacterSelector, can be refactored later */
.selector-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-size: 1.1rem;
  color: var(--color-text);
}

.custom-select {
  padding: 0.75rem;
  font-family: 'Teko', sans-serif;
  font-size: 1.25rem;
  border: 1px solid var(--color-border);
  background-color: var(--color-background);
  color: var(--color-heading);
  border-radius: 4px;
  cursor: pointer;
}

.custom-select:focus {
  outline: none;
  border-color: var(--color-accent-green);
  box-shadow: 0 0 5px var(--color-accent-green);
}

.custom-select:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
