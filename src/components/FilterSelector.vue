<script setup lang="ts">
import { ref, watch } from 'vue'
import { Platforms, Sorts } from '../utils/games.ts'
import { GenreTypes } from '../utils/genreTypes.ts'
import GenreIcon from './icons/IconGenre.vue'
import PlatformIcon from './icons/IconPlatform.vue'
import SortIcon from './icons/IconSort.vue'
import ExitBtn from './exitBtn.vue'

const emit = defineEmits<{
  filter: [genre: GenreTypes | null, platform: Platforms | null, sort: Sorts | null]
  close: []
}>()

const genre = ref<GenreTypes | null>(null)
const platform = ref<Platforms | null>(null)
const sort = ref<Sorts | null>(null)

const errorMessage = ref<string | null>(null)

const resetFilter = () => {
    genre.value = null
    platform.value = null
    sort.value = null
    removeError()
}

const removeError = () => {
    errorMessage.value = null
}

watch([genre, platform, sort], ([selectedGenre, selectedPlatform, selectedSort]) => {
    if (selectedGenre || selectedPlatform || selectedSort) {
        removeError()
    }
})

const submitFilter = () => {
    if (genre.value || platform.value || sort.value ) {
       emit('filter', genre.value, platform.value, sort.value) 
    } else {
        errorMessage.value = 'No filter set'
    }
    
}

</script>
<template>
  <div class="filterContainer">
    <h2>Filter</h2>
    <ExitBtn @close="emit('close')" class="exitBtn"/>
    <label>
      <PlatformIcon />
      <select v-model="platform">
        <option :value="null">Platform</option>
        <option v-for="option in Object.values(Platforms)" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
    </label>
    <label>
      <GenreIcon />
      <select v-model="genre">
        <option :value="null">Genre</option>
        <option v-for="option in Object.values(GenreTypes)" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
    </label>
    <label>
      <SortIcon />
      <select v-model="sort">
        <option :value="null">Sort by</option>
        <option v-for="option in Object.values(Sorts)" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
    </label>

    <p v-if="errorMessage" id="warning">
        {{ errorMessage }}
    </p>
    <div id="btns">
        <button id="resetBtn" @click="resetFilter">Reset filter</button>
        <button @click="submitFilter">Apply filter</button>
    </div>
  </div>
</template>

<style scoped>
.filterContainer {
    display: flex;
    gap: 1rem;
    height: 40vh;
    width: 30vw;
    background-color: var(--color-background-soft);
    flex-direction: column;
    position: relative;
    border-radius: var(--vt-c-border-radius);
    padding: 30px;
    padding-top: 15px;
}

.exitBtn {
    position: absolute;
    top: 10px;
    right: 10px;
}

#btns {
    position: absolute;
    bottom: 30px;
    width: 100%;
}

button {
    padding: 8px;
}

#resetBtn {
    background-color: var(--color-background);
}

#resetBtn:hover {
    background-color: var(--color-border-hover);
}

label {
  align-items: center;
  display: flex;
  gap: 0.35rem;
}

select {
  border: none;
  color: var(--color-text);
  background-color: var(--color-background-input);
  padding: 5px 10px;
  border-radius: 25px;
}

select:focus {
  outline: none;
}

#warning {
    color: var(--color-text-warning);
    font-weight: 200;
}
</style>