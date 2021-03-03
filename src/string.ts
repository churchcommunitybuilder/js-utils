import R from 'ramda'

/**
 * Capitalizes the input. If preserveCasing is true, it will leave the casing
 * for the rest of the string unchanged
 */
export const capitalize = (txt: string, preserveCasing = false): string => {
  const firstChar = txt.charAt(0).toUpperCase()
  const rest = preserveCasing ? txt : txt.toLowerCase()

  return `${firstChar}${rest.slice(1)}`
}

/**
 * Turns a sentence or word into title case
 *
 * Ex.
 * some value -> Some Value
 */
export const toTitleCase = (str: string): string =>
  str
    .toLowerCase()
    .split(' ')
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

/**
 * Gets the initials for a given name
 *
 * Ex.
 * Alex Beckwith -> AB
 */
export const getInitials = (name: string): string => {
  if (!name) return ''

  const [firstName, ...otherNames] = name.split(' ')
  const lastName = R.last(otherNames)

  if (typeof firstName === 'string' && typeof lastName === 'string') {
    const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()

    if (initials.length === 2) return initials
  }

  return ''
}

/**
 * Turns a pascal case string into a space separated string
 *
 * Ex.
 * SomeValue -> Some Value
 */
export const splitPascalCase = (str: string): string => {
  const matches = str.match(/([a-z]*)([A-Z]*?)([A-Z][a-z]+)/g)

  return matches ? matches.join(' ') : str
}

/**
 * Joins a list of values by the given conjunction, with an oxford comma when necessary
 *
 * Ex.
 * [1] -> 1
 * [1, 2] -> 1 and 2
 * [1, 2, 3] -> 1, 2, and 3
 */
export const listToCsv = (list: any[], conjunction = 'and'): string => {
  const replace = list.length > 2 ? `$1 ${conjunction}` : ` ${conjunction}`

  return list.join(', ').replace(/(,(?=[^,]*$))/g, replace)
}
