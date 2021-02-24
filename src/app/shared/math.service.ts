import {Injectable} from '@angular/core';

import {GameStatus, IListValues, MoveTo} from '../entities/IStoreService';
import {IMoveAction, IRandomNumber} from '../entities/IMathService';

@Injectable({
  providedIn: 'root'
})
export class MathService {
  currentMoveScore = 0;

  generateRandomNumbers(quantity: number, array: number[]): IRandomNumber[] {
    const filtered = array
      .map((el, index) => el === 0 ? index : -1)
      .filter((el) => el !== -1);
    const randomNumbers = [];

    for (let i = 0; i < quantity; i++) {
      const index = filtered[Math.floor(Math.random() * filtered.length)];
      const value = Math.random() > 0.5 ? 4 : 2;
      randomNumbers.push({index, value});
    }
    return randomNumbers;
  }

  cutVertically(array: IListValues[], col: number): IListValues[] {
    const result = [];
    for (let i = col - 1; i < array.length; i += 4) {
      result.push(array[i]);
    }
    return result;
  }

  areArraysTheSame(a: number[], b: number[]): boolean {
    return a.find((elem, index) => elem !== b[index]) === undefined;
  }

  sortArray(array: IListValues[], direction: MoveTo): IListValues[] {
    const listValues: IListValues[] = [];
    let usedIndexes = 0;
    const dataCopy = (direction === MoveTo.Bottom || direction === MoveTo.Right) ? array.slice().reverse() : array.slice();
    dataCopy.filter(elem => elem.value > 0).forEach((elem, index, row) => {
      if (usedIndexes <= index ) {
        if (elem.value === row[index + 1]?.value) {
          listValues.push({
            updated: true,
            moved: true,
            direction,
            value: elem.value * 2
          });
          this.currentMoveScore += elem.value * 3;
          usedIndexes = index + 2;
        } else {
          listValues.push({
            value: elem.value,
            moved: dataCopy[index]?.value !== elem.value,
            direction
          });
        }
      }
    });
    for (let i = listValues.length; i < 4; i++) {
      listValues.push({
        value: 0,
        destroyed: dataCopy[i]?.value > 0 && !listValues[i]?.value
      });
    }
    return direction === MoveTo.Right || direction === MoveTo.Bottom ? listValues.reverse() : listValues;
  }

  isAnyMovePossible(array: number[]): boolean {
    return array.filter((item, index) =>
      (
        (index !== 3 && index !== 7 && index !== 11 && array[index + 1] === item) ||
        (array[index + 4] === item)
      )).length !== 0;
  }

  matrixTranspositionOnFlatArray(listValues: IListValues[]): IListValues[] {
    const towDimensionalArray: IListValues[][] = [[], [], [], []];
    listValues.forEach(
      (el, idx) => {
        if ([0, 4, 8, 12].indexOf(idx) !== -1) {
          towDimensionalArray[0].push(el);
        } else if ([1, 5, 9, 13].indexOf(idx) !== -1) {
          towDimensionalArray[1].push(el);
        } else if ([2, 6, 10, 14].indexOf(idx) !== -1) {
          towDimensionalArray[2].push(el);
        } else if ([3, 7, 11, 15].indexOf(idx) !== -1) {
          towDimensionalArray[3].push(el);
        }
      }
    );
    return towDimensionalArray.reduce((result, row) => ([...result, ...row]), []);
  }

  move(array: IListValues[], direction: MoveTo): IMoveAction {
    this.currentMoveScore = 0;
    if (direction === MoveTo.Top || direction === MoveTo.Bottom) {
      const combinedColumns = this.matrixTranspositionOnFlatArray([
        ...this.sortArray(this.cutVertically(array, 1), direction),
        ...this.sortArray(this.cutVertically(array, 2), direction),
        ...this.sortArray(this.cutVertically(array, 3), direction),
        ...this.sortArray(this.cutVertically(array, 4), direction)
      ]);
      const columnValues = combinedColumns.map(cell => cell.value);

      return {
        status: this.areArraysTheSame(columnValues, array.map(cell => cell.value)) ? GameStatus.Stuck : GameStatus.InProgress,
        listValues: combinedColumns,
        currentMoveScore: this.currentMoveScore
      };
    } else {
      const combinedRows = [
        ...this.sortArray(array.slice(0, 4), direction),
        ...this.sortArray(array.slice(4, 8), direction),
        ...this.sortArray(array.slice(8, 12), direction),
        ...this.sortArray(array.slice(12, 16), direction)
      ];
      const rowsValues = combinedRows.map(row => row.value);

      return {
        status: this.areArraysTheSame(rowsValues, array.map(cell => cell.value)) ? GameStatus.Stuck : GameStatus.InProgress,
        listValues: combinedRows,
        currentMoveScore: this.currentMoveScore
      };
    }
  }
}
