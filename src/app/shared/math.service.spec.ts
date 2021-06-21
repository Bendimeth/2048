import {TestBed} from '@angular/core/testing';
import {IListValues, MoveTo} from '../entities/IStoreService';

import {MathService} from './math.service';

describe('MathService', () => {
  let mockArray: IListValues[];
  beforeEach(() => {
    TestBed.configureTestingModule({});
    mockArray = [
      {value: 0}, {value: 2}, {value: 4}, {value: 8},
      {value: 16}, {value: 2}, {value: 0}, {value: 4},
      {value: 2}, {value: 2}, {value: 4}, {value: 8},
      {value: 2}, {value: 2}, {value: 4}, {value: 8},
    ];
  });
  it('should be created', () => {
    const service: MathService = TestBed.get(MathService);
    expect(service).toBeTruthy();
  });

  it('should return values based on given col number', () => {
    const fixture = TestBed.inject(MathService);

    expect(fixture.cutVertically(mockArray, 1)).toEqual([
      {value: 0}, {value: 16}, {value: 2}, {value: 2}
    ]);
  });

  const randomNumberCases = [
    [1, 15],
    [2, 16]
  ];
  test.each(randomNumberCases)('should assign new values to empty fields in given array', (quantity, expectedIndexes) => {
    const fixture = TestBed.inject(MathService);
    const mappedValues = mockArray.map(elem => elem.value);

    expect(fixture.generateRandomNumbers(quantity, mappedValues).map(result => result.index).includes(expectedIndexes)).toBeTruthy();
  });

  const sameArraysCases = [
    [true, [0, 0, 0], [0, 0, 0]],
    [false, [1, 0, 0], [2, 0, 0]]
  ];
  test.each(sameArraysCases)('should return %p on given arrays', (expectedResult: boolean, a: number[], b: number[]) => {
    const fixture = TestBed.inject(MathService);

    expect(fixture.areArraysTheSame(a, b)).toEqual(expectedResult);
  });

  const moveCases = [
    [[mockArray[0], mockArray[1], mockArray[2], mockArray[3]], [[mockArray[3], mockArray[2], mockArray[1], mockArray[0]]], MoveTo.Left],
    [[mockArray[0], mockArray[1], mockArray[2], mockArray[3]], [[mockArray[0], mockArray[1], mockArray[2], mockArray[3]]], MoveTo.Right]
  ];
  test.each(moveCases)('should return sorted array of values depending of the given move direction',
    (input: IListValues[], expectedResult: IListValues[], direction: MoveTo) => {
      const fixture = TestBed.inject(MathService);

      expect(fixture.sortArray(input, direction)).toEqual(expectedResult);
    });
});
