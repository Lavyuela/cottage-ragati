# 📝 Client Update Instructions - Cottage Ragati Website

## 🎯 What Needs to Be Updated

Your website is live with **placeholder information**. Please update the following:

---

## 1️⃣ **Contact Information** (PRIORITY)

**Current Placeholders:**
- Phone: +254 712 345 678
- Email: bookings@cottageragati.com
- WhatsApp: +254 712 345 678
- Address: Nanyuki Town, Laikipia County, Kenya

**To Update:**
1. Open file: `client/src/components/Contact.jsx`
2. Find lines 31-56 (the `contactInfo` array)
3. Replace with your actual:
   - Phone number
   - Email address
   - WhatsApp number
   - Full physical address

---

## 2️⃣ **Booking Platform Links** (PRIORITY)

**Current Placeholders:**
- Airbnb: https://www.airbnb.com/rooms/cottage-ragati-nanyuki
- Booking.com: https://www.booking.com/hotel/ke/cottage-ragati-nanyuki.html

**To Update:**
1. Open file: `client/src/components/Booking.jsx`
2. Find lines 4-19 (the `bookingPlatforms` array)
3. Replace URLs with your actual listing URLs

**How to Get Your Listing URLs:**
- **Airbnb:** Go to your listing page and copy the URL
- **Booking.com:** Go to your property page and copy the URL

---

## 3️⃣ **Calendar Integration** (IMPORTANT)

**Current Status:** Using placeholder URLs

**To Update:**
1. Go to: https://dashboard.render.com
2. Sign in with: ivy.waliaula@gmail.com
3. Click on **"cottage-ragati-api"**
4. Go to **"Environment"** tab
5. Click **"Edit"** on environment variables
6. Update:
   - `AIRBNB_ICAL_URL` = Your Airbnb iCal export URL
   - `BOOKING_ICAL_URL` = Your Booking.com iCal export URL
7. Click **"Save Changes"**

**How to Get iCal URLs:**

**Airbnb:**
1. Log into Airbnb as host
2. Go to Calendar → Availability settings
3. Scroll to "Sync calendars" → "Export calendar"
4. Copy the iCal URL (ends with .ics)

**Booking.com:**
1. Log into Booking.com Extranet
2. Go to Calendar → Import/Export calendars
3. Under "Export calendar", copy the iCal link

---

## 4️⃣ **Add Your Photos**

**Current Status:** Placeholder images

**To Add Photos:**
1. Create folder: `client/public/images/`
2. Add your cottage photos (high quality, optimized)
3. Name them descriptively:
   - `living-room.jpg`
   - `bedroom-1.jpg`
   - `kitchen.jpg`
   - `exterior.jpg`
   - `garden.jpg`
   - etc.

4. Update `client/src/components/Gallery.jsx`:
   - Replace the placeholder images array (lines 5-14)
   - Add your image paths

**Example:**
```javascript
const images = [
  { id: 1, title: 'Living Room', category: 'Interior', src: '/images/living-room.jpg' },
  { id: 2, title: 'Master Bedroom', category: 'Interior', src: '/images/bedroom-1.jpg' },
  // ... add more
]
```

---

## 5️⃣ **Update About Section** (Optional)

**To Customize:**
1. Open: `client/src/components/About.jsx`
2. Update the description text (lines 18-27)
3. Customize to match your cottage's unique features

---

## 🚀 **How to Push Updates to Live Website**

After making any changes:

1. Open PowerShell/Terminal in project folder
2. Run these commands:

```bash
git add .
git commit -m "Update contact info and booking links"
git push
```

3. Wait 2-3 minutes for automatic deployment
4. Your website will update automatically!

---

## 📞 **Your Live URLs**

- **Website:** https://cottage-ragati-website.vercel.app
- **API:** https://cottage-ragati-api.onrender.com

---

## ✅ **Priority Checklist**

- [ ] Update phone number
- [ ] Update email address
- [ ] Update WhatsApp number
- [ ] Update physical address
- [ ] Add real Airbnb listing URL
- [ ] Add real Booking.com listing URL
- [ ] Add Airbnb iCal URL in Render
- [ ] Add Booking.com iCal URL in Render
- [ ] Upload cottage photos
- [ ] Update gallery with photo paths
- [ ] Test calendar sync with real bookings
- [ ] Test all contact links work
- [ ] Test booking platform links work

---

## 🆘 **Need Help?**

If you need assistance updating any of these:
1. Contact your developer
2. Refer to the detailed guides in the project folder
3. Check README.md for technical documentation

---

**Your website is live and ready to accept bookings! Just update the placeholder information above.** 🎉
