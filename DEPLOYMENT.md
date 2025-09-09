# Azure Deployment Configuration

## Required GitHub Secrets

To deploy this application to Azure, you'll need to configure the following secrets in your GitHub repository:

### For Azure Static Web Apps:
- `AZURE_STATIC_WEB_APPS_API_TOKEN` - The deployment token from Azure Static Web Apps
- `VITE_API_BASE_URL` - Your backend API URL (e.g., https://your-api.azurewebsites.net/api)

### For Azure Web App:
- `AZURE_WEBAPP_NAME` - Your Azure Web App name
- `AZURE_WEBAPP_PUBLISH_PROFILE` - Download from Azure Portal
- `VITE_API_BASE_URL` - Your backend API URL

## Environment Variables

The application uses the following environment variables:

- `VITE_API_BASE_URL` - Backend API base URL
- `VITE_WEBSOCKET_URL` - WebSocket connection URL (optional)

## Deployment Steps

1. **Azure Static Web Apps (Recommended for SPAs):**
   - Create an Azure Static Web App in Azure Portal
   - Copy the deployment token
   - Add it as `AZURE_STATIC_WEB_APPS_API_TOKEN` in GitHub Secrets
   - Push to master branch to trigger deployment

2. **Azure Web App:**
   - Create an Azure Web App with Node.js runtime
   - Download the publish profile from Azure Portal
   - Add publish profile as `AZURE_WEBAPP_PUBLISH_PROFILE` in GitHub Secrets
   - Add webapp name as `AZURE_WEBAPP_NAME` in GitHub Secrets
   - Push to master branch to trigger deployment

## Production Build

The application will be built using:
```bash
npm ci
npm run build
```

The built files will be in the `dist/` directory and served as static files.
