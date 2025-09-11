<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-bold text-gray-900">Customer Assistance</h2>
      <div class="flex items-center space-x-4">
        <div class="flex items-center space-x-2">
          <div 
            class="w-3 h-3 rounded-full"
            :class="{
              'bg-green-400': !isSessionActive,
              'bg-red-400 animate-pulse': isSessionActive
            }"
          ></div>
          <span class="text-sm text-gray-600">
            {{ isSessionActive ? 'Session Active' : 'Ready for Assistance' }}
          </span>
        </div>
        <button
          @click="toggleSession"
          :disabled="isConnecting"
          class="px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          :class="{
            'text-white bg-green-600 hover:bg-green-700 focus:ring-green-500': !isSessionActive,
            'text-white bg-red-600 hover:bg-red-700 focus:ring-red-500': isSessionActive
          }"
        >
          {{ isConnecting ? 'Connecting...' : isSessionActive ? 'End Session' : 'Start Assistance' }}
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <!-- Video & Audio Controls -->
      <div class="xl:col-span-2 space-y-6">
        <!-- POS Camera Feed -->
        <div class="bg-white rounded-lg shadow">
          <div class="p-6 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-medium text-gray-900">POS Camera Feed</h3>
              <div class="flex items-center space-x-3">
                <button
                  @click="toggleFullscreen"
                  class="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100"
                  title="Fullscreen"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div class="p-6">
            <div class="aspect-video bg-gray-900 rounded-lg relative overflow-hidden">
              <!-- POS Camera Display -->
              <div v-if="isSessionActive" class="absolute inset-0">
                <div class="w-full h-full flex items-center justify-center">
                  <div class="text-center">
                    <svg class="w-20 h-20 text-white mb-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                    </svg>
                    <p class="text-white text-lg font-medium">POS Camera Active</p>
                    <p class="text-gray-300 text-sm">Customer interaction view</p>
                    <div class="flex items-center justify-center mt-4">
                      <div class="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-2"></div>
                      <span class="text-red-400 font-medium">LIVE</span>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="absolute inset-0 flex items-center justify-center">
                <div class="text-center">
                  <svg class="w-20 h-20 text-gray-500 mb-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636"></path>
                  </svg>
                  <p class="text-gray-500 text-lg">Camera Offline</p>
                  <p class="text-gray-400 text-sm">Start assistance session to activate</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Audio Controls -->
        <div class="bg-white rounded-lg shadow">
          <div class="p-6 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">Audio & Communication</h3>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="space-y-3">
                <label class="block text-sm font-medium text-gray-700">Microphone</label>
                <button
                  @click="toggleMicrophone"
                  :disabled="!isSessionActive"
                  class="w-full flex items-center justify-center px-4 py-3 rounded-lg border-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  :class="{
                    'border-green-300 bg-green-50 text-green-800': isMicrophoneOn,
                    'border-gray-300 bg-gray-50 text-gray-600': !isMicrophoneOn
                  }"
                >
                  <svg v-if="isMicrophoneOn" class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
                  </svg>
                  <svg v-else class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1m0 0V5a2 2 0 012-2h2a2 2 0 012 2v8.5m0 0V19a2 2 0 002 2h2a2 2 0 002-2v-3.5m0 0V5a2 2 0 00-2-2H9a2 2 0 00-2 2v5.5M3 5l9 9 9-9"></path>
                  </svg>
                  {{ isMicrophoneOn ? 'Mic ON' : 'Mic OFF' }}
                </button>
              </div>
              
              <div class="space-y-3">
                <label class="block text-sm font-medium text-gray-700">Speakers</label>
                <button
                  @click="toggleSpeakers"
                  :disabled="!isSessionActive"
                  class="w-full flex items-center justify-center px-4 py-3 rounded-lg border-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  :class="{
                    'border-blue-300 bg-blue-50 text-blue-800': isSpeakersOn,
                    'border-gray-300 bg-gray-50 text-gray-600': !isSpeakersOn
                  }"
                >
                  <svg v-if="isSpeakersOn" class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5 15h4l4 4V5L9 9H5v6z"></path>
                  </svg>
                  <svg v-else class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1m0 0V5a2 2 0 012-2h2a2 2 0 012 2v8.5m0 0V19a2 2 0 002 2h2a2 2 0 002-2v-3.5m0 0V5a2 2 0 00-2-2H9a2 2 0 00-2 2v5.5M3 5l9 9 9-9"></path>
                  </svg>
                  {{ isSpeakersOn ? 'Audio ON' : 'Audio OFF' }}
                </button>
              </div>
              
              <div class="space-y-3">
                <label class="block text-sm font-medium text-gray-700">Quick Messages</label>
                <select 
                  v-model="selectedQuickMessage"
                  @change="sendQuickMessage"
                  :disabled="!isSessionActive"
                  class="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">Select message...</option>
                  <option value="welcome">Welcome! How can I help?</option>
                  <option value="wait">Please wait a moment</option>
                  <option value="id">Please show your ID</option>
                  <option value="help">I'm here to assist you</option>
                  <option value="thanks">Thank you for your patience</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- POS Control Panel -->
      <div class="space-y-6">
        <!-- Session Info -->
        <div class="bg-white rounded-lg shadow">
          <div class="p-6 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">Session Info</h3>
          </div>
          <div class="p-6 space-y-4">
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Status:</span>
              <span :class="{
                'text-green-600 font-medium': isSessionActive,
                'text-gray-500': !isSessionActive
              }">
                {{ isSessionActive ? 'Active' : 'Inactive' }}
              </span>
            </div>
            <div v-if="isSessionActive" class="flex justify-between text-sm">
              <span class="text-gray-600">Duration:</span>
              <span class="text-gray-900 font-mono">{{ sessionDuration }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Customer ID:</span>
              <span class="text-gray-900">{{ isSessionActive ? 'CUST-001' : 'N/A' }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Cart Items:</span>
              <span class="text-gray-900">{{ cartItems.length }}</span>
            </div>
          </div>
        </div>

        <!-- POS Control Buttons -->
        <div class="bg-white rounded-lg shadow">
          <div class="p-6 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">POS Controls</h3>
          </div>
          <div class="p-6 space-y-4">
            <!-- Age Approval -->
            <button
              @click="executeAction('age_approval')"
              :disabled="!isSessionActive || isActionInProgress"
              class="w-full flex items-center justify-center px-4 py-3 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Age Approval
            </button>

            <!-- Cancel Cart -->
            <button
              @click="executeAction('cancel_cart')"
              :disabled="!isSessionActive || isActionInProgress || cartItems.length === 0"
              class="w-full flex items-center justify-center px-4 py-3 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
              Cancel Cart
            </button>

            <!-- Remove Last Item -->
            <button
              @click="executeAction('remove_last')"
              :disabled="!isSessionActive || isActionInProgress || cartItems.length === 0"
              class="w-full flex items-center justify-center px-4 py-3 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Remove Last Item
            </button>

            <!-- Add Item Manually -->
            <button
              @click="showAddItemModal = true"
              :disabled="!isSessionActive || isActionInProgress"
              class="w-full flex items-center justify-center px-4 py-3 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
              </svg>
              Add Item Manually
            </button>
          </div>
        </div>

        <!-- Current Cart -->
        <div class="bg-white rounded-lg shadow">
          <div class="p-6 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">Current Cart</h3>
          </div>
          <div class="p-6">
            <div v-if="cartItems.length === 0" class="text-center text-gray-500 py-4">
              No items in cart
            </div>
            <div v-else class="space-y-3">
              <div v-for="(item, index) in cartItems" :key="index" class="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                <div>
                  <p class="text-sm font-medium text-gray-900">{{ item.name }}</p>
                  <p class="text-xs text-gray-500">{{ item.barcode }}</p>
                </div>
                <div class="text-right">
                  <p class="text-sm font-medium text-gray-900">{{ item.price }} NOK</p>
                  <p class="text-xs text-gray-500">Qty: {{ item.quantity }}</p>
                </div>
              </div>
              <div class="pt-3 border-t border-gray-200">
                <div class="flex justify-between items-center">
                  <span class="text-base font-medium text-gray-900">Total:</span>
                  <span class="text-lg font-bold text-gray-900">{{ cartTotal }} NOK</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Item Modal -->
    <div 
      v-if="showAddItemModal" 
      class="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4"
      @click="closeAddItemModal"
    >
      <div 
        class="bg-white rounded-lg max-w-md w-full p-6"
        @click.stop
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">Add Item Manually</h3>
          <button @click="closeAddItemModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
            <input 
              v-model="newItem.name"
              type="text" 
              placeholder="e.g., Coca Cola 0.5L"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Barcode/SKU</label>
            <input 
              v-model="newItem.barcode"
              type="text" 
              placeholder="e.g., 7035620000000"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Price (NOK)</label>
              <input 
                v-model="newItem.price"
                type="number" 
                step="0.01"
                placeholder="25.00"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
              <input 
                v-model="newItem.quantity"
                type="number" 
                min="1"
                placeholder="1"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
            </div>
          </div>
          
          <div class="flex justify-end space-x-3 pt-4">
            <button 
              @click="closeAddItemModal"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button 
              @click="addItemToCart"
              :disabled="!canAddItem"
              class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Item
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Session management
const isSessionActive = ref(false)
const isConnecting = ref(false)
const sessionStartTime = ref<Date | null>(null)
const sessionDuration = ref('00:00:00')

// Audio/Video controls
const isMicrophoneOn = ref(false)
const isSpeakersOn = ref(false)
const selectedQuickMessage = ref('')

// POS actions
const isActionInProgress = ref(false)

// Cart management
const cartItems = ref([
  { name: 'Coca Cola 0.5L', barcode: '7035620001234', price: 25.00, quantity: 1 },
  { name: 'Milk 1L', barcode: '7035620005678', price: 18.50, quantity: 2 }
])

// Add item modal
const showAddItemModal = ref(false)
const newItem = ref({
  name: '',
  barcode: '',
  price: 0,
  quantity: 1
})

// Session timer
let sessionTimer: number | null = null

const cartTotal = computed(() => {
  return cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)
})

const canAddItem = computed(() => {
  return newItem.value.name.trim() && 
         newItem.value.barcode.trim() && 
         newItem.value.price > 0 && 
         newItem.value.quantity > 0
})

const toggleSession = async () => {
  if (isSessionActive.value) {
    endSession()
  } else {
    await startSession()
  }
}

const startSession = async () => {
  isConnecting.value = true
  
  try {
    // Simulate connection process
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    isSessionActive.value = true
    sessionStartTime.value = new Date()
    isMicrophoneOn.value = true
    isSpeakersOn.value = true
    
    // Start session timer
    startSessionTimer()
    
    alert('Assistance session started! You can now communicate with the customer.')
    
  } catch (error) {
    alert('Failed to start assistance session. Please try again.')
  } finally {
    isConnecting.value = false
  }
}

const endSession = () => {
  if (confirm('Are you sure you want to end the assistance session?')) {
    isSessionActive.value = false
    sessionStartTime.value = null
    isMicrophoneOn.value = false
    isSpeakersOn.value = false
    
    // Stop session timer
    if (sessionTimer) {
      clearInterval(sessionTimer)
      sessionTimer = null
    }
    
    sessionDuration.value = '00:00:00'
    alert('Assistance session ended.')
  }
}

const startSessionTimer = () => {
  sessionTimer = setInterval(() => {
    if (sessionStartTime.value) {
      const now = new Date()
      const diff = now.getTime() - sessionStartTime.value.getTime()
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)
      
      sessionDuration.value = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }
  }, 1000)
}

