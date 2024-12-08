<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Platform, streamRepository } from '@/repositories/streamRepository'
import { useToast } from 'primevue/usetoast'

enum TwitchQualityEnum {
  WORST = 'worst',
  _160P = '160p',
  _360P = '360p',
  _480P = '480p',
  _720P = '720p60',
  _1080P = '1080p60',
  BEST = 'best',
}

const twitchQuality = [
  {
    label: 'Worst',
    value: TwitchQualityEnum.WORST,
  },
  {
    label: '160p',
    value: TwitchQualityEnum._160P,
  },
  {
    label: '360p',
    value: TwitchQualityEnum._360P,
  },
  {
    label: '480p',
    value: TwitchQualityEnum._480P,
  },
  {
    label: '720p60',
    value: TwitchQualityEnum._720P,
  },
  {
    label: '1080p60',
    value: TwitchQualityEnum._1080P,
  },
  {
    label: 'Best',
    value: TwitchQualityEnum.BEST,
  },
]

defineProps({
  open: {
    type: Boolean,
    default: false,
  },
})

const toast = useToast()
const platforms = ref([{ label: 'Twitch', value: Platform.TWITCH }])
const emit = defineEmits(['close', 'refreshStreams'])

const initialForm = {
  channel: '',
  platform: '',
  is_active: true,
  start_at: null,
  end_at: null,
}

const form = reactive({ ...initialForm })

const handleSubmit = async () => {
  try {
    await streamRepository.create({
      ...form,
      end_at: form.end_at?.toISOString(),
      start_at: form.start_at?.toISOString(),
    })
    emit('close')
    emit('refreshStreams')
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Stream created',
      life: 3000,
    })
    Object.assign(form, initialForm)
  } catch (err) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: err.json.message,
      life: 3000,
    })
  }
}
</script>

<template>
  <Dialog
    @close="emit('close')"
    :visible="open"
    modal
    :draggable="false"
    header="Add Stream"
    :style="{ width: '25rem' }"
  >
    <template #closeicon>
      <Button icon="pi pi-times" @click="emit('close')" severity="secondary" />
    </template>
    <div class="flex flex-col gap-2">
      <div class="flex flex-col gap-1">
        <label for="channel" class="font-semibold w-24">Channel</label>
        <InputText
          v-model="form.channel"
          id="channel"
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
        <label for="quality" class="font-semibold w-24">Quality</label>
        <Select
          v-model="form.quality"
          :options="twitchQuality"
          optionLabel="label"
          optionValue="value"
          placeholder="Select a Quality"
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
