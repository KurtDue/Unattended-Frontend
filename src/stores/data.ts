import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Sensor, Alert, Incident, CameraStream, Statistics } from '@/types'

export const useStoreDataStore = defineStore('storeData', () => {
  const sensors = ref<Sensor[]>([])
  const alerts = ref<Alert[]>([])
  const incidents = ref<Incident[]>([])
  const cameras = ref<CameraStream[]>([])
  const statistics = ref<Statistics | null>(null)
  const isLoading = ref(false)
  
  // Mock data for development
  const mockSensors: Sensor[] = [
    {
      id: 1,
      name: 'Main Door Lock',
      type: 'door_lock',
      status: 'active',
      value: 'locked',
      location: 'Entrance',
      lastUpdate: new Date().toISOString(),
    },
    {
      id: 2,
      name: 'Fridge Temperature',
      type: 'temperature',
      status: 'active',
      value: 2.5,
      unit: '°C',
      location: 'Cold Storage',
      lastUpdate: new Date().toISOString(),
      thresholds: {
        min: 0,
        max: 4,
        warningThreshold: 3.5,
        criticalThreshold: 5,
      },
    },
    {
      id: 3,
      name: 'Freezer Temperature',
      type: 'temperature',
      status: 'active',
      value: -18.2,
      unit: '°C',
      location: 'Freezer',
      lastUpdate: new Date().toISOString(),
      thresholds: {
        min: -25,
        max: -15,
        warningThreshold: -12,
        criticalThreshold: -10,
      },
    },
    {
      id: 4,
      name: 'Room Temperature',
      type: 'temperature',
      status: 'active',
      value: 22.1,
      unit: '°C',
      location: 'Store Floor',
      lastUpdate: new Date().toISOString(),
      thresholds: {
        min: 18,
        max: 25,
        warningThreshold: 26,
        criticalThreshold: 28,
      },
    },
    {
      id: 5,
      name: 'Emergency Exit',
      type: 'door_sensor',
      status: 'active',
      value: 'closed',
      location: 'Emergency Exit',
      lastUpdate: new Date().toISOString(),
    },
  ]
  
  const mockAlerts: Alert[] = [
    {
      id: 1,
      type: 'warning',
      title: 'Door Open Too Long',
      message: 'Main entrance door has been open for more than 30 seconds',
      timestamp: new Date(Date.now() - 300000).toISOString(), // 5 minutes ago
      acknowledged: false,
      source: 'door',
      storeId: 1,
    },
    {
      id: 2,
      type: 'critical',
      title: 'Temperature Alert',
      message: 'Fridge temperature is above threshold (5.2°C)',
      timestamp: new Date(Date.now() - 900000).toISOString(), // 15 minutes ago
      acknowledged: false,
      source: 'temperature',
      storeId: 1,
    },
  ]
  
  const mockIncidents: Incident[] = [
    {
      id: 1,
      title: 'Customer Complaint',
      description: 'Customer reported product quality issue with dairy section',
      type: 'customer',
      severity: 'medium',
      status: 'investigating',
      timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
      storeId: 1,
    },
    {
      id: 2,
      title: 'Suspicious Activity Detected',
      description: 'AI detected potential shoplifting behavior near electronics section',
      type: 'ai_detection',
      severity: 'high',
      status: 'open',
      timestamp: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
      storeId: 1,
    },
  ]
  
  const mockCameras: CameraStream[] = [
    {
      id: 1,
      name: 'Entrance Camera (HLS)',
      location: 'Main Entrance',
      streamUrl: 'https://mediamtx-vm.northeurope.cloudapp.azure.com/cam1/index.m3u8',
      isActive: true,
      storeId: 1,
    },
    {
      id: 2,
      name: 'Store Floor Overview (HLS)',
      location: 'Center Ceiling',
      streamUrl: 'https://mediamtx-vm.northeurope.cloudapp.azure.com/cam2/index.m3u8',
      isActive: true,
      storeId: 1,
    },
    {
      id: 3,
      name: 'Cash Register Area (HLS)',
      location: 'Checkout',
      streamUrl: 'https://mediamtx-vm.northeurope.cloudapp.azure.com/cam3/index.m3u8',
      isActive: true,
      storeId: 1,
    },
    {
      id: 4,
      name: 'Storage Room (HLS)',
      location: 'Back Storage',
      streamUrl: 'https://mediamtx-vm.northeurope.cloudapp.azure.com/cam4/index.m3u8',
      isActive: true,
      storeId: 1,
    },
  ]
  
  const mockStatistics: Statistics = {
    totalSales: 15420.50,
    todayVisitors: 142,
    averageTemperature: 22.1,
    systemUptime: '99.8%',
    alertsCount: {
      total: 12,
      acknowledged: 8,
      pending: 4,
    },
    incidentsCount: {
      total: 7,
      open: 2,
      resolved: 5,
    },
  }
  
  function loadMockData() {
    sensors.value = mockSensors
    alerts.value = mockAlerts
    incidents.value = mockIncidents
    cameras.value = mockCameras
    statistics.value = mockStatistics
  }
  
  function acknowledgeAlert(alertId: number) {
    const alert = alerts.value.find(a => a.id === alertId)
    if (alert) {
      alert.acknowledged = true
    }
  }
  
  function updateIncidentStatus(incidentId: number, status: 'open' | 'investigating' | 'resolved') {
    const incident = incidents.value.find(i => i.id === incidentId)
    if (incident) {
      incident.status = status
      if (status === 'resolved') {
        incident.resolvedAt = new Date().toISOString()
      }
    }
  }
  
  return {
    sensors,
    alerts,
    incidents,
    cameras,
    statistics,
    isLoading,
    loadMockData,
    acknowledgeAlert,
    updateIncidentStatus,
  }
})
