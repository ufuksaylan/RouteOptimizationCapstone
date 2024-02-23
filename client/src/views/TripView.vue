<script setup lang="ts">
import { useLocationStore } from '@/stores/LocationStore'

import { onBeforeMount, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Button from '@/components/Button.vue'
import LeafletMap from '@/components/LeafletMap.vue'

const route = useRoute()
const router = useRouter()
const tripId = Number(route.params.id)

const LocationStore = useLocationStore()

onBeforeMount(async () => {
  await LocationStore.fetchTripAndLocations(tripId)

  if (LocationStore.trip?.optimalRoute) {
    console.log('optimal route already calculated')
    router.push({ name: 'TripCalculated', params: { id: tripId } })
  }
})

function navigateToCreateLocation() {
  router.push({ name: 'AddLocation', params: { id: tripId } })
}

function navigateToAdvanceCreateLocation() {
  router.push({ name: 'AddAdvancedLocation', params: { id: tripId } })
}

const calculate = async () => {
  if (LocationStore.trip?.optimalRoute) {
    console.log('optimal route already calculated')
    router.push({ name: 'TripCalculated', params: { id: tripId } })
  }
  await LocationStore.calculateOptimalRoute(tripId)
  router.push({ name: 'TripCalculated', params: { id: tripId } })
}
</script>

<template>
  <div class="grid h-full grid-rows-2 lg:grid-cols-2 lg:grid-rows-none">
    <div class="add-stops row-span-1 flex flex-col lg:col-span-1">
      <div class="bg-bg-light p-2 font-medium text-white">Manage Stops</div>
      <div class="flex space-x-2 bg-bg-lighter p-2">
        <Button @click="navigateToCreateLocation"
          >Add Stops <span class="text-xs">(Basic)</span></Button
        >
        <Button @click="navigateToAdvanceCreateLocation"
          >Add Stops <span class="text-xs">(Advanced)</span></Button
        >
      </div>
      <div class="grid grid-cols-3 bg-bg-light p-2 text-text-light">
        <div>NAME</div>
        <div>ADDRESS</div>
      </div>

      <div class="addresses overflow-y-scroll">
        <div
          class="grid grid-cols-3 p-2"
          v-for="location in LocationStore.locations"
          :key="location.id"
        >
          <div class="col-span-1">{{ location.name }}</div>
          <div class="col-span-2">{{ location.address }}</div>
        </div>
      </div>
      <!-- <div
        class="grid grid-cols-3 p-2"
        v-for="location in LocationStore.locations"
        :key="location.id"
      >
        <div class="col-span-1">{{ location.name }}</div>
        <div class="col-span-2">{{ location.address }}</div>
      </div> -->
      <div class="mx-auto mb-2 mt-2">
        <button
          class="rounded-lg bg-bg-light p-2 text-white"
          @click="calculate"
          v-if="LocationStore.locations.length > 2"
        >
          Calculate The optimal Route
        </button>
      </div>
      {{ LocationStore.trip?.optimalRoute }}
    </div>
    <div class="leaflet row-span-1 lg:col-span-1">
      <LeafletMap :locations="LocationStore.locations" :isCalculated="false" />
    </div>
  </div>
</template>
