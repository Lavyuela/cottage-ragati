# 🚀 Manual Deployment Steps for Cottage Ragati

**Your Email:** ivy.waliaula@gmail.com
**Accounts Ready:** ✅ GitHub, ✅ Vercel, ✅ Render

---

## ⚠️ STEP 0: Install Git (Required)

Git is not installed on your system. You need it to push code to GitHub.

### Install Git:
1. Download Git from: https://git-scm.com/download/win
2. Run the installer
3. Use default settings (just click Next)
4. Restart PowerShell after installation
5. Verify by running: `git --version`

**After installing Git, continue to Step 1 below.**

---

## 📦 STEP 1: Push Code to GitHub (10 minutes)

### 1.1 Create GitHub Repository

1. Go to: https://github.com/new
2. **Repository name:** `cottage-ragati`
3. **Visibility:** PUBLIC (must be public for free hosting!)
4. **Do NOT check:** "Add a README file"
5. Click **"Create repository"**

### 1.2 Push Your Code

Open PowerShell and run these commands ONE BY ONE:

```powershell
# Navigate to project folder
cd "c:/Users/Admin/Downloads/Cottage Ragati"

# Initialize Git
git init

# Configure Git (use your GitHub email)
git config user.email "ivy.waliaula@gmail.com"
git config user.name "Ivy Waliaula"

# Add all files
git add .

# Create first commit
git commit -m "Initial commit - Cottage Ragati website"

# Set branch to main
git branch -M main

# Add GitHub repository (replace YOUR_USERNAME with your actual GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/cottage-ragati.git

# Push to GitHub
git push -u origin main
```

**Note:** When pushing, you'll need to authenticate with GitHub. Use a Personal Access Token (not password).

### 1.3 Create GitHub Personal Access Token (for authentication)

