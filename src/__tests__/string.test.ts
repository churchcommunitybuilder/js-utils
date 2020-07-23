import * as stringUtils from '../string'

describe('#capitalize', () => {
  test('should capitalize the string', () => {
    expect(stringUtils.capitalize('test test test')).toBe('Test test test')
  })
})

describe('#toTitleCase', () => {
  test('should title case the string', () => {
    const titleString = stringUtils.toTitleCase('test test test')

    expect(titleString).toBe('Test Test Test')
  })
})

describe('#getInitials', () => {
  test('should return the initials', () => {
    expect(stringUtils.getInitials('alex beckwith')).toBe('AB')
  })
})
