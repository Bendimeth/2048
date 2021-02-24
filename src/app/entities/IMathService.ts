import {GameStatus, IListValues} from './IStoreService';

export interface IRandomNumber {
  value: number;
  index: number;
}

export interface IMoveAction {
  listValues: IListValues[];
  status: GameStatus;
  currentMoveScore: number;
}

