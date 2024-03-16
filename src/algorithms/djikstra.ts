// Performs Djikstra's algorithm, returns *all* nodes in the order
// in which they were visited.
import type { DjikstraNode, NodeType } from '../types/types';
import type { Ref } from 'vue';

export const djikstra = (
  grid: Ref<DjikstraNode[][]>,
  startNode: DjikstraNode,
  finishNode: DjikstraNode
) => {
  const visitedNodesInOrder: DjikstraNode[] = [];
  startNode.distance = 0;

  const unvisitedNodes = getAllNodes(grid);

  while (unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);

    const closestNode = unvisitedNodes.shift();

    if (closestNode) {
      if (closestNode.isWall) continue;
      if (closestNode.distance === Infinity) return visitedNodesInOrder;

      closestNode.isVisited = true;
      visitedNodesInOrder.push(closestNode);

      if (closestNode === finishNode) return visitedNodesInOrder;
      updateUnvisitedNeighbors(closestNode, grid);
    }
  }
};

const getAllNodes = (grid: Ref<DjikstraNode[][]>) => {
  const nodes = [];
  for (const row of grid.value) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
};

const sortNodesByDistance = (unvisitedNodes: DjikstraNode[]) => {
  unvisitedNodes.sort((a, b) => a.distance - b.distance);
};

const updateUnvisitedNeighbors = (node: DjikstraNode, grid: Ref<DjikstraNode[][]>) => {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);

  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previous = node;
  }
};

const getUnvisitedNeighbors = (node: DjikstraNode, grid: Ref<DjikstraNode[][]>) => {
  const neighbors = [];
  const { col, row } = node;

  if (row > 0) neighbors.push(grid.value[row - 1][col]);
  if (row < grid.value.length - 1) neighbors.push(grid.value[row + 1][col]);
  if (col > 0) neighbors.push(grid.value[row][col - 1]);
  if (col < grid.value[0].length - 1) neighbors.push(grid.value[row][col + 1]);

  return neighbors.filter((neighbor) => !neighbor.isVisited);
};

export const getNodesInShortestPathOrder = (finishNode: NodeType) => {
  const nodesInShortestPathOrder = [];

  let currentNode: NodeType | null = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previous;
  }

  return nodesInShortestPathOrder;
};
