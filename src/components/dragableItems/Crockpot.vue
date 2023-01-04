<script lang="ts" setup>
import {useBoard} from "../../injectors/useAppState";
import {toRef} from "vue";

const props = defineProps({
  item: Object,
});

const board = useBoard()!;
</script>

<template>
</template>