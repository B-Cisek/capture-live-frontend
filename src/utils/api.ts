import wretch from 'wretch'
import { useCookies } from '@vueuse/integrations/useCookies'
import { useAuthStore } from '@/stores/useAuthStore'
import router from '@/router'

const tokenMiddleware = () => next => (url, opts) => {
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

export const createApi = () => {
  return wretch(import.meta.env.VITE_APP_API_URL, { cache: 'default' })
    .middlewares([tokenMiddleware()])
    .catcher(401, () => {
      const auth = useAuthStore()
      auth.clearState()
      return router.push('/')

      // TODO: Add refresh token logic
      // const token = await wretch("/renewtoken").get().text();
      // storeToken(token);
      // // Replay the original request with new credentials
      // return req.auth(token).get().unauthorized((err) => {
      //   throw err;
      // }).json();
    })
    .resolve(r => r.json())
}

// Create a default instance
export const api = createApi()
