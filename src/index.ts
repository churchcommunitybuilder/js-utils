import R from 'ramda';

const isStringAndEmpty = (str: any): boolean =>
  typeof str === 'string' && str.replace(/\s/g, '').length === 0;

export const hasValue = R.complement(
  R.anyPass([R.isEmpty, R.isNil, R.equals(false), isStringAndEmpty]),
);
