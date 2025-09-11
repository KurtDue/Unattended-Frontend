<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <div class="fixed inset-y-0 left-0 flex w-64 flex-col">
      <div class="flex min-h-0 flex-1 flex-col bg-white border-r border-gray-200">
        <div class="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
          <!-- Logo/Header -->
          <div class="flex flex-shrink-0 items-center px-4 mb-5">
            <div class="flex items-center">
              <img 
                src="@/assets/small_logo.png" 
                alt="Onitio Logo" 
                class="h-8 w-auto"
              />
              <div class="ml-3">
                <h1 class="text-lg font-semibold text-gray-900">Unattended Store</h1>
                <p class="text-xs text-gray-500">{{ authStore.selectedStore?.displayName }}</p>
              </div>
            </div>
          </div>
          
          <!-- Navigation -->
          <nav class="mt-5 flex-1 space-y-1 px-2">
            <router-link
              v-for="item in navigation"
              :key="item.name"
              :to="item.to"
              class="sidebar-item"
              :class="{ 'sidebar-active': $route.name === item.name }"
            >
              <component :is="item.icon" class="mr-3 h-5 w-5 flex-shrink-0" />
              {{ item.label }}
            </router-link>
          </nav>
        </div>
        
        <!-- User section -->
        <div class="flex flex-shrink-0 border-t border-gray-200 p-4">
          <div class="flex items-center">
            <div class="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
              <svg class="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-gray-900">{{ authStore.user?.username }}</p>
              <button
                @click="logout"
                class="text-xs text-gray-500 hover:text-gray-700"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main content -->
    <div class="flex flex-1 flex-col pl-64">
      <!-- Top header -->
      <header class="bg-white shadow-sm border-b border-gray-200">
        <div class="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div class="flex items-center">
            <h1 class="text-xl font-semibold text-gray-900 capitalize">
              {{ $route.name === 'home' ? 'Dashboard' : $route.name }}
            </h1>
          </div>
          
          <!-- Store selector for users with multiple stores -->
          <div v-if="authStore.hasMultipleStores" class="flex items-center">
            <select 
              @change="changeStore"
              v-model="selectedStoreId"
              class="block w-40 rounded-md border-gray-300 text-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option v-for="store in authStore.user?.stores" :key="store.id" :value="store.id">
                {{ store.displayName }}
              </option>
            </select>
          </div>
        </div>
      </header>

      <!-- Page content -->
      <main class="flex-1 overflow-y-auto">
        <div class="py-6">
          <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <RouterView />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// Icons (using simple SVG components)
const HomeIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>`
}
const MonitoringIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>`
}
const SensorsIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/></svg>`
}
const AlertsIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"/></svg>`
}
const IncidentsIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`
}
const StatisticsIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>`
}
const AssistanceIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`
}
const AccessControlIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 7.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>`
}
const ConfigurationIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`
}

const router = useRouter()
const authStore = useAuthStore()

const selectedStoreId = ref(authStore.selectedStore?.id || 0)

const navigation = [
  { name: 'home', label: 'Home', to: '/dashboard/home', icon: HomeIcon },
  { name: 'monitoring', label: 'Monitoring', to: '/dashboard/monitoring', icon: MonitoringIcon },
  { name: 'sensors', label: 'Sensors', to: '/dashboard/sensors', icon: SensorsIcon },
  { name: 'alerts', label: 'Alerts', to: '/dashboard/alerts', icon: AlertsIcon },
  { name: 'incidents', label: 'Incidents', to: '/dashboard/incidents', icon: IncidentsIcon },
  { name: 'statistics', label: 'Statistics', to: '/dashboard/statistics', icon: StatisticsIcon },
  { name: 'assistance', label: 'Assistance', to: '/dashboard/assistance', icon: AssistanceIcon },
  { name: 'access-control', label: 'Access Control', to: '/dashboard/access-control', icon: AccessControlIcon },
  { name: 'configuration', label: 'Configuration', to: '/dashboard/configuration', icon: ConfigurationIcon },
]

const logout = () => {
  authStore.logout()
  router.push('/login')
}

const changeStore = () => {
  const newStore = authStore.user?.stores.find(s => s.id === selectedStoreId.value)
  if (newStore) {
    authStore.selectStore(newStore)
  }
}
</script>
