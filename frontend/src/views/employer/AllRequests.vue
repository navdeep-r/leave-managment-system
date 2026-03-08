<template>
  <div>
    <!-- Header card -->
    <div class="relative bg-gradient-to-r from-purple-600/10 via-[#161b22] to-[#161b22] border border-[#30363d] rounded-2xl p-6 mb-6 overflow-hidden">
      <div class="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 rounded-full blur-2xl -translate-y-4 translate-x-4"></div>
      <div class="relative z-10">
        <h2 class="text-2xl font-bold text-white">All Leave Requests</h2>
        <p class="text-[#8899A6] text-sm mt-1">Review, approve, or reject your team's pending requests</p>
      </div>
    </div>

    <!-- Summary stat cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
      <div class="bg-[#161b22] border border-[#30363d] rounded-xl p-4 flex items-center gap-3">
        <div class="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center flex-shrink-0">
          <svg class="w-5 h-5 text-[#8899A6]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12" />
          </svg>
        </div>
        <div>
          <p class="text-[#8899A6] text-xs font-medium">Total</p>
          <p class="text-white text-xl font-bold">{{ leaves.length }}</p>
        </div>
      </div>
      <div class="bg-[#161b22] border border-yellow-500/20 rounded-xl p-4 flex items-center gap-3">
        <div class="w-10 h-10 bg-yellow-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
          <svg class="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <p class="text-yellow-400 text-xs font-medium">Pending</p>
          <p class="text-white text-xl font-bold">{{ count('Pending') }}</p>
        </div>
      </div>
      <div class="bg-[#161b22] border border-green-500/20 rounded-xl p-4 flex items-center gap-3">
        <div class="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
          <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <p class="text-green-400 text-xs font-medium">Approved</p>
          <p class="text-white text-xl font-bold">{{ count('Approved') }}</p>
        </div>
      </div>
      <div class="bg-[#161b22] border border-red-500/20 rounded-xl p-4 flex items-center gap-3">
        <div class="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
          <svg class="w-5 h-5 text-red-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <p class="text-red-400 text-xs font-medium">Rejected</p>
          <p class="text-white text-xl font-bold">{{ count('Rejected') }}</p>
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-24 gap-4">
      <svg class="w-10 h-10 text-purple-400 animate-spin" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
      <p class="text-[#8899A6] text-sm">Loading requests…</p>
    </div>

    <!-- Empty state -->
    <div v-else-if="leaves.length === 0" class="bg-[#161b22] border border-[#30363d] rounded-2xl p-16 text-center">
      <div class="w-20 h-20 bg-purple-500/5 border border-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-9 h-9 text-purple-400/60" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12" />
        </svg>
      </div>
      <h3 class="text-white text-xl font-semibold mb-2">No requests yet</h3>
      <p class="text-[#8899A6] text-sm">No leave requests have been submitted yet.</p>
    </div>

    <!-- Table -->
    <div v-else class="bg-[#161b22] border border-[#30363d] rounded-2xl overflow-hidden shadow-2xl">
      <div class="overflow-x-auto">
        <table class="min-w-full">
          <thead>
            <tr class="bg-[#0d1117] border-b border-[#30363d]">
              <th class="px-5 py-4 text-left text-xs font-semibold text-[#8899A6] uppercase tracking-wider">Employee</th>
              <th class="px-5 py-4 text-left text-xs font-semibold text-[#8899A6] uppercase tracking-wider">Leave Type</th>
              <th class="px-5 py-4 text-left text-xs font-semibold text-[#8899A6] uppercase tracking-wider">Duration</th>
              <th class="px-5 py-4 text-left text-xs font-semibold text-[#8899A6] uppercase tracking-wider">Reason</th>
              <th class="px-5 py-4 text-left text-xs font-semibold text-[#8899A6] uppercase tracking-wider">Status</th>
              <th class="px-5 py-4 text-left text-xs font-semibold text-[#8899A6] uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="leave in leaves" :key="leave._id"
              class="border-b border-[#21262d] last:border-0 hover:bg-purple-500/3 transition-colors">
              <!-- Employee -->
              <td class="px-5 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 bg-gradient-to-br from-[#1DA1F2] to-[#0d85d1] rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0 shadow-sm">
                    {{ initials(leave.employeeId?.name) }}
                  </div>
                  <div>
                    <p class="text-white text-sm font-semibold">{{ leave.employeeId?.name }}</p>
                    <p class="text-[#8899A6] text-xs">{{ leave.employeeId?.email }}</p>
                  </div>
                </div>
              </td>
              <!-- Leave Type -->
              <td class="px-5 py-4">
                <div class="flex items-center gap-2">
                  <div class="w-7 h-7 bg-[#1DA1F2]/10 border border-[#1DA1F2]/20 rounded-lg flex items-center justify-center">
                    <span v-html="leaveTypeIcon(leave.leaveType)" class="w-3.5 h-3.5 text-[#1DA1F2]"></span>
                  </div>
                  <span class="text-white text-sm">{{ leave.leaveType }}</span>
                </div>
              </td>
              <!-- Dates -->
              <td class="px-5 py-4">
                <div class="text-white text-sm">{{ formatDate(leave.startDate) }}</div>
                <div class="text-[#8899A6] text-xs flex items-center gap-1">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                  </svg>
                  {{ formatDate(leave.endDate) }}
                </div>
              </td>
              <!-- Reason -->
              <td class="px-5 py-4 max-w-xs">
                <p class="text-[#8899A6] text-sm truncate" :title="leave.reason">{{ leave.reason }}</p>
              </td>
              <!-- Status -->
              <td class="px-5 py-4">
                <StatusBadge :status="leave.status" />
              </td>
              <!-- Actions -->
              <td class="px-5 py-4">
                <div v-if="leave.status === 'Pending'" class="flex gap-2">
                  <button
                    @click="updateLeave(leave._id, 'approve')"
                    :disabled="actionLoading === leave._id"
                    class="group flex items-center gap-1.5 bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/20 text-xs font-semibold px-3 py-1.5 rounded-full transition-all disabled:opacity-50 hover:border-green-500/40">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    Approve
                  </button>
                  <button
                    @click="updateLeave(leave._id, 'reject')"
                    :disabled="actionLoading === leave._id"
                    class="group flex items-center gap-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs font-semibold px-3 py-1.5 rounded-full transition-all disabled:opacity-50 hover:border-red-500/40">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Reject
                  </button>
                </div>
                <span v-else class="text-[#8899A6] text-xs italic">Actioned</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="border-t border-[#30363d] px-5 py-3 bg-[#0d1117]/60 flex items-center justify-between">
        <p class="text-[#8899A6] text-xs">{{ leaves.length }} total · {{ count('Pending') }} pending action</p>
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
    const { data } = await getAllRequests()
    leaves.value = data.data
  } catch { toast.error('Failed to load requests.') }
  finally { loading.value = false }
}

async function updateLeave(id, action) {
  actionLoading.value = id
  try {
    const fn = action === 'approve' ? approveLeave : rejectLeave
    const { data } = await fn(id)
    const idx = leaves.value.findIndex((l) => l._id === id)
    if (idx !== -1) leaves.value[idx] = data.data
    toast.success(`Leave ${action === 'approve' ? 'approved' : 'rejected'}!`)
  } catch { toast.error(`Failed to ${action} leave.`) }
  finally { actionLoading.value = null }
}

onMounted(fetchLeaves)
</script>
