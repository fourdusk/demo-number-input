<template>
  <slot>
    <button @click="onClick">-</button>
  </slot>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { onDecrease, getDefaultInjectionData } from './useNumberInput'
import { numberInputInjectionKey } from './keys'

defineOptions({
  name: 'NumberInputDecrease'
})

const injectionData = inject(numberInputInjectionKey, getDefaultInjectionData())

const onClick = () => {
  onDecrease(injectionData.modelValue, injectionData)
}
</script>
