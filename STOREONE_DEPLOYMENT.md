# Azure Static Web App Deployment - StoreOne Resource Group

## Quick Deploy to Azure

### Option 1: Azure CLI Deployment (Recommended)

1. **Login to Azure**
   ```bash
   az login
   ```

2. **Set subscription**
   ```bash
   az account set --subscription "8c020b54-b237-4d6e-82ba-190f6a415d1d"
   ```

3. **Create Static Web App**
   ```bash
   az staticwebapp create \
     --name storeone-merchant-frontend \
     --resource-group StoreOne \
     --location northeurope \
     --sku Free \
     --source https://github.com/KurtDue/Unattended-Frontend \
     --branch master \
     --app-location "/" \
     --output-location "dist" \
     --login-with-github
   ```

4. **Get deployment token** (for GitHub Actions)
   ```bash
   az staticwebapp secrets list \
     --name storeone-merchant-frontend \
     --resource-group StoreOne \
     --query "properties.apiKey" \
     --output tsv
   ```

### Option 2: Manual Deployment with SWA CLI

1. **Install SWA CLI**
   ```bash
   npm install -g @azure/static-web-apps-cli
   ```

2. **Build the application** (already done)
   ```bash
   npm run build
   ```

3. **Deploy directly**
   ```bash
   swa deploy dist \
     --subscription-id 8c020b54-b237-4d6e-82ba-190f6a415d1d \
     --resource-group StoreOne \
     --app-name storeone-merchant-frontend \
     --env production
   ```

### Option 3: Azure Portal

1. **Go to Azure Portal**
   - Navigate to: https://portal.azure.com/#@valueretail.no/resource/subscriptions/8c020b54-b237-4d6e-82ba-190f6a415d1d/resourcegroups/StoreOne/overview

2. **Create Static Web App**
   - Click "+ Create" → Search "Static Web App"
   - Select "Static Web App"
   - Click "Create"

3. **Configure**
   - **Subscription**: Your subscription
   - **Resource Group**: StoreOne
   - **Name**: storeone-merchant-frontend
   - **Plan type**: Free
   - **Region**: North Europe
   - **Deployment source**: GitHub
   - **Organization**: KurtDue
   - **Repository**: Unattended-Frontend
   - **Branch**: master
   - **Build Details**:
     - Build Presets: Custom
     - App location: /
     - Output location: dist

4. **Deploy**
   - Click "Review + Create"
   - Click "Create"

## Post-Deployment Configuration

### Set Environment Variables in Azure Portal

1. **Navigate to your Static Web App**
   ```
   Portal → StoreOne (RG) → storeone-merchant-frontend
   ```

2. **Go to Configuration**
   - Click "Configuration" in left menu
   - Click "+ Add"

3. **Add these variables**:
   ```
   VITE_MEDIAMTX_URL = http://mediamtx-storeone.northeurope.azurecontainer.io:8888
   VITE_API_BASE_URL = https://your-backend-api-url.azurewebsites.net
   ```

4. **Save** and the app will automatically redeploy

## Verify Deployment

After deployment completes (5-10 minutes):

1. **Get URL**
   ```bash
   az staticwebapp show \
     --name storeone-merchant-frontend \
     --resource-group StoreOne \
     --query "defaultHostname" \
     --output tsv
   ```

2. **Test**
   - Navigate to: `https://[app-name].azurestaticapps.net`
   - Login with: admin/admin
   - Go to Monitoring → Should see live HLS stream from MediaMTX

## Troubleshooting

### If HLS stream doesn't play:

1. **Check MediaMTX server is running**
   ```bash
   curl http://mediamtx-storeone.northeurope.azurecontainer.io:8888/live/index.m3u8
   ```

2. **Check browser console** for CORS errors
   - May need to configure CORS on MediaMTX server

3. **Test stream URL directly**
   - Open: http://mediamtx-storeone.northeurope.azurecontainer.io:8888/live/index.m3u8
   - Should download or show HLS manifest

### If deployment fails:

1. **Check build logs** in Azure Portal
2. **Verify GitHub repository access**
3. **Check Node.js version** (should be 20.x)

## Architecture

```
Azure StoreOne Resource Group (North Europe)
├── MediaMTX Server (Container Instance)
│   └── http://mediamtx-storeone.northeurope.azurecontainer.io:8888
│       └── /live/index.m3u8 (HLS Stream)
│
└── Static Web App (Frontend)
    └── https://storeone-merchant-frontend.azurestaticapps.net
        └── Monitoring View → Displays HLS stream from MediaMTX
```

## Current Status

✅ Application built successfully  
✅ HLS.js library installed  
✅ First camera configured with MediaMTX stream  
✅ Production build ready in `dist/` folder  
⏳ Awaiting deployment to Azure  

## Next Steps

1. Choose deployment option above
2. Create Static Web App in StoreOne RG
3. Verify HLS stream playback
4. Configure environment variables if needed
5. Test complete application flow

