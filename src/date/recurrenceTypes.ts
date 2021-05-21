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

export enum EventRecurrenceFrequency {
  Daily = 'D',
  Weekly = 'W',
  MonthlyByDate = 'MD',
  MonthlyByDay = 'MP',
}

export interface Recurrence {
  end: string
  frequency: EventRecurrenceFrequency
  frequencyModifier: string
  interval: string
}
