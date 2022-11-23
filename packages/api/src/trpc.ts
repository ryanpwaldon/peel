import superjson from 'superjson'
import { type Context } from './context'
import { initTRPC, TRPCError } from '@trpc/server'

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape
  },
})

const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session) throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Not authenticated' })
  return next({ ctx: { session: ctx.session } })
})

const isServer = t.middleware(({ ctx, next }) => {
  if (!ctx.isServer) throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Not authenticated' })
  return next({ ctx: { isServer: true } })
})

export const router = t.router
export const publicProcedure = t.procedure
export const protectedProcedure = t.procedure.use(isAuthed)
export const serverProcedure = t.procedure.use(isServer)
