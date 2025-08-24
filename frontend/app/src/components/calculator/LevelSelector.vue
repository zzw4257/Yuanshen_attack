<script setup>
import { useCalculatorStore } from '@/stores/calculatorStore.js';

const store = useCalculatorStore();

function onLevelChange(event) {
  let level = parseInt(event.target.value, 10);
  if (isNaN(level) || level < 1) {
    level = 1;
  }
  if (level > 60) { // Assuming max level is 60 for now
    level = 60;
  }
  store.characterLevel = level;
}
</script>

<template>
  <div class="level-selector-container">
    <label for="level-input">角色等级:</label>
    <input
      type="number"
      id="level-input"
      :value="store.characterLevel"
      @input="onLevelChange"
      class="custom-input"
      min="1"
      max="60"
    />
  </div>
</template>

<style scoped>
.level-selector-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

label {
  font-size: 1.1rem;
  color: var(--color-text);
  font-weight: bold;
}

.custom-input {
  padding: 0.5rem;
  font-size: 1.1rem;
  border: 1px solid var(--color-border);
  background-color: var(--color-background);
  color: var(--color-heading);
  border-radius: 4px;
  width: 80px;
  text-align: center;
}

.custom-input:focus {
  outline: none;
  border-color: var(--color-accent-green);
  box-shadow: 0 0 5px var(--color-accent-green);
}
</style>
