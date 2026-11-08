<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
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
const isDescriptionExpanded = ref(false)
const descriptionLimit = 500

const descriptionText = computed(() => game.value?.description ?? '')
const truncatedDescription = computed(() => {
  if (descriptionText.value.length <= descriptionLimit) {
    return descriptionText.value
  }

  return `${descriptionText.value.slice(0, descriptionLimit)}...`
})

onMounted(async () => {
  try {
    game.value = await fetchFreeGameById(props.id)
    } catch {
    errorMessage.value = 'Unable to load game.'
  }
})

const platformTags = computed(() => {
  if (!game.value?.platform) {
    return []
  }

  return game.value.platform
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean)
})

</script>

<template>
  <div class="card">
    <ExitBtn @close="emit('close')" class="exitBtn"/>
    <h2 v-if="errorMessage" class="error-message">{{ errorMessage }}</h2>

    <template v-else>
        <div id="title">
        <h2>
            {{ game?.title }}
        </h2>
        <p>Released {{ game?.release_date }}</p>
        </div>

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

      <div class="descriptionContainer">
        <p class="desc">
          {{ isDescriptionExpanded ? descriptionText : truncatedDescription }}
        </p>
        <button
          v-if="descriptionText.length > descriptionLimit"
          class="read-more"
          type="button"
          @click="isDescriptionExpanded = !isDescriptionExpanded"
        >
          {{ isDescriptionExpanded ? 'Read less' : 'Read more' }}
        </button>
      </div>
      <div id="miscInfo">
        <div class="publ">
            <p><b>Publisher:</b> {{ game?.publisher }}</p>
            <p><b>Developer:</b> {{ game?.developer }}</p>
        </div>
        <div class="tags">
            <template v-if="game?.genre">
                <TagElement :name="game?.genre" />
            </template>
            <template v-for="tag in platformTags" :key="tag">
                <TagElement :name="tag" />
            </template>
        </div>
      </div>

      <template v-if="game?.minimum_system_requirements">
        <div id="gameRecSys">
            <h3>Minimum system requirements</h3>
            <div id="sysRecData">
                <p><b>os: </b> {{ game?.minimum_system_requirements?.os }}</p>
                <p><b>processor: </b> {{ game?.minimum_system_requirements?.processor }}</p>
                <p><b>memory: </b> {{ game?.minimum_system_requirements?.memory }}</p>
                <p><b>graphics: </b> {{ game?.minimum_system_requirements?.graphics }}</p>
                <p><b>storage: </b> {{ game?.minimum_system_requirements?.storage }}</p>
            </div>
        </div>
      </template>
    </template>
  </div>
</template>

<style scoped>
.card {
    display: grid;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    grid-template-rows: 1fr 3fr 2fr 1fr;
    grid-template-areas:
    "title title images images images images"
    "btn   btn   images images images images"
    "desc  desc  desc   desc   rec    rec"
    "misc  misc  misc   misc   rec    rec";
    position: relative;
    flex-direction: column;
    justify-content: space-between;
    container-type: inline-size;
    box-sizing: border-box;
    padding: 30px;
    margin: 10px;
    border-radius: var(--vt-c-border-radius);
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

.error-message {
    grid-area: 1 / 1 / -1 / -1;
    align-self: center;
    justify-self: center;
    color: var(--color-heading);
    text-align: center;
}

#gameBtn {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 30px;
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
    background-color: var(--color-background);
    border-radius: var(--vt-c-border-radius);
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
    border: 2px solid var(--color-background)
}

.screenshot:hover {
    z-index: 1;
}

.tags {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    min-width: 0;
    margin-top: 20px;
}

#miscInfo {
    grid-area: misc;
}

#gameRecSys {
    grid-area: rec;
    margin: 10px;
    padding: 5px;
    border-radius: var(--vt-c-border-radius);
    border: 1px solid var(--color-border)
}

#sysRecData {
    display: flex;
    flex-direction: column;
    flex-wrap: no-wrap;
}

.publ {
    display: flex;
    flex-direction: column;
    font-size: clamp(0.75rem, 6cqw, 0.9rem);
    line-height: 1rem;
    margin: 0;
    min-width: 0;
    overflow: hidden;
    white-space: nowrap;
}

.desc {
    width: 100%;
    grid-area: desc;
    font-size: 0.9rem;
    line-height: 1rem;
    margin: 0;
    overflow-wrap: anywhere;
}

.descriptionContainer {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    grid-area: desc;
    min-width: 0;
    min-height: 0;
    height: 100%;
    padding-top: 10px;
    padding-bottom: 10px;
}

.descriptionContainer .desc {
    max-height: 100%;
    overflow-y: auto;
}

.read-more {
    padding: 0;
    border: 0;
    background: none;
    color: var(--color-accent);
    cursor: pointer;
    font: inherit;
    text-decoration: underline;
}

h3 {
    width: 100%;
    font-size: clamp(0.5rem, 3cqw, 1.15rem);
    line-height: 1.15rem;
    color: var(--color-heading);
    margin: 0;
    overflow-wrap: anywhere; 
    margin-bottom: 5px;
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
