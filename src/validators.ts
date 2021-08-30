export type ValidatorTypes = 'email' | 'numeric'

export const isValid = (type: ValidatorTypes, string: string): boolean => {
  switch (type) {
    case 'numeric':
      return isValidNumeric(string)
    case 'email':
      return isValidEmail(string)
    default:
      return false
  }
}

export const isValidNumeric = (number: string): boolean =>
  Boolean(number.match(/^\d+$/))

export const isValidEmail = (email: string): boolean =>
  Boolean(
    email.match(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    ),
  )
