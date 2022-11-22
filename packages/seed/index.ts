import { prisma } from '@peel/db'
import { appRouter } from '@peel/api'

const main = async () => {
  const caller = appRouter.createCaller({ prisma, session: null })
  const waves = await caller.wave.all()
  console.log(waves)
}

main()
