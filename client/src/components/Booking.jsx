import { useState, useEffect } from 'react'
import { Calendar, DollarSign, CreditCard, Smartphone, Building2, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react'
import { format, addDays, isWithinInterval, startOfDay, endOfDay, parseISO, differenceInDays, eachDayOfInterval } from 'date-fns'

export default function Booking() {
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(2)
  const [selectedPayment, setSelectedPayment] = useState('')
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [bookedDates, setBookedDates] = useState([])
  const [loadingAvailability, setLoadingAvailability] = useState(false)
  const [availabilityError, setAvailabilityError] = useState('')
  const [isDateRangeAvailable, setIsDateRangeAvailable] = useState(true)

  const pricePerNight = 8500 // KES per night
  const cleaningFee = 2000 // KES

  // Fetch booked dates from backend
  useEffect(() => {
    fetchBookedDates()
  }, [])

  const fetchBookedDates = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || ''
      const response = await fetch(`${apiUrl}/api/availability`)
      const data = await response.json()
      setBookedDates(data.bookedDates || [])
    } catch (error) {
      console.error('Error fetching availability:', error)
    }
  }

  // Check if a date is booked
  const isDateBooked = (date) => {
    if (!bookedDates || bookedDates.length === 0) return false
    
    const checkDate = startOfDay(new Date(date))
    
    return bookedDates.some(booking => {
      try {
        const start = startOfDay(parseISO(booking.start))
        const end = endOfDay(parseISO(booking.end))
        return isWithinInterval(checkDate, { start, end })
      } catch (error) {
        return false
      }
    })
  }

  // Check if date range is available
  const checkDateRangeAvailability = async (startDate, endDate) => {
    if (!startDate || !endDate) return true
    
    setLoadingAvailability(true)
    setAvailabilityError('')
    
    try {
      // Get all dates in the range
      const datesInRange = eachDayOfInterval({
        start: new Date(startDate),
        end: new Date(endDate)
      })
      
      // Check if any date in range is booked
      const hasConflict = datesInRange.some(date => isDateBooked(date))
      
      if (hasConflict) {
        setAvailabilityError('Selected dates are not available. Please choose different dates.')
        setIsDateRangeAvailable(false)
        setShowBookingForm(false)
        return false
      }
      
      setIsDateRangeAvailable(true)
      return true
    } catch (error) {
      console.error('Error checking availability:', error)
      setAvailabilityError('Unable to verify availability. Please try again.')
      return false
    } finally {
      setLoadingAvailability(false)
    }
  }

  // Handle check-in date change
  const handleCheckInChange = async (date) => {
    setCheckIn(date)
    if (checkOut) {
      await checkDateRangeAvailability(date, checkOut)
    }
  }

  // Handle check-out date change
  const handleCheckOutChange = async (date) => {
    setCheckOut(date)
    if (checkIn) {
      await checkDateRangeAvailability(checkIn, date)
    }
  }

  const calculateTotal = () => {
    if (!checkIn || !checkOut) return 0
    const nights = differenceInDays(new Date(checkOut), new Date(checkIn))
    if (nights <= 0) return 0
    return (nights * pricePerNight) + cleaningFee
  }

  const nights = checkIn && checkOut ? differenceInDays(new Date(checkOut), new Date(checkIn)) : 0
  const total = calculateTotal()

  const paymentMethods = [
    {
      id: 'mpesa',
      name: 'M-Pesa',
      description: 'Pay via M-Pesa mobile money',
      icon: Smartphone,
      color: 'from-green-500 to-green-600',
      details: 'Paybill: 123456 | Account: COTTAGE'
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      description: 'Secure card payment',
      icon: CreditCard,
      color: 'from-blue-500 to-blue-600',
      details: 'Visa, Mastercard accepted'
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      description: 'Direct bank transfer',
      icon: Building2,
      color: 'from-purple-500 to-purple-600',
      details: 'Bank: KCB | Acc: 1234567890'
    }
  ]


  return (
    <section id="booking" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="section-title">Book Your Stay</h2>
          <p className="section-subtitle">
            Choose your preferred booking platform for instant confirmation
          </p>
        </div>

        {/* Direct Booking Form */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl shadow-2xl p-8 text-white mb-8">
            <h3 className="text-3xl font-bold mb-4 text-center">Book Direct & Save</h3>
            <p className="text-center text-primary-100 mb-6">Skip platform fees - book directly with us</p>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Check-in Date</label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => handleCheckInChange(e.target.value)}
                    min={format(new Date(), 'yyyy-MM-dd')}
                    className="w-full px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-primary-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Check-out Date</label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => handleCheckOutChange(e.target.value)}
                    min={checkIn || format(addDays(new Date(), 1), 'yyyy-MM-dd')}
                    className="w-full px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-primary-300"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Number of Guests</label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-primary-300"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                  ))}
                </select>
              </div>

              {loadingAvailability && (
                <div className="bg-white/20 rounded-lg p-4 flex items-center justify-center space-x-2">
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Checking availability...</span>
                </div>
              )}

              {availabilityError && (
                <div className="bg-red-500/20 border border-red-300 rounded-lg p-4 flex items-start space-x-2">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold mb-1">Dates Not Available</p>
                    <p className="text-sm">{availabilityError}</p>
                    <p className="text-xs mt-2 opacity-90">These dates are already booked on Airbnb or Booking.com</p>
                  </div>
                </div>
              )}

              {nights > 0 && isDateRangeAvailable && !loadingAvailability && (
                <div className="bg-white/20 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>KES {pricePerNight.toLocaleString()} × {nights} {nights === 1 ? 'night' : 'nights'}</span>
                    <span>KES {(pricePerNight * nights).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Cleaning fee</span>
                    <span>KES {cleaningFee.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-white/30 pt-2 mt-2">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>KES {total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setShowBookingForm(true)}
              disabled={!checkIn || !checkOut || nights <= 0 || !isDateRangeAvailable || loadingAvailability}
              className="w-full bg-white text-primary-600 font-bold py-4 rounded-lg hover:bg-primary-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingAvailability ? 'Checking Availability...' : 
               nights > 0 && isDateRangeAvailable ? 'Continue to Payment' : 
               !isDateRangeAvailable ? 'Dates Not Available' :
               'Select Dates to Continue'}
            </button>
            
            <p className="text-xs text-center mt-3 text-primary-100">
              ✓ Synced with Airbnb & Booking.com calendars to prevent double booking
            </p>
          </div>

          {/* Payment Methods */}
          {showBookingForm && nights > 0 && (
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Choose Payment Method</h3>
              
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedPayment(method.id)}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      selectedPayment === method.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <div className={`w-12 h-12 bg-gradient-to-r ${method.color} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                      <method.icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">{method.name}</h4>
                    <p className="text-xs text-gray-600">{method.description}</p>
                  </button>
                ))}
              </div>

              {selectedPayment && (
                <div className="bg-gradient-to-br from-green-50 to-white border border-green-200 rounded-xl p-6">
                  <div className="flex items-start space-x-3 mb-4">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">
                        {paymentMethods.find(m => m.id === selectedPayment)?.name} Payment Details
                      </h4>
                      <p className="text-gray-700 mb-4">
                        {paymentMethods.find(m => m.id === selectedPayment)?.details}
                      </p>
                      
                      {selectedPayment === 'mpesa' && (
                        <div className="space-y-2 text-sm">
                          <p><strong>Step 1:</strong> Go to M-Pesa on your phone</p>
                          <p><strong>Step 2:</strong> Select Lipa na M-Pesa → Paybill</p>
                          <p><strong>Step 3:</strong> Enter Business Number: <strong>123456</strong></p>
                          <p><strong>Step 4:</strong> Account Number: <strong>COTTAGE</strong></p>
                          <p><strong>Step 5:</strong> Amount: <strong>KES {total.toLocaleString()}</strong></p>
                        </div>
                      )}
                      
                      {selectedPayment === 'bank' && (
                        <div className="space-y-2 text-sm">
                          <p><strong>Bank:</strong> Kenya Commercial Bank (KCB)</p>
                          <p><strong>Account Name:</strong> Cottage Ragati</p>
                          <p><strong>Account Number:</strong> 1234567890</p>
                          <p><strong>Branch:</strong> Nanyuki</p>
                          <p><strong>Amount:</strong> KES {total.toLocaleString()}</p>
                        </div>
                      )}

                      {selectedPayment === 'card' && (
                        <div className="space-y-3">
                          <input
                            type="text"
                            placeholder="Card Number"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          />
                          <div className="grid grid-cols-2 gap-3">
                            <input
                              type="text"
                              placeholder="MM/YY"
                              className="px-4 py-2 border border-gray-300 rounded-lg"
                            />
                            <input
                              type="text"
                              placeholder="CVV"
                              className="px-4 py-2 border border-gray-300 rounded-lg"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-3 rounded-lg hover:from-green-600 hover:to-green-700 transition-all">
                    Confirm Booking - KES {total.toLocaleString()}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>


        {/* Why Book Direct */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-lg p-8 border border-blue-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              Why Book Direct with Us?
            </h3>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <div className="text-4xl mb-3">💰</div>
                <h4 className="font-semibold text-gray-900 mb-2">Best Price Guarantee</h4>
                <p className="text-sm text-gray-600">
                  No platform fees - save up to 20% compared to booking sites
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">🔒</div>
                <h4 className="font-semibold text-gray-900 mb-2">Secure & Verified</h4>
                <p className="text-sm text-gray-600">
                  Synced with Airbnb & Booking.com to prevent double bookings
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">⚡</div>
                <h4 className="font-semibold text-gray-900 mb-2">Instant Confirmation</h4>
                <p className="text-sm text-gray-600">
                  Get immediate booking confirmation via M-Pesa, card, or bank transfer
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing & Policies */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-primary-50 to-white rounded-2xl shadow-lg p-8 border border-primary-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Pricing & Policies
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-8 h-8 text-primary-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Competitive Rates</h4>
                <p className="text-sm text-gray-600">
                  Flexible pricing based on season and duration of stay
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-primary-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Flexible Booking</h4>
                <p className="text-sm text-gray-600">
                  Minimum 2-night stay, weekly discounts available
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-primary-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Instant Confirmation</h4>
                <p className="text-sm text-gray-600">
                  Get immediate booking confirmation on both platforms
                </p>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-primary-200">
              <h4 className="font-semibold text-gray-900 mb-4">Important Information:</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">✓</span>
                  <span>Check-in: 2:00 PM | Check-out: 11:00 AM</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">✓</span>
                  <span>Free cancellation up to 48 hours before check-in</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">✓</span>
                  <span>Self check-in with lockbox available</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">✓</span>
                  <span>Suitable for families and pets (with prior approval)</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
