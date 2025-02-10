import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import AuthLayout from '../layouts/AuthLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('../views/SignInView.vue'),
      meta: { layout: AuthLayout }
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignUpView.vue'),
      meta: { layout: AuthLayout }
    }
  ]
})

export default router
