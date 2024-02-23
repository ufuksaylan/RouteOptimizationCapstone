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
            />
          </label>
          <label class="mb-6 block">
            <span class="text-gray-700">Address</span>
            <input
              name="address1"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="5 Av to Central Park W, 59 St to 110 St"
              required
            />
          </label>
          <label class="mb-6 block">
            <span class="text-gray-700">Address line 2</span>
            <input
              name="address2"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder=""
            />
          </label>
          <label class="mb-6 block">
            <span class="text-gray-700">City</span>
            <input
              name="city"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder=""
            />
          </label>
          <label class="mb-6 block">
            <span class="text-gray-700">State/Province</span>
            <input
              name="state"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder=""
            />
          </label>
          <label class="mb-6 block">
            <span class="text-gray-700">Zip/Postal code</span>
            <input
              name="zip"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder=""
            />
          </label>
          <label class="mb-6 block">
            <span class="text-gray-700">Country</span>
            <input
              name="country"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder=""
            />
          </label>
          <label class="mb-6 block">
            <span class="text-gray-700">Telephone</span>
            <input
              name="telephone"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder=""
            />
          </label>
          <label class="mb-6 block">
            <span class="text-gray-700">Delivery information</span>
            <textarea
              name="message"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              rows="3"
              placeholder="floor/door lock code/etc."
            ></textarea>
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
