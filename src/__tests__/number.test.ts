import * as utils from '../number'

describe('#convertToInt', () => {
  describe('when the input is not a number', () => {
    describe('when a fallback value is provided', () => {
      test('should return the fallback value', () => {
        expect(utils.convertToInt('n', 1)).toBe(1)
      })
    })

    describe('when a fallback value is not provided', () => {
      test('should return 0', () => {
        expect(utils.convertToInt('n')).toBe(0)
      })
    })
  })

  describe('when the input is a number', () => {
    test('should convert the string to an integer', () => {
      expect(utils.convertToInt('1')).toBe(1)
    })
  })
})

describe('restrictToRange', () => {
  describe('when min and max provided', () => {
    test('should allow within range', () => {
      expect(utils.restrictToRange(4, 3, 6)).toBe(4)
    })
    test('should restrict to max', () => {
      expect(utils.restrictToRange(9, 3, 6)).toBe(6)
    })
    test('should restrict to min', () => {
      expect(utils.restrictToRange(1, 3, 6)).toBe(3)
    })
    test('should work for min of 0', () => {
      expect(utils.restrictToRange(-10, 0, 6)).toBe(0)
    })
    test('should work for max of 0', () => {
      expect(utils.restrictToRange(10, -12, 0)).toBe(0)
    })
  })
  describe('when only max provided', () => {
    test('should allow within range', () => {
      expect(utils.restrictToRange(4, undefined, 6)).toBe(4)
    })
    test('should restrict to max', () => {
      expect(utils.restrictToRange(9, undefined, 6)).toBe(6)
    })
    test('should not restrict to min', () => {
      expect(utils.restrictToRange(1, undefined, 6)).toBe(1)
    })
  })
  describe('when only min provided', () => {
    test('should allow within range', () => {
      expect(utils.restrictToRange(4, 3)).toBe(4)
    })
    test('should not restrict to max', () => {
      expect(utils.restrictToRange(9, 3)).toBe(9)
    })
    test('should restrict to min', () => {
      expect(utils.restrictToRange(1, 3)).toBe(3)
    })
  })
  describe('when no range provided', () => {
    test('should allow any number', () => {
      expect(utils.restrictToRange(42)).toBe(42)
      expect(utils.restrictToRange(-42)).toBe(-42)
    })
  })
})
