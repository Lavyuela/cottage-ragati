# Pricing and Payment Configuration Guide

## Current Pricing Setup

Your website currently has:
- **Base Rate**: KES 8,500 per night
- **Cleaning Fee**: KES 2,000 (one-time)
- **Location**: `client/src/components/Booking.jsx` (lines 16-17)

---

## Option 1: Update Fixed Rates

**To change your rates:**

1. Open `client/src/components/Booking.jsx`
2. Find lines 16-17:
   ```javascript
   const pricePerNight = 8500 // KES per night
   const cleaningFee = 2000 // KES
   ```
3. Update to your desired rates:
   ```javascript
   const pricePerNight = 12000 // Your new rate
   const cleaningFee = 3000 // Your new cleaning fee
   ```
4. Save, commit, and push to deploy

---

## Option 2: Seasonal/Dynamic Pricing

### Implementation:

Replace the fixed pricing with this dynamic pricing function:

```javascript
// Dynamic pricing based on season and length of stay
const getPricing = (checkInDate, nights) => {
  const date = new Date(checkInDate)
  const month = date.getMonth() + 1 // 1-12
  
  // Base rates by season
  let baseRate = 8500 // Default/Low season
  
  // Peak Season (Dec-Feb, Jul-Aug)
  if ([12, 1, 2, 7, 8].includes(month)) {
    baseRate = 12000
  }
  // High Season (Mar, Jun, Sep)
  else if ([3, 6, 9].includes(month)) {
    baseRate = 10000
  }
  // Shoulder Season (Apr, May, Oct, Nov)
  else {
    baseRate = 8500
  }
  
  // Weekly discount (7+ nights)
  let discount = 0
  if (nights >= 7) {
    discount = 0.15 // 15% off
  } else if (nights >= 14) {
    discount = 0.25 // 25% off
  }
  
  const discountedRate = baseRate * (1 - discount)
  const cleaningFee = 2000
  
  return {
    pricePerNight: Math.round(discountedRate),
    cleaningFee,
    discount: discount * 100,
    totalBeforeDiscount: baseRate * nights + cleaningFee
  }
}
```

### Usage:
```javascript
const pricing = getPricing(checkIn, nights)
const subtotal = pricing.pricePerNight * nights
const total = subtotal + pricing.cleaningFee
```

---

## Payment Methods Configuration

### Current Payment Options:

Your website shows 3 payment methods:

#### 1. **M-Pesa** (Mobile Money)
- **Best for**: Kenyan customers
- **Setup needed**: 
  - Get a PayBill or Till Number from Safaricom
  - Update the business number in `Booking.jsx`

**Current placeholder:**
```javascript
Business Number: 123456
Account Number: COTTAGE
```

**To update:**
1. Open `client/src/components/Booking.jsx`
2. Find line ~305 (M-Pesa section)
3. Update with your real PayBill:
   ```javascript
   <p><strong>Step 3:</strong> Enter Business Number: <strong>YOUR_PAYBILL</strong></p>
   <p><strong>Step 4:</strong> Account Number: <strong>YOUR_ACCOUNT</strong></p>
   ```

#### 2. **Card Payments** (Credit/Debit)
- **Best for**: International customers
- **Requires**: Payment gateway integration

**Options:**
- **Stripe** (recommended for international)
- **Flutterwave** (good for Africa)
- **Paystack** (Nigeria-focused but works in Kenya)
- **Pesapal** (Kenya-focused)

#### 3. **Bank Transfer**
- **Best for**: Large bookings, corporate clients
- **Setup**: Just update your bank details

**Current placeholder:**
```javascript
Bank: Kenya Commercial Bank (KCB)
Account Name: Cottage Ragati
Account Number: 1234567890
Branch: Nanyuki
```

**To update:**
1. Open `client/src/components/Booking.jsx`
2. Find line ~311 (Bank Transfer section)
3. Update with your real bank details

---

## Payment Gateway Integration

### Option A: Stripe (Recommended for International)

**Why Stripe:**
- Accepts international cards
- Easy integration
- Good documentation
- Supports KES

**Setup:**
1. Sign up at https://stripe.com
2. Get API keys
3. Install Stripe SDK:
   ```bash
   cd client
   npm install @stripe/stripe-js @stripe/react-stripe-js
   ```

**Basic Integration:**
```javascript
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe('your_publishable_key')

const handleCardPayment = async () => {
  const stripe = await stripePromise
  
  const response = await fetch(`${apiUrl}/api/create-payment-intent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      amount: total * 100, // Amount in cents
      currency: 'kes'
    })
  })
  
  const { clientSecret } = await response.json()
  
  const result = await stripe.confirmCardPayment(clientSecret, {
    payment_method: {
      card: cardElement,
      billing_details: { name: guestName }
    }
  })
  
  if (result.error) {
    alert('Payment failed: ' + result.error.message)
  } else {
    alert('Payment successful!')
    // Save booking to database
  }
}
```

### Option B: Flutterwave (Good for Africa)

**Why Flutterwave:**
- Supports M-Pesa, cards, bank transfers
- Works well in Kenya
- Lower fees than Stripe for African payments

**Setup:**
1. Sign up at https://flutterwave.com
2. Get API keys
3. Install SDK:
   ```bash
   npm install flutterwave-react-v3
   ```

**Basic Integration:**
```javascript
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3'

