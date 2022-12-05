import { z } from 'zod'
import { add } from 'date-fns'
import { getTzStartOfDay } from '@peel/utils'
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
  findById: publicProcedure
    .input(
      z.object({
        id: z.string(),
        timezone: z.string(),
        day: z.number().default(0),
      }),
    )
    .query(async ({ ctx, input }) => {
      const localStartOfDay = getTzStartOfDay(input.timezone, new Date())
      const findEventsArgs = { where: { time: { gte: add(localStartOfDay, { days: input.day }), lt: add(localStartOfDay, { days: input.day + 1 }) } } }
      return ctx.prisma.forecast.findUniqueOrThrow({
        where: { id: input.id },
        include: { weatherEvents: findEventsArgs, solarEvents: findEventsArgs },
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
            seaLevel: z.number().nullish(),
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
