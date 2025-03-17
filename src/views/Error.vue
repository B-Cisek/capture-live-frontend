<script setup lang="ts">
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RouterLink } from 'vue-router'
</script>
<template>
  <div class="flex min-h-screen items-center justify-center">
    <Card class="w-[350px]">
      <CardContent>
        <span class="block text-center w-full text-8xl font-extrabold">404</span>
      </CardContent>
      <CardFooter class="flex-col justify-between px-6 pb-6">
        <span class="font-bold text-center text-4xl border-t py-6">Page Not Found</span>
        <Button :as="RouterLink" to="/"> GO TO HOMEPAGE </Button>
      </CardFooter>
    </Card>
  </div>
</template>
