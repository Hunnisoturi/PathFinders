<script setup lang="ts">
import { onMounted, ref } from 'vue';
import GridNode from './components/GridNode.vue';
import type { Node } from './types/types';
import { getInitialGrid, getNewGridWithWallToggled } from './utils/utils';
import { START_NODE_COL, START_NODE_ROW, FINISH_NODE_ROW, FINISH_NODE_COL } from './utils/utils';
import { djikstra, getNodesInShortestPathOrder } from './algorithms/djikstra';

const grid = ref<Node[][]>([]);
const isMousePressed = ref<boolean>(false);

onMounted(() => {
  grid.value = getInitialGrid(20, 50);
});

const animateDjikstra = (
  visitedNodesInOrder: Node[] | undefined,
  nodesInShortestPathOrder: Node[]
) => {
  if (visitedNodesInOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }

      setTimeout(() => {
        const node = visitedNodesInOrder[i];

        const element = document.getElementById(`node-${node.row}-${node.col}`);
        if (element) element.className = 'node node-visited';
      }, 10 * i);
    }
  }
};

const animateShortestPath = (nodesInShortestPathOrder: Node[]) => {
  for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
    setTimeout(() => {
      const node = nodesInShortestPathOrder[i];

      const element = document.getElementById(`node-${node.row}-${node.col}`);
      if (element) element.className = 'node node-shortest-path';
    }, 50 * i);
  }
};

const visualizeDjikstra = () => {
  const startNode = grid.value[START_NODE_ROW][START_NODE_COL];
  const finishNode = grid.value[FINISH_NODE_ROW][FINISH_NODE_COL];

  const visitedNodesInOrder = djikstra(grid.value, startNode, finishNode);
  const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
  animateDjikstra(visitedNodesInOrder, nodesInShortestPathOrder);
};

const onMouseDown = (row: number, col: number) => {
  const newGrid = getNewGridWithWallToggled(grid.value, row, col);
  grid.value = newGrid;
  isMousePressed.value = true;
};

const onMouseEnter = (row: number, col: number) => {
  if (isMousePressed.value === false) return;
  const newGrid = getNewGridWithWallToggled(grid.value, row, col);
  grid.value = newGrid;
};

const onMouseUp = () => {
  isMousePressed.value = false;
};
</script>

<template>
  <button @click="visualizeDjikstra">Visualize</button>
  <div class="grid">
    <div v-for="(row, index) in grid" :key="index" class="row">
      <div v-for="(node, nodeIndex) in row" :key="nodeIndex">
        <GridNode
          :col="node.col"
          :row="node.row"
          :is-wall="node.isWall"
          :is-start="node.isStart"
          :is-finish="node.isFinish"
          :distance="node.distance"
          :isVisited="node.isVisited"
          :previous-node="node.previousNode"
          :is-mouse-pressed="isMousePressed"
          :on-mouse-down="() => onMouseDown(node.row, node.col)"
          :on-mouse-up="() => onMouseUp()"
          :on-mouse-enter="() => onMouseEnter(node.row, node.col)"
        />
      </div>
    </div>
    <p></p>
  </div>
</template>

<style scoped>
.grid {
  margin: 100px 0 0;
}

.row {
  display: flex;
}
</style>
