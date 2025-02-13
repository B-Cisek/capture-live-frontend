import { createRouter, createWebHistory } from 'vue-router'
import { Home } from 'lucide-vue-next'
import BaseLayout from '@/layouts/BaseLayout.vue'
import HomeLayout from '@/layouts/HomeLayout.vue'
import Dashboard from '@/views/Dashboard.vue'
import Channels from '@/views/Channels.vue'
import Videos from '@/views/Videos.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import { useAuthStore } from '@/stores/auth.ts'

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
      next('/signin')
    }
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/signin')
  } else if (redirectPath.includes(to.path) && authStore.isAuthenticated) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router
