<script setup lang="ts">
import { Image, Svg, SVG } from '@svgdotjs/svg.js';
import CraftingMenu from './craftingMenu/Menu.vue';
import { onMounted, ref, watch} from 'vue';
import { useBoardInfo } from "../injectors/useBoardInfo";
import Grid from './Grid.vue';
import {useAppState, useBoard} from "../injectors/useAppState";
import Crockpot from "./dragableItems/Crockpot.vue";

const board = useBoardInfo()!;
const state = useAppState()!;
const draw = useBoard()!;

onMounted(() => {
  state.board.value = SVG().addTo('#drawer-svg').size('100%', '100%');
  window.addEventListener('mouseup', function (event) {
    state.isDragging.value = false;
    state.selectedItem.value = null;
  });
});

</script>

<template>
  <div>
    <button @click="() => state.showGrid.value = !state.showGrid.value">
      <template v-if="state.showGrid.value">Hide Grid</template>
      <template v-else>Show Grid</template>
    </button>
    <template v-if="state.board.value">
      <Grid />
      <template v-for="item in state.items.drawableItems">
        <Crockpot :item="item" />
      </template>
    </template>
    <div id="drawer-svg" class="svg"></div>
    <CraftingMenu />
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
