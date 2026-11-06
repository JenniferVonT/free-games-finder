<script setup lang="ts">
import { onMounted, ref } from 'vue'
import GameCard from '../components/GameCard.vue'
import { fetchFreeGames, type Game } from '../utils/games'

const games = ref<Game[]>([])
const errorMessage = ref<string | null>(null)

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
    <p v-if="errorMessage">{{ errorMessage }}</p>

    <template v-for="game in games" :key="game.id">
      <GameCard 
        :id="game.id"
        :thumbnail="game.thumbnail"
        :title="game.title ?? ''" 
        :description="game.short_description" 
        :genre="game.genre" 
        :platform="game.platform" 
        :publisher="game.publisher"
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
</style>