<script setup lang="ts">
import {Image, Svg, SVG} from '@svgdotjs/svg.js';
import { onMounted, ref, watch} from 'vue';
import { useBoardInfo } from "../injectors/useBoardInfo";
import Grid from './Grid.vue';
import {useAppState, useBoard} from "../injectors/useAppState";
import Crockpot from "./dragableItems/Crockpot.vue";

const board = useBoardInfo()!;
const state = useAppState()!;
const draw = useBoard()!;

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

onMounted(() => {
  state.board.value = SVG().addTo('#drawer-svg').size('100%', '100%');
  window.addEventListener('mouseup', function (event) {
    state.isDragging.value = false;
    state.selectedItem.value = null;
  });
});

const addCrockPot = () => {
  state.items.drawableItems.value.push(buildImage());
}
</script>

<template>
  <div>
    <button @click="() => state.showGrid.value = !state.showGrid.value">
      <template v-if="state.showGrid.value">Hide Grid</template>
      <template v-else>Show Grid</template>
    </button>
    <button @click="addCrockPot">Add Crockpot</button>
    <template v-if="state.board.value">
      <Grid />
      <template v-for="item in state.items.drawableItems">
        <Crockpot :item="item" />
      </template>
    </template>
    <table>
      <tr>
        <td>Is dragging</td>
      </tr>
      <tr>
        <td>{{state.isDragging}}</td>
      </tr>
    </table>
    <div id="drawer-svg" class="svg"></div>
  </div>
</template>

<style scoped>
.svg {
  width: 400px;
  height: 400px;

  display: block;
  margin: 2rem;
  background: #fff;
}
</style>
