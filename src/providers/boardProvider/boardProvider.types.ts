import { Ref } from "@vue/reactivity";
import {Image, Line, Svg} from "@svgdotjs/svg.js";

export interface Item {
  id: string;
  item: string;
}

export interface AppStateInterface {
  isDragging: Ref<boolean>,
  board: Ref<null | Svg>,
  showGrid: Ref<boolean>,
  selectedItem: Ref<string | null>,
  items: {
    grid: Ref<Line[]>,
    drawableItems: Ref<{ [key: string]: Image }>,
    items: Ref<Item[]>,
  };
  factoryItem: (item: string) => void;
}