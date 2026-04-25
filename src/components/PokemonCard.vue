<template>
  <div
    class="card"
    :class="[status, { caught: isCaught }]"
    @click="$emit('open', pokemon)"
  >
    <div class="sprite-wrap">
      <img
        v-if="pokemon.status !== 'locked'"
        :src="spriteUrl"
        :alt="pokemon.name"
        loading="lazy"
        @error="onImgError"
      />
      <span v-else class="lock-icon">🔒</span>
    </div>

    <div class="info">
      <span class="num">#{{ String(pokemon.id).padStart(4, '0') }}</span>
      <span class="name">{{ pokemon.name }}</span>
    </div>

    <div class="badges">
      <span class="status-badge">{{ statusLabel }}</span>
      <span v-if="pokemon.method" class="odds-badge">{{ pokemon.method.odds }}</span>
    </div>

    <button
      v-if="pokemon.status !== 'locked'"
      class="catch-btn"
      :class="{ active: isCaught }"
      @click.stop="store.toggleCaught(pokemon.id)"
      :title="isCaught ? 'Mark as not caught' : 'Mark as caught'"
    >
      {{ isCaught ? '✨' : '○' }}
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useTrackerStore } from '../stores/tracker.js'

const props = defineProps({ pokemon: Object })
defineEmits(['open'])

const store = useTrackerStore()

const isCaught = computed(() => store.caught.has(props.pokemon.id))

const status = computed(() => {
  if (props.pokemon.status === 'locked') return 'locked'
  if (props.pokemon.status === 'event') return 'event'
  if (isCaught.value) return 'caught'
  return 'huntable'
})

const statusLabel = computed(() => {
  if (props.pokemon.status === 'locked') return '🔒 Locked'
  if (props.pokemon.status === 'event') return '🎫 Event'
  if (isCaught.value) return '✨ Caught'
  return 'Remaining'
})

const spriteUrl = computed(
  () => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${props.pokemon.id}.png`
)

function onImgError(e) {
  e.target.style.opacity = '0.2'
}
</script>

<style scoped>
.card {
  background: #1e1e2e;
  border: 1px solid #313244;
  border-radius: 10px;
  padding: 0.6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  cursor: pointer;
  transition: border-color 0.15s, transform 0.1s;
  position: relative;
  user-select: none;
}

.card:hover {
  border-color: #cba6f7;
  transform: translateY(-2px);
}

.card.caught {
  border-color: #f9e2af;
  background: #1e1e2e;
}

.card.locked {
  opacity: 0.5;
  cursor: default;
}

.card.locked:hover {
  transform: none;
  border-color: #313244;
}

.card.event {
  border-color: #89b4fa;
}

.sprite-wrap {
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sprite-wrap img {
  width: 64px;
  height: 64px;
  image-rendering: pixelated;
}

.lock-icon {
  font-size: 1.8rem;
}

.info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.1rem;
}

.num {
  font-size: 0.65rem;
  color: #6c7086;
}

.name {
  font-size: 0.8rem;
  color: #cdd6f4;
  text-align: center;
  font-weight: 600;
  line-height: 1.1;
}

.badges {
  display: flex;
  gap: 0.25rem;
  flex-wrap: wrap;
  justify-content: center;
}

.status-badge {
  font-size: 0.6rem;
  padding: 0.1rem 0.35rem;
  border-radius: 4px;
  background: #313244;
  color: #a6adc8;
}

.caught .status-badge {
  background: #f9e2af22;
  color: #f9e2af;
}

.event .status-badge {
  background: #89b4fa22;
  color: #89b4fa;
}

.locked .status-badge {
  background: #31324455;
  color: #6c7086;
}

.odds-badge {
  font-size: 0.6rem;
  padding: 0.1rem 0.35rem;
  border-radius: 4px;
  background: #cba6f722;
  color: #cba6f7;
}

.catch-btn {
  position: absolute;
  top: 0.3rem;
  right: 0.3rem;
  background: none;
  border: none;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  opacity: 0.4;
  transition: opacity 0.15s;
}

.catch-btn:hover,
.catch-btn.active {
  opacity: 1;
}
</style>
