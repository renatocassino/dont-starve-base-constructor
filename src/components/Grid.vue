<script lang="ts" setup>
import {useAppState, useBoard} from "../injectors/useAppState";
import {onMounted} from "vue";
import {useBoardInfo} from "../injectors/useBoardInfo";
import {AppStateInterface} from "../providers/boardProvider/boardProvider.types";

const board = useBoard()!;
const boardInfo = useBoardInfo()!;
const state = useAppState()!;

function buildGrid(gridValue: number) {
  if (!board.value) {
    return;
  }

  let xToBuild = 0;
  while (xToBuild <= boardInfo.width) {
    const newLine = board.value.line(xToBuild, 0, xToBuild, boardInfo.height).stroke({ width: 1, color: '#ccc', opacity: 0.5 });
    state.items.grid.value.push(newLine);
    xToBuild += gridValue;
  }

  let yToBuild = 0;
  while (yToBuild <= boardInfo.height) {
    const newLine = board.value.line(0, yToBuild, boardInfo.width, yToBuild).stroke({ width: 1, color: '#ccc', opacity: 0.5 });
    state.items.grid.value.push(newLine);
    yToBuild += gridValue;
  }
}

function moveGridToBack(currentState: AppStateInterface) {
  currentState.items.grid.value.reverse().forEach((gridItem) => gridItem.back());
}

onMounted(() => {
  buildGrid(boardInfo.grid);
  moveGridToBack(state);
});
</script>

<template></template>