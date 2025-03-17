import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/utils/axios'

interface Platform {
  id: string
  name: string
  url: string
}

interface Channel {
  id: string
  name: string
  platform: Platform
  isActive: boolean
  startAt: Date
  endAt: Date
  status: 'ready' | 'in_progress'
  updatedAt: Date
  createdAt: Date
}

export const useChannelStore = defineStore('channel', () => {
  const channels = ref<Channel[]>([])

  async function fetchChannels() {
    const response = await api.get('/channels')
    channels.value = response.data.data
  }

  return { fetchChannels, channels }
})
