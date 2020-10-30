import * as utils from '../number'

describe('#convertToInt', () => {
  describe('when the input is not a number', () => {
    test('should return null', () => {
      expect(utils.convertToInt('n')).toBeNull()
    })
  })

  describe('when the input is a number', () => {
    test('should convert the string to an integer', () => {
      expect(utils.convertToInt('1')).toBe(1)
    })
  })
})
