import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MathService {

  generateRandomNumbers(quantity: number, array: Array<number>) {
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

  cutVertically(array, col) {
    const result = [];

    for (let i = col - 1; i < array.length; i += 4) {
      result.push(array[i]);
    }
    return result;
  }

  compareArrays(first, second) {
    let counter = 0;

    first.map(
      (el, idx) => {
        if (el === second[idx]) {
          counter++;
        }
      }
    );

    return counter === first.length ? 'stuck' : 'ok';
  }

  sortArray(array, leftOrRight: string) {
    const initSorted = [];
    let counter = 0;

    if (leftOrRight === 'right' || leftOrRight === 'down') {
      array = array.reverse();
    }

    array.map(
      (el, idx, arr) => {
        if (el !== 0) {
          for (let i = idx; i < arr.length; i++) {
            if (el === arr[i + 1]) {
              initSorted.push(el + arr[i + 1]);
              arr[i + 1] = 0;
              break;
            } else if (i + 1 >= arr.length) {
              initSorted.push(el);
            } else if (arr[i + 1]) {
              initSorted.push(el);
              break;
            }
          }
        } else {
          counter++;
        }
      }
    );

    for (let i = 0; i < counter; i++) {
      initSorted.push(0);
    }

    return leftOrRight === 'right' || leftOrRight === 'down' ? initSorted.reverse() : initSorted;
  }

  isAnyMovePossible(array: Array<number>): boolean {
    return array.reduce((acc, el, idx, arr) => {
      return acc || ((arr[idx + 1] !== undefined && arr[idx + 1] === el) || (arr[idx + 4] !== undefined && arr[idx + 4] === el));
    }, false);
  }

  move(array, direction: string) {
    if (direction === 'up' || direction === 'down') {

      const col1 = this.sortArray(this.cutVertically(array, 1), direction);
      const col2 = this.sortArray(this.cutVertically(array, 2), direction);
      const col3 = this.sortArray(this.cutVertically(array, 3), direction);
      const col4 = this.sortArray(this.cutVertically(array, 4), direction);

      const colEnd1 = [];
      const colEnd2 = [];
      const colEnd3 = [];
      const colEnd4 = [];

      col1.concat(col2, col3, col4).map(
        (el, idx) => {
          if ([0, 4, 8, 12].indexOf(idx) !== -1) {
            colEnd1.push(el);
          } else if ([1, 5, 9, 13].indexOf(idx) !== -1) {
            colEnd2.push(el);
          } else if ([2, 6, 10, 14].indexOf(idx) !== -1) {
            colEnd3.push(el);
          } else if ([3, 7, 11, 15].indexOf(idx) !== -1) {
            colEnd4.push(el);
          }
        }
      );

      return {
        list: colEnd1.concat(colEnd2, colEnd3, colEnd4),
        status: this.compareArrays(colEnd1.concat(colEnd2, colEnd3, colEnd4), array) + direction
      };

    } else {
      const row1 = this.sortArray(array.slice(0, 4), direction);
      const row2 = this.sortArray(array.slice(4, 8), direction);
      const row3 = this.sortArray(array.slice(8, 12), direction);
      const row4 = this.sortArray(array.slice(12, 16), direction);

      return {
        list: row1.concat(row2, row3, row4),
        status: this.compareArrays(row1.concat(row2, row3, row4), array) + direction
      };
    }
  }
}
