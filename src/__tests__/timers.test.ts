import * as timerUtils from '../timers'

describe('#debounce', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  test('should debounce multiple calls', () => {
    const fn = jest.fn()
    const debouncedFunc = timerUtils.debounce(fn)

    debouncedFunc()
    debouncedFunc()

    jest.runAllTimers()

    expect(clearTimeout).toHaveBeenCalled()
    expect(setTimeout).toHaveBeenCalledTimes(2)

    expect(fn).toHaveBeenCalledTimes(1)
  })
})

describe('#throttle', () => {
  test('should throttle the function calls', async () => {
    const duration = 10
    const fn = jest.fn()
    const debouncedFunc = timerUtils.throttle(fn, duration)

    debouncedFunc()
    debouncedFunc()
    expect(fn).toHaveBeenCalledTimes(1)

    await timerUtils.delay(duration)

    debouncedFunc()
    debouncedFunc()
    expect(fn).toHaveBeenCalledTimes(2)
  })
})
