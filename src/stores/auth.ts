import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useCookies } from '@vueuse/integrations/useCookies'
import api from '@/utils/axios.ts'
import router from '@/router'

interface User {
  id: string
  email: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface SignupCredentials {
  email: string
  password: string
}

export const useAuthStore = defineStore('auth', () => {
  const TOKEN_KEY = 'token'
  const cookies = useCookies([TOKEN_KEY])
  const authUser = ref<User | null>(null)
  const token = computed<string | null>(() => cookies.get(TOKEN_KEY)) // TODO: better to remove this
  const isAuthenticated = computed<boolean>(() => !!authUser.value?.id)

  async function login(credentials: LoginCredentials): Promise<void> {
    const response = await api.post('/auth/login', credentials)
    setToken(response.data.access_token)
    await fetchUser()
  }

  async function signup(credentials: SignupCredentials): Promise<void> {
    const response = await api.post('/auth/signup', credentials)
    setToken(response.data.access_token)
    await fetchUser()
  }

  async function logout(): Promise<void> {
    //const response = await api.post('/auth/logout', credentials)
    cookies.remove(TOKEN_KEY)
    authUser.value = null
    await router.replace({ name: 'signin' })
  }

  async function fetchUser(): Promise<void> {
    const response = await api.get('/auth/me')
    authUser.value = response.data as User
  }

  function setToken(token: string) {
    cookies.set(TOKEN_KEY, token, {
      path: '/',
      maxAge: 60 * 60 * 24, // TODO: Make this from jwt expiration?
      secure: import.meta.env.VITE_APP_ENV === 'production',
      sameSite: 'strict',
    })
  }

  return { authUser, login, isAuthenticated, logout, signup, token, fetchUser }
})
