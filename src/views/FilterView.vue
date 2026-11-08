<script setup lang="ts">
import { onMounted } from 'vue'
import { fetchGamesByFilter, Platforms, Sorts } from '../utils/games.ts'
import { GenreTypes } from '../utils/genresTypes.ts'

let games = null

onMounted(async () => {
  try {
    games = await fetchGamesByFilter({ genre: GenreTypes.anime, platform: Platforms.windows, sort: Sorts.alphabetically })
    console.log(games)
  } catch {
    console.error('unable to fetch query')
  }
})

</script>

<template>
    <main>
        <p>TEST</p>
    </main>
</template>

<style scoped></style>