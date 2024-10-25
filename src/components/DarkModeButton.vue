<script setup lang="ts">
import { useColorMode } from '@vueuse/core'

const mode = useColorMode()

const handleChange = () => {
  if (mode.value === 'dark') {
    mode.value = 'light'
  } else {
    mode.value = 'dark'
  }
}
</script>

<template>
  <Button
    @click="handleChange"
    :icon="mode === 'dark' ? 'pi pi-moon' : 'pi pi-sun'"
    severity="secondary"
  />
</template>
