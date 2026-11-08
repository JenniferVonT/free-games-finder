<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
    search: [query: string]
}>()

const query = ref('')

</script>
<template>
  <div class="searchBar">
    <input v-model="query" placeholder="search" v-on:keyup.enter="emit('search', query)" />
  </div>
</template>

<style scoped>
.searchBar {
    display: flex;
}
</style>
