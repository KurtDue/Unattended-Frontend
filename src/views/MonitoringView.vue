<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-bold text-gray-900">Camera Monitoring</h2>
      <div class="flex items-center space-x-4">
        <div class="flex items-center space-x-2">
          <div class="w-3 h-3 bg-green-400 rounded-full"></div>
          <span class="text-sm text-gray-600">{{ activeCamerasCount }} Active</span>
        </div>
        <div class="flex items-center space-x-2">
          <div class="w-3 h-3 bg-red-400 rounded-full"></div>
          <span class="text-sm text-gray-600">{{ inactiveCamerasCount }} Inactive</span>
        </div>
      </div>
    </div>

    <!-- Camera Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      <div 
        v-for="camera in dataStore.cameras" 
        :key="camera.id"
        class="bg-white rounded-lg shadow overflow-hidden"
      >
        <div class="aspect-video bg-gray-900 relative">
          <!-- Real video stream or mock feed -->
          <div v-if="camera.isActive" class="absolute inset-0">
            <!-- Video element for actual streaming (when RTSP is converted to HLS/WebRTC) -->
            <video 
              v-if="isRealStream(camera.streamUrl)"
              :ref="`video-${camera.id}`"
              class="w-full h-full object-cover"
              autoplay 
              muted 
              playsinline
              @loadstart="onVideoLoadStart(camera)"
              @error="onVideoError(camera)"
            >
              <source :src="getStreamUrl(camera.streamUrl)" type="application/x-mpegURL">
              Your browser does not support the video tag.
            </video>
            
            <!-- Fallback mock display for demo streams -->
            <div v-else class="absolute inset-0 flex items-center justify-center">
              <div class="text-center">
                <svg class="w-16 h-16 text-white mb-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
                <p class="text-white text-sm">{{ isRealStream(camera.streamUrl) ? 'Loading Stream...' : 'Demo Feed' }}</p>
                <p class="text-gray-300 text-xs break-all px-4">{{ camera.streamUrl }}</p>
                <!-- Live indicator -->
                <div class="flex items-center justify-center mt-2">
                  <div class="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2"></div>
                  <span class="text-red-400 text-xs font-medium">LIVE</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Camera offline state -->
          <div v-else class="absolute inset-0 flex items-center justify-center">
            <div class="text-center">
              <svg class="w-16 h-16 text-gray-500 mb-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636"></path>
              </svg>
              <p class="text-gray-500 text-sm">Camera Offline</p>
            </div>
          </div>
          
          <!-- Camera status overlay -->
          <div class="absolute top-3 left-3">
            <div 
              class="px-2 py-1 rounded-full text-xs font-medium"
              :class="{
                'bg-green-100 text-green-800': camera.isActive,
                'bg-red-100 text-red-800': !camera.isActive
              }"
            >
              {{ camera.isActive ? 'Online' : 'Offline' }}
            </div>
          </div>
          
          <!-- Fullscreen button -->
          <button 
            v-if="camera.isActive"
            @click="toggleFullscreen(camera)"
            class="absolute top-3 right-3 p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-75 transition-all"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path>
            </svg>
          </button>
        </div>
        
        <div class="p-4">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-medium text-gray-900">{{ camera.name }}</h3>
              <p class="text-sm text-gray-500">{{ camera.location }}</p>
            </div>
            <div class="flex items-center space-x-2">
              <button
                @click="toggleCamera(camera)"
                :disabled="isLoading"
                class="px-3 py-1 text-xs font-medium rounded-full transition-colors"
                :class="{
                  'bg-red-100 text-red-800 hover:bg-red-200': camera.isActive,
                  'bg-green-100 text-green-800 hover:bg-green-200': !camera.isActive
                }"
              >
                {{ camera.isActive ? 'Stop' : 'Start' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Fullscreen Modal -->
    <div 
      v-if="fullscreenCamera" 
      class="fixed inset-0 z-50 bg-black"
      @click="closeFullscreen"
    >
      <div class="relative w-full h-full flex items-center justify-center">
        <button 
          @click="closeFullscreen"
          class="absolute top-4 right-4 z-10 p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-75 transition-all"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        
        <div class="w-full max-w-6xl aspect-video bg-gray-900 flex items-center justify-center">
          <div class="text-center">
            <svg class="w-24 h-24 text-white mb-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
            </svg>
            <h3 class="text-xl font-medium text-white mb-2">{{ fullscreenCamera.name }}</h3>
            <p class="text-gray-300">{{ fullscreenCamera.location }}</p>
            <div class="flex items-center justify-center mt-4">
              <div class="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-2"></div>
              <span class="text-red-400 font-medium">LIVE</span>
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
import type { CameraStream } from '@/types'

const dataStore = useStoreDataStore()
const isLoading = ref(false)
const fullscreenCamera = ref<CameraStream | null>(null)

// Check if stream URL is a real camera stream vs demo
const isRealStream = (streamUrl: string): boolean => {
  return !streamUrl.includes('demo-stream-url') && 
         (streamUrl.startsWith('rtsp://') || 
          streamUrl.startsWith('http://') || 
          streamUrl.startsWith('https://'))
}

// Convert RTSP to viewable format (this would typically be handled by a media server)
const getStreamUrl = (rtspUrl: string): string => {
  // In a real implementation, you would:
  // 1. Use a media server (like Node Media Server, FFmpeg) to convert RTSP to HLS
  // 2. Or use WebRTC for real-time streaming
  // 3. Or use a service like Wowza, Ant Media Server, etc.
  
  // For now, return the URL as-is (would need media server conversion)
  if (rtspUrl.includes('[CAMERA_IP]')) {
    // Placeholder - user needs to replace with actual IP
    return rtspUrl
  }
  
  // Convert RTSP to HLS format (example)
  // This assumes you have a media server converting RTSP to HLS
  if (rtspUrl.startsWith('rtsp://')) {
    const cameraIP = extractIPFromRTSP(rtspUrl)
    return `http://${cameraIP}:8080/hls/stream.m3u8` // Example HLS endpoint
  }
  
  return rtspUrl
}

const extractIPFromRTSP = (rtspUrl: string): string => {
  const match = rtspUrl.match(/rtsp:\/\/([^\/]+)/)
  return match ? match[1] : 'localhost'
}

const onVideoLoadStart = (camera: CameraStream) => {
  console.log(`Loading video stream for ${camera.name}`)
}

const onVideoError = (camera: CameraStream) => {
  console.error(`Failed to load video stream for ${camera.name}`)
  // Could show error state or fallback content
}

const activeCamerasCount = computed(() => 
  dataStore.cameras.filter(camera => camera.isActive).length
)

const inactiveCamerasCount = computed(() => 
  dataStore.cameras.filter(camera => !camera.isActive).length
)

const toggleCamera = async (camera: CameraStream) => {
  isLoading.value = true
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // Toggle camera status
  camera.isActive = !camera.isActive
  
  isLoading.value = false
}

const toggleFullscreen = (camera: CameraStream) => {
  fullscreenCamera.value = camera
}

const closeFullscreen = () => {
  fullscreenCamera.value = null
}
</script>
