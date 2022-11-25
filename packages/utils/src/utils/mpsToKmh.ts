export const mpsToKmh = (mps: number | null) => {
  return mps === null ? 0 : Math.round(mps * 3.6)
}
