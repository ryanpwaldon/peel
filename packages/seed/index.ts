import { waves } from './src/waves'
import { appRouter } from '@peel/api'
import { createContextInner } from '@peel/api/src/context'

const main = async () => {
  // Create user
  const serverCtx = createContextInner({ session: null, isServer: true })
  const serverCaller = appRouter.createCaller(serverCtx)
  const user = await serverCaller.user.create({ email: 'ryanpwaldon@gmail.com' })
  console.log(`Created 1 user.`)

  // Create waves
  const protectedCtx = createContextInner({ session: { expires: '', user: { id: user.id } }, isServer: false })
  const protectedCaller = appRouter.createCaller(protectedCtx)
  for (const [index, wave] of waves.entries()) {
    await protectedCaller.wave.create(wave)
    console.log(`Created ${index + 1} waves.`)
  }
}

main()
