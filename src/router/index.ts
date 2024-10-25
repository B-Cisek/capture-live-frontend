import { createRouter, createWebHistory } from 'vue-router'
import GuestLayout from '@/layouts/GuestLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import Home from '@/views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { layout: GuestLayout },
      component: Home,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      meta: { layout: AuthLayout },
      component: () => import('@/views/Dashboard.vue'),
    },
    {
      path: '/signin',
      name: 'signin',
      meta: { layout: GuestLayout },
      component: () => import('@/views/Auth/Signin.vue'),
    },
    {
      path: '/signup',
      name: 'signup',
      meta: { layout: GuestLayout },
      component: () => import('@/views/Auth/Signup.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFound.vue'),
    },
  ],
})

export default router
