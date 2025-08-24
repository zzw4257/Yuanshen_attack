import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCharacterStore = defineStore('characters', () => {
  // --- STATE ---
  const characters = ref([]);
  const isLoading = ref(false);
  const error = ref(null);

  // --- ACTIONS ---
  async function fetchCharacters() {
    isLoading.value = true;
    error.value = null;
    try {
      // The backend server runs on port 8000 by default with uvicorn
      const response = await fetch('http://localhost:8000/api/characters');
      if (!response.ok) {
        throw new Error('Failed to fetch characters');
      }
      characters.value = await response.json();
    } catch (e) {
      error.value = e.message;
      console.error(e);
    } finally {
      isLoading.value = false;
    }
  }

  // Action to add a character to the local state after successful POST
  // This avoids a re-fetch, providing a more responsive UI
  function addCharacter(character) {
    characters.value.push(character);
  }

  return {
    // State
    characters,
    isLoading,
    error,
    // Actions
    fetchCharacters,
    addCharacter,
  };
});
