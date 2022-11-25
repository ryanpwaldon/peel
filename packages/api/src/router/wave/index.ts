import { z } from 'zod'
import { add } from 'date-fns'
import { latLngToCell } from 'h3-js'
import { TRPCError } from '@trpc/server'
import { locationRouter } from '../location'
import { getTzStartOfDay } from '@peel/utils'
import { FORECAST_HEX_RESOLUTION } from '../../constants'
import { router, publicProcedure, protectedProcedure } from '../../trpc'

export const waveRouter = router({
  findMany: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.wave.findMany({ take: 20, include: { point: { include: { location: true } } } })
  }),
  findById: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const wave = await ctx.prisma.wave.findUnique({
      where: { id: input },
      include: {
        point: {
          include: {
            location: true,
          },
        },
      },
    })
    if (!wave) throw new TRPCError({ code: 'NOT_FOUND' })
    const localStartOfDay = getTzStartOfDay(wave.point.timezone, new Date())
    const forecast = await ctx.prisma.forecast.findUnique({
      where: { id: wave.point.forecastId },
      include: {
        weatherEvents: {
          where: {
            time: {
              gte: localStartOfDay,
              lt: add(localStartOfDay, { days: 1 }),
            },
          },
        },
      },
    })
    if (!forecast) throw new TRPCError({ code: 'NOT_FOUND' })
    return {
      ...wave,
      point: {
        ...wave.point,
        forecast,
      },
    }
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
      const locationInfo = await locationRouter.createCaller(ctx).info({ lat: input.lat, lng: input.lng })
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
              timezone: locationInfo.timezoneId,
              forecast: {
                connectOrCreate: {
                  create: { hex },
                  where: { hex },
                },
              },
              location: {
                connectOrCreate: {
                  create: {
                    country: locationInfo.countryName,
                    countryCode: locationInfo.countryCode,
                    region: locationInfo.regionName,
                    regionCode: locationInfo.regionCode,
                  },
                  where: {
                    countryCode_regionCode: {
                      countryCode: locationInfo.countryCode,
                      regionCode: locationInfo.regionCode,
                    },
                  },
                },
              },
            },
          },
        },
      })
      return result
    }),
})
