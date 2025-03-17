<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { useAuthStore } from '@/stores/auth'
import { RouterLink } from 'vue-router'

const auth = useAuthStore()
</script>

<template>
  <main>
    <Button v-if="auth.isAuthenticated" :as="RouterLink" to="/dashboard">Dashboard</Button>
  </main>
</template>
