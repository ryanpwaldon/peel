// @ts-check

// Import environment variables
import dotenv from 'dotenv'
dotenv.config({ path: '../../.env' })

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import('./src/env/server.mjs'))

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    // Enables hot-reload and easy integration for local packages
    transpilePackages: ['@peel/api', '@peel/auth', '@peel/db', '@peel/validators'],
  },
  // We already do linting on GH actions
  eslint: {
    ignoreDuringBuilds: !!process.env.CI,
  },
  devIndicators: {
    buildActivity: false,
  },
}

export default config
