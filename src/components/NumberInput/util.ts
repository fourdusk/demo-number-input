export const toFixed = (num: number, digit = 0) => {
  const floatNum = parseFloat(String(num))
  if (typeof floatNum !== 'number' || Number.isNaN(floatNum)) {
    throw new Error('value in not number')
  }
  return Number((Math.round((floatNum + Number.EPSILON) * Math.pow(10, digit)) / Math.pow(10, digit)).toFixed(digit))
}

export const sum = (numList: number[]) => {
  if (numList.length === 0) return null
  if (numList.every(n => n === null || n === undefined)) return null
  const list = numList.filter(v => typeof v === 'number' && !Number.isNaN(v))
  const maxDigits = list.reduce((prev, curr) => {
    const dotIndex = String(curr).indexOf('.')
    if (dotIndex !== -1) {
      const splitList = String(curr).split('.')
      const len = splitList[1].length
      if (len > prev) {
        return len
      } else {
        return prev
      }
    } else {
      return prev
    }
  }, 0)
  let sum = 0
  const scale = Math.pow(10, maxDigits)
  for (const n of list) {
    sum += toFixed(Number(n * scale), 0)
  }
  return sum / scale
}