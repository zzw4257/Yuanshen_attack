<script setup>
defineProps({
  character: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div class="character-card">
    <div class="card-header">
      <img :src="character.icon" :alt="character.name" class="character-icon" />
      <div class="rarity-badge" :class="`rarity-${character.rarity.toLowerCase()}`">
        {{ character.rarity }}
      </div>
    </div>
    <div class="card-body">
      <h3 class="character-name">{{ character.name }}</h3>
      <div class="character-details">
        <span class="detail-item">{{ character.faction }}</span>
        <span class="detail-item">{{ character.attribute }}</span>
        <span class="detail-item">{{ character.weapon }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.character-card {
  background-color: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
}

.character-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4), 0 0 15px var(--color-accent-green);
  border-color: var(--color-accent-green);
}

.card-header {
  position: relative;
  background-color: var(--color-background-mute);
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.character-icon {
  width: 150px;
  height: 150px;
  object-fit: contain;
  /* Placeholder style for missing icons */
  filter: invert(1);
}

.rarity-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-family: 'Teko', sans-serif;
  font-size: 1.25rem;
  color: var(--color-background);
}

.rarity-s {
  background: linear-gradient(45deg, #FFD700, #FFA500);
}

.rarity-a {
  background: linear-gradient(45deg, #c0c0c0, #a9a9a9);
}

.card-body {
  padding: 1rem;
  text-align: center;
}

.character-name {
  color: var(--color-heading);
  font-size: 1.75rem;
  margin: 0;
  text-transform: uppercase;
}

.character-details {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: var(--color-text);
  opacity: 0.8;
}
</style>
