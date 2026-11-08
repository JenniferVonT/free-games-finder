<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import GameCard from '../components/GameCard.vue'
import VerboseGameCard from '../components/VerboseGameCard.vue'
import FilterSelector from '../components/FilterSelector.vue'
import { fetchFreeGames, searchGame, fetchGamesByFilter, type Game, Platforms, Sorts } from '../utils/games'
import { GenreTypes } from '../utils/genreTypes.ts'

const route = useRoute()
const router = useRouter()
const games = ref<Game[]>([])
const showID = ref<Game['id'] | null>(null)
const showFilter = ref<boolean>(false)
const errorMessage = ref<string | null>(null)

watch(
  () => route.query.search,
  async (query) => {
    const searchQuery = Array.isArray(query) ? query[0] : query
    games.value = await searchGame(searchQuery ?? '')
  },
  { immediate: true },
)

watch(
  () => route.query.filter,
  (filter) => {
    showFilter.value = filter === 'true'
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

const closeFilter = () => {
  const query = { ...route.query }
  delete query.filter
  router.push({ name: 'home', query })
}

const applyFilter = async (genre: GenreTypes | null, platform: Platforms | null, sort: Sorts | null) => {
  if (genre === null && platform === null && sort === null) return

  closeFilter()

  games.value = await fetchGamesByFilter({genre, platform, sort})
}

const loadAllGames = async () => {
  try {
    games.value = await fetchFreeGames()
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Unable to load games.'
  }
}

const resetGames = () => {
  void loadAllGames()
}

onMounted(async () => {
  window.addEventListener('show-all-games', resetGames)
  await loadAllGames()
})

onUnmounted(() => {
  window.removeEventListener('show-all-games', resetGames)
})
</script>

<template>
  <main>
    <div v-if="showFilter" id="filterContainer">
      <FilterSelector
        @filter="applyFilter"
        @close="closeFilter"
      />
    </div>

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
  padding:0;
}

#verboseCardContainer,
#filterContainer {
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