import { prisma } from '@peel/db'
import { waves } from './src/waves'
import { appRouter } from '@peel/api'

const main = async () => {
  const publicCaller = appRouter.createCaller({ prisma, session: null })
  const user = await publicCaller.user.create({ email: 'ryanpwaldon@gmail.com' })
  console.log(`Created 1 user.`)
  const protectedCaller = appRouter.createCaller({ prisma, session: { expires: '', user: { id: user.id } } })
  for (const [index, wave] of waves.entries()) {
    await protectedCaller.wave.create(wave)
    console.log(`Created ${index + 1} waves.`)
  }
}

main()
