<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuthStore, type SignupCredentials } from '@/stores/auth'
import router from '@/router'
import { Loader2 } from 'lucide-vue-next'

const auth = useAuthStore()

const password_confirmation = ref<string>('')

const credentials = reactive<SignupCredentials>({
  email: '',
  password: '',
})

const submitInfo = reactive({
  loading: false,
  message: '',
})

const handleSubmit = async () => {
  submitInfo.loading = true

  if (auth.isAuthenticated) return

  if (password_confirmation.value !== credentials.password) {
    submitInfo.message = 'Passwords do not match'
    submitInfo.loading = false
    return
  }

  try {
    await auth.signup(credentials)
    await router.replace({ name: 'dashboard' })
  } catch (err: unknown) {
    console.log(err)

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
      <CardTitle class="text-xl"> Sign Up </CardTitle>
      <CardDescription> Enter your information to create an account </CardDescription>
    </CardHeader>
    <CardContent>
      <div class="grid gap-4">
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input
            id="email"
            v-model="credentials.email"
            type="email"
            placeholder="m@example.com"
            required
          />
        </div>
        <div class="grid gap-2">
          <Label for="password">Password</Label>
          <Input id="password" v-model="credentials.password" type="password" />
        </div>
        <div class="grid gap-2">
          <Label for="password_confirmation">Password Confirmation</Label>
          <Input id="password_confirmation" v-model="password_confirmation" type="password" />
        </div>
        <span v-if="submitInfo.message" class="text-sm text-red-500">
          {{ submitInfo.message }}
        </span>
        <Button :disabled="submitInfo.loading" type="submit" class="w-full" @click="handleSubmit">
          <Loader2 v-if="submitInfo.loading" class="w-4 h-4 mr-2 animate-spin" />
          Create an account
        </Button>
        <Button variant="outline" class="w-full"> Sign up with GitHub </Button>
      </div>
      <div class="mt-4 text-center text-sm">
        Already have an account?
        <RouterLink to="/signin" class="underline"> Sign in </RouterLink>
      </div>
    </CardContent>
  </Card>
</template>
