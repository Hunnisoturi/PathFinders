<script setup lang="ts">
const props = defineProps({
  col: Number,
  row: Number,
  isFinish: Boolean,
  isStart: Boolean,
  isWall: Boolean
})
</script>

<template>
  <div
    :id="`node-${row}-${col}`"
    :class="{ 'node-finish': isFinish, 'node-start': isStart, 'node-wall': isWall }"
  ></div>
</template>

<style scoped>
.node {
  width: 25px;
  height: 25px;
  outline: 1px sold rgb(175, 216, 248);
  display: inline-block;
}

.node-finish {
  background-color: red;
}

.node-start {
  background-color: green;
}
</style>
