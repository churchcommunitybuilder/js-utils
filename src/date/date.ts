import * as dateFns from 'date-fns'
import memoize from 'fast-memoize'

export type DateOrISOString = string | Date

const today = new Date()

export const fixYearlessDate = (dateString: string) =>
  dateString && ~dateString.indexOf('--')
    ? `${today.getFullYear()}-${dateString.replace('--', '')}`
    : dateString

export const parseISOString = (date: DateOrISOString) => {
  if (date instanceof Date) return date

  const parsedDate = dateFns.parseISO(fixYearlessDate(date))

  if (parsedDate.toString() === 'Invalid Date') {
    return new Date()
  }

  return parsedDate
}

export const formatDate = (date: DateOrISOString, format: string) =>
  dateFns.format(parseISOString(date), format)

export const formatServerDate = (date: DateOrISOString) =>
  formatDate(date, 'yyyy-MM-dd')

export const shortTimeFormat = "h:mmaaaaa'm'"
export const formatShortTime = (date: DateOrISOString) =>
  formatDate(date, shortTimeFormat)

const longDateTimeFormat = `MMMM d, yyyy 'at' ${shortTimeFormat}`
export const formatLongDateTime = (date: DateOrISOString) =>
  formatDate(date, longDateTimeFormat)

// for us, all day just means the duration is 23:59:59...
const allDaySeconds = 60 * 60 * 24 - 1
export const isAllDayRange = (start: DateOrISOString, end: DateOrISOString) =>
  dateFns.differenceInSeconds(parseISOString(end), parseISOString(start)) ===
  allDaySeconds

export const datesAreWithinDayRange = (
  firstDate: Date,
  secondDate: Date,
  allowedDayRange = 30,
) => {
  const firstDayOfYear = dateFns.getDayOfYear(firstDate)
  const secondyDayOfYear = dateFns.getDayOfYear(secondDate)
  const diff = Math.abs(firstDayOfYear - secondyDayOfYear)

  /**
   * if the diff is less than the allowed range, we can stop there
   * otherwise we should make sure that we compare against days in the previous or following year
   */
  return diff <= allowedDayRange || 365 - diff <= allowedDayRange
}

export const formatRelativeDateTime = memoize((dateString: string) => {
  const date = parseISOString(dateString)

  if (dateFns.isToday(date)) return formatShortTime(date)

  if (dateFns.isYesterday(date)) return 'Yesterday'

  if (dateFns.differenceInDays(today, date) <= 7)
    return dateFns.format(date, 'EEEE')

  if (dateFns.isThisYear(date)) return dateFns.format(date, 'MMM d')

  return dateFns.format(date, 'MMM d, yyyy')
})
