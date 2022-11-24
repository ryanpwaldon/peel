import { z } from 'zod'
import { publicProcedure, router, serverProcedure } from '../../trpc'

export const forecastRouter = router({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.forecast.findMany()
  }),
  createTideEventsById: serverProcedure
    .input(
      z.object({
        id: z.string(),
        tideEvents: z.array(
          z.object({
            time: z.date(),
            type: z.enum(['HIGH', 'LOW']),
          }),
        ),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.forecast.update({
        where: { id: input.id },
        data: {
          tideEvents: {
            createMany: {
              data: input.tideEvents,
            },
          },
        },
      })
    }),
  createSolarEventsById: serverProcedure
    .input(
      z.object({
        id: z.string(),
        solarEvents: z.array(
          z.object({
            time: z.date(),
            type: z.enum(['SUNRISE', 'SUNSET']),
          }),
        ),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.forecast.update({
        where: { id: input.id },
        data: {
          solarEvents: {
            createMany: {
              data: input.solarEvents,
            },
          },
        },
      })
    }),
  createWeatherEventsById: serverProcedure
    .input(
      z.object({
        id: z.string(),
        weatherEvents: z.array(
          z.object({
            time: z.date(),
            airTemperature: z.number(),
            waterTemperature: z.number(),
            cloudCover: z.number(),
            visibility: z.number(),
            humidity: z.number(),
            precipitation: z.number(),
            windSpeed: z.number(),
            windDirection: z.number(),
            gust: z.number(),
            waveHeight: z.number(),
            wavePeriod: z.number(),
            waveDirection: z.number(),
            windWaveHeight: z.number(),
            windWavePeriod: z.number(),
            windWaveDirection: z.number(),
            swellHeight: z.number(),
            swellPeriod: z.number(),
            swellDirection: z.number(),
            secondarySwellHeight: z.number(),
            secondarySwellPeriod: z.number(),
            secondarySwellDirection: z.number(),
          }),
        ),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.forecast.update({
        where: { id: input.id },
        data: {
          weatherEvents: {
            createMany: {
              data: input.weatherEvents,
            },
          },
        },
      })
    }),
})
