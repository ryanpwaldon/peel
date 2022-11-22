import Geonames from 'geonames.js'

export const geonames = Geonames({ username: process.env.GEONAMES_USERNAME })

export interface GeonamesTimezone {
  lng: number
  lat: number
  sunrise: string
  sunset: string
  countryName: string
  countryCode: string
  gmtOffset: number
  rawOffset: number
  dstOffset: number
  timezoneId: string
  time: string
}
