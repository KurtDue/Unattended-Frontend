<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-bold text-gray-900">Alerts</h2>
      <div class="flex items-center space-x-4">
        <select 
          v-model="selectedFilter"
          class="block w-40 rounded-md border-gray-300 text-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="all">All Alerts</option>
          <option value="pending">Pending Only</option>
          <option value="critical">Critical Only</option>
          <option value="warning">Warning Only</option>
          <option value="acknowledged">Acknowledged</option>
        </select>
        <button
          @click="acknowledgeAll"
          :disabled="pendingAlerts.length === 0"
          class="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Acknowledge All
        </button>
      </div>
    </div>

    <!-- Statistics -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-white rounded-lg shadow p-4">
        <div class="flex items-center">
          <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
            <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-500">Total</p>
            <p class="text-2xl font-semibold text-gray-900">{{ dataStore.alerts.length }}</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-lg shadow p-4">
        <div class="flex items-center">
          <div class="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
            <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-500">Critical</p>
            <p class="text-2xl font-semibold text-gray-900">{{ criticalAlerts.length }}</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-lg shadow p-4">
        <div class="flex items-center">
          <div class="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
            <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-500">Warning</p>
            <p class="text-2xl font-semibold text-gray-900">{{ warningAlerts.length }}</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-lg shadow p-4">
        <div class="flex items-center">
          <div class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-500">Pending</p>
            <p class="text-2xl font-semibold text-gray-900">{{ pendingAlerts.length }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Alerts List -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">
          {{ filteredAlerts.length }} {{ selectedFilter === 'all' ? 'Total' : selectedFilter.charAt(0).toUpperCase() + selectedFilter.slice(1) }} Alerts
        </h3>
      </div>
      
      <div class="divide-y divide-gray-200">
        <div 
          v-for="alert in filteredAlerts" 
          :key="alert.id"
          class="p-6 hover:bg-gray-50 transition-colors"
          :class="{ 'bg-gray-50': alert.acknowledged }"
        >
          <div class="flex items-start justify-between">
            <div class="flex items-start space-x-4">
              <!-- Alert Icon -->
              <div class="flex-shrink-0">
                <div 
                  class="w-8 h-8 rounded-full flex items-center justify-center"
                  :class="{
                    'bg-red-100': alert.type === 'critical',
                    'bg-yellow-100': alert.type === 'warning',
                    'bg-blue-100': alert.type === 'info'
                  }"
                >
                  <svg 
                    class="w-5 h-5"
                    :class="{
                      'text-red-600': alert.type === 'critical',
                      'text-yellow-600': alert.type === 'warning',
                      'text-blue-600': alert.type === 'info'
                    }"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      v-if="alert.type === 'critical'" 
                      stroke-linecap="round" 
                      stroke-linejoin="round" 
                      stroke-width="2" 
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
                    ></path>
                    <path 
                      v-else-if="alert.type === 'warning'" 
                      stroke-linecap="round" 
                      stroke-linejoin="round" 
                      stroke-width="2" 
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
                    ></path>
                    <path 
                      v-else 
                      stroke-linecap="round" 
                      stroke-linejoin="round" 
                      stroke-width="2" 
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
              </div>
              
              <!-- Alert Content -->
              <div class="flex-1 min-w-0">
                <div class="flex items-center space-x-2 mb-1">
                  <h4 class="text-lg font-medium text-gray-900">{{ alert.title }}</h4>
                  <span 
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                    :class="{
                      'bg-red-100 text-red-800': alert.type === 'critical',
                      'bg-yellow-100 text-yellow-800': alert.type === 'warning',
                      'bg-blue-100 text-blue-800': alert.type === 'info'
                    }"
                  >
                    {{ alert.type }}
                  </span>
                  <span 
                    v-if="alert.acknowledged"
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800"
                  >
                    Acknowledged
                  </span>
                </div>
                <p class="text-gray-600 mb-2">{{ alert.message }}</p>
                <div class="flex items-center text-sm text-gray-500 space-x-4">
                  <span>Source: {{ alert.source }}</span>
                  <span>{{ formatTime(alert.timestamp) }}</span>
                </div>
              </div>
            </div>
            
            <!-- Alert Actions -->
            <div class="flex-shrink-0 ml-4">
              <div class="flex items-center space-x-2">
                <button
                  v-if="!alert.acknowledged"
                  @click="acknowledgeAlert(alert.id)"
                  class="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors"
                >
                  Acknowledge
                </button>
                <button
                  @click="viewDetails(alert)"
                  class="px-3 py-1 text-sm font-medium text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div v-if="filteredAlerts.length === 0" class="p-12 text-center">
          <svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <p class="text-gray-500">No alerts found</p>
        </div>
      </div>
    </div>

    <!-- Alert Details Modal -->
    <div 
      v-if="selectedAlert" 
      class="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4"
      @click="closeDetails"
    >
      <div 
        class="bg-white rounded-lg max-w-2xl w-full p-6"
        @click.stop
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xl font-semibold text-gray-900">Alert Details</h3>
          <button @click="closeDetails" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Alert ID</label>
              <p class="text-sm text-gray-900">{{ selectedAlert.id }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <span 
                class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                :class="{
                  'bg-red-100 text-red-800': selectedAlert.type === 'critical',
                  'bg-yellow-100 text-yellow-800': selectedAlert.type === 'warning',
                  'bg-blue-100 text-blue-800': selectedAlert.type === 'info'
                }"
              >
                {{ selectedAlert.type }}
              </span>
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <p class="text-sm text-gray-900">{{ selectedAlert.title }}</p>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <p class="text-sm text-gray-900">{{ selectedAlert.message }}</p>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Source</label>
              <p class="text-sm text-gray-900">{{ selectedAlert.source }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Timestamp</label>
              <p class="text-sm text-gray-900">{{ new Date(selectedAlert.timestamp).toLocaleString() }}</p>
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <span 
              class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
              :class="selectedAlert.acknowledged ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'"
            >
              {{ selectedAlert.acknowledged ? 'Acknowledged' : 'Pending' }}
            </span>
          </div>
        </div>
        
        <div class="flex justify-end space-x-3 pt-6 mt-6 border-t border-gray-200">
          <button 
            @click="closeDetails"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Close
          </button>
          <button 
            v-if="!selectedAlert.acknowledged"
            @click="acknowledgeAlert(selectedAlert.id); closeDetails()"
            class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Acknowledge
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStoreDataStore } from '@/stores/data'
import type { Alert } from '@/types'

