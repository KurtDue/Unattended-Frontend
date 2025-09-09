import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { AuthState, User, Store, LoginCredentials } from '@/types'
import { authApi } from '@/services/api'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const selectedStore = ref<Store | null>(null)
  const token = ref<string | null>(localStorage.getItem('token'))
  
  const isAuthenticated = computed(() => !!user.value && !!token.value)
  const hasMultipleStores = computed(() => user.value?.stores && user.value.stores.length > 1)
  
  async function login(credentials: LoginCredentials): Promise<boolean> {
    try {
      const response = await authApi.login(credentials)
      if (response.success) {
        user.value = response.data.user
        token.value = response.data.token
        localStorage.setItem('token', response.data.token)
        
        // If user has only one store, automatically select it
        if (user.value.stores.length === 1) {
          selectedStore.value = user.value.stores[0]
          localStorage.setItem('selectedStore', JSON.stringify(selectedStore.value))
        }
        
        return true
      }
      return false
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  }
  
  function selectStore(store: Store) {
    selectedStore.value = store
    localStorage.setItem('selectedStore', JSON.stringify(store))
  }
  
  function logout() {
    user.value = null
    selectedStore.value = null
    token.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('selectedStore')
  }
  
  function initializeFromStorage() {
    const storedToken = localStorage.getItem('token')
    const storedStore = localStorage.getItem('selectedStore')
    
    if (storedToken) {
      token.value = storedToken
    }
    
    if (storedStore) {
      try {
        selectedStore.value = JSON.parse(storedStore)
      } catch (error) {
        console.error('Error parsing stored store:', error)
      }
    }
  }
  
  return {
    user,
    selectedStore,
    token,
    isAuthenticated,
    hasMultipleStores,
    login,
    selectStore,
    logout,
    initializeFromStorage
  }
})
