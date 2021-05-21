import * as utils from '../object'

describe('#isEmptyObject', () => {
  describe('when the object is empty', () => {
    test('should return true', () => {
      expect(utils.isEmptyObject({})).toBe(true)
    })
  })

  describe('when the object is not empty', () => {
    test('should return false', () => {
      expect(utils.isEmptyObject({ x: 1 })).toBe(false)
    })
  })
})

describe('#objectsAreEqual', () => {
  describe('when the objects are equal', () => {
    test('should return true', () => {
      const inputA = { x: 1, y: { z: 2 } }
      const inputB = { x: 1, y: { z: 2 } }

      expect(utils.objectsAreEqual(inputA, inputB)).toBe(true)
      expect(utils.objectsAreEqual(inputB, inputA)).toBe(true)
    })
  })

  describe('when the objects are equal', () => {
    test('should return false', () => {
      const inputA = { x: 1, y: { z: 3 } }
      const inputB = { x: 1, y: { z: 2 } }

      expect(utils.objectsAreEqual(inputA, inputB)).toBe(false)
      expect(utils.objectsAreEqual(inputB, inputA)).toBe(false)
    })
  })

  describe('when a key is omitted', () => {
    test('should return false', () => {
      const inputA = { x: 1, y: {} }
      const inputB = { x: 1, y: { z: 2 } }

      expect(utils.objectsAreEqual(inputA, inputB)).toBe(false)
      expect(utils.objectsAreEqual(inputB, inputA)).toBe(false)
    })
  })
})

describe('#mapObject', () => {
  test('should map the object', () => {
    const input = { x: 1, y: 2 }
    const output = utils.mapObject(
      (value, key) => (key === 'x' ? value + 1 : value + 2),
      input,
    )

    expect(output).toEqual({ x: 2, y: 4 })
  })
})

describe('#mapObjectKeys', () => {
  test('should map the object keys', () => {
    const input = { x: 1, y: 2 }
    const output = utils.mapObjectKeys(
      (key) => (key === 'x' ? 'a' : 'b'),
      input,
    )

    expect(output).toEqual({ a: 1, b: 2 })
  })
})
