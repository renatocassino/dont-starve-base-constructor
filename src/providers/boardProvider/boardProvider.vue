<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid';
import {provide, ref} from "vue";
import {APP_STATE, BOARD_INFO, ITEM_LIST} from "../../constants/keys";
import type { AppStateInterface } from "./boardProvider.types";

provide(BOARD_INFO, {
  width: 800,
  height: 800,
  grid: 25,
});

provide<AppStateInterface>(APP_STATE, {
  isDragging: ref(false),
  board: ref(null),
  showGrid: ref(true),
  selectedItem: ref(null),
  items: {
    grid: ref([]),
    drawableItems: ref({}),
    items: ref([]),
  },
  factoryItem(item: string) {
    this.items.items.value.push({
      id: uuidv4(),
      item,
    });
  }
});

provide<string[]>(ITEM_LIST, ['crockpot', 'shadow-manipulator', 'birdcage', 'meat-effigy', 'houndius-hootius', 'pig-house']);
</script>

<template>
  <slot></slot>
</template>