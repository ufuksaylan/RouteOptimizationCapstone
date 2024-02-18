import { defineStore } from 'pinia'
import type { TripBare } from '@mono/server/src/shared/entities'
import { trpc } from '@/trpc'

export const useTripStore = defineStore('tripStore', {
  state: () => ({
    trips: [] as TripBare[],
    numberOfLocations: [] as number[],
  }),

  actions: {
    async fetchTrips() {
      this.trips = await trpc.trip.find.query()

      this.trips.forEach(async (trip) => {
        const locations = await trpc.location.find.query({ tripId: trip.id })
        this.numberOfLocations.push(locations.length)
      })
    },
  },

  getters: {
    filteredTrips: (state) => {
      return (startDate: Date | string | null, endDate: Date | string | null) => {
        return state.trips.filter((trip) => {
          const tripDate = new Date(trip.timeCreated)
          const start = startDate ? new Date(startDate) : null
          const end = endDate ? new Date(endDate) : null
          return (!start || tripDate >= start) && (!end || tripDate <= end)
        })
      }
    },
  },
})
