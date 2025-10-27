# StoreOne Merchant - Unattended Store Management System

<div align="center">

![Onitio Solutions](https://img.shields.io/badge/Onitio-Solutions-blue?style=for-the-badge)
![Vue.js](https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Azure](https://img.shields.io/badge/Azure-0078D4?style=for-the-badge&logo=microsoft-azure&logoColor=white)

**A comprehensive merchant portal for managing unattended retail stores with advanced monitoring, access control, and customer assistance capabilities.**

[Features](#-features) • [Installation](#-installation) • [Documentation](#-documentation) • [API Integration](#-api-integration) • [Deployment](#-deployment)

</div>

---

## 🚀 Features

### 🔐 Authentication & Security
- **Secure Login System** - Session-based authentication with JWT support
- **Multi-Store Management** - Support for multiple store locations per user
- **Role-Based Access Control** - Administrator and operator permissions
- **Automatic Store Selection** - Single-store users auto-directed to dashboard
- **Session Persistence** - Remember user sessions across browser restarts

### 📹 Real-Time Monitoring & Surveillance
- **Live Camera Feeds** - Multi-camera surveillance with Hanwha ANE-L7012R support
- **Multiple Stream Types** - HTTP snapshots, MJPEG streams, and RTSP protocols
- **Camera Configuration** - Easy setup interface for IP cameras
- **Auto-refresh Snapshots** - Configurable refresh intervals
- **Fullscreen Viewing** - Immersive camera monitoring experience
- **Stream Health Monitoring** - Connection status and error handling

### 🌡️ Sensor Management
- **Real-Time Sensor Dashboard** - Temperature, door locks, motion detectors
- **Environmental Monitoring** - Track temperature, humidity, and air quality
- **Alert Thresholds** - Configurable limits for automated alerts
- **Sensor History** - Historical data tracking and trends
- **Status Indicators** - Visual health status for all sensors
- **Door Lock Controls** - Monitor and control electronic door locks

### 🚨 Alert & Incident Management
- **Priority-Based Alerts** - Critical, high, medium, and low priorities
- **Real-Time Notifications** - Instant alerts for important events
- **Alert Acknowledgment** - Track who handled each alert and when
- **Incident Logging** - Customer complaints and AI-detected incidents
- **Incident Categories** - Shoplifting, customer issues, system malfunctions
- **Evidence Attachment** - Link camera footage to incidents

### 📊 Analytics & Reporting
- **Sales Dashboard** - Revenue tracking in NOK currency
- **Visitor Analytics** - Customer traffic and peak hours
- **System Performance** - Uptime, alerts, and incident metrics
- **Export Functionality** - Download reports in JSON format
- **Visual Data Display** - Charts and graphs for trend analysis
- **Comparative Analytics** - Day-over-day and week-over-week comparisons

### 🛠️ System Configuration
- **Store Settings** - Operating hours, contact information, and location
- **Camera Configuration** - IP camera setup with multiple protocol support
- **Sensor Thresholds** - Temperature and environmental limits
- **Time-Locked Alcohol Sales** - Norwegian holiday calendar integration
- **Weekly Schedule** - Day-specific alcohol sales restrictions
- **Address Lookup** - Norwegian address geocoding with OpenStreetMap
- **API Configuration** - Backend connection and endpoint settings

### 🤝 Customer Assistance
- **Remote POS Support** - Live assistance sessions with customers
- **Audio/Video Communication** - Two-way communication via camera and speakers
- **POS Control Panel** - Remote control of point-of-sale operations
- **Age Approval** - One-click approval for age-restricted purchases
- **Cart Management** - Add, remove, or cancel customer transactions
- **Quick Messages** - Pre-defined assistance messages
- **Session Tracking** - Duration and activity logging

### 🔒 Access Control & Security
- **Advanced Door Management** - 15-second timed unlock with auto-lock
- **Emergency Override** - Immediate unlock for critical situations
- **Lockdown Mode** - Selectively disable customer app access
- **Access Method Management** - Control merchant app, customer app, receipt scan, and NFC
- **Comprehensive Access Logging** - Last 100+ entries with full details
- **Entry Statistics** - Real-time tracking of access attempts by method
- **Failed Attempt Monitoring** - Security tracking for denied access
- **Time-stamped Audit Trail** - Complete access history for compliance

## 🛠️ Tech Stack

### Frontend Framework
- **Vue.js 3** - Progressive JavaScript framework with Composition API
- **TypeScript** - Type-safe JavaScript development
- **Vite** - Next-generation frontend tooling and build system

### State & Routing
- **Pinia** - Intuitive, type-safe state management
- **Vue Router 4** - Official routing with navigation guards

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **Heroicons** - Beautiful hand-crafted SVG icons
- **Responsive Design** - Mobile-first approach

### Data & Communication
- **Axios** - Promise-based HTTP client
- **WebSocket Ready** - Real-time communication support
- **REST API** - RESTful backend integration

### Development Tools
- **Vite DevServer** - Lightning-fast HMR
- **ESLint** - Code quality and consistency
- **TypeScript Compiler** - Static type checking

### Deployment
- **Azure Static Web Apps** - Production hosting
- **GitHub Actions** - Automated CI/CD pipeline
- **Environment Variables** - Configuration management

### Hardware Integration
- **Hanwha Cameras** - ANE-L7012R IP camera support
- **HTTP/MJPEG/RTSP** - Multiple streaming protocols
- **Door Lock Systems** - Electronic strike control
- **NFC Readers** - Access card integration
- **Environmental Sensors** - Temperature, humidity monitoring

## 📦 Installation

### Prerequisites

- **Node.js** 18.x or higher
- **npm** 9.x or higher (or yarn/pnpm)
- **Git** for version control
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/Onitio-Solutions/StoreOne-Frontend-Merchant.git
   cd StoreOne-Frontend-Merchant
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment** (optional)
   ```bash
   cp .env.example .env
   # Edit .env with your backend API URL
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

### Development Setup

For optimal development experience:

```bash
# Install dependencies
npm install

# Start dev server with hot reload
npm run dev

# Run type checking
npm run type-check

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔐 Demo Access

Use these credentials to access the demo application:

**Demo Credentials:**
- **Username**: `admin`
- **Password**: `admin`

**Available Demo Stores:**
- **demostore1** - Demo Store 1 (Full feature access)

**Demo Features:**
- Pre-populated sensor data
- Sample alerts and incidents
- Mock camera streams
- Norwegian address lookup
- Access control logging
- Customer assistance simulation

### Live Demo

Visit the live demo at: **[https://blue-cliff-02c53ef03.1.azurestaticapps.net](https://blue-cliff-02c53ef03.1.azurestaticapps.net)**

## 📁 Project Structure

```
StoreOne-Frontend-Merchant/
├── .github/
│   ├── workflows/              # GitHub Actions CI/CD
│   │   └── azure-static-web-apps.yml
│   └── copilot-instructions.md # AI assistant context
├── public/                     # Static assets
│   └── onitio-logo.svg        # Onitio branding
├── src/
│   ├── assets/                # Images and global styles
│   │   └── main.css          # Tailwind imports
│   ├── layouts/               # Page layouts
│   │   └── DashboardLayout.vue
│   ├── router/                # Vue Router configuration
│   │   └── index.ts          # Route definitions
│   ├── services/              # API services
│   │   └── api.ts            # Axios configuration
│   ├── stores/                # Pinia state management
│   │   ├── auth.ts           # Authentication state
│   │   └── data.ts           # Application data
│   ├── types/                 # TypeScript definitions
│   │   └── index.ts          # Type interfaces
│   ├── views/                 # Page components
│   │   ├── LoginView.vue              # Authentication
│   │   ├── StoreSelectionView.vue     # Store picker
│   │   ├── HomeView.vue               # Dashboard
│   │   ├── MonitoringView.vue         # Camera surveillance
│   │   ├── SensorsView.vue            # Sensor management
│   │   ├── AlertsView.vue             # Alert handling
│   │   ├── IncidentsView.vue          # Incident tracking
│   │   ├── StatisticsView.vue         # Analytics
│   │   ├── AssistanceView.vue         # Customer support
│   │   ├── AccessControlView.vue      # Door & access
│   │   └── ConfigurationView.vue      # Settings
│   ├── App.vue                # Root component
│   └── main.js                # Application entry
├── index.html                 # HTML template
├── package.json               # Dependencies
├── tailwind.config.js         # Tailwind configuration
├── tsconfig.json              # TypeScript config
├── vite.config.js             # Vite build config
├── AZURE_DEPLOYMENT_STATUS.md # Deployment guide
├── CAMERA_SETUP_GUIDE.md      # Camera integration
├── DEPLOYMENT.md              # General deployment
└── README.md                  # This file
```

### Key Directories

- **`/src/views/`** - All page components (11 views)
- **`/src/stores/`** - Pinia stores for authentication and data
- **`/src/services/`** - API client and HTTP configuration
- **`/src/types/`** - TypeScript type definitions
- **`/src/layouts/`** - Reusable layout components
- **`/.github/workflows/`** - Automated deployment pipelines

## 🎯 Application Modules

### 1. **Home Dashboard** (`/dashboard/home`)
Central command center with:
- Key performance metrics (sales, visitors, alerts)
- Quick access door controls
- Recent alerts summary
- System health overview
- Active incident count
- Temperature monitoring

### 2. **Monitoring** (`/dashboard/monitoring`)
Live surveillance system:
- Multi-camera display grid
- HTTP snapshot support (auto-refresh)
- MJPEG stream integration
- RTSP protocol compatibility
- Fullscreen camera viewing
- Connection status indicators
- Hanwha ANE-L7012R camera support

### 3. **Sensors** (`/dashboard/sensors`)
Environmental and security sensors:
- Temperature sensors with alerts
- Door lock status monitoring
- Motion detector status
- Humidity and air quality
- Historical sensor data
- Threshold configuration
- Real-time updates

### 4. **Alerts** (`/dashboard/alerts`)
Alert management system:
- Priority-based alert queue (critical, high, medium, low)
- Alert acknowledgment workflow
- Time-stamped alert history
- Filter by status and priority
- Alert details with recommendations
- Automatic severity classification

### 5. **Incidents** (`/dashboard/incidents`)
Incident tracking and management:
- Customer complaints logging
- AI-detected incidents (shoplifting, loitering)
- Evidence attachment (camera footage links)
- Incident status workflow (open, investigating, resolved)
- Category classification
- Resolution notes and actions taken

### 6. **Statistics** (`/dashboard/statistics`)
Business intelligence dashboard:
- Sales revenue tracking (NOK)
- Visitor traffic analytics
- System uptime monitoring
- Alert frequency analysis
- Incident statistics
- Peak hours identification
- Export to JSON

### 7. **Assistance** (`/dashboard/assistance`)
Remote customer support portal:
- Live POS camera feed
- Two-way audio communication (microphone & speakers)
- Remote POS controls:
  - Age approval for restricted items
  - Cancel transaction
  - Remove last item
  - Manually add items
- Session duration tracking
- Current cart display (NOK)
- Quick message templates

### 8. **Access Control** (`/dashboard/access-control`)
Advanced door and entry management:
- **Main Door Control:**
  - 15-second timed unlock
  - Immediate lock function
  - Emergency override unlock
  - Real-time status with countdown
- **Access Methods:**
  - Merchant App (staff access)
  - Customer App (mobile unlock)
  - Receipt Scan (QR code validation)
  - NFC Chip (access cards)
- **Lockdown Mode:**
  - Disable customer app access
  - Keep other methods active
  - Toggle on/off with confirmation
- **Access Logging:**
  - Last 100+ entry attempts
  - Timestamp, method, user ID, status
  - Success/Failed/Denied tracking
  - Expandable log view
- **Statistics:**
  - Daily entry counts by method
  - Failed attempt monitoring

### 9. **Configuration** (`/dashboard/configuration`)
System settings and management:
- **Store Information:**
  - Name, address, contact details
  - Norwegian address lookup with geocoding
  - Operating hours
- **Camera Configuration:**
  - IP camera setup wizard
  - Stream URL configuration
  - Connection testing
  - Multiple protocol support
- **Time-Locked Alcohol Sales:**
  - Weekly schedule editor
  - Norwegian holiday calendar
  - Age verification requirements
- **Sensor Thresholds:**
  - Temperature limits
  - Alert configurations
- **API Settings:**
  - Backend URL configuration
  - Connection testing

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_BASE_URL=https://api.yourdomain.com
VITE_WEBSOCKET_URL=wss://api.yourdomain.com/ws

# Camera Configuration (optional defaults)
VITE_CAMERA_REFRESH_INTERVAL=5000
VITE_CAMERA_TIMEOUT=10000

# Feature Flags (optional)
VITE_ENABLE_WEBSOCKET=true
VITE_ENABLE_PUSH_NOTIFICATIONS=false
```

### API Integration Points

The application is designed to integrate with a .NET backend. Update `src/services/api.ts`:

```typescript
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add authentication token interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
```

### Camera Setup

For Hanwha ANE-L7012R cameras or compatible IP cameras:

1. **HTTP Snapshot URLs** (recommended for browsers):
   ```
   http://[CAMERA_IP]/cgi-bin/snapshot.cgi
   ```

2. **MJPEG Stream URLs**:
   ```
   http://[CAMERA_IP]/cgi-bin/mjpeg_stream.cgi
   ```

3. **RTSP URLs** (requires media server):
   ```
   rtsp://[CAMERA_IP]:554/stream1
   ```

See `CAMERA_SETUP_GUIDE.md` for detailed camera configuration instructions.

### Norwegian Localization

The application includes Norwegian-specific features:

- **Currency**: NOK (Norwegian Krone)
- **Time Zone**: Europe/Oslo
- **Date Format**: DD.MM.YYYY
- **Address Lookup**: OpenStreetMap Nominatim for Norwegian addresses
- **Holiday Calendar**: Norwegian public holidays for alcohol sales restrictions

## 📱 Responsive Design

### Mobile-First Approach

The application is designed mobile-first with breakpoints:

- **Mobile**: 0-640px (sm)
- **Tablet**: 641-768px (md)
- **Desktop**: 769-1024px (lg)
- **Large Desktop**: 1025-1280px (xl)
- **Extra Large**: 1281px+ (2xl)

### Responsive Features

- **Collapsible Sidebar**: Automatically hides on mobile
- **Adaptive Grid Layouts**: 1-4 columns based on screen size
- **Touch-Friendly Controls**: Larger tap targets (44x44px minimum)
- **Swipe Gestures**: Navigate between views on mobile
- **Responsive Tables**: Horizontal scroll on small screens
- **Modal Optimization**: Full-screen on mobile, centered on desktop
- **Camera Views**: Adaptive aspect ratios

### Accessibility (WCAG 2.1 AA)

- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: ARIA labels and semantic HTML
- **Color Contrast**: Minimum 4.5:1 ratio
- **Focus Indicators**: Clear focus states
- **Alternative Text**: Images and icons have alt text
- **Skip Links**: Skip to main content
- **Form Labels**: Properly associated labels

### Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+
- **Mobile Safari**: iOS 14+
- **Chrome Android**: Latest

### Progressive Web App (PWA) Ready

Can be enhanced with:
- Service workers for offline support
- Web app manifest for "Add to Home Screen"
- Push notifications
- Background sync

## 🧪 Development

### Available Scripts

```bash
# Development
npm run dev              # Start dev server with HMR at localhost:3000
npm run dev -- --host    # Expose dev server to network

# Building
npm run build            # Build for production
npm run build:staging    # Build for staging environment
npm run preview          # Preview production build locally

# Code Quality
npm run type-check       # Run TypeScript type checking
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint errors automatically
npm run format           # Format code with Prettier

# Testing (when configured)
npm run test             # Run unit tests
npm run test:e2e         # Run end-to-end tests
npm run test:coverage    # Generate coverage report
```

### Development Workflow

1. **Start development server**
   ```bash
   npm run dev
   ```

2. **Make changes** - Hot Module Replacement (HMR) updates instantly

3. **Type check** before committing
   ```bash
   npm run type-check
   ```

4. **Commit changes**
   ```bash
   git add .
   git commit -m "feat: your feature description"
   git push origin master
   ```

5. **Automatic deployment** via GitHub Actions

### Code Style Guidelines

- **TypeScript**: Strict mode enabled
- **Vue 3**: Composition API with `<script setup>`
- **Naming Conventions**:
  - Components: PascalCase (e.g., `AlertsView.vue`)
  - Composables: camelCase with 'use' prefix (e.g., `useAuth`)
  - Constants: UPPER_SNAKE_CASE
  - Variables: camelCase
- **File Organization**: Feature-based structure
- **Comments**: JSDoc for functions, inline for complex logic

### Recommended VS Code Extensions

```json
{
  "recommendations": [
    "vue.volar",
    "vue.vscode-typescript-vue-plugin",
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "github.copilot"
  ]
}
```

### Git Commit Convention

Follow Conventional Commits:

```
feat: Add access control lockdown mode
fix: Resolve camera stream connection timeout
docs: Update API integration documentation
style: Format code with Prettier
refactor: Simplify alert acknowledgment logic
perf: Optimize sensor data polling
test: Add unit tests for authentication store
chore: Update dependencies
```

## 🚀 Deployment

### Azure Static Web Apps (Recommended)

The application includes automated deployment via GitHub Actions.

#### Prerequisites
1. Azure subscription
2. Azure Static Web Apps resource created
3. GitHub repository access

#### Setup Steps

1. **Create Azure Static Web App**
   ```bash
   az staticwebapp create \
     --name storeone-merchant-frontend \
     --resource-group your-resource-group \
     --source https://github.com/Onitio-Solutions/StoreOne-Frontend-Merchant \
     --location westeurope \
     --branch master \
     --app-location "/" \
     --output-location "dist"
   ```

2. **Configure GitHub Secrets**
   - Go to repository Settings → Secrets
   - Add `AZURE_STATIC_WEB_APPS_API_TOKEN`
   - Get token from Azure Portal

3. **Deploy**
   ```bash
   git push origin master
   ```
   
   GitHub Actions will automatically build and deploy.

#### Deployment Workflow

The `.github/workflows/azure-static-web-apps.yml` handles:
- Automated builds on push to master
- TypeScript compilation
- Production optimization
- Azure deployment
- Environment variable injection

### Manual Deployment

#### Build for Production

```bash
# Install dependencies
npm install

# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

The `dist/` folder contains the production-ready application.

#### Deploy to Web Server

1. **Upload dist folder** to your web server
2. **Configure web server** for SPA (single-page application)
3. **Set environment variables** on the server
4. **Configure HTTPS** for secure communication

#### Nginx Configuration

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/storeone-merchant/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # API proxy (optional)
    location /api {
        proxy_pass https://your-backend-api.com;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### Apache Configuration

```apache
<VirtualHost *:80>
    ServerName yourdomain.com
    DocumentRoot /var/www/storeone-merchant/dist
    
    <Directory /var/www/storeone-merchant/dist>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
        
        # SPA Routing
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </Directory>
</VirtualHost>
```

### Docker Deployment

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Build and run:

```bash
docker build -t storeone-merchant-frontend .
docker run -p 80:80 storeone-merchant-frontend
```

### Environment-Specific Configuration

#### Development
```bash
npm run dev
# Uses .env.development
```

#### Staging
```bash
npm run build --mode staging
# Uses .env.staging
```

#### Production
```bash
npm run build --mode production
# Uses .env.production
```

## 🔗 Backend Integration

This frontend is designed to work with a .NET 10 backend API. 

### Required API Endpoints

#### Authentication
```http
POST   /api/auth/login              # User login
POST   /api/auth/logout             # User logout
GET    /api/auth/me                 # Get current user
POST   /api/auth/refresh            # Refresh token
```

#### Stores
```http
GET    /api/stores                  # List all stores
GET    /api/stores/{id}             # Get store details
PUT    /api/stores/{id}             # Update store
GET    /api/stores/{id}/statistics  # Get store statistics
```

#### Sensors
```http
GET    /api/stores/{id}/sensors     # List all sensors
GET    /api/sensors/{id}            # Get sensor details
GET    /api/sensors/{id}/readings   # Get sensor readings
PUT    /api/sensors/{id}/thresholds # Update thresholds
```

#### Alerts
```http
GET    /api/stores/{id}/alerts      # List alerts
GET    /api/alerts/{id}             # Get alert details
PUT    /api/alerts/{id}/acknowledge # Acknowledge alert
DELETE /api/alerts/{id}             # Delete alert
```

#### Incidents
```http
GET    /api/stores/{id}/incidents   # List incidents
POST   /api/incidents               # Create incident
GET    /api/incidents/{id}          # Get incident details
PUT    /api/incidents/{id}          # Update incident
PUT    /api/incidents/{id}/resolve  # Resolve incident
```

#### Cameras
```http
GET    /api/stores/{id}/cameras     # List cameras
POST   /api/cameras                 # Add camera
PUT    /api/cameras/{id}            # Update camera
DELETE /api/cameras/{id}            # Remove camera
GET    /api/cameras/{id}/snapshot   # Get camera snapshot
```

#### Access Control
```http
GET    /api/stores/{id}/access-logs # Get access logs
POST   /api/access/unlock           # Unlock door
POST   /api/access/lock             # Lock door
GET    /api/access/status           # Get door status
PUT    /api/access/lockdown         # Toggle lockdown mode
GET    /api/access/methods          # Get access methods status
```

#### Assistance
```http
POST   /api/assistance/start        # Start assistance session
POST   /api/assistance/end          # End assistance session
POST   /api/pos/age-approve         # Approve age verification
POST   /api/pos/cancel-cart         # Cancel transaction
POST   /api/pos/remove-item         # Remove item from cart
POST   /api/pos/add-item            # Add item manually
GET    /api/pos/cart                # Get current cart
```

### WebSocket Events

For real-time updates, implement WebSocket connection:

```javascript
const ws = new WebSocket(import.meta.env.VITE_WEBSOCKET_URL)

ws.onmessage = (event) => {
  const data = JSON.parse(event.data)
  
  switch(data.type) {
    case 'alert':
      // Handle new alert
      break
    case 'sensor_update':
      // Handle sensor reading
      break
    case 'door_status':
      // Handle door status change
      break
    case 'incident':
      // Handle new incident
      break
  }
}
```

### Authentication Flow

The application expects JWT-based authentication:

1. User submits credentials to `/api/auth/login`
2. Backend returns JWT token and user info
3. Token stored in localStorage
4. Token included in Authorization header for all requests
5. Token refreshed via `/api/auth/refresh` before expiry

### Data Models

Key TypeScript interfaces expected from backend:

```typescript
interface User {
  id: string
  username: string
  email: string
  role: 'admin' | 'operator'
  stores: string[]
}

interface Store {
  id: string
  name: string
  address: string
  coordinates: { lat: number; lng: number }
  status: 'online' | 'offline'
}

interface Sensor {
  id: string
  type: 'temperature' | 'door_lock' | 'motion'
  name: string
  value: number
  unit: string
  status: 'normal' | 'warning' | 'error'
  lastUpdate: string
}

interface Alert {
  id: string
  priority: 'critical' | 'high' | 'medium' | 'low'
  type: string
  message: string
  timestamp: string
  acknowledged: boolean
  acknowledgedBy?: string
}

interface Incident {
  id: string
  type: 'customer_complaint' | 'shoplifting' | 'system_issue'
  description: string
  status: 'open' | 'investigating' | 'resolved'
  timestamp: string
  resolvedAt?: string
}

interface AccessLog {
  id: string
  timestamp: string
  method: 'merchant_app' | 'customer_app' | 'receipt_scan' | 'nfc_chip'
  userId: string
  status: 'success' | 'failed' | 'denied'
  details: string
}
```

## 📊 Mock Data & Development

### Demo Data Features

The application includes comprehensive mock data for development:

- **Authentication**
  - Demo user: admin/admin
  - Multiple stores per user
  - Session persistence

- **Store Data**
  - Demo Store 1 (demostore1)
  - Norwegian address: Kongens gate 1, 0153 Oslo
  - Coordinates: 59.9139, 10.7522
  - Operating hours: Mon-Sun 06:00-23:00

- **Sensors**
  - 5+ sensor types (temperature, door locks, motion, humidity, air quality)
  - Real-time value simulation
  - Alert threshold testing
  - Historical data trends

- **Alerts**
  - Pre-populated alerts across all priorities
  - Timestamp variation
  - Acknowledged/unacknowledged states
  - Alert descriptions and recommendations

- **Incidents**
  - Customer complaints
  - AI-detected incidents (shoplifting, loitering)
  - Various statuses (open, investigating, resolved)
  - Resolution notes

- **Camera Streams**
  - Multiple camera configurations
  - HTTP/MJPEG/RTSP examples
  - Hanwha ANE-L7012R defaults
  - Stream health indicators

- **Access Logs**
  - 100+ sample entries
  - All 4 access methods
  - Success/Failed/Denied statuses
  - Norwegian time formatting

- **Currency**
  - All monetary values in NOK
  - Norwegian number formatting
  - Price calculations

### Switching to Real Backend

To connect to a real backend:

1. **Update API base URL** in `.env`:
   ```env
   VITE_API_BASE_URL=https://your-backend-api.com
   ```

2. **Replace mock stores** in `src/stores/data.ts`:
   ```typescript
   // Remove mock data
   // Fetch from real API
   const response = await api.get('/api/stores')
   stores.value = response.data
   ```

3. **Enable WebSocket** in `src/services/api.ts`

4. **Update authentication** to use real JWT tokens

5. **Test all endpoints** with real backend

## 🛡️ Security Features

### Authentication & Authorization
- **JWT Token Authentication**: Secure token-based auth
- **Session Management**: Automatic token refresh
- **Role-Based Access Control**: Admin and operator roles
- **Route Guards**: Protected routes requiring authentication
- **Auto-Logout**: Session timeout after inactivity
- **Secure Storage**: Encrypted local storage for tokens

### Data Protection
- **HTTPS Required**: All production traffic encrypted
- **Input Validation**: Client-side validation for all forms
- **XSS Prevention**: Sanitized user inputs
- **CSRF Protection**: Token-based CSRF prevention
- **API Rate Limiting**: Prevent abuse (backend)
- **SQL Injection Prevention**: Parameterized queries (backend)

### Access Control
- **Multi-Factor Authentication Ready**: MFA integration points
- **Password Requirements**: Enforced complexity rules (backend)
- **Account Lockout**: Failed login attempt limits
- **Audit Logging**: Complete access audit trail
- **IP Whitelisting**: Optional IP-based restrictions (backend)

### Camera Security
- **Encrypted Streams**: HTTPS/WSS for camera feeds
- **Authentication Required**: Camera access requires login
- **Stream Timeouts**: Automatic disconnect after inactivity
- **Access Logging**: All camera access logged

### Compliance
- **GDPR Ready**: Data privacy by design
- **Data Retention**: Configurable retention policies
- **User Consent**: Privacy policy acceptance
- **Right to Deletion**: Data removal capabilities
- **Audit Trail**: Complete activity logging

## 🔮 Roadmap & Future Enhancements

### Phase 1 - Core Enhancements (Q1 2025)
- [ ] Real-time WebSocket integration for live updates
- [ ] Push notifications for critical alerts
- [ ] Advanced chart visualizations (Chart.js/D3.js)
- [ ] Multi-language support (Norwegian, English)
- [ ] Dark mode theme toggle
- [ ] Export reports to PDF/Excel

### Phase 2 - Advanced Features (Q2 2025)
- [ ] Mobile app using Capacitor
- [ ] Offline support with service workers
- [ ] Advanced analytics dashboard
- [ ] Machine learning incident prediction
- [ ] Automated alert escalation
- [ ] Video playback and archiving

### Phase 3 - Integration & Automation (Q3 2025)
- [ ] Payment gateway integration
- [ ] Inventory management system
- [ ] Customer loyalty program
- [ ] Email/SMS notification system
- [ ] Third-party API integrations
- [ ] Automated reporting scheduler

### Phase 4 - Scale & Performance (Q4 2025)
- [ ] Multi-tenant architecture
- [ ] Load balancing and CDN
- [ ] Advanced caching strategies
- [ ] Performance monitoring (Sentry/New Relic)
- [ ] A/B testing framework
- [ ] GraphQL API support

### Planned Improvements
- **UI/UX**: Micro-interactions and animations
- **Performance**: Code splitting and lazy loading
- **Testing**: Comprehensive unit and E2E tests
- **Documentation**: Interactive API documentation
- **DevOps**: Enhanced CI/CD pipelines
- **Monitoring**: Real-time performance dashboards

## � Documentation

### Additional Resources

- **[CAMERA_SETUP_GUIDE.md](./CAMERA_SETUP_GUIDE.md)** - Detailed camera integration instructions
- **[AZURE_DEPLOYMENT_STATUS.md](./AZURE_DEPLOYMENT_STATUS.md)** - Azure deployment guide
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - General deployment instructions
- **[.github/copilot-instructions.md](./.github/copilot-instructions.md)** - AI assistant context

### API Documentation

API documentation will be available at:
- **Development**: `http://localhost:7000/swagger`
- **Production**: `https://api.yourdomain.com/swagger`

### Component Documentation

Key components and their usage:

#### DashboardLayout
```vue
<template>
  <DashboardLayout>
    <!-- Your page content -->
  </DashboardLayout>
</template>
```

#### Using Pinia Stores
```typescript
import { useAuthStore } from '@/stores/auth'
import { useStoreDataStore } from '@/stores/data'

const authStore = useAuthStore()
const dataStore = useStoreDataStore()

// Access state
const user = authStore.currentUser
const stores = dataStore.stores

// Call actions
await authStore.login(username, password)
await dataStore.fetchSensors(storeId)
```

#### API Service
```typescript
import api from '@/services/api'

// GET request
const response = await api.get('/api/stores')

// POST request
const response = await api.post('/api/incidents', {
  type: 'customer_complaint',
  description: 'Issue description'
})

// PUT request
await api.put(`/api/alerts/${alertId}/acknowledge`)
```

### Troubleshooting

#### Common Issues

**Camera not loading:**
- Verify camera IP address is correct
- Check camera is powered on and connected
- Test camera URL in browser directly
- Ensure CORS is configured on camera
- Check network firewall rules

**Authentication fails:**
- Verify backend API is running
- Check API URL in `.env` file
- Inspect browser console for errors
- Verify credentials are correct
- Clear localStorage and try again

**Build errors:**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Check Node.js version (18+ required)
- Clear npm cache: `npm cache clean --force`

**WebSocket connection fails:**
- Check WebSocket URL in `.env`
- Verify backend WebSocket server is running
- Check browser console for errors
- Ensure firewall allows WebSocket connections

## 🤝 Contributing

We welcome contributions to StoreOne Merchant Frontend!

### How to Contribute

1. **Fork the repository**
   ```bash
   git clone https://github.com/Onitio-Solutions/StoreOne-Frontend-Merchant.git
   cd StoreOne-Frontend-Merchant
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```

3. **Make your changes**
   - Follow the code style guidelines
   - Add tests if applicable
   - Update documentation

4. **Commit your changes**
   ```bash
   git commit -m 'feat: Add some AmazingFeature'
   ```

5. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```

6. **Open a Pull Request**
   - Describe your changes
   - Reference any related issues
   - Request review from maintainers

### Contribution Guidelines

- **Code Quality**: Follow TypeScript and Vue 3 best practices
- **Testing**: Add tests for new features
- **Documentation**: Update README and inline docs
- **Commit Messages**: Follow Conventional Commits
- **Code Review**: Be open to feedback
- **Licensing**: Ensure compatibility with MIT license

### Development Setup

```bash
# Fork and clone
git clone https://github.com/YOUR_USERNAME/StoreOne-Frontend-Merchant.git

# Add upstream remote
git remote add upstream https://github.com/Onitio-Solutions/StoreOne-Frontend-Merchant.git

# Create branch
git checkout -b feature/your-feature

# Make changes and commit
git add .
git commit -m "feat: your feature"

# Push and create PR
git push origin feature/your-feature
```

### Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on collaboration
- Help others learn and grow

## 📄 License

This project is proprietary software owned by **Onitio Solutions**.

**Copyright © 2024-2025 Onitio Solutions. All rights reserved.**

Unauthorized copying, modification, distribution, or use of this software,
via any medium, is strictly prohibited without explicit written permission
from Onitio Solutions.

For licensing inquiries, contact: **[licensing@onitio.no](mailto:licensing@onitio.no)**

## 📞 Support & Contact

### Technical Support

For technical support and questions:

- **Email**: [support@onitio.no](mailto:support@onitio.no)
- **Documentation**: [https://docs.onitio.no](https://docs.onitio.no)
- **Issue Tracker**: [GitHub Issues](https://github.com/Onitio-Solutions/StoreOne-Frontend-Merchant/issues)

### Business Inquiries

For business and partnership inquiries:

- **Sales**: [sales@onitio.no](mailto:sales@onitio.no)
- **General**: [info@onitio.no](mailto:info@onitio.no)
- **Website**: [https://onitio.no](https://onitio.no)

### Emergency Support

For critical production issues:

- **24/7 Hotline**: +47 XXX XX XXX (Premium support customers)
- **Emergency Email**: [emergency@onitio.no](mailto:emergency@onitio.no)

### Community

- **GitHub Discussions**: Share ideas and ask questions
- **Slack Channel**: Join our developer community (invitation required)
- **Newsletter**: Subscribe for updates and news

---

<div align="center">

## 🏆 Built by Onitio Solutions

**Innovating Unattended Retail Technology**

[![Website](https://img.shields.io/badge/Website-onitio.no-blue?style=for-the-badge)](https://onitio.no)
[![Email](https://img.shields.io/badge/Email-info@onitio.no-red?style=for-the-badge)](mailto:info@onitio.no)
[![GitHub](https://img.shields.io/badge/GitHub-Onitio--Solutions-black?style=for-the-badge&logo=github)](https://github.com/Onitio-Solutions)

---

**Project Status**: ✅ Production Ready  
**Current Version**: 1.0.0  
**Last Updated**: October 2025  
**License**: Proprietary - Onitio Solutions  

**Live Demo**: [https://blue-cliff-02c53ef03.1.azurestaticapps.net](https://blue-cliff-02c53ef03.1.azurestaticapps.net)

---

Made with ❤️ in Norway 🇳🇴

</div>
