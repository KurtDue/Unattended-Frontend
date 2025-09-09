<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-bold text-gray-900">Sensors</h2>
      <div class="flex items-center space-x-4">
        <div class="flex items-center space-x-2">
          <div class="w-3 h-3 bg-green-400 rounded-full"></div>
          <span class="text-sm text-gray-600">{{ activeSensorsCount }} Active</span>
        </div>
        <div class="flex items-center space-x-2">
          <div class="w-3 h-3 bg-red-400 rounded-full"></div>
          <span class="text-sm text-gray-600">{{ errorSensorsCount }} Error</span>
        </div>
      </div>
    </div>

    <!-- Sensors Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="sensor in dataStore.sensors" 
        :key="sensor.id"
        class="bg-white rounded-lg shadow overflow-hidden"
      >
        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center">
              <div 
                class="w-3 h-3 rounded-full mr-3"
                :class="{
                  'bg-green-400': sensor.status === 'active',
                  'bg-yellow-400': sensor.status === 'inactive',
                  'bg-red-400': sensor.status === 'error'
                }"
              ></div>
              <h3 class="font-medium text-gray-900">{{ sensor.name }}</h3>
            </div>
            <div class="text-right">
              <span 
                class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                :class="{
                  'bg-green-100 text-green-800': sensor.status === 'active',
                  'bg-yellow-100 text-yellow-800': sensor.status === 'inactive',
                  'bg-red-100 text-red-800': sensor.status === 'error'
                }"
              >
                {{ sensor.status }}
              </span>
            </div>
          </div>

          <div class="mb-4">
            <p class="text-sm text-gray-600 mb-1">{{ sensor.location }}</p>
            <p class="text-sm text-gray-500 capitalize">{{ sensor.type.replace('_', ' ') }}</p>
          </div>

          <!-- Sensor Value -->
          <div class="mb-4">
            <div class="flex items-baseline">
              <span class="text-2xl font-bold text-gray-900">
                {{ typeof sensor.value === 'number' ? sensor.value.toFixed(1) : sensor.value }}
              </span>
              <span v-if="sensor.unit" class="text-sm text-gray-500 ml-1">{{ sensor.unit }}</span>
            </div>
            
            <!-- Temperature sensors with threshold indicators -->
            <div v-if="sensor.type === 'temperature' && sensor.thresholds" class="mt-2">
              <div class="flex items-center text-xs text-gray-500 space-x-4">
                <span>Min: {{ sensor.thresholds.min }}{{ sensor.unit }}</span>
                <span>Max: {{ sensor.thresholds.max }}{{ sensor.unit }}</span>
              </div>
              
              <!-- Temperature status bar -->
              <div class="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  class="h-full transition-all duration-300"
                  :class="{
                    'bg-blue-400': typeof sensor.value === 'number' && sensor.value < (sensor.thresholds.min || 0),
                    'bg-green-400': typeof sensor.value === 'number' && sensor.value >= (sensor.thresholds.min || 0) && sensor.value <= (sensor.thresholds.max || 100),
                    'bg-yellow-400': typeof sensor.value === 'number' && sensor.value > (sensor.thresholds.max || 100) && sensor.value <= (sensor.thresholds.warningThreshold || 100),
                    'bg-red-400': typeof sensor.value === 'number' && sensor.value > (sensor.thresholds.warningThreshold || 100)
                  }"
                  :style="{
                    width: typeof sensor.value === 'number' 
                      ? Math.min(100, Math.max(0, ((sensor.value - (sensor.thresholds.min || 0)) / ((sensor.thresholds.criticalThreshold || 100) - (sensor.thresholds.min || 0))) * 100)) + '%'
                      : '0%'
                  }"
                ></div>
              </div>
              
              <div v-if="typeof sensor.value === 'number' && sensor.thresholds.warningThreshold && sensor.value > sensor.thresholds.warningThreshold" class="mt-2 flex items-center text-xs text-yellow-600">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
                Above warning threshold
              </div>
            </div>
          </div>

          <!-- Door/Lock sensors -->
          <div v-if="sensor.type === 'door_lock' || sensor.type === 'door_sensor'" class="mb-4">
            <div 
              class="flex items-center justify-center w-full py-3 rounded-md text-sm font-medium mb-3"
              :class="{
                'bg-green-100 text-green-800': sensor.value === 'locked' || sensor.value === 'closed',
                'bg-red-100 text-red-800': sensor.value === 'unlocked' || sensor.value === 'open'
              }"
            >
              <svg v-if="sensor.value === 'locked' || sensor.value === 'closed'" class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
              <svg v-else class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"></path>
              </svg>
              {{ sensor.value }}
            </div>
            
            <!-- Unlock/Lock Button for door locks -->
            <div v-if="sensor.type === 'door_lock'" class="flex justify-center">
              <button 
                @click="toggleDoorLock(sensor)"
                :disabled="isUnlocking || isLoading"
                class="flex items-center px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                :class="{
                  'text-white bg-red-600 hover:bg-red-700 focus:ring-red-500': sensor.value === 'locked',
                  'text-white bg-green-600 hover:bg-green-700 focus:ring-green-500': sensor.value === 'unlocked'
                }"
              >
                <svg v-if="isUnlocking && unlockingSensorId === sensor.id" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <svg v-else-if="sensor.value === 'locked'" class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"></path>
                </svg>
                <svg v-else class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
                {{ isUnlocking && unlockingSensorId === sensor.id 
                  ? 'Processing...' 
                  : sensor.value === 'locked' 
                    ? 'Unlock Door' 
                    : 'Lock Door' 
                }}
              </button>
            </div>
          </div>

          <div class="flex items-center justify-between text-xs text-gray-500">
            <span>Last update:</span>
            <span>{{ formatTime(sensor.lastUpdate) }}</span>
          </div>
        </div>

        <!-- Sensor Actions -->
        <div class="bg-gray-50 px-6 py-3 border-t">
          <div class="flex items-center justify-between">
            <button
              @click="refreshSensor(sensor)"
              :disabled="isLoading"
              class="text-xs text-blue-600 hover:text-blue-500 font-medium"
            >
              Refresh
            </button>
            <button
              @click="configureSensor(sensor)"
              class="text-xs text-gray-600 hover:text-gray-500 font-medium"
            >
              Configure
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Configuration Modal -->
    <div 
      v-if="selectedSensor" 
      class="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4"
      @click="closeConfiguration"
    >
      <div 
        class="bg-white rounded-lg max-w-md w-full p-6"
        @click.stop
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">Configure {{ selectedSensor.name }}</h3>
          <button @click="closeConfiguration" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Sensor Name</label>
            <input 
              v-model="selectedSensor.name"
              type="text" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input 
              v-model="selectedSensor.location"
              type="text" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
          </div>
          
          <div v-if="selectedSensor.thresholds">
            <label class="block text-sm font-medium text-gray-700 mb-1">Warning Threshold</label>
            <div class="flex items-center space-x-2">
              <input 
                v-model="selectedSensor.thresholds.warningThreshold"
                type="number" 
                step="0.1"
                class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
              <span class="text-sm text-gray-500">{{ selectedSensor.unit }}</span>
            </div>
          </div>
          
          <div class="flex justify-end space-x-3 pt-4">
            <button 
              @click="closeConfiguration"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button 
              @click="saveConfiguration"
              class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStoreDataStore } from '@/stores/data'
