<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import GameCard from '../components/GameCard.vue'
import VerboseGameCard from '../components/VerboseGameCard.vue'
import { fetchFreeGames, searchGame, type Game } from '../utils/games'

const route = useRoute()
const games = ref<Game[]>([])
const showID = ref<Game['id'] | null>(null)
const errorMessage = ref<string | null>(null)

watch(
  () => route.query.search,
  async (query) => {
    const searchQuery = Array.isArray(query) ? query[0] : query
    games.value = await searchGame(searchQuery ?? '')
  },
  { immediate: true },
)

const toggleGameClick = (id?: Game['id']) => {
  if (id === undefined) {
    showID.value = null
    return
  }

  showID.value = showID.value === id ? null : id
}

onMounted(async () => {
  try {
    games.value = await fetchFreeGames()
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Unable to load games.'
  }
})
</script>

<template>
  <main>
    <div v-if="showID !== null" id="verboseCardContainer">
      <VerboseGameCard
        class="verboseCard"
        :id="showID"
        @close="toggleGameClick()"
      />
    </div>

    <template v-for="game in games" :key="game.id">
      <GameCard 
        :id="game.id"
        :thumbnail=game.thumbnail
        :title="game.title ?? ''" 
        :description="game.short_description" 
        :genre="game.genre" 
        :platform="game.platform" 
        :publisher="game.publisher"

        @click="toggleGameClick(game.id)"
      />
    </template>
  </main>

</template>

<style scoped>
main {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
}

#verboseCardContainer {
  display: flex;
  position: fixed;
  inset: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: var(--color-background-transparent);
  justify-content: center;
  align-items: center;
}
</style>