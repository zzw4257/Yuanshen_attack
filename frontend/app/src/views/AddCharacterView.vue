<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCharacterStore } from '@/stores/characterStore';

const router = useRouter();
const characterStore = useCharacterStore();

const newCharacter = ref({
  id: '',
  name: '',
  rarity: 'A',
  faction: '',
  attribute: '',
  weapon: '',
  bio: '',
  icon: '/path/to/default_icon.png',
  stats: {
    level_60: { base_atk: 0, base_hp: 0, base_def: 0, crit_rate: 0.05, crit_dmg: 0.50 }
  },
  abilities: {
    basic_attack: { name: '普通攻击', multipliers: [{ level: 1, value: 0, label: '普攻' }] },
    special_attack: { name: '特殊技', multipliers: [{ level: 1, value: 0, label: '特攻' }] }
  }
});

async function submitCharacter() {
  try {
    const response = await fetch('http://localhost:8000/api/characters', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCharacter.value),
    });

    if (!response.ok) {
      throw new Error('Failed to create character');
    }

    const createdCharacter = await response.json();
    characterStore.addCharacter(createdCharacter); // Add to local store
    router.push('/characters'); // Navigate back to the list

  } catch (error) {
    console.error('Error submitting new character:', error);
    alert('创建角色失败: ' + error.message);
  }
}
</script>

<template>
  <div class="add-character-view">
    <h1 class="view-title">补充新角色</h1>
    <form @submit.prevent="submitCharacter" class="character-form">
      <!-- Basic Info -->
      <fieldset>
        <legend>基本信息</legend>
        <input v-model="newCharacter.id" placeholder="ID (e.g., 'new-char')" required />
        <input v-model="newCharacter.name" placeholder="名称" required />
        <select v-model="newCharacter.rarity">
          <option value="A">A级</option>
          <option value="S">S级</option>
        </select>
        <input v-model="newCharacter.faction" placeholder="阵营" />
        <input v-model="newCharacter.attribute" placeholder="属性" />
        <input v-model="newCharacter.weapon" placeholder="武器" />
        <textarea v-model="newCharacter.bio" placeholder="简介"></textarea>
      </fieldset>

      <!-- Stats -->
      <fieldset>
        <legend>60级基础属性</legend>
        <input type="number" v-model.number="newCharacter.stats.level_60.base_atk" placeholder="基础攻击" />
        <input type="number" v-model.number="newCharacter.stats.level_60.base_hp" placeholder="基础生命" />
        <input type="number" v-model.number="newCharacter.stats.level_60.base_def" placeholder="基础防御" />
        <input type="number" step="0.001" v-model.number="newCharacter.stats.level_60.crit_rate" placeholder="暴击率 (e.g. 0.05)" />
        <input type="number" step="0.01" v-model.number="newCharacter.stats.level_60.crit_dmg" placeholder="暴击伤害 (e.g. 0.5)" />
      </fieldset>

      <!-- Abilities -->
      <fieldset>
        <legend>技能倍率 (Lv.1)</legend>
        <input type="number" step="0.01" v-model.number="newCharacter.abilities.basic_attack.multipliers[0].value" placeholder="普攻倍率" />
        <input type="number" step="0.01" v-model.number="newCharacter.abilities.special_attack.multipliers[0].value" placeholder="特攻倍率" />
      </fieldset>

      <button type="submit" class="submit-button">提交</button>
    </form>
  </div>
</template>

<style scoped>
.add-character-view {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: var(--color-background-soft);
  border-radius: 8px;
}

.view-title {
  text-align: center;
  color: var(--color-accent-green);
  margin-bottom: 2rem;
}

.character-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

fieldset {
  border: 1px solid var(--color-border);
  border-radius: 6px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

legend {
  color: var(--color-heading);
  font-family: 'Teko', sans-serif;
  font-size: 1.5rem;
  padding: 0 0.5rem;
}

input, select, textarea {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  background-color: var(--color-background);
  color: var(--color-text);
  border: 1px solid var(--color-border-hover);
  border-radius: 4px;
}

textarea {
  min-height: 100px;
  resize: vertical;
}

.submit-button {
  padding: 1rem;
  font-family: 'Teko', sans-serif;
  font-size: 1.5rem;
  color: var(--color-background);
  background-color: var(--color-accent-green);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s;
}

.submit-button:hover {
  transform: scale(1.02);
}
</style>
