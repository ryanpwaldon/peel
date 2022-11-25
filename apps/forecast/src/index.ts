import { add, sub } from 'date-fns'
import { appRouter } from '@peel/api'
import { getTzStartOfDay } from './utils/getTzStartOfDay'
import { createContextInner } from '@peel/api/src/context'

const main = async () => {
  const serverCtx = createContextInner({ session: null, isServer: true })
  const serverCaller = appRouter.createCaller(serverCtx)
  const forecasts = await serverCaller.forecast.all()
  for (const [index, forecast] of forecasts.entries()) {
    const keyPoint = forecast.points[0]
    if (!keyPoint) throw new Error('Forecast has no points.')
    const start = getTzStartOfDay(keyPoint.timezone, new Date())
    const end = sub(add(start, { days: 14 }), { seconds: 1 })
    const weatherEvents = await serverCaller.stormglass.weather.findMany({ start, end, lng: keyPoint.lng, lat: keyPoint.lat })
    const updateWeatherEvents = await serverCaller.forecast.updateWeatherEvents({ id: forecast.id, weatherEvents })
    console.log(`Updated ${index + 1} of ${forecasts.length} forecasts.`)
  }
}

main()
