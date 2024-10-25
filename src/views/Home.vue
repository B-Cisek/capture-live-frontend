<script setup lang="ts">
import DarkModeButton from '@/components/DarkModeButton.vue'
</script>

<template>
  <main>
    <DarkModeButton />
    <div class="flex gap-4">
      <RouterLink to="/signin">Signin</RouterLink>
      <RouterLink to="/signup">Signup</RouterLink>
      <RouterLink to="/dashboard">dashboard</RouterLink>
    </div>
  </main>
</template>
