<script setup lang="ts">
import {provide, ref} from "vue";
import { APP_STATE, BOARD_INFO } from "../../constants/keys";
import { Line } from "@svgdotjs/svg.js";
import type { AppStateInterface } from "./boardProvider.types";

provide(BOARD_INFO, {
  width: 400,
  height: 400,
  grid: 25,
});

provide<AppStateInterface>(APP_STATE, {
  isDragging: ref(false),
  board: ref(null),
  selectedItem: ref(null),
  items: {
    grid: ref<Line[]>([]),
  }
});
</script>

<template>
  <slot></slot>
</template>