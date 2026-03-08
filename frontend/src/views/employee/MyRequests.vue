<template>
  <div>
    <!-- Header -->
    <div class="relative bg-gradient-to-r from-[#1DA1F2]/10 via-[#161b22] to-[#161b22] border border-[#30363d] rounded-2xl p-6 mb-6 overflow-hidden">
      <div class="absolute top-0 right-0 w-32 h-32 bg-[#1DA1F2]/10 rounded-full blur-2xl -translate-y-4 translate-x-4"></div>
      <div class="relative z-10 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 class="text-2xl font-bold text-white">My Leave Requests</h2>
          <p class="text-[#8899A6] text-sm mt-1">Track all your submitted requests and their status</p>
        </div>
        <router-link to="/employee/apply"
          class="flex items-center gap-2 bg-[#1DA1F2] hover:bg-[#1A91DA] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all hover:scale-105 shadow-lg shadow-[#1DA1F2]/20">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          New Request
        </router-link>
      </div>
    </div>

    <!-- Stats row -->
    <div v-if="!loading && leaves.length > 0" class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
      <div class="bg-[#161b22] border border-[#30363d] rounded-xl p-4">
        <p class="text-[#8899A6] text-xs font-medium mb-1">Total</p>
        <p class="text-white text-2xl font-bold">{{ leaves.length }}</p>
      </div>
      <div class="bg-[#161b22] border border-yellow-500/20 rounded-xl p-4">
        <p class="text-yellow-400 text-xs font-medium mb-1">Pending</p>
        <p class="text-white text-2xl font-bold">{{ count('Pending') }}</p>
      </div>
      <div class="bg-[#161b22] border border-green-500/20 rounded-xl p-4">
        <p class="text-green-400 text-xs font-medium mb-1">Approved</p>
        <p class="text-white text-2xl font-bold">{{ count('Approved') }}</p>
      </div>
      <div class="bg-[#161b22] border border-red-500/20 rounded-xl p-4">
        <p class="text-red-400 text-xs font-medium mb-1">Rejected</p>
        <p class="text-white text-2xl font-bold">{{ count('Rejected') }}</p>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-24 gap-4">
      <svg class="w-10 h-10 text-[#1DA1F2] animate-spin" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
      <p class="text-[#8899A6] text-sm">Loading your requests…</p>
    </div>

    <!-- Empty state -->
    <div v-else-if="leaves.length === 0"
      class="bg-[#161b22] border border-[#30363d] rounded-2xl p-16 text-center">
      <div class="relative w-20 h-20 mx-auto mb-6">
        <div class="absolute inset-0 bg-[#1DA1F2]/10 rounded-full"></div>
        <div class="w-20 h-20 bg-[#1DA1F2]/5 border border-[#1DA1F2]/20 rounded-full flex items-center justify-center">
          <svg class="w-9 h-9 text-[#1DA1F2]/60" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        </div>
      </div>
      <h3 class="text-white text-xl font-semibold mb-2">No requests yet</h3>
      <p class="text-[#8899A6] text-sm mb-6 max-w-xs mx-auto">You haven't submitted any leave requests. Apply for your first one!</p>
      <router-link to="/employee/apply"
        class="inline-flex items-center gap-2 bg-[#1DA1F2] hover:bg-[#1A91DA] text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-all hover:scale-105">
        Apply for Leave
      </router-link>
    </div>

    <!-- Table -->
    <div v-else class="bg-[#161b22] border border-[#30363d] rounded-2xl overflow-hidden shadow-2xl">
      <div class="overflow-x-auto">
        <table class="min-w-full">
          <thead>
            <tr class="bg-[#0d1117] border-b border-[#30363d]">
              <th class="px-5 py-4 text-left text-xs font-semibold text-[#8899A6] uppercase tracking-wider">Leave Type</th>
              <th class="px-5 py-4 text-left text-xs font-semibold text-[#8899A6] uppercase tracking-wider">Duration</th>
              <th class="px-5 py-4 text-left text-xs font-semibold text-[#8899A6] uppercase tracking-wider">Reason</th>
              <th class="px-5 py-4 text-left text-xs font-semibold text-[#8899A6] uppercase tracking-wider">Status</th>
              <th class="px-5 py-4 text-left text-xs font-semibold text-[#8899A6] uppercase tracking-wider">Applied</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(leave, i) in leaves" :key="leave._id"
              class="border-b border-[#21262d] last:border-0 hover:bg-white/2 transition-colors group">
              <td class="px-5 py-4">
                <div class="flex items-center gap-2.5">
                  <div class="w-8 h-8 bg-[#1DA1F2]/10 border border-[#1DA1F2]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span v-html="leaveTypeIcon(leave.leaveType)" class="w-4 h-4 text-[#1DA1F2]"></span>
                  </div>
                  <span class="text-white text-sm font-medium">{{ leave.leaveType }}</span>
                </div>
              </td>
              <td class="px-5 py-4">
                <div class="text-white text-sm">{{ formatDate(leave.startDate) }}</div>
                <div class="text-[#8899A6] text-xs flex items-center gap-1">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                  </svg>
                  {{ formatDate(leave.endDate) }}
                </div>
              </td>
              <td class="px-5 py-4 max-w-xs">
                <p class="text-[#8899A6] text-sm truncate" :title="leave.reason">{{ leave.reason }}</p>
              </td>
              <td class="px-5 py-4">
                <StatusBadge :status="leave.status" />
              </td>
              <td class="px-5 py-4 text-[#8899A6] text-xs">{{ formatDate(leave.createdAt) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="border-t border-[#30363d] px-5 py-3 bg-[#0d1117]/60 flex items-center justify-between">
        <p class="text-[#8899A6] text-xs">Showing {{ leaves.length }} request{{ leaves.length !== 1 ? 's' : '' }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import { getMyRequests } from '../../services/leaveService'
import StatusBadge from '../../components/StatusBadge.vue'

const toast = useToast()
const leaves = ref([])
const loading = ref(true)

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}
function count(status) { return leaves.value.filter((l) => l.status === status).length }
function leaveTypeIcon(type) {
  const icons = {
    'Sick Leave': `<svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/></svg>`,
    'Casual Leave': `<svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
    'Vacation': `<svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636"/></svg>`,
    'Other': `<svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"/></svg>`,
  }
  return icons[type] || icons['Other']
}

async function fetchLeaves() {
  loading.value = true
  try {
    const { data } = await getMyRequests()
    leaves.value = data.data
  } catch { toast.error('Failed to load requests.') }
  finally { loading.value = false }
}
onMounted(fetchLeaves)
</script>
