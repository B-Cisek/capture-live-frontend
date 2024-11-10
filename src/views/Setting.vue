<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { api } from '@/utils/api'
import { useToast } from 'primevue/usetoast'

const toast = useToast()

enum Setting {
  TWITCH_CLIENT_ID = 'TWITCH_CLIENT_ID',
  TWITCH_SECRET_KEY = 'TWITCH_SECRET_KEY',
  TWITCH_QUALITY = 'TWITCH_QUALITY',
  TWITCH_SKIP_ADS = 'TWITCH_SKIP_ADS',
}

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
    key: TwitchQualityEnum.WORST,
    label: 'Worst',
  },
  {
    key: TwitchQualityEnum._160P,
    label: '160p',
  },
  {
    key: TwitchQualityEnum._360P,
    label: '360p',
  },
  {
    key: TwitchQualityEnum._480P,
    label: '480p',
  },
  {
    key: TwitchQualityEnum._720P,
    label: '720p60',
  },
  {
    key: TwitchQualityEnum._1080P,
    label: '1080p60',
  },
  {
    key: TwitchQualityEnum.BEST,
    label: 'Best',
  },
]

const baseSettings = {
  [Setting.TWITCH_CLIENT_ID]: null,
  [Setting.TWITCH_SECRET_KEY]: null,
  [Setting.TWITCH_QUALITY]: null,
  [Setting.TWITCH_SKIP_ADS]: null,
}

const settings = reactive({
  [Setting.TWITCH_CLIENT_ID]: '',
  [Setting.TWITCH_SECRET_KEY]: '',
  [Setting.TWITCH_QUALITY]: '',
  [Setting.TWITCH_SKIP_ADS]: false,
})

onMounted(async () => {
  const res = await api.get('/settings').json()

  Object.entries(settings).map(([key]) => {
    settings[key] =
      res[key] == 'true' || res[key] == 'false' ? Boolean(res[key]) : res[key]
  })
})

const handleSubmit = async () => {
  const changedSettings = []

  for (const [key, value] of Object.entries(baseSettings)) {
    if (settings[key] !== value) {
      changedSettings.push({ name: key, value: String(settings[key]) })
    }
  }

  try {
    await api.post(changedSettings, '/settings').res()

    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Settings updated',
      life: 3000,
    })
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
  <div class="max-w-4xl mx-auto p-8">
    <h1 class="text-3xl font-bold mb-8">Settings</h1>

    <Card class="mb-6">
      <template #title>
        <h2 class="text-xl font-semibold mb-4">General Settings</h2>
      </template>
      <template #content>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <label class="font-medium">Skip Embedded Ads</label>
            <ToggleSwitch v-model="settings.TWITCH_SKIP_ADS" />
          </div>
          <div class="flex items-center justify-between">
            <label class="font-medium">Twitch Quality</label>
            <Select
              v-model="settings.TWITCH_QUALITY"
              :options="twitchQuality"
              optionLabel="label"
              optionValue="key"
              placeholder="Select a Quality"
              class="w-full md:w-56"
            />
          </div>
        </div>
      </template>
    </Card>

    <Card class="mb-6">
      <template #title>
        <h2 class="text-xl font-semibold mb-4">Twitch Credentials</h2>
      </template>
      <template #content>
        <div class="space-y-4">
          <div class="flex flex-col">
            <label class="mb-2 font-medium">Twitch Client Token</label>
            <InputText
              v-model="settings.TWITCH_CLIENT_ID"
              placeholder="Enter your Twitch token"
              class="w-full"
            />
          </div>
          <div class="flex flex-col">
            <label class="mb-2 font-medium">Twitch Client Secret</label>
            <InputText
              v-model="settings.TWITCH_SECRET_KEY"
              type="password"
              placeholder="Enter your Twitch client secret"
              class="w-full"
            />
          </div>
        </div>
      </template>
    </Card>
    <div class="w-full flex justify-end">
      <Button label="Update" class="text-right" @click="handleSubmit" />
    </div>
  </div>
</template>
