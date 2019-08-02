import * as utils from '../array';

describe('#toArray', () => {
  describe('when the input is an array', () => {
    test('should return the array', () => {
      const input = [1];

      expect(utils.toArray(input)).toBe(input);
    });
  });

  describe('when the input is not an array', () => {
    test('should return the the input as an array', () => {
      expect(utils.toArray(1)).toEqual([1]);
    });
  });
});
