<script setup lang="ts">
import ExitIcon from './icons/IconExit.vue'

const emit = defineEmits<{
    close: []
}>()

</script>

<template>
    <div @click="emit('close')">
        <ExitIcon />
    </div>
</template>

<style scoped>
    div {
        display:flex;
        justify-content: center;
        align-items: center;
        width: min-content;
        height: min-content;
        border-radius: 4px;
        cursor: pointer;
        border: 1px solid var(--color-border);
        color: var(--color-border);
    }
</style>
