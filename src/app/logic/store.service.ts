import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

import {GameStatus, IStoreReducer, MoveTo} from '../entities/IStoreService';

import {MathService} from '../shared/math.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  constructor(private mathService: MathService) {
  }

  listChanged = new Subject<IStoreReducer>();

  private state: IStoreReducer = {
    status: GameStatus.InProgress,
    listValues: [],
    sessionScore: 0,
    bestScore: 0
  };

  private onUpdate(): void {
    this.listChanged.next(this.state);
  }

  rollRandom(howMany: number): void {
    if (this.state.status === GameStatus.InProgress) {
      const randomNumbers = this.mathService.generateRandomNumbers(howMany, this.state.listValues.map(cell => cell.value));
      for (const values of randomNumbers) {
        this.state.listValues[values.index] = {
          created: true,
          value: values.value,
          destroyed: false
        };
      }
    }

    if (this.state.listValues.filter(cell => cell.value === 0)?.length === 0 &&
      !this.mathService.isAnyMovePossible(this.state.listValues.map(cell => cell.value))) {
      this.state = {
        ...this.state,
        status: GameStatus.Finished
      };
    }
    this.onUpdate();
  }

  initOrResetList(): void {
    this.state = {
      listValues: new Array(16).fill(0, 0, 16).map(value => ({
        value
      })),
      bestScore: this.state.sessionScore > this.state.bestScore ? this.state.sessionScore : this.state.bestScore,
      sessionScore: 0,
      status: GameStatus.InProgress
    };
    this.rollRandom(2);
  }

  onMove(direction: MoveTo): void {
    const result = this.mathService.move(this.state.listValues.slice(), direction);
    this.state = {
      ...result,
      sessionScore: this.state.sessionScore += result.currentMoveScore,
      bestScore: this.state.bestScore
    };
    this.rollRandom(1);
  }

  getState(): IStoreReducer {
    return this.state;
  }
}
