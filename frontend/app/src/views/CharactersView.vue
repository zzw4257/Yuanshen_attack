<script setup>
import { characters } from '@/data/characters.js';
import CharacterCard from '@/components/CharacterCard.vue';
</script>

<template>
  <div class="characters-view">
    <h1 class="view-title">角色图鉴</h1>
    <div class="character-list">
      <CharacterCard
        v-for="character in characters"
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

.view-title {
  color: var(--color-heading);
  font-size: 3rem;
  margin-bottom: 2rem;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.character-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  padding: 0 2rem; /* Add some horizontal padding */
}
</style>
