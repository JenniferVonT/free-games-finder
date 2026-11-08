<script setup lang="ts">
import { ref } from 'vue'
import SearchIcon from './icons/IconSearch.vue'

const emit = defineEmits<{
    search: [query: string]
}>()

const query = ref('')

</script>
<template>
  <div class="searchBar">
    <input v-model="query" placeholder="Search..." v-on:keyup.enter="emit('search', query)" />
    <SearchIcon />
  </div>
</template>

<style scoped>
.searchBar {
    display: flex;
    color: var(--color-accent);
    background-color: var(--color-background-input);
    padding: 5px 10px;
    border-radius: 25px;
}
input {
  border: none;
  outline: none;
  color: var(--color-text);
  background-color: transparent;
}

input::placeholder {
  color: var(--color-text);
}

input:focus {
  outline: none;
  box-shadow: none;
}
</style>
