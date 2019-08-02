import * as stringUtils from '../string';

describe('#toTitleCase', () => {
  test('should title case the string', () => {
    const titleString = stringUtils.toTitleCase('test test test');

    expect(titleString).toBe('Test Test Test');
  });
});
