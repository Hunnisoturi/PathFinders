export interface Node {
  col: number;
  row: number;
  isFinish: boolean;
  isStart: boolean;
  isWall: boolean;
  distance: number;
  isVisited: boolean;
  previousNode: Node | null;
}

export interface AstarNode {
  col: number;
  row: number;
  cost: number;
  heuristic: number;
  previous: AstarNode;
}
