<script lang="ts" setup>
import type { TripBare } from '@mono/server/src/shared/entities'

defineProps<{
  trips: TripBare[]
  numberOfStops: number[]
}>()
</script>

<template>
  <div class="flex flex-col">
    <div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
      <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
        <div class="overflow-hidden">
          <table class="min-w-full">
            <thead class="border-b bg-white">
              <tr>
                <th scope="col" class="px-6 py-4 text-left text-sm font-medium text-gray-900">
                  Id
                </th>
                <th scope="col" class="px-6 py-4 text-left text-sm font-medium text-gray-900">
                  Name
                </th>
                <th scope="col" class="px-6 py-4 text-left text-sm font-medium text-gray-900">
                  Number of Stops
                </th>
                <th scope="col" class="px-6 py-4 text-left text-sm font-medium text-gray-900">
                  Date
                </th>
                <th scope="col" class="px-6 py-4 text-left text-sm font-medium text-gray-900">
                  Status
                </th>
                <th scope="col" class="px-6 py-4 text-left text-sm font-medium text-gray-900"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(trip, index) in trips" :key="trip.id" class="border-b bg-gray-100">
                <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                  {{ trip.id }}
                </td>
                <td class="whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900">
                  {{ trip.name }}
                </td>
                <td class="whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900">
                  {{ numberOfStops[index] }}
                </td>
                <td class="whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900">
                  {{ new Date(trip.timeCreated).toDateString() }}
                </td>
                <td class="whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900">
                  <span v-if="trip.optimalRoute"> calculated </span>
                  <span v-else>Not calculated</span>
                </td>
                <td>
                  <RouterLink
                    :to="{ name: 'Trip', params: { id: trip.id } }"
                    class="rounded-lg bg-bg-light p-2 text-white"
                  >
                    View
                  </RouterLink>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
