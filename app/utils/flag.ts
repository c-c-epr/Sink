const OFFSET = 127397

export function getFlag(countryCode: string = '') {
  if (countryCode.length !== 2)
    return undefined

  const a = countryCode.charCodeAt(0)
  const b = countryCode.charCodeAt(1)

  if (a < 65 || a > 90 || b < 65 || b > 90)
    return undefined

  return String.fromCodePoint(OFFSET + a, OFFSET + b)
}
