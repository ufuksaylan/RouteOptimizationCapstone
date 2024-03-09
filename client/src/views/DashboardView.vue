<script lang="ts" setup>
import { trpc } from '@/trpc'
import { onBeforeMount, ref, onMounted } from 'vue'
import { FwbButton } from 'flowbite-vue'
import type { TripBare } from '@mono/server/src/shared/entities'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import Table from '@/components/Table.vue'
import { useTripStore } from '@/stores/TripStore'

const TripStore = useTripStore()

const startDate = ref()

const endDate = ref()

onBeforeMount(() => {
  TripStore.fetchTrips()
})

onMounted(() => {
  // console.log('trips', TripStore.fetchTrips())
})
</script>

<template>
  <div class="DashboardView text-title-color">
    <div
      class="top-part flex-col space-y-2 border-b-2 border-b-bg-lighter p-4 md:flex md:flex-row md:place-content-between"
    >
      <div class="text-center font-normal">
        <p class="mt-2">All Trips</p>
      </div>

      <div class="flex justify-between gap-4">
        <div class="flex gap-2">
          <div class="flex justify-between text-end align-middle font-thin">
            <span class="text-xs">From</span>
          </div>
          <VueDatePicker v-model="startDate" class="w-20 bg-input-bg"></VueDatePicker>
        </div>

        <div class="flex gap-2">
          <div class="flex justify-between text-end align-middle font-thin">
            <span class="text-xs">To</span>
          </div>
          <VueDatePicker v-model="endDate" class="w-20 bg-input-bg"></VueDatePicker>
        </div>
      </div>

      <div class="flex justify-center">
        <!-- prettier-ignore -->
        <FwbButton
        component="RouterLink"
        tag="router-link"
        :href="({ name: 'tripCreate' } as any)"
        data-testid="createProject"
      >
        + Add a new route
      </FwbButton>
      </div>
    </div>

    <div class="table-container overflow-x-auto">
      <Table :trips="TripStore.filteredTrips(startDate, endDate)"></Table>
    </div>
  </div>
</template>
