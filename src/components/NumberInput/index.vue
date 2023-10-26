<template>
  <slot>
    <Field />
    <Increase />
    <Decrease />
  </slot>
</template>

<script setup lang="ts">
import { NumberValue, NumberInputProps } from './types'
import { provide } from 'vue'
import { getDefaultProps, getCorrectionValue } from './useNumberInput'
import { numberInputInjectionKey } from './keys'
import Field from './Field.vue'
import Increase from './Increase.vue'
import Decrease from './Decrease.vue'

defineOptions({
  name: 'NumberInput'
})

const props = withDefaults(defineProps<NumberInputProps>(), getDefaultProps())

const modelValue = defineModel<NumberValue>()

const injectionData = { ...props, modelValue }

modelValue.value = getCorrectionValue(modelValue.value, injectionData)

provide(numberInputInjectionKey, injectionData)
</script>
