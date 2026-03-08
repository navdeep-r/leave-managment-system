<template>
  <div class="min-h-screen bg-[#0d1117] flex">
    <Sidebar :links="navLinks" :isOpen="sidebarOpen" @close="sidebarOpen = false" />

    <div class="flex-1 lg:ml-64 flex flex-col min-h-screen">
      <!-- Top bar -->
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
          <span class="bg-[#1DA1F2]/10 text-[#1DA1F2] text-xs px-3 py-1.5 rounded-full border border-[#1DA1F2]/20 font-semibold capitalize">
            Employee
          </span>
        </div>
      </header>

      <!-- Breadcrumb -->
      <div class="border-b border-[#21262d] px-6 py-2.5 hidden lg:flex items-center gap-2 text-xs text-[#8899A6]">
        <span>Dashboard</span>
        <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
        <span class="text-[#1DA1F2] font-medium">{{ pageTitle }}</span>
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
    to: '/employee/apply',
    label: 'Apply Leave',
    icon: `<svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>`,
  },
  {
    to: '/employee/my-requests',
    label: 'My Requests',
    icon: `<svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" /></svg>`,
  },
]

const pageMeta = {
  '/employee/apply': { title: 'Apply for Leave', sub: 'Submit a new leave request' },
  '/employee/my-requests': { title: 'My Leave Requests', sub: 'Track your submitted requests' },
}
const pageTitle = computed(() => pageMeta[route.path]?.title || 'Dashboard')
const pageSubtitle = computed(() => pageMeta[route.path]?.sub || '')
</script>
