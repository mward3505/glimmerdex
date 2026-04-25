<template>
  <div class="filter-bar">
    <select v-model="store.filterGen" @change="store.resetPage()">
      <option value="all">All Gens</option>
      <option v-for="g in 9" :key="g" :value="g">Gen {{ g }}</option>
    </select>

    <select v-model="store.filterGame" @change="store.resetPage()">
      <option value="all">All Games</option>
      <option value="pla">Legends: Arceus</option>
      <option value="lgp">Let's Go Pikachu</option>
      <option value="lza">Legends: Z-A</option>
      <option value="bdsp">BDSP</option>
      <option value="ss">Sword/Shield</option>
      <option value="sv">Scarlet/Violet</option>
    </select>

    <select v-model="store.filterMethod" @change="store.resetPage()">
      <option value="all">All Methods</option>
      <option value="dynamax">Dynamax Adventures</option>
      <option value="mass-outbreak-pla">Mass Outbreak (PLA)</option>
      <option value="poke-radar">PokeRadar (BDSP)</option>
      <option value="catch-combo">Catch Combo (LGP)</option>
      <option value="fast-travel-lza">Fast Travel (LZA)</option>
      <option value="mass-outbreak-sv">Mass Outbreak (SV)</option>
      <option value="masuda">Masuda Method</option>
      <option value="soft-reset">Soft Reset (BDSP/SS)</option>
      <option value="soft-reset-ss">Soft Reset (SS)</option>
      <option value="soft-reset-bdsp">Soft Reset (BDSP)</option>
    </select>

    <select v-model="store.filterStatus" @change="store.resetPage()">
      <option value="all">All Status</option>
      <option value="huntable">Huntable</option>
      <option value="caught">Caught ✨</option>
      <option value="uncaught">Remaining</option>
      <option value="event">Event Only 🎫</option>
      <option value="locked">Locked 🔒</option>
    </select>

    <button class="reset-btn" @click="resetFilters">Reset</button>
  </div>
</template>

<script setup>
import { useTrackerStore } from '../stores/tracker.js'

const store = useTrackerStore()

function resetFilters() {
  store.filterGen = 'all'
  store.filterGame = 'all'
  store.filterMethod = 'all'
  store.filterStatus = 'all'
  store.resetPage()
}
</script>

<style scoped>
.filter-bar {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  align-items: center;
}

select {
  background: #1e1e2e;
  color: #cdd6f4;
  border: 1px solid #45475a;
  border-radius: 6px;
  padding: 0.4rem 0.6rem;
  font-size: 0.85rem;
  cursor: pointer;
}

select:focus {
  outline: none;
  border-color: #cba6f7;
}

.reset-btn {
  background: #313244;
  color: #cdd6f4;
  border: 1px solid #45475a;
  border-radius: 6px;
  padding: 0.4rem 0.8rem;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background 0.15s;
}

.reset-btn:hover {
  background: #45475a;
}
</style>
