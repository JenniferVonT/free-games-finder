<script setup lang="ts">
import { computed } from 'vue'
import TagElement from './TagElement.vue'

const props = defineProps<{
  title: string
  description: string
  genre: string
  platform: string
  publisher: string
  thumbnail: string
}>()

// Truncate the description to fit within the card.
const truncatedDescription = computed(() => {
  const maxCharacters = 90

  return props.description.length > maxCharacters
    ? `${props.description.slice(0, maxCharacters)}...`
    : props.description
})
</script>

<template>
  <div class="card" :style="{ backgroundImage: `url(${thumbnail})` }">
    <div class="overlay">
        <h2>
        {{ title }}
        </h2>

        <div class="details">
            <p class="desc">
            {{ truncatedDescription }}
            </p>
            <hr class="divider" />
            <p class="publ">
            <b>Publisher :</b> <span>{{ publisher }}</span>
            </p>
            <div class="tags">
                <TagElement :name="genre" />
                <TagElement :name="platform" />
            </div>
        </div>
    </div>
  </div>
</template>

<style scoped>
.card {
    container-type: inline-size;
    box-sizing: border-box;
    padding: 0px;
    margin: 10px;
    border-radius: 8px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    color: var(--color-text);
    width: 15%;
    height: 30vh;
    overflow: hidden;
}

.overlay {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: rgba(0, 0, 0, 0.7);
    width: 100%;
    height: 100%;
    padding: 7px;
    overflow: hidden;
}

.details {
    min-width: 0;
    overflow: hidden;
}

.tags {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    min-width: 0;
}

.divider {
    border: 0;
    height: 1px;
    background-color: var(--color-divider);
    margin: 5px 0;
}

.publ {
    font-size: clamp(0.75rem, 6cqw, 0.9rem);
    line-height: 1rem;
    margin: 0;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.desc {
    font-size: 0.9rem;
    line-height: 1rem;
    margin: 0;
    overflow-wrap: anywhere;
}

h2 {
    width: 100%;
    font-size: clamp(1rem, 15cqw, 2.5rem);
    line-height: 2rem;
    color: var(--color-heading);
    margin: 0;
    overflow-wrap: anywhere;
}

p {
    margin: 0;
    font-size: 0.9rem;
    color: var(--color-text);
}

b {
    color: var(--color-heading);
    font-weight: 600;
}

@media (max-width: 768px) {
    .card {
        width: 25vw;
        height: 35vh;
    }
}
</style>
