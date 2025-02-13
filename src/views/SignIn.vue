<script setup lang="ts">
import { reactive } from 'vue'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { type LoginCredentials, useAuthStore } from '@/stores/auth.ts'
import router from '@/router'
import { Loader2 } from 'lucide-vue-next'
import type { AxiosError } from 'axios'

const auth = useAuthStore()

const credentials = reactive<LoginCredentials>({
  email: 'john.doe@app.com',
  password: 'password',
})

const submitInfo = reactive({
  loading: false,
  message: '',
})

const handleSubmit = async () => {
  submitInfo.loading = true

  if (auth.isAuthenticated) return

  try {
    await auth.login(credentials)
    await router.replace({ name: 'dashboard' })
  } catch (err: AxiosError) {
    submitInfo.message = Array.isArray(err.response?.data?.message)
      ? err.response?.data?.message.join(', ')
      : err.response?.data?.message
  } finally {
    submitInfo.loading = false
  }
}
</script>

<template>
  <Card class="mx-auto max-w-sm">
    <CardHeader>
      <CardTitle class="text-2xl"> Login </CardTitle>
      <CardDescription> Enter your email below to login to your account </CardDescription>
    </CardHeader>
    <CardContent>
      <div class="grid gap-4">
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input
            v-model="credentials.email"
            id="email"
            type="email"
            placeholder="m@example.com"
            required
          />
        </div>
        <div class="grid gap-2">
          <div class="flex items-center">
            <Label for="password">Password</Label>
            <a href="#" class="ml-auto inline-block text-sm underline"> Forgot your password? </a>
          </div>
          <Input v-model="credentials.password" id="password" type="password" required />
        </div>
        <span v-if="submitInfo.message" class="text-sm text-red-500">
          {{ submitInfo.message }}
        </span>
        <Button @click="handleSubmit" :disabled="submitInfo.loading" type="submit" class="w-full">
          <Loader2 v-if="submitInfo.loading" class="w-4 h-4 mr-2 animate-spin" />
          Login
        </Button>
        <Button variant="outline" class="w-full"> Login with Google </Button>
      </div>
      <div class="mt-4 text-center text-sm">
        Don't have an account?
        <RouterLink to="/signup" class="underline"> Sign up </RouterLink>
      </div>
    </CardContent>
  </Card>
</template>
