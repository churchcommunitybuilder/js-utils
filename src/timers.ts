import { AnyFunc } from './types'

/**
 * An async function to wait for a given duration
 */
export const delay = (duration: number): Promise<void> =>
  new Promise((r) => {
    setTimeout(r, duration)
  })

/**
 * Debounces the given function for the duration given.
 * This will call the function only after the duration has expired
 * with no new calls
 */
export const debounce = <Fn extends AnyFunc>(
  fn: Fn,
  duration = 250,
): ((...args: Parameters<Fn>) => void) => {
  let timeout: any

  return (...args) => {
    if (timeout) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(() => fn(...args), duration)
  }
}

/**
 * Throttles the given function for the duration given.
 * This will only allow the function to execute once in the given
 * duration
 */
export const throttle = <Fn extends AnyFunc>(
  fn: Fn,
  throttleDuration = 250,
): ((...args: Parameters<Fn>) => void) => {
  let lastTime = 0

  return (...args) => {
    const now = Date.now()
    if (now - lastTime >= throttleDuration) {
      fn(...args)
      lastTime = now
    }
  }
}
