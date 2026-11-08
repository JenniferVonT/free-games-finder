<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ExitBtn from './exitBtn.vue'
import GameSiteBtn from './GameSiteBtn.vue'
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
const hoveredScreenshot = ref<string | null>(null)

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
    <ExitBtn @close="emit('close')" class="exitBtn"/>
    <h2 id="title">
    {{ game?.title }}
    </h2>

    <div id="gameBtn">
        <GameSiteBtn v-if="game?.game_url" :link="game.game_url" />
    </div>
    

    <div class="images">
        <div 
            class="thumbnail"
            :style="{ backgroundImage: `url(${hoveredScreenshot ?? game?.thumbnail})` }"
        ></div>

        <div class="screenshotContainer">
            <template v-for="(pic, index) in game?.screenshots" :key="pic.id ?? index">
                <div
                    class="screenshot"
                    :style="{ backgroundImage: `url(${pic.image})` }"
                    @mouseenter="hoveredScreenshot = pic.image"
                    @mouseleave="hoveredScreenshot = null"
                ></div>
            </template>
        </div>
    </div>

    <p class="desc">
    {{ game?.description }}
    </p>
    <div id="miscInfo">
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
    <div id="gameRecSys">

    </div>
  </div>
</template>

<style scoped>
.card {
    display: grid;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    grid-template-rows: 1fr 2.5fr 2fr 1fr;
    grid-template-areas:
    "title title title images images images"
    "btn   btn   btn   images images images"
    "desc  desc  desc  desc   rec    rec"
    "misc  misc  misc  misc   rec    rec";
    position: relative;
    flex-direction: column;
    justify-content: space-between;
    container-type: inline-size;
    box-sizing: border-box;
    padding: 30px;
    margin: 10px;
    border-radius: 8px;
    background-color: var(--color-background-soft);
    color: var(--color-text);
    width: 85vw;
    height: 70vh;
    overflow: hidden;
    box-shadow: 10px 10px 8px 4px var(--color-shadow);
}

#title {
    grid-area: title;
}

.exitBtn {
    position: absolute;
    top: 10px;
    right: 10px;
}

#gameBtn {
    grid-area: btn;
}

.images {
    display: flex;
    flex-direction: column;
    position: relative;
    grid-area: images;
    min-width: 0;
    min-height: 0;
    width: 100%;
    height: 100%;
    border: 1px solid var(--color-border);
    background-color: var(--color-background-soft);
    border-radius: 4px;
    overflow: hidden;
}

.thumbnail {
    flex: 4 1 0;
    min-height: 0;
    width: 100%;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
}

.screenshotContainer {
    display: flex;
    flex: 1 1 0;
    flex-direction: row;
    gap: 0;
    padding: 0;
    margin: 0;
    min-width: 0;
    min-height: 0;
    width: 100%;
}

.screenshot {
    flex: 1 1 0;
    min-width: 0;
    min-height: 0;
    margin: 0;
    padding: 0;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
}

.screenshot:hover {
    z-index: 1;
}

.tags {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    min-width: 0;
}

#miscInfo {
    grid-area: misc;
}

#gameRecSys {
    grid-area: rec;
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
    grid-area: desc;
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
</style>
