import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../store/auth'

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: () => import('../views/LandingPage.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/auth/LoginPage.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/auth/RegisterPage.vue'),
  },
  // Employee routes
  {
    path: '/employee',
    component: () => import('../views/employee/EmployeeDashboard.vue'),
    meta: { requiresAuth: true, role: 'employee' },
    children: [
      {
        path: '',
        redirect: '/employee/apply',
      },
      {
        path: 'apply',
        name: 'ApplyLeave',
        component: () => import('../views/employee/ApplyLeave.vue'),
      },
      {
        path: 'my-requests',
        name: 'MyRequests',
        component: () => import('../views/employee/MyRequests.vue'),
      },
    ],
  },
  // Employer routes
  {
    path: '/employer',
    component: () => import('../views/employer/EmployerDashboard.vue'),
    meta: { requiresAuth: true, role: 'employer' },
    children: [
      {
        path: '',
        redirect: '/employer/all-requests',
      },
      {
        path: 'all-requests',
        name: 'AllRequests',
        component: () => import('../views/employer/AllRequests.vue'),
      },
    ],
  },
  // Catch-all
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Navigation guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth) {
    if (!authStore.isAuthenticated) {
      return next('/login')
    }
    if (to.meta.role && authStore.role !== to.meta.role) {
      // Redirect to the correct dashboard
      return next(authStore.role === 'employee' ? '/employee' : '/employer')
    }
  }

  // Redirect logged-in users away from auth pages
  if ((to.path === '/login' || to.path === '/register') && authStore.isAuthenticated) {
    return next(authStore.role === 'employee' ? '/employee' : '/employer')
  }

  next()
})

export default router
