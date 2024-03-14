<script setup lang="ts" generic="T extends NodeType">
import GridNode from './GridNode.vue';
import { ref, onMounted, watch } from 'vue';
import type { Ref } from 'vue';
import type { DjikstraNode, AstarNode, NodeType } from '../types/types';
import { getNewGridWithWallToggled, isDjikstra, getDjikstraGrid } from '../utils/utils';
import { START_NODE_COL, START_NODE_ROW, FINISH_NODE_ROW, FINISH_NODE_COL } from '../utils/utils';
import { djikstra, getNodesInShortestPathOrder } from '../algorithms/djikstra';

// TODO: make GridNode generic to accept both types of nodes: make GridNode generic to accept both types of nodes

const props = defineProps<{
  grid: Ref<T[][]>;
}>();

const selectedAlg = "djikstra"

onMounted(() => {
  if (selectedAlg == 'djikstra') {
    grid.value = getDjikstraGrid(20, 50) as T[][];
  }
});

const { grid } = props;

watch(grid, () => console.log('grid: ', grid.value));

const isMousePressed = ref<boolean>(false);

const animateDjikstra = (
  visitedNodesInOrder: DjikstraNode[] | undefined,
  nodesInShortestPathOrder: DjikstraNode[]
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

const animateShortestPath = (nodesInShortestPathOrder: DjikstraNode[]) => {
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

    const visitedNodesInOrder = djikstra(grid as Ref<DjikstraNode[][]>, startNode as DjikstraNode, finishNode as DjikstraNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode as DjikstraNode);
    animateDjikstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }
};

const onMouseDown = (row: number, col: number) => {
  if (isDjikstra(grid.value)) {
    const newGrid = getNewGridWithWallToggled(grid.value as DjikstraNode[][], row, col);
    (grid.value as T[][]) = newGrid;
    isMousePressed.value = true;
  }
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
  <v-btn @click="visualizeDjikstra" class="lmao">Visualize</v-btn>
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

.lmao {
  margin-top: 100px;
}
</style>
