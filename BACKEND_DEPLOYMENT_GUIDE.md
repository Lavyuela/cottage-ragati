# Backend Deployment Guide

## Quick Deploy to Render (Free)

### Step 1: Prepare Your Backend

Your backend is already ready in the `server` folder. It just needs the iCal URLs configured.

### Step 2: Get Your iCal URLs

#### From Airbnb:
1. Go to https://www.airbnb.com
2. Log in to your host account
3. Go to your listing
4. Click **Calendar**
5. Click **Availability settings**
6. Scroll to **Sync calendars**
7. Click **Export calendar**
8. Copy the iCal URL (looks like: `https://www.airbnb.com/calendar/ical/123456789.ics?s=...`)

#### From Booking.com:
1. Go to https://admin.booking.com
2. Log in to your extranet
3. Go to **Calendar**
4. Click **Sync calendars** or **Import/Export**
5. Find **Export calendar** section
6. Copy the iCal URL (looks like: `https://admin.booking.com/hotel/hoteladmin/ical.html?t=...`)

### Step 3: Deploy to Render

1. **Go to Render**: https://render.com
2. **Sign up/Login** with GitHub
3. **Click "New +"** → Select **"Web Service"**
4. **Connect your GitHub repository**: `Lavyuela/cottage-ragati`
5. **Configure the service**:
   - **Name**: `cottage-ragati-api`
   - **Region**: Choose closest to Kenya (e.g., Frankfurt or Singapore)
   - **Branch**: `master`
   - **Root Directory**: `server`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Instance Type**: `Free`

6. **Add Environment Variables** (Click "Advanced" → "Add Environment Variable"):
   ```
   PORT=5000
   AIRBNB_ICAL_URL=<paste your Airbnb iCal URL here>
   BOOKING_ICAL_URL=<paste your Booking.com iCal URL here>
   FRONTEND_URL=https://cottage-ragati.vercel.app
   ```

7. **Click "Create Web Service"**

8. **Wait 2-3 minutes** for deployment to complete

9. **Copy your backend URL** (will be something like: `https://cottage-ragati-api.onrender.com`)

### Step 4: Update Frontend to Use Backend

1. Create a `.env` file in the `client` folder (if it doesn't exist)
2. Add this line:
   ```
   VITE_API_URL=https://cottage-ragati-api.onrender.com
   ```

3. Commit and push:
   ```bash
   git add client/.env
   git commit -m "Add production API URL"
   git push origin master
   ```

### Step 5: Test Your Backend

1. Open in browser: `https://cottage-ragati-api.onrender.com/api/health`
2. You should see:
   ```json
   {
     "status": "ok",
     "message": "Cottage Ragati API is running",
     "lastSync": "2025-10-21T10:30:00.000Z"
   }
   ```

3. Check availability: `https://cottage-ragati-api.onrender.com/api/availability`
4. Should show your booked dates from Airbnb and Booking.com

---

## Option 2: Deploy to Railway (Alternative)

1. **Go to Railway**: https://railway.app
2. **Sign up with GitHub**
3. **Click "New Project"** → **"Deploy from GitHub repo"**
4. **Select**: `Lavyuela/cottage-ragati`
5. **Configure**:
   - Root Directory: `server`
   - Start Command: `node server.js`
6. **Add Environment Variables**:
   - `PORT=5000`
   - `AIRBNB_ICAL_URL=<your URL>`
   - `BOOKING_ICAL_URL=<your URL>`
   - `FRONTEND_URL=https://cottage-ragati.vercel.app`
7. **Deploy**
8. **Copy the Railway URL** and update your frontend `.env`

---

## Important Notes

### ⚠️ Free Tier Limitations

**Render Free Tier:**
- Spins down after 15 minutes of inactivity
- Takes 30-60 seconds to wake up on first request
- 750 hours/month free (enough for one service)

**Railway Free Tier:**
- $5 free credit per month
- No spin-down (always running)
- Better for production

### 🔒 Security

**DO NOT** commit your `.env` file with real iCal URLs to Git!

The `.gitignore` already excludes `.env` files, but double-check:
```bash
# Make sure this is in your .gitignore
.env
.env.local
.env.production
```

### 🔄 Calendar Sync Frequency

Your backend syncs calendars:
- **Automatically every 30 minutes**
- **On server startup**
- **Manually via**: `POST https://your-backend-url.com/api/sync`

### 📊 Monitoring

Set up monitoring to ensure your backend stays healthy:
1. **UptimeRobot** (free): https://uptimerobot.com
2. Monitor: `https://your-backend-url.com/api/health`
3. Get alerts if it goes down

---

## Testing the Complete System

### 1. Test Backend Alone
```bash
# Health check
curl https://cottage-ragati-api.onrender.com/api/health

# Get availability
curl https://cottage-ragati-api.onrender.com/api/availability

# Check specific date
curl "https://cottage-ragati-api.onrender.com/api/check-date?date=2025-12-25"
```

### 2. Test Frontend + Backend Integration
1. Go to: https://cottage-ragati.vercel.app
2. Scroll to booking section
3. Select dates that you know are booked on Airbnb
4. Should show: "Dates Not Available"
5. Select available dates
6. Should show: Price breakdown and payment options

### 3. Test Calendar Sync
1. Book a test date on Airbnb
2. Wait 30 minutes (or trigger manual sync)
3. Try to book same dates on your website
4. Should be blocked

---

## Troubleshooting

### Backend not syncing calendars

**Check logs on Render:**
1. Go to Render dashboard
2. Click your service
3. Click "Logs" tab
4. Look for errors like:
   - "Error fetching Airbnb calendar"
   - "Error fetching Booking.com calendar"

**Common issues:**
- iCal URLs expired (regenerate them)
- iCal URLs incorrect (check for typos)
- Network timeout (Render free tier can be slow)

### Frontend not connecting to backend

**Check:**
1. Is `VITE_API_URL` set correctly in Vercel?
2. Go to Vercel dashboard → Your project → Settings → Environment Variables
3. Add: `VITE_API_URL` = `https://cottage-ragati-api.onrender.com`
4. Redeploy

### CORS errors

If you see CORS errors in browser console:
1. Check `server/server.js` has correct CORS settings
2. Should include your Vercel URL:
   ```javascript
   const corsOptions = {
     origin: process.env.FRONTEND_URL || '*',
     credentials: true
   }
   ```

---

## Quick Start Checklist

- [ ] Get Airbnb iCal URL
- [ ] Get Booking.com iCal URL
- [ ] Sign up for Render.com
- [ ] Deploy backend to Render
- [ ] Add environment variables (iCal URLs)
- [ ] Copy backend URL
- [ ] Add backend URL to Vercel environment variables
- [ ] Test backend health endpoint
- [ ] Test frontend booking with unavailable dates
- [ ] Set up UptimeRobot monitoring

---

## Cost Summary

**Free Option:**
- Frontend: Vercel (Free forever)
- Backend: Render (Free with spin-down)
- **Total: $0/month**

**Always-On Option:**
- Frontend: Vercel (Free)
- Backend: Railway ($5/month after free credit)
- **Total: ~$5/month**

**Recommended for Production:**
- Frontend: Vercel (Free)
- Backend: Render Starter ($7/month - no spin-down)
- **Total: $7/month**
