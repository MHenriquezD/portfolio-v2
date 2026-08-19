<template>
  <Icon :icon="icon" :width="size" :height="size" :style="{ color }" />
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps<{
  icon: string
  size?: string | number
  color?: string
}>()
</script>
