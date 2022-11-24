import { z } from 'zod'
import { serverProcedure, router } from '../../../trpc'
import { STORMGLASS_TIDAL_DATUM } from '../../../constants'
import { stormglassClient } from '../../../services/stormglass'
import { handleAxiosError } from '../../../utils/handleAxiosError'

// prettier-ignore
const tideResponse = z.object({
  data: z.array(
    z.object({
      time: z.string().transform((val) => new Date(val)),
      height: z.number(),
      type: z.enum(['low', 'high']).transform((val) => (val === 'low' ? 'LOW' : 'HIGH')),
    }),
  ),
}).transform((val) => val.data)

export const tideRouter = router({
  findMany: serverProcedure
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
})
