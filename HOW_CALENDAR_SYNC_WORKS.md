# How Calendar Sync Prevents Double Booking

## The Complete Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    BOOKING PLATFORMS                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  📱 Airbnb                         🌐 Booking.com               │
│  └─ Guest books                    └─ Guest books               │
│     Dec 1-5, 2025                     Dec 10-15, 2025           │
│                                                                  │
│  📤 Exports iCal Feed               📤 Exports iCal Feed        │
│     (updates every 30 min)             (updates every 30 min)   │
│                                                                  │
└──────────────────┬──────────────────────────┬───────────────────┘
                   │                          │
                   │ iCal URL                 │ iCal URL
                   │                          │
                   ▼                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                    YOUR BACKEND SERVER                           │
│                    (Node.js + Express)                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  🔄 Auto-Sync (Every 30 minutes)                                │
│     1. Fetch Airbnb iCal                                        │
│     2. Fetch Booking.com iCal                                   │
│     3. Parse all bookings                                       │
│     4. Store in memory cache                                    │
│                                                                  │
│  📊 Combined Booked Dates:                                      │
│     • Dec 1-5 (Airbnb)                                          │
│     • Dec 10-15 (Booking.com)                                   │
│                                                                  │
│  🔌 API Endpoints:                                              │
│     • GET /api/availability  → All booked dates                 │
│     • GET /api/check-date    → Check specific date             │
│     • POST /api/sync         → Manual sync trigger             │
│                                                                  │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                               │ API Call
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                    YOUR WEBSITE                                  │
│                    (React + Vite)                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  👤 Guest visits booking page                                   │
│                                                                  │
│  1️⃣ Selects: Dec 3-7, 2025                                     │
│                                                                  │
│  2️⃣ Website checks availability:                               │
│     ✓ Fetches booked dates from backend                        │
│     ✓ Checks each day: Dec 3, 4, 5, 6, 7                       │
│                                                                  │
│  3️⃣ Finds conflict:                                            │
│     ❌ Dec 3, 4, 5 are booked on Airbnb                        │
│                                                                  │
│  4️⃣ Shows error:                                               │
│     "Dates Not Available"                                       │
│     "These dates are already booked on Airbnb"                  │
│                                                                  │
│  ───────────────────────────────────────────────────────        │
│                                                                  │
│  👤 Guest tries again: Dec 20-25, 2025                          │
│                                                                  │
│  2️⃣ Website checks availability:                               │
│     ✓ Checks each day: Dec 20, 21, 22, 23, 24, 25             │
│                                                                  │
│  3️⃣ All days available! ✅                                     │
│                                                                  │
│  4️⃣ Shows booking form:                                        │
│     • Price breakdown                                           │
│     • Payment options (M-Pesa, Card, Bank)                      │
│     • Confirm booking button                                    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Real-Time Availability Check

### When Guest Selects Dates:

```javascript
User selects: Check-in Dec 3 → Check-out Dec 7

System generates date range:
[Dec 3, Dec 4, Dec 5, Dec 6, Dec 7]

For each date, check against booked dates:
  Dec 3: ❌ BOOKED (Airbnb booking Dec 1-5)
  Dec 4: ❌ BOOKED (Airbnb booking Dec 1-5)
  Dec 5: ❌ BOOKED (Airbnb booking Dec 1-5)
  Dec 6: ✅ Available
  Dec 7: ✅ Available

Result: ANY date booked = ENTIRE RANGE BLOCKED
→ Show error message
→ Disable payment button
```

## Why You Don't Need Links to Airbnb/Booking.com

### Your Current Setup:
```
Website → Shows "Book Direct & Save" (with calendar sync)
        ↓
        OR
        ↓
        Links to Airbnb/Booking.com (optional)
```

### You Can Remove External Links Because:
1. ✅ Your website checks their calendars automatically
2. ✅ Prevents double bookings without sending guests away
3. ✅ You keep 100% of the booking (no platform fees)
4. ✅ Direct relationship with guests

