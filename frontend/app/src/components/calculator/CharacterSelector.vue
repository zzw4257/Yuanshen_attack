<script setup>
import { onMounted } from 'vue';
import { useCharacterStore } from '@/stores/characterStore.js';
import { useCalculatorStore } from '@/stores/calculatorStore.js';

const characterStore = useCharacterStore();
const calculatorStore = useCalculatorStore();

onMounted(() => {
  // Fetch characters if they haven't been fetched already
  if (characterStore.characters.length === 0) {
    characterStore.fetchCharacters();
  }
});

function onCharacterChange(event) {
  calculatorStore.setCharacter(event.target.value);
}
</script>

<template>
  <div class="selector-container">
    <label for="character-select">选择角色:</label>
    <select
      id="character-select"
      :value="calculatorStore.selectedCharacterId"
      @change="onCharacterChange"
      class="custom-select"
    >
      <option :value="null" disabled>--请选择一个角色--</option>
      <option
        v-for="char in characterStore.characters"
        :key="char.id"
        :value="char.id"
      >
        {{ char.name }}
      </option>
    </select>
  </div>
</template>

<style scoped>
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
</style>
