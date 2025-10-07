import { MapPin, Star, Award, Home } from 'lucide-react'

export default function Hero() {
  const scrollToBooking = () => {
    const element = document.getElementById('booking')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToAvailability = () => {
    const element = document.getElementById('availability')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="relative pt-20 bg-gradient-to-br from-primary-50 via-white to-primary-50">
      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full">
              <Award className="w-5 h-5" />
              <span className="font-semibold">Premium Accommodation</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Welcome to <span className="text-primary-600">Cottage Ragati</span>
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              Experience luxury and tranquility in the heart of Nanyuki. Your perfect getaway awaits at our beautiful cottage with stunning views of Mount Kenya.
            </p>

            <div className="flex items-center space-x-2 text-gray-700">
              <MapPin className="w-5 h-5 text-primary-600" />
              <span className="text-lg">Nanyuki, Kenya</span>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-gray-600 font-medium">5.0 Rating on Airbnb & Booking.com</span>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <button onClick={scrollToBooking} className="btn-primary">
                Book Your Stay
              </button>
              <button onClick={scrollToAvailability} className="btn-secondary">
                Check Availability
              </button>
            </div>
          </div>

          {/* Right Content - Image Placeholder */}
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary-200 to-primary-400 shadow-2xl overflow-hidden">
              <div className="w-full h-full flex items-center justify-center text-white">
                <div className="text-center p-8">
                  <Home className="w-24 h-24 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-semibold">Add your cottage photos here</p>
                  <p className="text-sm mt-2 opacity-80">Replace this placeholder with actual images</p>
                </div>
              </div>
            </div>
            
            {/* Floating Stats */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-6 border border-gray-100">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary-600">100+</p>
                <p className="text-sm text-gray-600">Happy Guests</p>
              </div>
            </div>
            
            <div className="absolute -top-6 -right-6 bg-white rounded-xl shadow-xl p-6 border border-gray-100">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary-600">4.9★</p>
                <p className="text-sm text-gray-600">Average Rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
