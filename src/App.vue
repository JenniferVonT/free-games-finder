<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './components/NavBar.vue'
import FooterBar from './components/FooterBar.vue'
</script>

<template>
  <Navbar />
  <main>
    <RouterView />
  </main>
  <FooterBar />
</template>
