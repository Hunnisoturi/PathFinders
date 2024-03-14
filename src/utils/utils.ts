import type { DjikstraNode, AstarNode } from '../types/types';

export const START_NODE_COL: number = 10;
export const START_NODE_ROW: number = 15;
export const FINISH_NODE_ROW: number = 10;
export const FINISH_NODE_COL: number = 35;

export const isDjikstra = (obj: any): obj is DjikstraNode => {
  return typeof obj.distance === 'number';
};

export const isAstar = (arr: any[][]): arr is AstarNode[][] => {
  return typeof arr[0][0].cost === 'number';
};

export const getDjikstraGrid = (rows: number, cols: number): DjikstraNode[][] => {
  const grid = [];

  for (let row = 0; row < rows; row++) {
    const currentRow = [];
    for (let col = 0; col < cols; col++) {
      currentRow.push(createDjikstraNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

export const getNewGridWithWallToggled = (grid: DjikstraNode[][], row: number, col: number) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];

  const newNode = {
    ...node,
    isWall: !node.isWall
  };

  newGrid[row][col] = newNode;
  return newGrid;
};

export const createDjikstraNode = (col: number, row: number): DjikstraNode => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    isWall: false,
    isVisited: false,
    distance: Infinity,
    previous: null
  };
};

export const getAstarGrid = (rows: number, cols: number): AstarNode[][] => {
  const grid = [];

  for (let row = 0; row < rows; row++) {
    const currentRow = [];

    for (let col = 0; col < cols; col++) {
      currentRow.push(createAstarNode(row, col));
    }
    grid.push(currentRow);
  }

  return grid;
};

export const createAstarNode = (row: number, col: number): AstarNode => {
  return {
    row,
    col,
    cost: 0,
    heuristic: 0,
    previous: null,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    isWall: false,
    isVisited: false
  };
};
