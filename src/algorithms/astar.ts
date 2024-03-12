import type { AstarNode } from '../types/types';

const astar = (start: AstarNode, goal: AstarNode, grid: AstarNode[][]) => {
  const openSet: AstarNode[] = [start];
  const closedSet: AstarNode[] = [];

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
      return path;
    }

    const neighbors = getNeighbors(current, grid);

    for (const neighbor of neighbors) {
      if (closedSet.includes(neighbor)) continue;

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
const getNeighbors = (node: AstarNode, grid: AstarNode[][]): AstarNode[] => {
  const neighbors: AstarNode[] = [];
  const { row, col } = node;

  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length) neighbors.push(grid[row][col + 1]);

  return neighbors;
};

const heuristic = (node: AstarNode, goal: AstarNode): number => {
  return Math.abs(node.row - goal.row) + Math.abs(node.col - goal.col);
};
