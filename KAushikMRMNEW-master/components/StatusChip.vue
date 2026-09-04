<template>
  <span
    class="inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-semibold"
    :class="colorClass"
  >
    <span class="h-2 w-2 rounded-full bg-current"></span>
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{ status?: 'done' | 'in-progress' | 'blocked' }>()

const colorClass = computed(() => {
  switch (props.status) {
    case 'done':
      return 'bg-green-100 text-green-800'
    case 'in-progress':
      return 'bg-amber-100 text-amber-800'
    case 'blocked':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-slate-100 text-slate-800'
  }
})
</script>
