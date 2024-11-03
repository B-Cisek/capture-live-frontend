<script setup lang="ts">
import { reactive } from 'vue'
import { type SignInForm, useAuthStore } from '@/stores/useAuthStore'
import router from '@/router'

const auth = useAuthStore()

const form = reactive<SignInForm>({
  email: 'bartek12@vp.pl',
  password: 'password',
})

const handleSignIn = async () => {
  await auth.signin(form)
  await router.push('/dashboard')
}
</script>

<template>
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <h2
      class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight to-blue-500"
    >
      Sign in to continue
    </h2>
  </div>
  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm card">
    <form @submit.prevent="handleSignIn" class="flex flex-col gap-4">
      <div class="flex flex-col gap-2">
        <label for="email">Email</label>
        <InputText
          id="email"
          type="email"
          name="email"
          v-model="form.email"
          required
        />
        <small id="email-error"
          >Enter your username to reset your password.</small
        >
      </div>
      <div class="flex flex-col gap-2">
        <label for="password">Password</label>
        <InputText
          id="password"
          type="password"
          name="password"
          v-model="form.password"
          required
        />
        <small id="password-error"
          >Enter your username to reset your password.</small
        >
      </div>
      <Button type="submit" class="w-full" label="Sign in" />
    </form>
    <p class="mt-10 text-center text-sm">
      Not a member?
      <RouterLink class="font-semibold leading-6" to="/signup"
        >Sign up now</RouterLink
      >
    </p>
  </div>
</template>
