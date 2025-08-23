<script setup>
defineProps({
  results: {
    type: Object,
    required: true
  },
  abilityName: {
    type: String,
    default: 'N/A'
  }
});
</script>

<template>
  <div class="results-container">
    <h4>{{ abilityName }}</h4>
    <div class="result-item">
      <span class="label">平均期望伤害</span>
      <span class="value average">{{ results.average?.toLocaleString() || 0 }}</span>
    </div>
    <div class="result-item">
      <span class="label">暴击伤害</span>
      <span class="value crit">{{ results.crit?.toLocaleString() || 0 }}</span>
    </div>
    <div class="result-item">
      <span class="label">非暴击伤害</span>
      <span class="value non-crit">{{ results.nonCrit?.toLocaleString() || 0 }}</span>
    </div>
  </div>
</template>

<style scoped>
.results-container {
  background-color: var(--color-background);
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 1rem;
}

h4 {
  color: var(--color-text);
  font-size: 1.2rem;
  margin: 0 0 1rem 0;
  text-align: center;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 0.5rem;
}

.result-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.label {
  color: var(--color-text);
  opacity: 0.8;
}

.value {
  font-family: 'Teko', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
}

.average {
  color: var(--color-accent-green);
  font-size: 1.8rem;
}

.crit {
  color: var(--color-accent-yellow);
}

.non-crit {
  color: var(--color-text);
}
</style>
