import { AxiosError } from 'axios'
import { TRPCError } from '@trpc/server'

export const handleAxiosError = (error: AxiosError) => {
  throw new TRPCError({
    code: 'INTERNAL_SERVER_ERROR',
    cause: error.toJSON(),
    message: (() => {
      if (error.response) return `Stormglass bad response: ${error.response.status} ${error.response.statusText}`
      else if (error.request) return `Stormglass no response.`
      else return `Stormglass request failed.`
    })(),
  })
}