import type { Sensor } from '@/types'

const dataStore = useStoreDataStore()
const isLoading = ref(false)
const isUnlocking = ref(false)
const unlockingSensorId = ref<number | null>(null)
const selectedSensor = ref<Sensor | null>(null)

const activeSensorsCount = computed(() => 
  dataStore.sensors.filter(sensor => sensor.status === 'active').length
)

const errorSensorsCount = computed(() => 
  dataStore.sensors.filter(sensor => sensor.status === 'error').length
)

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

const refreshSensor = async (sensor: Sensor) => {
  isLoading.value = true
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // Update last update time
  sensor.lastUpdate = new Date().toISOString()
  
  // Simulate value update for temperature sensors
  if (sensor.type === 'temperature' && typeof sensor.value === 'number') {
    sensor.value = Number((sensor.value + (Math.random() - 0.5) * 2).toFixed(1))
  }
  
  isLoading.value = false
}

const toggleDoorLock = async (sensor: Sensor) => {
  if (sensor.type !== 'door_lock') return
  
  const action = sensor.value === 'locked' ? 'unlock' : 'lock'
  const confirmMessage = action === 'unlock' 
    ? `Are you sure you want to unlock ${sensor.name}?`
    : `Are you sure you want to lock ${sensor.name}?`
  
  if (!confirm(confirmMessage)) {
    return
  }
  
  isUnlocking.value = true
  unlockingSensorId.value = sensor.id
  
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
    isUnlocking.value = false
    unlockingSensorId.value = null
  }
}

const configureSensor = (sensor: Sensor) => {
  selectedSensor.value = { ...sensor }
}

const closeConfiguration = () => {
  selectedSensor.value = null
}

const saveConfiguration = () => {
  if (selectedSensor.value) {
    // Find and update the sensor
    const index = dataStore.sensors.findIndex(s => s.id === selectedSensor.value!.id)
    if (index !== -1) {
      dataStore.sensors[index] = { ...selectedSensor.value }
    }
  }
  selectedSensor.value = null
}
</script>
