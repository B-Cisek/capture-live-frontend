import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { api } from '@/utils/api'
import { useCookies } from '@vueuse/integrations/useCookies'
import { useStorage } from '@vueuse/core'

export interface User {
  id: string
  email: string
}

export interface SignUpForm {
  email: string
  password: string
  password_confirmation: string
}

export interface SignInForm {
  email: string
  password: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(useStorage('user').value || null)
  const isAuthenticated = computed(() => user.value !== null)
  const cookies = useCookies(['token'])

  async function signin(form: SignInForm): void {
    const res = await api.url('/signin').post(form)

    cookies.set('token', res.token, {
      path: '/', // Make cookie accessible site-wide
      secure: true, // Ensures cookie is sent over HTTPS
      httpOnly: false, // Set to true if used on server-side only
      sameSite: 'strict', // Strict setting prevents cross-site sending
    })

    await fetchUser()
  }

  async function signup(form: SignUpForm): void {
    const res = await api.url('/signup').post(form)

    cookies.set('token', res.token, {
      path: '/', // Make cookie accessible site-wide
      secure: true, // Ensures cookie is sent over HTTPS
      httpOnly: false, // Set to true if used on server-side only
      sameSite: 'strict', // Strict setting prevents cross-site sending
    })

    await fetchUser()
  }

  async function logout(): void {
    await api.url('/logout').post()
    clearState()
  }

  async function fetchUser(): void {
    user.value = (await api.get('/me')) as User
    useStorage('user', user.value)
  }

  function clearState(): void {
    cookies.remove('token')
    user.value = null
    useStorage('user').value = null
  }

  return { signin, logout, signup, user, clearState, isAuthenticated }
})
