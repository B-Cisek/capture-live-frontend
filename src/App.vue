<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import ToggleDarkMode from '@/components/ToggleDarkMode.vue'
</script>

<template>
  <header>
    <ToggleDarkMode />
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
  </header>

  <RouterView />
</template>
