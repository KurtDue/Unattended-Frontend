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
            <!-- WebRTC Video Player -->
            <video 
              v-if="isWebRTCStream(camera.streamUrl)"
              :data-camera-id="camera.id"
              class="w-full h-full object-cover bg-black"
              autoplay 
              muted 
              playsinline
              controls
            ></video>
            
            <!-- HLS Video Player -->
            <video 
              v-else-if="isHLSStream(camera.streamUrl)"
              :data-camera-id="camera.id"
              class="w-full h-full object-cover bg-black"
              autoplay 
              muted 
              playsinline
              controls
            ></video>
            
            <!-- Loading indicator for WebRTC/HLS streams -->
            <div 
              v-if="(isWebRTCStream(camera.streamUrl) || isHLSStream(camera.streamUrl)) && loadingStates.get(camera.id)"
              class="absolute inset-0 flex items-center justify-center bg-gray-900 z-10"
            >
              <div class="text-center">
                <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-2"></div>
                <p class="text-white text-sm">Connecting to {{ isWebRTCStream(camera.streamUrl) ? 'WebRTC' : 'HLS' }} stream...</p>
                <p class="text-gray-400 text-xs mt-2 px-4 break-all">{{ camera.streamUrl }}</p>
              </div>
            </div>
            
            <!-- Fallback mock display for demo streams -->
            <div v-else-if="!isWebRTCStream(camera.streamUrl) && !isHLSStream(camera.streamUrl)" class="absolute inset-0 flex items-center justify-center">
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
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useStoreDataStore } from '@/stores/data'
import type { CameraStream } from '@/types'
import Hls from 'hls.js'

const dataStore = useStoreDataStore()
const isLoading = ref(false)
const fullscreenCamera = ref<CameraStream | null>(null)
const hlsInstances = ref<Map<number, Hls>>(new Map())
const webrtcConnections = ref<Map<number, RTCPeerConnection>>(new Map())
const loadingStates = ref<Map<number, boolean>>(new Map())

// Enhanced stream detection functions
const isRealStream = (streamUrl: string): boolean => {
  return !streamUrl.includes('demo-stream-url')
}

const isMJPEGStream = (streamUrl: string): boolean => {
  return streamUrl.includes('mjpeg') || 
         streamUrl.includes('.mjpg') || 
         streamUrl.includes('video.cgi')
}

const isSnapshotURL = (streamUrl: string): boolean => {
  return streamUrl.includes('snapshot') || 
         streamUrl.includes('.jpg') || 
         streamUrl.includes('.jpeg') || 
         streamUrl.includes('currentpic')
}
const isHLSStream = (streamUrl: string): boolean => {
  return streamUrl.includes('.m3u8') || streamUrl.includes('hls')
}
const isWebRTCStream = (streamUrl: string): boolean => {
  return streamUrl.includes(':8889') || streamUrl.toLowerCase().includes('webrtc')
}
const isVideoStream = (streamUrl: string): boolean => {
  return streamUrl.includes('.m3u8') || 
         streamUrl.includes('.mp4') || 
         streamUrl.startsWith('rtsp://')
}

const getStreamTypeLabel = (streamUrl: string): string => {
  if (isMJPEGStream(streamUrl)) return 'MJPEG Stream'
  if (isSnapshotURL(streamUrl)) return 'Snapshot Feed'
  if (isVideoStream(streamUrl)) return 'Video Stream'
  if (isRealStream(streamUrl)) return 'Loading Stream...'
  return 'Demo Feed'
}

