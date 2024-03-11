<script setup lang="ts">
import { ref } from 'vue';
import GridNode from './components/GridNode.vue';
import { getInitialGrid } from './utils/utils';

const grid = ref(getInitialGrid(20, 50));
console.log('grid', grid.value);
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
