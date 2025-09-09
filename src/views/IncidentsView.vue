<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-bold text-gray-900">Incidents</h2>
      <div class="flex items-center space-x-4">
        <select 
          v-model="selectedFilter"
          class="block w-40 rounded-md border-gray-300 text-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="all">All Incidents</option>
          <option value="open">Open</option>
          <option value="investigating">Investigating</option>
          <option value="resolved">Resolved</option>
        </select>
        <button
          @click="createIncident"
          class="btn-primary"
        >
          Create Incident
        </button>
      </div>
    </div>

    <!-- Statistics -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-white rounded-lg shadow p-4">
        <div class="flex items-center">
          <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
            <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-500">Total</p>
            <p class="text-2xl font-semibold text-gray-900">{{ dataStore.incidents.length }}</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-lg shadow p-4">
        <div class="flex items-center">
          <div class="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
            <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-500">Open</p>
            <p class="text-2xl font-semibold text-gray-900">{{ openIncidents.length }}</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-lg shadow p-4">
        <div class="flex items-center">
          <div class="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
            <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path>
            </svg>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-500">Investigating</p>
            <p class="text-2xl font-semibold text-gray-900">{{ investigatingIncidents.length }}</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-lg shadow p-4">
        <div class="flex items-center">
          <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
            <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-500">Resolved</p>
            <p class="text-2xl font-semibold text-gray-900">{{ resolvedIncidents.length }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Incidents List -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">
          {{ filteredIncidents.length }} {{ selectedFilter === 'all' ? 'Total' : selectedFilter.charAt(0).toUpperCase() + selectedFilter.slice(1) }} Incidents
        </h3>
      </div>
      
      <div class="divide-y divide-gray-200">
        <div 
          v-for="incident in filteredIncidents" 
          :key="incident.id"
          class="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
          @click="viewIncident(incident)"
        >
          <div class="flex items-start justify-between">
            <div class="flex items-start space-x-4">
              <!-- Incident Icon -->
              <div class="flex-shrink-0">
                <div 
                  class="w-10 h-10 rounded-full flex items-center justify-center"
                  :class="{
                    'bg-red-100': incident.severity === 'high',
                    'bg-yellow-100': incident.severity === 'medium',
                    'bg-blue-100': incident.severity === 'low'
                  }"
                >
                  <svg 
                    v-if="incident.type === 'customer'"
                    class="w-5 h-5"
                    :class="{
                      'text-red-600': incident.severity === 'high',
                      'text-yellow-600': incident.severity === 'medium',
                      'text-blue-600': incident.severity === 'low'
                    }"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  <svg 
                    v-else
                    class="w-5 h-5"
                    :class="{
                      'text-red-600': incident.severity === 'high',
                      'text-yellow-600': incident.severity === 'medium',
                      'text-blue-600': incident.severity === 'low'
                    }"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
              </div>
              
              <!-- Incident Content -->
              <div class="flex-1 min-w-0">
                <div class="flex items-center space-x-2 mb-2">
                  <h4 class="text-lg font-medium text-gray-900">{{ incident.title }}</h4>
                  <span 
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                    :class="{
                      'bg-red-100 text-red-800': incident.severity === 'high',
                      'bg-yellow-100 text-yellow-800': incident.severity === 'medium',
                      'bg-blue-100 text-blue-800': incident.severity === 'low'
                    }"
                  >
                    {{ incident.severity }}
                  </span>
                  <span 
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                    :class="{
                      'bg-purple-100 text-purple-800': incident.type === 'ai_detection',
                      'bg-gray-100 text-gray-800': incident.type === 'customer'
                    }"
                  >
                    {{ incident.type === 'ai_detection' ? 'AI Detection' : 'Customer' }}
                  </span>
                </div>
                <p class="text-gray-600 mb-3">{{ incident.description }}</p>
                <div class="flex items-center text-sm text-gray-500 space-x-4">
                  <span>ID: {{ incident.id }}</span>
                  <span>{{ formatTime(incident.timestamp) }}</span>
                  <span v-if="incident.assignedTo">Assigned to: {{ incident.assignedTo }}</span>
                  <span v-if="incident.resolvedAt">Resolved: {{ formatTime(incident.resolvedAt) }}</span>
                </div>
              </div>
            </div>
            
            <!-- Status Badge -->
            <div class="flex-shrink-0 ml-4">
              <span 
                class="inline-flex px-3 py-1 text-sm font-semibold rounded-full"
                :class="{
                  'bg-red-100 text-red-800': incident.status === 'open',
                  'bg-yellow-100 text-yellow-800': incident.status === 'investigating',
                  'bg-green-100 text-green-800': incident.status === 'resolved'
                }"
              >
                {{ incident.status }}
              </span>
            </div>
          </div>
        </div>
        
        <div v-if="filteredIncidents.length === 0" class="p-12 text-center">
          <svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <p class="text-gray-500">No incidents found</p>
        </div>
      </div>
    </div>

    <!-- Incident Details/Create Modal -->
    <div 
      v-if="selectedIncident || showCreateForm" 
      class="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4"
      @click="closeModal"
    >
      <div 
        class="bg-white rounded-lg max-w-2xl w-full p-6 max-h-screen overflow-y-auto"
        @click.stop
      >
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-semibold text-gray-900">
            {{ showCreateForm ? 'Create New Incident' : 'Incident Details' }}
          </h3>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <!-- Create Form -->
        <form v-if="showCreateForm" @submit.prevent="saveIncident" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input 
              v-model="newIncident.title"
              type="text" 
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea 
              v-model="newIncident.description"
              rows="3"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select 
                v-model="newIncident.type"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="customer">Customer</option>
                <option value="ai_detection">AI Detection</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Severity</label>
              <select 
                v-model="newIncident.severity"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Assigned To (Optional)</label>
            <input 
              v-model="newIncident.assignedTo"
              type="text" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
          </div>
          
          <div class="flex justify-end space-x-3 pt-4">
            <button 
              type="button"
              @click="closeModal"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button 
              type="submit"
              class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Create Incident
            </button>
          </div>
        </form>
        
        <!-- View/Edit Details -->
        <div v-else-if="selectedIncident" class="space-y-6">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Incident ID</label>
              <p class="text-sm text-gray-900">{{ selectedIncident.id }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <span 
                class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                :class="{
                  'bg-purple-100 text-purple-800': selectedIncident.type === 'ai_detection',
                  'bg-gray-100 text-gray-800': selectedIncident.type === 'customer'
                }"
              >
                {{ selectedIncident.type === 'ai_detection' ? 'AI Detection' : 'Customer' }}
              </span>
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <p class="text-sm text-gray-900">{{ selectedIncident.title }}</p>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <p class="text-sm text-gray-900">{{ selectedIncident.description }}</p>
          </div>
          
          <div class="grid grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Severity</label>
              <span 
                class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                :class="{
                  'bg-red-100 text-red-800': selectedIncident.severity === 'high',
                  'bg-yellow-100 text-yellow-800': selectedIncident.severity === 'medium',
                  'bg-blue-100 text-blue-800': selectedIncident.severity === 'low'
                }"
              >
                {{ selectedIncident.severity }}
              </span>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select 
                v-model="selectedIncident.status"
                @change="updateIncidentStatus"
                class="w-full px-2 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="open">Open</option>
                <option value="investigating">Investigating</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
              <p class="text-sm text-gray-900">{{ selectedIncident.assignedTo || 'Unassigned' }}</p>
            </div>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Created</label>
              <p class="text-sm text-gray-900">{{ new Date(selectedIncident.timestamp).toLocaleString() }}</p>
            </div>
            <div v-if="selectedIncident.resolvedAt">
              <label class="block text-sm font-medium text-gray-700 mb-1">Resolved</label>
              <p class="text-sm text-gray-900">{{ new Date(selectedIncident.resolvedAt).toLocaleString() }}</p>
            </div>
          </div>
          
          <div class="flex justify-end space-x-3 pt-6 mt-6 border-t border-gray-200">
            <button 
              @click="closeModal"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Close
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
import { useAuthStore } from '@/stores/auth'
import type { Incident } from '@/types'

