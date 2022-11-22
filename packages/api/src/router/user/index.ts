import { z } from 'zod'
import { publicProcedure, router } from '../../trpc'

// TODO: Protect this route (restrict to server side calls only)

export const userRouter = router({
  create: publicProcedure
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
