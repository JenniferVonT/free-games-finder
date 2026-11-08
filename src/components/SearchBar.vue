<script setup lang="ts">

const emit = defineEmits<{
    search: []
}>()
</script>
<template>
  <div class="searchBar" @click="emit('search')">
    <p>
    SEARCH *IMPLEMENT*
    </p>
  </div>
</template>

<style scoped>
.searchBar {
    display: flex;
}
</style>
