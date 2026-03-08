<template>
  <div class="min-h-screen bg-[#0d1117] flex">

    <!-- ─── LEFT PANEL (branding) ─── -->
    <div class="hidden lg:flex flex-col w-[52%] relative overflow-hidden bg-gradient-to-br from-[#0d1117] via-[#0f1923] to-[#0d1117] border-r border-white/5 p-12">
      <!-- Background glow -->
      <div class="absolute top-0 left-0 w-full h-full">
        <div class="absolute top-1/3 left-1/4 w-96 h-96 bg-[#1DA1F2] rounded-full filter blur-[160px] opacity-10"></div>
        <div class="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-600 rounded-full filter blur-[120px] opacity-8"></div>
      </div>

      <div class="relative z-10 flex flex-col h-full">
        <!-- Top: logo + brand -->
        <router-link to="/" class="flex items-center gap-3 mb-auto group">
          <div class="w-10 h-10 rounded-full overflow-hidden border border-[#1DA1F2]/30 flex-shrink-0 group-hover:border-[#1DA1F2]/60 transition-colors">
            <img src="/src/assets/huskyvoiceai.png" alt="HuskyVoiceAI" class="w-full h-full object-cover" />
          </div>
          <span class="font-bold text-xl text-white tracking-tight">Leave<span class="text-[#1DA1F2]">Manager</span></span>
        </router-link>

        <!-- Center content -->
        <div class="flex-1 flex flex-col justify-center">
          <div class="mb-3">
            <span class="text-[#1DA1F2] text-xs font-bold uppercase tracking-widest">HuskyVoiceAI Platform</span>
          </div>
          <h2 class="text-5xl font-extrabold text-white leading-tight mb-6">
            Manage leave
            <br/>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#1DA1F2] to-[#38BDF8]">effortlessly.</span>
          </h2>
          <p class="text-[#8899A6] text-base leading-relaxed mb-10 max-w-sm">
            The smartest way for employees and employers to handle time-off. Fast, transparent, and stress-free.
          </p>

          <!-- Feature list -->
          <ul class="space-y-4 mb-12">
            <li v-for="feat in panelFeatures" :key="feat.label" class="flex items-start gap-3">
              <div class="w-8 h-8 bg-[#1DA1F2]/10 border border-[#1DA1F2]/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <span v-html="feat.icon" class="w-4 h-4 text-[#1DA1F2]"></span>
              </div>
              <div>
                <p class="text-white text-sm font-semibold">{{ feat.label }}</p>
                <p class="text-[#8899A6] text-xs">{{ feat.sub }}</p>
              </div>
            </li>
          </ul>

          <!-- Fake testimonial card -->
          <div class="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-5 max-w-sm">
            <div class="flex items-center gap-1 mb-3">
              <svg v-for="i in 5" :key="i" class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            </div>
            <p class="text-[#8899A6] text-sm leading-relaxed italic">
              "Our team switched to LeaveManager and haven't looked back. Approval turnaround dropped from 3 days to 3 minutes."
            </p>
            <div class="flex items-center gap-2 mt-3">
              <div class="w-7 h-7 bg-[#1DA1F2] rounded-full flex items-center justify-center text-white text-xs font-bold">SR</div>
              <div>
                <p class="text-white text-xs font-medium">Sarah R.</p>
                <p class="text-[#8899A6] text-xs">HR Manager, TechFlow</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom: back link -->
        <router-link to="/" class="flex items-center gap-2 text-[#8899A6] hover:text-white text-sm transition-colors mt-8">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back to home
        </router-link>
      </div>
    </div>

    <!-- ─── RIGHT PANEL (form) ─── -->
    <div class="flex-1 flex items-center justify-center px-6 py-12">
      <div class="w-full max-w-md">

        <!-- Mobile logo -->
        <div class="flex items-center gap-3 mb-8 lg:hidden">
          <div class="w-9 h-9 rounded-full overflow-hidden border border-[#1DA1F2]/30">
            <img src="/src/assets/huskyvoiceai.png" alt="HuskyVoiceAI" class="w-full h-full object-cover" />
          </div>
          <span class="font-bold text-lg text-white">Leave<span class="text-[#1DA1F2]">Manager</span></span>
        </div>

        <div class="mb-8">
          <h1 class="text-3xl font-extrabold text-white mb-2">Welcome back</h1>
          <p class="text-[#8899A6] text-sm">Sign in to continue to your dashboard</p>
        </div>

        <!-- Error Alert -->
        <div v-if="errorMessage"
          class="flex items-start gap-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl px-4 py-3 mb-6 text-sm">
          <svg class="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          {{ errorMessage }}
        </div>

        <!-- Form -->
        <form @submit.prevent="handleLogin" class="space-y-5">
          <!-- Email -->
          <div>
            <label class="block text-white/80 text-sm font-medium mb-2">Email address</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <svg class="w-4 h-4 text-[#8899A6]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <input
                v-model="form.email"
                type="email"
                id="email"
                placeholder="you@example.com"
                required
                class="w-full bg-[#161b22] border border-[#30363d] text-white placeholder-[#8899A6]/50 rounded-xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:border-[#1DA1F2] focus:ring-2 focus:ring-[#1DA1F2]/20 transition-all"
              />
            </div>
          </div>

          <!-- Password -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <label class="text-white/80 text-sm font-medium">Password</label>
              <span class="text-[#1DA1F2] text-xs cursor-pointer hover:underline">Forgot password?</span>
            </div>
            <div class="relative">
              <div class="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <svg class="w-4 h-4 text-[#8899A6]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
              </div>
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                id="password"
                placeholder="••••••••"
                required
                class="w-full bg-[#161b22] border border-[#30363d] text-white placeholder-[#8899A6]/50 rounded-xl pl-11 pr-12 py-3.5 text-sm focus:outline-none focus:border-[#1DA1F2] focus:ring-2 focus:ring-[#1DA1F2]/20 transition-all"
              />
              <button type="button" @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-4 flex items-center text-[#8899A6] hover:text-white transition-colors">
                <svg v-if="!showPassword" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Remember me -->
          <label class="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" v-model="rememberMe"
              class="w-4 h-4 rounded border-[#30363d] bg-[#161b22] text-[#1DA1F2] focus:ring-[#1DA1F2]/30 accent-[#1DA1F2]" />
            <span class="text-[#8899A6] group-hover:text-white text-sm transition-colors">Keep me signed in</span>
          </label>

          <!-- Submit -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-[#1DA1F2] hover:bg-[#1A91DA] disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg shadow-[#1DA1F2]/20 mt-2">
            <svg v-if="loading" class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            {{ loading ? 'Signing in...' : 'Sign in' }}
          </button>
        </form>

        <!-- Divider -->
        <div class="flex items-center gap-4 my-6">
          <div class="flex-1 h-px bg-white/5"></div>
          <span class="text-[#8899A6] text-xs">New to the platform?</span>
          <div class="flex-1 h-px bg-white/5"></div>
        </div>

        <!-- Register CTA -->
        <router-link to="/register"
          class="block w-full text-center bg-white/5 hover:bg-white/8 border border-white/10 hover:border-[#1DA1F2]/30 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 text-sm">
          Create a free account
        </router-link>

        <p class="text-[#8899A6]/50 text-xs text-center mt-6">
          By signing in you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { login } from '../../services/authService'
import { useAuthStore } from '../../store/auth'

const router = useRouter()
const toast = useToast()
const authStore = useAuthStore()

const form = reactive({ email: '', password: '' })
const loading = ref(false)
const errorMessage = ref('')
const showPassword = ref(false)
const rememberMe = ref(false)

const panelFeatures = [
  {
    label: 'Apply in seconds',
    sub: 'Simple form, any device, anywhere',
    icon: `<svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/></svg>`,
  },
  {
    label: 'Instant approvals',
    sub: 'Employers act with one click',
    icon: `<svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
  },
  {
    label: 'Secure & private',
    sub: 'JWT auth, role-based access',
    icon: `<svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/></svg>`,
  },
]

async function handleLogin() {
  loading.value = true
  errorMessage.value = ''
  try {
    const { data } = await login(form)
    authStore.setAuth(data.user, data.token)
    toast.success(`Welcome back, ${data.user.name}!`)
    router.push(data.user.role === 'employee' ? '/employee' : '/employer')
  } catch (err) {
    errorMessage.value = err.response?.data?.message || 'Login failed. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>
