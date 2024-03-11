<script setup lang="ts">
import GridNode from './components/GridNode.vue';
import type { Node } from './types/types';
import { getInitialGrid } from './utils/utils';
import { START_NODE_COL, START_NODE_ROW, FINISH_NODE_ROW, FINISH_NODE_COL } from './utils/utils';
import { djikstra, getNodesInShortestPathOrder } from './algorithms/djikstra';

const grid = getInitialGrid(20, 50);

const animateDjikstra = (visitedNodesInOrder: Node[], nodesInShortestPathOrder: Node[]) => {
  for (let i = 0; i <= visitedNodesInOrder.length; i++) {
    if (i === visitedNodesInOrder.length) {
      setTimeout(() => {
        animateShortestPath(nodesInShortestPathOrder);
      }, 10 * i);
    }

    setTimeout(() => {
      const node = visitedNodesInOrder[i];

      const element = document.getElementById(`node-${node.row}-${node.col}`);
      if (element) element.className = 'node node-visited';
    });
  }
};

const animateShortestPath = (nodesInShortestPathOrder: Node[]) => {
  for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
    setTimeout(() => {
      const node = nodesInShortestPathOrder[i];

      const element = document.getElementById(`node-${node.row}-${node.col}`);
      if (element) element.className = 'node node-visited';
    }, 50 * i);
  }
};

const visualize = () => {
  const startNode = grid[START_NODE_ROW][START_NODE_COL];
  const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];

  const visitedNodesInOrder = djikstra(grid, startNode, finishNode);
  const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
};
</script>

<template>
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
        />
      </div>
    </div>
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
