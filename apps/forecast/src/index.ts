import { add, sub } from 'date-fns'
import { appRouter } from '@peel/api'
import { getTzStartOfDay } from './utils/getTzStartOfDay'
import { createContextInner } from '@peel/api/src/context'

const main = async () => {
  const serverCtx = createContextInner({ session: null, isServer: true })
  const serverCaller = appRouter.createCaller(serverCtx)
  const [forecast] = await serverCaller.forecast.all()
  if (!forecast) throw new Error('No forecast found.')
  const keyPoint = forecast.points[0]
  if (!keyPoint) throw new Error('Forecast has no points.')
  const start = getTzStartOfDay(keyPoint.timezone, new Date())
  const end = sub(add(start, { days: 7 }), { seconds: 1 })
  const weatherEvents = await serverCaller.stormglass.getWeatherEvents({ start, end, lng: keyPoint.lng, lat: keyPoint.lat })
  console.log(weatherEvents)
}

main()
