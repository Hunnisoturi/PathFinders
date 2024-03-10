<script setup lang="ts">
import GridNode from './components/GridNode.vue'
const nodes: number[][] = [[]]
</script>

<template>
  <div class="grid">
    <GridNode />
  </div>
</template>

<style scoped>
.grid {
  margin: 100px 0 0;
}
</style>
