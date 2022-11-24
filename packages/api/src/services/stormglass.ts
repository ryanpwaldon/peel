import axios from 'axios'
import axiosRetry from 'axios-retry'

export const stormglassClient = axios.create({
  method: 'get',
  baseURL: process.env.STORMGLASS_ENDPOINT,
  headers: { Authorization: process.env.STORMGLASS_TOKEN },
})

axiosRetry(stormglassClient, {
  retries: 5,
  retryDelay: (retryCount) => retryCount * 5000,
  retryCondition: (err) => {
    const errorCode = err.response?.status
    const retry = (message: string) => { console.log(message); return true } // prettier-ignore
    if (errorCode === 429) return retry('Retrying stormglass request... 429: Too many requests.')
    if (errorCode === 500) return retry('Retrying stormglass request... 500: Internal server error.')
    if (errorCode === 503) return retry('Retrying stormglass request... 503: Service unavailable.')
    if (errorCode === 504) return retry('Retrying stormglass request... 504: Gateway timeout.')
    else return false
  },
})
