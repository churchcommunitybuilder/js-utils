export type ArrayOperator = 'in' | 'not_in' | 'is_set' | 'is_not_set'

export type BooleanOperator = 'is_set' | 'is_not_set'

export type StringOperator =
  | 'equal'
  | 'not_equal'
  | 'is_set'
  | 'is_not_set'
  | 'in'
  | 'not_in'
  | 'contains'
  | 'does_not_contain'
  | 'like'
  | 'not_like'
  | 'contains_like'
  | 'does_not_contain_like'
  | 'starts_with'
  | 'ends_with'
  | 'legacy'

export type AnyOperator = ArrayOperator | BooleanOperator | StringOperator

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

/**
 * Builds a search constraint to be used with the CCB ApiV2 advanced search
 */
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

/**
 * Builds a group of search constraints to be used with the CCB ApiV2 advanced search
 */
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
