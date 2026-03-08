<template>
  <!-- Overlay for mobile -->
  <div v-if="isOpen" class="fixed inset-0 bg-black/70 z-20 lg:hidden backdrop-blur-sm" @click="$emit('close')"></div>

  <aside :class="[
    'fixed top-0 left-0 h-full z-30 w-64 bg-[#0d1117] border-r border-[#21262d] flex flex-col transition-transform duration-300',
    isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
  ]">
    <!-- Brand -->
    <div class="px-5 py-5 border-b border-[#21262d]">
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 rounded-full overflow-hidden border border-[#1DA1F2]/40 flex-shrink-0 shadow-lg shadow-[#1DA1F2]/10">
          <img src="/src/assets/huskyvoiceai.png" alt="HuskyVoiceAI" class="w-full h-full object-cover" />
        </div>
        <div>
          <span class="text-white font-bold text-base tracking-tight">Leave<span class="text-[#1DA1F2]">Manager</span></span>
          <p class="text-[#1DA1F2] text-xs font-medium capitalize">{{ role }}</p>
        </div>
      </div>
    </div>

    <!-- User card -->
    <div class="px-4 py-4 border-b border-[#21262d]">
      <div class="bg-[#161b22] border border-[#30363d] rounded-xl p-3 flex items-center gap-3">
        <div class="w-9 h-9 bg-gradient-to-br from-[#1DA1F2] to-[#0d85d1] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-md">
          {{ initials }}
        </div>
        <div class="overflow-hidden flex-1 min-w-0">
          <p class="text-white text-sm font-semibold truncate">{{ userName }}</p>
          <p class="text-[#8899A6] text-xs truncate">{{ userEmail }}</p>
        </div>
        <div class="w-2 h-2 bg-green-400 rounded-full flex-shrink-0" title="Online"></div>
      </div>
    </div>

    <!-- Nav -->
    <nav class="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
      <p class="text-[#8899A6] text-xs font-semibold uppercase tracking-widest px-3 mb-3">Navigation</p>
      <router-link
        v-for="link in links" :key="link.to" :to="link.to" @click="$emit('close')"
        class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group"
        :class="$route.path === link.to
          ? 'bg-[#1DA1F2]/10 text-[#1DA1F2] border border-[#1DA1F2]/20 shadow-sm'
          : 'text-[#8899A6] hover:text-white hover:bg-[#161b22] border border-transparent'"
      >
        <span v-html="link.icon" class="w-4 h-4 flex-shrink-0"></span>
        {{ link.label }}
        <span v-if="$route.path === link.to" class="ml-auto w-1.5 h-1.5 bg-[#1DA1F2] rounded-full"></span>
      </router-link>
    </nav>

    <!-- Logout -->
    <div class="px-3 py-4 border-t border-[#21262d]">
      <button @click="handleLogout"
        class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#8899A6] hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all duration-200 w-full group">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
        </svg>
        Sign out
      </button>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'

defineProps({ links: Array, isOpen: Boolean })
defineEmits(['close'])

const router = useRouter()
const authStore = useAuthStore()

const userName = computed(() => authStore.user?.name || 'User')
const userEmail = computed(() => authStore.user?.email || '')
const role = computed(() => authStore.role)
const initials = computed(() =>
  userName.value.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
)
function handleLogout() { authStore.logout(); router.push('/') }
</script>
