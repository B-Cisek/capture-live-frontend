import wretch from 'wretch'
import { dedupe } from 'wretch/middlewares'
import { useCookies } from '@vueuse/integrations/useCookies'
import { useAuthStore } from '@/stores/useAuthStore'
import router from '@/router'

const token = () => next => (url, opts) => {
  const cookies = useCookies(['token'])
  const token = cookies.get('token')

  if (token) {
    opts.headers = {
      ...opts.headers,
      Authorization: `Bearer ${token}`,
    }
  }

  return next(url, opts)
}

export const api = wretch()
  .url(import.meta.env.VITE_APP_API_URL + '/api')
  .options({ credentials: 'include', mode: 'cors' })
  .headers({
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Referer: import.meta.env.VITE_APP_API_URL,
  })
  .middlewares([
    token(), // add token if present in cookies
    dedupe(), // Dedupe identical in-flight requests
  ])
  // Global error handler
  .catcher(401, async () => {
    useAuthStore().clearState() // TODO: handle refresh token
    await router.push('/signin')
  })
  .catcher(500, err => {
    console.error('Server error:', err)
    throw err
  })
