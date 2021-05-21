import * as utils from '../recurrence'
import * as types from '../recurrenceTypes'

describe('#formatRecurrence', () => {
  const recurrence = {
    end: '20311231',
    frequency: types.EventRecurrenceFrequency.Daily,
    frequencyModifier: '',
    interval: '1',
  }

  describe('when it recurs daily', () => {
    describe('when it repeats every day', () => {
      it('should return the correct recurrence', () => {
        expect(utils.formatRecurrence(recurrence)).toEqual('Repeats daily')
      })
    })

    describe('when it repeats every other day', () => {
      it('should return the correct recurrence', () => {
        expect(
          utils.formatRecurrence({ ...recurrence, interval: '2' }),
        ).toEqual('Repeats every 2 days')
      })
    })
  })

  describe('when it recurs weekly', () => {
    const expectedRecurrence = {
      ...recurrence,
      frequency: types.EventRecurrenceFrequency.Weekly,
      frequencyModifier: 'MO TU WE',
    }

    describe('when it repeats multple days of the week', () => {
      it('should return the correct recurrence', () => {
        expect(utils.formatRecurrence(expectedRecurrence)).toEqual(
          'Repeats weekly on Monday, Tuesday, and Wednesday',
        )
      })
    })

    describe('when it has an interval', () => {
      it('should return the correct recurrence', () => {
        expect(
          utils.formatRecurrence({ ...expectedRecurrence, interval: '3' }),
        ).toEqual('Repeats every 3 weeks on Monday, Tuesday, and Wednesday')
      })
    })
  })

  describe('when it recurs on a date of the month', () => {
    describe('when it repeats on the 11th', () => {
      it('should return the correct recurrence', () => {
        const expectedRecurrence = {
          ...recurrence,
          frequency: types.EventRecurrenceFrequency.MonthlyByDate,
          frequencyModifier: '11',
        }

        expect(utils.formatRecurrence(expectedRecurrence)).toEqual(
          'Repeats monthly on the 11th',
        )
      })
    })

    describe('when it has an interval', () => {
      it('should return the correct recurrence', () => {
        const expectedRecurrence = {
          ...recurrence,
          frequency: types.EventRecurrenceFrequency.MonthlyByDate,
          frequencyModifier: '11',
          interval: '3',
        }

        expect(utils.formatRecurrence(expectedRecurrence)).toEqual(
          'Repeats every 3 months on the 11th',
        )
      })
    })
  })

  describe('when it recurs on a day of the month', () => {
    describe('when it repeats on the 1st thursday', () => {
      it('should return the correct recurrence', () => {
        const expectedRecurrence = {
          ...recurrence,
          frequency: types.EventRecurrenceFrequency.MonthlyByDay,
          frequencyModifier: '1+ TH',
        }

        expect(utils.formatRecurrence(expectedRecurrence)).toEqual(
          'Repeats monthly on the 1st Thursday',
        )
      })
    })

    describe('when it repeats on the 1st Thursday and 3rd Monday', () => {
      it('should return the correct recurrence', () => {
        const expectedRecurrence = {
          ...recurrence,
          frequency: types.EventRecurrenceFrequency.MonthlyByDay,
          frequencyModifier: '1+ TH 3+ MO',
        }

        expect(utils.formatRecurrence(expectedRecurrence)).toEqual(
          'Repeats monthly on the 1st Thursday and 3rd Monday',
        )
      })
    })

    describe('when it has an interval', () => {
      it('should return the correct recurrence', () => {
        const expectedRecurrence = {
          ...recurrence,
          frequency: types.EventRecurrenceFrequency.MonthlyByDay,
          frequencyModifier: '1+ TH',
          interval: '3',
        }

        expect(utils.formatRecurrence(expectedRecurrence)).toEqual(
          'Repeats every 3 months on the 1st Thursday',
        )
      })
    })
  })

  describe('when there is an end date', () => {
    it('should return the correct recurrence', () => {
      const expectedRecurrence = {
        ...recurrence,
        end: '20200101',
      }

      expect(utils.formatRecurrence(expectedRecurrence)).toEqual(
        'Repeats daily until Jan 1, 2020',
      )
    })
  })

  describe('when the event does not have a recur end', () => {
    const expectedRecurrence = {
      ...recurrence,
      end: null,
    }

    expect(utils.formatRecurrence(expectedRecurrence)).toEqual('Repeats daily')
  })
})
