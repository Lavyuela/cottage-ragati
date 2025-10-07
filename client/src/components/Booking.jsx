import { ExternalLink, Calendar, DollarSign } from 'lucide-react'

export default function Booking() {
  const bookingPlatforms = [
    {
      name: 'Airbnb',
      description: 'Book directly through Airbnb with instant confirmation',
      url: 'https://www.airbnb.com/rooms/cottage-ragati-nanyuki', // UPDATE: Replace with actual Airbnb listing URL
      color: 'from-pink-500 to-red-500',
      icon: '🏠'
    },
    {
      name: 'Booking.com',
      description: 'Reserve on Booking.com with flexible cancellation',
      url: 'https://www.booking.com/hotel/ke/cottage-ragati-nanyuki.html', // UPDATE: Replace with actual Booking.com listing URL
      color: 'from-blue-500 to-blue-600',
      icon: '🌐'
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

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          {bookingPlatforms.map((platform, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-shadow duration-300"
            >
              <div className={`bg-gradient-to-r ${platform.color} p-8 text-white text-center`}>
                <div className="text-6xl mb-4">{platform.icon}</div>
                <h3 className="text-2xl font-bold">{platform.name}</h3>
              </div>
              
              <div className="p-8">
                <p className="text-gray-600 mb-6">
                  {platform.description}
                </p>
                
                <a
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full flex items-center justify-center space-x-2"
                >
                  <span>Book on {platform.name}</span>
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            </div>
          ))}
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
                  <ExternalLink className="w-8 h-8 text-primary-600" />
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

          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <p className="text-sm text-gray-700">
              <strong>⚠️ Setup Required:</strong> Update the booking platform URLs in{' '}
              <code className="bg-white px-2 py-1 rounded text-xs">client/src/components/Booking.jsx</code>{' '}
              with your actual Airbnb and Booking.com listing URLs.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
