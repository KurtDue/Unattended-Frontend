<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-bold text-gray-900">Configuration</h2>
      <div class="flex items-center space-x-4">
        <button
          @click="saveAllSettings"
          :disabled="isSaving"
          class="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ isSaving ? 'Saving...' : 'Save All' }}
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <!-- Store Information -->
      <div class="xl:col-span-2 space-y-6">
        <div class="bg-white rounded-lg shadow">
          <div class="p-6 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">Store Information</h3>
          </div>
          <div class="p-6 space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
                <input 
                  v-model="storeSettings.name"
                  type="text" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
                <input 
                  v-model="storeSettings.displayName"
                  type="text" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
              </div>
            </div>
            
            <!-- Address Information -->
            <div class="space-y-4">
              <h4 class="text-sm font-medium text-gray-900 border-t pt-4">Address Information</h4>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                <input 
                  v-model="storeSettings.address"
                  type="text" 
                  placeholder="e.g., Storgata 15"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                  <input 
                    v-model="storeSettings.postalCode"
                    type="text" 
                    placeholder="e.g., 0104"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input 
                    v-model="storeSettings.city"
                    type="text" 
                    placeholder="e.g., Oslo"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Country</label>
                <select 
                  v-model="storeSettings.country"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Norway">Norway</option>
                  <option value="Sweden">Sweden</option>
                  <option value="Denmark">Denmark</option>
                  <option value="Finland">Finland</option>
                </select>
              </div>
              <div class="flex items-center space-x-2">
                <button 
                  @click="lookupCoordinates"
                  :disabled="isLookingUp || !canLookupCoordinates"
                  class="flex items-center px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  {{ isLookingUp ? 'Looking up...' : 'Get Coordinates' }}
                </button>
                <span class="text-sm text-gray-500" v-if="coordinatesStatus">{{ coordinatesStatus }}</span>
              </div>
            </div>
            
            <!-- Location Coordinates -->
            <div class="space-y-4">
              <h4 class="text-sm font-medium text-gray-900 border-t pt-4">Location Coordinates</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
                  <input 
                    v-model="storeSettings.coordinates.latitude"
                    type="number" 
                    step="0.000001"
                    placeholder="e.g., 59.913869"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
                  <input 
                    v-model="storeSettings.coordinates.longitude"
                    type="number" 
                    step="0.000001"
                    placeholder="e.g., 10.752245"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                </div>
              </div>
              <div v-if="storeSettings.coordinates.latitude && storeSettings.coordinates.longitude" class="text-sm text-gray-600">
                <p>📍 Location: {{ storeSettings.coordinates.latitude }}, {{ storeSettings.coordinates.longitude }}</p>
                <p class="mt-1">This location will be used for customer applications and services.</p>
              </div>
            </div>
            
            <!-- Operating Hours -->
            <div class="space-y-4">
              <h4 class="text-sm font-medium text-gray-900 border-t pt-4">Operating Hours</h4>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs text-gray-500 mb-1">Open Time</label>
                  <input 
                    v-model="storeSettings.openTime"
                    type="time" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                </div>
                <div>
                  <label class="block text-xs text-gray-500 mb-1">Close Time</label>
                  <input 
                    v-model="storeSettings.closeTime"
                    type="time" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Alert Settings -->
        <div class="bg-white rounded-lg shadow">
          <div class="p-6 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">Alert Settings</h3>
          </div>
          <div class="p-6 space-y-4">
            <div>
              <label class="flex items-center">
                <input 
                  v-model="alertSettings.emailNotifications"
                  type="checkbox" 
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                >
                <span class="ml-2 text-sm text-gray-900">Enable email notifications</span>
              </label>
            </div>
            <div>
              <label class="flex items-center">
                <input 
                  v-model="alertSettings.smsNotifications"
                  type="checkbox" 
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                >
                <span class="ml-2 text-sm text-gray-900">Enable SMS notifications</span>
              </label>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Notification Email</label>
              <input 
                v-model="alertSettings.notificationEmail"
                type="email" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Door Open Alert Threshold (seconds)</label>
              <input 
                v-model="alertSettings.doorOpenThreshold"
                type="number" 
                min="5"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
            </div>
          </div>
        </div>

        <!-- Temperature Settings -->
        <div class="bg-white rounded-lg shadow">
          <div class="p-6 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">Temperature Monitoring</h3>
          </div>
          <div class="p-6 space-y-6">
            <div class="space-y-4">
              <h4 class="text-sm font-medium text-gray-900">Fridge Temperature</h4>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs text-gray-500 mb-1">Min Temperature (°C)</label>
                  <input 
                    v-model="temperatureSettings.fridge.min"
                    type="number" 
                    step="0.1"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                </div>
                <div>
                  <label class="block text-xs text-gray-500 mb-1">Max Temperature (°C)</label>
                  <input 
                    v-model="temperatureSettings.fridge.max"
                    type="number" 
                    step="0.1"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs text-gray-500 mb-1">Warning Threshold (°C)</label>
                  <input 
                    v-model="temperatureSettings.fridge.warning"
                    type="number" 
                    step="0.1"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                </div>
                <div>
                  <label class="block text-xs text-gray-500 mb-1">Critical Threshold (°C)</label>
                  <input 
                    v-model="temperatureSettings.fridge.critical"
                    type="number" 
                    step="0.1"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                </div>
              </div>
            </div>

            <div class="space-y-4">
              <h4 class="text-sm font-medium text-gray-900">Freezer Temperature</h4>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs text-gray-500 mb-1">Min Temperature (°C)</label>
                  <input 
                    v-model="temperatureSettings.freezer.min"
                    type="number" 
                    step="0.1"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                </div>
                <div>
                  <label class="block text-xs text-gray-500 mb-1">Max Temperature (°C)</label>
                  <input 
                    v-model="temperatureSettings.freezer.max"
                    type="number" 
                    step="0.1"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                </div>
              </div>
            </div>

            <div class="space-y-4">
              <h4 class="text-sm font-medium text-gray-900">Room Temperature</h4>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs text-gray-500 mb-1">Min Temperature (°C)</label>
                  <input 
                    v-model="temperatureSettings.room.min"
                    type="number" 
                    step="0.1"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                </div>
                <div>
                  <label class="block text-xs text-gray-500 mb-1">Max Temperature (°C)</label>
                  <input 
                    v-model="temperatureSettings.room.max"
                    type="number" 
                    step="0.1"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- System Status & Quick Actions -->
      <div class="space-y-6">
        <!-- System Status -->
        <div class="bg-white rounded-lg shadow">
          <div class="p-6 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">System Status</h3>
          </div>
          <div class="p-6 space-y-4">
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600">API Connection</span>
              <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                Connected
              </span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600">Database</span>
              <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                Online
              </span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600">Last Backup</span>
              <span class="text-xs text-gray-500">2 hours ago</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600">System Version</span>
              <span class="text-xs text-gray-500">v1.2.3</span>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="bg-white rounded-lg shadow">
          <div class="p-6 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">Quick Actions</h3>
          </div>
          <div class="p-6 space-y-3">
            <button 
              @click="testAllSensors"
              :disabled="isTesting"
              class="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
              </svg>
              {{ isTesting ? 'Testing...' : 'Test All Sensors' }}
            </button>
            
            <button 
              @click="backupData"
              :disabled="isBackingUp"
              class="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path>
              </svg>
              {{ isBackingUp ? 'Backing up...' : 'Backup Data' }}
            </button>
            
            <button 
              @click="clearLogs"
              :disabled="isClearingLogs"
              class="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-red-700 bg-red-100 rounded-md hover:bg-red-200 disabled:opacity-50"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
              {{ isClearingLogs ? 'Clearing...' : 'Clear Logs' }}
            </button>
          </div>
        </div>

        <!-- API Settings -->
        <div class="bg-white rounded-lg shadow">
          <div class="p-6 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">API Configuration</h3>
          </div>
          <div class="p-6 space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">API Base URL</label>
              <input 
                v-model="apiSettings.baseUrl"
                type="url" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Request Timeout (ms)</label>
              <input 
                v-model="apiSettings.timeout"
                type="number" 
                min="1000"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
            </div>
            <div>
              <label class="flex items-center">
                <input 
                  v-model="apiSettings.enableLogging"
                  type="checkbox" 
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                >
                <span class="ml-2 text-sm text-gray-900">Enable API request logging</span>
              </label>
            </div>
            <button 
              @click="testConnection"
              :disabled="isTesting"
              class="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"></path>
              </svg>
              {{ isTesting ? 'Testing...' : 'Test Connection' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const isSaving = ref(false)
const isTesting = ref(false)
const isBackingUp = ref(false)
const isClearingLogs = ref(false)
const isLookingUp = ref(false)
const coordinatesStatus = ref('')

// Settings data
const storeSettings = ref({
  name: '',
  displayName: '',
  location: '',
  address: '',
  postalCode: '',
  city: '',
  country: 'Norway',
  coordinates: {
    latitude: null as number | null,
    longitude: null as number | null,
  },
  openTime: '06:00',
  closeTime: '22:00',
})

// Computed property to check if we can lookup coordinates
const canLookupCoordinates = computed(() => {
  return storeSettings.value.address && 
         storeSettings.value.city && 
         storeSettings.value.country
})

// Function to lookup coordinates from address
const lookupCoordinates = async () => {
  if (!canLookupCoordinates.value) {
    alert('Please fill in address, city, and country first.')
    return
  }
  
  isLookingUp.value = true
  coordinatesStatus.value = 'Looking up coordinates...'
  
  try {
    const fullAddress = `${storeSettings.value.address}, ${storeSettings.value.postalCode} ${storeSettings.value.city}, ${storeSettings.value.country}`
    
    // Using Nominatim OpenStreetMap API for geocoding (free and no API key required)
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullAddress)}&limit=1`)
    
    if (!response.ok) {
      throw new Error('Geocoding service unavailable')
    }
    
    const data = await response.json()
    
    if (data && data.length > 0) {
      const location = data[0]
      storeSettings.value.coordinates.latitude = parseFloat(location.lat)
      storeSettings.value.coordinates.longitude = parseFloat(location.lon)
      coordinatesStatus.value = `✅ Coordinates found: ${location.display_name}`
      
      // Update the location field with the full address
      storeSettings.value.location = location.display_name
    } else {
      coordinatesStatus.value = '❌ Address not found. Please check your address details.'
    }
  } catch (error) {
    console.error('Geocoding error:', error)
    coordinatesStatus.value = '❌ Failed to lookup coordinates. Please try again later.'
  } finally {
    isLookingUp.value = false
    // Clear status message after 5 seconds
    setTimeout(() => {
      coordinatesStatus.value = ''
    }, 5000)
  }
}

const alertSettings = ref({
  emailNotifications: true,
  smsNotifications: false,
  notificationEmail: '',
  doorOpenThreshold: 30,
})

const temperatureSettings = ref({
  fridge: {
    min: 0,
    max: 4,
    warning: 3.5,
    critical: 5,
  },
  freezer: {
    min: -25,
    max: -15,
    warning: -12,
    critical: -10,
  },
  room: {
    min: 18,
    max: 25,
    warning: 26,
    critical: 28,
  },
})

const apiSettings = ref({
  baseUrl: 'https://localhost:7000/api',
  timeout: 10000,
  enableLogging: false,
})

onMounted(() => {
  loadSettings()
})

const loadSettings = () => {
  if (authStore.selectedStore) {
    storeSettings.value.name = authStore.selectedStore.name
    storeSettings.value.displayName = authStore.selectedStore.displayName
    storeSettings.value.location = authStore.selectedStore.location || ''
  }
  
  // Load other settings from localStorage or API
  const savedAlertSettings = localStorage.getItem('alertSettings')
  if (savedAlertSettings) {
    alertSettings.value = { ...alertSettings.value, ...JSON.parse(savedAlertSettings) }
  }
  
  const savedTempSettings = localStorage.getItem('temperatureSettings')
  if (savedTempSettings) {
    temperatureSettings.value = { ...temperatureSettings.value, ...JSON.parse(savedTempSettings) }
  }
  
  const savedApiSettings = localStorage.getItem('apiSettings')
  if (savedApiSettings) {
    apiSettings.value = { ...apiSettings.value, ...JSON.parse(savedApiSettings) }
  }
}

const saveAllSettings = async () => {
  isSaving.value = true
  
  try {
    // Save to localStorage (in real app, would save to API)
    localStorage.setItem('storeSettings', JSON.stringify(storeSettings.value))
    localStorage.setItem('alertSettings', JSON.stringify(alertSettings.value))
    localStorage.setItem('temperatureSettings', JSON.stringify(temperatureSettings.value))
    localStorage.setItem('apiSettings', JSON.stringify(apiSettings.value))
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    alert('Settings saved successfully!')
  } catch (error) {
    alert('Error saving settings. Please try again.')
  } finally {
    isSaving.value = false
  }
}

const testAllSensors = async () => {
  isTesting.value = true
  
  try {
    // Simulate sensor testing
    await new Promise(resolve => setTimeout(resolve, 2000))
    alert('All sensors tested successfully!')
  } catch (error) {
    alert('Some sensors failed the test. Please check the sensor status.')
  } finally {
    isTesting.value = false
  }
}

const testConnection = async () => {
  isTesting.value = true
  
  try {
    // Simulate API connection test
    await new Promise(resolve => setTimeout(resolve, 1500))
    alert('API connection successful!')
  } catch (error) {
    alert('API connection failed. Please check your settings.')
  } finally {
    isTesting.value = false
  }
}

const backupData = async () => {
  isBackingUp.value = true
  
  try {
    // Simulate backup process
    await new Promise(resolve => setTimeout(resolve, 3000))
    alert('Data backup completed successfully!')
  } catch (error) {
    alert('Backup failed. Please try again.')
  } finally {
    isBackingUp.value = false
  }
}

const clearLogs = async () => {
  if (confirm('Are you sure you want to clear all system logs? This action cannot be undone.')) {
    isClearingLogs.value = true
    
    try {
      // Simulate log clearing
      await new Promise(resolve => setTimeout(resolve, 1000))
      alert('System logs cleared successfully!')
    } catch (error) {
      alert('Failed to clear logs. Please try again.')
    } finally {
      isClearingLogs.value = false
    }
  }
}
</script>
