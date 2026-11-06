<script setup lang="ts">
import GameCard from '../components/GameCard.vue'
</script>

<template>
  <main>
    <GameCard 
      id="540"
      thumbnail="https://www.freetogame.com/g/540/thumbnail.jpg"
      title="Overwatch" 
      description="A hero-focused first-person team shooter from Blizzard Entertainment. A hero-focused first-person team shooter from Blizzard Entertainment. A hero-focused first-person team shooter from Blizzard Entertainment." 
      genre="Shooter" 
      platform="Windows" 
      publisher="Activision Blizzard"
    />

    <GameCard 
      id="620"
      thumbnail="https://www.freetogame.com/g/620/thumbnail.jpg"
      title="Hero Wars: Dominion Era" 
      description="A free-to-play fantasy MMORPG where players assemble teams of heroes to battle against powerful enemies." 
      genre="MMORPG" 
      platform="Web Browser" 
      publisher="Nexters"
    />
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: row;
}
</style>