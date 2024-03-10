<script setup lang="ts">
import { defineProps } from 'vue';
import type { Node } from '../types/types';

const props = defineProps<Node>();
</script>

<template>
  <div
    :id="`node-${row}-${col}`"
    :class="{
      'node-finish': props.isFinish,
      'node-start': props.isStart,
      'node-wall': props.isWall
    }"
    class="node"
  ></div>
</template>

<style scoped>
.node {
  width: 25px;
  height: 25px;
  outline: 1px solid rgb(175, 216, 248);
  display: inline-block;
}

.node-finish {
  background-color: red;
}

.node-start {
  background-color: green;
}
</style>
