import R from 'ramda'

export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.toLowerCase().slice(1)

export const toTitleCase = (str: string) =>
  str
    .toLowerCase()
    .split(' ')
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

export const getInitials = (name: string) => {
  if (!name) return ''

  const [firstName, ...otherNames] = name.split(' ')
  const lastName = R.last(otherNames)

  if (typeof firstName === 'string' && typeof lastName === 'string') {
    const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()

    if (initials.length === 2) return initials
  }

  return ''
}

export const splitPascalCase = (str: string) => {
  const matches = str.match(/([a-z]*)([A-Z]*?)([A-Z][a-z]+)/g)

  return matches ? matches.join(' ') : str
}

export const listToCsv = (list: any[], conjunction = 'and') => {
  const replace = list.length > 2 ? `$1 ${conjunction}` : ` ${conjunction}`

  return list.join(', ').replace(/(,(?=[^,]*$))/g, replace)
}
