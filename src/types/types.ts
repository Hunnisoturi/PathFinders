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
