<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-bold text-gray-900">Access Control</h2>
      <div class="flex items-center space-x-4">
        <div class="flex items-center space-x-2">
          <div 
            class="w-3 h-3 rounded-full"
            :class="{
              'bg-green-400': !isLockdownActive,
              'bg-red-400': isLockdownActive
            }"
          ></div>
          <span class="text-sm text-gray-600">
            {{ isLockdownActive ? 'Lockdown Active' : 'Normal Operation' }}
          </span>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <!-- Door Control Panel -->
      <div class="xl:col-span-2 space-y-6">
        <!-- Main Door Control -->
        <div class="bg-white rounded-lg shadow">
          <div class="p-6 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-medium text-gray-900">Main Door Control</h3>
              <div class="flex items-center space-x-3">
                <div class="flex items-center space-x-2">
                  <div 
                    class="w-3 h-3 rounded-full"
                    :class="{
                      'bg-green-400': doorStatus === 'locked',
                      'bg-orange-400 animate-pulse': doorStatus === 'unlocked',
                      'bg-red-400': doorStatus === 'error'
                    }"
                  ></div>
                  <span class="text-sm font-medium capitalize">{{ doorStatus }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Door Status -->
              <div class="space-y-4">
                <div class="text-center p-6 bg-gray-50 rounded-lg">
                  <div class="w-16 h-16 mx-auto mb-4">
                    <svg 
                      class="w-full h-full transition-colors duration-300"
                      :class="{
                        'text-green-600': doorStatus === 'locked',
                        'text-orange-500': doorStatus === 'unlocked',
                        'text-red-500': doorStatus === 'error'
                      }"
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        v-if="doorStatus === 'locked'"
                        stroke-linecap="round" 
                        stroke-linejoin="round" 
                        stroke-width="2" 
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                      <path 
                        v-else-if="doorStatus === 'unlocked'"
                        stroke-linecap="round" 
                        stroke-linejoin="round" 
                        stroke-width="2" 
                        d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                      />
                      <path 
                        v-else
                        stroke-linecap="round" 
                        stroke-linejoin="round" 
                        stroke-width="2" 
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
                      />
                    </svg>
                  </div>
                  <h4 class="text-lg font-medium text-gray-900 mb-2">Door Status</h4>
                  <p class="text-sm text-gray-600 capitalize">{{ doorStatus }}</p>
                  <div v-if="unlockTimeRemaining > 0" class="mt-2">
                    <p class="text-sm text-orange-600 font-medium">
                      Auto-lock in: {{ unlockTimeRemaining }}s
                    </p>
                    <div class="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        class="bg-orange-500 h-2 rounded-full transition-all duration-1000"
                        :style="{ width: `${(unlockTimeRemaining / 15) * 100}%` }"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Door Controls -->
              <div class="space-y-4">
                <button
                  @click="unlockDoor"
                  :disabled="isUnlocking || doorStatus === 'unlocked' || isLockdownActive"
                  class="w-full flex items-center justify-center px-6 py-4 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <svg v-if="!isUnlocking" class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"></path>
                  </svg>
                  <svg v-else class="w-6 h-6 mr-3 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {{ isUnlocking ? 'Unlocking...' : 'Unlock Door (15s)' }}
                </button>

                <button
                  @click="lockDoor"
                  :disabled="isLocking || doorStatus === 'locked'"
                  class="w-full flex items-center justify-center px-6 py-4 text-lg font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <svg v-if="!isLocking" class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                  <svg v-else class="w-6 h-6 mr-3 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {{ isLocking ? 'Locking...' : 'Lock Door' }}
                </button>

                <div class="pt-4 border-t border-gray-200">
                  <p class="text-xs text-gray-500 mb-2">Emergency Override</p>
                  <button
                    @click="emergencyUnlock"
                    :disabled="isEmergencyUnlocking"
                    class="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                    </svg>
                    Emergency Unlock
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Access Methods Status -->
        <div class="bg-white rounded-lg shadow">
          <div class="p-6 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">Access Methods</h3>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div v-for="method in accessMethods" :key="method.id" class="text-center p-4 rounded-lg border-2 transition-all" :class="getMethodStatusClass(method)">
                <component :is="method.icon" class="w-8 h-8 mx-auto mb-2" :class="getMethodIconClass(method)" />
                <p class="text-sm font-medium text-gray-900">{{ method.name }}</p>
                <p class="text-xs" :class="getMethodTextClass(method)">
                  {{ getMethodStatusText(method) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Control Panel -->
      <div class="space-y-6">
        <!-- Lockdown Control -->
        <div class="bg-white rounded-lg shadow">
          <div class="p-6 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">Security Control</h3>
          </div>
          <div class="p-6 space-y-4">
            <div class="flex items-center justify-between p-4 rounded-lg" :class="isLockdownActive ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'">
              <div>
                <p class="font-medium" :class="isLockdownActive ? 'text-red-800' : 'text-green-800'">
                  {{ isLockdownActive ? 'Lockdown Active' : 'Normal Operation' }}
                </p>
                <p class="text-sm" :class="isLockdownActive ? 'text-red-600' : 'text-green-600'">
                  {{ isLockdownActive ? 'Customer app access disabled' : 'All access methods enabled' }}
                </p>
              </div>
              <button
                @click="toggleLockdown"
                :disabled="isToggleLockdown"
                class="flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                :class="isLockdownActive ? 'text-green-700 bg-green-100 hover:bg-green-200' : 'text-red-700 bg-red-100 hover:bg-red-200'"
              >
                <svg v-if="!isToggleLockdown" class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path v-if="isLockdownActive" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"></path>
                  <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
                <svg v-else class="w-4 h-4 mr-1 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ isToggleLockdown ? 'Switching...' : (isLockdownActive ? 'Disable' : 'Enable') }}
              </button>
            </div>

            <div class="text-xs text-gray-500 p-3 bg-gray-50 rounded-md">
              <p class="font-medium mb-1">Lockdown Mode:</p>
              <ul class="space-y-1">
                <li>• Disables customer app access only</li>
                <li>• Receipt scan remains active</li>
                <li>• NFC chip access remains active</li>
                <li>• Merchant app remains active</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Quick Stats -->
        <div class="bg-white rounded-lg shadow">
          <div class="p-6 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">Today's Activity</h3>
          </div>
          <div class="p-6 space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600">Total Entries</span>
              <span class="text-lg font-bold text-gray-900">{{ todayStats.total }}</span>
            </div>
            <div class="space-y-2">
              <div v-for="method in accessMethods" :key="method.id" class="flex justify-between text-sm">
                <span class="text-gray-600">{{ method.name }}</span>
                <span class="font-medium">{{ todayStats[method.id] || 0 }}</span>
              </div>
            </div>
            <div class="pt-2 border-t border-gray-200 flex justify-between items-center">
              <span class="text-sm text-gray-600">Failed Attempts</span>
              <span class="text-red-600 font-medium">{{ todayStats.failed }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Access Log -->
    <div class="bg-white rounded-lg shadow">
      <div class="p-6 border-b border-gray-200">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-medium text-gray-900">Access Log</h3>
          <div class="flex items-center space-x-3">
            <span class="text-sm text-gray-500">Showing {{ displayedEntries }} of {{ accessLog.length }} entries</span>
            <button
              v-if="!showAllEntries && accessLog.length > 20"
              @click="showAllEntries = true"
              class="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Show All
            </button>
            <button
              v-if="showAllEntries"
              @click="showAllEntries = false"
              class="text-sm text-gray-600 hover:text-gray-800 font-medium"
            >
              Show Recent
            </button>
          </div>
        </div>
      </div>
      <div class="overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User/ID</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="entry in visibleLogEntries" :key="entry.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ formatTime(entry.timestamp) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <component :is="getMethodIcon(entry.method)" class="w-5 h-5 mr-2 text-gray-400" />
                    <span class="text-sm font-medium text-gray-900">{{ entry.method }}</span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ entry.userId }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full" :class="{
                    'bg-green-100 text-green-800': entry.status === 'Success',
                    'bg-red-100 text-red-800': entry.status === 'Failed',
                    'bg-yellow-100 text-yellow-800': entry.status === 'Denied'
                  }">
                    {{ entry.status }}
                  </span>
                </td>
                <td class="px-6 py-4 text-sm text-gray-500">
                  {{ entry.details }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Door status management
const doorStatus = ref<'locked' | 'unlocked' | 'error'>('locked')
const isUnlocking = ref(false)
const isLocking = ref(false)
const isEmergencyUnlocking = ref(false)
const unlockTimeRemaining = ref(0)

// Lockdown management
const isLockdownActive = ref(false)
const isToggleLockdown = ref(false)

// Log management
const showAllEntries = ref(false)

// Timers
let unlockTimer: number | null = null
let countdownTimer: number | null = null

// Access methods configuration
const accessMethods = ref([
  {
    id: 'merchant',
    name: 'Merchant App',
    enabled: true,
    icon: {
      template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>`
    }
  },
  {
    id: 'customer',
    name: 'Customer App',
    enabled: true,
    icon: {
      template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>`
    }
  },
  {
    id: 'receipt',
    name: 'Receipt Scan',
    enabled: true,
    icon: {
      template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5l-8-8-8 8h16zM3 5h18v14H3V5z"/></svg>`
    }
  },
  {
    id: 'nfc',
    name: 'NFC Chip',
    enabled: true,
    icon: {
      template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"/></svg>`
    }
  }
])

// Today's statistics
const todayStats = ref({
  total: 47,
  merchant: 8,
  customer: 23,
  receipt: 12,
  nfc: 4,
  failed: 3
})

// Access log entries
const accessLog = ref([
  {
    id: 1,
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    method: 'Customer App',
    userId: 'customer_12345',
    status: 'Success',
    details: 'Valid purchase token'
  },
  {
    id: 2,
    timestamp: new Date(Date.now() - 12 * 60 * 1000),
    method: 'Merchant App',
    userId: 'admin',
    status: 'Success',
    details: 'Manual unlock'
  },
  {
    id: 3,
    timestamp: new Date(Date.now() - 18 * 60 * 1000),
    method: 'Receipt Scan',
    userId: 'receipt_789',
    status: 'Success',
    details: 'QR code validated'
  },
  {
    id: 4,
    timestamp: new Date(Date.now() - 25 * 60 * 1000),
    method: 'NFC Chip',
    userId: 'nfc_456',
    status: 'Failed',
    details: 'Invalid chip data'
  },
  {
    id: 5,
    timestamp: new Date(Date.now() - 35 * 60 * 1000),
    method: 'Customer App',
    userId: 'customer_67890',
    status: 'Success',
    details: 'Valid purchase token'
  },
  {
    id: 6,
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
    method: 'Customer App',
    userId: 'customer_11111',
    status: 'Denied',
    details: 'Customer app lockdown active'
  },
  {
    id: 7,
    timestamp: new Date(Date.now() - 55 * 60 * 1000),
    method: 'Merchant App',
    userId: 'admin',
    status: 'Success',
    details: 'Emergency unlock'
  },
  {
    id: 8,
    timestamp: new Date(Date.now() - 65 * 60 * 1000),
    method: 'Receipt Scan',
    userId: 'receipt_321',
    status: 'Success',
    details: 'QR code validated'
  },
  // Add more entries for testing
  ...Array.from({ length: 25 }, (_, i) => ({
    id: i + 9,
    timestamp: new Date(Date.now() - (75 + i * 15) * 60 * 1000),
    method: ['Customer App', 'Merchant App', 'Receipt Scan', 'NFC Chip'][i % 4],
    userId: `user_${1000 + i}`,
    status: ['Success', 'Failed', 'Denied'][i % 3] as 'Success' | 'Failed' | 'Denied',
    details: ['Valid access', 'Authentication failed', 'Access denied'][i % 3]
  }))
])

// Computed properties
const displayedEntries = computed(() => {
  return showAllEntries.value ? accessLog.value.length : Math.min(20, accessLog.value.length)
})

const visibleLogEntries = computed(() => {
  return showAllEntries.value ? accessLog.value : accessLog.value.slice(0, 20)
})

// Methods
const unlockDoor = async () => {
  if (isLockdownActive.value) {
    alert('Cannot unlock door during lockdown mode')
    return
  }

  if (!confirm('Unlock the main door for 15 seconds?')) {
    return
  }

  isUnlocking.value = true
  
  try {
    // Simulate API call to unlock door
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    doorStatus.value = 'unlocked'
    unlockTimeRemaining.value = 15
    
    // Add log entry
    addLogEntry('Merchant App', 'admin', 'Success', 'Manual unlock (15s)')
    
    // Start countdown timer
    startUnlockCountdown()
    
    // Auto-lock after 15 seconds
    unlockTimer = setTimeout(() => {
      lockDoor()
    }, 15000)
    
  } catch (error) {
    doorStatus.value = 'error'
    alert('Failed to unlock door. Please try again.')
  } finally {
    isUnlocking.value = false
  }
}

const getMethodStatusClass = (method: any) => {
  const isMethodActive = method.enabled && !(isLockdownActive.value && method.id === 'customer')
  return isMethodActive ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
}

const getMethodIconClass = (method: any) => {
  const isMethodActive = method.enabled && !(isLockdownActive.value && method.id === 'customer')
  return isMethodActive ? 'text-green-600' : 'text-red-400'
}

const getMethodTextClass = (method: any) => {
  const isMethodActive = method.enabled && !(isLockdownActive.value && method.id === 'customer')
  return isMethodActive ? 'text-green-600' : 'text-red-500'
}

const getMethodStatusText = (method: any) => {
  if (!method.enabled) return 'Disabled'
  if (isLockdownActive.value && method.id === 'customer') return 'Lockdown'
  return 'Active'
}

const lockDoor = async () => {
  isLocking.value = true
  
  try {
    // Clear any existing timers
    if (unlockTimer) {
      clearTimeout(unlockTimer)
      unlockTimer = null
    }
    if (countdownTimer) {
      clearInterval(countdownTimer)
      countdownTimer = null
    }
    
    // Simulate API call to lock door
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    doorStatus.value = 'locked'
    unlockTimeRemaining.value = 0
    
    console.log('Door locked successfully')
    
  } catch (error) {
    doorStatus.value = 'error'
    alert('Failed to lock door. Please check the connection.')
  } finally {
    isLocking.value = false
  }
}

const emergencyUnlock = async () => {
  if (!confirm('EMERGENCY UNLOCK: This will unlock the door immediately and override all security measures. Continue?')) {
    return
  }

  isEmergencyUnlocking.value = true
  
  try {
    // Simulate emergency unlock API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    doorStatus.value = 'unlocked'
    unlockTimeRemaining.value = 0 // Emergency unlock has no time limit
    
    // Add log entry
    addLogEntry('Merchant App', 'admin', 'Success', 'Emergency unlock override')
    
    alert('Emergency unlock successful. Door will remain unlocked until manually locked.')
    
  } catch (error) {
    doorStatus.value = 'error'
    alert('Emergency unlock failed. Please contact technical support.')
  } finally {
    isEmergencyUnlocking.value = false
  }
}

const startUnlockCountdown = () => {
  countdownTimer = setInterval(() => {
    if (unlockTimeRemaining.value > 0) {
      unlockTimeRemaining.value--
    } else {
      if (countdownTimer) {
        clearInterval(countdownTimer)
        countdownTimer = null
      }
    }
  }, 1000)
}

const toggleLockdown = async () => {
  const action = isLockdownActive.value ? 'disable' : 'enable'
  
  if (!confirm(`Are you sure you want to ${action} lockdown mode?`)) {
    return
  }

  isToggleLockdown.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    isLockdownActive.value = !isLockdownActive.value
    
    // Add log entry
    addLogEntry('Merchant App', 'admin', 'Success', `Lockdown ${isLockdownActive.value ? 'enabled' : 'disabled'}`)
    
    alert(`Lockdown mode ${isLockdownActive.value ? 'enabled' : 'disabled'} successfully`)
    
  } catch (error) {
    alert('Failed to toggle lockdown mode. Please try again.')
  } finally {
    isToggleLockdown.value = false
  }
}

const addLogEntry = (method: string, userId: string, status: 'Success' | 'Failed' | 'Denied', details: string) => {
  const newEntry = {
    id: accessLog.value.length + 1,
    timestamp: new Date(),
    method,
    userId,
    status,
    details
  }
  
  accessLog.value.unshift(newEntry)
  
  // Update today's stats
  todayStats.value.total++
  const methodKey = method.toLowerCase().replace(' ', '') as keyof typeof todayStats.value
  if (methodKey in todayStats.value && typeof todayStats.value[methodKey] === 'number') {
    (todayStats.value[methodKey] as number)++
  }
  
  if (status === 'Failed') {
    todayStats.value.failed++
  }
}

const getMethodIcon = (method: string) => {
  const methodData = accessMethods.value.find(m => m.name === method)
  return methodData?.icon || { template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>` }
}

const formatTime = (timestamp: Date) => {
  return timestamp.toLocaleTimeString('en-NO', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'Europe/Oslo'
  })
}

onMounted(() => {
  console.log('Access Control view mounted')
})

onUnmounted(() => {
  // Cleanup timers
  if (unlockTimer) {
    clearTimeout(unlockTimer)
  }
  if (countdownTimer) {
    clearInterval(countdownTimer)
  }
})
</script>
