<script setup lang="ts">
import { reactive, ref } from 'vue'
import { type SignUpForm, useAuthStore } from '@/stores/useAuthStore'
import router from '@/router'
import type { WretchError } from 'wretch'

const auth = useAuthStore()

const form = reactive<SignUpForm>({
  email: 'bartek12@vp.pl',
  password: 'password',
  password_confirmation: 'password',
})

const validationErrors = ref()

const handleSignup = async () => {
  try {
    await auth.signup(form)
    await router.push('/dashboard')
  } catch (err: WretchError) {
    if (err.json.error) {
      validationErrors.value = err.json.errors
    }
  }
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
          :invalid="!!validationErrors?.email"
          required
        />
        <small
          id="email-error"
          v-if="validationErrors?.email"
          class="text-red-700 text-sm font-semibold"
          >{{ validationErrors?.email[0] }}</small
        >
      </div>
      <div class="flex flex-col gap-2">
        <label for="password">Password</label>
        <InputText
          id="password"
          type="password"
          name="password"
          v-model="form.password"
          :invalid="!!validationErrors?.password"
          required
        />
        <small
          id="password-error"
          v-if="validationErrors?.password"
          class="text-red-700 text-sm font-semibold"
          >{{ validationErrors?.password[0] }}</small
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