const config = {
  public_key: 'FLWPUBK-xxxxx',
  tx_ref: Date.now(),
  amount: total,
  currency: 'KES',
  payment_options: 'card,mobilemoney,ussd',
  customer: {
    email: guestEmail,
    phone_number: guestPhone,
    name: guestName,
  },
  customizations: {
    title: 'Cottage Ragati Booking',
    description: `${nights} nights from ${checkIn} to ${checkOut}`,
    logo: 'https://cottage-ragati.vercel.app/logo.png',
  },
}

const fwConfig = {
  ...config,
  text: 'Pay Now',
  callback: (response) => {
    console.log(response)
    closePaymentModal()
    // Save booking
  },
  onClose: () => {},
}

return <FlutterWaveButton {...fwConfig} />
```

### Option C: Pesapal (Kenya-focused)

**Why Pesapal:**
- Kenyan company
- Supports M-Pesa, cards, Airtel Money
- Good local support

**Setup:**
1. Sign up at https://www.pesapal.com
2. Get merchant key and secret
3. Use their iframe integration

---

## Booking Confirmation Flow

### Recommended Flow:

1. **Guest selects dates** → System checks availability
2. **Guest sees price breakdown** → Shows total with fees
3. **Guest selects payment method** → M-Pesa/Card/Bank
4. **Guest enters details** → Name, email, phone
5. **Guest pays** → Payment processed
6. **System confirms booking** → Sends confirmation email
7. **You block dates** → Manually block on Airbnb/Booking.com

### What You Need to Build:

#### 1. **Backend Booking Endpoint**

Add to `server/server.js`:

```javascript
// Store bookings (in production, use a database)
let directBookings = []

app.post('/api/bookings', async (req, res) => {
  const { checkIn, checkOut, guests, name, email, phone, paymentMethod, amount } = req.body
  
  // Validate availability
  const isAvailable = await checkAvailability(checkIn, checkOut)
  if (!isAvailable) {
    return res.status(400).json({ error: 'Dates not available' })
  }
  
  // Create booking
  const booking = {
    id: Date.now().toString(),
    checkIn,
    checkOut,
    guests,
    name,
    email,
    phone,
    paymentMethod,
    amount,
    status: 'pending', // pending, confirmed, cancelled
    createdAt: new Date()
  }
  
  directBookings.push(booking)
  
  // Send confirmation email (use nodemailer)
  await sendConfirmationEmail(booking)
  
  res.json({ success: true, booking })
})
```

#### 2. **Email Confirmation**

Install nodemailer:
```bash
cd server
npm install nodemailer
```

Add email function:
```javascript
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
})

async function sendConfirmationEmail(booking) {
  const mailOptions = {
    from: 'bookings@cottage-ragati.com',
    to: booking.email,
    subject: 'Booking Confirmation - Cottage Ragati',
    html: `
      <h1>Booking Confirmed!</h1>
      <p>Dear ${booking.name},</p>
      <p>Your booking has been confirmed:</p>
      <ul>
        <li>Check-in: ${booking.checkIn}</li>
        <li>Check-out: ${booking.checkOut}</li>
        <li>Guests: ${booking.guests}</li>
        <li>Total: KES ${booking.amount.toLocaleString()}</li>
      </ul>
      <p>We look forward to hosting you!</p>
    `
  }
  
  await transporter.sendMail(mailOptions)
}
```

---

## Quick Setup Checklist

### Immediate (No Integration Needed):
- [ ] Update pricing in `Booking.jsx` (lines 16-17)
- [ ] Update M-Pesa PayBill number (line ~305)
- [ ] Update bank details (line ~311)
- [ ] Test booking flow manually

### Short-term (Basic Integration):
- [ ] Choose payment gateway (Stripe/Flutterwave/Pesapal)
- [ ] Sign up and get API keys
- [ ] Add payment gateway to environment variables
- [ ] Implement payment processing
- [ ] Set up email confirmations

### Long-term (Full Automation):
- [ ] Set up database (MongoDB/PostgreSQL)
- [ ] Build booking management dashboard
- [ ] Automate calendar blocking on Airbnb/Booking.com
- [ ] Add booking confirmation SMS
- [ ] Implement refund/cancellation system

---

## Cost Comparison

### Payment Gateway Fees:

| Gateway | Card Fee | M-Pesa Fee | Setup Cost |
|---------|----------|------------|------------|
| **Stripe** | 3.4% + KES 20 | N/A | Free |
| **Flutterwave** | 3.8% | 1.4% | Free |
| **Pesapal** | 3.5% | 2.5% | Free |
| **PayPal** | 4.4% + fixed | N/A | Free |

### Recommendation:
- **For mostly Kenyan customers**: Use Flutterwave or Pesapal (better M-Pesa rates)
- **For international customers**: Use Stripe (better card processing)
- **Best of both**: Integrate both Stripe AND Flutterwave

---

## Testing Payments

### Test Mode:
All payment gateways provide test credentials:

**Stripe Test Cards:**
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`

**Flutterwave Test:**
- Use test keys from dashboard
- Test M-Pesa: Use provided test numbers

**Always test before going live!**

---

## Security Best Practices

1. **Never store card details** - Let payment gateway handle it
2. **Use HTTPS** - Already done with Vercel
3. **Validate on backend** - Don't trust frontend prices
4. **Store API keys securely** - Use environment variables
5. **Log all transactions** - For accounting and disputes
6. **Send receipts** - Email confirmation for every payment

---

## Next Steps

1. **Update your rates** in `Booking.jsx`
2. **Update payment details** (M-Pesa, Bank)
3. **Choose a payment gateway** (I recommend Flutterwave for Kenya)
4. **Test the booking flow** manually
5. **Set up email confirmations**
6. **Go live!**

Need help implementing any of these? Let me know which payment gateway you want to use and I'll help you integrate it!
