import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

// The character store will now hold the single, authoritative source of truth for all character data.
// No more separate skill data fetching.

export const useCharacterStore = defineStore('characters', () => {
  // --- STATE ---
  const charactersById = ref({});
  const isLoading = ref(false);
  const error = ref(null);

  // --- GETTERS ---
  const characters = computed(() => Object.values(charactersById.value));
  const getCharacterById = (id) => charactersById.value[id];

  // --- ACTIONS ---
  async function fetchCharacters() {
    if (Object.keys(charactersById.value).length > 0) return;

    isLoading.value = true;
    error.value = null;
    try {
      const response = await fetch('http://localhost:8000/api/characters');
      if (!response.ok) {
        throw new Error('Failed to fetch characters');
      }
      charactersById.value = await response.json();
    } catch (e) {
      error.value = e.message;
      console.error(e);
    } finally {
      isLoading.value = false;
    }
  }

  // The addCharacter logic is now significantly more complex and would require
  // a dedicated form and validation. Disabling for now.
  function addCharacter(character) {
    // charactersById.value[character.id] = character;
  }

  return {
    charactersById,
    isLoading,
    error,
    characters,
    getCharacterById,
    fetchCharacters,
    addCharacter,
  };
});
