import { EventRecurrenceFrequency } from '@churchcommunitybuilder/enums'

import { listToCsv } from '../string'
import { ordinalize, convertToInt } from '../number'
import { formatDate } from './date'
import * as types from './recurrenceTypes'

const infiniteRecurrencePlaceholder = '20311231'

/**
 * Formats a recurrence to a human readable string
 */
export const formatRecurrence = (
  recurrence?: types.Recurrence,
): string | null => {
  if (!recurrence) return null

  const {
    end: recurrenceEnd,
    frequency: recurrenceFrequency,
    frequencyModifier,
    interval: intervalString,
  } = recurrence
  const interval = convertToInt(intervalString) ?? 0

  let recurrenceRules: any[] = []
  let frequency = null
  const end =
    recurrenceEnd === infiniteRecurrencePlaceholder
      ? null
      : `until ${formatDate(recurrenceEnd, 'MMM d, yyyy')}`

  switch (recurrenceFrequency) {
    case EventRecurrenceFrequency.Daily:
      recurrenceRules = ['days', 'daily']
      break
    case EventRecurrenceFrequency.Weekly:
      recurrenceRules = ['weeks on', 'weekly on']

      if (frequencyModifier.length > 1) {
        const days = frequencyModifier
          .split(' ')
          .map(
            (day: unknown) =>
              types.eventRecurrenceDays[day as types.RecurrenceDay],
          )

        frequency = listToCsv(days)
      }

      break
    case EventRecurrenceFrequency.MonthlyByDate:
      recurrenceRules = ['months on the', 'monthly on the']
      frequency = ordinalize(frequencyModifier)
      break
    case EventRecurrenceFrequency.MonthlyByDay:
      const days =
        frequencyModifier
          .replace(/1-/g, 'last')
          .replace(/([A-Z]{2})(?=.*\1)|[+|-]/g, '')
          .match(/(\w+\s([A-Z]{2})?)/g)
          ?.map((pattern) => {
            const [number, day] = pattern.split(' ') as [string, unknown]
            return `${ordinalize(number)} ${
              types.eventRecurrenceDays[day as types.RecurrenceDay] ?? ''
            }`
          }, '') ?? []

      recurrenceRules = ['months on the', 'monthly on the']
      frequency = listToCsv(days)
      break
    default:
      break
  }

  const recurrenceRule =
    interval > 1
      ? `every ${interval} ${recurrenceRules[0]}`
      : recurrenceRules[1]

  const text = [recurrenceRule, frequency, end].filter((x) => !!x).join(' ')

  return `Repeats ${text}`
}
