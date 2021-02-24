export enum GameStatus {
  InProgress,
  Stuck,
  Finished
}

export enum MoveTo {
  Top,
  Right,
  Bottom,
  Left
}

export interface IListValues {
  updated?: boolean;
  created?: boolean;
  moved?: boolean;
  destroyed?: boolean;
  direction?: MoveTo;
  value: number;
}

export interface IStoreReducer {
  listValues: IListValues[];
  status: GameStatus;
  sessionScore: number;
  bestScore: number;
}
