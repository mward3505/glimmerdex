<template>
  <Teleport to="body">
    <div class="overlay" @click.self="$emit('close')">
      <div class="modal">
        <button class="close" @click="$emit('close')">✕</button>
        <h2>🥪 Sparkling Power Sandwich Guide</h2>
        <p class="subtitle">Scarlet/Violet — Sparkling Power Lv3 for 1/512 shiny odds</p>

        <div class="recipe-box">
          <h3>Base Ingredients (every type)</h3>
          <ul>
            <li>1× Tomato</li>
            <li>1× Onion</li>
            <li>1× Green Bell Pepper</li>
            <li>1× Hamburger</li>
            <li>2× <em>Type Ingredient</em> (see table below)</li>
            <li>2× any Herba Mystica <span class="warn">(avoid Sour+Sour or Sweet+Sour)</span></li>
          </ul>
        </div>

        <div class="steps-box">
          <h3>Save Scum Routine</h3>
          <ol>
            <li>Turn off autosave</li>
            <li>Clear 60+ Pokémon from the outbreak</li>
            <li>Manual save</li>
            <li>Make the sandwich</li>
            <li>Hunt — if no shiny, close without saving and repeat</li>
          </ol>
        </div>

        <h3>Type Ingredients</h3>
        <div class="type-grid">
          <div v-for="t in types" :key="t.type" class="type-row">
            <span class="type-name">{{ t.type }}</span>
            <span class="ingredient">{{ t.ingredient }}</span>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
defineEmits(['close'])

const types = [
  { type: 'Normal',   ingredient: 'Tofu' },
  { type: 'Fire',     ingredient: 'Red Pepper' },
  { type: 'Water',    ingredient: 'Cucumber' },
  { type: 'Electric', ingredient: 'Yellow Pepper' },
  { type: 'Grass',    ingredient: 'Lettuce' },
  { type: 'Ice',      ingredient: 'Klawf Stick' },
  { type: 'Fighting', ingredient: 'Pickle' },
  { type: 'Poison',   ingredient: 'Green Pepper' },
  { type: 'Ground',   ingredient: 'Ham' },
  { type: 'Flying',   ingredient: 'Prosciutto' },
  { type: 'Psychic',  ingredient: 'Onion' },
  { type: 'Bug',      ingredient: 'Cherry Tomato' },
  { type: 'Rock',     ingredient: 'Bacon' },
  { type: 'Ghost',    ingredient: 'Red Onion' },
  { type: 'Dragon',   ingredient: 'Avocado' },
  { type: 'Dark',     ingredient: 'Smoked Fillet' },
  { type: 'Steel',    ingredient: 'Hamburger' },
  { type: 'Fairy',    ingredient: 'Tomato' },
]
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
  max-width: 520px;
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
}
.close:hover { color: #cdd6f4; }

h2 { margin: 0 0 0.25rem; color: #cdd6f4; font-size: 1.2rem; }
h3 { color: #cba6f7; font-size: 0.9rem; margin: 1rem 0 0.5rem; }

.subtitle { color: #6c7086; font-size: 0.82rem; margin: 0 0 1rem; }

.recipe-box, .steps-box {
  background: #181825;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  margin-bottom: 0.75rem;
}

ul, ol {
  margin: 0;
  padding-left: 1.2rem;
  color: #a6adc8;
  font-size: 0.88rem;
  line-height: 1.8;
}

.warn { color: #f38ba8; font-size: 0.8rem; }

.type-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 0.3rem;
}

.type-row {
  display: flex;
  justify-content: space-between;
  background: #181825;
  border-radius: 6px;
  padding: 0.3rem 0.6rem;
  font-size: 0.83rem;
}

.type-name { color: #89b4fa; font-weight: 600; }
.ingredient { color: #a6adc8; }
</style>
