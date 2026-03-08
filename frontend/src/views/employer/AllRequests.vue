<template>
  <div>
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-white">All Leave Requests</h2>
      <p class="text-[#8899A6] mt-1 text-sm">Review and manage all employee leave requests</p>
    </div>

    <!-- Summary Cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div class="bg-[#1E2732] border border-[#38444D] rounded-2xl p-4">
        <p class="text-[#8899A6] text-xs mb-1">Total</p>
        <p class="text-white text-2xl font-bold">{{ leaves.length }}</p>
      </div>
      <div class="bg-[#1E2732] border border-yellow-500/20 rounded-2xl p-4">
        <p class="text-yellow-400 text-xs mb-1">Pending</p>
        <p class="text-white text-2xl font-bold">{{ countByStatus('Pending') }}</p>
      </div>
      <div class="bg-[#1E2732] border border-green-500/20 rounded-2xl p-4">
        <p class="text-green-400 text-xs mb-1">Approved</p>
        <p class="text-white text-2xl font-bold">{{ countByStatus('Approved') }}</p>
      </div>
      <div class="bg-[#1E2732] border border-red-500/20 rounded-2xl p-4">
        <p class="text-red-400 text-xs mb-1">Rejected</p>
        <p class="text-white text-2xl font-bold">{{ countByStatus('Rejected') }}</p>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center py-20">
      <svg class="w-10 h-10 text-[#1DA1F2] animate-spin" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
    </div>

    <!-- Empty state -->
    <div v-else-if="leaves.length === 0" class="bg-[#1E2732] border border-[#38444D] rounded-2xl p-12 text-center">
      <p class="text-[#8899A6]">No leave requests found.</p>
    </div>

    <!-- Table -->
    <div v-else class="bg-[#1E2732] border border-[#38444D] rounded-2xl overflow-hidden shadow-xl">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-[#38444D]">
          <thead class="bg-[#192734]">
            <tr>
              <th class="px-5 py-4 text-left text-xs font-semibold text-[#8899A6] uppercase tracking-wider">Employee</th>
              <th class="px-5 py-4 text-left text-xs font-semibold text-[#8899A6] uppercase tracking-wider">Leave Type</th>
              <th class="px-5 py-4 text-left text-xs font-semibold text-[#8899A6] uppercase tracking-wider">Dates</th>
              <th class="px-5 py-4 text-left text-xs font-semibold text-[#8899A6] uppercase tracking-wider">Reason</th>
              <th class="px-5 py-4 text-left text-xs font-semibold text-[#8899A6] uppercase tracking-wider">Status</th>
              <th class="px-5 py-4 text-left text-xs font-semibold text-[#8899A6] uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#38444D]">
            <tr v-for="leave in leaves" :key="leave._id" class="hover:bg-[#1DA1F2]/5 transition-colors">
              <td class="px-5 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 bg-[#1DA1F2] rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                    {{ initials(leave.employeeId?.name) }}
                  </div>
                  <div>
                    <p class="text-white text-sm font-medium">{{ leave.employeeId?.name }}</p>
                    <p class="text-[#8899A6] text-xs">{{ leave.employeeId?.email }}</p>
                  </div>
                </div>
              </td>
              <td class="px-5 py-4 text-sm text-white">{{ leave.leaveType }}</td>
              <td class="px-5 py-4 text-xs">
                <div class="text-white">{{ formatDate(leave.startDate) }}</div>
                <div class="text-[#8899A6]">to {{ formatDate(leave.endDate) }}</div>
              </td>
              <td class="px-5 py-4 text-sm text-[#8899A6] max-w-xs">
                <span class="truncate block" :title="leave.reason">{{ leave.reason }}</span>
              </td>
              <td class="px-5 py-4">
                <StatusBadge :status="leave.status" />
              </td>
              <td class="px-5 py-4">
                <div v-if="leave.status === 'Pending'" class="flex gap-2">
                  <button
                    @click="updateLeave(leave._id, 'approve')"
                    :disabled="actionLoading === leave._id"
                    class="bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/20 text-xs font-medium px-3 py-1.5 rounded-full transition-all disabled:opacity-50"
                  >
                    Approve
                  </button>
                  <button
                    @click="updateLeave(leave._id, 'reject')"
                    :disabled="actionLoading === leave._id"
                    class="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs font-medium px-3 py-1.5 rounded-full transition-all disabled:opacity-50"
                  >
                    Reject
                  </button>
                </div>
                <span v-else class="text-[#8899A6] text-xs">—</span>
              </td>
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
import { getAllRequests, approveLeave, rejectLeave } from '../../services/leaveService'
import StatusBadge from '../../components/StatusBadge.vue'

const toast = useToast()
const leaves = ref([])
const loading = ref(true)
const actionLoading = ref(null)

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}
function initials(name = '') {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
}
function countByStatus(status) {
  return leaves.value.filter((l) => l.status === status).length
}

async function fetchLeaves() {
  loading.value = true
  try {
    const { data } = await getAllRequests()
    leaves.value = data.data
  } catch {
    toast.error('Failed to load requests.')
  } finally {
    loading.value = false
  }
}

async function updateLeave(id, action) {
  actionLoading.value = id
  try {
    const fn = action === 'approve' ? approveLeave : rejectLeave
    const { data } = await fn(id)
    const idx = leaves.value.findIndex((l) => l._id === id)
    if (idx !== -1) leaves.value[idx] = data.data
    toast.success(`Leave ${action === 'approve' ? 'approved' : 'rejected'} successfully!`)
  } catch {
    toast.error(`Failed to ${action} leave.`)
  } finally {
    actionLoading.value = null
  }
}

onMounted(fetchLeaves)
</script>
