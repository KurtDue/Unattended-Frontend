import axios, { type AxiosInstance } from 'axios'
import type { LoginCredentials, ApiResponse, User } from '@/types'

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token')
      localStorage.removeItem('selectedStore')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Authentication API
export const authApi = {
  async login(credentials: LoginCredentials): Promise<ApiResponse<{ user: User; token: string }>> {
    try {
      // Mock authentication for development
      if (credentials.username === 'osoadmin' && credentials.password === '4055123') {
        const mockResponse = {
          success: true,
          data: {
            user: {
              id: 1,
              username: 'admin',
              role: 'administrator',
              stores: [
                { 
                  id: 1, 
                  name: 'demostore1', 
                  displayName: 'Demo Store 1', 
                  isActive: true,
                  address: 'Storgata 15',
                  postalCode: '0104',
                  city: 'Oslo',
                  country: 'Norway',
                  location: 'Oslo, Norway',
                  coordinates: {
                    latitude: 59.913869,
                    longitude: 10.752245
                  }
                },
              ],
            },
            token: 'mock-jwt-token-' + Date.now(),
          },
        }
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500))
        return mockResponse
      }
      
      return {
        success: false,
        data: {} as any,
        error: 'Invalid credentials',
      }
    } catch (error) {
      return {
        success: false,
        data: {} as any,
        error: 'Network error',
      }
    }
  },
  
  async logout(): Promise<ApiResponse<void>> {
    try {
      // In a real app, this would call the API to invalidate the token
      return { success: true, data: undefined }
    } catch (error) {
      return {
        success: false,
        data: undefined,
        error: 'Logout failed',
      }
    }
  },
  
  async refreshToken(): Promise<ApiResponse<{ token: string }>> {
    try {
      const response = await api.post('/auth/refresh')
      return response.data
    } catch (error) {
      return {
        success: false,
        data: {} as any,
        error: 'Token refresh failed',
      }
    }
  },
}

// Store API
export const storeApi = {
  async getSensors(storeId: number) {
    const response = await api.get(`/stores/${storeId}/sensors`)
    return response.data
  },
  
  async getAlerts(storeId: number) {
    const response = await api.get(`/stores/${storeId}/alerts`)
    return response.data
  },
  
  async getIncidents(storeId: number) {
    const response = await api.get(`/stores/${storeId}/incidents`)
    return response.data
  },
  
  async getCameras(storeId: number) {
    const response = await api.get(`/stores/${storeId}/cameras`)
    return response.data
  },
  
  async getStatistics(storeId: number) {
    const response = await api.get(`/stores/${storeId}/statistics`)
    return response.data
  },
}

export default api
