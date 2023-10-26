<template>
  <slot>
    <button @click="onClick">+</button>
  </slot>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { onIncrease, getDefaultInjectionData } from './useNumberInput'
import { numberInputInjectionKey } from './keys'

defineOptions({
  name: 'NumberInputIncrease'
})

const injectionData = inject(numberInputInjectionKey, getDefaultInjectionData())

const onClick = () => {
  onIncrease(injectionData.modelValue, injectionData)
}
</script>
