import { AnyFunc } from './types';

export default <F extends AnyFunc>(fn: F, duration = 250) => {
  let timeout: number;

  return (...args: Parameters<F>) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = <any>setTimeout(() => fn(...args), duration);
  };
};
