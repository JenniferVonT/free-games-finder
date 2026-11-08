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
    box-sizing: border-box;
    display: inline-block;
    max-width: 100%;
    padding: 1px 6px;
    margin: 3px;
    border: 1px solid var(--color-border);
    border-radius: 25px;
    background-color: var(--color-accent);
    color: var(--color-heading);
}

p {
    margin: 0;
    font-size: 0.7rem;
    font-size: clamp(0.5rem, 6cqw, 0.8rem);
    line-height: 1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
