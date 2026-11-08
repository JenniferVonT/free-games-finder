<script setup lang="ts">
import FilterIcon from './icons/IconFilter.vue'
import SearchBar from './SearchBar.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function handleSearch(query: string) {
  const trimmedQuery = query.trim()

  if (trimmedQuery) {
    router.push({ name: 'home', query: { search: trimmedQuery } })
  }
}

function openFilter() {
  router.push({
    name: 'home',
    query: { ...router.currentRoute.value.query, filter: 'true' },
  })
}

function showAll() {
  const query = router.currentRoute.value.query

  if (query.search) {
    router.push({ name: 'home', query: {} })
    return
  }

  router.push({ name: 'home', query: {} })
  window.dispatchEvent(new Event('show-all-games'))
}
</script>


<template>
  <nav class="navbar" aria-label="Main navigation">
    <div>
      <h1 class="brand" to="/">Free Games Finder</h1>

      <div class="links">
        <div id="filter" @click="openFilter">Filter <FilterIcon /></div>
        <div id="showAll" @click="showAll">Show all</div>
      </div>
    </div>

    <div>
      <SearchBar @search="handleSearch" />
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  align-items: center;
  background-color: var(--color-background);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
}

#filter,
#showAll {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  cursor: pointer;
}

.brand {
  color: var(--color-heading);
  font-size: 1.2rem;
  font-weight: 700;
}

.links {
  display: flex;
  gap: 1.5rem;
}

.links a {
  color: var(--color-text);
  font-weight: 600;
}

a {
  text-decoration: none;
}

@media (max-width: 600px) {
  .navbar {
    align-items: flex-start;
    flex-direction: column;
    gap: 0.75rem;
    padding: 1rem;
  }
}
</style>
