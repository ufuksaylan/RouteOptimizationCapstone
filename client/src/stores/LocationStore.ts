import { defineStore } from 'pinia'
import type { TripBare } from '@mono/server/src/shared/entities'
import type { LocationBare, LocationInsert } from '@mono/server/src/shared/entities'
import { trpc } from '@/trpc'
import { calculateDistance } from '@/composables/useErrorMessage/distanceCalculator'

export const useLocationStore = defineStore('locationStore', {
  state: () => ({
    trip: null as TripBare | null,
    locations: [] as LocationBare[],
    solutionLocations: [] as LocationBare[],
  }),

  actions: {
    async fetchTripAndLocations(tripId: number) {
      const tripPromise = trpc.trip.get.query(tripId)
      const locationsPromise = trpc.location.find.query({ tripId })

      const [trip, locations] = await Promise.all([tripPromise, locationsPromise])

      this.trip = trip
      this.locations = locations
    },

    async createLocation(location: LocationInsert) {
      // Check if the new location is within 400km of each existing location
      const isWithinRange = this.locations.every(
        (existingLocation) =>
          calculateDistance(
            existingLocation.latitude,
            existingLocation.longitude,
            location.latitude,
            location.longitude,
            'K'
          ) <= 400
      )

      if (!isWithinRange) {
        throw new Error('New location is not within 400km of all existing locations.')
      }

      const newLocation = await trpc.location.add.mutate(location)
      this.locations.push(newLocation)
      return newLocation
    },

    async CalculateLocationsInOrder() {
      if (this.trip?.optimalRoute) {
        this.solutionLocations = this.trip.optimalRoute.split(',').map((id) => {
          return this.locations.find((loc) => loc.id === parseInt(id))!
        })
      }
    },

    async calculateOptimalRoute(tripId: number) {
      console.log('Calculating optimal route')
      try {
        const response = await trpc.trip.calculateOptimalRoute.mutate({ id: tripId })
        return response
      } catch (error) {
        console.error('Failed to calculate optimal route:', error)
        throw error
      }
    },
  },
})
