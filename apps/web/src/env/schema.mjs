// @ts-check
import { z } from 'zod'

/**
 * Specify your server-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 */
export const serverSchema = z.object({
  DATABASE_URL: z.string().url(),
  NODE_ENV: z.enum(['development', 'test', 'production']),
  NEXTAUTH_SECRET: z.string(),
  // NextAuth automatically uses the VERCEL_URL if present. VERCEL_URL doesnt include `https` so it cant be validated as a URL.
  NEXTAUTH_URL: z.preprocess((str) => process.env.VERCEL_URL ?? str, process.env.VERCEL ? z.string() : z.string().url()),
  POSTMARK_EMAIL_FROM_NAME: z.string(),
  POSTMARK_EMAIL_FROM_ADDRESS: z.string().email(),
  POSTMARK_SECRET: z.string(),
  GEONAMES_USERNAME: z.string(),
  MAPBOX_PUBLIC_KEY: z.string(),
})

/**
 * Specify your client-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 * To expose them to the client, prefix them with `NEXT_PUBLIC_`.
 */
export const clientSchema = z.object({})

/**
 * You can't destruct `process.env` as a regular object, so you have to do
 * it manually here. This is because Next.js evaluates this at build time,
 * and only used environment variables are included in the build.
 * @type {{ [k in keyof z.infer<typeof clientSchema>]: z.infer<typeof clientSchema>[k] | undefined }}
 */
export const clientEnv = {}
