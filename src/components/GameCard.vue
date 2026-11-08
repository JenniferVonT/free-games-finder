<script setup lang="ts">
import { computed } from 'vue'
import TagElement from './TagElement.vue'

const props = defineProps<{
  title: string
  description: string | null
  genre: string | null
  platform: string | null
  publisher: string | null
  thumbnail: string | null
}>()

// Truncate the description to fit within the card.
const truncatedDescription = computed(() => {
  const maxCharacters = 90

  if (!props.description) {
    return ''
  }

  return props.description.length > maxCharacters
    ? `${props.description.slice(0, maxCharacters)}...`
    : props.description
})

const platformTags = computed(() => {
  if (!props.platform) {
    return []
  }

  return props.platform
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean)
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
                <template v-if="genre">
                    <TagElement :name="genre" />
                </template>
                <template v-for="tag in platformTags" :key="tag">
                    <TagElement :name="tag" />
                </template>
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
    border-radius: var(--vt-c-border-radius);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-color: var(--color-accent);
    color: var(--color-text);
    width: 15%;
    flex: 0 0 15%;
    height: 30vh;
    overflow: hidden;
    box-shadow: 10px 10px 8px 4px var(--color-shadow);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

@media (hover: hover) {
    .card:hover {
        transform: translateY(-8px);
        box-shadow: 10px 18px 14px 4px var(--color-shadow);
        border: 0.2px solid var(--color-accent);
    }
}

.overlay {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: var(--color-overlay);
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
    font-size: clamp(0.8rem, 15cqw, 1.75rem);
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
        flex-basis: 25vw;
        height: 35vh;
    }
}
</style>
