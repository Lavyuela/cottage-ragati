# 🚀 Deploy Cottage Ragati - Step by Step Guide

Follow these steps to deploy your website for FREE!

## ✅ Prerequisites

- [ ] GitHub account (create at [github.com](https://github.com))
- [ ] Vercel account (sign up at [vercel.com](https://vercel.com))
- [ ] Render account (sign up at [render.com](https://render.com))
- [ ] Your Airbnb iCal URL
- [ ] Your Booking.com iCal URL

---

## 📦 STEP 1: Push Code to GitHub

### 1.1 Create a GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `cottage-ragati`
3. Make it **Public** (required for free hosting)
4. Click **Create repository**

### 1.2 Push Your Code

Open PowerShell in your project folder and run:

```powershell
cd "c:/Users/Admin/Downloads/Cottage Ragati"

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Cottage Ragati website"

# Add your GitHub repository (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/cottage-ragati.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Note:** Replace `YOUR_USERNAME` with your actual GitHub username!

---

## 🖥️ STEP 2: Deploy Backend to Render

### 2.1 Create Web Service

1. Go to [render.com/dashboard](https://render.com/dashboard)
2. Click **New +** button
3. Select **Web Service**

### 2.2 Connect Repository

1. Click **Connect account** to link GitHub
2. Find and select your `cottage-ragati` repository
3. Click **Connect**

### 2.3 Configure Service

Fill in these settings:

- **Name**: `cottage-ragati-api`
- **Region**: Choose closest to Kenya (e.g., Frankfurt or Singapore)
- **Branch**: `main`
- **Root Directory**: `server`
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `node server.js`
- **Instance Type**: `Free`

### 2.4 Add Environment Variables

Click **Advanced** → **Add Environment Variable**

Add these two variables:

| Key | Value |
|-----|-------|
| `PORT` | `5000` |
| `AIRBNB_ICAL_URL` | Your Airbnb iCal URL |
| `BOOKING_ICAL_URL` | Your Booking.com iCal URL |

### 2.5 Deploy

1. Click **Create Web Service**
2. Wait 3-5 minutes for deployment
3. Copy your backend URL (e.g., `https://cottage-ragati-api.onrender.com`)

**✅ Backend is now live!**

---

## 🌐 STEP 3: Deploy Frontend to Vercel

### 3.1 Import Project

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **Import Git Repository**
3. Find your `cottage-ragati` repository
4. Click **Import**

### 3.2 Configure Project

- **Project Name**: `cottage-ragati`
- **Framework Preset**: `Vite`
- **Root Directory**: `client`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

### 3.3 Add Environment Variable

Click **Environment Variables** and add:

| Name | Value |
|------|-------|
| `VITE_API_URL` | Your Render backend URL (from Step 2.5) |

Example: `https://cottage-ragati-api.onrender.com`

### 3.4 Deploy

1. Click **Deploy**
2. Wait 2-3 minutes
3. Your site will be live at: `https://cottage-ragati.vercel.app`

**✅ Frontend is now live!**

---

## 🔧 STEP 4: Update Backend CORS

Your backend needs to allow requests from your Vercel domain.

### 4.1 Update server.js

In your local project, edit `server/server.js`:

Find this line:
```javascript
app.use(cors());
```

Replace with:
```javascript
app.use(cors({
  origin: ['https://cottage-ragati.vercel.app', 'http://localhost:3001'],
  credentials: true
}));
```

### 4.2 Push Changes

```powershell
git add .
git commit -m "Update CORS for production"
git push
```

Render will automatically redeploy your backend!

---

## 🎨 STEP 5: Customize Your Domain (Optional)

### On Vercel:
1. Go to your project settings
2. Click **Domains**
3. Add your custom domain (e.g., `cottageragati.com`)
4. Follow DNS setup instructions

### Cost:
- Domain: ~$10-15/year (from Namecheap, GoDaddy, etc.)
- Hosting: **FREE** ✨

---

## ✅ Deployment Checklist

After deployment, verify:

- [ ] Frontend loads at your Vercel URL
- [ ] Backend API responds at `/api/health`
- [ ] Calendar availability displays correctly
- [ ] Booking links work
- [ ] Contact form displays
- [ ] Mobile responsive design works
- [ ] All images load (add your photos!)

---

## 🔄 Making Updates

After deployment, to update your site:

```powershell
# Make your changes locally
# Then push to GitHub:
git add .
git commit -m "Description of changes"
git push

# Both Vercel and Render will auto-deploy!
```

---

## 🆘 Troubleshooting

### Backend not responding
- Check Render logs for errors
- Verify environment variables are set
- Ensure iCal URLs are valid

### Frontend shows errors
- Check browser console (F12)
- Verify VITE_API_URL is correct
- Check Vercel deployment logs

### Calendar not syncing
- Verify iCal URLs in Render environment variables
- Check backend logs on Render
- Test API endpoint: `https://your-api.onrender.com/api/health`

---

## 📊 Free Tier Limits

**Vercel:**
- ✅ 100GB bandwidth/month
- ✅ Unlimited projects
- ✅ Automatic HTTPS

**Render:**
- ✅ 750 hours/month (enough for 24/7)
- ⚠️ Sleeps after 15 min inactivity (wakes in ~30 seconds)
- ✅ Automatic HTTPS

**Upgrade if needed:**
- Render: $7/month for always-on
- Vercel: $20/month for Pro features

---

## 🎉 You're Done!

Your Cottage Ragati website is now live and accessible worldwide!

**Share your links:**
- Website: `https://cottage-ragati.vercel.app`
- API: `https://cottage-ragati-api.onrender.com`

**Next steps:**
1. Add your actual cottage photos
2. Update contact information
3. Add real Airbnb and Booking.com listing URLs
4. Share your website link with guests!

---

**Need help?** Check the main README.md or DEPLOYMENT.md for more details.

**Happy Hosting! 🏠✨**
