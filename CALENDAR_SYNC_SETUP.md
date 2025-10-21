# Calendar Sync Setup Guide

## How It Works

Your website now has **automatic calendar synchronization** that prevents double bookings across all platforms:

```
Airbnb Bookings ──┐
                  ├──> Your Backend Server ──> Your Website
Booking.com ──────┘     (Syncs every 30 min)    (Shows availability)
```

### What This Means:
- ✅ When someone books on Airbnb, those dates become unavailable on your website
- ✅ When someone books on Booking.com, those dates become unavailable on your website
- ✅ Your website checks availability in real-time before accepting direct bookings
- ✅ **No double bookings possible!**

## Step 1: Get Your iCal URLs

### From Airbnb:
1. Log into your Airbnb host account
2. Go to your listing
3. Click **Availability** → **Calendar sync**
4. Click **Export Calendar**
5. Copy the iCal URL (looks like: `https://www.airbnb.com/calendar/ical/...`)

### From Booking.com:
1. Log into your Booking.com extranet
2. Go to **Calendar**
3. Click **Sync calendars**
4. Find **Export calendar** section
5. Copy the iCal URL (looks like: `https://admin.booking.com/hotel/hoteladmin/ical/...`)

## Step 2: Configure Your Backend

### Local Development:
1. Open `server/.env` file
2. Add your iCal URLs:
```env
AIRBNB_ICAL_URL=https://www.airbnb.com/calendar/ical/YOUR_LISTING_ID
BOOKING_ICAL_URL=https://admin.booking.com/hotel/hoteladmin/ical/YOUR_PROPERTY_ID
PORT=5000
```

### Production (Vercel/Railway/Render):
1. Go to your backend hosting platform
2. Add environment variables:
   - `AIRBNB_ICAL_URL` = your Airbnb iCal URL
   - `BOOKING_ICAL_URL` = your Booking.com iCal URL
   - `PORT` = 5000

## Step 3: Export Your Calendar TO Airbnb/Booking.com

**Important:** You also need to export your direct bookings TO Airbnb and Booking.com to keep them updated!

### Option A: Manual Updates
When you receive a direct booking:
1. Block those dates on Airbnb calendar manually
2. Block those dates on Booking.com calendar manually

### Option B: Automated (Recommended)
Use a calendar management tool like:
- **iCal.ly** (free)
- **Hostfully**
- **Guesty**
- **Lodgify**

These tools create a master calendar that syncs to all platforms.

## Step 4: Test the System

1. **Start your backend server:**
   ```bash
   cd server
   npm start
   ```

2. **Check the health endpoint:**
   ```
   http://localhost:5000/api/health
   ```
   Should show: `"status": "ok"` and last sync time

3. **Check availability:**
   ```
   http://localhost:5000/api/availability
   ```
   Should show all booked dates from both platforms

4. **Test on your website:**
   - Try to book dates that are already booked on Airbnb
   - You should see an error: "Dates Not Available"

## How the Sync Works

### Automatic Sync:
- Runs **every 30 minutes** automatically
- Fetches latest bookings from Airbnb and Booking.com
- Updates availability on your website

### Manual Sync:
You can trigger a manual sync by calling:
```bash
POST http://localhost:5000/api/sync
```

### What Gets Synced:
- ✅ Booking start and end dates
- ✅ Source platform (Airbnb or Booking.com)
- ✅ Booking summary/title
- ❌ Guest personal information (not included in iCal)
- ❌ Payment details (not included in iCal)

## Preventing Double Bookings

### The System Checks:
1. User selects check-in and check-out dates
2. System checks **every single day** in that range
3. If ANY day is booked on Airbnb or Booking.com → **Booking blocked**
4. If all days are free → **Booking allowed**

### Visual Feedback:
- 🔄 "Checking availability..." (while verifying)
- ✅ Shows price breakdown (if available)
- ❌ "Dates Not Available" (if conflict found)
- 📝 "These dates are already booked on Airbnb or Booking.com"

## Troubleshooting

### Problem: No bookings showing up
**Solution:**
- Check that iCal URLs are correct in `.env`
- Verify URLs are accessible (paste in browser)
- Check server logs for errors
- Try manual sync: `POST /api/sync`

### Problem: Old bookings still showing
**Solution:**
- Wait for next automatic sync (every 30 minutes)
- Or trigger manual sync
- Restart the server

### Problem: Calendar not syncing
**Solution:**
- Verify iCal URLs haven't expired (they sometimes do)
- Regenerate iCal URLs from Airbnb/Booking.com
- Update `.env` with new URLs
- Restart server

### Problem: Website accepts booking but dates are taken
**Solution:**
- This means the calendar wasn't synced recently
- Trigger manual sync
- Check that backend server is running
- Verify frontend is calling the correct API URL

## Best Practices

1. **Check sync status regularly**
   - Monitor the `/api/health` endpoint
   - Set up uptime monitoring (UptimeRobot, Pingdom)

2. **Keep iCal URLs private**
   - Never commit them to Git
   - Only store in environment variables
   - Regenerate if accidentally exposed

3. **Manual verification**
   - When you receive a direct booking, double-check Airbnb/Booking.com
   - Block dates manually if needed (as backup)

4. **Communication**
   - When confirming direct bookings, mention you'll block dates on all platforms
   - Send confirmation email with booking details

5. **Buffer time**
   - Consider adding 1-day buffer between bookings for cleaning
   - Can be configured in the booking component

## Advanced: Two-Way Sync

To fully automate, you need to:
1. Export direct bookings TO Airbnb/Booking.com
2. Use a channel manager or PMS (Property Management System)

**Recommended Tools:**
- **Hospitable** (free tier available)
- **Guesty** (paid)
- **Hostaway** (paid)
- **Lodgify** (paid)

These tools:
- ✅ Sync calendars in both directions
- ✅ Manage all bookings in one place
- ✅ Send automated messages to guests
- ✅ Handle pricing across platforms

## Summary

Your system now:
- ✅ Fetches bookings from Airbnb every 30 minutes
- ✅ Fetches bookings from Booking.com every 30 minutes
- ✅ Validates availability before accepting direct bookings
- ✅ Shows clear error messages when dates are unavailable
- ✅ Prevents double bookings automatically

**Next step:** Get your iCal URLs and add them to your `.env` file!
