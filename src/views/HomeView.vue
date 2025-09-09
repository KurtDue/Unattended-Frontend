<template>
  <div class="space-y-6">
    <!-- Welcome Header -->
    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-2">Welcome to {{ authStore.selectedStore?.displayName }}</h2>
      <p class="text-gray-600">Here's what's happening in your store today.</p>
    </div>

    <!-- Statistics Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Total Sales</p>
            <p class="text-2xl font-semibold text-gray-900">{{ dataStore.statistics?.totalSales.toLocaleString() || '0' }} NOK</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Today's Visitors</p>
            <p class="text-2xl font-semibold text-gray-900">{{ dataStore.statistics?.todayVisitors || '0' }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Pending Alerts</p>
            <p class="text-2xl font-semibold text-gray-900">{{ dataStore.statistics?.alertsCount.pending || '0' }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Open Incidents</p>
            <p class="text-2xl font-semibold text-gray-900">{{ dataStore.statistics?.incidentsCount.open || '0' }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Recent Alerts -->
      <div class="bg-white rounded-lg shadow">
        <div class="p-6 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-medium text-gray-900">Recent Alerts</h3>
            <router-link to="/dashboard/alerts" class="text-sm text-blue-600 hover:text-blue-500">
              View all
            </router-link>
          </div>
        </div>
        <div class="p-6">
          <div class="space-y-3">
            <div 
              v-for="alert in recentAlerts" 
              :key="alert.id"
              class="flex items-start space-x-3"
            >
              <div class="flex-shrink-0">
                <div 
                  class="w-2 h-2 rounded-full mt-2"
                  :class="{
                    'bg-red-400': alert.type === 'critical',
                    'bg-yellow-400': alert.type === 'warning',
                    'bg-blue-400': alert.type === 'info'
                  }"
                ></div>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900">{{ alert.title }}</p>
                <p class="text-sm text-gray-500">{{ alert.message }}</p>
                <p class="text-xs text-gray-400">{{ formatTime(alert.timestamp) }}</p>
              </div>
            </div>
          </div>
          <div v-if="!recentAlerts.length" class="text-center text-gray-500 text-sm py-4">
            No recent alerts
          </div>
        </div>
      </div>

      <!-- System Status -->
      <div class="bg-white rounded-lg shadow">
        <div class="p-6 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">System Status</h3>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium text-gray-900">System Uptime</span>
              <span class="text-sm text-green-600">{{ dataStore.statistics?.systemUptime || '0%' }}</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium text-gray-900">Average Temperature</span>
              <span class="text-sm text-gray-600">{{ dataStore.statistics?.averageTemperature || '0' }}°C</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium text-gray-900">Active Sensors</span>
              <span class="text-sm text-green-600">{{ activeSensorsCount }}</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium text-gray-900">Active Cameras</span>
              <span class="text-sm text-green-600">{{ activeCamerasCount }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="bg-white rounded-lg shadow p-6">
      <h3 class="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <!-- Door Unlock Quick Action -->
        <div v-if="mainDoorLock" class="col-span-1">
          <button 
            @click="toggleMainDoorLock"
            :disabled="isUnlockingDoor"
            class="w-full flex flex-col items-center p-4 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            :class="{
              'border-green-300 bg-green-50 hover:bg-green-100 text-green-800 focus:ring-green-500': mainDoorLock.value === 'locked',
              'border-red-300 bg-red-50 hover:bg-red-100 text-red-800 focus:ring-red-500': mainDoorLock.value === 'unlocked'
            }"
          >
            <div class="flex items-center justify-center w-8 h-8 rounded-full mb-2"
                 :class="{
                   'bg-green-200': mainDoorLock.value === 'locked',
                   'bg-red-200': mainDoorLock.value === 'unlocked'
                 }">
              <svg v-if="isUnlockingDoor" class="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <svg v-else-if="mainDoorLock.value === 'locked'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"></path>
              </svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
            <span class="text-sm font-medium">
              {{ isUnlockingDoor 
                ? 'Processing...' 
                : mainDoorLock.value === 'locked' 
                  ? 'Unlock Main Door' 
                  : 'Lock Main Door' 
              }}
            </span>
            <span class="text-xs opacity-75 mt-1">
              {{ mainDoorLock.location }}
            </span>
          </button>
        </div>

        <router-link 
          to="/dashboard/monitoring" 
          class="flex items-center p-3 border border-gray-300 rounded-md hover:border-gray-400 transition-colors"
        >
          <svg class="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
          </svg>
          <span class="text-sm font-medium text-gray-900">View Cameras</span>
        </router-link>
        
        <router-link 
          to="/dashboard/sensors" 
          class="flex items-center p-3 border border-gray-300 rounded-md hover:border-gray-400 transition-colors"
        >
          <svg class="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
          </svg>
          <span class="text-sm font-medium text-gray-900">Check Sensors</span>
        </router-link>
        
        <router-link 
          to="/dashboard/alerts" 
          class="flex items-center p-3 border border-gray-300 rounded-md hover:border-gray-400 transition-colors"
        >
          <svg class="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
          </svg>
          <span class="text-sm font-medium text-gray-900">Review Alerts</span>
        </router-link>
        
        <router-link 
          to="/dashboard/incidents" 
          class="flex items-center p-3 border border-gray-300 rounded-md hover:border-gray-400 transition-colors"
        >
          <svg class="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span class="text-sm font-medium text-gray-900">Handle Incidents</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useStoreDataStore } from '@/stores/data'
import type { Sensor } from '@/types'

const authStore = useAuthStore()
const dataStore = useStoreDataStore()
const isUnlockingDoor = ref(false)

const recentAlerts = computed(() => 
  dataStore.alerts.filter(alert => !alert.acknowledged).slice(0, 3)
)

const activeSensorsCount = computed(() => 
  dataStore.sensors.filter(sensor => sensor.status === 'active').length
)

const activeCamerasCount = computed(() => 
  dataStore.cameras.filter(camera => camera.isActive).length
)

// Find the main door lock sensor
const mainDoorLock = computed(() => 
  dataStore.sensors.find(sensor => 
    sensor.type === 'door_lock' && 
    (sensor.name.toLowerCase().includes('main') || sensor.name.toLowerCase().includes('entrance'))
  )
)

const toggleMainDoorLock = async () => {
  if (!mainDoorLock.value) {
    alert('Main door lock not found!')
    return
  }
  
  const sensor = mainDoorLock.value
  const action = sensor.value === 'locked' ? 'unlock' : 'lock'
  const confirmMessage = action === 'unlock' 
    ? `Are you sure you want to unlock the ${sensor.name}?`
    : `Are you sure you want to lock the ${sensor.name}?`
  
  if (!confirm(confirmMessage)) {
    return
  }
  
  isUnlockingDoor.value = true
  
  try {
    // Simulate API call to door control system
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Toggle the lock state
    sensor.value = sensor.value === 'locked' ? 'unlocked' : 'locked'
    sensor.lastUpdate = new Date().toISOString()
    
    // Show success notification
    alert(`${sensor.name} has been ${sensor.value}!`)
    
  } catch (error) {
    console.error('Door lock toggle failed:', error)
    alert(`Failed to ${action} ${sensor.name}. Please try again.`)
  } finally {
    isUnlockingDoor.value = false
  }
}

const formatTime = (timestamp: string) => {
  const date = new Date(timestamp)
  const now = new Date()
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000)
  
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`
  } else if (diffInMinutes < 1440) {
    return `${Math.floor(diffInMinutes / 60)}h ago`
  } else {
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }
}
</script>
