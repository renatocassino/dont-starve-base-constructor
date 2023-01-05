import {inject} from "vue";
import {APP_STATE} from "../constants/keys";
import { AppStateInterface } from "../providers/boardProvider/boardProvider.types";

export const useAppState = () => {
  return inject<AppStateInterface>(APP_STATE);
}

export const useBoard = () => {
  return useAppState()?.board;
}