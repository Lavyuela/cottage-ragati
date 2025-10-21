# Deploy Backend to Render - Quick Guide

## Your iCal URL
```
https://www.airbnb.com/calendar/ical/1241113951372055977.ics?s=be3980ff5db0b6907ec67ab3acd046d6&locale=en
```

Since Airbnb and Booking.com are linked, you only need this one URL!

---

## Step-by-Step Deployment

### 1. Go to Render
👉 https://render.com

### 2. Sign Up/Login
- Click **"Get Started"** or **"Sign In"**
- Choose **"Sign in with GitHub"**
- Authorize Render to access your repositories

### 3. Create New Web Service
- Click **"New +"** button (top right)
- Select **"Web Service"**

### 4. Connect Repository
- Find and select: **`Lavyuela/cottage-ragati`**
- Click **"Connect"**

### 5. Configure Service

Fill in these settings:

**Basic Settings:**
- **Name**: `cottage-ragati-api`
- **Region**: `Frankfurt (EU Central)` (closest to Kenya)
- **Branch**: `master`
- **Root Directory**: `server`

**Build & Deploy:**
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `node server.js`

**Instance Type:**
- Select: **Free** (or Starter if you want no spin-down)

### 6. Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"**

Add these 3 variables:

| Key | Value |
|-----|-------|
| `PORT` | `5000` |
| `AIRBNB_ICAL_URL` | `https://www.airbnb.com/calendar/ical/1241113951372055977.ics?s=be3980ff5db0b6907ec67ab3acd046d6&locale=en` |
| `FRONTEND_URL` | `https://cottage-ragati.vercel.app` |

**Note:** Leave `BOOKING_ICAL_URL` empty since they're linked!

### 7. Deploy
- Click **"Create Web Service"**
- Wait 2-3 minutes for deployment
- Watch the logs for any errors

### 8. Copy Your Backend URL
Once deployed, you'll get a URL like:
```
https://cottage-ragati-api.onrender.com
```
**Copy this URL!** You'll need it for the next step.

---

## Connect Frontend to Backend

### Option A: Via Vercel Dashboard (Recommended)

1. Go to https://vercel.com/dashboard
2. Click on your **"cottage-ragati"** project
3. Go to **Settings** → **Environment Variables**
4. Click **"Add New"**
5. Add:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://cottage-ragati-api.onrender.com` (your Render URL)
6. Click **"Save"**
7. Go to **Deployments** tab
8. Click **"Redeploy"** on the latest deployment

### Option B: Via Git (Alternative)

1. Create `.env.production` file in `client` folder:
   ```bash
   VITE_API_URL=https://cottage-ragati-api.onrender.com
   ```

2. Update Vercel settings to use it (already configured)

3. Commit and push:
   ```bash
   git add client/.env.production
   git commit -m "Add production API URL"
   git push origin master
   ```

---

## Test Your Deployment

### 1. Test Backend Health
Open in browser:
```
https://cottage-ragati-api.onrender.com/api/health
```

Should see:
```json
{
  "status": "ok",
  "message": "Cottage Ragati API is running",
  "lastSync": "2025-10-21T12:57:00.000Z"
}
```

### 2. Test Calendar Sync
Open in browser:
```
https://cottage-ragati-api.onrender.com/api/availability
```

Should see your bookings:
```json
{
  "bookedDates": [
    {
      "start": "2025-12-01T00:00:00.000Z",
      "end": "2025-12-05T00:00:00.000Z",
      "source": "Airbnb"
    }
  ],
  "lastUpdated": "2025-10-21T12:57:00.000Z",
  "totalBookings": 1
}
```

### 3. Test Full System
1. Go to: https://cottage-ragati.vercel.app
2. Scroll to **"Book Your Stay"** section
3. Try to select dates that are already booked on Airbnb
4. Should show: **"Dates Not Available"**
5. Try available dates
6. Should show: **Price breakdown and payment options**

---

## Important Notes

### 🐌 Free Tier Spin-Down
Render's free tier spins down after 15 minutes of inactivity.
- First request after spin-down takes 30-60 seconds
- Subsequent requests are fast
- Calendar still syncs every 30 minutes when active

### 💡 To Avoid Spin-Down
Upgrade to **Render Starter** ($7/month):
- Always running
- No cold starts
- Better for production

Or use **UptimeRobot** (free) to ping your backend every 10 minutes:
1. Sign up at https://uptimerobot.com
2. Add monitor: `https://cottage-ragati-api.onrender.com/api/health`
3. Set interval: 10 minutes
4. This keeps it awake (mostly)

### 🔄 Calendar Sync
Your backend automatically:
- ✅ Syncs on startup
- ✅ Syncs every 30 minutes
- ✅ Combines bookings from Airbnb (which includes Booking.com)

### 🔒 Security
Your iCal URL is now in Render's environment variables (secure).
**Never commit it to Git!**

---

## Troubleshooting

### Backend shows "ok" but no bookings
- Wait 30 seconds for initial sync
- Check Render logs for errors
- Verify iCal URL is correct in environment variables

### Frontend not connecting to backend
- Check VITE_API_URL is set in Vercel
- Redeploy Vercel after adding the variable
- Check browser console for CORS errors

### "Dates Not Available" not working
- Backend might be spinning down (first request is slow)
- Check backend is returning bookings: `/api/availability`
- Check browser console for API errors

---

## Quick Checklist

- [ ] Deploy backend to Render
- [ ] Add environment variables (iCal URL)
- [ ] Wait for deployment to complete
- [ ] Copy backend URL
- [ ] Add VITE_API_URL to Vercel
- [ ] Redeploy Vercel
- [ ] Test backend health endpoint
- [ ] Test availability endpoint
- [ ] Test booking on website with booked dates
- [ ] Test booking with available dates

---

## Your URLs

**Frontend (Vercel):**
```
https://cottage-ragati.vercel.app
```

**Backend (Render):**
```
https://cottage-ragati-api.onrender.com
```

**API Endpoints:**
- Health: `/api/health`
- Availability: `/api/availability`
- Check Date: `/api/check-date?date=2025-12-25`
- Manual Sync: `/api/sync` (POST)

---

## Need Help?

If you get stuck:
1. Check Render logs (Dashboard → Your Service → Logs)
2. Check Vercel logs (Dashboard → Your Project → Deployments → View Function Logs)
3. Check browser console (F12) for frontend errors

The system should work perfectly once both are deployed and connected! 🚀
