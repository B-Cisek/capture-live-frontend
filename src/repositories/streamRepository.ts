import { api } from '@/utils/api'

export enum Platform {
  TWITCH = 'twitch',
}

export enum Status {
  READY = 'ready',
  IN_PROGRESS = 'in_progress',
}

export interface Stream {
  id: string
  username: string
  platform: Platform
  startAt: string
  endAt: string
  isActive: boolean
  status: Status
}

export const streamRepository = {
  getAll: () => api.get('/streams').json<Stream[]>(),
  getById: (id: string) => {},
  create: (stream: Omit<Stream, 'id' | 'status'>) =>
    api.post(stream, '/streams').json<Stream>(),
  update: (id: string, form: Partial<Stream>) =>
    api.put(form, '/streams/' + id).json(),
  delete: (id: string) => api.delete('/streams/' + id).res(),
  massDelete: (ids: string) =>
    api.json({ ids: ids }).delete('/streams/batch').res(),
}
