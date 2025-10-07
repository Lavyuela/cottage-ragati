# 🏠 Cottage Ragati - START HERE

## 🎯 What You Have

A complete, production-ready website for Cottage Ragati with:
- ✅ Modern, responsive design
- ✅ Real-time calendar sync with Airbnb & Booking.com
- ✅ Contact forms and booking links
- ✅ Ready to deploy for FREE

---

## 🚀 Quick Deploy (Choose One)

### Option 1: Automated Setup (Easiest)
```powershell
cd "c:/Users/Admin/Downloads/Cottage Ragati"
powershell -ExecutionPolicy Bypass -File deploy-setup.ps1
```
Then follow the on-screen instructions!

### Option 2: Follow Step-by-Step Guide
Open `DEPLOY_NOW.md` for detailed instructions with screenshots.

### Option 3: Use Checklist
Open `DEPLOYMENT_CHECKLIST.md` for a quick checklist format.

---

## 📋 What You Need

Before deploying, have these ready:

1. **GitHub Account** - [Sign up free](https://github.com/signup)
2. **Vercel Account** - [Sign up free](https://vercel.com/signup)
3. **Render Account** - [Sign up free](https://render.com/signup)
4. **Airbnb iCal URL** - Get from your listing's calendar settings
5. **Booking.com iCal URL** - Get from Extranet calendar export

---

## ⏱️ Time Required

- **GitHub Setup:** 5 minutes
- **Backend Deploy (Render):** 10 minutes
- **Frontend Deploy (Vercel):** 10 minutes
- **Testing:** 5 minutes

**Total: ~30 minutes** ⏰

---

## 💰 Cost

**$0/month** - Completely FREE hosting! 🎉

Optional:
- Custom domain: ~$10-15/year

---

## 📁 Important Files

| File | Purpose |
|------|---------|
| `START_HERE.md` | You are here! Quick overview |
| `DEPLOY_NOW.md` | Detailed deployment guide |
| `DEPLOYMENT_CHECKLIST.md` | Quick checklist format |
| `deploy-setup.ps1` | Automated deployment script |
| `README.md` | Technical documentation |
| `SETUP_GUIDE.md` | Local development setup |

---

## 🎨 Customization Needed

After deployment, update these:

### High Priority:
1. **Photos** - Add real cottage images
   - Location: `client/public/images/`
   - Update: `client/src/components/Gallery.jsx`

2. **Contact Info** - Add your details
   - File: `client/src/components/Contact.jsx`
   - Update: Phone, email, WhatsApp

3. **Booking Links** - Add real URLs
   - File: `client/src/components/Booking.jsx`
   - Update: Airbnb and Booking.com listing URLs

### Medium Priority:
4. **About Section** - Customize description
   - File: `client/src/components/About.jsx`

5. **Social Media** - Add your links
   - File: `client/src/components/Footer.jsx`

---

## 🔧 Local Development

To run locally:

```powershell
# Backend (Terminal 1)
cd server
node server.js

# Frontend (Terminal 2)
cd client
npm run dev
```

Visit: `http://localhost:3001`

---

## ✅ Deployment Steps Summary

1. **Push to GitHub** (5 min)
   - Create repository
   - Push code

2. **Deploy Backend to Render** (10 min)
   - Create web service
   - Add environment variables
   - Deploy

3. **Deploy Frontend to Vercel** (10 min)
   - Import repository
   - Configure settings
   - Deploy

4. **Test & Customize** (ongoing)
   - Verify everything works
   - Add photos and content
   - Share with guests!

---

## 🆘 Need Help?

### Quick Questions?
- Check `DEPLOY_NOW.md` for detailed steps
- Check `README.md` for technical info

### Common Issues:
- **Blank screen?** Check browser console (F12)
- **API not working?** Verify environment variables
- **Calendar not syncing?** Check iCal URLs

### Still Stuck?
- Review the deployment logs on Vercel/Render
- Check that all environment variables are set
- Ensure repository is PUBLIC on GitHub

---

## 🎉 Ready to Deploy?

### Step 1: Create Accounts
- [ ] GitHub account
- [ ] Vercel account  
- [ ] Render account

### Step 2: Get Calendar URLs
- [ ] Airbnb iCal URL
- [ ] Booking.com iCal URL

### Step 3: Deploy!
Run the automated script or follow the guide:

```powershell
powershell -ExecutionPolicy Bypass -File deploy-setup.ps1
```

---

## 📞 After Deployment

Share your website:
- ✅ Add to Airbnb listing description
- ✅ Add to Booking.com property info
- ✅ Share on social media
- ✅ Add to business cards
- ✅ Include in email signature

---

**Let's get your cottage online! 🚀**

Choose your deployment method above and let's go!
