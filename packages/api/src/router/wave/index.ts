import { z } from 'zod'
import { latLngToCell } from 'h3-js'
import { locationRouter } from '../location'
import { FORECAST_HEX_RESOLUTION } from '../../constants'
import { router, publicProcedure, protectedProcedure } from '../../trpc'
import { validateAngulation, validateLat, validateLng, validateWaveName, validateWaveRideDirection } from '@peel/validators'

export const waveRouter = router({
  findMany: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.wave.findMany({ take: 20, include: { point: { include: { location: true } } } })
  }),
  findById: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return await ctx.prisma.wave.findUniqueOrThrow({
      where: { id: input },
      include: {
        point: {
          include: {
            location: true,
          },
        },
      },
    })
  }),
  // Only used for testing
  findByNames: publicProcedure.input(z.array(z.string())).query(async ({ ctx, input }) => {
    return await ctx.prisma.wave.findMany({
      where: { name: { in: input } },
      include: {
        point: {
          include: {
            location: true,
          },
        },
      },
    })
  }),
  create: protectedProcedure
    .input(
      z.object({
        name: validateWaveName,
        faceDirection: validateAngulation,
        rideDirection: validateWaveRideDirection,
        lng: validateLng,
        lat: validateLat,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const locationInfo = await locationRouter.createCaller(ctx).info({ lat: input.lat, lng: input.lng })
      const hex = latLngToCell(input.lat, input.lng, FORECAST_HEX_RESOLUTION)
      const result = ctx.prisma.wave.create({
        data: {
          name: input.name,
          rideDirection: input.rideDirection,
          faceDirection: input.faceDirection,
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
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: validateWaveName.optional(),
        faceDirection: validateAngulation.optional(),
        rideDirection: validateWaveRideDirection.optional(),
        lng: validateLng.optional(),
        lat: validateLat.optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input
      return await ctx.prisma.wave.update({
        where: { id },
        data,
      })
    }),
})
