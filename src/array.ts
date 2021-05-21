/**
 * Converts an item to an array
 */
export const toArray = <T extends unknown>(
  maybeArray: T,
): T extends any[] ? T : T[] => {
  if (Array.isArray(maybeArray)) {
    return maybeArray as any
  }

  return [maybeArray] as any
}

/**
 * Removes duplicate entries
 */
export const uniq = <A, B>(a: A[], b: B[]): (A | B)[] =>
  Array.from(new Set([...a, ...b]))
