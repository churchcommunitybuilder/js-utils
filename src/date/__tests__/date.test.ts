import * as dateFns from 'date-fns'

import * as utils from '../date'

describe('#fixYearlessDate', () => {
  describe('when the date has no year', () => {
    test('should set the year to the current year', () => {
      expect(utils.fixYearlessDate('--01-01')).toBe(
        `${new Date().getFullYear()}-01-01`,
      )
    })
  })

  describe('when the date has a year', () => {
    test('should return the date string unmodified', () => {
      expect(utils.fixYearlessDate('2010-01-01')).toBe('2010-01-01')
    })
  })
})

describe('#parseISOString', () => {
  describe('when the date is a Date object', () => {
    test('should return the Date', () => {
      const date = new Date()

      expect(utils.parseISOString(date)).toBe(date)
    })
  })

  describe('when the date is a string', () => {
    describe('when the date is invalid', () => {
      test('should return today', () => {
        const actual = utils.parseISOString('invalid date')
        const expectation = new Date()

        expect(dateFns.formatISO(actual)).toEqual(
          dateFns.formatISO(expectation),
        )
      })
    })

    describe('when the date is valid', () => {
      test('should return the Date', () => {
        expect(
          utils.parseISOString('2010-01-01T09:00:00').toISOString(),
        ).toEqual('2010-01-01T09:00:00.000Z')
      })
    })
  })
})

describe('#formatServerDate', () => {
  test('should format the date correctly', () => {
    expect(utils.formatServerDate('2010-01-01T09:00:00')).toBe('2010-01-01')
  })
})

describe('#formatShortTime', () => {
  test('should format the time correctly', () => {
    expect(utils.formatShortTime('2010-01-01T09:00:00')).toBe('9:00am')
  })
})

describe('#isAllDayRange', () => {
  describe('when it is not an all day range', () => {
    test('should return false', () => {
      expect(
        utils.isAllDayRange('2010-01-01T00:00:00', '2010-01-01T23:59:58'),
      ).toBe(false)
    })
  })

  describe('when it is an all day range', () => {
    test('should return true', () => {
      expect(
        utils.isAllDayRange('2010-01-01T00:00:00', '2010-01-01T23:59:59'),
      ).toBe(true)
    })
  })
})

describe('#datesAreWithinDayRange', () => {
  describe('when the date is fewer than 30 days in the future', () => {
    describe('when the date is next year', () => {
      test('should return true', () => {
        expect(
          utils.datesAreWithinDayRange(
            new Date('2010-12-10'),
            new Date('2011-01-09'),
          ),
        ).toBe(true)
      })
    })

    describe('when the date is this year', () => {
      test('should return true', () => {
        expect(
          utils.datesAreWithinDayRange(
            new Date('2010-01-01'),
            new Date('2010-01-31'),
          ),
        ).toBe(true)
      })
    })
  })

  describe('when the date fewer than 30 days in the past', () => {
    describe('when the date is last year', () => {
      test('should return true', () => {
        expect(
          utils.datesAreWithinDayRange(
            new Date('2011-01-09'),
            new Date('2010-12-10'),
          ),
        ).toBe(true)
      })
    })

    describe('when the date is this year', () => {
      test('should return true', () => {
        expect(
          utils.datesAreWithinDayRange(
            new Date('2011-01-09'),
            new Date('2010-12-10'),
          ),
        ).toBe(true)
      })
    })
  })

  describe('when the date is greater than 30 days in the future', () => {
    describe('when the date is next year', () => {
      test('should return false', () => {
        expect(
          utils.datesAreWithinDayRange(
            new Date('2010-12-10'),
            new Date('2011-01-10'),
          ),
        ).toBe(false)
      })
    })

    describe('when the date is this year', () => {
      test('should return false', () => {
        expect(
          utils.datesAreWithinDayRange(
            new Date('2010-01-01'),
            new Date('2010-02-01'),
          ),
        ).toBe(false)
      })
    })
  })

  describe('when the date is greater than 30 days in the past', () => {
    describe('when the date is next year', () => {
      test('should return false', () => {
        expect(
          utils.datesAreWithinDayRange(
            new Date('2011-01-10'),
            new Date('2010-12-10'),
          ),
        ).toBe(false)
      })
    })

    describe('when the date is this year', () => {
      test('should return false', () => {
        expect(
          utils.datesAreWithinDayRange(
            new Date('2010-02-01'),
            new Date('2010-01-01'),
          ),
        ).toBe(false)
      })
    })
  })
})

describe('#formatRelativeDateTime', () => {
  const now = new Date()

  describe('when the date is today', () => {
    test('should return the time', () => {
      expect(utils.formatRelativeDateTime(now.toISOString())).toBe(
        utils.formatShortTime(now),
      )
    })
  })

  describe('when the date is yesterday', () => {
    test('should return yesterday', () => {
      const date = dateFns.subDays(now, 1)

      expect(utils.formatRelativeDateTime(date.toISOString())).toBe('Yesterday')
    })
  })

  describe('when the date is this week', () => {
    test('should return the day', () => {
      const date = dateFns.subDays(now, 6)

      expect(utils.formatRelativeDateTime(date.toISOString())).toBe(
        dateFns.format(date, 'EEEE'),
      )
    })
  })

  describe('when the date is this year', () => {
    test('should return the month and day', () => {
      const date = dateFns.subWeeks(now, 2)

      expect(utils.formatRelativeDateTime(date.toISOString())).toBe(
        dateFns.format(date, 'MMM d'),
      )
    })
  })

  describe('when the date is last year', () => {
    test('should return the month, day, and year', () => {
      const date = dateFns.subYears(now, 1)

      expect(utils.formatRelativeDateTime(date.toISOString())).toBe(
        dateFns.format(date, 'MMM d, yyyy'),
      )
    })
  })
})
