<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import type { LocationBare } from '@mono/server/src/shared/entities'
import { LMap, LTileLayer, LMarker, LPopup, LPolyline } from '@vue-leaflet/vue-leaflet'
import 'leaflet/dist/leaflet.css'
import type { LatLngBoundsExpression, LatLngExpression, PointExpression } from 'leaflet'

// Define initialCenter and zoom
// const initialCenter: [number, number] = [54.687157, 25.279652] // Example coordinates
const zoom = ref(8) // Example initial zoom level

const mapRef = ref<typeof LMap | null>(null) // Use typeof LMap for the ref type if needed

const props = defineProps<{ locations: LocationBare[]; isCalculated: Boolean }>()

const polylineCoordinates = computed<LatLngExpression[]>(() =>
  props.locations.map((loc): LatLngExpression => [loc.latitude, loc.longitude])
)

const calculateCenter = (
  locations: { latitude: number; longitude: number }[]
): LatLngExpression => {
  if (locations.length === 0) return [54.687157, 25.279652] // Return a default value if no locations

  return [locations[0].latitude, locations[0].longitude]
}

const initialCenter = computed(() => calculateCenter(props.locations) as PointExpression)

onMounted(() => {
  if (!mapRef.value || !mapRef.value.map) return

  // Access the Leaflet map instance correctly
  // This example assumes that `mapRef.value.map` gives us the Leaflet map instance
  // Adjust based on your actual implementation or library version
  const leafletMap: L.Map = mapRef.value.map // Cast to L.Map to ensure correct typing
  if (props.locations.length > 0) {
    const bounds: LatLngBoundsExpression = props.locations.map((loc) => [
      loc.latitude,
      loc.longitude,
    ])
    leafletMap.fitBounds(bounds)
  }
})
</script>

<template>
  <div style="height: 100%; width: 100%">
    <l-map ref="mapRef" :center="initialCenter" :zoom="zoom" :use-global-leaflet="false">
      <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></l-tile-layer>
      <l-marker
        v-for="location in locations"
        :key="location.id"
        :lat-lng="[location.latitude, location.longitude]"
      >
        <l-popup>{{ location.name }}</l-popup>
      </l-marker>
      <l-polyline :lat-lngs="polylineCoordinates" color="blue" v-if="isCalculated"></l-polyline>
    </l-map>
  </div>
</template>
