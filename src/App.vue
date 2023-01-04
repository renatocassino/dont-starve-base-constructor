<script setup lang="ts">
import { SVG } from '@svgdotjs/svg.js';
import {onMounted, onUnmounted, ref} from 'vue';

const x = ref(0);
const y = ref(0);

const isDragging = ref(false);
const board = {
  width: 400,
  height: 400,
}
const GRID = 25;

function findNextDivisor(v: number) {
  if (v % GRID === 0) {
    return v;
  }
  let upper, down;

  for(let i = 0; true; i++) {
    if ((v + i) % GRID === 0) {
      upper = i;
      break;
    }
  }

  for(let i = 0; true; i++) {
    if ((v - i) % GRID === 0) {
      down = i;
      break;
    }
  }

  return  (upper < down) ? v + upper : v - down;
}

function update(event: MouseEvent) {
  x.value = event.pageX;
  y.value = event.pageY;
}

onMounted(() => {
  window.addEventListener('mousemove', (ev) => update(ev));

  const draw = SVG().addTo('#drawer-svg').size('100%', '100%');

  let xToBuild = 0;
  while (xToBuild <= board.width) {
    draw.line(xToBuild, 0, xToBuild, board.height).stroke({ width: 1, color: '#ccc' });
    xToBuild += GRID;
  }

  let yToBuild = 0;
  while (yToBuild <= board.height) {
    draw.line(0, yToBuild, board.width, yToBuild).stroke({ width: 1, color: '#ccc' });
    yToBuild += GRID;
  }

  const image = draw.image('/src/assets/crockpot.png').move(100, 100);
  image.size(50, 53);

  image.on('mousedown', () => {
    isDragging.value = true;
  });

  image.on('mousemove', function (event) {
    if (!isDragging.value) {
      return;
    }

    let diffx = findNextDivisor(event.offsetX - 25);
    let diffy = findNextDivisor(event.offsetY - 26);

    image.move(diffx, diffy);
  });

  window.addEventListener('mouseup', function (event) {
    isDragging.value = false;
  });

  let lastValue = '';
  setInterval(() => {
    const newValue = `${image.x()}x${image.y()}`;
    if (lastValue === newValue) {
      return;
    }
    lastValue = newValue;

    console.log(newValue);
  }, 10)
});
onUnmounted(() => window.removeEventListener('mousemove', update));
</script>

<template>
  <div>
    <table>
      <tr>
        <td>Is dragging</td>
      </tr>
      <tr>
        <td>{{isDragging}}</td>
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
