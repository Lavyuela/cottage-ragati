const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const ical = require('ical');
const axios = require('axios');
const cron = require('node-cron');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration for production
const corsOptions = {
  origin: ['https://cottage-ragati.vercel.app', 'http://localhost:3001', process.env.FRONTEND_URL].filter(Boolean),
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// In-memory cache for calendar data
let calendarCache = {
  airbnb: [],
  booking: [],
  lastUpdated: null
};

// Function to parse iCal data and extract booked dates
function parseICalData(icalData) {
  const events = ical.parseICS(icalData);
  const bookedDates = [];

  for (let key in events) {
    if (events.hasOwnProperty(key)) {
      const event = events[key];
      if (event.type === 'VEVENT') {
        const start = new Date(event.start);
        const end = new Date(event.end);
        
        bookedDates.push({
          start: start.toISOString(),
          end: end.toISOString(),
          summary: event.summary || 'Booked',
          source: event.description || 'Unknown'
        });
      }
    }
  }

  return bookedDates;
}

// Function to fetch calendar from URL
async function fetchCalendar(url, source) {
  try {
    const response = await axios.get(url, {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; CottageRagati/1.0)'
      }
    });
    
    const bookedDates = parseICalData(response.data);
    console.log(`Fetched ${bookedDates.length} bookings from ${source}`);
    return bookedDates;
  } catch (error) {
    console.error(`Error fetching ${source} calendar:`, error.message);
    return [];
  }
}

// Function to sync all calendars
async function syncCalendars() {
  console.log('Syncing calendars...');
  
  const airbnbUrl = process.env.AIRBNB_ICAL_URL;
  const bookingUrl = process.env.BOOKING_ICAL_URL;

  const results = await Promise.allSettled([
    airbnbUrl ? fetchCalendar(airbnbUrl, 'Airbnb') : Promise.resolve([]),
    bookingUrl ? fetchCalendar(bookingUrl, 'Booking.com') : Promise.resolve([])
  ]);

  calendarCache.airbnb = results[0].status === 'fulfilled' ? results[0].value : [];
  calendarCache.booking = results[1].status === 'fulfilled' ? results[1].value : [];
  calendarCache.lastUpdated = new Date().toISOString();

  console.log('Calendar sync completed');
}

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Cottage Ragati API is running',
    lastSync: calendarCache.lastUpdated
  });
});

app.get('/api/availability', (req, res) => {
  // Combine all booked dates from both sources
  const allBookedDates = [
    ...calendarCache.airbnb.map(d => ({ ...d, source: 'Airbnb' })),
    ...calendarCache.booking.map(d => ({ ...d, source: 'Booking.com' }))
  ];

  // Sort by start date
  allBookedDates.sort((a, b) => new Date(a.start) - new Date(b.start));

  res.json({
    bookedDates: allBookedDates,
    lastUpdated: calendarCache.lastUpdated,
    totalBookings: allBookedDates.length
  });
});

app.get('/api/check-date', (req, res) => {
  const { date } = req.query;
  
  if (!date) {
    return res.status(400).json({ error: 'Date parameter is required' });
  }

  const checkDate = new Date(date);
  const allBookedDates = [...calendarCache.airbnb, ...calendarCache.booking];

  const isBooked = allBookedDates.some(booking => {
    const start = new Date(booking.start);
    const end = new Date(booking.end);
    return checkDate >= start && checkDate <= end;
  });

  res.json({
    date: date,
    available: !isBooked,
    booked: isBooked
  });
});

app.post('/api/sync', async (req, res) => {
  try {
    await syncCalendars();
    res.json({ 
      success: true, 
      message: 'Calendars synced successfully',
      lastUpdated: calendarCache.lastUpdated
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Schedule automatic sync every 30 minutes
cron.schedule('*/30 * * * *', () => {
  console.log('Running scheduled calendar sync...');
  syncCalendars();
});

// Initial sync on startup
syncCalendars();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Calendar sync scheduled every 30 minutes');
});
