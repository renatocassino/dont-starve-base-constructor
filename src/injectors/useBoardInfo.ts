import {inject} from "vue";
import {BOARD_INFO} from "../constants/keys";

export const useBoardInfo = () => {
  return inject<{ width: number, height: number, grid: number }>(BOARD_INFO);
}