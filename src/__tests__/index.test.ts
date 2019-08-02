import * as utils from '../';

describe('#hasValue', () => {
  describe('when the input is an object or array', () => {
    describe('when the input is empty', () => {
      test('should return true', () => {
        const objectHasValue = utils.hasValue({});
        const arrayHasValue = utils.hasValue([]);

        expect(objectHasValue).toBe(false);
        expect(arrayHasValue).toBe(false);
      });
    });

    describe('when the input is not empty', () => {
      test('should return true', () => {
        const objectHasValue = utils.hasValue({ id: 1 });
        const arrayHasValue = utils.hasValue([1]);

        expect(objectHasValue).toBe(true);
        expect(arrayHasValue).toBe(true);
      });
    });
  });

  describe('when the input is a string', () => {
    describe('when the string has length 0', () => {
      test('should return false', () => {
        expect(utils.hasValue('')).toBe(false);
      });
    });

    describe('when the string has length greater than 0', () => {
      test('should return true', () => {
        expect(utils.hasValue('t')).toBe(true);
      });
    });
  });

  describe('when the input is undefined', () => {
    test('should return true', () => {
      expect(utils.hasValue(undefined)).toBe(false);
    });
  });

  describe('when the input is null', () => {
    test('should return true', () => {
      expect(utils.hasValue(null)).toBe(false);
    });
  });

  describe('when the input is false', () => {
    test('should return true', () => {
      expect(utils.hasValue(false)).toBe(false);
    });
  });
});
