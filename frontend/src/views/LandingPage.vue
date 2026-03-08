<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 flex items-center justify-center px-4">
    <!-- Decorative blobs -->
    <div class="absolute top-0 left-0 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
    <div class="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>

    <div class="relative z-10 text-center max-w-xl w-full">
      <!-- Logo / Icon -->
      <div class="flex justify-center mb-6">
        <div class="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-2xl">
          <svg class="w-12 h-12 text-indigo-300" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5" />
          </svg>
        </div>
      </div>

      <!-- Heading -->
      <h1 class="text-5xl font-bold text-white mb-3 tracking-tight">Leave Manager</h1>
      <p class="text-indigo-200 text-lg mb-10 leading-relaxed">A smart, seamless way to manage employee leave requests — from application to approval.</p>

      <!-- Cards row -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        <div class="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 text-left shadow-lg hover:bg-white/15 transition-all duration-300">
          <div class="text-indigo-300 mb-2">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </div>
          <h3 class="text-white font-semibold mb-1">For Employees</h3>
          <p class="text-indigo-200 text-sm">Apply for leave, track status, and manage requests with ease.</p>
        </div>
        <div class="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 text-left shadow-lg hover:bg-white/15 transition-all duration-300">
          <div class="text-indigo-300 mb-2">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
            </svg>
          </div>
          <h3 class="text-white font-semibold mb-1">For Employers</h3>
          <p class="text-indigo-200 text-sm">Review all requests, approve or reject, keep your team on track.</p>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <router-link
          to="/login"
          class="flex-1 bg-white text-indigo-700 font-semibold px-8 py-4 rounded-xl shadow-lg hover:bg-indigo-50 hover:scale-105 transition-all duration-200 text-center"
        >
          Login
        </router-link>
        <router-link
          to="/register"
          class="flex-1 bg-indigo-500 hover:bg-indigo-400 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:scale-105 transition-all duration-200 text-center border border-indigo-400"
        >
          Register
        </router-link>
      </div>

      <p class="text-indigo-300/60 text-sm mt-8">© 2026 Leave Manager · Built with Vue 3 & Node.js</p>
    </div>
  </div>
</template>

<script setup>
</script>
