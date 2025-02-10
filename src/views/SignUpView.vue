<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { RouterLink } from 'vue-router'

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const name = ref('')

const handleSubmit = () => {
  // Handle sign up logic here
  console.log('Sign up:', { 
    name: name.value,
    email: email.value, 
    password: password.value,
    confirmPassword: confirmPassword.value 
  })
}
</script>

<template>
  <div>
    <h2 class="mt-6 text-center text-3xl font-bold tracking-tight">Create your account</h2>
    <p class="mt-2 text-center text-sm text-muted-foreground">
      Already have an account?
      <RouterLink to="/signin" class="font-medium text-primary hover:text-primary/90">Sign in</RouterLink>
    </p>

    <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
      <div class="space-y-4 rounded-md">
        <div>
          <label for="name" class="block text-sm font-medium leading-6">Full name</label>
          <div class="mt-2">
            <Input
              id="name"
              name="name"
              type="text"
              autocomplete="name"
              required
              v-model="name"
              class="w-full"
            />
          </div>
        </div>

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
              autocomplete="new-password"
              required
              v-model="password"
              class="w-full"
            />
          </div>
        </div>

        <div>
          <label for="confirmPassword" class="block text-sm font-medium leading-6">Confirm password</label>
          <div class="mt-2">
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autocomplete="new-password"
              required
              v-model="confirmPassword"
              class="w-full"
            />
          </div>
        </div>
      </div>

      <div>
        <Button type="submit" class="w-full">Create account</Button>
      </div>
    </form>
  </div>
</template>