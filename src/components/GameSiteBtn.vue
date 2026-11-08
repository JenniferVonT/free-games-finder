<script setup lang="ts">

defineProps<{
  link: string
}>()
</script>

<template>
    <a :href="link" target="_blank">
        <h2>Get Game</h2>
    </a>
</template>

<style scoped>
    h2 {
        color: var(--color-heading);
        font-size: 1.5rem;
    }

    a {
        display:flex;
        justify-content: center;
        align-items: center;
        width: max-content;
        height: max-content;
        border-radius: 4px;
        padding: 0px 15px;
        cursor: pointer;
        background: var(--color-accent);
        box-shadow: 2px 2px 5px 2px var(--color-shadow);
        color: var(--color-text);
    }

    a:hover {
       background: var(--color-accent-hover); 
    }
</style>
