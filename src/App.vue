<template>
  <NumberInput v-model="num" v-bind="opt">
    <!-- <Field></Field> -->
    <!-- <Increase></Increase> -->
    <!-- <Decrease></Decrease> -->
  </NumberInput>
  <button @click="handleIncrease">加</button>
  <button @click="handleDecrease">减</button>
</template>

<script setup lang="ts">
import { onIncrease, onDecrease } from './components/NumberInput/useNumberInput'
import { ref } from 'vue'
import NumberInput from './components/NumberInput/index.vue'
// import Field from './components/NumberInput/Field.vue'
// import Increase from './components/NumberInput/Increase.vue'
// import Decrease from './components/NumberInput/Decrease.vue'

const num = ref('adsf')

const opt = {
  max: 3.14,
  min: -6.78,
  step: 0.2,
  precision: 2
}

const handleIncrease = () => {
  onIncrease(num, opt)
}

const handleDecrease = () => {
  onDecrease(num, opt)
}
</script>
