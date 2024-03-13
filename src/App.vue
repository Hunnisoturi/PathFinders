<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Ref } from 'vue';
import GridComponent from './components/GridComponent.vue';
import HeaderComponent from './components/HeaderComponent.vue';
import type { DjikstraNode, AstarNode } from './types/types';
import { getDjikstraGrid } from './utils/utils';

const grid: Ref<DjikstraNode[][] | AstarNode[][]> = ref([]);
// TODO: make selection dynamic and visualize A*
const selectedAlg = 'djikstra';

onMounted(() => {
  if (selectedAlg === 'djikstra') {
    grid.value = getDjikstraGrid(20, 50);
  }
});
</script>

<template>
  <v-app>
    <HeaderComponent />
    <GridComponent :grid="grid" />
  </v-app>
</template>

<style scoped></style>
