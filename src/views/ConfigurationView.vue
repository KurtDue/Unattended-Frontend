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

        <!-- Time Lock Alcohol Sales -->
        <div class="bg-white rounded-lg shadow">
          <div class="p-6 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">Time Lock Alcohol Sales</h3>
            <p class="text-sm text-gray-600 mt-1">Configure when alcohol sales are permitted throughout the week and manage holiday exceptions.</p>
          </div>
          <div class="p-6 space-y-6">
            <!-- Weekly Schedule -->
            <div class="space-y-4">
              <h4 class="text-sm font-medium text-gray-900">Weekly Schedule</h4>
              <div class="space-y-3">
                <div v-for="day in weekDays" :key="day.key" class="grid grid-cols-4 gap-4 items-center">
                  <div class="flex items-center">
                    <input 
                      v-model="alcoholSalesSettings[day.key].enabled"
                      type="checkbox" 
                      :id="`alcohol-${day.key}`"
                      class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    >
                    <label :for="`alcohol-${day.key}`" class="ml-2 text-sm font-medium text-gray-700">
                      {{ day.name }}
                    </label>
                  </div>
                  <div>
                    <label class="block text-xs text-gray-500 mb-1">From</label>
                    <input 
                      v-model="alcoholSalesSettings[day.key].from"
                      type="time" 
                      :disabled="!alcoholSalesSettings[day.key].enabled"
                      class="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                    >
                  </div>
                  <div>
                    <label class="block text-xs text-gray-500 mb-1">To</label>
                    <input 
                      v-model="alcoholSalesSettings[day.key].to"
                      type="time" 
                      :disabled="!alcoholSalesSettings[day.key].enabled"
                      class="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                    >
                  </div>
                  <div class="text-xs text-gray-500">
                    <span v-if="alcoholSalesSettings[day.key].enabled">
                      {{ formatTimeRange(alcoholSalesSettings[day.key].from, alcoholSalesSettings[day.key].to) }}
                    </span>
                    <span v-else class="text-red-500">Disabled</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Holiday Exceptions -->
            <div class="space-y-4 border-t pt-4">
              <div class="flex items-center justify-between">
                <h4 class="text-sm font-medium text-gray-900">Holiday Exceptions</h4>
                <button 
                  @click="addHolidayException"
                  class="flex items-center px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100"
                >
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                  </svg>
                  Add Exception
                </button>
              </div>
              
              <div v-if="holidayExceptions.length === 0" class="text-sm text-gray-500 text-center py-4 border border-gray-200 border-dashed rounded-lg">
                No holiday exceptions configured. Click "Add Exception" to create one.
              </div>
              
              <div v-else class="space-y-3">
                <div v-for="(exception, index) in holidayExceptions" :key="index" 
                     class="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div class="grid grid-cols-1 md:grid-cols-5 gap-3 items-end">
                    <div>
                      <label class="block text-xs text-gray-600 mb-1">Holiday Name</label>
                      <input 
                        v-model="exception.name"
                        type="text" 
                        placeholder="e.g., Nyttårsdag"
                        class="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      >
                    </div>
                    <div>
                      <label class="block text-xs text-gray-600 mb-1">Date</label>
                      <input 
                        v-model="exception.date"
                        type="date" 
                        class="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      >
                    </div>
                    <div>
                      <label class="block text-xs text-gray-600 mb-1">From</label>
                      <input 
                        v-model="exception.from"
                        type="time" 
                        :disabled="!exception.enabled"
                        class="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                      >
                    </div>
                    <div>
                      <label class="block text-xs text-gray-600 mb-1">To</label>
                      <input 
                        v-model="exception.to"
                        type="time" 
                        :disabled="!exception.enabled"
                        class="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                      >
                    </div>
                    <div class="flex items-center space-x-2">
                      <label class="flex items-center">
                        <input 
                          v-model="exception.enabled"
                          type="checkbox" 
                          class="h-3 w-3 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        >
                        <span class="ml-1 text-xs text-gray-600">Enabled</span>
                      </label>
                      <button 
                        @click="removeHolidayException(index)"
                        class="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                        title="Remove exception"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <div v-if="exception.enabled && exception.from && exception.to" class="mt-2 text-xs text-gray-600">
                    🍺 Alcohol sales: {{ formatTimeRange(exception.from, exception.to) }} on {{ formatDate(exception.date) }}
                  </div>
                  <div v-else-if="!exception.enabled" class="mt-2 text-xs text-red-600">
                    🚫 Alcohol sales disabled on {{ formatDate(exception.date) }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Quick Actions for Alcohol Sales -->
            <div class="border-t pt-4">
              <div class="flex flex-wrap gap-2">
                <button 
                  @click="applyToAllWeekdays('08:00', '20:00')"
                  class="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100"
                >
                  Apply 08:00-20:00 to Weekdays
                </button>
                <button 
                  @click="applyToWeekend('10:00', '18:00')"
                  class="px-3 py-1 text-xs font-medium text-green-600 bg-green-50 rounded-md hover:bg-green-100"
                >
                  Apply 10:00-18:00 to Weekend
                </button>
                <button 
                  @click="disableAllAlcoholSales"
                  class="px-3 py-1 text-xs font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100"
                >
                  Disable All Sales
                </button>
                <button 
                  @click="loadDefaultNorwegianHolidays"
                  class="px-3 py-1 text-xs font-medium text-purple-600 bg-purple-50 rounded-md hover:bg-purple-100"
                >
                  Load 2025 Norwegian Holidays
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Camera Configuration -->
        <div class="bg-white rounded-lg shadow">
          <div class="p-6 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">Camera Configuration</h3>
            <p class="text-sm text-gray-600 mt-1">Configure camera streams and monitoring settings.</p>
          </div>
          <div class="p-6">
            <div class="space-y-6">
              <div v-for="camera in dataStore.cameras" :key="camera.id" class="border border-gray-200 rounded-lg p-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Camera Name</label>
                    <input 
                      v-model="camera.name"
                      type="text" 
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input 
                      v-model="camera.location"
                      type="text" 
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                  </div>
                  <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Stream URL</label>
                    <div class="flex space-x-2">
                      <input 
                        v-model="camera.streamUrl"
                        type="text" 
                        placeholder="rtsp://[CAMERA_IP]/onvif-media/media.amp?profile=profile_2_h264"
                        class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                      <button 
                        @click="testCameraStream(camera)"
                        :disabled="isTestingCamera"
                        class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {{ isTestingCamera ? 'Testing...' : 'Test' }}
                      </button>
                    </div>
                    <div v-if="camera.id === 1" class="mt-2 p-3 bg-blue-50 rounded-md">
                      <p class="text-sm text-blue-800">
                        <strong>Hanwha ANE-L7012R Configuration:</strong><br>
                        Replace [CAMERA_IP] with your camera's IP address.<br>
                        Common Hanwha RTSP URLs:
                      </p>
                      <ul class="text-xs text-blue-700 mt-2 space-y-1">
                        <li>• Primary: rtsp://[IP]/onvif-media/media.amp?profile=profile_1_h264</li>
                        <li>• Secondary: rtsp://[IP]/onvif-media/media.amp?profile=profile_2_h264</li>
                        <li>• With auth: rtsp://username:password@[IP]/onvif-media/media.amp?profile=profile_2_h264</li>
                      </ul>
                    </div>
                  </div>
                  <div class="flex items-center justify-between md:col-span-2">
                    <label class="flex items-center">
                      <input 
                        v-model="camera.isActive"
                        type="checkbox" 
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      >
                      <span class="ml-2 text-sm text-gray-900">Camera Active</span>
                    </label>
                    <div class="flex items-center space-x-2">
                      <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                            :class="{
                              'bg-green-100 text-green-800': camera.isActive,
                              'bg-red-100 text-red-800': !camera.isActive
                            }">
                        {{ camera.isActive ? 'Online' : 'Offline' }}
                      </span>
                    </div>
                  </div>
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
import { useStoreDataStore } from '@/stores/data'

