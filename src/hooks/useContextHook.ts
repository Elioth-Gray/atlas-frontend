import { type Context, useContext } from 'react'

/**
 * Reads a context that must have its provider above the caller, and fails loudly when it does not.
 * Create the context with `null` as default: `createContext<AuthValue | null>(null)`
 */
export function useContextHook<T>(context: Context<T | null>, providerName: string) {
  const value = useContext(context)
  if (value === null) throw new Error(`This hook must be used within ${providerName}`)
  return value
}
