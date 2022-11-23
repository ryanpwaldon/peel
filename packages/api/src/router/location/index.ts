import { z } from 'zod'
import { router, protectedProcedure } from '../../trpc'
import { getCountryAndRegion } from '../../services/mapbox'
import { geonames, GeonamesTimezoneResponse } from '../../services/geonames'

export const locationRouter = router({
  info: protectedProcedure
    .input(
      z.object({
        lng: z.number(),
        lat: z.number(),
      }),
    )
    .query(async ({ input }) => {
      const timezoneResponse: GeonamesTimezoneResponse = await geonames.timezone({ lng: input.lng, lat: input.lat })
      const countryAndRegion = await getCountryAndRegion(input.lng, input.lat)
      return { ...countryAndRegion, timezoneId: timezoneResponse.timezoneId }
    }),
})
