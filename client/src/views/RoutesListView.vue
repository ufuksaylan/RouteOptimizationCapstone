<script lang="ts" setup>
import { onMounted, ref } from 'vue'
// const googleApiKey = import.meta.env.VITE_GOOGLE_API_KEY as string
// @ts-ignore
import VueGoogleAutocomplete from 'vue-google-autocomplete'

const hello = ref('world')

const getAddressData = (addressData: any, placeResultData: any, id: any) => {
  console.log('addressData', addressData)
  console.log('placeResultData', placeResultData)
  console.log('id', id)
}

onMounted(() => {})
</script>

<template>
  <vue-google-autocomplete
    id="map"
    classname="form-control"
    placeholder="Start typing"
    v-on:placechanged="getAddressData"
  >
  </vue-google-autocomplete>
  <div>
    {{ hello }}
  </div>
</template>
