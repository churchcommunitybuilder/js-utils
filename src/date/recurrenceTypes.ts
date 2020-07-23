import { EventRecurrenceFrequency } from '@churchcommunitybuilder/enums'

export const eventRecurrenceDays = {
  SU: 'Sunday',
  MO: 'Monday',
  TU: 'Tuesday',
  WE: 'Wednesday',
  TH: 'Thursday',
  FR: 'Friday',
  SA: 'Saturday',
} as const

export type RecurrenceDay = keyof typeof eventRecurrenceDays

export interface Recurrence {
  end: string
  frequency: EventRecurrenceFrequency
  frequencyModifier: string
  interval: string
}
