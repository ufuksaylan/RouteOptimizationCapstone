<script setup lang="ts">
import StackedLayout from './StackedLayout.vue'
import { logout } from '@/stores/user'
import { useRouter } from 'vue-router'

const router = useRouter()

function logoutUser() {
  logout()
  router.push({ name: 'Login' })
}
</script>

<template>
  <StackedLayout>
    <template #menuBottom>
      <div
        class="logo bg-buttons mt-2 flex w-full justify-center hover:scale-125"
        @click="logoutUser"
        data-testid="logoutLink"
      >
        <img src="@/assets/logout.svg" alt="logo" class="w-5" />
      </div>
    </template>
  </StackedLayout>
</template>
