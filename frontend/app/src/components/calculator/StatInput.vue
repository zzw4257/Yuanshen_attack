<script setup>
import { useCalculatorStore } from '@/stores/calculatorStore.js';

const props = defineProps({
  stat: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  isPercent: {
    type: Boolean,
    default: false
  }
});

const store = useCalculatorStore();

function onInputChange(event) {
  let value = parseFloat(event.target.value);
  if (isNaN(value)) {
    value = 0;
  }
  // If the input is a percentage, convert it to a decimal
  if (props.isPercent) {
    value = value / 100;
  }
  store.updatePlayerStat(props.stat, value);
}

// Format the store value back to a percentage for display if needed
const displayValue = computed(() => {
  const storeValue = store.playerStats[props.stat];
  if (props.isPercent) {
    return (storeValue * 100).toFixed(1);
  }
  return storeValue;
});
</script>

<template>
  <div class="stat-input-container">
    <label :for="`stat-input-${stat}`">{{ label }}</label>
    <div class="input-wrapper">
      <input
        type="number"
        :id="`stat-input-${stat}`"
        :value="displayValue"
        @input="onInputChange"
        class="custom-input"
        step="0.1"
      />
      <span v-if="isPercent" class="percent-sign">%</span>
    </div>
  </div>
</template>

<style scoped>
.stat-input-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

label {
  font-size: 1.1rem;
  color: var(--color-text);
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.custom-input {
  padding: 0.5rem;
  font-size: 1.1rem;
  border: 1px solid var(--color-border);
  background-color: var(--color-background);
  color: var(--color-heading);
  border-radius: 4px;
  width: 120px;
  text-align: right;
}

.custom-input:focus {
  outline: none;
  border-color: var(--color-accent-green);
  box-shadow: 0 0 5px var(--color-accent-green);
}

.percent-sign {
  position: absolute;
  right: 10px;
  color: var(--color-text);
  opacity: 0.5;
}

/* Hide default number input arrows */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
}
</style>
