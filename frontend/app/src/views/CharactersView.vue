<script setup>
import { onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { useCharacterStore } from '@/stores/characterStore.js';
import CharacterCard from '@/components/CharacterCard.vue';

const characterStore = useCharacterStore();

onMounted(() => {
  // Fetch characters only if the list is empty
  if (characterStore.characters.length === 0) {
    characterStore.fetchCharacters();
  }
});
</script>

<template>
  <div class="characters-view">
    <div class="view-header">
      <h1 class="view-title">角色图鉴</h1>
      <RouterLink to="/add-character" class="add-button">补充角色</RouterLink>
    </div>

    <div v-if="characterStore.isLoading" class="loading-state">
      正在加载角色数据...
    </div>

    <div v-else-if="characterStore.error" class="error-state">
      加载失败: {{ characterStore.error }}
    </div>

    <div v-else class="character-list">
      <CharacterCard
        v-for="character in characterStore.characters"
        :key="character.id"
        :character="character"
      />
    </div>
  </div>
</template>

<style scoped>
.characters-view {
  padding: 2rem;
}

.view-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.view-title {
  color: var(--color-heading);
  font-size: 3rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0; /* Reset margin */
}

.add-button {
  padding: 0.75rem 1.5rem;
  font-family: 'Teko', sans-serif;
  font-size: 1.2rem;
  color: var(--color-background);
  background-color: var(--color-accent-green);
  border: none;
  border-radius: 6px;
  cursor: pointer;
  text-decoration: none;
  transition: transform 0.2s;
  letter-spacing: 0.05em;
}

.add-button:hover {
  transform: scale(1.05);
}

.character-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  padding: 0 2rem;
}

.loading-state, .error-state {
  text-align: center;
  color: var(--color-text);
  font-size: 1.5rem;
  padding: 4rem;
}

.error-state {
  color: #ff4d4d;
}
</style>
