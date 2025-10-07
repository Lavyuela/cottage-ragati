# How to Get Your Cottage Ragati Information

## 🔍 Finding Your Listing Information

### **1. Find Your Airbnb Listing**

1. Go to: https://www.airbnb.com
2. Search for "Cottage Ragati Nanyuki" or your listing name
3. Once you find your listing, copy the URL from the browser
4. Example: `https://www.airbnb.com/rooms/12345678`

**To Get iCal URL:**
1. Log into Airbnb as a host
2. Go to your listing → Calendar
3. Click "Availability settings"
4. Scroll to "Sync calendars"
5. Click "Export calendar"
6. Copy the iCal link (ends with .ics)

---

### **2. Find Your Booking.com Listing**

1. Go to: https://www.booking.com
2. Search for "Cottage Ragati Nanyuki"
3. Once you find your listing, copy the URL
4. Example: `https://www.booking.com/hotel/ke/cottage-ragati.html`

**To Get iCal URL:**
1. Log into Booking.com Extranet
2. Go to Calendar
3. Click "Import/Export calendars"
4. Under "Export calendar", copy the iCal link

---

### **3. Your Contact Information**

Update these in the website:
- **Phone:** Your business phone number
- **Email:** Your booking email
- **WhatsApp:** Your WhatsApp business number
- **Address:** Full address in Nanyuki

---

## 📝 Once You Have This Information:

### **Option 1: Update Yourself**

**Update Calendar URLs in Render:**
1. Go to: https://dashboard.render.com
2. Click on "cottage-ragati-api"
3. Go to "Environment" tab
4. Edit `AIRBNB_ICAL_URL` and `BOOKING_ICAL_URL`
5. Click "Save Changes"

**Update Contact Info:**
1. Open: `client/src/components/Contact.jsx`
2. Find the phone, email, and WhatsApp sections
3. Replace placeholder text with your real information
4. Save the file

**Update Booking Links:**
1. Open: `client/src/components/Booking.jsx`
2. Find the Airbnb and Booking.com URL sections
3. Replace with your actual listing URLs
4. Save the file

**Push Changes:**
```bash
git add .
git commit -m "Update contact info and booking links"
git push
```

---

### **Option 2: Provide Info to Me**

Send me:
1. Airbnb listing URL
2. Booking.com listing URL
3. Airbnb iCal URL
4. Booking.com iCal URL
5. Your phone number
6. Your email
7. Your WhatsApp number
8. Your address

And I'll update everything for you!

---

## 🔍 Can't Find Your Listings?

If you can't find your listings by searching:
- Check your Airbnb host dashboard
- Check your Booking.com Extranet
- Look for confirmation emails from when you created the listings
- Contact Airbnb/Booking.com support if needed

---

**Once you have this information, let me know and I'll help you update the website!**