const dataStore = useStoreDataStore()
const authStore = useAuthStore()
const selectedFilter = ref('all')
const selectedIncident = ref<Incident | null>(null)
const showCreateForm = ref(false)

const newIncident = ref({
  title: '',
  description: '',
  type: 'customer' as 'customer' | 'ai_detection',
  severity: 'medium' as 'low' | 'medium' | 'high',
  assignedTo: '',
})

const openIncidents = computed(() => 
  dataStore.incidents.filter(incident => incident.status === 'open')
)

const investigatingIncidents = computed(() => 
  dataStore.incidents.filter(incident => incident.status === 'investigating')
)

const resolvedIncidents = computed(() => 
  dataStore.incidents.filter(incident => incident.status === 'resolved')
)

const filteredIncidents = computed(() => {
  let incidents = dataStore.incidents
  
  if (selectedFilter.value !== 'all') {
    incidents = incidents.filter(incident => incident.status === selectedFilter.value)
  }
  
  // Sort by timestamp (newest first)
  return incidents.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
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

const createIncident = () => {
  showCreateForm.value = true
  newIncident.value = {
    title: '',
    description: '',
    type: 'customer',
    severity: 'medium',
    assignedTo: '',
  }
}

const viewIncident = (incident: Incident) => {
  selectedIncident.value = { ...incident }
}

const closeModal = () => {
  selectedIncident.value = null
  showCreateForm.value = false
}

const saveIncident = () => {
  const incident: Incident = {
    id: Math.max(...dataStore.incidents.map(i => i.id)) + 1,
    title: newIncident.value.title,
    description: newIncident.value.description,
    type: newIncident.value.type,
    severity: newIncident.value.severity,
    status: 'open',
    timestamp: new Date().toISOString(),
    assignedTo: newIncident.value.assignedTo || undefined,
    storeId: authStore.selectedStore?.id || 1,
  }
  
  dataStore.incidents.unshift(incident)
  closeModal()
}

const updateIncidentStatus = () => {
  if (selectedIncident.value) {
    dataStore.updateIncidentStatus(selectedIncident.value.id, selectedIncident.value.status)
  }
}
</script>