1. Go to: https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. **Note:** "Cottage Ragati Deployment"
4. **Expiration:** 90 days
5. **Select scopes:** Check `repo` (full control of private repositories)
6. Click **"Generate token"**
7. **COPY THE TOKEN** (you won't see it again!)
8. Use this token as your password when pushing to GitHub

---

## 🖥️ STEP 2: Deploy Backend to Render (15 minutes)

### 2.1 Go to Render Dashboard

1. Open: https://render.com/dashboard
2. Sign in with: ivy.waliaula@gmail.com

### 2.2 Create New Web Service

1. Click the **"New +"** button (top right)
2. Select **"Web Service"**

### 2.3 Connect GitHub

1. Click **"Connect account"** under GitHub
2. Authorize Render to access your GitHub
3. Select **"Only select repositories"**
4. Choose **"cottage-ragati"**
5. Click **"Install"**

### 2.4 Configure Web Service

Fill in these settings:

| Setting | Value |
|---------|-------|
| **Name** | `cottage-ragati-api` |
| **Region** | Frankfurt (closest to Kenya) |
| **Branch** | `main` |
| **Root Directory** | `server` |
| **Runtime** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `node server.js` |
| **Instance Type** | **Free** |

### 2.5 Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"**

Add these THREE variables:

| Key | Value |
|-----|-------|
| `PORT` | `5000` |
| `AIRBNB_ICAL_URL` | Your Airbnb calendar URL (see below) |
| `BOOKING_ICAL_URL` | Your Booking.com calendar URL (see below) |

#### How to Get Airbnb iCal URL:
1. Go to your Airbnb listing
2. Click **Calendar**
3. Click **Availability settings**
4. Scroll to **"Sync calendars"**
5. Click **"Export calendar"**
6. Copy the URL (looks like: `https://www.airbnb.com/calendar/ical/XXXXX.ics`)

#### How to Get Booking.com iCal URL:
1. Log into Booking.com Extranet
2. Go to **Calendar**
3. Click **"Import/Export calendars"**
4. Under **"Export calendar"**, copy the iCal link
5. (looks like: `https://admin.booking.com/hotel/hoteladmin/ical.html?t=XXXXX`)

**Note:** If you don't have these URLs yet, you can use dummy URLs for now and update later.

### 2.6 Deploy Backend

1. Click **"Create Web Service"**
2. Wait 3-5 minutes for deployment
3. You'll see "Live" with a green dot when ready
4. **COPY YOUR BACKEND URL** (e.g., `https://cottage-ragati-api.onrender.com`)
5. **SAVE THIS URL** - you'll need it for Step 3!

### 2.7 Test Backend

Open your backend URL in a browser and add `/api/health`:
- Example: `https://cottage-ragati-api.onrender.com/api/health`
- You should see: `{"status":"ok","message":"Cottage Ragati API is running"}`

---

## 🌐 STEP 3: Deploy Frontend to Vercel (10 minutes)

### 3.1 Go to Vercel

1. Open: https://vercel.com/new
2. Sign in with: ivy.waliaula@gmail.com

### 3.2 Import Repository

1. Click **"Import Git Repository"**
2. If not connected, click **"Connect GitHub Account"**
3. Authorize Vercel
4. Find **"cottage-ragati"** repository
5. Click **"Import"**

### 3.3 Configure Project

Fill in these settings:

| Setting | Value |
|---------|-------|
| **Project Name** | `cottage-ragati` |
| **Framework Preset** | `Vite` |
| **Root Directory** | `client` (click Edit and select) |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |

### 3.4 Add Environment Variable

Click **"Environment Variables"**

Add this ONE variable:

| Name | Value |
|------|-------|
| `VITE_API_URL` | Your Render backend URL from Step 2.6 |

**Example:** `https://cottage-ragati-api.onrender.com`

**Important:** Do NOT include `/api` at the end!

### 3.5 Deploy Frontend

1. Click **"Deploy"**
2. Wait 2-3 minutes
3. You'll see "Congratulations!" when done
4. Click **"Visit"** to see your live website!

Your website will be at: `https://cottage-ragati.vercel.app`

---

## ✅ STEP 4: Test Your Website (5 minutes)

Visit your Vercel URL and check:

- [ ] Homepage loads correctly
- [ ] All sections display (Hero, About, Features, Gallery, etc.)
- [ ] Availability calendar shows
- [ ] No errors in browser console (Press F12 → Console tab)
- [ ] Booking buttons work
- [ ] Contact form displays
- [ ] Mobile responsive (resize browser window)

---

## 🎉 You're Live!

**Your Website:** `https://cottage-ragati.vercel.app`
**Your API:** `https://cottage-ragati-api.onrender.com`

---

## 📝 Post-Deployment Tasks

### Immediate Updates Needed:

1. **Add Real Photos**
   - Create folder: `client/public/images/`
   - Add cottage photos
   - Update `client/src/components/Gallery.jsx`

2. **Update Contact Info**
   - Edit: `client/src/components/Contact.jsx`
   - Add your phone, email, WhatsApp

3. **Add Booking Links**
   - Edit: `client/src/components/Booking.jsx`
   - Add real Airbnb and Booking.com listing URLs

4. **Update Calendar URLs**
   - Go to Render dashboard
   - Click your service
   - Go to Environment
   - Update `AIRBNB_ICAL_URL` and `BOOKING_ICAL_URL`

### After Making Changes:

```powershell
cd "c:/Users/Admin/Downloads/Cottage Ragati"
git add .
git commit -m "Update content and photos"
git push
```

Both Vercel and Render will automatically redeploy!

---

## 🆘 Troubleshooting

### Git not working?
- Install Git from: https://git-scm.com/download/win
- Restart PowerShell after installation

### Can't push to GitHub?
- Use Personal Access Token instead of password
- Get token from: https://github.com/settings/tokens

### Backend not responding?
- Check Render logs for errors
- Verify environment variables are set correctly
- Test: `https://your-api.onrender.com/api/health`

### Frontend shows blank page?
- Check browser console for errors (F12)
- Verify `VITE_API_URL` is set correctly in Vercel
- Make sure it points to your Render URL

### Calendar not syncing?
- Verify iCal URLs are correct
- Check they're publicly accessible
- View Render logs for sync errors

---

## 💰 Cost Summary

- **Hosting:** $0/month (100% FREE!)
- **Domain (optional):** ~$10-15/year

---

## 📞 Next Steps

1. Complete the deployment following steps above
2. Add your cottage photos
3. Update contact information
4. Test calendar sync with real bookings
5. Share your website with guests!

---

**Good luck with your deployment! 🚀**

If you get stuck, review the error messages carefully and check the troubleshooting section.
