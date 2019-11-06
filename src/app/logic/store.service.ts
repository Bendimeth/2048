import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {MathService} from "../shared/math.service";

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  constructor(private mathService: MathService) {
  }

  listChanged = new Subject<object>();

  private game = {
    list: Array(16),
    status: 'ok'
  };

  private onUpdate(): void {
    this.listChanged.next(this.game.list.slice());
  }

  fillList(): void {
    this.game.list.fill(0, 0, 16);
  }

  rollRandom(howMany: number, caller: string): void {
    const randomNumbers = this.mathService.generateRandomNumbers(howMany, this.game.list);

    if (randomNumbers[0].index === undefined && !this.mathService.isAnyMovePossible(this.game.list)) {
      return window.alert('game over');
    } else if (this.game.status === 'stuck' + caller) {
      return null;
    }

    for (const values of randomNumbers) {
      this.game.list[values.index] = values.value;
    }
    this.onUpdate();
  }

  initOrResetList(): void { // bind to new game btn
    this.fillList();
    this.rollRandom(2, 'init');
  }

  onMoveUp(): void {
    this.game = this.mathService.move(this.game.list.slice(), 'up');
    this.rollRandom(1, 'up');
  }

  onMoveDown(): void {
    this.game = this.mathService.move(this.game.list.slice(), 'down');
    this.rollRandom(1, 'down');
  }

  onMoveRight(): void {
    this.game = this.mathService.move(this.game.list.slice(), 'right');
    this.rollRandom(1, 'right');
  }

  onMoveLeft(): void {
    this.game = this.mathService.move(this.game.list.slice(), 'left');
    this.rollRandom(1, 'left');
  }

  getList(): Array<number> {
    return this.game.list;
  }
}
