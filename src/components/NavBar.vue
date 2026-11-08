<script setup lang="ts">
import FilterIcon from './icons/IconFilter.vue'
import SearchBar from './SearchBar.vue'
</script>


<template>
  <nav class="navbar" aria-label="Main navigation">
    <div>
      <h1 class="brand" to="/">Free Games Finder</h1>

      <div class="links">
        <RouterLink id="filter" to="/filter">Filter <FilterIcon /></RouterLink>
        <RouterLink to="/">Show all</RouterLink>
      </div>
    </div>

    <div>
      <SearchBar @search="console.log('search')"/>
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

#filter {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
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
