<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { useAuthStore } from './stores/auth'
import { useStoreDataStore } from './stores/data'

const authStore = useAuthStore()
const dataStore = useStoreDataStore()

onMounted(() => {
  // Initialize auth from localStorage
  authStore.initializeFromStorage()
  
  // Load mock data for development
  dataStore.loadMockData()
})
</script>

<style scoped>
#app {
  min-height: 100vh;
}
</style>
