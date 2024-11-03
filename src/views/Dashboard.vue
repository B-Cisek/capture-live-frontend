<script setup lang="ts">
import { api } from '@/utils/api.js'
import { ref } from 'vue'

const user = ref({})

const handle = async () => {
  user.value = await api.get('/me')
}
</script>

<template>
  <div>
    <Button @click="handle" label="Get"></Button>
    <Button @click="user = null" label="Clear"></Button>
    <span>{{ user }}</span>
  </div>
</template>
