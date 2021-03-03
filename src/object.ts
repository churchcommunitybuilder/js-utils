import memoize from 'fast-memoize'
import R from 'ramda'

const isStringAndEmpty = (str: any): boolean =>
  typeof str === 'string' && str.replace(/\s/g, '').length === 0

export const valueIsFalsey = R.anyPass([
  R.isEmpty,
  R.isNil,
  R.equals(false),
  isStringAndEmpty,
])

/**
 * Returns false if a value is:
 * An empty object
 * Null or Undefined
 * A boolean of false
 * An empty string
 */
export const valueIsTruthy = R.complement(valueIsFalsey)

/**
 * Turns an array in to an object with numeric keys
 */
export const toObject = memoize(
  <O extends any[] | Record<string, unknown>>(maybeObject: O) => {
    if (Array.isArray(maybeObject)) {
      return { ...maybeObject }
    }

    return maybeObject
  },
)

/**
 * Maps over an object's values and returns the an object of the same shape, with
 * the values updated
 */
export const mapObject = <
  EntryValue,
  MappedEntryValue,
  EntryKey extends string
>(
  cb: (value: EntryValue, key: EntryKey, index: number) => MappedEntryValue,
  obj: Record<EntryKey, EntryValue>,
): Record<EntryKey, MappedEntryValue> => {
  const mappedEntries = Object.entries<EntryValue>(
    obj,
  ).map(([key, value], index) => [key, cb(value, key as EntryKey, index)])

  return Object.fromEntries(mappedEntries)
}

/**
 * Maps over an object's keys and returns the an object of the same shape, with
 * the keys updated
 */
export const mapObjectKeys = <
  EntryValue,
  EntryKey extends string,
  MappedEntryKey extends string
>(
  cb: (key: EntryKey, value: EntryValue, index: number) => MappedEntryKey,
  obj: Record<EntryKey, EntryValue>,
): Record<MappedEntryKey, EntryValue> => {
  const mappedEntries = Object.entries<EntryValue>(
    obj,
  ).map(([key, value], index) => [cb(key as EntryKey, value, index), value])

  return Object.fromEntries(mappedEntries)
}
