<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Add from '@/views/Stream/Dialog/Add.vue'
import { type Stream, streamRepository } from '@/repositories/streamRepository'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import { useDateFormat } from '@vueuse/core'
import Edit from '@/views/Stream/Dialog/Edit.vue'

const streams = ref([])
const selectedStreams = ref([])
const addModalOpen = ref(false)
const editModalOpen = ref(false)
const confirm = useConfirm()
const toast = useToast()

const fetchStreams = async () => {
  const response = await streamRepository.getAll()
  streams.value = response.data as Stream[]
}

onMounted(async () => fetchStreams())

const deleteStream = async (id: string) => {
  confirm.require({
    message: 'Do you want to delete this stream?',
    header: 'Danger Zone',
    icon: 'pi pi-info-circle',
    rejectLabel: 'Cancel',
    rejectProps: {
      label: 'Cancel',
      severity: 'secondary',
      outlined: true,
    },
    acceptProps: {
      label: 'Delete',
      severity: 'danger',
    },
    accept: async () => {
      await streamRepository.delete(id)

      toast.add({
        severity: 'info',
        summary: 'Confirmed',
        detail: 'Stream deleted',
        life: 3000,
      })

      streams.value = streams.value.filter(stream => stream.id !== id)
    },
    reject: () => {
      toast.add({
        severity: 'error',
        summary: 'Rejected',
        detail: 'You have rejected',
        life: 3000,
      })
    },
  })
}

const massDelete = async () => {
  confirm.require({
    message: 'Do you want to delete selected streams?',
    header: 'Danger Zone',
    icon: 'pi pi-info-circle',
    rejectLabel: 'Cancel',
    rejectProps: {
      label: 'Cancel',
      severity: 'secondary',
      outlined: true,
    },
    acceptProps: {
      label: 'Delete',
      severity: 'danger',
    },
    accept: async () => {
      const ids = selectedStreams.value.map(stream => stream.id).join(',')
      await streamRepository.massDelete(ids)

      toast.add({
        severity: 'info',
        summary: 'Confirmed',
        detail: 'Selected Streams deleted',
        life: 3000,
      })

      await fetchStreams()
      selectedStreams.value = []
    },
    reject: () => {
      toast.add({
        severity: 'error',
        summary: 'Rejected',
        detail: 'You have rejected',
        life: 3000,
      })
    },
  })
}

const editStreamObject = ref({})

const editStream = stream => {
  editModalOpen.value = true
  editStreamObject.value = stream
}
</script>

<template>
  <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
    <div class="card">
      <DataTable
        v-model:selection="selectedStreams"
        :value="streams"
        paginator
        :rows="10"
        dataKey="id"
      >
        <template #header>
          <div class="flex justify-between">
            <span class="font-semibold text-2xl">Streams</span>
            <Button
              v-if="selectedStreams.length === 0"
              icon="pi pi-plus"
              label="Add Stream"
              @click="addModalOpen = true"
            />
            <Button
              v-if="selectedStreams.length"
              severity="danger"
              icon="pi pi-trash"
              label="Delete Selected"
              @click="massDelete"
            />
          </div>
        </template>
        <template #empty> No customers found. </template>
        <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
        <Column header="Username" style="min-width: 14rem">
          <template #body="{ data }">
            <div class="flex items-center gap-2">
              <span>{{ data.username }}</span>
            </div>
          </template>
        </Column>
        <Column
          header="Platform"
          :filterMenuStyle="{ width: '14rem' }"
          style="min-width: 14rem"
        >
          <template #body="{ data }">
            <div class="flex items-center gap-2">
              <span>{{ data.platform }}</span>
            </div>
          </template>
        </Column>
        <Column field="isActive" header="Is Active" style="min-width: 10rem">
          <template #body="{ data }">
            <Tag
              :value="data.isActive ? 'Active' : 'In Active'"
              :severity="data.isActive ? 'success' : 'danger'"
            />
          </template>
        </Column>
        <Column
          field="startAt"
          header="Start At"
          dataType="date"
          style="min-width: 10rem"
        >
          <template #body="{ data }">
            {{
              data.startAt
                ? useDateFormat(data.startAt, 'YYYY-MM-DD HH:mm:ss')
                : '-'
            }}
          </template>
        </Column>
        <Column
          field="startEnd"
          header="Start End"
          dataType="date"
          style="min-width: 10rem"
        >
          <template #body="{ data }">
            {{
              data.startAt
                ? useDateFormat(data.endAt, 'YYYY-MM-DD HH:mm:ss')
                : '-'
            }}
          </template>
        </Column>

        <Column
          headerStyle="width: 5rem; text-align: center"
          bodyStyle="text-align: center; overflow: visible"
        >
          <template #body="{ data }">
            <div class="flex">
              <Button
                @click="editStream(data)"
                icon="pi pi-pencil"
                outlined
                rounded
                class="mr-2"
              />
              <Button
                icon="pi pi-trash"
                outlined
                rounded
                severity="danger"
                @click="deleteStream(data.id)"
              />
              <Edit
                :open="editModalOpen"
                :stream="data"
                @close="editModalOpen = false"
                @refresh-streams="fetchStreams"
              />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
  <Add
    :open="addModalOpen"
    @close="addModalOpen = false"
    @refresh-streams="fetchStreams"
  />
  <ConfirmDialog />
</template>
