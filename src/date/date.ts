import * as dateFns from 'date-fns'
import memoize from 'fast-memoize'

export type DateOrISOString = string | Date

const today = new Date()

/**
 * Handles dates with the years omitted for privacy reasons.
 *
 * Ex.
 * --01-01 -> 2020-01-01
 */
export const fixYearlessDate = (dateString: string): string =>
  dateString && ~dateString.indexOf('--')
    ? `${today.getFullYear()}-${dateString.replace('--', '')}`
    : dateString

/**
 * Main entry point for parsing dates, and can take a Date object or date string.
 * If the date is invalid, it will default to now.
 */
export const parseISOString = (date: DateOrISOString): Date => {
  if (date instanceof Date) return date

  const parsedDate = dateFns.parseISO(fixYearlessDate(date))

  if (parsedDate.toString() === 'Invalid Date') {
    return new Date()
  }

  return parsedDate
}

/**
 * Formats a Date object or string to the given format
 */
export const formatDate = (date: DateOrISOString, format: string): string =>
  dateFns.format(parseISOString(date), format)

/**
 * Formats a Date object or string excluding time components
 *
 * Ex.
 * 2020-01-01
 */
export const formatServerDate = (date: DateOrISOString): string =>
  formatDate(date, 'yyyy-MM-dd')

export const shortTimeFormat = "h:mmaaaaa'm'"

/**
 * Formats a Date object or string to a readable short time format
 *
 * Ex.
 * 9:00a
 * 11:00p
 */
export const formatShortTime = (date: DateOrISOString): string =>
  formatDate(date, shortTimeFormat)

const longDateTimeFormat = `MMMM d, yyyy 'at' ${shortTimeFormat}`

/**
 * Formats a Date object or string to a readable date time format
 *
 * Ex.
 * January 1, 2020 at 9:00a
 */
export const formatLongDateTime = (date: DateOrISOString): string =>
  formatDate(date, longDateTimeFormat)

// for us, all day just means the duration is 23:59:59...
const allDaySeconds = 60 * 60 * 24 - 1

/**
 * Checks if the two Date objects or strings are the bounds for an all day range.
 * This is defined as having a 23:59:59 duration
 */
export const isAllDayRange = (
  start: DateOrISOString,
  end: DateOrISOString,
): boolean =>
  dateFns.differenceInSeconds(parseISOString(end), parseISOString(start)) ===
  allDaySeconds

/**
 * Checks if the two dates are within the day range of each other
 */
export const datesAreWithinDayRange = (
  firstDate: Date,
  secondDate: Date,
  allowedDayRange = 30,
): boolean =>
  Math.abs(dateFns.differenceInDays(firstDate, secondDate)) <= allowedDayRange

/**
 * Formats the date based on it's relativity to the now.
 *
 * Ex.
 * Today -> 9:00a
 * Yesterday -> Yesterday
 * Last week -> Monday
 * Current year -> Jan 1
 * Last year -> Jan 1, 2020
 */
export const formatRelativeDateTime = memoize((dateString: string): string => {
  const date = parseISOString(dateString)

  if (dateFns.isToday(date)) return formatShortTime(date)

  if (dateFns.isYesterday(date)) return 'Yesterday'

  if (dateFns.differenceInDays(today, date) <= 7)
    return dateFns.format(date, 'EEEE')

  if (dateFns.isThisYear(date)) return dateFns.format(date, 'MMM d')

  return dateFns.format(date, 'MMM d, yyyy')
})
