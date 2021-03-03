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
