import type { Node } from '../types/types';

export const START_NODE_COL: number = 10;
export const START_NODE_ROW: number = 15;
export const FINISH_NODE_ROW: number = 10;
export const FINISH_NODE_COL: number = 35;

export const getInitialGrid = (rows: number, cols: number): Node[][] => {
  const grid = [];

  for (let row = 0; row < rows; row++) {
    const currentRow = [];
    for (let col = 0; col < cols; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

export const createNode = (col: number, row: number): Node => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    isWall: false,
    distance: Infinity,
    isVisited: false,
    previousNode: null
  };
};
