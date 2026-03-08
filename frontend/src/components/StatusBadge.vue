<template>
  <span
    class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold"
    :class="badgeClass"
  >
    <span class="w-1.5 h-1.5 rounded-full mr-1.5" :class="dotClass"></span>
    {{ status }}
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({ status: String })

const badgeClass = computed(() => ({
  Pending: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
  Approved: 'bg-green-500/20 text-green-400 border border-green-500/30',
  Rejected: 'bg-red-500/20 text-red-400 border border-red-500/30',
}[props.status] || 'bg-gray-500/20 text-gray-400'))

const dotClass = computed(() => ({
  Pending: 'bg-yellow-400',
  Approved: 'bg-green-400',
  Rejected: 'bg-red-400',
}[props.status] || 'bg-gray-400'))
</script>
