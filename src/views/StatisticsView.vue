<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-bold text-gray-900">Statistics</h2>
      <div class="flex items-center space-x-4">
        <select 
          v-model="selectedPeriod"
          class="block w-32 rounded-md border-gray-300 text-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </select>
        <button
          @click="exportData"
          class="btn-secondary"
        >
          Export
        </button>
      </div>
    </div>

    <!-- Key Metrics -->
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
            <p class="text-2xl font-semibold text-gray-900">${{ statistics?.totalSales.toLocaleString() || '0' }}</p>
            <p class="text-sm text-green-600">+12.5% from last period</p>
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
            <p class="text-sm font-medium text-gray-500">Visitors</p>
            <p class="text-2xl font-semibold text-gray-900">{{ statistics?.todayVisitors || '0' }}</p>
            <p class="text-sm text-blue-600">+8.3% from yesterday</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Avg Temperature</p>
            <p class="text-2xl font-semibold text-gray-900">{{ statistics?.averageTemperature || '0' }}°C</p>
            <p class="text-sm text-gray-600">Within normal range</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">System Uptime</p>
            <p class="text-2xl font-semibold text-gray-900">{{ statistics?.systemUptime || '0%' }}</p>
            <p class="text-sm text-green-600">Excellent performance</p>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Sales Chart -->
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Sales Trend</h3>
        <div class="h-64 flex items-center justify-center bg-gray-50 rounded">
          <!-- Mock chart placeholder -->
          <div class="text-center">
            <svg class="w-16 h-16 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
            <p class="text-gray-500 text-sm">Sales chart would display here</p>
            <p class="text-gray-400 text-xs">Integration with chart library needed</p>
          </div>
        </div>
      </div>

      <!-- Visitor Traffic -->
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Visitor Traffic</h3>
        <div class="h-64 flex items-center justify-center bg-gray-50 rounded">
          <!-- Mock chart placeholder -->
          <div class="text-center">
            <svg class="w-16 h-16 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path>
            </svg>
            <p class="text-gray-500 text-sm">Traffic chart would display here</p>
            <p class="text-gray-400 text-xs">Hourly visitor pattern analysis</p>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Alert Statistics -->
      <div class="bg-white rounded-lg shadow">
        <div class="p-6 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Alert Statistics</h3>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="w-3 h-3 bg-red-400 rounded-full mr-3"></div>
                <span class="text-sm font-medium text-gray-900">Critical</span>
              </div>
              <div class="text-right">
                <span class="text-sm font-semibold text-gray-900">{{ criticalAlertsCount }}</span>
                <div class="w-20 bg-gray-200 rounded-full h-2 mt-1">
                  <div 
                    class="bg-red-400 h-2 rounded-full transition-all duration-300"
                    :style="{ width: (criticalAlertsCount / totalAlertsCount * 100) + '%' }"
                  ></div>
                </div>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="w-3 h-3 bg-yellow-400 rounded-full mr-3"></div>
                <span class="text-sm font-medium text-gray-900">Warning</span>
              </div>
              <div class="text-right">
                <span class="text-sm font-semibold text-gray-900">{{ warningAlertsCount }}</span>
                <div class="w-20 bg-gray-200 rounded-full h-2 mt-1">
                  <div 
                    class="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                    :style="{ width: (warningAlertsCount / totalAlertsCount * 100) + '%' }"
                  ></div>
                </div>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="w-3 h-3 bg-blue-400 rounded-full mr-3"></div>
                <span class="text-sm font-medium text-gray-900">Info</span>
              </div>
              <div class="text-right">
                <span class="text-sm font-semibold text-gray-900">{{ infoAlertsCount }}</span>
                <div class="w-20 bg-gray-200 rounded-full h-2 mt-1">
                  <div 
                    class="bg-blue-400 h-2 rounded-full transition-all duration-300"
                    :style="{ width: (infoAlertsCount / totalAlertsCount * 100) + '%' }"
                  ></div>
                </div>
              </div>
            </div>
            <div class="pt-2 border-t border-gray-200">
              <div class="flex justify-between text-sm">
                <span class="font-medium text-gray-900">Total</span>
                <span class="font-medium text-gray-900">{{ totalAlertsCount }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sensor Health -->
      <div class="bg-white rounded-lg shadow">
        <div class="p-6 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Sensor Health</h3>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
                <span class="text-sm font-medium text-gray-900">Active</span>
              </div>
              <div class="text-right">
                <span class="text-sm font-semibold text-gray-900">{{ activeSensorsCount }}</span>
                <div class="w-20 bg-gray-200 rounded-full h-2 mt-1">
                  <div 
                    class="bg-green-400 h-2 rounded-full transition-all duration-300"
                    :style="{ width: (activeSensorsCount / totalSensorsCount * 100) + '%' }"
                  ></div>
                </div>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="w-3 h-3 bg-yellow-400 rounded-full mr-3"></div>
                <span class="text-sm font-medium text-gray-900">Inactive</span>
              </div>
              <div class="text-right">
                <span class="text-sm font-semibold text-gray-900">{{ inactiveSensorsCount }}</span>
                <div class="w-20 bg-gray-200 rounded-full h-2 mt-1">
                  <div 
                    class="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                    :style="{ width: (inactiveSensorsCount / totalSensorsCount * 100) + '%' }"
                  ></div>
                </div>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="w-3 h-3 bg-red-400 rounded-full mr-3"></div>
                <span class="text-sm font-medium text-gray-900">Error</span>
              </div>
              <div class="text-right">
                <span class="text-sm font-semibold text-gray-900">{{ errorSensorsCount }}</span>
                <div class="w-20 bg-gray-200 rounded-full h-2 mt-1">
                  <div 
                    class="bg-red-400 h-2 rounded-full transition-all duration-300"
                    :style="{ width: (errorSensorsCount / totalSensorsCount * 100) + '%' }"
                  ></div>
                </div>
              </div>
            </div>
            <div class="pt-2 border-t border-gray-200">
              <div class="flex justify-between text-sm">
                <span class="font-medium text-gray-900">Total</span>
                <span class="font-medium text-gray-900">{{ totalSensorsCount }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Incident Summary -->
      <div class="bg-white rounded-lg shadow">
        <div class="p-6 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Incident Summary</h3>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="w-3 h-3 bg-red-400 rounded-full mr-3"></div>
                <span class="text-sm font-medium text-gray-900">Open</span>
              </div>
              <div class="text-right">
                <span class="text-sm font-semibold text-gray-900">{{ openIncidentsCount }}</span>
                <div class="w-20 bg-gray-200 rounded-full h-2 mt-1">
                  <div 
                    class="bg-red-400 h-2 rounded-full transition-all duration-300"
                    :style="{ width: (openIncidentsCount / totalIncidentsCount * 100) + '%' }"
                  ></div>
                </div>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="w-3 h-3 bg-yellow-400 rounded-full mr-3"></div>
                <span class="text-sm font-medium text-gray-900">Investigating</span>
              </div>
              <div class="text-right">
                <span class="text-sm font-semibold text-gray-900">{{ investigatingIncidentsCount }}</span>
                <div class="w-20 bg-gray-200 rounded-full h-2 mt-1">
                  <div 
                    class="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                    :style="{ width: (investigatingIncidentsCount / totalIncidentsCount * 100) + '%' }"
                  ></div>
                </div>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
                <span class="text-sm font-medium text-gray-900">Resolved</span>
              </div>
              <div class="text-right">
                <span class="text-sm font-semibold text-gray-900">{{ resolvedIncidentsCount }}</span>
                <div class="w-20 bg-gray-200 rounded-full h-2 mt-1">
                  <div 
                    class="bg-green-400 h-2 rounded-full transition-all duration-300"
                    :style="{ width: (resolvedIncidentsCount / totalIncidentsCount * 100) + '%' }"
                  ></div>
                </div>
              </div>
            </div>
            <div class="pt-2 border-t border-gray-200">
              <div class="flex justify-between text-sm">
                <span class="font-medium text-gray-900">Total</span>
                <span class="font-medium text-gray-900">{{ totalIncidentsCount }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Temperature History -->
    <div class="bg-white rounded-lg shadow">
      <div class="p-6 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">Temperature History (24h)</h3>
      </div>
      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div 
            v-for="sensor in temperatureSensors" 
            :key="sensor.id"
            class="text-center"
          >
            <h4 class="text-sm font-medium text-gray-900 mb-2">{{ sensor.name }}</h4>
            <div class="h-32 flex items-end justify-center bg-gray-50 rounded mb-2">
              <!-- Mock temperature history chart -->
              <div class="flex items-end space-x-1 h-full py-4">
                <div v-for="i in 12" :key="i" class="w-2 bg-blue-300 rounded-t" :style="{ height: Math.random() * 80 + 20 + '%' }"></div>
              </div>
            </div>
            <div class="text-sm">
              <span class="font-semibold">{{ typeof sensor.value === 'number' ? sensor.value.toFixed(1) : sensor.value }}{{ sensor.unit }}</span>
              <span class="text-gray-500 ml-2">Current</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStoreDataStore } from '@/stores/data'

const dataStore = useStoreDataStore()
const selectedPeriod = ref('today')

const statistics = computed(() => dataStore.statistics)

const temperatureSensors = computed(() =>
  dataStore.sensors.filter(sensor => sensor.type === 'temperature')
)

// Alert statistics
const criticalAlertsCount = computed(() =>
  dataStore.alerts.filter(alert => alert.type === 'critical').length
)

const warningAlertsCount = computed(() =>
  dataStore.alerts.filter(alert => alert.type === 'warning').length
)

const infoAlertsCount = computed(() =>
  dataStore.alerts.filter(alert => alert.type === 'info').length
)

const totalAlertsCount = computed(() => dataStore.alerts.length)

// Sensor statistics
const activeSensorsCount = computed(() =>
  dataStore.sensors.filter(sensor => sensor.status === 'active').length
)

const inactiveSensorsCount = computed(() =>
  dataStore.sensors.filter(sensor => sensor.status === 'inactive').length
)

const errorSensorsCount = computed(() =>
  dataStore.sensors.filter(sensor => sensor.status === 'error').length
)

const totalSensorsCount = computed(() => dataStore.sensors.length)

// Incident statistics
const openIncidentsCount = computed(() =>
  dataStore.incidents.filter(incident => incident.status === 'open').length
)

const investigatingIncidentsCount = computed(() =>
  dataStore.incidents.filter(incident => incident.status === 'investigating').length
)

const resolvedIncidentsCount = computed(() =>
  dataStore.incidents.filter(incident => incident.status === 'resolved').length
)

const totalIncidentsCount = computed(() => dataStore.incidents.length)

const exportData = () => {
  // Mock export functionality
  const data = {
    period: selectedPeriod.value,
    statistics: statistics.value,
    alerts: {
      critical: criticalAlertsCount.value,
      warning: warningAlertsCount.value,
      info: infoAlertsCount.value,
      total: totalAlertsCount.value,
    },
    sensors: {
      active: activeSensorsCount.value,
      inactive: inactiveSensorsCount.value,
      error: errorSensorsCount.value,
      total: totalSensorsCount.value,
    },
    incidents: {
      open: openIncidentsCount.value,
      investigating: investigatingIncidentsCount.value,
      resolved: resolvedIncidentsCount.value,
      total: totalIncidentsCount.value,
    },
  }
  
  const dataStr = JSON.stringify(data, null, 2)
  const dataBlob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(dataBlob)
  const link = document.createElement('a')
  link.href = url
  link.download = `store-statistics-${selectedPeriod.value}-${new Date().toISOString().split('T')[0]}.json`
  link.click()
  URL.revokeObjectURL(url)
}
</script>
