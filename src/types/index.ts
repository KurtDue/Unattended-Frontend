// Types and interfaces for the Unattended Store application

export interface User {
  id: number;
  username: string;
  role: string;
  stores: Store[];
}

export interface Store {
  id: number;
  name: string;
  displayName: string;
  location?: string;
  address?: string;
  postalCode?: string;
  city?: string;
  country?: string;
  coordinates?: {
    latitude: number | null;
    longitude: number | null;
  };
  isActive: boolean;
}

export interface AuthState {
  user: User | null;
  selectedStore: Store | null;
  isAuthenticated: boolean;
  token: string | null;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface Sensor {
  id: number;
  name: string;
  type: 'door_lock' | 'time_lock' | 'temperature' | 'door_sensor';
  status: 'active' | 'inactive' | 'error';
  value: number | string;
  unit?: string;
  location: string;
  lastUpdate: string;
  thresholds?: {
    min?: number;
    max?: number;
    warningThreshold?: number;
    criticalThreshold?: number;
  };
}

export interface Alert {
  id: number;
  type: 'warning' | 'critical' | 'info';
  title: string;
  message: string;
  timestamp: string;
  acknowledged: boolean;
  source: string; // e.g., 'printer', 'door', 'temperature'
  storeId: number;
}

export interface Incident {
  id: number;
  title: string;
  description: string;
  type: 'customer' | 'ai_detection';
  severity: 'low' | 'medium' | 'high';
  status: 'open' | 'investigating' | 'resolved';
  timestamp: string;
  resolvedAt?: string;
  assignedTo?: string;
  storeId: number;
}

export interface CameraStream {
  id: number;
  name: string;
  location: string;
  streamUrl: string;
  isActive: boolean;
  storeId: number;
}

export interface Statistics {
  totalSales: number;
  todayVisitors: number;
  averageTemperature: number;
  systemUptime: string;
  alertsCount: {
    total: number;
    acknowledged: number;
    pending: number;
  };
  incidentsCount: {
    total: number;
    open: number;
    resolved: number;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}
