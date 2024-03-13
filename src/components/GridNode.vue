<script setup lang="ts" generic="T extends DjikstraNode | AstarNode">
import { defineProps } from 'vue';
import type { DjikstraNode, AstarNode } from '../types/types';

const props = defineProps<{
  node: T;
  isMousePressed: boolean;
  onMouseDown: (row: number, col: number) => void;
  onMouseUp: () => void;
  onMouseEnter: (row: number, col: number) => void;
}>();

const { node } = props;
</script>

<template>
  <div
    :id="`node-${node.row}-${node.col}`"
    :class="{
      'node-finish': node.isFinish,
      'node-start': node.isStart,
      'node-wall': node.isWall
    }"
    class="node"
    @mousedown="() => onMouseDown(node.row, node.col)"
    @mouseenter="() => props.onMouseEnter(node.row, node.col)"
    @mouseup="() => props.onMouseUp()"
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

.node-visited {
  animation-name: visitedAnimation;
  animation-duration: 1.5s;
  animation-timing-function: ease-out;
  animation-delay: 0;
  animation-direction: alternate;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-play-state: running;
}

@keyframes visitedAnimation {
  0% {
    transform: scale(0.3);
    background-color: rgba(0, 0, 66, 0.75);
    border-radius: 100%;
  }

  50% {
    background-color: rgba(17, 104, 217, 0.75);
  }

  75% {
    transform: scale(1.2);
    background-color: rgba(0, 217, 159, 0.75);
  }

  100% {
    transform: scale(1);
    bacground-color: rgba(0, 190, 218, 0.75);
  }
}

.node-wall {
  background-color: rgb(12, 53, 71);
}

.node-shortest-path {
  animation-name: shortestPath;
  animation-duration: 1.5s;
  animation-timing-function: ease-out;
  animation-delay: 0;
  animation-direction: alternate;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-play-state: running;
}

@keyframes shortestPath {
  0% {
    transform: scale(0.6);
    background-color: rgb(255, 254, 106);
  }

  50% {
    transform: scale(1.2);
    background-color: rgb(255, 254, 106);
  }

  100% {
    transform: scale(1);
    background-color: rgb(255, 254, 106);
  }
}
</style>
