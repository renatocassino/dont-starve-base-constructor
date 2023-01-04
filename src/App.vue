<script setup lang="ts">
import BoardProvider from './providers/boardProvider/boardProvider.vue';
import Board from "./components/Board.vue";
</script>

<template>
  <BoardProvider>
    <Board />
  </BoardProvider>
</template>
