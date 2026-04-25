<template>
  <div class="app">
    <header>
      <div class="header-left">
        <h1>✨ Sparkledex</h1>
        <span class="subtitle">Shiny Dex Tracker</span>
      </div>
      <div class="header-right">
        <button class="sandwich-btn" @click="showSandwich = true">🥪 Sandwich Guide</button>
      </div>
    </header>

    <div class="progress-bar-wrap">
      <div class="progress-labels">
        <span>{{ store.caughtHuntable.length }} / {{ store.huntable.length }} huntable shinies caught</span>
        <span class="pct">{{ progressPct }}%</span>
      </div>
      <div class="progress-track">
        <div class="progress-fill" :style="{ width: progressPct + '%' }" />
      </div>
    </div>

    <div class="controls">
      <FilterBar />
      <span class="result-count">{{ store.filtered.length }} Pokémon</span>
    </div>

    <div class="grid">
      <PokemonCard
        v-for="p in store.paginated"
        :key="p.id"
        :pokemon="p"
        @open="openModal"
      />
      <div v-if="store.paginated.length === 0" class="empty">
        No Pokémon match the current filters.
      </div>
    </div>

    <div v-if="store.totalPages > 1" class="pagination">
      <button :disabled="store.page === 1" @click="store.setPage(store.page - 1)">← Prev</button>
      <span>Page {{ store.page }} of {{ store.totalPages }}</span>
      <button :disabled="store.page === store.totalPages" @click="store.setPage(store.page + 1)">Next →</button>
    </div>

    <PokemonModal v-if="selectedPokemon" :pokemon="selectedPokemon" @close="selectedPokemon = null" />
    <SandwichModal v-if="showSandwich" @close="showSandwich = false" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useTrackerStore } from './stores/tracker.js'
import FilterBar from './components/FilterBar.vue'
import PokemonCard from './components/PokemonCard.vue'
import PokemonModal from './components/PokemonModal.vue'
import SandwichModal from './components/SandwichModal.vue'

const store = useTrackerStore()
const selectedPokemon = ref(null)
const showSandwich = ref(false)

const progressPct = computed(() => {
  if (!store.huntable.length) return 0
  return Math.round((store.caughtHuntable.length / store.huntable.length) * 100)
})

function openModal(pokemon) {
  selectedPokemon.value = pokemon
}
</script>

<style>
*, *::before, *::after { box-sizing: border-box; }

body {
  margin: 0;
  background: #11111b;
  color: #cdd6f4;
  font-family: system-ui, -apple-system, sans-serif;
  min-height: 100vh;
}

.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.header-left {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
}

h1 {
  margin: 0;
  font-size: 1.6rem;
  color: #cba6f7;
}

.subtitle {
  color: #6c7086;
  font-size: 0.85rem;
}

.sandwich-btn {
  background: #313244;
  color: #cdd6f4;
  border: 1px solid #45475a;
  border-radius: 8px;
  padding: 0.4rem 0.9rem;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background 0.15s;
}

.sandwich-btn:hover { background: #45475a; }

.progress-bar-wrap {
  margin-bottom: 1rem;
}

.progress-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.82rem;
  color: #a6adc8;
  margin-bottom: 0.3rem;
}

.pct { color: #a6e3a1; font-weight: 600; }

.progress-track {
  height: 8px;
  background: #313244;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #cba6f7, #a6e3a1);
  border-radius: 4px;
  transition: width 0.4s ease;
}

.controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.result-count {
  font-size: 0.8rem;
  color: #6c7086;
  white-space: nowrap;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
  gap: 0.6rem;
}

.empty {
  grid-column: 1 / -1;
  text-align: center;
  color: #6c7086;
  padding: 3rem;
  font-size: 0.9rem;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;
  font-size: 0.88rem;
  color: #a6adc8;
}

.pagination button {
  background: #313244;
  color: #cdd6f4;
  border: 1px solid #45475a;
  border-radius: 6px;
  padding: 0.4rem 0.8rem;
  cursor: pointer;
  transition: background 0.15s;
}

.pagination button:hover:not(:disabled) { background: #45475a; }
.pagination button:disabled { opacity: 0.35; cursor: default; }
</style>
