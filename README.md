# Unattended Store Management System - Frontend

A modern Vue.js application for managing unattended stores with real-time monitoring, sensor management, and incident tracking capabilities.

![Vue.js](https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

## 🚀 Features

### Authentication & Security
- **Secure Login System** - Session-based authentication
- **Multi-Store Access** - Support for multiple store locations
- **Role-Based Access** - Administrator and user roles

### Real-Time Monitoring
- **Live Camera Feeds** - Monitor store surveillance cameras
- **Sensor Dashboard** - Temperature, door locks, and environmental sensors
- **Alert System** - Real-time notifications with priority levels
- **Incident Management** - Track customer complaints and AI detections

### Analytics & Reporting
- **Statistics Dashboard** - Sales, visitor traffic, and system metrics
- **Data Visualization** - Interactive charts and graphs
- **Export Functionality** - Download reports in JSON format

### System Configuration
- **Store Settings** - Manage store information and operating hours
- **Sensor Thresholds** - Configure temperature and alert limits
- **API Configuration** - Backend connection settings

## 🛠️ Tech Stack

- **Framework**: Vue.js 3 with Composition API
- **Build Tool**: Vite
- **Language**: TypeScript
- **State Management**: Pinia
- **Routing**: Vue Router 4
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Icons**: Heroicons

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Unattended-Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🔐 Demo Access

Use these credentials to access the demo application:

- **Username**: `admin`
- **Password**: `admin`

**Available Demo Store**:
- demostore1 (Demo Store 1)

## 📁 Project Structure

```
src/
├── assets/          # Static assets and global styles
├── layouts/         # Page layouts (Dashboard, etc.)
├── router/          # Vue Router configuration
├── services/        # API services and HTTP client
├── stores/          # Pinia stores for state management
├── types/           # TypeScript type definitions
└── views/           # Page components
    ├── LoginView.vue
    ├── StoreSelectionView.vue
    ├── HomeView.vue
    ├── MonitoringView.vue
    ├── SensorsView.vue
    ├── AlertsView.vue
    ├── IncidentsView.vue
    ├── StatisticsView.vue
    └── ConfigurationView.vue
```

## 🎯 Key Components

### Dashboard Panes

1. **Home** - Overview dashboard with key metrics and quick actions
2. **Monitoring** - Live camera feeds with fullscreen viewing
3. **Sensors** - Real-time sensor status and configuration
4. **Incidents** - Incident tracking for customer issues and AI detections
5. **Alerts** - Alert management with acknowledgment system
6. **Statistics** - Analytics dashboard with data visualization
7. **Configuration** - System settings and store management

### Data Management

- **Mock Data**: Realistic demo data for development and testing
- **State Management**: Reactive data updates using Pinia
- **Local Storage**: Persistent settings and authentication
- **API Ready**: Prepared endpoints for .NET backend integration

## 🔧 Configuration

### Environment Variables

The application supports the following environment variables:

```env
VITE_API_BASE_URL=https://localhost:7000/api
VITE_WEBSOCKET_URL=wss://localhost:7000/ws
```

### API Integration

The application includes mock APIs that can be easily replaced with real backend endpoints:

```typescript
// services/api.ts
const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
});
```

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile and tablet devices
- **Responsive Grid**: Adaptive layouts for different screen sizes
- **Touch Friendly**: Mobile-optimized interactions
- **Accessibility**: WCAG compliant components

## 🧪 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check

# Linting
npm run lint
```

### Code Style

- **TypeScript**: Strict type checking enabled
- **ESLint**: Code linting for consistency
- **Prettier**: Automatic code formatting
- **Vue 3 Composition API**: Modern Vue.js patterns

## 🚀 Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your web server

3. **Configure backend API** endpoints

4. **Set up environment variables** for production

## 🔗 Backend Integration

This frontend is designed to work with a .NET 10 backend API. Key integration points:

- **Authentication**: JWT token-based authentication
- **WebSocket**: Real-time data updates
- **REST API**: CRUD operations for all entities
- **File Upload**: Image and document handling

### API Endpoints Structure

```
POST   /api/auth/login
GET    /api/stores
GET    /api/stores/{id}/sensors
GET    /api/stores/{id}/alerts
GET    /api/stores/{id}/incidents
GET    /api/stores/{id}/cameras
POST   /api/incidents
PUT    /api/alerts/{id}/acknowledge
```

## 📊 Mock Data

The application includes comprehensive mock data for:

- User authentication (admin/admin)
- Demo store (demostore1)
- Sensor readings (temperature, door locks)
- Sample alerts and incidents
- Camera stream information
- System statistics with NOK currency

## 🛡️ Security Features

- **Session Management**: Secure token-based authentication
- **Route Guards**: Protected routes requiring authentication
- **Input Validation**: Client-side validation for all forms
- **HTTPS Ready**: Configured for secure connections

## 🔮 Future Enhancements

- **Real-time WebSocket** integration
- **Push Notifications** for critical alerts
- **Advanced Charts** with Chart.js or D3.js
- **Mobile App** using Capacitor
- **Offline Support** with service workers

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support and questions, please contact the development team or create an issue in the repository.

---

**Status**: ✅ Ready for Production
**Version**: 1.0.0
**Last Updated**: December 2024
