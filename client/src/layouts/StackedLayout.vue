<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

// const route = useRoute()

// const navigation = computed(() =>
//   links.map((item) => ({
//     ...item,
//     isActive: route.name === item.name,
//   }))
// )
</script>

<template>
  <!-- <FwbNavbar>
    <template #default="{ isShowMenu }">
      <FwbNavbar-collapse :isShowMenu="isShowMenu">
        <FwbNavbarLink
          v-for="link in navigation"
          :key="link.name"
          :is-active="link.isActive"
          :link="({ name: link.name } as any)"
          link-attr="to"
          component="RouterLink"
        >
          {{ link.label }}
        </FwbNavbarLink>
        <slot name="menu" />
      </FwbNavbar-collapse>
    </template>
  </FwbNavbar> -->

  <nav class="flex min-w-fit flex-col bg-navBar-bg p-2">
    <div class="top flex h-2/4 flex-col gap-10 align-middle">
      <router-link :to="{ name: 'Dashboard' }" aria-label="Dashboard">
        <div class="logo mt-2 flex justify-center">
          <img src="@/assets/logo.svg" alt="logo" class="w-8" /></div
      ></router-link>
    </div>

    <div class="bottom mb-4 flex h-2/4 cursor-pointer flex-col-reverse">
      <slot name="menuBottom"></slot>
    </div>
  </nav>

  <main class="w-full">
    <RouterView />
  </main>
</template>
