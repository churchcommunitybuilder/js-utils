import { AnyFunc } from './types/helpers';
declare const _default: <F extends AnyFunc<any>>(fn: F, duration?: number) => (...args: Parameters<F>) => void;
export default _default;
