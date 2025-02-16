import { createRouter, createWebHistory } from 'vue-router'
import BaseLayout from '@/layouts/BaseLayout.vue'
import HomeLayout from '@/layouts/HomeLayout.vue'
import Dashboard from '@/views/Dashboard.vue'
import Channels from '@/views/Channels.vue'
import Videos from '@/views/Videos.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import { useAuthStore } from '@/stores/auth.ts'
import Home from '@/views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { layout: HomeLayout },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: { layout: BaseLayout, requiresAuth: true },
    },
    {
      path: '/channels',
      name: 'channels',
      component: Channels,
      meta: { layout: BaseLayout, requiresAuth: true },
    },
    {
      path: '/videos',
      name: 'videos',
      component: Videos,
      meta: { layout: BaseLayout, requiresAuth: true },
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('../views/SignIn.vue'),
      meta: { layout: AuthLayout },
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignUp.vue'),
      meta: { layout: AuthLayout },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'error',
      component: () => import('../views/Error.vue'),
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  const redirectPath = ['/signin', '/signup']

  if (authStore.token && !authStore.isAuthenticated) {
    try {
      await authStore.fetchUser()
    } catch (error) {
      await authStore.logout()
      return next('/signin')
    }
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next('/signin')
  } else if (redirectPath.includes(to.path) && authStore.isAuthenticated) {
    return next('/dashboard')
  } else {
    next()
  }
})

export default router
