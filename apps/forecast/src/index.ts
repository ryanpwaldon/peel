import { add, sub } from 'date-fns'
import { appRouter } from '@peel/api'
import { getTzStartOfDay } from '@peel/utils'
import { createContextInner } from '@peel/api/src/context'

const getServerCaller = () => {
  const serverCtx = createContextInner({ session: null, isServer: true })
  return appRouter.createCaller(serverCtx)
}

const updateWeatherEvents = async () => {
  const serverCaller = getServerCaller()
  const forecasts = await serverCaller.forecast.all()
  for (const [index, forecast] of forecasts.entries()) {
    const keyPoint = forecast.points[0]
    if (!keyPoint) throw new Error('Forecast has no points.')
    const start = getTzStartOfDay(keyPoint.timezone, new Date())
    const end = sub(add(start, { days: 14 }), { seconds: 1 })
    const sgWeatherEvents = await serverCaller.stormglass.weather.findMany({ start, end, lng: keyPoint.lng, lat: keyPoint.lat })
    const sgSeaLevelEvents = await serverCaller.stormglass.seaLevel.findMany({ start, end, lng: keyPoint.lng, lat: keyPoint.lat })
    if (sgWeatherEvents.length !== sgSeaLevelEvents.length) throw new Error('Weather and sea level events are not the same length.')
    const weatherEvents = sgWeatherEvents.map((event, i) => ({ ...sgSeaLevelEvents[i], ...event }))
    await serverCaller.forecast.updateWeatherEvents({ id: forecast.id, weatherEvents })
    console.log(`Updated weather events for ${index + 1} of ${forecasts.length} forecasts.`)
  }
}

const updateTideEvents = async () => {
  const serverCaller = getServerCaller()
  const forecasts = await serverCaller.forecast.all()
  for (const [index, forecast] of forecasts.entries()) {
    const keyPoint = forecast.points[0]
    if (!keyPoint) throw new Error('Forecast has no points.')
    const start = getTzStartOfDay(keyPoint.timezone, new Date())
    const end = sub(add(start, { days: 14 }), { seconds: 1 })
    const tideEvents = await serverCaller.stormglass.tide.findMany({ start, end, lng: keyPoint.lng, lat: keyPoint.lat })
    await serverCaller.forecast.updateTideEvents({ id: forecast.id, tideEvents })
    console.log(`Updated tide events for ${index + 1} of ${forecasts.length} forecasts.`)
  }
}

const updateSolarEvents = async () => {
  const serverCaller = getServerCaller()
  const forecasts = await serverCaller.forecast.all()
  for (const [index, forecast] of forecasts.entries()) {
    const keyPoint = forecast.points[0]
    if (!keyPoint) throw new Error('Forecast has no points.')
    const start = getTzStartOfDay(keyPoint.timezone, new Date())
    const end = sub(add(start, { days: 14 }), { seconds: 1 })
    const solarEvents = await serverCaller.stormglass.solar.findMany({ start, end, lng: keyPoint.lng, lat: keyPoint.lat })
    await serverCaller.forecast.updateSolarEvents({ id: forecast.id, solarEvents })
    console.log(`Updated solar events for ${index + 1} of ${forecasts.length} forecasts.`)
  }
}

const main = async () => {
  await updateWeatherEvents()
  await updateTideEvents()
  await updateSolarEvents()
}

main()
