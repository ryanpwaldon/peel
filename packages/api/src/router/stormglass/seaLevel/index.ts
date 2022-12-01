import { z } from 'zod'
import { serverProcedure, router } from '../../../trpc'
import { STORMGLASS_TIDAL_DATUM } from '../../../constants'
import { stormglassClient } from '../../../services/stormglass'
import { handleAxiosError } from '../../../utils/handleAxiosError'

// prettier-ignore
const seaLevelResponse = z.object({
  data: z.array(
    z.object({
      time: z.string().transform((val) => new Date(val)),
      sg: z.number().nullish(),
    }).transform(val => ({
      time: val.time,
      seaLevel: val.sg,
    })),
  ),
}).transform((val) => val.data)

export const seaLevelRouter = router({
  findMany: serverProcedure
    .input(
      z.object({
        start: z.date(),
        end: z.date(),
        lng: z.number(),
        lat: z.number(),
      }),
    )
    .output(seaLevelResponse)
    .query(async ({ input }) => {
      const response = await stormglassClient({
        method: 'get',
        url: '/tide/sea-level/point',
        params: { ...input, datum: STORMGLASS_TIDAL_DATUM },
      }).catch(handleAxiosError)
      return response.data
    }),
})
