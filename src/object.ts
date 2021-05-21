import memoize from 'fast-memoize'

import { uniq } from './array'

type AnyObject = Record<any, any>

/**
 * Checks if the object is empty
 */
export const isEmptyObject = (obj: AnyObject): boolean =>
  Object.keys(obj).length === 0

/**
 * Checks deep equality for two objects.
 *
 * NOTE: This only works with objects, arrays, or primitives
 */
export const objectsAreEqual = (a: AnyObject, b: AnyObject): boolean => {
  const aKeys = Object.keys(a)
  const bKeys = Object.keys(b)

  if (aKeys.length !== bKeys.length) return false

  const allKeys = uniq(aKeys, bKeys)

  const firstDifferentKey = allKeys.find((key) => {
    const aValue = a[key]
    const bValue = b[key]

    if (typeof aValue === 'object' && typeof bValue === 'object') {
      return !objectsAreEqual(aValue, bValue)
    }

    return aValue !== bValue
  })

  return firstDifferentKey === undefined
}

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