### But Keep Them If:
- You want to give guests payment options they trust
- You're building reputation on those platforms
- You want their booking protection/insurance

## The Two-Way Sync Problem

### Current Setup (One-Way):
```
Airbnb → Your Website ✅ (iCal import)
Your Website → Airbnb ❌ (manual blocking needed)

Booking.com → Your Website ✅ (iCal import)
Your Website → Booking.com ❌ (manual blocking needed)
```

### What You Need to Do:
When someone books directly on your website:
1. **Accept the booking** (via M-Pesa/Card/Bank)
2. **Manually block dates** on Airbnb calendar
3. **Manually block dates** on Booking.com calendar

### To Automate (Advanced):
Use a channel manager that supports:
- Importing FROM Airbnb/Booking.com ✅
- Exporting TO Airbnb/Booking.com ✅

**Options:**
- Create your own iCal feed (requires hosting)
- Use a PMS (Property Management System)
- Use Zapier/Make.com automation

## Example Scenario

### Scenario 1: Airbnb Booking
```
Day 1, 10:00 AM
└─ Guest books Dec 1-5 on Airbnb

Day 1, 10:15 AM (next sync)
└─ Your backend fetches Airbnb iCal
└─ Sees new booking Dec 1-5
└─ Updates cache

Day 1, 10:20 AM
└─ Someone visits your website
└─ Tries to book Dec 3-7
└─ System checks: Dec 3,4,5 are booked
└─ ❌ Booking blocked
```

### Scenario 2: Direct Website Booking
```
Day 1, 2:00 PM
└─ Guest books Dec 20-25 on your website
└─ Pays via M-Pesa
└─ ✅ Booking confirmed

Day 1, 2:05 PM (YOU MUST DO THIS)
└─ Log into Airbnb
└─ Block Dec 20-25 manually

Day 1, 2:10 PM (YOU MUST DO THIS)
└─ Log into Booking.com
└─ Block Dec 20-25 manually

Result:
└─ All platforms now show Dec 20-25 as unavailable
└─ No double booking possible
```

## Configuration Checklist

- [ ] Get Airbnb iCal URL
- [ ] Get Booking.com iCal URL
- [ ] Add URLs to `server/.env` file
- [ ] Start backend server
- [ ] Verify sync is working (`/api/availability`)
- [ ] Test booking unavailable dates (should block)
- [ ] Test booking available dates (should allow)
- [ ] Set up process for manual blocking after direct bookings
- [ ] Consider channel manager for full automation

## Testing Your Setup

### Test 1: Check Sync is Working
```bash
# Call the API
curl http://localhost:5000/api/availability

# Should return:
{
  "bookedDates": [
    {
      "start": "2025-12-01T00:00:00.000Z",
      "end": "2025-12-05T00:00:00.000Z",
      "source": "Airbnb"
    },
    {
      "start": "2025-12-10T00:00:00.000Z",
      "end": "2025-12-15T00:00:00.000Z",
      "source": "Booking.com"
    }
  ],
  "lastUpdated": "2025-10-21T09:30:00.000Z",
  "totalBookings": 2
}
```

### Test 2: Try Booking Blocked Dates
1. Go to your website booking page
2. Select check-in: Dec 1
3. Select check-out: Dec 3
4. Should see: ❌ "Dates Not Available"

### Test 3: Try Booking Available Dates
1. Select check-in: Dec 20
2. Select check-out: Dec 25
3. Should see: ✅ Price breakdown and payment options

## Summary

✅ **What's Automated:**
- Fetching bookings from Airbnb
- Fetching bookings from Booking.com
- Checking availability on your website
- Preventing double bookings

❌ **What's Manual:**
- Blocking dates on Airbnb after direct booking
- Blocking dates on Booking.com after direct booking

💡 **Best Practice:**
Keep a booking log/spreadsheet with:
- Guest name
- Dates
- Platform (Website/Airbnb/Booking.com)
- Payment status
- Dates blocked on all platforms ✓

This ensures you never miss blocking dates manually!
