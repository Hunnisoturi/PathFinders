<script setup lang="ts" generic="T extends NodeType">
import GridNode from './GridNode.vue';
import { ref, onMounted, watch } from 'vue';
import type { Ref } from 'vue';
import type { AstarNode, DjikstraNode, NodeType } from '../types/types';
import { getAstarGrid, getDjikstraGrid } from '../utils/utils';
import { START_NODE_COL, START_NODE_ROW, FINISH_NODE_ROW, FINISH_NODE_COL } from '../utils/utils';
import { djikstra, getNodesInShortestPathOrder } from '../algorithms/djikstra';
import { astar } from '../algorithms/astar';

const grid: Ref<T[][]> = ref([]);

const selectedAlg: Ref<SelectionItem> = ref({ title: 'Djikstra', value: 'djikstra' });

interface SelectionItem {
  title: string;
  value: string;
}
const algs: SelectionItem[] = [
  { title: 'Djikstra', value: 'djikstra' },
  { title: 'A*', value: 'astar' }
];

onMounted(() => {
  grid.value = getAstarGrid(20, 50) as T[][];
});

watch(selectedAlg, () => {
  if (selectedAlg.value.value === 'astar') {
    grid.value = getAstarGrid(20, 50) as T[][];
  }
  if (selectedAlg.value.value === 'djikstra') {
    grid.value = getDjikstraGrid(20, 50) as T[][];
  }
});

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
  const startNode = grid.value[START_NODE_ROW][START_NODE_COL];
  const finishNode = grid.value[FINISH_NODE_ROW][FINISH_NODE_COL];

  const visitedNodesInOrder = djikstra(
    grid as Ref<DjikstraNode[][]>,
    startNode as DjikstraNode,
    finishNode as DjikstraNode
  );

  const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode as DjikstraNode);
  animateAlg(visitedNodesInOrder as T[], nodesInShortestPathOrder as T[]);
};

const visualizeAstar = () => {
  const startNode = grid.value[START_NODE_ROW][START_NODE_COL];
  const finishNode = grid.value[FINISH_NODE_ROW][FINISH_NODE_COL];

  const visitedNodesInOrder = astar(
    startNode as AstarNode,
    finishNode as AstarNode,
    grid as Ref<AstarNode[][]>
  );

  const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode as AstarNode);
  animateAlg(visitedNodesInOrder as T[], nodesInShortestPathOrder as T[]);
};

const visualize = () => {
  if (selectedAlg.value.value === 'djikstra') {
    visualizeDjikstra();
  } else if (selectedAlg.value.value === 'astar') {
    visualizeAstar();
  }
};
</script>

<template>
  <div class="selection">
    <v-select
      v-model="selectedAlg"
      label="Select algorithm"
      :items="algs"
      variant="solo-filled"
      item-title="title"
      item-value="value"
      return-object
    />
    <v-btn @click="visualize">Visualize {{ selectedAlg.title }}</v-btn>
  </div>
  <div class="grid">
    <div v-for="(row, rowIndex) in grid" class="row" :key="rowIndex">
      <div v-for="node in row" :key="node.id">
        <GridNode :node="node" />
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

.selection {
  margin-top: 100px;
}
</style>
