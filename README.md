# Cottage Ragati Website

A modern, responsive website for Cottage Ragati in Nanyuki, Kenya, featuring real-time calendar synchronization with Airbnb and Booking.com.

## Features

- 🏠 **Modern UI/UX** - Built with React, TailwindCSS, and Lucide icons
- 📅 **Real-time Availability** - Live calendar sync with Airbnb and Booking.com
- 🔄 **Automatic Updates** - Calendar syncs every 30 minutes automatically
- 📱 **Responsive Design** - Works perfectly on all devices
- ⚡ **Fast Performance** - Optimized with Vite
- 🎨 **Beautiful Design** - Professional and modern interface

## Tech Stack

### Frontend
- React 18
- Vite
- TailwindCSS
- Lucide React (icons)
- date-fns (date handling)
- Axios

### Backend
- Node.js
- Express
- iCal parser
- node-cron (scheduled tasks)
- CORS enabled

## Installation

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Step 1: Install Dependencies

```bash
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
cd ..
```

### Step 2: Configure Calendar URLs

1. Copy the example environment file:
```bash
cd server
copy .env.example .env
```

2. Edit `server/.env` and add your calendar URLs:

**For Airbnb:**
- Go to your Airbnb listing
- Navigate to Calendar → Availability settings → Export calendar
- Copy the iCal link and paste it as `AIRBNB_ICAL_URL`

**For Booking.com:**
- Log into Booking.com Extranet
- Go to Calendar → Import/Export → Export calendar
- Copy the iCal link and paste it as `BOOKING_ICAL_URL`

Example `.env` file:
```env
PORT=5000
AIRBNB_ICAL_URL=https://www.airbnb.com/calendar/ical/YOUR_LISTING_ID.ics
BOOKING_ICAL_URL=https://admin.booking.com/hotel/hoteladmin/ical.html?t=YOUR_TOKEN
```

### Step 3: Update Contact Information

Edit the following files with your actual information:

1. **Contact Details** (`client/src/components/Contact.jsx`):
   - Phone number
   - Email address
   - WhatsApp link
   - Physical address

2. **Booking Links** (`client/src/components/Booking.jsx`):
   - Airbnb listing URL
   - Booking.com listing URL

### Step 4: Add Photos

Replace placeholder images with actual cottage photos:

1. Create an images folder: `client/public/images/`
2. Add high-quality photos of:
   - Living room
   - Bedrooms
   - Kitchen
   - Bathrooms
   - Exterior views
   - Garden/outdoor areas
   - Mount Kenya views

3. Update `client/src/components/Gallery.jsx` to use your images

## Running the Application

### Development Mode

Run both frontend and backend simultaneously:

```bash
npm run dev
```

This will start:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### Production Build

Build the frontend for production:

```bash
npm run build
```

The built files will be in `client/dist/`

## API Endpoints

### GET /api/health
Check if the API is running and view last sync time.

**Response:**
```json
{
  "status": "ok",
  "message": "Cottage Ragati API is running",
  "lastSync": "2025-10-07T08:00:00.000Z"
}
```

### GET /api/availability
Get all booked dates from Airbnb and Booking.com.

**Response:**
```json
{
  "bookedDates": [
    {
      "start": "2025-10-15T00:00:00.000Z",
      "end": "2025-10-20T00:00:00.000Z",
      "summary": "Booked",
      "source": "Airbnb"
    }
  ],
  "lastUpdated": "2025-10-07T08:00:00.000Z",
  "totalBookings": 5
}
```

### GET /api/check-date?date=2025-10-15
Check if a specific date is available.

**Response:**
```json
{
  "date": "2025-10-15",
  "available": false,
  "booked": true
}
```

### POST /api/sync
Manually trigger a calendar sync.

**Response:**
```json
{
  "success": true,
  "message": "Calendars synced successfully",
  "lastUpdated": "2025-10-07T08:00:00.000Z"
}
```

## Deployment

### Option 1: Vercel (Frontend) + Heroku (Backend)

**Frontend (Vercel):**
```bash
cd client
vercel deploy
```

**Backend (Heroku):**
```bash
cd server
heroku create cottage-ragati-api
git push heroku main
```

### Option 2: Single Server (VPS)

1. Install Node.js on your server
2. Clone the repository
3. Install dependencies
4. Set up PM2 for process management:
```bash
npm install -g pm2
pm2 start server/server.js --name cottage-api
pm2 startup
pm2 save
```

5. Set up Nginx as reverse proxy
6. Configure SSL with Let's Encrypt

## Customization

### Colors
Edit `client/tailwind.config.js` to change the primary color scheme.

### Content
Update text content in the component files:
- `client/src/components/Hero.jsx` - Hero section
- `client/src/components/About.jsx` - About section
- `client/src/components/Features.jsx` - Amenities list
- `client/src/components/Booking.jsx` - Pricing and policies

### Sync Frequency
Edit `server/server.js` line with cron schedule:
```javascript
// Change '*/30 * * * *' to your preferred schedule
// Examples:
// '*/15 * * * *' - Every 15 minutes
// '0 * * * *' - Every hour
// '0 */2 * * *' - Every 2 hours
cron.schedule('*/30 * * * *', () => {
  syncCalendars()
})
```

## Troubleshooting

### Calendar not syncing
- Verify iCal URLs are correct in `.env`
- Check server logs for errors
- Ensure URLs are publicly accessible
- Test URLs in a browser

### CORS errors
- Ensure backend is running on port 5000
- Check Vite proxy configuration in `client/vite.config.js`

### Build errors
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf client/.vite`

## Support

For issues or questions:
- Email: info@cottageragati.com
- Phone: +254 XXX XXX XXX

## License

MIT License - feel free to customize for your needs.

---

Built with ❤️ for Cottage Ragati
