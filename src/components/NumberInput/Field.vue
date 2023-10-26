<template>
  <slot><input v-model="injectionData.modelValue.value" @input="onInput" /></slot>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { getCorrectionValue, getDefaultInjectionData } from './useNumberInput'
import { numberInputInjectionKey } from './keys'

defineOptions({
  name: 'NumberInputField'
})

const injectionData = inject(numberInputInjectionKey, getDefaultInjectionData())

const onInput = (event: Event) => {
  const newVal = (event.target as HTMLInputElement).value
  const correctionValue = getCorrectionValue(newVal, injectionData)
  injectionData.modelValue.value = correctionValue
}
</script>
