import { AnyFunc } from './types'

export default <F extends AnyFunc>(fn: F, duration = 250) => {
  let timeout: any

  return (...args: Parameters<F>) => {
    if (timeout) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(() => fn(...args), duration)
  }
}
