import { z } from 'zod'
import { tideResponse } from '../stormglass/tide'
import { solarResponse } from '../stormglass/solar'
import { weatherResponse } from '../stormglass/weather'
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
        tideEvents: tideResponse,
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
        solarEvents: solarResponse,
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
        weatherEvents: weatherResponse,
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
