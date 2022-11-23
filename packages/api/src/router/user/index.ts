import { z } from 'zod'
import { router, serverProcedure } from '../../trpc'

export const userRouter = router({
  create: serverProcedure
    .input(
      z.object({
        email: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.prisma.user.create({
        data: {
          email: input.email,
          emailVerified: new Date(),
        },
      })
      return result
    }),
})
