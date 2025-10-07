# 🚀 Deployment Checklist

## Before You Start

- [ ] GitHub account created ([github.com](https://github.com))
- [ ] Vercel account created ([vercel.com](https://vercel.com))
- [ ] Render account created ([render.com](https://render.com))
- [ ] Airbnb iCal URL ready
- [ ] Booking.com iCal URL ready

---

## Quick Deployment (30 minutes)

### ✅ STEP 1: Push to GitHub (5 min)

**Option A: Use the automated script**
```powershell
cd "c:/Users/Admin/Downloads/Cottage Ragati"
powershell -ExecutionPolicy Bypass -File deploy-setup.ps1
```

**Option B: Manual commands**
```powershell
cd "c:/Users/Admin/Downloads/Cottage Ragati"
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/cottage-ragati.git
git branch -M main
git push -u origin main
```

- [ ] Code pushed to GitHub
- [ ] Repository is PUBLIC

---

### ✅ STEP 2: Deploy Backend (10 min)

1. Go to [render.com/dashboard](https://render.com/dashboard)
2. Click **New +** → **Web Service**
3. Connect GitHub repository
4. Settings:
   - Name: `cottage-ragati-api`
   - Root Directory: `server`
   - Build: `npm install`
   - Start: `node server.js`
   - Plan: **Free**

5. Environment Variables:
   ```
   PORT = 5000
   AIRBNB_ICAL_URL = your_airbnb_url
   BOOKING_ICAL_URL = your_booking_url
   ```

6. Click **Create Web Service**

- [ ] Backend deployed
- [ ] Backend URL copied: `https://cottage-ragati-api.onrender.com`
- [ ] Test URL works: `https://your-api.onrender.com/api/health`

---

### ✅ STEP 3: Deploy Frontend (10 min)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import GitHub repository
3. Settings:
   - Root Directory: `client`
   - Framework: `Vite`
   - Build: `npm run build`
   - Output: `dist`

4. Environment Variable:
   ```
   VITE_API_URL = https://cottage-ragati-api.onrender.com
   ```
   (Use your actual Render URL from Step 2)

5. Click **Deploy**

- [ ] Frontend deployed
- [ ] Website URL: `https://cottage-ragati.vercel.app`
- [ ] Website loads correctly

---

### ✅ STEP 4: Test Everything (5 min)

Visit your website and check:

- [ ] Homepage loads
- [ ] All sections display correctly
- [ ] Availability calendar shows
- [ ] No console errors (press F12)
- [ ] Mobile responsive works
- [ ] Booking links work

---

## 🎉 You're Live!

**Your website:** `https://cottage-ragati.vercel.app`
**Your API:** `https://cottage-ragati-api.onrender.com`

---

## 📝 Post-Deployment Tasks

### Immediate:
- [ ] Add your actual cottage photos
- [ ] Update contact information (phone, email)
- [ ] Add real Airbnb listing URL
- [ ] Add real Booking.com listing URL
- [ ] Test calendar sync with real bookings

### Optional:
- [ ] Add custom domain
- [ ] Set up Google Analytics
- [ ] Add Facebook Pixel
- [ ] Create social media accounts
- [ ] Add WhatsApp business number

---

## 🔄 Making Updates

After making changes locally:

```powershell
git add .
git commit -m "Description of changes"
git push
```

Both Vercel and Render will automatically redeploy! ✨

---

## 🆘 Need Help?

- **Detailed Guide:** See `DEPLOY_NOW.md`
- **Technical Docs:** See `DEPLOYMENT.md`
- **General Info:** See `README.md`

---

## 💰 Cost Summary

- **Hosting:** FREE (Vercel + Render free tiers)
- **Domain (optional):** ~$10-15/year
- **Total:** $0/month 🎉

---

**Ready to deploy? Start with STEP 1!** 🚀
