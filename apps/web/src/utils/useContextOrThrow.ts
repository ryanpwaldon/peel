import { Context, useContext } from 'react'

export const useContextOrThrow = <T>(context: Context<T>) => {
  const ctx = useContext(context)
  if (!ctx) throw new Error('Context is not defined.')
  return ctx
}
