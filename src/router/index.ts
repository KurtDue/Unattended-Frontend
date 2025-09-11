import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// Route components
import LoginView from '@/views/LoginView.vue'
import StoreSelectionView from '@/views/StoreSelectionView.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import HomeView from '@/views/HomeView.vue'
import MonitoringView from '@/views/MonitoringView.vue'
import SensorsView from '@/views/SensorsView.vue'
import AlertsView from '@/views/AlertsView.vue'
import IncidentsView from '@/views/IncidentsView.vue'
import StatisticsView from '@/views/StatisticsView.vue'
import AssistanceView from '@/views/AssistanceView.vue'
import ConfigurationView from '@/views/ConfigurationView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresAuth: false, title: 'Login - Onitio Unattended' },
    },
    {
      path: '/store-selection',
      name: 'store-selection',
      component: StoreSelectionView,
      meta: { requiresAuth: true, title: 'Store Selection - Onitio Unattended' },
    },
    {
      path: '/dashboard',
      component: DashboardLayout,
      meta: { requiresAuth: true, requiresStore: true },
      children: [
        {
          path: '',
          redirect: '/dashboard/home',
        },
        {
          path: 'home',
          name: 'home',
          component: HomeView,
          meta: { title: 'Dashboard - Onitio Unattended' },
        },
        {
          path: 'monitoring',
          name: 'monitoring',
          component: MonitoringView,
          meta: { title: 'Monitoring - Onitio Unattended' },
        },
        {
          path: 'sensors',
          name: 'sensors',
          component: SensorsView,
          meta: { title: 'Sensors - Onitio Unattended' },
        },
        {
          path: 'alerts',
          name: 'alerts',
          component: AlertsView,
          meta: { title: 'Alerts - Onitio Unattended' },
        },
        {
          path: 'incidents',
          name: 'incidents',
          component: IncidentsView,
          meta: { title: 'Incidents - Onitio Unattended' },
        },
        {
          path: 'statistics',
          name: 'statistics',
          component: StatisticsView,
          meta: { title: 'Statistics - Onitio Unattended' },
        },
        {
          path: 'assistance',
          name: 'assistance',
          component: AssistanceView,
          meta: { title: 'Assistance - Onitio Unattended' },
        },
        {
          path: 'configuration',
          name: 'configuration',
          component: ConfigurationView,
          meta: { title: 'Configuration - Onitio Unattended' },
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      redirect: '/dashboard/home',
    },
  ],
})

// Navigation guard for authentication
router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore()
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiresStore = to.matched.some(record => record.meta.requiresStore)
  
  // Set document title
  const title = to.meta.title as string || 'Onitio Unattended'
  document.title = title
  
  if (requiresAuth && !authStore.isAuthenticated) {
    next('/login')
    return
  }
  
  if (requiresStore && !authStore.selectedStore) {
    next('/store-selection')
    return
  }
  
  if (to.name === 'login' && authStore.isAuthenticated) {
    if (authStore.selectedStore) {
      next('/dashboard')
    } else {
      next('/store-selection')
    }
    return
  }
  
  if (to.name === 'store-selection' && authStore.selectedStore) {
    next('/dashboard')
    return
  }
  
  next()
})

export default router
