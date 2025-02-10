<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { RouterLink } from 'vue-router'

const email = ref('')
const password = ref('')

const handleSubmit = () => {
  // Handle sign in logic here
  console.log('Sign in:', { email: email.value, password: password.value })
}
</script>

<template>
  <div>
    <h2 class="mt-6 text-center text-3xl font-bold tracking-tight">Sign in to your account</h2>
    <p class="mt-2 text-center text-sm text-muted-foreground">
      Or
      <RouterLink to="/signup" class="font-medium text-primary hover:text-primary/90">create a new account</RouterLink>
    </p>

    <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
      <div class="space-y-4 rounded-md">
        <div>
          <label for="email" class="block text-sm font-medium leading-6">Email address</label>
          <div class="mt-2">
            <Input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              v-model="email"
              class="w-full"
            />
          </div>
        </div>

        <div>
          <label for="password" class="block text-sm font-medium leading-6">Password</label>
          <div class="mt-2">
            <Input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              v-model="password"
              class="w-full"
            />
          </div>
        </div>
      </div>

      <div>
        <Button type="submit" class="w-full">Sign in</Button>
      </div>
    </form>
  </div>
</template>