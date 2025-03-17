<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Switch } from '@/components/ui/switch'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { useForm } from 'vee-validate'
import { onMounted, ref } from 'vue'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useChannelStore } from '@/stores/channel.ts'

interface Channel {
  id: string
  name: string
  platform: 'twitch' | 'youtube' | 'kick'
  isActive: boolean
}

// Sample channels data
const channels = ref<Channel[]>([
  { id: '1', name: 'GamersUnite', platform: 'twitch', isActive: true },
  { id: '2', name: 'StreamMaster', platform: 'youtube', isActive: false },
  { id: '3', name: 'ProGamer', platform: 'kick', isActive: true },
])

// Function to handle channel deletion
const deleteChannel = (id: string) => {
  channels.value = channels.value.filter((channel) => channel.id !== id)
}

// Function to toggle channel active status
const toggleChannelStatus = (id: string) => {
  const channel = channels.value.find((c) => c.id === id)
  if (channel) {
    channel.isActive = !channel.isActive
  }
}

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(2).max(50),
    platform: z.enum(['twitch', 'youtube', 'kick']),
    isActive: z.boolean().default(true),
  }),
)

const { isFieldDirty, handleSubmit, isSubmitting } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit((values) => {
  // Add new channel with unique ID
  const newChannel: Channel = {
    id: Date.now().toString(),
    name: values.name,
    platform: values.platform as 'twitch' | 'youtube' | 'kick',
    isActive: values.isActive,
  }

  channels.value.push(newChannel)
  isOpen.value = false
})

const isOpen = ref(false)

// Get platform icon based on platform name
const getPlatformIcon = (platform: string) => {
  switch (platform) {
    case 'twitch':
      return '🟣' // Twitch icon placeholder
    case 'youtube':
      return '🔴' // YouTube icon placeholder
    case 'kick':
      return '🟢' // Kick icon placeholder
    default:
      return '📺'
  }
}

const channelStore = useChannelStore()

onMounted(async () => {
  await channelStore.fetchChannels()
})
</script>

<template>
  <div class="container mx-auto p-4">
    <div class="flex items-center mb-5">
      <h1 class="text-2xl font-bold">{{ $route.meta.title ?? '' }}</h1>
    </div>
    <div class="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
      <div class="relative w-full md:w-64">
        <Input type="text" placeholder="Search channels..." class="pl-8 w-full" />
        <div class="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-search"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>
      </div>

      <div class="flex items-center gap-4 w-full md:w-auto">
        <Select defaultValue="newest">
          <SelectTrigger class="w-full md:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="platform">Platform</SelectItem>
          </SelectContent>
        </Select>

        <Dialog v-model:open="isOpen">
          <DialogTrigger as-child v-if="channels.length !== 0">
            <Button> Add Channel </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Channel</DialogTitle>
              <DialogDescription> </DialogDescription>
            </DialogHeader>
            <form class="space-y-4">
              <FormField v-slot="{ componentField }" name="name" :validate-on-blur="!isFieldDirty">
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Name" v-bind="componentField" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
              <FormField v-slot="{ componentField }" name="platform">
                <FormItem>
                  <FormLabel>Plaform</FormLabel>
                  <Select v-bind="componentField">
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="twitch"> Twitch </SelectItem>
                        <SelectItem value="youtube"> YouTube </SelectItem>
                        <SelectItem value="kick"> Kick </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              </FormField>
              <FormField v-slot="{ value, handleChange }" name="isActive">
                <FormItem class="flex flex-row items-center justify-between rounded-lg border p-4">
                  <FormLabel> Is Active </FormLabel>
                  <Switch :model-value="value" @update:model-value="handleChange" />
                </FormItem>
              </FormField>
            </form>
            <DialogFooter>
              <DialogClose as-child>
                <Button variant="secondary"> Cancel </Button>
              </DialogClose>
              <Button @click="onSubmit"> Create </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>

    <!-- Channel cards -->
    <div class="grid gap-4">
      <Card v-for="channel in channels" :key="channel.id">
        <div class="flex items-center p-4">
          <!-- Avatar/Icon section -->
          <div class="mr-3 flex-shrink-0">
            <div
              class="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-xl"
            >
              {{ getPlatformIcon(channel.platform) }}
            </div>
          </div>

          <!-- Channel info section -->
          <div class="flex-grow">
            <div class="flex items-center">
              <h3 class="text-lg font-medium">{{ channel.name }}</h3>
              <span
                class="ml-2 text-xs px-2 py-0.5 rounded-full"
                :class="
                  channel.isActive ? 'bg-green-800 text-green-100' : 'bg-gray-700 text-gray-300'
                "
              >
                {{ channel.isActive ? 'Live' : 'Offline' }}
              </span>
            </div>
            <p class="text-sm text-gray-400">
              {{ channel.platform.charAt(0).toUpperCase() + channel.platform.slice(1) }}
            </p>
          </div>

          <!-- Controls section -->
          <div class="flex items-center gap-2">
            <Switch
              :model-value="channel.isActive"
              @update:model-value="toggleChannelStatus(channel.id)"
            />
            <Button
              variant="ghost"
              size="sm"
              class="text-gray-400 hover:text-white hover:bg-gray-800"
              @click="deleteChannel(channel.id)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-trash-2"
              >
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                <line x1="10" x2="10" y1="11" y2="17" />
                <line x1="14" x2="14" y1="11" y2="17" />
              </svg>
            </Button>
          </div>
        </div>
      </Card>
    </div>

    <!-- Empty state when no channels -->
    <Card v-if="channels.length === 0">
      <CardContent class="flex flex-col items-center justify-center py-10">
        <p class="text-gray-400 mb-4">No channels added yet</p>
        <Button @click="isOpen = true">Add Your First Channel</Button>
      </CardContent>
    </Card>
  </div>
</template>
