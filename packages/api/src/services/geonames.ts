import Geonames from 'geonames.js'

export const geonames = Geonames({ username: process.env.GEONAMES_USERNAME })

export interface GeonamesTimezone {
  timezoneId: string
}

export interface GeonamesCountrySubdivision {
  countryCode: string
  countryName: string
  adminName1: string
}
