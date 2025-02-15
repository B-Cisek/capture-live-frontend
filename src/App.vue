<script setup lang="ts">
import { useColorMode } from '@vueuse/core'
import { RouterView } from 'vue-router'

useColorMode()
</script>

<template>
  <component :is="$route.meta.layout || 'div'">
    <RouterView />
  </component>
</template>
