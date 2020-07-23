type EntityActions<A extends string> = {
  actions: {
    [K in A]: {
      allowed: boolean
      reasons?: string[]
    }
  }
}

export const checkEntityAction = <A extends EntityActions<any>>(
  item: A | null,
  action: keyof A['actions'],
  defaultValue = false,
) => item?.actions?.[action]?.allowed ?? defaultValue

export const checkEntityActionFactory = <A extends string>(
  action: A,
  defaultValue = false,
) => (item: EntityActions<A> | null) =>
  checkEntityAction(item, action, defaultValue)
