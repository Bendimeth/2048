import { TestBed } from '@angular/core/testing';
import { IListValues } from '../entities/IStoreService';

import { MathService } from './math.service';

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

  // const randomNumberCases = [
  //   [1, 15],
  //   [2, 16]
  // ];
  // test.each(randomNumberCases)('should assign new values to empty fields in given array', (quantity, expectedNumberOfNonEmptyValues) => {
  //   const fixture = TestBed.inject(MathService);
  //   const mappedValues = mockArray.map(elem => elem.value);
  //
  //   expect(fixture.generateRandomNumbers(quantity, mappedValues)).toBeTruthy();
  // });
});
