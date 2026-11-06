<script setup lang="ts">
defineProps<{
  name: string
}>()
</script>

<template>
  <div class="tag">
    <p>
    {{ name }}
    </p>
  </div>
</template>

<style scoped>
.tag {
    display: inline-block;
    padding: 0.2rem 0.5rem;
    margin: 3px;
    border: 1px solid var(--color-border);
    border-radius: 25px;
    background-color: var(--color-accent);
    color: var(--color-text);
}

p {
    margin: 0;
    font-size: 0.7rem;
}
</style>
