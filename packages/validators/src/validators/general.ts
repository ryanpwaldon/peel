import z from 'zod'

export const validateLng = z
  .number()
  .min(-180, 'Longitude must be between -180 and 180.')
  .max(180, 'Longitude must be between -180 and 180.')
  .transform((val) => val.toFixed(6))
  .transform((val) => parseFloat(val))

export const validateLat = z
  .number()
  .min(-90, 'Latitude must be between -90 and 90.')
  .max(90, 'Latitude must be between -90 and 90.')
  .transform((val) => val.toFixed(6))
  .transform((val) => parseFloat(val))

export const validateAngulation = z
  .number()
  .min(0, 'Direction must be between 0 and 360.')
  .max(360, 'Direction must be between 0 and 360.')
  .transform((val) => val.toFixed(6))
  .transform((val) => parseFloat(val))
