import memoize from 'fast-memoize'

/**
 * Checks if the object is empty
 */
export const isEmptyObject = (obj: Record<any, any>): boolean =>
  Object.keys(obj).length === 0

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
