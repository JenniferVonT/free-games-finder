<script setup lang="ts">
import { computed } from 'vue'
import Tag from './Tag.vue'

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
            <b>Publisher :</b> {{ publisher }}
            </p>
            <div class="tags">
                <Tag :name="genre" />
                <Tag :name="platform" />
            </div>
        </div>
    </div>
  </div>
</template>

<style scoped>
.card {
    box-sizing: border-box;
    padding: 0px;
    margin: 10px;
    border-radius: 8px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    color: var(--color-text);
    width: 10vw;
    height: 30vh;
    overflow: hidden;
}

.overlay {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    background-color: rgba(0, 0, 0, 0.7);
    width: 100%;
    height: 100%;
    padding: 5px;
    overflow: hidden;
}

.details {
    min-width: 0;
    overflow: hidden;
}

.tags {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    min-width: 0;
}

.divider {
    border: 0;
    height: 1px;
    background-color: var(--color-divider);
    margin: 5px 0;
}

.publ {
    font-size: 0.8rem;
    line-height: 1rem;
    margin: 0;
    overflow-wrap: anywhere;
}

.desc {
    font-size: 0.9rem;
    line-height: 1rem;
    margin: 0;
    overflow-wrap: anywhere;
}

h2 {
    width: 100%;
    font-size: 1.5rem;
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
</style>
