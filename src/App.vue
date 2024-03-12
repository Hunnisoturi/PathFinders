<script setup lang="ts">
import { ref } from 'vue';
import GridComponent from './components/GridComponent.vue';

const grid = ref<Node[][]>;
</script>

<template>
  <GridComponent :grid="grid" />
</template>

<style scoped></style>
