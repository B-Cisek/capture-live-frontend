<script setup lang="ts">
import Header from '@/components/Header.vue'
</script>

<template>
  <Header />
  <main class="w-full p-2">
    <slot />
  </main>
  <Toast />
</template>
