import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useCookies } from '@vueuse/integrations/useCookies'
import api from '@/utils/axios'
import router from '@/router'
import axios from 'axios'

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
  const ACCESS_TOKEN_KEY = 'token'
  const REFRESH_TOKEN_KEY = 'refresh_token'
  const cookies = useCookies([ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY])
  const authUser = ref<User | null>(null)
  const token = computed<string | null>(() => cookies.get(ACCESS_TOKEN_KEY)) // TODO: better to remove this
  const isAuthenticated = computed<boolean>(() => !!authUser.value?.id)

  async function login(credentials: LoginCredentials): Promise<void> {
    const response = await api.post('/auth/login', credentials)
    setToken(ACCESS_TOKEN_KEY, response.data.access_token)
    setToken(REFRESH_TOKEN_KEY, response.data.refresh_token)
    await fetchUser()
  }

  async function signup(credentials: SignupCredentials): Promise<void> {
    const response = await api.post('/auth/signup', credentials)
    setToken(ACCESS_TOKEN_KEY, response.data.access_token)
    setToken(REFRESH_TOKEN_KEY, response.data.refresh_token)
    await fetchUser()
  }

  async function logout(withRequest: boolean = true): Promise<void> {
    if (withRequest) {
      api.defaults.withCredentials = true
      await api.post('/auth/logout')
    }

    authUser.value = null
    cookies.remove(ACCESS_TOKEN_KEY)
    cookies.remove(REFRESH_TOKEN_KEY)
    await router.replace({ name: 'signin' })
  }

  async function refreshToken(): Promise<string> {
    const response = await axios.post(import.meta.env.VITE_API_URL + '/auth/refresh', null, {
      headers: {
        Authorization: `Bearer ${cookies.get(REFRESH_TOKEN_KEY)}`,
      },
    })

    const newAccessToken = response.data.access_token
    setToken(ACCESS_TOKEN_KEY, newAccessToken)
    // TODO: maybe will change
    // setToken(REFRESH_TOKEN_KEY, response.data.refresh_token)
    await fetchUser()
    return newAccessToken
  }

  async function fetchUser(): Promise<void> {
    const response = await api.get('/auth/me')
    authUser.value = response.data as User
  }

  function setToken(key: string, token: string) {
    cookies.set(key, token, {
      path: '/',
      maxAge: 60 * 60 * 24, // TODO: Make this from jwt expiration?
      secure: import.meta.env.VITE_APP_ENV === 'production',
      sameSite: 'strict',
    })
  }

  return { authUser, login, isAuthenticated, logout, signup, token, fetchUser, refreshToken }
})
