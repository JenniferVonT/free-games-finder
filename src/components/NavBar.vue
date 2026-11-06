<template>
  <nav class="navbar" aria-label="Main navigation">
    <RouterLink class="brand" to="/">Free Games Finder</RouterLink>

    <div class="links">
      <RouterLink to="/">Home</RouterLink>
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

.links a.router-link-exact-active {
  color: hsla(160, 100%, 37%, 1);
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
