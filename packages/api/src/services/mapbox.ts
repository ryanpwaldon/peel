import { TRPCError } from '@trpc/server'
import CreateGeocoder from '@mapbox/mapbox-sdk/services/geocoding'

const geocoder = CreateGeocoder({ accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string })

interface RegionFeature {
  id: string
  text: string
  properties: {
    short_code: string
  }
  context: [
    {
      id: string
      text: string
      short_code: string
    },
  ]
}

export const getCountryAndRegion = async (lng: number, lat: number) => {
  const response = await geocoder.reverseGeocode({ query: [lng, lat], types: ['region'] }).send()
  const feature = response.body.features[0] as RegionFeature | undefined
  if (!feature) throw new TRPCError({ code: 'NOT_FOUND', message: 'Location not found' })
  const countryContext = feature.context.find((context) => context.id.startsWith('country'))
  if (!countryContext) throw new TRPCError({ code: 'NOT_FOUND', message: 'Country not found.' })
  const countryName = countryContext.text
  const countryCode = countryContext.short_code.toUpperCase()
  const regionName = feature.text
  const regionCode = feature.properties.short_code.toUpperCase()
  return {
    countryName,
    countryCode,
    regionName,
    regionCode,
  }
}
