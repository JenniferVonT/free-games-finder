<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ExitBtn from './exitBtn.vue'
import TagElement from './TagElement.vue'
import { fetchFreeGameById, type GameVerbose, type Game } from '../utils/games'

const props = defineProps<{
  id: Game['id']
}>()

const emit = defineEmits<{
  close: []
}>()

const game = ref<GameVerbose>()
const errorMessage = ref<string | null>(null)

onMounted(async () => {
  try {
    game.value = await fetchFreeGameById(props.id)
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Unable to load game.'
  }
})

</script>

<template>
  <div class="card">
    <ExitBtn @close="emit('close')" />
    <h2>
    {{ game?.title }}
    </h2>

    <div class="details">
        <p class="desc">
        {{ game?.description }}
        </p>
        <hr class="divider" />
        <p class="publ">
        <b>Publisher :</b> <span>{{ game?.publisher }}</span>
        </p>
        <div class="tags">
            <template v-if="game?.genre">
                <TagElement :name="game?.genre" />
            </template>
            <template v-if="game?.platform">
                <TagElement :name="game?.platform" />
            </template>
        </div>
    </div>
  </div>
</template>

<style scoped>
.card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    container-type: inline-size;
    box-sizing: border-box;
    padding: 20px;
    margin: 10px;
    border-radius: 8px;
    background-color: var(--color-background-soft);
    color: var(--color-text);
    width: 85vw;
    height: 70vh;
    overflow: hidden;
    box-shadow: 10px 10px 8px 4px var(--color-shadow);
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
