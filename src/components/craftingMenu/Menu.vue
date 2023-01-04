<script lang="ts" setup>
import { ref } from "vue";
import {useAppState, useBoard} from "../../injectors/useAppState";
import {useBoardInfo} from "../../injectors/useBoardInfo";

const menuOpened = ref(false);
const state = useAppState()!;
const board = useBoardInfo()!;
const draw = useBoard()!;

const handleClick = () => menuOpened.value = !menuOpened.value;

function findNextDivisor(v: number, grid: number) {
  if (v % grid === 0) {
    return v;
  }
  let upper, down;

  for(let i = 0; true; i++) {
    if ((v + i) % grid === 0) {
      upper = i;
      break;
    }
  }

  for(let i = 0; true; i++) {
    if ((v - i) % grid === 0) {
      down = i;
      break;
    }
  }

  return  (upper < down) ? v + upper : v - down;
}

function buildImage() {
  const image = draw.value!.image('/src/assets/crockpot.png').move(0, 0);
  image.size(50, 53);

  image.on('mousedown', () => {
    state.isDragging.value = true;
    state.selectedItem.value = image;
  });

  image.on('click', () => {
    state.selectedItem.value = image;
  });

  image.on('mousemove', function (event) {
    if (!state.isDragging.value) {
      return;
    }

    let diffx = findNextDivisor(event.offsetX - 25, board.grid);
    let diffy = findNextDivisor(event.offsetY - 26, board.grid);

    image.move(diffx, diffy);
  });

  return image;
}

const handleAddItem = () => {
  state.items.drawableItems.value.push(buildImage());
};
</script>

<template>
  <div>
    <section :class="{ 'left-menu': true, 'left-menu--opened': menuOpened}">
      <div>
        <button @click="handleAddItem">
          <img src="/src/assets/crockpot.png" width="40" />
        </button>
      </div>
      <div>
        <button class="toggle-button" @click="handleClick">Abrir</button>
      </div>
    </section>
    <div :class="{overlay: true, 'overlay--closed': !menuOpened}" @click="handleClick"></div>
  </div>
</template>

<style lang="scss" scoped>
.left-menu {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 400px;
  transition: 0.5s transform;
  transform: translateX(-100%);
  background: #1a1a1a;
  z-index: 2;

  &--opened {
    transform: translateX(0);
  }
}

.toggle-button {
  position: absolute;
  right: 0;
  top: 0;
  transform: translateX(100%);
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  transition: opacity 0.5s;

  &--closed {
    pointer-events: none;
    opacity: 0;
  }
}
</style>