const authStore = useAuthStore()
const dataStore = useStoreDataStore()

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

// Function to lookup coordinates from address (optimized for Norwegian addresses)
const lookupCoordinates = async () => {
  if (!canLookupCoordinates.value) {
    alert('Please fill in address, city, and country first.')
    return
  }
  
  isLookingUp.value = true
  coordinatesStatus.value = 'Looking up coordinates...'
  
  try {
    // Try multiple search strategies for Norwegian addresses
    const searchQueries = []
    
    // Strategy 1: Full address with postal code
    if (storeSettings.value.postalCode) {
      searchQueries.push(`${storeSettings.value.address}, ${storeSettings.value.postalCode} ${storeSettings.value.city}, Norway`)
    }
    
    // Strategy 2: Address without postal code but with city and Norway
    searchQueries.push(`${storeSettings.value.address}, ${storeSettings.value.city}, Norway`)
    
    // Strategy 3: Just postal code and city for Norwegian addresses
    if (storeSettings.value.postalCode) {
      searchQueries.push(`${storeSettings.value.postalCode} ${storeSettings.value.city}, Norway`)
    }
    
    // Strategy 4: Just city name in Norway
    searchQueries.push(`${storeSettings.value.city}, Norway`)
    
    let found = false
    let bestResult = null
    
    for (const query of searchQueries) {
      try {
        console.log('Trying search query:', query)
        
        // Using Nominatim with Norwegian-specific parameters
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?` +
          `format=json&` +
          `q=${encodeURIComponent(query)}&` +
          `limit=3&` +
          `countrycodes=no&` + // Restrict to Norway
          `addressdetails=1&` +
          `accept-language=no,en` // Prefer Norwegian, fallback to English
        )
        
        if (!response.ok) {
          console.warn(`Search failed for query: ${query}`)
          continue
        }
        
        const data = await response.json()
        
        if (data && data.length > 0) {
          // Find the best match (prefer exact address matches)
          for (const location of data) {
            const address = location.address || {}
            
            // Score the match quality
            let score = 0
            
            // Prefer matches with house numbers if we provided one
            if (storeSettings.value.address.match(/\d+/) && location.display_name.includes(storeSettings.value.address.match(/\d+/)[0])) {
              score += 3
            }
            
            // Prefer matches in the correct city
            if (address.city === storeSettings.value.city || address.town === storeSettings.value.city) {
              score += 2
            }
            
            // Prefer matches with correct postal code
            if (storeSettings.value.postalCode && address.postcode === storeSettings.value.postalCode) {
              score += 2
            }
            
            if (!bestResult || score > bestResult.score) {
              bestResult = {
                location,
                score,
                query
              }
            }
          }
          
          if (bestResult) {
            found = true
            break
          }
        }
      } catch (err) {
        console.warn(`Error with query "${query}":`, err)
        continue
      }
      
      // Add delay between requests to be respectful to the API
      await new Promise(resolve => setTimeout(resolve, 300))
    }
    
    if (found && bestResult) {
      const location = bestResult.location
      storeSettings.value.coordinates.latitude = parseFloat(location.lat)
      storeSettings.value.coordinates.longitude = parseFloat(location.lon)
      coordinatesStatus.value = `✅ Coordinates found using: "${bestResult.query}"`
      
      // Update the location field with the display name
      storeSettings.value.location = location.display_name
      
      console.log('Successfully found coordinates:', {
        lat: location.lat,
        lon: location.lon,
        query: bestResult.query,
        display_name: location.display_name
      })
    } else {
      coordinatesStatus.value = '❌ Could not find Norwegian address. Please verify the address details are correct.'
      console.log('No results found for any search query')
    }
  } catch (error) {
    console.error('Geocoding error:', error)
    coordinatesStatus.value = '❌ Failed to lookup coordinates. Please try again later.'
  } finally {
    isLookingUp.value = false
    // Clear status message after 8 seconds
    setTimeout(() => {
      coordinatesStatus.value = ''
    }, 8000)
  }
}

const alertSettings = ref({
  emailNotifications: true,
  smsNotifications: false,
  notificationEmail: '',
  doorOpenThreshold: 30,
})

// Alcohol Sales Time Lock Settings
const weekDays = [
  { key: 'monday', name: 'Monday' },
  { key: 'tuesday', name: 'Tuesday' },
  { key: 'wednesday', name: 'Wednesday' },
  { key: 'thursday', name: 'Thursday' },
  { key: 'friday', name: 'Friday' },
  { key: 'saturday', name: 'Saturday' },
  { key: 'sunday', name: 'Sunday' }
]

const alcoholSalesSettings = ref({
  monday: { enabled: true, from: '08:00', to: '20:00' },
  tuesday: { enabled: true, from: '08:00', to: '20:00' },
  wednesday: { enabled: true, from: '08:00', to: '20:00' },
  thursday: { enabled: true, from: '08:00', to: '20:00' },
  friday: { enabled: true, from: '08:00', to: '20:00' },
  saturday: { enabled: true, from: '10:00', to: '18:00' },
  sunday: { enabled: false, from: '12:00', to: '17:00' }
})

const holidayExceptions = ref([
  {
    name: 'Nyttårsdag',
    date: '2025-01-01',
    enabled: false,
    from: '12:00',
    to: '16:00'
  },
  {
    name: '17. mai (Grunnlovsdag)',
    date: '2025-05-17',
    enabled: true,
    from: '10:00',
    to: '15:00'
  },
  {
    name: 'Julaften',
    date: '2025-12-24',
    enabled: false,
    from: '08:00',
    to: '12:00'
  }
])

// Helper functions for alcohol sales
const formatTimeRange = (from, to) => {
  if (!from || !to) return 'Not set'
  return `${from} - ${to}`
}

const formatDate = (dateString) => {
  if (!dateString) return 'No date'
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('no-NO', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  } catch {
    return dateString
  }
}

const addHolidayException = () => {
  const today = new Date()
  const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1)
  
  holidayExceptions.value.push({
    name: '',
    date: nextMonth.toISOString().split('T')[0],
    enabled: true,
    from: '10:00',
    to: '16:00'
  })
}

const removeHolidayException = (index) => {
  if (confirm('Are you sure you want to remove this holiday exception?')) {
    holidayExceptions.value.splice(index, 1)
  }
}

const applyToAllWeekdays = (from, to) => {
  const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
  weekdays.forEach(day => {
    alcoholSalesSettings.value[day].enabled = true
    alcoholSalesSettings.value[day].from = from
    alcoholSalesSettings.value[day].to = to
  })
}

const applyToWeekend = (from, to) => {
  alcoholSalesSettings.value.saturday.enabled = true
  alcoholSalesSettings.value.saturday.from = from
  alcoholSalesSettings.value.saturday.to = to
  alcoholSalesSettings.value.sunday.enabled = true
  alcoholSalesSettings.value.sunday.from = from
  alcoholSalesSettings.value.sunday.to = to
}

const disableAllAlcoholSales = () => {
  if (confirm('Are you sure you want to disable alcohol sales for all days?')) {
    weekDays.forEach(day => {
      alcoholSalesSettings.value[day.key].enabled = false
    })
  }
}

const loadDefaultNorwegianHolidays = () => {
  if (confirm('This will replace all current holiday exceptions with Norwegian holidays for 2025. Continue?')) {
    holidayExceptions.value = [
      { name: 'Nyttårsdag', date: '2025-01-01', enabled: false, from: '12:00', to: '16:00' },
      { name: 'Skjærtorsdag', date: '2025-04-17', enabled: true, from: '10:00', to: '16:00' },
      { name: 'Langfredag', date: '2025-04-18', enabled: false, from: '10:00', to: '15:00' },
      { name: 'Første påskedag', date: '2025-04-20', enabled: false, from: '12:00', to: '17:00' },
      { name: 'Andre påskedag', date: '2025-04-21', enabled: true, from: '12:00', to: '18:00' },
      { name: 'Arbeidernes dag', date: '2025-05-01', enabled: true, from: '12:00', to: '17:00' },
      { name: 'Grunnlovsdag', date: '2025-05-17', enabled: true, from: '10:00', to: '15:00' },
      { name: 'Kristi himmelfartsdag', date: '2025-05-29', enabled: true, from: '12:00', to: '17:00' },
      { name: 'Første pinsedag', date: '2025-06-08', enabled: false, from: '12:00', to: '17:00' },
      { name: 'Andre pinsedag', date: '2025-06-09', enabled: true, from: '12:00', to: '18:00' },
      { name: 'Julaften', date: '2025-12-24', enabled: false, from: '08:00', to: '12:00' },
      { name: 'Første juledag', date: '2025-12-25', enabled: false, from: '12:00', to: '16:00' },
      { name: 'Andre juledag', date: '2025-12-26', enabled: true, from: '12:00', to: '18:00' },
      { name: 'Nyttårsaften', date: '2025-12-31', enabled: false, from: '08:00', to: '16:00' }
    ]
  }
}

// Camera testing
const isTestingCamera = ref(false)

const testCameraStream = async (camera: any) => {
  isTestingCamera.value = true
  
  try {
    if (camera.streamUrl.includes('[CAMERA_IP]')) {
      alert('Please replace [CAMERA_IP] with your actual camera IP address first.')
      return
    }
    
    if (!camera.streamUrl.startsWith('rtsp://') && !camera.streamUrl.startsWith('http')) {
      alert('Invalid stream URL format. Please use rtsp:// or http:// protocol.')
      return
    }
    
    // Simulate camera connection test
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // For demo purposes, always succeed
    alert(`Camera stream test successful!\n\nCamera: ${camera.name}\nURL: ${camera.streamUrl}\n\nNote: In production, this would test the actual connection.`)
    
  } catch (error) {
    alert(`Camera stream test failed: ${error}`)
  } finally {
    isTestingCamera.value = false
  }
}

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

  const savedAlcoholSalesSettings = localStorage.getItem('alcoholSalesSettings')
  if (savedAlcoholSalesSettings) {
    alcoholSalesSettings.value = { ...alcoholSalesSettings.value, ...JSON.parse(savedAlcoholSalesSettings) }
  }
  
  const savedHolidayExceptions = localStorage.getItem('holidayExceptions')
  if (savedHolidayExceptions) {
    holidayExceptions.value = JSON.parse(savedHolidayExceptions)
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
    localStorage.setItem('alcoholSalesSettings', JSON.stringify(alcoholSalesSettings.value))
    localStorage.setItem('holidayExceptions', JSON.stringify(holidayExceptions.value))
    
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
