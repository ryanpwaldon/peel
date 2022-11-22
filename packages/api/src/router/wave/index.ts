import { z } from 'zod'
import { latLngToCell } from 'h3-js'
import { geocodeRouter } from '../geocode'
import { FORECAST_HEX_RESOLUTION } from '../../constants'
import { router, publicProcedure, protectedProcedure } from '../../trpc'

export const waveRouter = router({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.wave.findMany()
  }),
  byId: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.wave.findFirst({ where: { id: input } })
  }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        offshoreWindDirection: z.number(),
        rideDirection: z.enum(['LEFT', 'RIGHT', 'BOTH']),
        lng: z.number(),
        lat: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const geocoder = geocodeRouter.createCaller(ctx)
      const location = await geocoder.info({ lat: input.lat, lng: input.lng })
      const hex = latLngToCell(input.lat, input.lng, FORECAST_HEX_RESOLUTION)
      const result = ctx.prisma.wave.create({
        data: {
          name: input.name,
          rideDirection: input.rideDirection,
          offshoreWindDirection: input.offshoreWindDirection,
          createdBy: { connect: { id: ctx.session.user.id } },
          point: {
            create: {
              lat: input.lat,
              lng: input.lng,
              timezone: location.timezoneId,
              forecast: {
                connectOrCreate: {
                  create: { hex },
                  where: { hex },
                },
              },
            },
          },
        },
      })
      return result
    }),
})