const dataStore = useStoreDataStore()
const selectedFilter = ref('all')
const selectedAlert = ref<Alert | null>(null)

const criticalAlerts = computed(() => 
  dataStore.alerts.filter(alert => alert.type === 'critical')
)

const warningAlerts = computed(() => 
  dataStore.alerts.filter(alert => alert.type === 'warning')
)

const pendingAlerts = computed(() => 
  dataStore.alerts.filter(alert => !alert.acknowledged)
)

const filteredAlerts = computed(() => {
  let alerts = dataStore.alerts
  
  switch (selectedFilter.value) {
    case 'pending':
      alerts = alerts.filter(alert => !alert.acknowledged)
      break
    case 'critical':
      alerts = alerts.filter(alert => alert.type === 'critical')
      break
    case 'warning':
      alerts = alerts.filter(alert => alert.type === 'warning')
      break
    case 'acknowledged':
      alerts = alerts.filter(alert => alert.acknowledged)
      break
  }
  
  // Sort by timestamp (newest first)
  return alerts.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
})

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

const acknowledgeAlert = (alertId: number) => {
  dataStore.acknowledgeAlert(alertId)
}

const acknowledgeAll = () => {
  pendingAlerts.value.forEach(alert => {
    dataStore.acknowledgeAlert(alert.id)
  })
}

const viewDetails = (alert: Alert) => {
  selectedAlert.value = alert
}

const closeDetails = () => {
  selectedAlert.value = null
}
</script>
