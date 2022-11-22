import { z } from 'zod'
import { router, protectedProcedure } from '../../trpc'
import { geonames, GeonamesCountrySubdivision, GeonamesTimezone } from '../../services/geonames'

export const geocodeRouter = router({
  info: protectedProcedure
    .input(
      z.object({
        lng: z.number(),
        lat: z.number(),
      }),
    )
    .query(async ({ input }) => {
      const timezoneResponse: GeonamesTimezone = await geonames.timezone({ lng: input.lng, lat: input.lat })
      const countrySubdivisionResponse: GeonamesCountrySubdivision = await geonames.countrySubdivision({ lng: input.lng, lat: input.lat })
      return {
        countryCode: countrySubdivisionResponse.countryCode,
        countryName: countrySubdivisionResponse.countryName,
        region: countrySubdivisionResponse.adminName1,
        timezoneId: timezoneResponse.timezoneId,
      }
    }),
})
