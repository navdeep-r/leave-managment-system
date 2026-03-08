<template>
  <div class="max-w-2xl mx-auto">
    <!-- Header card -->
    <div class="relative bg-gradient-to-r from-[#1DA1F2]/10 via-[#161b22] to-[#161b22] border border-[#30363d] rounded-2xl p-6 mb-6 overflow-hidden">
      <div class="absolute top-0 right-0 w-32 h-32 bg-[#1DA1F2]/10 rounded-full blur-2xl -translate-y-4 translate-x-4"></div>
      <div class="relative z-10 flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-bold text-white">Apply for Leave</h2>
          <p class="text-[#8899A6] text-sm mt-1">Submit a new request — your manager will be notified instantly</p>
        </div>
        <div class="hidden sm:flex w-12 h-12 bg-[#1DA1F2]/10 border border-[#1DA1F2]/20 rounded-xl items-center justify-center">
          <svg class="w-6 h-6 text-[#1DA1F2]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5" />
          </svg>
        </div>
      </div>
    </div>

    <!-- Form card -->
    <div class="bg-[#161b22] border border-[#30363d] rounded-2xl overflow-hidden shadow-xl">

      <!-- Success state -->
      <div v-if="submitted" class="p-12 text-center">
        <div class="relative w-20 h-20 mx-auto mb-6">
          <div class="absolute inset-0 bg-green-500/20 rounded-full animate-ping opacity-40"></div>
          <div class="relative w-20 h-20 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center">
            <svg class="w-10 h-10 text-green-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
        </div>
        <h3 class="text-white text-2xl font-bold mb-2">Request submitted!</h3>
        <p class="text-[#8899A6] text-sm mb-2">Your leave request is now <span class="text-yellow-400 font-semibold">Pending</span> review.</p>
        <p class="text-[#8899A6] text-xs mb-8">You'll see it in your requests table once it's actioned.</p>
        <div class="flex gap-3 justify-center">
          <button @click="resetForm"
            class="bg-[#1DA1F2] hover:bg-[#1A91DA] text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105">
            Apply another
          </button>
          <router-link to="/employee/my-requests"
            class="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all">
            View my requests
          </router-link>
        </div>
      </div>

      <form v-else @submit.prevent="handleSubmit">
        <div class="p-6 space-y-5">
          <!-- Error -->
          <div v-if="errorMessage" class="flex items-start gap-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl p-4 text-sm">
            <svg class="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            {{ errorMessage }}
          </div>

          <!-- Leave Type -->
          <div>
            <label class="block text-white/80 text-sm font-medium mb-2">Leave Type</label>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                v-for="type in leaveTypes" :key="type.value" type="button"
                @click="form.leaveType = type.value"
                :class="form.leaveType === type.value
                  ? 'bg-[#1DA1F2]/10 border-[#1DA1F2] text-[#1DA1F2]'
                  : 'bg-[#0d1117] border-[#30363d] text-[#8899A6] hover:border-[#8899A6]/50 hover:text-white'"
                class="flex flex-col items-center gap-1.5 border rounded-xl p-3 text-xs font-medium transition-all duration-200 cursor-pointer">
                <span v-html="type.icon" class="w-5 h-5"></span>
                {{ type.label }}
              </button>
            </div>
            <p v-if="errors.leaveType" class="text-red-400 text-xs mt-1.5">{{ errors.leaveType }}</p>
          </div>

          <!-- Date row -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-white/80 text-sm font-medium mb-2">Start Date</label>
              <input v-model="form.startDate" type="date" id="startDate" required
                class="w-full bg-[#0d1117] border rounded-xl px-4 py-3 text-sm text-white transition-all focus:outline-none focus:ring-2 focus:ring-[#1DA1F2]/30 focus:border-[#1DA1F2]"
                :class="errors.startDate ? 'border-red-500' : 'border-[#30363d]'" />
              <p v-if="errors.startDate" class="text-red-400 text-xs mt-1">{{ errors.startDate }}</p>
            </div>
            <div>
              <label class="block text-white/80 text-sm font-medium mb-2">End Date</label>
              <input v-model="form.endDate" type="date" id="endDate" required
                class="w-full bg-[#0d1117] border rounded-xl px-4 py-3 text-sm text-white transition-all focus:outline-none focus:ring-2 focus:ring-[#1DA1F2]/30 focus:border-[#1DA1F2]"
                :class="errors.endDate ? 'border-red-500' : 'border-[#30363d]'" />
              <p v-if="errors.endDate" class="text-red-400 text-xs mt-1">{{ errors.endDate }}</p>
            </div>
          </div>

          <!-- Duration indicator -->
          <div v-if="form.startDate && form.endDate && !errors.endDate"
            class="bg-[#0d1117] border border-[#30363d] rounded-xl px-4 py-3 flex items-center gap-3">
            <svg class="w-4 h-4 text-[#1DA1F2] flex-shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="text-[#8899A6] text-sm">Duration: <span class="text-white font-semibold">{{ leaveDays }} day{{ leaveDays !== 1 ? 's' : '' }}</span></span>
          </div>

          <!-- Reason -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <label class="text-white/80 text-sm font-medium">Reason</label>
              <span class="text-[#8899A6] text-xs">{{ form.reason.length }}/300</span>
            </div>
            <textarea v-model="form.reason" id="reason" rows="4" maxlength="300"
              placeholder="Describe the reason for your leave request..."
              required
              class="w-full bg-[#0d1117] border rounded-xl px-4 py-3 text-sm text-white placeholder-[#8899A6]/40 transition-all focus:outline-none focus:ring-2 focus:ring-[#1DA1F2]/30 focus:border-[#1DA1F2] resize-none"
              :class="errors.reason ? 'border-red-500' : 'border-[#30363d]'">
            </textarea>
            <p v-if="errors.reason" class="text-red-400 text-xs mt-1">{{ errors.reason }}</p>
          </div>
        </div>

        <!-- Footer -->
        <div class="border-t border-[#30363d] px-6 py-4 bg-[#0d1117]/60 flex items-center justify-between gap-3">
          <p class="text-[#8899A6] text-xs hidden sm:block">Request will be submitted as <span class="text-yellow-400 font-medium">Pending</span></p>
          <button type="submit" :disabled="loading"
            class="ml-auto bg-[#1DA1F2] hover:bg-[#1A91DA] disabled:opacity-60 text-white font-bold px-7 py-3 rounded-full transition-all hover:scale-105 flex items-center gap-2 shadow-lg shadow-[#1DA1F2]/20 text-sm">
            <svg v-if="loading" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            {{ loading ? 'Submitting...' : 'Submit Request' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useToast } from 'vue-toastification'
import { applyLeave } from '../../services/leaveService'

const toast = useToast()

const leaveTypes = [
  { value: 'Sick Leave', label: 'Sick Leave', icon: `<svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/></svg>` },
  { value: 'Casual Leave', label: 'Casual', icon: `<svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"/></svg>` },
  { value: 'Vacation', label: 'Vacation', icon: `<svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636"/></svg>` },
  { value: 'Other', label: 'Other', icon: `<svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"/></svg>` },
]

const form = reactive({ leaveType: '', startDate: '', endDate: '', reason: '' })
const errors = reactive({ leaveType: '', startDate: '', endDate: '', reason: '' })
const loading = ref(false)
const submitted = ref(false)
const errorMessage = ref('')

const leaveDays = computed(() => {
  if (!form.startDate || !form.endDate) return 0
  const diff = new Date(form.endDate) - new Date(form.startDate)
  return Math.max(0, Math.floor(diff / 86400000) + 1)
})

function validate() {
  let valid = true
  Object.keys(errors).forEach((k) => (errors[k] = ''))
  if (!form.leaveType) { errors.leaveType = 'Please select a leave type'; valid = false }
  if (!form.startDate) { errors.startDate = 'Start date is required'; valid = false }
  if (!form.endDate) { errors.endDate = 'End date is required'; valid = false }
  if (form.startDate && form.endDate && new Date(form.endDate) < new Date(form.startDate)) {
    errors.endDate = 'End date must be on or after start date'; valid = false
  }
  if (!form.reason.trim()) { errors.reason = 'Reason is required'; valid = false }
  return valid
}

async function handleSubmit() {
  if (!validate()) return
  loading.value = true
  errorMessage.value = ''
  try {
    await applyLeave(form)
    submitted.value = true
    toast.success('Leave request submitted!')
  } catch (err) {
    errorMessage.value = err.response?.data?.message || 'Failed to submit request.'
  } finally {
    loading.value = false
  }
}

function resetForm() {
  Object.assign(form, { leaveType: '', startDate: '', endDate: '', reason: '' })
  Object.keys(errors).forEach((k) => (errors[k] = ''))
  submitted.value = false
}
</script>
