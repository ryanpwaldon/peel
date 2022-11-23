import Geonames from 'geonames.js'

export const geonames = Geonames({ username: process.env.GEONAMES_USERNAME })

export interface GeonamesTimezoneResponse {
  timezoneId: string
}
