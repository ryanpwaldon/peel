import { z } from 'zod'
import { geonames, GeonamesTimezone } from '@/services/geonames'
import { router, protectedProcedure } from '@/trpc'

export const geocodeRouter = router({
  timezone: protectedProcedure
    .input(
      z.object({
        lng: z.number(),
        lat: z.number(),
      }),
    )
    .query(async ({ input }) => {
      const { timezoneId }: GeonamesTimezone = await geonames.timezone({ lng: input.lng, lat: input.lat })
      return timezoneId
    }),
})
