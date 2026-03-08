<template>
  <!-- Overlay for mobile -->
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black/50 z-20 lg:hidden"
    @click="$emit('close')"
  ></div>

  <!-- Sidebar -->
  <aside
    :class="[
      'fixed top-0 left-0 h-full z-30 w-64 bg-gray-900 border-r border-white/10 flex flex-col transition-transform duration-300',
      isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    ]"
  >
    <!-- Brand -->
    <div class="px-6 py-5 border-b border-white/10">
      <div class="flex items-center gap-3">
        <div class="bg-indigo-600/30 rounded-xl p-2">
          <svg class="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5" />
          </svg>
        </div>
        <div>
          <span class="text-white font-bold text-lg">Leave Manager</span>
          <p class="text-indigo-400 text-xs capitalize">{{ role }}</p>
        </div>
      </div>
    </div>

    <!-- User Info -->
    <div class="px-6 py-4 border-b border-white/10">
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          {{ initials }}
        </div>
        <div class="overflow-hidden">
          <p class="text-white text-sm font-medium truncate">{{ userName }}</p>
          <p class="text-gray-400 text-xs truncate">{{ userEmail }}</p>
        </div>
      </div>
    </div>

    <!-- Nav Links -->
    <nav class="flex-1 px-4 py-4 space-y-1">
      <router-link
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        @click="$emit('close')"
        class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group"
        :class="$route.path === link.to
          ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/30'
          : 'text-gray-400 hover:text-white hover:bg-white/5'"
      >
        <span v-html="link.icon" class="w-5 h-5 flex-shrink-0"></span>
        {{ link.label }}
      </router-link>
    </nav>

    <!-- Logout -->
    <div class="px-4 py-4 border-t border-white/10">
      <button
        @click="handleLogout"
        class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 w-full"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
        </svg>
        Logout
      </button>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'

const props = defineProps({
  links: Array,
  isOpen: Boolean,
})
defineEmits(['close'])

const router = useRouter()
const authStore = useAuthStore()

const userName = computed(() => authStore.user?.name || 'User')
const userEmail = computed(() => authStore.user?.email || '')
const role = computed(() => authStore.role)
const initials = computed(() =>
  userName.value.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
)

function handleLogout() {
  authStore.logout()
  router.push('/')
}
</script>
