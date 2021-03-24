/**
 * Similar to Number.parseInt but automatically handles NaN
 */
export const convertToInt = <ReturnType = number>(
  item: any,
  fallback: number | ReturnType = 0,
): number | ReturnType => {
  const parsedInt = parseInt(item, 10)

  return Number.isNaN(parsedInt) ? fallback : parsedInt
}

/**
 * Ordinalizes the input
 *
 * Ex.
 * 1 -> 1st
 * 11 -> 11th
 */
export const ordinalize = (numberOrString: string | number): string => {
  const number = convertToInt(numberOrString)

  if (!number) {
    return numberOrString as string
  }

  let suffix

  if (number > 3 && number < 21) {
    suffix = 'th'
  } else {
    switch (number % 10) {
      case 1:
        suffix = 'st'
        break
      case 2:
        suffix = 'nd'
        break
      case 3:
        suffix = 'rd'
        break
      default:
        suffix = 'th'
        break
    }
  }

  return `${number}${suffix}`
}

export const restrictToRange = (
  value: number,
  min?: number,
  max?: number,
): number => {
  if (min !== undefined && value < min) {
    return min
  }

  if (max !== undefined && value > max) {
    return max
  }

  return value
}
