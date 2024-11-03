import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

export interface Middleware {
  (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext,
  ): void
}
