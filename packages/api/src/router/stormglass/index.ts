import { z } from 'zod'
import { serverProcedure, router } from '../../trpc'
import { STORMGLASS_TIDAL_DATUM } from '../../constants'
import { stormglassClient } from '../../services/stormglass'
import { handleAxiosError } from '../../utils/handleAxiosError'

const tideResponse = z.object({
  data: z.array(
    z.object({
      time: z.string(),
      height: z.string(),
      type: z.enum(['low', 'high']),
    }),
  ),
})

const astronomyResponse = z.object({
  data: z.array(
    z.object({
      time: z.string(),
      sunset: z.string(),
      sunrise: z.string(),
    }),
  ),
})

const weatherAttributeValue = z.object({
  sg: z.number().optional().nullable(),
})

const weatherResponse = z.object({
  hours: z.array(
    z.object({
      time: z.string(),
      airTemperature: weatherAttributeValue,
      waterTemperature: weatherAttributeValue,
      cloudCover: weatherAttributeValue,
      visibility: weatherAttributeValue,
      humidity: weatherAttributeValue,
      precipitation: weatherAttributeValue,
      windSpeed: weatherAttributeValue,
      windDirection: weatherAttributeValue,
      gust: weatherAttributeValue,
      waveHeight: weatherAttributeValue,
      wavePeriod: weatherAttributeValue,
      waveDirection: weatherAttributeValue,
      windWaveHeight: weatherAttributeValue,
      windWavePeriod: weatherAttributeValue,
      windWaveDirection: weatherAttributeValue,
      swellHeight: weatherAttributeValue,
      swellPeriod: weatherAttributeValue,
      swellDirection: weatherAttributeValue,
      secondarySwellHeight: weatherAttributeValue,
      secondarySwellPeriod: weatherAttributeValue,
      secondarySwellDirection: weatherAttributeValue,
    }),
  ),
})

const weatherAttributes = Object.keys(weatherResponse.shape.hours.element.omit({ time: true }).shape).join(',')

const weatherModels = Object.keys(weatherAttributeValue.shape).join(',')

export const stormglassRouter = router({
  getTideEvents: serverProcedure
    .input(
      z.object({
        start: z.date(),
        end: z.date(),
        lng: z.number(),
        lat: z.number(),
      }),
    )
    .output(tideResponse)
    .query(async ({ input }) => {
      const response = await stormglassClient({
        method: 'get',
        url: '/tide/extremes/point',
        params: { ...input, datum: STORMGLASS_TIDAL_DATUM },
      }).catch(handleAxiosError)
      return response.data
    }),
  getAstronomyEvents: serverProcedure
    .input(
      z.object({
        start: z.date(),
        end: z.date(),
        lng: z.number(),
        lat: z.number(),
      }),
    )
    .output(astronomyResponse)
    .query(async ({ input }) => {
      const response = await stormglassClient({
        method: 'get',
        url: '/astronomy/point',
        params: input,
      }).catch(handleAxiosError)
      return response.data
    }),
  getWeatherEvents: serverProcedure
    .input(
      z.object({
        start: z.date(),
        end: z.date(),
        lng: z.number(),
        lat: z.number(),
      }),
    )
    .output(weatherResponse)
    .query(async ({ input }) => {
      const response = await stormglassClient({
        method: 'get',
        url: '/astronomy/point',
        params: { ...input, params: weatherAttributes, source: weatherModels },
      }).catch(handleAxiosError)
      return response.data
    }),
})
