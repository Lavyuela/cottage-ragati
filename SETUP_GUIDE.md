# Cottage Ragati Website - Setup Guide

This guide will walk you through setting up your Cottage Ragati website with Airbnb and Booking.com integration.

## 🚀 Quick Start (5 Minutes)

### 1. Install Dependencies

Open your terminal in the project folder and run:

```bash
npm run install-all
```

This will install all dependencies for the root, client, and server.

### 2. Get Your Calendar URLs

#### Airbnb iCal URL:
1. Log into your Airbnb host account
2. Go to your listing
3. Click on **Calendar**
4. Click **Availability settings**
5. Scroll to **Sync calendars**
6. Click **Export calendar**
7. Copy the calendar address (it looks like: `https://www.airbnb.com/calendar/ical/XXXXXXX.ics`)

#### Booking.com iCal URL:
1. Log into Booking.com Extranet
2. Go to **Calendar**
3. Click **Import/Export calendars**
4. Under **Export calendar**, copy the iCal link
5. It looks like: `https://admin.booking.com/hotel/hoteladmin/ical.html?t=XXXXXXX`

### 3. Configure Environment Variables

1. Navigate to the `server` folder
2. Copy `.env.example` to `.env`:
   ```bash
   cd server
   copy .env.example .env
   ```

3. Open `.env` in a text editor and paste your URLs:
   ```env
   PORT=5000
   AIRBNB_ICAL_URL=https://www.airbnb.com/calendar/ical/YOUR_LISTING_ID.ics
   BOOKING_ICAL_URL=https://admin.booking.com/hotel/hoteladmin/ical.html?t=YOUR_TOKEN
   ```

### 4. Start the Website

From the root folder:

```bash
npm run dev
```

This starts both the frontend (http://localhost:3000) and backend (http://localhost:5000).

Open your browser and go to: **http://localhost:3000**

## ✏️ Customization Checklist

### Essential Updates

- [ ] **Contact Information** (`client/src/components/Contact.jsx`)
  - Update phone number
  - Update email address
  - Update WhatsApp link
  - Update physical address

- [ ] **Booking Links** (`client/src/components/Booking.jsx`)
  - Add your Airbnb listing URL
  - Add your Booking.com listing URL

- [ ] **Photos** (`client/src/components/Gallery.jsx`)
  - Add cottage photos to `client/public/images/`
  - Update Gallery component to display your images

- [ ] **Social Media** (`client/src/components/Footer.jsx`)
  - Add Facebook page URL
  - Add Instagram profile URL
  - Add Twitter/X profile URL

### Optional Customization

- [ ] **Pricing Information** (`client/src/components/Booking.jsx`)
  - Update pricing details
  - Update check-in/check-out times
  - Update cancellation policy

- [ ] **About Section** (`client/src/components/About.jsx`)
  - Customize description
  - Update amenities highlights

- [ ] **Features** (`client/src/components/Features.jsx`)
  - Add/remove amenities
  - Update descriptions

- [ ] **Colors** (`client/tailwind.config.js`)
  - Change primary color scheme if desired

## 📸 Adding Photos

### Step 1: Prepare Your Photos
- Use high-quality images (at least 1920x1080px)
- Optimize file sizes (use tools like TinyPNG)
- Name files descriptively (e.g., `living-room.jpg`, `bedroom-1.jpg`)

### Step 2: Add to Project
1. Create folder: `client/public/images/`
2. Copy your photos into this folder

### Step 3: Update Gallery Component
Edit `client/src/components/Gallery.jsx`:

```jsx
const images = [
  { id: 1, title: 'Living Room', category: 'Interior', src: '/images/living-room.jpg' },
  { id: 2, title: 'Master Bedroom', category: 'Interior', src: '/images/bedroom.jpg' },
  // Add more images...
]
```

Then update the image rendering:
```jsx
<img src={image.src} alt={image.title} className="w-full h-full object-cover" />
```

## 🔧 Testing Calendar Integration

### Test the API:

1. **Check API Health:**
   Open: http://localhost:5000/api/health

2. **View Availability:**
   Open: http://localhost:5000/api/availability

3. **Manual Sync:**
   ```bash
   curl -X POST http://localhost:5000/api/sync
   ```

### Verify Calendar Sync:

1. Create a test booking on Airbnb or Booking.com
2. Wait 30 minutes (or trigger manual sync)
3. Check if the booking appears on your website's availability calendar

## 🌐 Deployment

### Option 1: Deploy to Vercel + Railway

**Frontend (Vercel):**
1. Push code to GitHub
2. Import repository on Vercel
3. Set root directory to `client`
4. Deploy

**Backend (Railway):**
1. Create new project on Railway
2. Add your GitHub repository
3. Set root directory to `server`
4. Add environment variables
5. Deploy

### Option 2: Deploy to Single VPS

1. Get a VPS (DigitalOcean, Linode, etc.)
2. Install Node.js
3. Clone repository
4. Install dependencies
5. Set up PM2:
   ```bash
   npm install -g pm2
   cd server
   pm2 start server.js --name cottage-api
   pm2 startup
   pm2 save
   ```
6. Set up Nginx reverse proxy
7. Configure SSL with Let's Encrypt

## 🆘 Common Issues

### Issue: Calendar not syncing

**Solution:**
- Verify iCal URLs are correct in `.env`
- Check that URLs are publicly accessible (test in browser)
- Look at server logs for error messages
- Ensure both platforms have calendar export enabled

### Issue: "Cannot connect to server"

**Solution:**
- Make sure backend is running on port 5000
- Check if another application is using port 5000
- Verify `.env` file exists in `server` folder

### Issue: Photos not displaying

**Solution:**
- Ensure photos are in `client/public/images/`
- Check file paths in Gallery component
- Verify image file names match exactly (case-sensitive)

### Issue: Build errors

**Solution:**
```bash
# Clear everything and reinstall
rm -rf node_modules client/node_modules server/node_modules
npm run install-all

# Clear Vite cache
rm -rf client/.vite
```

## 📞 Need Help?

If you encounter issues:

1. Check the main README.md for detailed documentation
2. Review server logs for error messages
3. Verify all environment variables are set correctly
4. Ensure all dependencies are installed

## 🎉 You're All Set!

Once you've completed the setup:
- ✅ Your website is running locally
- ✅ Calendar sync is working
- ✅ Contact information is updated
- ✅ Photos are added
- ✅ Booking links are configured

Next step: Deploy to production and share your website with guests!

---

**Happy Hosting! 🏠**
