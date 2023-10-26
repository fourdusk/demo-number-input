import { Ref, ref } from 'vue'
import { NumberValue, NumberInputInjection, NumberInputProps, NumberInputOption } from './types'

export const getDefaultProps = (): NumberInputProps => {
  return {
    min: -9999999999,
    max: 9999999999,
    step: 1,
    precision: 0,
    modelValue: undefined
  }
}

export const getDefaultInjectionData = (): NumberInputInjection => {
  return {
    min: -9999999999,
    max: 9999999999,
    step: 1,
    precision: 0,
    modelValue: ref()
  }
}

export const onIncrease = (
  val: Ref<NumberValue>,
  opt: NumberInputOption & { modelValue?: Ref<NumberValue> }
) => {
  const { max, step } = opt
  const value = Number(getCorrectionValue(Number(val.value ?? 0) + step, opt))
  if (value <= max) {
    val.value = value
  }
}

export const onDecrease = (
  val: Ref<NumberValue>,
  opt: NumberInputOption & { modelValue?: Ref<NumberValue> }
) => {
  const { min, step } = opt
  const value = Number(getCorrectionValue(Number(val.value ?? 0) - step, opt))
  if (value >= min) {
    val.value = value
  }
}

export const getCorrectionValue = (
  val: NumberValue,
  opt: NumberInputOption & { modelValue?: Ref<NumberValue> }
) => {
  const { max, min, precision } = opt
  const value = String(val)
  const maxIntegerLength = String(Math.max(Math.abs(max), Math.abs(min))).length
  let regEx = new RegExp(/^-?\d+(\.\d+)?/, 'g')
  const finalPrecision = precision > 0 ? precision : 0
  if (min > 0) {
    if (finalPrecision > 0) {
      // 正浮点数
      regEx = new RegExp(
        '^[1-9][0-9]{0,' +
          maxIntegerLength +
          '}(\\.\\d{0,' +
          finalPrecision +
          '})?|^0(\\.\\d{0,' +
          finalPrecision +
          '})?',
        'g'
      )
    } else {
      // 正整数
      regEx = new RegExp('^[1-9][0-9]{0,' + maxIntegerLength + '}', 'g')
    }
  } else {
    if (max > 0) {
      if (finalPrecision > 0) {
        // 浮点数
        regEx = new RegExp(
          '^(-?\\d{0,' + maxIntegerLength + '})(\\.\\d{0,' + finalPrecision + '})?',
          'g'
        )
      } else {
        // 整数
        regEx = new RegExp('^-?\\d{0,' + maxIntegerLength + '}', 'g')
      }
    } else {
      if (finalPrecision > 0) {
        // 非正浮点数
        regEx = new RegExp(
          '^-\\d{0,' +
            maxIntegerLength +
            '}(\\.\\d{0,' +
            finalPrecision +
            '})?|^0(\\.\\d{0,' +
            finalPrecision +
            '})?',
          'g'
        )
      } else {
        // 非正整数
        regEx = new RegExp('^-[1-9]{0,' + maxIntegerLength + '}|^0', 'g')
      }
    }
  }
  const matchValue = value.match(regEx)
  const finalValue = Array.isArray(matchValue) ? value.slice(0, matchValue[0].length) : matchValue
  if (Number(value) > max) {
    return max
  } else {
    return finalValue
  }
}
