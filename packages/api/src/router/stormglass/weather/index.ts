import { z } from 'zod'
import { serverProcedure, router } from '../../../trpc'
import { stormglassClient } from '../../../services/stormglass'
import { handleAxiosError } from '../../../utils/handleAxiosError'

// prettier-ignore
const weatherModels = z
  .object({ sg: z.number().optional().nullable() })
  .transform((val) => val.sg)

// prettier-ignore
export const weatherResponse = z.object({
  hours: z.array(
    z.object({
      time: z.string().transform((val) => new Date(val)),
      airTemperature: weatherModels,
      waterTemperature: weatherModels,
      cloudCover: weatherModels,
      visibility: weatherModels,
      humidity: weatherModels,
      precipitation: weatherModels,
      windSpeed: weatherModels,
      windDirection: weatherModels,
      gust: weatherModels,
      waveHeight: weatherModels,
      wavePeriod: weatherModels,
      waveDirection: weatherModels,
      windWaveHeight: weatherModels,
      windWavePeriod: weatherModels,
      windWaveDirection: weatherModels,
      swellHeight: weatherModels,
      swellPeriod: weatherModels,
      swellDirection: weatherModels,
      secondarySwellHeight: weatherModels,
      secondarySwellPeriod: weatherModels,
      secondarySwellDirection: weatherModels,
    }),
  ),
}).transform((val) => val.hours)

export const weatherRouter = router({
  findMany: serverProcedure
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
        url: '/weather/point',
        params: {
          ...input,
          params: Object.keys(weatherResponse.innerType().shape.hours.element.omit({ time: true }).shape).join(','),
          source: Object.keys(weatherModels.innerType().shape).join(','),
        },
      }).catch(handleAxiosError)
      return response.data
    }),
})
