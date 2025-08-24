<script setup>
import CharacterSelector from '@/components/calculator/CharacterSelector.vue';
import LevelSelector from '@/components/calculator/LevelSelector.vue';
import AbilitySelector from '@/components/calculator/AbilitySelector.vue';
import StatInput from '@/components/calculator/StatInput.vue';
import ResultsDisplay from '@/components/calculator/ResultsDisplay.vue';
import { useCalculatorStore } from '@/stores/calculatorStore.js';

const store = useCalculatorStore();
</script>

<template>
  <div class="calculator-view">
    <h1 class="view-title">超级伤害计算器</h1>
    <div class="calculator-layout">
      <div class="config-panel">
        <section class="config-section">
          <h2>1. 角色选择</h2>
          <div class="character-selection-header">
            <CharacterSelector />
            <LevelSelector />
          </div>
        </section>

        <section class="config-section" v-if="store.selectedCharacter">
          <h2>2. 技能选择</h2>
          <AbilitySelector />
        </section>

        <section class="config-section" v-if="store.selectedCharacter">
          <h2>3. 属性面板</h2>
          <StatInput stat="bonus_atk_flat" label="额外攻击力" />
          <StatInput stat="bonus_atk_percent" label="额外攻击力 %" is-percent />
          <StatInput stat="crit_rate" label="暴击率 %" is-percent />
          <StatInput stat="crit_dmg" label="暴击伤害 %" is-percent />
          <StatInput stat="dmg_bonus" label="增伤 %" is-percent />
        </section>

        <section class="config-section" v-if="store.selectedCharacter">
          <h2>4. 装备配置</h2>
          <p>（音擎和驱动盘选择器将放在这里）</p>
        </section>

        <div class="calculate-button-wrapper" v-if="store.selectedCharacter && store.selectedAbility">
          <button @click="store.performCalculation" class="calculate-button">
            计 算
          </button>
        </div>
      </div>
      <div class="results-panel">
        <section class="results-section">
          <h2>计算结果</h2>
          <div v-if="!store.selectedCharacter" class="placeholder-text">
            请先选择一个角色
          </div>
          <div v-else-if="store.calculationResults.length === 0" class="placeholder-text">
            选择技能并点击“计算”
          </div>
          <div v-else>
            <ResultsDisplay
              v-for="(result, index) in store.calculationResults"
              :key="index"
              :ability-name="result.name"
              :results="result.damage"
            />
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.calculator-view {
  padding: 2rem;
}

.view-title {
  color: var(--color-heading);
  font-size: 3rem;
  margin-bottom: 2rem;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.calculator-layout {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.config-panel, .results-panel {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.config-section, .results-section {
  background-color: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 1.5rem;
}

h2 {
  font-family: 'Teko', sans-serif;
  font-size: 2rem;
  color: var(--color-accent-green);
  margin-top: 0;
  margin-bottom: 1rem;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 0.5rem;
}

.character-selection-header {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.character-selection-header > :first-child {
  flex-grow: 1;
}

.calculate-button-wrapper {
  margin-top: 1rem;
}

.calculate-button {
  width: 100%;
  padding: 1rem;
  font-family: 'Teko', sans-serif;
  font-size: 1.8rem;
  color: var(--color-background);
  background-color: var(--color-accent-green);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  letter-spacing: 0.1em;
}

.calculate-button:hover {
  transform: scale(1.02);
  box-shadow: 0 0 15px var(--color-accent-green);
}

.placeholder-text {
  text-align: center;
  color: var(--color-text);
  opacity: 0.7;
  padding: 2rem;
}
</style>
