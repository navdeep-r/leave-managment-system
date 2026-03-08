<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 flex items-center justify-center px-4 py-10">
    <div class="w-full max-w-md">
      <div class="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8">
        <!-- Header -->
        <div class="text-center mb-8">
          <router-link to="/" class="inline-flex items-center gap-2 text-indigo-300 hover:text-white transition-colors mb-6 text-sm">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to Home
          </router-link>
          <h2 class="text-3xl font-bold text-white">Create Account</h2>
          <p class="text-indigo-200 mt-2 text-sm">Join Leave Manager and get started today</p>
        </div>

        <!-- Error Alert -->
        <div v-if="errorMessage" class="bg-red-500/20 border border-red-400/30 text-red-200 rounded-xl px-4 py-3 mb-6 text-sm flex items-center gap-2">
          <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          {{ errorMessage }}
        </div>

        <form @submit.prevent="handleRegister" class="space-y-5">
          <!-- Name -->
          <div>
            <label class="block text-indigo-200 text-sm font-medium mb-2">Full Name</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-3 flex items-center text-indigo-300">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </span>
              <input v-model="form.name" type="text" id="name" placeholder="John Doe" required
                class="w-full bg-white/10 border border-white/20 text-white placeholder-indigo-300/60 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all" />
            </div>
          </div>

          <!-- Email -->
          <div>
            <label class="block text-indigo-200 text-sm font-medium mb-2">Email Address</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-3 flex items-center text-indigo-300">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </span>
              <input v-model="form.email" type="email" id="reg-email" placeholder="your@email.com" required
                class="w-full bg-white/10 border border-white/20 text-white placeholder-indigo-300/60 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all" />
            </div>
          </div>

          <!-- Password -->
          <div>
            <label class="block text-indigo-200 text-sm font-medium mb-2">Password</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-3 flex items-center text-indigo-300">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
              </span>
              <input v-model="form.password" type="password" id="reg-password" placeholder="Min. 6 characters" required minlength="6"
                class="w-full bg-white/10 border border-white/20 text-white placeholder-indigo-300/60 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all" />
            </div>
          </div>

          <!-- Role -->
          <div>
            <label class="block text-indigo-200 text-sm font-medium mb-2">I am an</label>
            <div class="grid grid-cols-2 gap-3">
              <button type="button" @click="form.role='employee'"
                :class="form.role === 'employee' ? 'bg-indigo-500 border-indigo-400 text-white' : 'bg-white/10 border-white/20 text-indigo-200 hover:bg-white/15'"
                class="border rounded-xl py-3 text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" />
                </svg>
                Employee
              </button>
              <button type="button" @click="form.role='employer'"
                :class="form.role === 'employer' ? 'bg-indigo-500 border-indigo-400 text-white' : 'bg-white/10 border-white/20 text-indigo-200 hover:bg-white/15'"
                class="border rounded-xl py-3 text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
                Employer
              </button>
            </div>
          </div>

          <button type="submit" :disabled="loading || !form.role"
            class="w-full bg-indigo-500 hover:bg-indigo-400 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg shadow-indigo-900/40">
            <svg v-if="loading" class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            {{ loading ? 'Creating account...' : 'Create Account' }}
          </button>
        </form>

        <p class="text-center text-indigo-200/70 text-sm mt-6">
          Already have an account?
          <router-link to="/login" class="text-indigo-300 hover:text-white font-medium transition-colors">Sign in</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { register } from '../../services/authService'
import { useAuthStore } from '../../store/auth'

const router = useRouter()
const toast = useToast()
const authStore = useAuthStore()

const form = reactive({ name: '', email: '', password: '', role: '' })
const loading = ref(false)
const errorMessage = ref('')

async function handleRegister() {
  if (!form.role) { errorMessage.value = 'Please select a role.'; return }
  loading.value = true
  errorMessage.value = ''
  try {
    const { data } = await register(form)
    authStore.setAuth(data.user, data.token)
    toast.success(`Account created! Welcome, ${data.user.name}!`)
    router.push(data.user.role === 'employee' ? '/employee' : '/employer')
  } catch (err) {
    errorMessage.value = err.response?.data?.message || 'Registration failed. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>
