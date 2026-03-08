<template>
  <div>
    <div class="mb-6 flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold text-white">My Leave Requests</h2>
        <p class="text-gray-400 mt-1 text-sm">Track all your submitted leave requests</p>
      </div>
      <router-link to="/employee/apply"
        class="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-all flex items-center gap-2">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        New Request
      </router-link>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center py-20">
      <svg class="w-10 h-10 text-indigo-400 animate-spin" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
    </div>

    <!-- Empty state -->
    <div v-else-if="leaves.length === 0"
      class="bg-gray-900 border border-white/10 rounded-2xl p-12 text-center">
      <div class="w-16 h-16 bg-indigo-500/10 border border-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
        </svg>
      </div>
      <h3 class="text-white text-lg font-semibold mb-2">No requests yet</h3>
      <p class="text-gray-400 text-sm mb-6">You haven't submitted any leave requests.</p>
      <router-link to="/employee/apply"
        class="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-all">
        Apply Now
      </router-link>
    </div>

    <!-- Table (desktop) -->
    <div v-else class="bg-gray-900 border border-white/10 rounded-2xl overflow-hidden shadow-xl">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-white/10">
          <thead class="bg-gray-800/60">
            <tr>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Leave Type</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Start Date</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">End Date</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Reason</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Applied</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5">
            <tr v-for="leave in leaves" :key="leave._id" class="hover:bg-white/3 transition-colors">
              <td class="px-6 py-4 text-sm text-white font-medium">{{ leave.leaveType }}</td>
              <td class="px-6 py-4 text-sm text-gray-300">{{ formatDate(leave.startDate) }}</td>
              <td class="px-6 py-4 text-sm text-gray-300">{{ formatDate(leave.endDate) }}</td>
              <td class="px-6 py-4 text-sm text-gray-300 max-w-xs">
                <span class="truncate block" :title="leave.reason">{{ leave.reason }}</span>
              </td>
              <td class="px-6 py-4">
                <StatusBadge :status="leave.status" />
              </td>
              <td class="px-6 py-4 text-sm text-gray-400">{{ formatDate(leave.createdAt) }}</td>
            </tr>
          </tbody>
        </table>
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

async function fetchLeaves() {
  loading.value = true
  try {
    const { data } = await getMyRequests()
    leaves.value = data.data
  } catch {
    toast.error('Failed to load leave requests.')
  } finally {
    loading.value = false
  }
}

onMounted(fetchLeaves)
</script>
