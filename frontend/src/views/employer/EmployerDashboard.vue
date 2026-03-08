<template>
  <div class="min-h-screen bg-[#0d1117] flex">
    <Sidebar :links="navLinks" :isOpen="sidebarOpen" @close="sidebarOpen = false" />

    <div class="flex-1 lg:ml-64 flex flex-col min-h-screen">
      <header class="bg-[#0d1117]/95 backdrop-blur-xl border-b border-[#21262d] px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div class="flex items-center gap-4">
          <button @click="sidebarOpen = !sidebarOpen"
            class="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl bg-[#161b22] border border-[#30363d] text-[#8899A6] hover:text-white transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          <div>
            <h1 class="text-white font-bold text-lg">{{ pageTitle }}</h1>
            <p class="text-[#8899A6] text-xs hidden lg:block">{{ pageSubtitle }}</p>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <div class="hidden sm:flex items-center gap-2 bg-[#161b22] border border-[#30363d] rounded-full px-3 py-1.5">
            <div class="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
            <span class="text-[#8899A6] text-xs font-medium">{{ authStore.user?.name }}</span>
          </div>
          <span class="bg-purple-500/10 text-purple-400 text-xs px-3 py-1.5 rounded-full border border-purple-500/20 font-semibold">
            Employer
          </span>
        </div>
      </header>

      <div class="border-b border-[#21262d] px-6 py-2.5 hidden lg:flex items-center gap-2 text-xs text-[#8899A6]">
        <span>Dashboard</span>
        <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
        <span class="text-purple-400 font-medium">{{ pageTitle }}</span>
      </div>

      <main class="flex-1 p-6">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '../../store/auth'
import Sidebar from '../../components/Sidebar.vue'

const authStore = useAuthStore()
const route = useRoute()
const sidebarOpen = ref(false)

const navLinks = [
  {
    to: '/employer/all-requests',
    label: 'All Requests',
    icon: `<svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>`,
  },
]

const pageMeta = { '/employer/all-requests': { title: 'All Leave Requests', sub: 'Review and action all employee requests' } }
const pageTitle = computed(() => pageMeta[route.path]?.title || 'Dashboard')
const pageSubtitle = computed(() => pageMeta[route.path]?.sub || '')
</script>
