<script lang="ts" setup>
defineEmits(['click'])
</script>

<template>
  <button
    class="text-button-text rounded-md bg-button p-2 px-3 font-semibold"
    @click.prevent="$emit('click')"
  >
    <slot></slot>
  </button>
</template>
