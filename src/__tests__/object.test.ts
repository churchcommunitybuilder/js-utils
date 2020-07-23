import * as utils from '../object'

describe('#valueIsTruthy', () => {
  describe('when the input is an object or array', () => {
    describe('when the input is empty', () => {
      test('should return true', () => {
        const objectHasValue = utils.valueIsTruthy({})
        const arrayHasValue = utils.valueIsTruthy([])

        expect(objectHasValue).toBe(false)
        expect(arrayHasValue).toBe(false)
      })
    })

    describe('when the input is not empty', () => {
      test('should return true', () => {
        const objectHasValue = utils.valueIsTruthy({ id: 1 })
        const arrayHasValue = utils.valueIsTruthy([1])

        expect(objectHasValue).toBe(true)
        expect(arrayHasValue).toBe(true)
      })
    })
  })

  describe('when the input is a string', () => {
    describe('when the string has length 0', () => {
      test('should return false', () => {
        expect(utils.valueIsTruthy('')).toBe(false)
      })
    })

    describe('when the string has length greater than 0', () => {
      test('should return true', () => {
        expect(utils.valueIsTruthy('t')).toBe(true)
      })
    })
  })

  describe('when the input is undefined', () => {
    test('should return true', () => {
      expect(utils.valueIsTruthy(undefined)).toBe(false)
    })
  })

  describe('when the input is null', () => {
    test('should return true', () => {
      expect(utils.valueIsTruthy(null)).toBe(false)
    })
  })

  describe('when the input is false', () => {
    test('should return true', () => {
      expect(utils.valueIsTruthy(false)).toBe(false)
    })
  })
})
