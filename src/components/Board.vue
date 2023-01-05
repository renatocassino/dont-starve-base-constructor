<script setup lang="ts">
import { Image, Svg, SVG } from '@svgdotjs/svg.js';
import CraftingMenu from './craftingMenu/Menu.vue';
import { onMounted } from 'vue';
import Grid from './Grid.vue';
import {useAppState, useBoard} from "../injectors/useAppState";
import Crockpot from "./dragableItems/Crockpot.vue";
import {findNextDivisor} from "../utils/findNextDivisor";
import {useBoardInfo} from "../injectors/useBoardInfo";

const state = useAppState()!;
const boardInfo = useBoardInfo()!;

onMounted(() => {
  state.board.value = SVG().addTo('#drawer-svg').size('100%', '100%');
  const boardEl = document.getElementById('drawer-svg')!;

  boardEl.addEventListener('mouseup', function (event) {
    state.isDragging.value = false;
    state.selectedItem.value = null;
  });

  boardEl.addEventListener('mousemove', function(event) {
    if (!state.isDragging.value || !state.selectedItem.value) {
      return;
    }

    const image = state.items.drawableItems.value[state.selectedItem.value];
    if (!image) {
      return;
    }

    image.move(
      findNextDivisor(event.offsetX - 25, boardInfo.grid),
      findNextDivisor(event.offsetY - 26, boardInfo.grid),
    );
  });
});

</script>

<template>
  <div>
    <svg width="0" height="0" style="display: none" xmlns="http://www.w3.org/2000/svg">
      <filter id="blurMe">
        <feGaussianBlur stdDeviation="5" />
      </filter>
    </svg>
    <button @click="() => state.showGrid.value = !state.showGrid.value">
      <template v-if="state.showGrid.value">Hide Grid</template>
      <template v-else>Show Grid</template>
    </button>
    <template v-if="state.board.value">
      <Grid />
      <template v-for="item in state.items.items.value">
        <Crockpot :item="item" />
      </template>
    </template>
    <div id="drawer-svg" class="svg" :style="{ width: `${boardInfo.width}px`, height: `${boardInfo.height}px` }" />
    <CraftingMenu />
  </div>
</template>

<style scoped>
.svg {
  display: block;
  margin: 2rem;
  background: #fff;
}
</style>
