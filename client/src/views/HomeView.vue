<script lang="ts" setup>
import { FwbButton } from 'flowbite-vue'
</script>

<template>
  <!-- landing page with Tailwind -->
  <div class="bg-white dark:bg-gray-800">
    <div class="container mx-auto h-screen px-6 py-8">
      <div class="h-full items-center lg:flex">
        <div class="lg:w-1/2">
          <h2 class="text-3xl font-bold text-gray-800 dark:text-gray-100">
            Optimizing Your Journey
          </h2>

          <p class="mt-4 text-gray-500 dark:text-gray-400 lg:max-w-md">
            Tailored for adventurers, urban explorers, and efficiency seekers, our tool,
            <strong>RouteOptimization</strong>, revolutionizes your travel plans by calculating the
            most efficient route through a series of user-defined destinations. Ideal for tourists
            plotting a city exploration or anyone needing to streamline their errands, it focuses on
            reducing both distance and time. Dive into the world of smart travel and let
            <strong>RouteOptimization</strong> transform your trips into seamless adventures.
          </p>

          <div class="mt-6 flex items-center gap-2">
            <!-- prettier-ignore -->
            <FwbButton
              component="RouterLink"
              tag="router-link"
              :href="({ name: 'Signup' } as any)"
            >
              Get Started
            </FwbButton>
            <FwbButton
              component="RouterLink"
              tag="router-link"
              color="alternative"
              :href="{ name: 'Login' } as any"
            >
              Log in
            </FwbButton>
          </div>
        </div>

        <div class="mt-8 lg:mt-0 lg:w-1/2">
          <div class="flex items-center justify-center lg:justify-end">
            <div class="max-w-lg">
              <picture>
                <source srcset="../assets/landing-4.jpg" type="image/jpeg" />
                <img
                  class="h-64 w-full rounded-md object-cover object-center shadow"
                  src="../assets/landing-4.jpg"
                  alt=""
                />
              </picture>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
