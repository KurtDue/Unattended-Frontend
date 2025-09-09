<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-2xl mx-auto">
      <div class="text-center">
        <h2 class="text-3xl font-extrabold text-gray-900">
          Select Store
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          Welcome {{ authStore.user?.username }}! Choose which store to manage.
        </p>
      </div>

      <div class="mt-8 grid gap-6 sm:grid-cols-2">
        <div
          v-for="store in authStore.user?.stores"
          :key="store.id"
          @click="selectStore(store)"
          class="cursor-pointer group relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
        >
          <div class="flex-shrink-0">
            <div class="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <svg class="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
            </div>
          </div>
          <div class="flex-1 min-w-0">
            <span class="absolute inset-0" aria-hidden="true"></span>
            <p class="text-sm font-medium text-gray-900">
              {{ store.displayName }}
            </p>
            <p class="text-sm text-gray-500 truncate">
              ID: {{ store.name }}
            </p>
            <p class="text-xs text-gray-400">
              {{ store.location || 'No location specified' }}
            </p>
          </div>
          <div class="flex-shrink-0">
            <div class="h-2 w-2 rounded-full" :class="store.isActive ? 'bg-green-400' : 'bg-red-400'"></div>
          </div>
        </div>
      </div>

      <div class="mt-8 flex justify-center">
        <button
          @click="logout"
          class="text-sm text-gray-500 hover:text-gray-700 underline"
        >
          Sign out
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import type { Store } from '@/types'

const router = useRouter()
const authStore = useAuthStore()

const selectStore = (store: Store) => {
  authStore.selectStore(store)
  router.push('/dashboard')
}

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>
