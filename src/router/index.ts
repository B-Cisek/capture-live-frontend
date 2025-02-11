import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import AuthLayout from '../layouts/AuthLayout.vue'
import HomeLayout from '@/layouts/HomeLayout.vue'
import DashboardView from '@/views/DashboardView.vue'
import BaseLayout from '@/layouts/BaseLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { layout: HomeLayout },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { layout: BaseLayout },
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('../views/SignInView.vue'),
      meta: { layout: AuthLayout },
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignUpView.vue'),
      meta: { layout: AuthLayout },
    },
  ],
})

export default router
