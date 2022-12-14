import { prisma } from '@peel/db'
import { type inferAsyncReturnType } from '@trpc/server'
import { getServerSession, type Session } from '@peel/auth'
import { type CreateNextContextOptions } from '@trpc/server/adapters/next'

/**
 * Replace this with an object if you want to pass things to createContextInner
 */
type CreateContextOptions = {
  session: Session | null
  isServer: boolean
}

/** Use this helper for:
 *  - testing, where we dont have to Mock Next.js' req/res
 *  - trpc's `createSSGHelpers` where we don't have req/res
 * @see https://beta.create.t3.gg/en/usage/trpc#-servertrpccontextts
 */
export const createContextInner = (opts: CreateContextOptions) => {
  return {
    prisma,
    session: opts.session,
    isServer: opts.isServer,
  }
}

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 **/
export const createContext = async (opts: CreateNextContextOptions) => {
  const session = await getServerSession(opts)

  return createContextInner({
    session,
    isServer: false,
  })
}

export type Context = inferAsyncReturnType<typeof createContext>
