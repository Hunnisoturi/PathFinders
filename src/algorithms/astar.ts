import type { Ref } from 'vue';
import type { AstarNode } from '../types/types';

export const astar = (start: AstarNode, goal: AstarNode, grid: Ref<AstarNode[][]>) => {
  const openSet: AstarNode[] = [start];
  const closedSet: AstarNode[] = [];
  const visitedNodes: AstarNode[] = [];

  while (openSet.length > 0) {
    const current = openSet.reduce((minNode, node) => {
      return getTotalCost(node) < getTotalCost(minNode) ? node : minNode;
    });

    openSet.splice(openSet.indexOf(current), 1);
    closedSet.push(current);

    if (current === goal) {
      const path: AstarNode[] = [];
      let currentPathNode: AstarNode | null = current;

      while (currentPathNode) {
        path.unshift(currentPathNode);
        currentPathNode = currentPathNode.previous;
      }
      return visitedNodes;
    }

    closedSet.push(current);
    visitedNodes.push(current);

    const neighbors = getNeighbors(current, grid);

    for (const neighbor of neighbors) {
      if (closedSet.includes(neighbor)) continue;
      if (neighbor.isWall) continue;

      const tentativeCost = current.cost + 1;

      if (!openSet.includes(neighbor) || tentativeCost < neighbor.cost) {
        neighbor.cost = tentativeCost;
        neighbor.heuristic = heuristic(neighbor, goal);
        neighbor.previous = current;

        if (!openSet.includes(neighbor)) {
          openSet.push(neighbor);
        }
      }
    }
  }

  return null;
};

const getTotalCost = (node: AstarNode) => {
  return node.cost + node.heuristic;
};

// Unify this with djikstra
const getNeighbors = (node: AstarNode, grid: Ref<AstarNode[][]>): AstarNode[] => {
  const neighbors: AstarNode[] = [];
  const { row, col } = node;

  if (row > 0) neighbors.push(grid.value[row - 1][col]);
  if (row < grid.value.length - 1) neighbors.push(grid.value[row + 1][col]);
  if (col > 0) neighbors.push(grid.value[row][col - 1]);
  if (col < grid.value[0].length) neighbors.push(grid.value[row][col + 1]);

  return neighbors;
};

const heuristic = (node: AstarNode, goal: AstarNode): number => {
  return Math.abs(node.row - goal.row) + Math.abs(node.col - goal.col);
};
