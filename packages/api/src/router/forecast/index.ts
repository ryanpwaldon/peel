import { z } from 'zod'
import { publicProcedure, router, serverProcedure } from '../../trpc'

export const forecastRouter = router({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.forecast.findMany({
      include: {
        points: {
          take: 1,
        },
      },
    })
  }),
  updateTideEvents: serverProcedure
    .input(
      z.object({
        id: z.string(),
        tideEvents: z.array(
          z.object({
            time: z.date(),
            type: z.enum(['LOW', 'HIGH']),
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
  updateSolarEvents: serverProcedure
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
  updateWeatherEvents: serverProcedure
    .input(
      z.object({
        id: z.string(),
        weatherEvents: z.array(
          z.object({
            time: z.date(),
            airTemperature: z.number().nullish(),
            waterTemperature: z.number().nullish(),
            cloudCover: z.number().nullish(),
            visibility: z.number().nullish(),
            humidity: z.number().nullish(),
            precipitation: z.number().nullish(),
            windSpeed: z.number().nullish(),
            windDirection: z.number().nullish(),
            gust: z.number().nullish(),
            waveHeight: z.number().nullish(),
            wavePeriod: z.number().nullish(),
            waveDirection: z.number().nullish(),
            windWaveHeight: z.number().nullish(),
            windWavePeriod: z.number().nullish(),
            windWaveDirection: z.number().nullish(),
            swellHeight: z.number().nullish(),
            swellPeriod: z.number().nullish(),
            swellDirection: z.number().nullish(),
            secondarySwellHeight: z.number().nullish(),
            secondarySwellPeriod: z.number().nullish(),
            secondarySwellDirection: z.number().nullish(),
          }),
        ),
      }),
    )
    .mutation(({ ctx, input }) => {
      const deleteWeatherEvents = ctx.prisma.weatherEvent.deleteMany({
        where: {
          forecastId: input.id,
          time: { in: input.weatherEvents.map((event) => event.time) },
        },
      })
      const createWeatherEvents = ctx.prisma.weatherEvent.createMany({
        data: input.weatherEvents.map((weatherEvent) => ({ ...weatherEvent, forecastId: input.id })),
      })
      return ctx.prisma.$transaction([deleteWeatherEvents, createWeatherEvents])
    }),
})
