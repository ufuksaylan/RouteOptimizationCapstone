<script setup lang="ts">
import { useLocationStore } from '@/stores/LocationStore'
import type { LocationInsert, Location } from '@mono/server/src/shared/entities'
import { ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
// @ts-ignore
import VueGoogleAutocomplete from 'vue-google-autocomplete'

const route = useRoute()

const tripId = Number(route.params.id)

const LocationStore = useLocationStore()
const locations = ref<Location[]>([])

const googleMapInput = ref(null)

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
  googleMapInput.value = null
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
    <div class="bg-bg-light p-2 font-medium text-white">Add Stops (Basic )</div>
    <div class="grid grid-cols-3 bg-bg-lighter p-2 text-text-light">
      <div>NAME</div>
      <div>ADDRESS</div>
    </div>
    <div class="grid grid-cols-3 p-2" v-for="location in locations" :key="location.id">
      <div class="col-span-1">{{ location.name }}</div>
      <div class="col-span-2">{{ location.address }}</div>
    </div>

    <div class="">
      <form action="#" @submit.prevent="addLocation" class="grid grid-cols-12 gap-x-2 p-2">
        <input
          type="text"
          class="col-span-4 border-none"
          placeholder="Enter name"
          v-model="name"
          id="name"
        />
        <vue-google-autocomplete
          ref="googleMapInput"
          class="col-span-6 border-none"
          id="map"
          classname="form-control"
          placeholder="Enter a location"
          v-on:placechanged="getAddressData"
        >
        </vue-google-autocomplete>
        <button type="submit" class="col-span-2 rounded-lg bg-blue-600 text-sm text-white">
          Save
        </button>
      </form>
    </div>

    <!-- ({ name: 'Project', params: { id: project.id } } as any) -->
    <router-link
      :to="{ name: 'Trip', params: { id: tripId } }"
      class="fixed bottom-2 right-5 rounded-lg bg-bg-light p-2 text-white"
    >
      Done</router-link
    >
  </div>
  <p>latitude-{{ latitude }}</p>
  <p>longitude-{{ longitude }}</p>
  <p>address - {{ address }}</p>
  <p>type - {{ type }}</p>
</template>
