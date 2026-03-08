<template>
  <div class="min-h-screen bg-[#15202B] flex">
    <Sidebar :links="navLinks" :isOpen="sidebarOpen" @close="sidebarOpen = false" />

    <div class="flex-1 lg:ml-64 flex flex-col min-h-screen">
      <header class="bg-[#15202B]/90 backdrop-blur-md border-b border-[#38444D] px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <button @click="sidebarOpen = !sidebarOpen" class="lg:hidden text-[#8899A6] hover:text-white transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
        <h1 class="text-white font-semibold hidden lg:block">{{ pageTitle }}</h1>
        <span class="bg-[#1DA1F2]/10 text-[#1DA1F2] text-xs px-3 py-1 rounded-full border border-[#1DA1F2]/20 font-medium">
          Employer
        </span>
      </header>

      <main class="flex-1 p-6">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from '../../components/Sidebar.vue'

const route = useRoute()
const sidebarOpen = ref(false)

const navLinks = [
  {
    to: '/employer/all-requests',
    label: 'All Requests',
    icon: `<svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>`,
  },
]

const pageTitleMap = { '/employer/all-requests': 'All Leave Requests' }
const pageTitle = computed(() => pageTitleMap[route.path] || 'Employer Dashboard')
</script>
