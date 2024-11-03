import { useAuthStore } from '@/stores/useAuthStore'
import type { Middleware } from '@/middlewares/types'

export const auth: Middleware = (to, from, next) => {
  const authStore = useAuthStore()

  if (!authStore.isAuthenticated) {
    next({ name: 'signin' })
  } else {
    next()
  }
}
