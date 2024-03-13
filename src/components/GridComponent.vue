<script setup lang="ts" generic="T extends DjikstraNode, U extends AstarNode">
import GridNode from './GridNode.vue';
import { ref } from 'vue';
import type { Ref } from 'vue';
import type { DjikstraNode, AstarNode } from '../types/types';
import { getNewGridWithWallToggled } from '../utils/utils';
import { START_NODE_COL, START_NODE_ROW, FINISH_NODE_ROW, FINISH_NODE_COL } from '../utils/utils';
import { djikstra, getNodesInShortestPathOrder } from '../algorithms/djikstra';

type NodeType = T | U;

const props = defineProps<{
  grid: Ref<NodeType[][]>;
}>();

const { grid } = props;

const isMousePressed = ref<boolean>(false);

const animateDjikstra = (
  visitedNodesInOrder: NodeType[] | undefined,
  nodesInShortestPathOrder: NodeType[]
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

const animateShortestPath = (nodesInShortestPathOrder: NodeType[]) => {
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

  const visitedNodesInOrder = djikstra(grid, startNode, finishNode);
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
  <v-btn @click="visualizeDjikstra" class="action-button">Visualize</v-btn>
  <div class="grid">
    <div v-for="(row, index) in grid" :key="index" class="row">
      <div v-for="(node, nodeIndex) in row" :key="nodeIndex">
        <GridNode
          :node="node"
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

.action-button {
  margin-top: 100px;
}
</style>
