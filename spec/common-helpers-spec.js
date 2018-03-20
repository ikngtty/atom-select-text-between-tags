'use babel';

import CommonHelpers from '../lib/helpers/common-helpers';

describe('CommonHelpers', () => {
  describe('overwriteArray', () => {
    it('does', () => {
      expect(CommonHelpers.overwriteArray([10, 20], [100, undefined, 300]))
        .toEqual([100, 20, 300]);
      expect(CommonHelpers.overwriteArray([10, undefined, 30], [100, 200]))
        .toEqual([100, 200, 30]);
    });
  });

  describe('range', () => {
    it('throw errors when arguments are invalid', () => {
      expect(() => CommonHelpers.range())
        .toThrow('No arguments.');

      expect(() => CommonHelpers.range(1, 2, 3, 4))
        .toThrow('Too many arguments.');
      expect(() => CommonHelpers.range(1, 2, 3, 4, 5))
        .toThrow('Too many arguments.');

      expect(() => CommonHelpers.range(1, 2, 0))
        .toThrow('An endless loop.');
    });

    it('does', () => {
      expect(CommonHelpers.range(5)).toEqual([0, 1, 2, 3, 4, 5]);
      expect(CommonHelpers.range(5, 10)).toEqual([5, 6, 7, 8, 9, 10]);

      expect(CommonHelpers.range( 5,  11,  2)).toEqual([ 5,  7,  9,  11]);
      expect(CommonHelpers.range( 5,  12,  2)).toEqual([ 5,  7,  9,  11]);
      expect(CommonHelpers.range(-5, -11, -2)).toEqual([-5, -7, -9, -11]);
      expect(CommonHelpers.range(-5, -12, -2)).toEqual([-5, -7, -9, -11]);
      expect(CommonHelpers.range( 3,  -3, -2)).toEqual([ 3,  1, -1,  -3]);

      expect(CommonHelpers.range( 5,  5,  1)).toEqual([ 5]);
      expect(CommonHelpers.range( 5,  4,  1)).toEqual([]);
      expect(CommonHelpers.range(-5, -5, -1)).toEqual([-5]);
      expect(CommonHelpers.range(-5, -4, -1)).toEqual([]);
    });
  });

  describe('times', () => {
    it('does', () => {
      let num0 = 0;
      CommonHelpers.times(0, () => num0++);
      expect(num0).toBe(0);

      let num1 = 0;
      CommonHelpers.times(1, () => num1++);
      expect(num1).toBe(1);

      let num2 = 0;
      CommonHelpers.times(2, () => num2++);
      expect(num2).toBe(2);
    });
  });

  describe('last', () => {
    it('does', () => {
      expect(CommonHelpers.last([])).toBe(undefined);
      expect(CommonHelpers.last([10])).toBe(10);
      expect(CommonHelpers.last([10, 20])).toBe(20);
      expect(CommonHelpers.last([10, 20, 30])).toBe(30);
    });
  });
});
