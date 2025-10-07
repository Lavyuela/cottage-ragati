import { useState } from 'react'
import { Calendar, RefreshCw, CheckCircle, XCircle, Clock } from 'lucide-react'
import { format, parseISO, isWithinInterval, startOfDay, endOfDay } from 'date-fns'

export default function Availability({ bookedDates, lastUpdated, loading }) {
  const [selectedDate, setSelectedDate] = useState(null)
  const [checkingDate, setCheckingDate] = useState(null)

  const isDateBooked = (date) => {
    if (!bookedDates || bookedDates.length === 0) return false
    
    const checkDate = startOfDay(date)
    
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

  const checkDateAvailability = async (date) => {
    setCheckingDate(date)
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500))
    setSelectedDate(date)
    setCheckingDate(null)
  }

  const getUpcomingBookings = () => {
    if (!bookedDates || bookedDates.length === 0) return []
    
    const now = new Date()
    return bookedDates
      .filter(booking => {
        try {
          return parseISO(booking.end) >= now
        } catch {
          return false
        }
      })
      .sort((a, b) => parseISO(a.start) - parseISO(b.start))
      .slice(0, 5)
  }

  const upcomingBookings = getUpcomingBookings()

  return (
    <section id="availability" className="py-20 bg-gradient-to-br from-primary-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="section-title">Real-Time Availability</h2>
          <p className="section-subtitle">
            Check live availability synced with Airbnb and Booking.com
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Calendar Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                <Calendar className="w-6 h-6 mr-2 text-primary-600" />
                Check Dates
              </h3>
              {lastUpdated && (
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>Updated {format(parseISO(lastUpdated), 'HH:mm')}</span>
                </div>
              )}
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <RefreshCw className="w-8 h-8 text-primary-600 animate-spin" />
                <span className="ml-3 text-gray-600">Loading availability...</span>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700 mb-3">
                    <strong>Total Bookings:</strong> {bookedDates?.length || 0}
                  </p>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
                      <span>Booked</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
                      <span>Available</span>
                    </div>
                  </div>
                </div>

                {selectedDate && (
                  <div className={`p-4 rounded-lg border-2 ${
                    isDateBooked(selectedDate) 
                      ? 'bg-red-50 border-red-200' 
                      : 'bg-green-50 border-green-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">
                          {format(selectedDate, 'MMMM d, yyyy')}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {isDateBooked(selectedDate) ? 'Not Available' : 'Available for Booking'}
                        </p>
                      </div>
                      {isDateBooked(selectedDate) ? (
                        <XCircle className="w-8 h-8 text-red-500" />
                      ) : (
                        <CheckCircle className="w-8 h-8 text-green-500" />
                      )}
                    </div>
                  </div>
                )}

                <div className="pt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select a date to check availability:
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    onChange={(e) => checkDateAvailability(new Date(e.target.value))}
                    disabled={checkingDate !== null}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Upcoming Bookings */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <RefreshCw className="w-6 h-6 mr-2 text-primary-600" />
              Upcoming Bookings
            </h3>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <RefreshCw className="w-8 h-8 text-primary-600 animate-spin" />
              </div>
            ) : upcomingBookings.length > 0 ? (
              <div className="space-y-4">
                {upcomingBookings.map((booking, index) => (
                  <div 
                    key={index}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">
                          {format(parseISO(booking.start), 'MMM d')} - {format(parseISO(booking.end), 'MMM d, yyyy')}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          Source: <span className="font-medium">{booking.source}</span>
                        </p>
                      </div>
                      <div className="bg-red-100 text-red-700 text-xs font-semibold px-3 py-1 rounded-full">
                        Booked
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <p className="text-lg font-semibold text-gray-900">No Upcoming Bookings</p>
                <p className="text-gray-600 mt-2">The cottage is available for your reservation!</p>
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 text-center">
                Synced with <strong>Airbnb</strong> and <strong>Booking.com</strong>
              </p>
              <p className="text-xs text-gray-500 text-center mt-2">
                Updates every 30 minutes automatically
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
