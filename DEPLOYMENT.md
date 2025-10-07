# Deployment Guide - Cottage Ragati Website

This guide covers different deployment options for your Cottage Ragati website.

## 📋 Pre-Deployment Checklist

Before deploying, ensure you have:

- [x] Updated all contact information
- [x] Added Airbnb and Booking.com iCal URLs
- [x] Updated booking platform links
- [x] Added cottage photos
- [x] Tested locally and verified calendar sync works
- [x] Updated social media links

## 🚀 Deployment Options

### Option 1: Vercel (Frontend) + Railway (Backend) - Recommended

This is the easiest and most cost-effective option for small to medium traffic.

#### Deploy Backend to Railway

1. **Create Railway Account**
   - Go to https://railway.app
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Select the `server` folder as root directory

3. **Add Environment Variables**
   - Go to Variables tab
   - Add:
     ```
     PORT=5000
     AIRBNB_ICAL_URL=your_airbnb_ical_url
     BOOKING_ICAL_URL=your_booking_ical_url
     ```

4. **Deploy**
   - Railway will automatically deploy
   - Note your backend URL (e.g., `https://your-app.railway.app`)

#### Deploy Frontend to Vercel

1. **Create Vercel Account**
   - Go to https://vercel.com
   - Sign up with GitHub

2. **Import Project**
   - Click "Add New Project"
   - Import your GitHub repository
   - Set root directory to `client`

3. **Configure Build Settings**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. **Add Environment Variable**
   - Add `VITE_API_URL` with your Railway backend URL

5. **Update API Calls**
   - Edit `client/src/App.jsx` and other components
   - Replace `/api/` with `${import.meta.env.VITE_API_URL}/api/`

6. **Deploy**
   - Click Deploy
   - Your site will be live at `https://your-site.vercel.app`

### Option 2: Netlify (Frontend) + Render (Backend)

Similar to Option 1, but using different platforms.

#### Deploy Backend to Render

1. Go to https://render.com
2. Create new Web Service
3. Connect GitHub repository
4. Set root directory to `server`
5. Build Command: `npm install`
6. Start Command: `node server.js`
7. Add environment variables
8. Deploy

#### Deploy Frontend to Netlify

1. Go to https://netlify.com
2. Import from GitHub
3. Set base directory to `client`
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Add environment variables
7. Deploy

### Option 3: Single VPS (DigitalOcean, Linode, AWS EC2)

For full control and potentially lower costs at scale.

#### Step 1: Set Up Server

```bash
# SSH into your VPS
ssh root@your-server-ip

# Update system
apt update && apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# Install PM2
npm install -g pm2

# Install Nginx
apt install -y nginx

# Install Certbot for SSL
apt install -y certbot python3-certbot-nginx
```

#### Step 2: Clone and Setup Project

```bash
# Clone repository
git clone https://github.com/yourusername/cottage-ragati.git
cd cottage-ragati

# Install dependencies
npm run install-all

# Create .env file
cd server
nano .env
# Add your environment variables
# Save and exit (Ctrl+X, Y, Enter)

# Build frontend
cd ../client
npm run build
```

#### Step 3: Setup PM2

```bash
# Start backend with PM2
cd ../server
pm2 start server.js --name cottage-api

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
# Follow the instructions shown
```

#### Step 4: Configure Nginx

```bash
# Create Nginx configuration
nano /etc/nginx/sites-available/cottageragati
```

Add this configuration:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Frontend
    location / {
        root /root/cottage-ragati/client/dist;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:

```bash
# Create symbolic link
ln -s /etc/nginx/sites-available/cottageragati /etc/nginx/sites-enabled/

# Test configuration
nginx -t

# Restart Nginx
systemctl restart nginx
```

#### Step 5: Setup SSL

```bash
# Get SSL certificate
certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Follow the prompts
# Certbot will automatically configure SSL
```

#### Step 6: Setup Automatic Updates

```bash
# Create update script
nano ~/update-cottage.sh
```

Add:

```bash
#!/bin/bash
cd /root/cottage-ragati
git pull
cd client
npm install
npm run build
cd ../server
npm install
pm2 restart cottage-api
```

Make executable:

```bash
chmod +x ~/update-cottage.sh
```

### Option 4: Docker Deployment

For containerized deployment.

#### Create Dockerfile for Backend

Create `server/Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 5000

CMD ["node", "server.js"]
```

#### Create Dockerfile for Frontend

Create `client/Dockerfile`:

```dockerfile
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

#### Create docker-compose.yml

```yaml
version: '3.8'

services:
  backend:
    build: ./server
    ports:
      - "5000:5000"
    environment:
      - PORT=5000
      - AIRBNB_ICAL_URL=${AIRBNB_ICAL_URL}
      - BOOKING_ICAL_URL=${BOOKING_ICAL_URL}
    restart: unless-stopped

  frontend:
    build: ./client
    ports:
      - "80:80"
    depends_on:
      - backend
    restart: unless-stopped
```

Deploy:

```bash
docker-compose up -d
```

## 🔒 Security Best Practices

1. **Environment Variables**
   - Never commit `.env` files
   - Use platform-specific secret management
   - Rotate credentials regularly

2. **HTTPS**
   - Always use SSL/TLS in production
   - Use Let's Encrypt for free certificates
   - Enable HSTS headers

3. **Rate Limiting**
   - Add rate limiting to API endpoints
   - Protect against DDoS attacks

4. **CORS**
   - Configure CORS properly
   - Only allow your frontend domain

5. **Updates**
   - Keep dependencies updated
   - Monitor for security vulnerabilities
   - Set up automatic security updates

## 📊 Monitoring

### Set Up Monitoring

1. **Uptime Monitoring**
   - Use UptimeRobot or Pingdom
   - Monitor both frontend and API endpoints

2. **Error Tracking**
   - Integrate Sentry for error tracking
   - Monitor API errors and frontend crashes

3. **Analytics**
   - Add Google Analytics
   - Track booking conversions

### Health Check Endpoints

Your API includes a health check:
- `GET /api/health` - Check API status

Monitor this endpoint regularly.

## 🔄 Continuous Deployment

### GitHub Actions (Automated Deployment)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 💰 Cost Estimates

### Free Tier (Hobby Projects)
- Vercel: Free for personal projects
- Railway: $5/month with free trial
- **Total: ~$5/month**

### VPS Option
- DigitalOcean Droplet: $6-12/month
- Domain: $10-15/year
- **Total: ~$8-15/month**

### Production (High Traffic)
- Vercel Pro: $20/month
- Railway: $20/month
- **Total: ~$40/month**

## 🆘 Troubleshooting Deployment

### Issue: Build fails on Vercel

**Solution:**
- Check Node.js version compatibility
- Verify all dependencies are in package.json
- Check build logs for specific errors

### Issue: API not accessible

**Solution:**
- Verify CORS settings
- Check environment variables
- Ensure backend is running
- Test API endpoint directly

### Issue: Calendar sync not working in production

**Solution:**
- Verify iCal URLs are accessible from server
- Check environment variables are set
- Review server logs
- Test manual sync endpoint

## 📞 Support

For deployment issues:
- Check platform-specific documentation
- Review server/application logs
- Test locally first
- Verify all environment variables

---

**Good luck with your deployment! 🚀**
