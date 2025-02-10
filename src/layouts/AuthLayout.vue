<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-md space-y-8">
      <slot></slot>
    </div>
  </div>
</template>