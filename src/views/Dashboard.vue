<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import api from '@/utils/axios'

const refresh = async () => {
  const res = await api.get('/channels')
  console.log(res.data)
}
</script>

<template>
  <h1>Dashboard</h1>
  <RouterLink to="/signup">Sign Up</RouterLink>
  <RouterLink to="/signin">Sign In</RouterLink>

  <button @click="refresh">get channels</button>
</template>
