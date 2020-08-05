export interface Constraint {
  id: string
  operator: string
  value: any
  invert: boolean
  type: string
}

export interface GroupConstraint {
  conditions: (Constraint | GroupConstraint)[]
  operator: string
  invert: boolean
  type: 'group'
}

export const buildSearchConstraint = (
  id: string,
  operator: string,
  value?: any,
  invert = false,
): Constraint => ({
  id,
  invert,
  operator,
  type: 'constraint',
  value,
})

export const buildSearchGroup = (
  conditions: GroupConstraint['conditions'],
  operator = 'and',
  invert = false,
): GroupConstraint => ({
  conditions,
  invert,
  operator,
  type: 'group',
})
