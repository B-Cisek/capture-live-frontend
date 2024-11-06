import { createRouter, createWebHistory } from 'vue-router'
import GuestLayout from '@/layouts/GuestLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import Home from '@/views/Home.vue'
import type { Middleware } from '@/middlewares/types'
import { auth } from '@/middlewares/auth'
import { guest } from '@/middlewares/guest'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { layout: GuestLayout, middleware: [] },
      component: Home,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      meta: { layout: AuthLayout, middleware: ['auth'] },
      component: () => import('@/views/Dashboard.vue'),
    },
    {
      path: '/signin',
      name: 'signin',
      meta: { layout: GuestLayout, middleware: ['guest'] },
      component: () => import('@/views/Auth/Signin.vue'),
    },
    {
      path: '/signup',
      name: 'signup',
      meta: { layout: GuestLayout, middleware: ['guest'] },
      component: () => import('@/views/Auth/Signup.vue'),
    },
    {
      path: '/streams',
      name: 'streams',
      meta: { layout: AuthLayout, middleware: ['auth'] },
      component: () => import('@/views/Stream.vue'),
    },
    {
      path: '/videos',
      name: 'videos',
      meta: { layout: AuthLayout, middleware: ['auth'] },
      component: () => import('@/views/Video.vue'),
    },
    {
      path: '/settings',
      name: 'settings',
      meta: { layout: AuthLayout, middleware: ['auth'] },
      component: () => import('@/views/Setting.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFound.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  const middlewares = to.meta.middleware as string[]
  const middlewareHandlers = { auth, guest } as const

  if (!middlewares || !middlewares.length) {
    return next()
  }

  for (const name of middlewares) {
    const handler = (middlewareHandlers as Middleware)[name]

    if (!handler) {
      throw new Error(`Middleware "${name}" not found`)
    }

    handler(to, from, next)
  }
})

export default router
