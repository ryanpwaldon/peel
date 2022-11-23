import { appRouter } from '@peel/api'
import { createContextInner } from '@peel/api/src/context'

const main = async () => {
  const serverCtx = createContextInner({ session: null, isServer: true })
  const serverCaller = appRouter.createCaller(serverCtx)
}

main()
