import { z } from 'zod'
import { flatten } from 'remeda'
import { serverProcedure, router } from '../../../trpc'
import { stormglassClient } from '../../../services/stormglass'
import { handleAxiosError } from '../../../utils/handleAxiosError'

// prettier-ignore
export const solarResponse = z.object({
  data: z
    .array(
      z.object({
        time: z.string().transform((val) => new Date(val)),
        sunset: z.string().transform((val) => new Date(val)),
        sunrise: z.string().transform((val) => new Date(val)),
      }),
    )
    .transform((val) => flatten(val.map((solar) => {
        if (solar.sunset && solar.sunrise) return [{ type: 'SUNSET' as const, time: solar.sunset }, { type: 'SUNRISE' as const, time: solar.sunrise }]
        else if (solar.sunset) return [{ type: 'SUNSET' as const, time: solar.sunset }]
        else if (solar.sunrise) return [{ type: 'SUNRISE' as const, time: solar.sunrise }]
        else return []
      }))
    ), // prettier-ignore
}).transform(val => val.data)

export const solarRouter = router({
  findMany: serverProcedure
    .input(
      z.object({
        start: z.date(),
        end: z.date(),
        lng: z.number(),
        lat: z.number(),
      }),
    )
    .output(solarResponse)
    .query(async ({ input }) => {
      const response = await stormglassClient({
        method: 'get',
        url: '/astronomy/point',
        params: input,
      }).catch(handleAxiosError)
      return response.data
    }),
})
