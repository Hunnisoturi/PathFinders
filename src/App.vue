<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
import GridComponent from './components/GridComponent.vue';
import HeaderComponent from './components/HeaderComponent.vue';

const selectedAlg: Ref<string> = ref('djikstra');
</script>

<template>
  <v-app>
    <HeaderComponent :alg="selectedAlg" />
    <GridComponent />
  </v-app>
</template>

<style scoped></style>
