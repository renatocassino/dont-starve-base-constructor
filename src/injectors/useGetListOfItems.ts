import {inject} from "vue";
import {ITEM_LIST} from "../constants/keys";

export const useGetListOfItems = () => inject(ITEM_LIST);