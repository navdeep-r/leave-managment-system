<template>
  <div class="max-w-2xl mx-auto">
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-white">Apply for Leave</h2>
      <p class="text-[#8899A6] mt-1 text-sm">Fill in the details below to submit a leave request</p>
    </div>

    <div class="bg-[#1E2732] border border-[#38444D] rounded-2xl p-6 shadow-xl">
      <!-- Success state -->
      <div v-if="submitted" class="text-center py-8">
        <div class="w-16 h-16 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-green-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 class="text-white text-xl font-semibold mb-2">Request Submitted!</h3>
        <p class="text-[#8899A6] text-sm mb-6">Your leave request has been sent successfully.</p>
        <button @click="resetForm" class="bg-[#1DA1F2] hover:bg-[#1A91DA] text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all">
          Apply Another
        </button>
      </div>

      <form v-else @submit.prevent="handleSubmit" class="space-y-5">
        <!-- Error -->
        <div v-if="errorMessage" class="bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl px-4 py-3 text-sm">
          {{ errorMessage }}
        </div>

        <!-- Leave Type -->
        <div>
          <label class="block text-[#8899A6] text-sm font-medium mb-2">Leave Type</label>
          <select v-model="form.leaveType" id="leaveType" required
            class="w-full bg-[#15202B] border rounded-xl px-4 py-3 text-sm text-white transition-all focus:outline-none focus:ring-2 focus:ring-[#1DA1F2]/50 focus:border-[#1DA1F2]"
            :class="errors.leaveType ? 'border-red-500' : 'border-[#38444D]'">
            <option value="" disabled class="bg-[#1E2732]">Select leave type</option>
            <option v-for="type in leaveTypes" :key="type" :value="type" class="bg-[#1E2732]">{{ type }}</option>
          </select>
          <p v-if="errors.leaveType" class="text-red-400 text-xs mt-1">{{ errors.leaveType }}</p>
        </div>

        <!-- Date row -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-[#8899A6] text-sm font-medium mb-2">Start Date</label>
            <input v-model="form.startDate" type="date" id="startDate" required
              class="w-full bg-[#15202B] border rounded-xl px-4 py-3 text-sm text-white transition-all focus:outline-none focus:ring-2 focus:ring-[#1DA1F2]/50 focus:border-[#1DA1F2]"
              :class="errors.startDate ? 'border-red-500' : 'border-[#38444D]'" />
            <p v-if="errors.startDate" class="text-red-400 text-xs mt-1">{{ errors.startDate }}</p>
          </div>
          <div>
            <label class="block text-[#8899A6] text-sm font-medium mb-2">End Date</label>
            <input v-model="form.endDate" type="date" id="endDate" required
              class="w-full bg-[#15202B] border rounded-xl px-4 py-3 text-sm text-white transition-all focus:outline-none focus:ring-2 focus:ring-[#1DA1F2]/50 focus:border-[#1DA1F2]"
              :class="errors.endDate ? 'border-red-500' : 'border-[#38444D]'" />
            <p v-if="errors.endDate" class="text-red-400 text-xs mt-1">{{ errors.endDate }}</p>
          </div>
        </div>

        <!-- Reason -->
        <div>
          <label class="block text-[#8899A6] text-sm font-medium mb-2">Reason</label>
          <textarea v-model="form.reason" id="reason" rows="4" placeholder="Briefly describe the reason for your leave..."
            required
            class="w-full bg-[#15202B] border rounded-xl px-4 py-3 text-sm text-white placeholder-[#8899A6]/50 transition-all focus:outline-none focus:ring-2 focus:ring-[#1DA1F2]/50 focus:border-[#1DA1F2] resize-none"
            :class="errors.reason ? 'border-red-500' : 'border-[#38444D]'">
          </textarea>
          <p v-if="errors.reason" class="text-red-400 text-xs mt-1">{{ errors.reason }}</p>
        </div>

        <button type="submit" :disabled="loading"
          class="w-full bg-[#1DA1F2] hover:bg-[#1A91DA] disabled:opacity-60 text-white font-bold py-3 rounded-full transition-all hover:scale-[1.01] flex items-center justify-center gap-2 shadow-lg shadow-[#1DA1F2]/20">
          <svg v-if="loading" class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          {{ loading ? 'Submitting...' : 'Submit Request' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useToast } from 'vue-toastification'
import { applyLeave } from '../../services/leaveService'

const toast = useToast()

const leaveTypes = ['Sick Leave', 'Casual Leave', 'Vacation', 'Other']
const form = reactive({ leaveType: '', startDate: '', endDate: '', reason: '' })
const errors = reactive({ leaveType: '', startDate: '', endDate: '', reason: '' })
const loading = ref(false)
const submitted = ref(false)
const errorMessage = ref('')

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
    toast.success('Leave request submitted successfully!')
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
