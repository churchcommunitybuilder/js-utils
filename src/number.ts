export const convertToInt = (item: any, fallback = 0) => {
  const parsedInt = parseInt(item, 10)

  return Number.isNaN(parsedInt) ? fallback : parsedInt
}

export const ordinalize = (numberOrString: string | number) => {
  const number = convertToInt(numberOrString)

  if (!number) {
    return numberOrString
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
