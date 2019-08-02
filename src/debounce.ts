import { AnyFunc } from './types/helpers';

export default <F extends AnyFunc>(fn: F, duration = 250) => {
  let timeout: number;

  return (...args: Parameters<F>) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => fn(...args), duration);
  };
};
