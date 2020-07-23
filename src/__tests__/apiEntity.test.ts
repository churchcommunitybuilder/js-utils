import * as utils from '../apiEntity'

describe('#checkEntityAction', () => {
  test('should return the action', () => {
    expect(
      utils.checkEntityAction({ actions: { test: { allowed: true } } }, 'test'),
    ).toBe(true)
  })
})

describe('#checkEntityActionFactory', () => {
  test('should return a checker function', () => {
    const checker = utils.checkEntityActionFactory('test')

    expect(checker({ actions: { test: { allowed: true } } })).toBe(true)
  })
})
