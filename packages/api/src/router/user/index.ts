import { z } from 'zod'
import { protectedProcedure, router, serverProcedure } from '../../trpc'

export const userRouter = router({
  findMe: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findUniqueOrThrow({
      where: { id: ctx.session.user.id },
      include: { preferences: true },
    })
  }),
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
          preferences: { create: {} },
        },
      })
      return result
    }),
})
