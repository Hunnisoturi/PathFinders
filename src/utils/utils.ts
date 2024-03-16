import type { DjikstraNode, AstarNode, NodeType } from '../types/types';
import { v4 as uuid } from 'uuid';

export const START_NODE_COL: number = 10;
export const START_NODE_ROW: number = 15;
export const FINISH_NODE_ROW: number = 9;
export const FINISH_NODE_COL: number = 40;

export const isDjikstra = (obj: any): obj is DjikstraNode => {
  return typeof obj.distance === 'number';
};

export const isAstar = (obj: any): obj is AstarNode[][] => {
  return typeof obj.cost === 'number';
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

export const getNewGridWithWallToggled = (grid: NodeType[][], row: number, col: number) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];

  const newNode = {
    ...node,
    isWall: !node.isWall
  };

  newGrid[row][col] = newNode;
  return newGrid;
};

const nodeIsWall = () => {
  return Math.random() < 0.25 ? true : false;
};

export const createDjikstraNode = (col: number, row: number): DjikstraNode => {
  const isWall = nodeIsWall();
  const isStart = row === START_NODE_ROW && col === START_NODE_COL;
  const isFinish = row === FINISH_NODE_ROW && col === FINISH_NODE_COL;
  return {
    id: uuid(),
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    isWall: isWall && !isStart && !isFinish,
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
  const isWall = nodeIsWall();
  const isStart = row === START_NODE_ROW && col === START_NODE_COL;
  const isFinish = row === FINISH_NODE_ROW && col === FINISH_NODE_COL;

  return {
    id: uuid(),
    row,
    col,
    cost: 0,
    heuristic: 0,
    previous: null,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    isWall: isWall && !isStart && !isFinish,
    isVisited: false
  };
};
