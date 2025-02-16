<script setup lang="ts">
import ToggleDarkMode from '@/components/ToggleDarkMode.vue'
import { Badge } from '@/components/ui/badge'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useAuthStore } from '@/stores/auth'
import { Bell, CircleUser, Home, Menu, MonitorPlay } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'

const auth = useAuthStore()

const handleLogout = async () => {
  await auth.logout()
}
</script>

<template>
  <div class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
    <div class="hidden border-r bg-muted/40 md:block">
      <div class="flex h-full max-h-screen flex-col gap-2">
        <div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <RouterLink to="/" class="flex items-center gap-2 font-semibold">
            <MonitorPlay class="h-6 w-6" />
            <span class="">Capture Live</span>
          </RouterLink>
          <Button variant="outline" size="icon" class="ml-auto h-8 w-8">
            <Bell class="h-4 w-4" />
            <span class="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div class="flex-1">
          <nav class="grid items-start px-2 text-sm font-medium lg:px-4">
            <!-- Current -->
            <!-- flex items-center gap-3 rounded-lg px-3 py-2 bg-muted text-primary transition-all hover:text-primary -->
            <!-- flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary -->

            <RouterLink
              to="/dashboard"
              class="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary"
              :class="
                $route.name === 'dashboard' ? 'bg-muted text-primary' : 'text-muted-foreground'
              "
            >
              <Home class="h-4 w-4" />
              Dashboard
            </RouterLink>
            <RouterLink
              to="/channels"
              class="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary"
              :class="
                $route.name === 'channels' ? 'bg-muted text-primary' : 'text-muted-foreground'
              "
            >
              <Home class="h-4 w-4" />
              Channels
            </RouterLink>
            <RouterLink
              to="/videos"
              class="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary"
              :class="$route.name === 'videos' ? 'bg-muted text-primary' : 'text-muted-foreground'"
            >
              <Home class="h-4 w-4" />
              Videos
            </RouterLink>
            <RouterLink
              to="/settings"
              class="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary"
              :class="
                $route.name === 'settings' ? 'bg-muted text-primary' : 'text-muted-foreground'
              "
            >
              <Home class="h-4 w-4" />
              Settings
            </RouterLink>
          </nav>
        </div>
        <div class="mt-auto p-4">
          <Card>
            <CardHeader class="p-2 pt-0 md:p-4">
              <CardTitle>Upgrade to Pro</CardTitle>
              <CardDescription>
                Unlock all features and get unlimited access to our support team.
              </CardDescription>
            </CardHeader>
            <CardContent class="p-2 pt-0 md:p-4 md:pt-0">
              <Button size="sm" class="w-full"> Upgrade </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    <div class="flex flex-col">
      <header class="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
        <Sheet>
          <SheetTrigger as-child>
            <Button variant="outline" size="icon" class="shrink-0 md:hidden">
              <Menu class="h-5 w-5" />
              <span class="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" class="flex flex-col">
            <nav class="grid gap-2 text-lg font-medium">
              <RouterLink to="/" class="flex items-center gap-2 text-lg font-semibold">
                <MonitorPlay class="h-6 w-6" />
                <span class="sr-only">Capture Live</span>
              </RouterLink>
              <RouterLink
                to="/dashboard"
                class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <Home class="h-5 w-5" />
                Dashboard
              </RouterLink>
              <RouterLink
                to="/channels"
                class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <Home class="h-5 w-5" />
                Channels
              </RouterLink>
              <RouterLink
                to="/videos"
                class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <Home class="h-5 w-5" />
                Videos
              </RouterLink>
            </nav>
            <div class="mt-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Upgrade to Pro</CardTitle>
                  <CardDescription>
                    Unlock all features and get unlimited access to our support team.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button size="sm" class="w-full"> Upgrade </Button>
                </CardContent>
              </Card>
            </div>
          </SheetContent>
        </Sheet>
        <div class="w-full flex-1"></div>
        <ToggleDarkMode />
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="secondary" size="icon" class="rounded-full">
              <CircleUser class="h-5 w-5" />
              <span class="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem :as="RouterLink" to="/settings">Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem @click="handleLogout">Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <main class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div class="flex items-center">
          <h1 class="text-lg font-semibold md:text-2xl">{{ $route.meta.title ?? '' }}</h1>
        </div>
        <div
          class="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
        >
          <slot />
          <!-- <div class="flex flex-col items-center gap-1 text-center">
            <h3 class="text-2xl font-bold tracking-tight">You have no products</h3>
            <p class="text-sm text-muted-foreground">
              You can start selling as soon as you add a product.
            </p>
            <Button class="mt-4"> Add Product </Button>
          </div> -->
        </div>
      </main>
    </div>
  </div>
</template>
