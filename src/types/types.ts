interface Node {
  row: number;
  col: number;
  isFinish: boolean;
  isStart: boolean;
  isWall: boolean;
  isVisited: boolean;
}

export interface DjikstraNode extends Node {
  distance: number;
  previous: DjikstraNode | null;
}

export interface AstarNode extends Node {
  cost: number;
  heuristic: number;
  previous: AstarNode | null;
}

export type NodeType = DjikstraNode | AstarNode;
