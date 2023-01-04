import { Ref } from "@vue/reactivity";
import {Image, Line, Svg} from "@svgdotjs/svg.js";

export interface AppStateInterface {
  isDragging: Ref<boolean>,
  board: Ref<null | Svg>,
  showGrid: Ref<boolean>,
  selectedItem: Ref<Image | null>,
  items: {
    grid: Ref<Line[]>,
    drawableItems: Ref<Image[]>,
  }
}