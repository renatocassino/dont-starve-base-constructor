<script lang="ts" setup>
import {useAppState, useBoard} from "../../injectors/useAppState";
import {onMounted, toRef, watch} from "vue";
import {findNextDivisor} from "../../utils/findNextDivisor";
import {useBoardInfo} from "../../injectors/useBoardInfo";
import type { Item } from "../../providers/boardProvider/boardProvider.types";

const props = defineProps<{ item: Item }>();
const item = props.item;

const state = useAppState()!;
const draw = useBoard()!;

function buildImage() {
  const image = draw.value!.image('/src/assets/crockpot.png').move(0, 0);
  image.size(50, 53);
  image.css({ transition: '0.3s transform, 0.3s filter' });

  let clickTime = new Date().getTime();
  image.on('mousedown', () => {
    clickTime = new Date().getTime();
    state.isDragging.value = true;
  });

  image.on('click', () => {
    state.selectedItem.value = item.id;
  })

  return image;
}

onMounted(() => {
  const newImage = buildImage();
  state.items.drawableItems.value[item.id as string] = newImage;
});

watch(state.selectedItem, () => {
  const drawableItem = state.items.drawableItems.value[item.id as string];

  if (!state.selectedItem.value) {
    drawableItem.css({ filter: '' });
    return;
  }

  if (state.selectedItem.value === item.id) {
    drawableItem.css({ filter: [0,1,2,3].map(() => 'drop-shadow(green 0px 0px 1px)').join(' ') });
    return;
  }
  drawableItem.css({ filter: 'blur(0.5px) brightness(0.8)' });
})
</script>

<template></template>