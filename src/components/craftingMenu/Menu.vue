<script lang="ts" setup>
import { ref } from "vue";
import {useAppState, useBoard} from "../../injectors/useAppState";
import {useBoardInfo} from "../../injectors/useBoardInfo";
import {useGetListOfItems} from "../../injectors/useGetListOfItems";

const menuOpened = ref(false);
const state = useAppState()!;
const listOfItems = useGetListOfItems();

const handleClick = () => menuOpened.value = !menuOpened.value;
const handleAddItem = (item: string) => {
  console.log(item);
  state.factoryItem(item);
};
</script>

<template>
  <div>
    <section :class="{ 'left-menu': true, 'left-menu--opened': menuOpened}">
      <div class="list">
        <div v-for="item in listOfItems">
          <button @click="handleAddItem(item)">
            <img :src="`/src/assets/${item}.png`" width="40" />
          </button>
        </div>
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

.list {
  display: flex;
  align-items: center;
  flex-direction: row;
  max-width: 100%;
  justify-content: space-around;
  flex-wrap: wrap;
}
</style>