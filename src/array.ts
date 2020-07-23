export const toArray = <T extends unknown>(maybeArray: T): T[] => {
  if (Array.isArray(maybeArray)) {
    return maybeArray
  }

  return [maybeArray]
}
