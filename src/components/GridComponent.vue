<script setup lang="ts" generic="T extends NodeType">
import GridNode from './GridNode.vue';
import { ref, onMounted } from 'vue';
import type { Ref } from 'vue';
import type { AstarNode, DjikstraNode, NodeType } from '../types/types';
import {
  getNewGridWithWallToggled,
  isDjikstra,
  getDjikstraGrid,
  isAstar,
  getAstarGrid
} from '../utils/utils';
import { START_NODE_COL, START_NODE_ROW, FINISH_NODE_ROW, FINISH_NODE_COL } from '../utils/utils';
import { djikstra, getNodesInShortestPathOrder } from '../algorithms/djikstra';
import { astar } from '../algorithms/astar';

// TODO: make GridNode generic to accept both types of nodes: make GridNode generic to accept both types of nodes

const grid: Ref<T[][]> = ref([]);

const selectedAlg: string = 'astar';

onMounted(() => {
  grid.value = getAstarGrid(20, 50) as T[][];
  //grid.value = getDjikstraGrid(20, 50) as T[][];
});

const isMousePressed = ref<boolean>(false);

const animateAlg = (visitedNodesInOrder: T[] | undefined, nodesInShortestPathOrder: T[]) => {
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

const animateShortestPath = (nodesInShortestPathOrder: T[]) => {
  for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
    setTimeout(() => {
      const node = nodesInShortestPathOrder[i];

      const element = document.getElementById(`node-${node.row}-${node.col}`);
      if (element) element.className = 'node node-shortest-path';
    }, 50 * i);
  }
};

const visualizeDjikstra = () => {
  if (isDjikstra(grid.value[0][0])) {
    const startNode = grid.value[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid.value[FINISH_NODE_ROW][FINISH_NODE_COL];

    const visitedNodesInOrder = djikstra(
      grid as Ref<DjikstraNode[][]>,
      startNode as DjikstraNode,
      finishNode as DjikstraNode
    );

    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode as DjikstraNode);
    animateAlg(visitedNodesInOrder as T[], nodesInShortestPathOrder as T[]);
  }
};

const visualizeAstar = () => {
  if (isAstar(grid.value[0][0])) {
    const startNode = grid.value[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid.value[FINISH_NODE_ROW][FINISH_NODE_COL];

    const visitedNodesInOrder = astar(
      startNode as AstarNode,
      finishNode as AstarNode,
      grid as Ref<AstarNode[][]>
    );

    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode as AstarNode);
    animateAlg(visitedNodesInOrder as T[], nodesInShortestPathOrder as T[]);
  }
};

const onMouseDown = (row: number, col: number) => {
  const newGrid = getNewGridWithWallToggled(grid.value, row, col);
  grid.value = newGrid;
  isMousePressed.value = true;
};

const onMouseEnter = (row: number, col: number) => {
  if (isDjikstra(grid.value)) {
    if (isMousePressed.value === false) return;
    const newGrid = getNewGridWithWallToggled(grid.value as DjikstraNode[][], row, col);
    (grid.value as DjikstraNode[][]) = newGrid;
  }
};

const onMouseUp = () => {
  isMousePressed.value = false;
};

const visualize = () => {
  if (selectedAlg === 'djikstra') {
    visualizeDjikstra();
  } else if (selectedAlg === 'astar') {
    visualizeAstar();
  }
};
</script>

<template>
  <div>
    <v-btn @click="visualize" class="visualize-button">Visualize {{ selectedAlg }}</v-btn>
  </div>
  <div class="grid">
    <div v-for="(row, index) in grid" :key="index" class="row">
      <div v-for="(node, nodeIndex) in row" :key="nodeIndex">
        <GridNode
          :node="node"
          :previous-node="node.previous"
          :is-mouse-pressed="isMousePressed"
          :on-mouse-down="() => onMouseDown(node.row, node.col)"
          :on-mouse-up="() => onMouseUp()"
          :on-mouse-enter="() => onMouseEnter(node.row, node.col)"
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

.visualize-button {
  margin-top: 100px;
}
</style>
