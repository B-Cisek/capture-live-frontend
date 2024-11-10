<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Platform, streamRepository } from '@/repositories/streamRepository'

const emit = defineEmits(['close', 'refreshStreams'])
const platforms = ref([{ label: 'Twitch', value: Platform.TWITCH }])

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  stream: {
    type: Object,
    default: {},
  },
})

const form = reactive({
  username: props.stream.username,
  platform: props.stream.platform,
  is_active: props.stream.isActive,
  start_at: props.stream.startAt ? new Date(props.stream.startAt) : null,
  end_at: props.stream.endAt ? new Date(props.stream.endAt) : null,
})

const handleSubmit = async () => {
  await streamRepository.update(props.stream.id, {
    ...form,
    end_at: form.end_at?.toISOString(),
    start_at: form.start_at?.toISOString(),
  })
  emit('close')
  emit('refreshStreams')
}
</script>

<template>
  <Dialog
    @close="emit('close')"
    :visible="open"
    modal
    :draggable="false"
    header="Edit Stream"
    :style="{ width: '25rem' }"
  >
    <template #closeicon>
      <Button icon="pi pi-times" @click="emit('close')" severity="secondary" />
    </template>
    <div class="flex flex-col gap-2">
      <div class="flex flex-col gap-1">
        <label for="username" class="font-semibold w-24">Username</label>
        <InputText
          v-model="form.username"
          id="username"
          class="flex-auto"
          autocomplete="off"
        />
      </div>
      <div class="flex flex-col gap-1">
        <label for="platform" class="font-semibold w-24">Platform</label>
        <Select
          v-model="form.platform"
          :options="platforms"
          optionLabel="label"
          option-value="value"
          placeholder="Select a Platform"
        />
      </div>
      <div class="flex flex-col gap-1">
        <label for="platform" class="font-semibold w-24">Is Active</label>
        <Select
          v-model="form.is_active"
          :options="[
            { label: 'Active', value: true },
            { label: 'InActive', value: false },
          ]"
          optionLabel="label"
          option-value="value"
        />
      </div>
      <div class="flex flex-col gap-1">
        <label for="start-at" class="font-semibold w-24">Start At</label>
        <DatePicker
          id="start-at"
          v-model="form.start_at"
          showTime
          hourFormat="24"
          fluid
        />
      </div>
      <div class="flex flex-col gap-1">
        <label for="end-at" class="font-semibold w-24">End At</label>
        <DatePicker
          id="end-at"
          v-model="form.end_at"
          showTime
          hourFormat="24"
          fluid
        />
      </div>
      <div class="flex justify-end gap-2 mt-2">
        <Button
          type="button"
          label="Cancel"
          severity="secondary"
          @click="emit('close')"
        ></Button>
        <Button type="button" label="Save" @click="handleSubmit" />
      </div>
    </div>
  </Dialog>
</template>
