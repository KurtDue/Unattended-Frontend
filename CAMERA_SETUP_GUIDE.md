# 🎥 Hanwha ANE-L7012R Camera Integration Guide

## Overview
This guide will help you integrate your Hanwha ANE-L7012R camera with the Unattended Store monitoring system.

## Prerequisites
- Hanwha ANE-L7012R camera properly installed and connected to network
- Admin access to camera web interface
- Camera IP address known
- Network access between camera and monitoring system

## Step 1: Camera Configuration

### 1.1 Access Camera Web Interface
1. Open web browser
2. Navigate to: `http://[CAMERA_IP]`
3. Login with admin credentials
4. Accept any security certificates if prompted

### 1.2 Video Stream Configuration
1. Go to **Setup** → **Camera** → **Video & Audio**
2. Configure **Primary Stream** (High Quality):
   - Resolution: 1920x1080 (1080p)
   - Frame Rate: 15-30 fps
   - Video Codec: H.264
   - Bit Rate Control: VBR
   - Max Bit Rate: 8000 Kbps

3. Configure **Secondary Stream** (Bandwidth Efficient):
   - Resolution: 704x576 (D1)
   - Frame Rate: 15 fps
   - Video Codec: H.264
   - Bit Rate Control: VBR
   - Max Bit Rate: 2000 Kbps

### 1.3 Network Settings
1. Go to **Setup** → **Network** → **Port**
2. Ensure **RTSP Port**: 554 (default)
3. Enable **ONVIF** if not already enabled
4. Set **RTP Port Range**: 30000-30100 (or leave default)

### 1.4 User Management (Optional)
1. Go to **Setup** → **System** → **User**
2. Create a dedicated user for monitoring:
   - Username: `monitoring`
   - Password: [secure password]
   - Authority: Viewer or Operator

## Step 2: Test RTSP Streams

### 2.1 RTSP URLs for Hanwha ANE-L7012R
- **Primary Stream**: `rtsp://[IP]/onvif-media/media.amp?profile=profile_1_h264`
- **Secondary Stream**: `rtsp://[IP]/onvif-media/media.amp?profile=profile_2_h264`
- **With Authentication**: `rtsp://username:password@[IP]/onvif-media/media.amp?profile=profile_2_h264`

### 2.2 Test with VLC Media Player
1. Download and install VLC Media Player
2. Open VLC → Media → Open Network Stream
3. Enter your RTSP URL: `rtsp://[CAMERA_IP]/onvif-media/media.amp?profile=profile_2_h264`
4. Click Play to verify stream works

## Step 3: Application Configuration

### 3.1 Update Camera Settings in Application
1. Open the Unattended Store application
2. Navigate to **Configuration** → **Camera Configuration**
3. Find "Entrance Camera" section
4. Update **Stream URL** with your camera's RTSP URL:
   ```
   rtsp://[CAMERA_IP]/onvif-media/media.amp?profile=profile_2_h264
   ```
5. Replace `[CAMERA_IP]` with your actual camera IP address
6. Click **Test** to verify connection
7. Click **Save All** to save settings

### 3.2 Example Configuration
```
Camera Name: Entrance Camera
Location: Main Entrance
Stream URL: rtsp://192.168.1.100/onvif-media/media.amp?profile=profile_2_h264
Status: ✓ Active
```

## Step 4: Media Server Setup (For Web Viewing)

### 4.1 Why Media Server is Needed
Web browsers cannot directly display RTSP streams. You need a media server to convert RTSP to web-compatible formats (HLS, WebRTC, or DASH).

### 4.2 Recommended Solutions

#### Option A: Simple Node.js Media Server
```bash
npm install node-media-server
```

```javascript
const NodeMediaServer = require('node-media-server');

const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: 8000,
    allow_origin: '*'
  },
  relay: {
    ffmpeg: '/usr/local/bin/ffmpeg',
    tasks: [
      {
        app: 'live',
        mode: 'pull',
        edge: 'rtsp://[CAMERA_IP]/onvif-media/media.amp?profile=profile_2_h264'
      }
    ]
  }
};

const nms = new NodeMediaServer(config);
nms.run();
```

#### Option B: FFmpeg Command Line
```bash
ffmpeg -i "rtsp://[CAMERA_IP]/onvif-media/media.amp?profile=profile_2_h264" \
       -c:v copy -c:a copy -f hls -hls_time 2 -hls_list_size 3 \
       -hls_flags delete_segments stream.m3u8
```

#### Option C: Professional Solutions
- **Wowza Streaming Engine**
- **Ant Media Server**
- **SRS (Simple Realtime Server)**

### 4.3 Update Application Stream URL
Once your media server is running, update the stream URL in the application:
```
From: rtsp://192.168.1.100/onvif-media/media.amp?profile=profile_2_h264
To: http://192.168.1.100:8080/hls/stream.m3u8
```

## Step 5: Troubleshooting

### 5.1 Common Issues

#### Camera Not Accessible
- Verify camera IP address
- Check network connectivity
- Ensure camera is powered on
- Check firewall settings

#### RTSP Stream Not Working
- Verify RTSP port (554) is open
- Check username/password if authentication is enabled
- Try different stream profiles
- Test with VLC first

#### Video Not Displaying in Browser
- RTSP requires media server conversion
- Check media server is running
- Verify HLS/WebRTC endpoint is accessible
- Check browser console for errors

### 5.2 Network Requirements
- **Bandwidth**: 2-8 Mbps per camera depending on quality
- **Latency**: Low latency network preferred
- **Ports**: 554 (RTSP), 80/443 (HTTP/HTTPS), media server ports

## Step 6: Security Considerations

### 6.1 Camera Security
- Change default passwords
- Use strong authentication
- Enable HTTPS if available
- Restrict network access with firewall rules
- Regular firmware updates

### 6.2 Network Security
- Use VPN for remote access
- Implement network segmentation
- Monitor network traffic
- Use encrypted streams when possible

## Next Steps

1. **Test the basic RTSP connection** with VLC
2. **Configure the camera settings** as described above
3. **Update the application** with your camera's RTSP URL
4. **Set up media server** for web streaming (optional but recommended)
5. **Test the monitoring view** in the application

## Support

If you encounter issues:
1. Check the camera manual for specific RTSP configurations
2. Verify network connectivity and firewall settings
3. Test RTSP stream with external tools (VLC, FFplay)
4. Check application logs for error messages

## Camera Specifications (ANE-L7012R)
- **Resolution**: Up to 4MP (2560×1440)
- **Video Compression**: H.265, H.264
- **Streaming**: Dual streaming capability
- **Network**: 10/100 Base-T Ethernet
- **ONVIF**: Profile S/G compliant
- **Audio**: 1-channel audio input/output
