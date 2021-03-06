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

describe('#formatISO8601Date', () => {
  test('should format the date correctly', () => {
    expect(utils.formatISO8601Date('2010-01-01T09:00:00')).toBe('2010-01-01')
  })
})

describe('#formatSeconds', () => {
  describe('when the seconds are greater than or equal to 60', () => {
    describe('when there are no extra seconds', () => {
      test('should return the minutes and seconds', () => {
        expect(utils.formatSeconds(60)).toBe('1min')
        expect(utils.formatSeconds(120)).toBe('2min')
      })
    })

    describe('when there are extra seconds', () => {
      test('should return just the minutes', () => {
        expect(utils.formatSeconds(90)).toBe('1min 30sec')
        expect(utils.formatSeconds(150)).toBe('2min 30sec')
      })
    })
  })

  describe('when the seconds are fewer than 60', () => {
    describe('when the seconds are greater than 0', () => {
      test('should return the seconds', () => {
        expect(utils.formatSeconds(59)).toBe('59sec')
        expect(utils.formatSeconds(1)).toBe('1sec')
      })
    })

    describe('when the seconds are 0', () => {
      test('should return an empty string', () => {
        expect(utils.formatSeconds(0)).toBe('')
      })
    })
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

describe('#formatEventOccurrence', () => {
  const tests = [
    { input: new Date('January 1, 2001'), output: '20010101' },
    { input: new Date('February 29, 2020'), output: '20200229' },
    { input: new Date('June 7, 1941'), output: '19410607' },
    { input: new Date('November 13, 1976'), output: '19761113' },
    { input: new Date('December 31, 4575'), output: '45751231' },
  ]

  tests.map(({ input, output }) => {
    describe(`when given the date ${dateFns.format(
      input,
      'MMMM Lo, yyyy',
    )}`, () => {
      test(`should output ${output}`, () => {
        expect(utils.formatEventOccurrence(input)).toBe(output)
      })
    })
  })
})