const toggleMicrophone = () => {
  isMicrophoneOn.value = !isMicrophoneOn.value
  console.log(`Microphone ${isMicrophoneOn.value ? 'enabled' : 'disabled'}`)
}

const toggleSpeakers = () => {
  isSpeakersOn.value = !isSpeakersOn.value
  console.log(`Speakers ${isSpeakersOn.value ? 'enabled' : 'disabled'}`)
}

const sendQuickMessage = () => {
  if (selectedQuickMessage.value) {
    console.log(`Sending quick message: ${selectedQuickMessage.value}`)
    // Here you would send the message to the POS speakers
    selectedQuickMessage.value = ''
  }
}

const executeAction = async (action: string) => {
  if (!confirm(`Are you sure you want to execute: ${action.replace('_', ' ')}?`)) {
    return
  }
  
  isActionInProgress.value = true
  
  try {
    // Simulate POS action
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    switch (action) {
      case 'age_approval':
        alert('Age approval granted successfully!')
        break
      case 'cancel_cart':
        cartItems.value = []
        alert('Cart canceled successfully!')
        break
      case 'remove_last':
        if (cartItems.value.length > 0) {
          const removedItem = cartItems.value.pop()
          alert(`Removed: ${removedItem?.name}`)
        }
        break
    }
    
  } catch (error) {
    alert(`Failed to execute ${action}. Please try again.`)
  } finally {
    isActionInProgress.value = false
  }
}

const toggleFullscreen = () => {
  // Implement fullscreen for video
  console.log('Toggle fullscreen camera view')
}

const closeAddItemModal = () => {
  showAddItemModal.value = false
  newItem.value = {
    name: '',
    barcode: '',
    price: 0,
    quantity: 1
  }
}

const addItemToCart = () => {
  cartItems.value.push({
    name: newItem.value.name,
    barcode: newItem.value.barcode,
    price: Number(newItem.value.price),
    quantity: Number(newItem.value.quantity)
  })
  
  closeAddItemModal()
  alert(`Added ${newItem.value.name} to cart!`)
}

onMounted(() => {
  // Initialize assistance view
  console.log('Assistance view mounted')
})

onUnmounted(() => {
  // Cleanup
  if (sessionTimer) {
    clearInterval(sessionTimer)
  }
})
</script>
