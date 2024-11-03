<script setup lang="ts">
import { reactive } from 'vue'
import { type SignUpForm, useAuthStore } from '@/stores/useAuthStore'
import router from '@/router'

const auth = useAuthStore()

const form = reactive<SignUpForm>({
  email: 'bartek12@vp.pl',
  password: 'password',
  password_confirmation: 'password',
})

const handleSignup = async () => {
  await auth.signup(form)
  await router.push('/dashboard')
}
</script>

<template>
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <h2
      class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight to-blue-500"
    >
      Sign up to continue
    </h2>
  </div>
  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm card">
    <form @submit.prevent="handleSignup" class="flex flex-col gap-4">
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
      <div class="flex flex-col gap-2">
        <label for="password_confirmation">Confirm Password</label>
        <InputText
          id="password_confirmation"
          type="password"
          name="password_confirmation"
          v-model="form.password_confirmation"
          required
        />
        <small id="password_confirmation-error"
          >Enter your username to reset your password.</small
        >
      </div>
      <Button type="submit" class="w-full" label="Sign up" />
    </form>
    <p class="mt-10 text-center text-sm">
      Already have account?
      <RouterLink class="font-semibold leading-6" to="/signin"
        >Sign In Now</RouterLink
      >
    </p>
  </div>
</template>
