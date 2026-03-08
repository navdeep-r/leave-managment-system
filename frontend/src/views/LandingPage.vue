<template>
  <div class="min-h-screen bg-[#0d1117] text-white overflow-x-hidden">

    <!-- ─── NAV ─── -->
    <nav class="fixed top-0 inset-x-0 z-50 border-b border-white/5 bg-[#0d1117]/80 backdrop-blur-xl">
      <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-full overflow-hidden border border-[#1DA1F2]/30 flex-shrink-0">
            <img src="/src/assets/huskyvoiceai.png" alt="HuskyVoiceAI" class="w-full h-full object-cover" />
          </div>
          <span class="font-bold text-lg tracking-tight">Leave<span class="text-[#1DA1F2]">Manager</span></span>
        </div>
        <div class="flex items-center gap-3">
          <router-link to="/login" class="text-[#8899A6] hover:text-white text-sm font-medium transition-colors px-4 py-2">
            Sign in
          </router-link>
          <router-link to="/register"
            class="bg-[#1DA1F2] hover:bg-[#1A91DA] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all hover:shadow-lg hover:shadow-[#1DA1F2]/25">
            Get started
          </router-link>
        </div>
      </div>
    </nav>

    <!-- ─── HERO ─── -->
    <section class="relative min-h-screen flex items-center justify-center pt-20 pb-16 px-6">
      <!-- Animated gradient orbs -->
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-[#1DA1F2] rounded-full filter blur-[120px] opacity-10 animate-pulse"></div>
      <div class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600 rounded-full filter blur-[120px] opacity-8 animate-pulse" style="animation-delay:1.5s"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#1DA1F2] rounded-full filter blur-[200px] opacity-5"></div>

      <div class="relative z-10 max-w-4xl mx-auto text-center">
        <!-- Badge -->
        <div class="inline-flex items-center gap-2 bg-[#1DA1F2]/10 border border-[#1DA1F2]/20 text-[#1DA1F2] text-xs font-semibold px-4 py-2 rounded-full mb-8 backdrop-blur-sm">
          <span class="w-1.5 h-1.5 bg-[#1DA1F2] rounded-full animate-pulse"></span>
          Trusted by 500+ companies worldwide
        </div>

        <!-- Headline -->
        <h1 class="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-6">
          Leave management
          <br />
          <span class="relative">
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#1DA1F2] via-[#38BDF8] to-[#1DA1F2]">
              reimagined.
            </span>
            <!-- Underline glow -->
            <span class="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1DA1F2]/60 to-transparent"></span>
          </span>
        </h1>

        <p class="text-[#8899A6] text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
          Streamline leave requests, approvals, and tracking in one beautiful platform. Built for modern teams who value speed, clarity, and control.
        </p>

        <!-- CTA buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <router-link to="/register"
            class="group bg-[#1DA1F2] hover:bg-[#1A91DA] text-white font-bold px-8 py-4 rounded-full text-base transition-all hover:shadow-2xl hover:shadow-[#1DA1F2]/30 hover:scale-105 flex items-center justify-center gap-2">
            Start for free
            <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </router-link>
          <router-link to="/login"
            class="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-semibold px-8 py-4 rounded-full text-base transition-all hover:scale-105 flex items-center justify-center gap-2">
            Sign in to your account
          </router-link>
        </div>

        <!-- Floating stats row -->
        <div class="grid grid-cols-3 gap-4 max-w-lg mx-auto">
          <div class="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-4">
            <div class="text-2xl font-bold text-white">500+</div>
            <div class="text-[#8899A6] text-xs mt-1">Companies</div>
          </div>
          <div class="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-4">
            <div class="text-2xl font-bold text-white">50k+</div>
            <div class="text-[#8899A6] text-xs mt-1">Requests handled</div>
          </div>
          <div class="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-4">
            <div class="text-2xl font-bold text-white">99%</div>
            <div class="text-[#8899A6] text-xs mt-1">Satisfaction</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── FEATURES ─── -->
    <section class="py-24 px-6 border-t border-white/5">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <p class="text-[#1DA1F2] text-sm font-semibold uppercase tracking-widest mb-3">Everything you need</p>
          <h2 class="text-4xl font-bold text-white">Powerful features for<br/>every team</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="feat in features" :key="feat.title"
            class="group bg-[#161b22] border border-[#30363d] hover:border-[#1DA1F2]/40 rounded-2xl p-6 transition-all duration-300 hover:bg-[#1a2030]">
            <div class="w-12 h-12 bg-[#1DA1F2]/10 border border-[#1DA1F2]/20 rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#1DA1F2]/20 transition-colors">
              <span v-html="feat.icon" class="w-6 h-6 text-[#1DA1F2]"></span>
            </div>
            <h3 class="text-white font-semibold text-lg mb-2">{{ feat.title }}</h3>
            <p class="text-[#8899A6] text-sm leading-relaxed">{{ feat.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── HOW IT WORKS ─── -->
    <section class="py-24 px-6 border-t border-white/5">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-16">
          <p class="text-[#1DA1F2] text-sm font-semibold uppercase tracking-widest mb-3">Simple workflow</p>
          <h2 class="text-4xl font-bold text-white">Up and running in minutes</h2>
        </div>

        <div class="relative">
          <!-- Vertical connector line -->
          <div class="absolute left-6 top-8 bottom-8 w-px bg-gradient-to-b from-[#1DA1F2]/60 via-[#1DA1F2]/20 to-transparent hidden md:block"></div>

          <div class="space-y-8">
            <div v-for="(step, i) in steps" :key="i" class="flex gap-6 items-start">
              <div class="w-12 h-12 bg-[#1DA1F2] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 ring-4 ring-[#0d1117] z-10">
                {{ i + 1 }}
              </div>
              <div class="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 flex-1 hover:border-[#1DA1F2]/30 transition-colors">
                <h3 class="text-white font-semibold text-lg mb-1">{{ step.title }}</h3>
                <p class="text-[#8899A6] text-sm leading-relaxed">{{ step.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── ROLE CARDS ─── -->
    <section class="py-24 px-6 border-t border-white/5">
      <div class="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        <!-- Employee card -->
        <div class="relative overflow-hidden bg-gradient-to-br from-[#1DA1F2]/10 to-[#1DA1F2]/5 border border-[#1DA1F2]/20 rounded-3xl p-8">
          <div class="absolute -top-8 -right-8 w-32 h-32 bg-[#1DA1F2]/10 rounded-full blur-2xl"></div>
          <div class="w-14 h-14 bg-[#1DA1F2]/20 border border-[#1DA1F2]/30 rounded-2xl flex items-center justify-center mb-6">
            <svg class="w-7 h-7 text-[#1DA1F2]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" />
            </svg>
          </div>
          <h3 class="text-white text-2xl font-bold mb-3">For Employees</h3>
          <p class="text-[#8899A6] mb-6 text-sm leading-relaxed">Apply for any type of leave in seconds. Track your request status in real time and stay informed every step of the way.</p>
          <ul class="space-y-2 mb-8">
            <li v-for="b in employeeBenefits" :key="b" class="flex items-center gap-2 text-sm text-[#8899A6]">
              <svg class="w-4 h-4 text-[#1DA1F2] flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              {{ b }}
            </li>
          </ul>
          <router-link to="/register" class="inline-flex items-center gap-2 bg-[#1DA1F2] hover:bg-[#1A91DA] text-white text-sm font-semibold px-6 py-3 rounded-full transition-all hover:scale-105">
            Join as Employee
          </router-link>
        </div>

        <!-- Employer card -->
        <div class="relative overflow-hidden bg-gradient-to-br from-purple-600/10 to-purple-600/5 border border-purple-500/20 rounded-3xl p-8">
          <div class="absolute -top-8 -right-8 w-32 h-32 bg-purple-600/10 rounded-full blur-2xl"></div>
          <div class="w-14 h-14 bg-purple-600/20 border border-purple-500/30 rounded-2xl flex items-center justify-center mb-6">
            <svg class="w-7 h-7 text-purple-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197" />
            </svg>
          </div>
          <h3 class="text-white text-2xl font-bold mb-3">For Employers</h3>
          <p class="text-[#8899A6] mb-6 text-sm leading-relaxed">Stay on top of your entire team's leave schedule. Approve or reject in one click. Keep your org running smoothly.</p>
          <ul class="space-y-2 mb-8">
            <li v-for="b in employerBenefits" :key="b" class="flex items-center gap-2 text-sm text-[#8899A6]">
              <svg class="w-4 h-4 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              {{ b }}
            </li>
          </ul>
          <router-link to="/register" class="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold px-6 py-3 rounded-full transition-all hover:scale-105">
            Join as Employer
          </router-link>
        </div>
      </div>
    </section>

    <!-- ─── BOTTOM CTA ─── -->
    <section class="py-24 px-6 border-t border-white/5">
      <div class="max-w-3xl mx-auto text-center">
        <div class="relative bg-gradient-to-br from-[#1DA1F2]/10 via-[#0d1117] to-purple-600/10 border border-white/10 rounded-3xl p-12 overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-r from-[#1DA1F2]/5 to-purple-600/5 rounded-3xl"></div>
          <div class="relative z-10">
            <div class="w-16 h-16 mx-auto mb-6 rounded-full overflow-hidden border-2 border-[#1DA1F2]/40 shadow-lg shadow-[#1DA1F2]/20">
              <img src="/src/assets/huskyvoiceai.png" alt="HuskyVoiceAI" class="w-full h-full object-cover" />
            </div>
            <h2 class="text-4xl font-extrabold text-white mb-4">Ready to get started?</h2>
            <p class="text-[#8899A6] mb-8 text-lg">Join thousands of teams who manage leave the smart way.</p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <router-link to="/register"
                class="bg-[#1DA1F2] hover:bg-[#1A91DA] text-white font-bold px-8 py-4 rounded-full transition-all hover:scale-105 hover:shadow-lg hover:shadow-[#1DA1F2]/30">
                Create free account
              </router-link>
              <router-link to="/login"
                class="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold px-8 py-4 rounded-full transition-all hover:scale-105">
                Sign in
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── FOOTER ─── -->
    <footer class="border-t border-white/5 py-8 px-6 text-center text-[#8899A6] text-sm">
      © 2026 LeaveManager · Powered by HuskyVoiceAI · Built with Vue 3 & Node.js
    </footer>
  </div>
</template>

<script setup>
const features = [
  {
    title: 'One-click approvals',
    desc: 'Employers can approve or reject leave requests instantly from a single dashboard with full context.',
    icon: `<svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
  },
  {
    title: 'Real-time status tracking',
    desc: 'Employees see live status updates — Pending, Approved, or Rejected — with color-coded badges.',
    icon: `<svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/></svg>`,
  },
  {
    title: 'Role-based access',
    desc: 'Separate employee and employer dashboards. Each role sees exactly what they need, nothing more.',
    icon: `<svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/></svg>`,
  },
  {
    title: 'Secure JWT auth',
    desc: 'Industry-standard authentication using signed JSON Web Tokens. Sessions expire automatically.',
    icon: `<svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/></svg>`,
  },
  {
    title: 'Leave type flexibility',
    desc: 'Sick leave, casual leave, vacation, and more. Fully categorized requests for better reporting.',
    icon: `<svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5"/></svg>`,
  },
  {
    title: 'MongoDB Atlas cloud',
    desc: 'All data stored securely in MongoDB Atlas. Scalable, resilient, and always available.',
    icon: `<svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z"/></svg>`,
  },
]

const steps = [
  { title: 'Create your account', desc: 'Sign up in under 30 seconds. Choose your role as an employee or employer — no credit card needed.' },
  { title: 'Submit or review leave', desc: 'Employees fill out a simple leave form. Employers see all pending requests in a clean, sortable table.' },
  { title: 'Approve and track', desc: 'One click to approve or reject. Status updates are reflected instantly for the employee — no emails needed.' },
]

const employeeBenefits = [
  'Apply in under 60 seconds',
  'Track status in real time',
  'View full request history',
  'Multiple leave categories',
]

const employerBenefits = [
  'Consolidated team view',
  'Approve or reject instantly',
  'Live status counters',
  'Employee details at a glance',
]
</script>
