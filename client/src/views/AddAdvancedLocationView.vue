<script setup lang="ts">
import { useLocationStore } from '@/stores/LocationStore'
import type { LocationInsert, Location } from '@mono/server/src/shared/entities'
import { ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const tripId = Number(route.params.id)

const LocationStore = useLocationStore()
const locations = ref<Location[]>([])

const name = ref('')

const latitude = ref<number>()
const longitude = ref<number>()
const address = ref<string>()
const type = ref<string>()

onBeforeMount(() => {
  LocationStore.fetchTripAndLocations(tripId)
})

const clearForm = () => {
  name.value = ''
  latitude.value = undefined
  longitude.value = undefined
  address.value = ''
  type.value = ''
}

const getAddressData = (addressData: any, placeResultData: any, id: any) => {
  address.value = placeResultData.formatted_address
  type.value = placeResultData.types[0]
  latitude.value = placeResultData.geometry.location.lat()
  longitude.value = placeResultData.geometry.location.lng()
}

const addLocation = async () => {
  if (!name.value) {
    return
  }

  if (!latitude.value || !longitude.value || !address.value || !type.value) {
    return
  }

  const location: LocationInsert = {
    name: name.value,
    address: address.value || '',
    latitude: latitude.value,
    longitude: longitude.value,
    type: type.value,
    tripId: tripId,
  }
  const newLocation = await LocationStore.createLocation(location)

  locations.value.push(newLocation)

  clearForm()
}
</script>

<template>
  <div class="add-stops relative">
    <div class="bg-bg-light p-2 font-medium text-white">Add Stops (Advanced )</div>

    <div class="grid grid-cols-3 p-2" v-for="location in locations" :key="location.id">
      <div class="col-span-1">{{ location.name }}</div>
      <div class="col-span-2">{{ location.address }}</div>
    </div>

    <div class="">
      <div class="border border-gray-300 p-6 sm:rounded-md">
        <form method="POST" action="https://herotofu.com/start" enctype="multipart/form-data">
          <label class="mb-6 block">
            <span class="text-gray-700">Address Name</span>
            <input
              name="name"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Central Park"
              required
              minlength="1"
              maxlength="255"
              v-model="name"
            />
          </label>
          <label class="mb-6 block">
            <span class="text-gray-700">Address</span>
            <input
              name="address"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="5 Av to Central Park W, 59 St to 110 St"
              required
              minlength="1"
              maxlength="255"
              v-model="address"
            />
          </label>
          <label class="mb-6 block">
            <span class="text-gray-700">Latitude</span>
            <input
              name="latitude"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="38.8951"
              v-model="latitude"
              required
              min="-90"
              max="90"
              step="0.000001"
            />
          </label>

          <label class="mb-6 block">
            <span class="text-gray-700">Longitude</span>
            <input
              name="longitude"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="77.0364"
              v-model="longitude"
              required
              min="-180"
              max="180"
              step="0.000001"
            />
          </label>
          <label class="mb-6 block">
            <span class="text-gray-700">Type</span>
            <input
              name="type"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="park"
              v-model="type"
            />
          </label>

          <div class="mb-6">
            <button
              type="submit"
              class="focus:shadow-outline h-10 rounded-lg bg-indigo-700 px-5 text-indigo-100 transition-colors duration-150 hover:bg-indigo-800"
            >
              Save
            </button>
          </div>
          <div>
            <div class="mt-2 text-right text-xs text-gray-700">
              by
              <a href="https://herotofu.com" class="hover:underline" target="_blank">HeroTofu</a>
            </div>
          </div>
        </form>
      </div>
    </div>

    <!-- ({ name: 'Project', params: { id: project.id } } as any) -->
    <!-- <router-link
      :to="{ name: 'Trip', params: { id: tripId } }"
      class="fixed bottom-2 right-5 rounded-lg bg-bg-light p-2 text-white"
    >
      Done</router-link
    > -->
  </div>
  <p>latitude-{{ latitude }}</p>
  <p>longitude-{{ longitude }}</p>
  <p>address - {{ address }}</p>
  <p>type - {{ type }}</p>
</template>
