import * as utils from '../number';

describe('#convertToInt', () => {
  describe('when the input is not a number', () => {
    describe('when a fallback value is provided', () => {
      test('should return the fallback value', () => {
        expect(utils.convertToInt('n', 1)).toBe(1);
      });
    });

    describe('when a fallback value is not provided', () => {
      test('should return 0', () => {
        expect(utils.convertToInt('n')).toBe(0);
      });
    });
  });

  describe('when the input is a number', () => {
    test('should convert the string to an integer', () => {
      expect(utils.convertToInt('1')).toBe(1);
    });
  });
});
