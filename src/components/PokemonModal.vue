<template>
  <Teleport to="body">
    <div v-if="pokemon" class="overlay" @click.self="$emit('close')">
      <div class="modal">
        <button class="close" @click="$emit('close')">✕</button>

        <div class="header">
          <img
            v-if="pokemon.status !== 'locked'"
            :src="spriteUrl"
            :alt="pokemon.name"
            class="sprite"
            @error="e => e.target.style.opacity = '0.1'"
          />
          <span v-else class="lock-big">🔒</span>

          <div class="title-block">
            <span class="dex-num">#{{ String(pokemon.id).padStart(4, '0') }}</span>
            <h2>{{ pokemon.name }}</h2>
            <span class="gen-tag">Gen {{ pokemon.gen }}</span>
          </div>

          <div class="status-block">
            <span class="big-status" :class="pokemon.status">{{ bigStatusLabel }}</span>
            <button
              v-if="pokemon.status !== 'locked'"
              class="catch-toggle"
              :class="{ caught: isCaught }"
              @click="store.toggleCaught(pokemon.id)"
            >
              {{ isCaught ? '✨ Mark Uncaught' : '○ Mark Caught' }}
            </button>
          </div>
        </div>

        <div v-if="pokemon.status === 'locked'" class="locked-msg">
          <p>{{ pokemon.notes || 'This Pokémon is shiny locked and cannot be obtained as shiny.' }}</p>
        </div>

        <template v-else-if="pokemon.methods.length">
          <div class="methods-label">Hunt Methods <span class="count">({{ pokemon.methods.length }})</span></div>
          <div class="methods">
            <div
              v-for="(m, i) in pokemon.methods"
              :key="m.id"
              class="method-card"
              :class="rankClass(i)"
            >
              <div class="method-rank">{{ rankLabel(i) }}</div>
              <div class="method-name">{{ m.name }}</div>
              <div class="method-meta">
                <span class="odds">{{ m.odds }}</span>
                <span class="game">{{ m.game }}</span>
              </div>
              <p v-if="m.notes" class="method-notes">{{ m.notes }}</p>
            </div>
          </div>
        </template>

        <div v-else-if="pokemon.status === 'event'" class="method-card event">
          <div class="method-rank">Availability</div>
          <p class="method-notes">{{ pokemon.notes }}</p>
        </div>

        <p v-if="pokemon.notes && pokemon.status === 'huntable'" class="extra-notes">
          {{ pokemon.notes }}
        </p>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { computed } from 'vue'
import { useTrackerStore } from '../stores/tracker.js'

const props = defineProps({ pokemon: Object })
defineEmits(['close'])

const store = useTrackerStore()

const isCaught = computed(() => props.pokemon && store.caught.has(props.pokemon.id))

const spriteUrl = computed(() =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${props.pokemon?.id}.png`
)

const bigStatusLabel = computed(() => {
  if (!props.pokemon) return ''
  if (props.pokemon.status === 'locked') return '🔒 Shiny Locked'
  if (props.pokemon.status === 'event') return '🎫 Event Only'
  if (isCaught.value) return '✨ Caught'
  return 'Remaining'
})

const RANK_CLASSES = ['best', 'second', 'third', 'fourth', 'fifth']
const RANK_LABELS  = ['Best Method', '2nd Best', '3rd Best', '4th', '5th']

function rankClass(i) { return RANK_CLASSES[i] ?? 'other' }
function rankLabel(i) { return RANK_LABELS[i] ?? `#${i + 1}` }
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: #00000088;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 1rem;
}

.modal {
  background: #1e1e2e;
  border: 1px solid #45475a;
  border-radius: 14px;
  padding: 1.5rem;
  width: 100%;
  max-width: 500px;
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
}

.close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: #6c7086;
  font-size: 1.1rem;
  cursor: pointer;
  transition: color 0.15s;
}
.close:hover { color: #cdd6f4; }

.header {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  margin-bottom: 1.25rem;
}

.sprite {
  width: 96px;
  height: 96px;
  image-rendering: pixelated;
  flex-shrink: 0;
}

.lock-big { font-size: 3rem; flex-shrink: 0; }

.title-block {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.dex-num { font-size: 0.75rem; color: #6c7086; }

h2 { margin: 0; font-size: 1.3rem; color: #cdd6f4; }

.gen-tag {
  font-size: 0.75rem;
  color: #a6adc8;
  background: #313244;
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  width: fit-content;
}

.status-block {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
  flex-shrink: 0;
}

.big-status {
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.25rem 0.6rem;
  border-radius: 6px;
  background: #313244;
  color: #a6adc8;
}
.big-status.event  { background: #89b4fa22; color: #89b4fa; }
.big-status.locked { background: #31324455; color: #585b70; }

.catch-toggle {
  font-size: 0.78rem;
  padding: 0.3rem 0.7rem;
  border-radius: 6px;
  border: 1px solid #45475a;
  background: #313244;
  color: #cdd6f4;
  cursor: pointer;
  transition: background 0.15s;
  white-space: nowrap;
}
.catch-toggle:hover  { background: #45475a; }
.catch-toggle.caught { border-color: #f9e2af; color: #f9e2af; background: #f9e2af11; }

.locked-msg {
  background: #31324455;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  color: #6c7086;
  font-size: 0.9rem;
  line-height: 1.5;
}

.methods-label {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #6c7086;
  margin-bottom: 0.5rem;
}
.count { color: #45475a; }

.methods {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.method-card {
  border-radius: 10px;
  padding: 0.75rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  border: 1px solid transparent;
}

.method-card.best   { background: #cba6f711; border-color: #cba6f744; }
.method-card.second { background: #89dceb11; border-color: #89dceb33; }
.method-card.third  { background: #a6e3a111; border-color: #a6e3a133; }
.method-card.fourth,
.method-card.fifth,
.method-card.other  { background: #31324433; border-color: #45475a44; }
.method-card.event  { background: #89b4fa11; border-color: #89b4fa44; }

.method-rank {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #6c7086;
}

.method-name {
  font-size: 0.95rem;
  font-weight: 600;
  color: #cdd6f4;
}

.method-meta {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.odds {
  font-size: 1.05rem;
  font-weight: 700;
  color: #a6e3a1;
}

.game {
  font-size: 0.8rem;
  color: #a6adc8;
}

.method-notes {
  font-size: 0.8rem;
  color: #a6adc8;
  line-height: 1.5;
  margin: 0.15rem 0 0;
}

.extra-notes {
  margin-top: 0.75rem;
  font-size: 0.82rem;
  color: #a6adc8;
  line-height: 1.5;
  background: #31324444;
  padding: 0.6rem 0.8rem;
  border-radius: 8px;
}
</style>
