import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useCookies } from '@vueuse/integrations/useCookies'
import { useStorage } from '@vueuse/core'
import { api } from '@/utils/api'

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
    const response = await api.post(form, '/signin').json()

    setCookie('token', response.token)

    await fetchUser()
  }

  async function signup(form: SignUpForm): void {
    const response = await api.post(form, '/signup').json()

    setCookie('token', response.token)

    await fetchUser()
  }

  async function logout(): void {
    try {
      await api.url('/logout').post().res()
      clearState()
    } catch (err) {
      clearState()
    }
  }

  async function fetchUser(): void {
    user.value = (await api.get('/me').json()) as User
    useStorage('user', user.value)
  }

  function clearState(): void {
    cookies.remove('token')
    user.value = null
    useStorage('user').value = null
  }

  function setCookie(key: string, value: string) {
    cookies.set(key, value, {
      path: '/', // Make cookie accessible site-wide
      secure: true, // Ensures cookie is sent over HTTPS
      httpOnly: false, // Set to true if used on server-side only
      sameSite: 'strict', // Strict setting prevents cross-site sending
    })
  }

  return { signin, logout, signup, user, clearState, isAuthenticated }
})
