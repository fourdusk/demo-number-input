import { InjectionKey, Ref } from 'vue'

export type NumberValue = string | number | null | undefined

export type NumberInputProps = {
  min: number
  max: number
  step: number
  precision: number
  modelValue: NumberValue
}

export type NumberInputOption = Omit<NumberInputProps, 'modelValue'>

export type NumberInputInjection = NumberInputOption & {
  modelValue: Ref<NumberValue>
}

export type NumberInputInjectionKey = InjectionKey<NumberInputInjection>
