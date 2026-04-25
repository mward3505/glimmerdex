import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { POKEMON } from '../data/pokemon.js'

export const useTrackerStore = defineStore('tracker', () => {
  const caught = ref(loadCaught())
  const filterGen = ref('all')
  const filterStatus = ref('all')
  const filterMethod = ref('all')
  const filterGame = ref('all')
  const page = ref(1)
  const PAGE_SIZE = 60

  function loadCaught() {
    try {
      return new Set(JSON.parse(localStorage.getItem('sparkledex-caught') || '[]'))
    } catch {
      return new Set()
    }
  }

  function saveCaught() {
    localStorage.setItem('sparkledex-caught', JSON.stringify([...caught.value]))
  }

  function toggleCaught(id) {
    if (caught.value.has(id)) {
      caught.value.delete(id)
    } else {
      caught.value.add(id)
    }
    saveCaught()
  }

  const filtered = computed(() => {
    return POKEMON.filter(p => {
      if (filterGen.value !== 'all' && p.gen !== Number(filterGen.value)) return false

      if (filterStatus.value === 'caught' && !caught.value.has(p.id)) return false
      if (filterStatus.value === 'uncaught' && (caught.value.has(p.id) || p.status !== 'huntable')) return false
      if (filterStatus.value === 'locked' && p.status !== 'locked') return false
      if (filterStatus.value === 'event' && p.status !== 'event') return false
      if (filterStatus.value === 'huntable' && p.status !== 'huntable') return false

      if (filterMethod.value !== 'all') {
        const hasMethod = p.methods.some(m => m.id === filterMethod.value)
        if (!hasMethod) return false
      }

      if (filterGame.value !== 'all') {
        if (!p.games.includes(filterGame.value)) return false
      }

      return true
    })
  })

  const totalPages = computed(() => Math.max(1, Math.ceil(filtered.value.length / PAGE_SIZE)))

  const paginated = computed(() => {
    const start = (page.value - 1) * PAGE_SIZE
    return filtered.value.slice(start, start + PAGE_SIZE)
  })

  const huntable = computed(() => POKEMON.filter(p => p.status === 'huntable'))
  const caughtHuntable = computed(() => huntable.value.filter(p => caught.value.has(p.id)))

  function setPage(n) {
    page.value = Math.max(1, Math.min(n, totalPages.value))
  }

  function resetPage() {
    page.value = 1
  }

  return {
    caught,
    filterGen,
    filterStatus,
    filterMethod,
    filterGame,
    page,
    PAGE_SIZE,
    filtered,
    paginated,
    totalPages,
    huntable,
    caughtHuntable,
    toggleCaught,
    setPage,
    resetPage,
  }
})
