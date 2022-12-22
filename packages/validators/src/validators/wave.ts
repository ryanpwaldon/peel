import z from 'zod'

export const validateWaveName = z
  .string()
  .min(3, 'Wave name must be at least 3 characters.')
  .max(100, 'Wave name must be at most 100 characters.')
  .regex(/^[a-zA-Z0-9_]+$/, 'Wave name must be alphanumeric.')

// prettier-ignore
export const validateWaveRideDirection = z
  .enum(['LEFT', 'RIGHT', 'BOTH'])
