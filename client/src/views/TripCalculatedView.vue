<script setup lang="ts">
import { useLocationStore } from '@/stores/LocationStore'

import { onBeforeMount, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Location } from '../../../server/src/entities/location'
import Button from '@/components/Button.vue'
import LeafletMap from '@/components/LeafletMap.vue'

const route = useRoute()
const router = useRouter()
const tripId = Number(route.params.id)

const LocationStore = useLocationStore()

onBeforeMount(() => {
  if (!LocationStore.trip?.optimalRoute) {
    router.push({ name: 'Trip', params: { id: tripId } })
  }
  LocationStore.fetchTripAndLocations(tripId)
  LocationStore.CalculateLocationsInOrder()
})

function navigateToCreateLocation() {
  router.push({ name: 'AddLocation', params: { id: tripId } })
}
</script>

<template>
  <div class="grid h-full grid-rows-2 lg:grid-cols-2 lg:grid-rows-none">
    <div class="add-stops row-span-1 flex flex-col lg:col-span-1">
      <div class="grid grid-cols-3 bg-bg-light p-2 text-text-light">
        <div>ID|NAME</div>
        <div>ADDRESS</div>
      </div>

      <div class="addresses overflow-y-scroll">
        <div
          class="grid grid-cols-3 p-2"
          v-for="location in LocationStore.locations"
          :key="location.id"
        >
          <div class="col-span-1">{{ location.id }}|{{ location.name }}</div>
          <div class="col-span-2">{{ location.address }}</div>
        </div>
      </div>

      <div class="p-2">
        calculated route {{ LocationStore.trip?.optimalRoute }}

        <!-- {{ LocationStore.solutionLocations }} -->
      </div>
    </div>
    <div class="leaflet row-span-1 lg:col-span-1">
      <LeafletMap :locations="LocationStore.solutionLocations" :isCalculated="true" />
    </div>
  </div>
</template>
