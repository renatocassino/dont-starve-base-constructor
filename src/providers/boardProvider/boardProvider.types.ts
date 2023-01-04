import { Ref } from "@vue/reactivity";
import {Image, Line, Svg} from "@svgdotjs/svg.js";

export interface AppStateInterface {
  isDragging: Ref<boolean>,
  board: Ref<null | Svg>,
  selectedItem: Ref<Image | null>,
  items: {
    grid: Ref<Line[]>
  }
}