// Auto-refresh snapshots every 1 second
const snapshotRefreshInterval = ref<number | null>(null)
const getSnapshotUrl = (baseUrl: string): string => {
  // Add timestamp to prevent caching
  const separator = baseUrl.includes('?') ? '&' : '?'
  return `${baseUrl}${separator}t=${Date.now()}`
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

const onImageLoad = (camera: CameraStream) => {
  console.log(`Image loaded for ${camera.name}`)
}

const onImageError = (camera: CameraStream) => {
  console.error(`Failed to load image for ${camera.name}`)
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

const initializeHLSPlayer = async (camera: CameraStream) => {
  if (!isHLSStream(camera.streamUrl)) {
    console.log(`Camera ${camera.id} is not HLS stream, skipping`)
    return
  }
  
  console.log(`Initializing HLS player for camera ${camera.id}: ${camera.streamUrl}`)
  loadingStates.value.set(camera.id, true)
  
  // Wait for DOM to be ready
  await nextTick()
  await new Promise(resolve => setTimeout(resolve, 100))
  
  const videoElement = document.querySelector(`video[data-camera-id="${camera.id}"]`) as HTMLVideoElement
  if (!videoElement) {
    console.error(`Video element not found for camera ${camera.id}`)
    loadingStates.value.set(camera.id, false)
    return
  }
  
  console.log(`Found video element for camera ${camera.id}`)
  
  // Clean up existing instance if any
  if (hlsInstances.value.has(camera.id)) {
    console.log(`Cleaning up existing HLS instance for camera ${camera.id}`)
    hlsInstances.value.get(camera.id)?.destroy()
    hlsInstances.value.delete(camera.id)
  }
  
  if (Hls.isSupported()) {
    console.log(`HLS.js is supported, creating instance for camera ${camera.id}`)
    const hls = new Hls({
      enableWorker: true,
      lowLatencyMode: true,
      backBufferLength: 90,
      debug: false,
      xhrSetup: (xhr, url) => {
        console.log(`Loading HLS segment: ${url}`)
      }
    })
    
    hls.loadSource(camera.streamUrl)
    hls.attachMedia(videoElement)
    
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      console.log(`✅ HLS manifest parsed successfully for ${camera.name}`)
      loadingStates.value.set(camera.id, false)
      videoElement.play().catch(e => {
        console.log('Autoplay prevented, user interaction required:', e)
      })
    })
    
    hls.on(Hls.Events.FRAG_LOADED, () => {
      console.log(`Fragment loaded for camera ${camera.id}`)
    })
    
    hls.on(Hls.Events.ERROR, (event, data) => {
      console.error(`❌ HLS Error for camera ${camera.id}:`, data)
      
      if (data.fatal) {
        loadingStates.value.set(camera.id, false)
        switch(data.type) {
          case Hls.ErrorTypes.NETWORK_ERROR:
            console.log('Network error, trying to recover...')
            hls.startLoad()
            break
          case Hls.ErrorTypes.MEDIA_ERROR:
            console.log('Media error, trying to recover...')
            hls.recoverMediaError()
            break
          default:
            console.error('Fatal error, cannot recover')
            hls.destroy()
            hlsInstances.value.delete(camera.id)
            break
        }
      }
    })
    
    hlsInstances.value.set(camera.id, hls)
  } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
    // Native HLS support (Safari)
    console.log(`Using native HLS support for camera ${camera.id}`)
    videoElement.src = camera.streamUrl
    videoElement.addEventListener('loadedmetadata', () => {
      console.log(`✅ Native HLS loaded for ${camera.name}`)
      loadingStates.value.set(camera.id, false)
    })
    videoElement.play().catch(e => {
      console.log('Autoplay prevented:', e)
      loadingStates.value.set(camera.id, false)
    })
  } else {
    console.error('HLS not supported in this browser')
    loadingStates.value.set(camera.id, false)
  }
}

