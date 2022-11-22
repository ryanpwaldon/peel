import { z } from 'zod'
import { router, publicProcedure } from '@/trpc'

export const waveRouter = router({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.wave.findMany()
  }),
  byId: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.wave.findFirst({ where: { id: input } })
  }),
})
