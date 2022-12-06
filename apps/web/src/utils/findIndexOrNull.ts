export const findIndexOrNull = <T>(array: T[], predicate: (value: T) => boolean) => {
  const index = array.findIndex(predicate)
  return index === -1 ? null : index
}