const initializeWebRTCPlayer = async (camera: CameraStream) => {
  if (!isWebRTCStream(camera.streamUrl)) {
    console.log(`Camera ${camera.id} is not WebRTC stream, skipping`)
    return
  }
  
  console.log(`Initializing WebRTC player for camera ${camera.id}: ${camera.streamUrl}`)
  loadingStates.value.set(camera.id, true)
  
  // Wait for DOM to be ready
  await nextTick()
  await new Promise(resolve => setTimeout(resolve, 100))
  
  const videoElement = document.querySelector(`video[data-camera-id="${camera.id}"]`) as HTMLVideoElement
  if (!videoElement) {
    console.error(`Video element not found for camera ${camera.id}`)
    loadingStates.value.set(camera.id, false)
    return
  }
  
  console.log(`Found video element for camera ${camera.id}`)
  
  // Clean up existing connection if any
  if (webrtcConnections.value.has(camera.id)) {
    console.log(`Cleaning up existing WebRTC connection for camera ${camera.id}`)
    webrtcConnections.value.get(camera.id)?.close()
    webrtcConnections.value.delete(camera.id)
  }
  
  try {
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
      bundlePolicy: 'max-bundle'
    })
    
    pc.ontrack = (event) => {
      console.log(`✅ WebRTC track received for ${camera.name}`)
      videoElement.srcObject = event.streams[0]
      loadingStates.value.set(camera.id, false)
      videoElement.play().catch(e => {
        console.log('Autoplay prevented:', e)
      })
    }
    
    pc.oniceconnectionstatechange = () => {
      console.log(`WebRTC ICE state for camera ${camera.id}: ${pc.iceConnectionState}`)
      if (pc.iceConnectionState === 'failed' || pc.iceConnectionState === 'disconnected') {
        console.error(`WebRTC connection failed for camera ${camera.id}`)
        loadingStates.value.set(camera.id, false)
      }
    }
    
    // Add transceiver for receiving video
    pc.addTransceiver('video', { direction: 'recvonly' })
    pc.addTransceiver('audio', { direction: 'recvonly' })
    
    // Create offer
    const offer = await pc.createOffer()
    await pc.setLocalDescription(offer)
    
    // Send offer to MediaMTX server
    const response = await fetch(camera.streamUrl + '/whep', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/sdp',
      },
      body: offer.sdp
    })
    
    if (!response.ok) {
      throw new Error(`Failed to connect to WebRTC stream: ${response.status} ${response.statusText}`)
    }
    
    const answerSdp = await response.text()
    await pc.setRemoteDescription(new RTCSessionDescription({
      type: 'answer',
      sdp: answerSdp
    }))
    
    console.log(`✅ WebRTC connection established for ${camera.name}`)
    webrtcConnections.value.set(camera.id, pc)
    
  } catch (error) {
    console.error(`❌ WebRTC error for camera ${camera.id}:`, error)
    loadingStates.value.set(camera.id, false)
  }
}

onMounted(async () => {
  console.log('MonitoringView mounted, cameras:', dataStore.cameras)
  
  // Wait a bit for DOM to be fully ready
  await nextTick()
  await new Promise(resolve => setTimeout(resolve, 200))
  
  // Initialize players for all active cameras
  for (const camera of dataStore.cameras) {
    if (camera.isActive) {
      if (isHLSStream(camera.streamUrl)) {
        await initializeHLSPlayer(camera)
      } else if (isWebRTCStream(camera.streamUrl)) {
        await initializeWebRTCPlayer(camera)
      }
    }
  }
})

// Watch for camera changes and reinitialize if needed
watch(() => dataStore.cameras, async (newCameras) => {
  console.log('Cameras changed, reinitializing players')
  for (const camera of newCameras) {
    if (camera.isActive) {
      if (isHLSStream(camera.streamUrl) && !hlsInstances.value.has(camera.id)) {
        await initializeHLSPlayer(camera)
      } else if (isWebRTCStream(camera.streamUrl) && !webrtcConnections.value.has(camera.id)) {
        await initializeWebRTCPlayer(camera)
      }
    }
  }
}, { deep: true })

onUnmounted(() => {
  console.log('Cleaning up media instances')
  // Clean up all HLS instances
  hlsInstances.value.forEach(hls => hls.destroy())
  hlsInstances.value.clear()
  
  // Clean up all WebRTC connections
  webrtcConnections.value.forEach(pc => pc.close())
  webrtcConnections.value.clear()
  
  loadingStates.value.clear()
})
</script>
