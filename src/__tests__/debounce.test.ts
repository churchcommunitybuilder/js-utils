import debounce from '../debounce';

describe('#debounce', () => {
  test('should debounce multiple calls', () => {
    jest.useFakeTimers();

    const fn = jest.fn();
    const debouncedFunc = debounce(fn);

    debouncedFunc();
    debouncedFunc();

    jest.runAllTimers();

    expect(clearTimeout).toHaveBeenCalled();
    expect(setTimeout).toHaveBeenCalledTimes(2);

    expect(fn).toHaveBeenCalledTimes(1);
  });
});
