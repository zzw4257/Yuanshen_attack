import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useCharacterStore = defineStore('characters', () => {
  // --- STATE ---
  const charactersById = ref({});
  const skillsByCharId = ref({}); // New state to store skill data
  const isLoading = ref(false);
  const error = ref(null);

  // --- GETTERS ---
  const characters = computed(() => Object.values(charactersById.value));
  const getCharacterById = (id) => charactersById.value[id];
  const getSkillsByCharId = (id) => skillsByCharId.value[id] || null;

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

  async function fetchSkillData(characterId) {
    if (!characterId || skillsByCharId.value[characterId]) return;

    const charData = getCharacterById(characterId);
    if (!charData) return;

    // This logic is a placeholder. A robust solution would use a stable ID or English name.
    // We'll assume a lowercase name for the path, e.g., 'anby' for '安比'. This will only work for Anby for now.
    const charNameForPath = charData.name === '安比·德玛拉' ? 'anby' : charData.name.toLowerCase();

    try {
      const response = await fetch(`/src/data/plugin_data/${charNameForPath}/data.json`);
      if (!response.ok) {
        console.warn(`No skill data file found for ${charNameForPath}`);
        skillsByCharId.value[characterId] = { skill: {} };
        return;
      }
      const skillData = await response.json();
      skillsByCharId.value[characterId] = skillData;
    } catch (e) {
      console.error(`Failed to fetch skill data for ${characterId}:`, e);
      skillsByCharId.value[characterId] = { skill: {} };
    }
  }

  function addCharacter(character) {
    // Logic to be updated
  }

  return {
    // State
    charactersById,
    skillsByCharId,
    isLoading,
    error,
    // Getters
    characters,
    getCharacterById,
    getSkillsByCharId,
    // Actions
    fetchCharacters,
    fetchSkillData,
    addCharacter,
  };
});
