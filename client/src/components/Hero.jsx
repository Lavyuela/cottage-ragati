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
    <section id="home" className="relative pt-20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-blue-50 -z-10">
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto px-4 py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-100 to-blue-100 text-primary-700 px-5 py-2.5 rounded-full shadow-md">
              <Award className="w-5 h-5" />
              <span className="font-semibold text-sm">Premium Luxury Accommodation</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold leading-tight">
              Welcome to <br/>
              <span className="bg-gradient-to-r from-primary-600 via-primary-700 to-blue-600 bg-clip-text text-transparent">
                Cottage Ragati
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-light">
              Experience luxury and tranquility in the heart of Nanyuki. Your perfect getaway awaits with stunning views of Mount Kenya.
            </p>

            <div className="flex items-center space-x-3 text-gray-700 bg-white/60 backdrop-blur-sm px-4 py-3 rounded-xl w-fit shadow-sm">
              <MapPin className="w-6 h-6 text-primary-600" />
              <span className="text-lg font-medium">Nanyuki, Kenya</span>
            </div>

            <div className="flex items-center space-x-4 bg-white/60 backdrop-blur-sm px-4 py-3 rounded-xl w-fit shadow-sm">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400 drop-shadow-sm" />
                ))}
              </div>
              <span className="text-gray-700 font-semibold">5.0 Rating</span>
            </div>

            <div className="flex flex-wrap gap-4 pt-6">
              <button onClick={scrollToBooking} className="btn-primary group">
                <span>Book Your Stay</span>
                <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">→</span>
              </button>
              <button onClick={scrollToAvailability} className="btn-secondary group">
                <span>Check Availability</span>
                <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">→</span>
              </button>
            </div>
          </div>

          {/* Right Content - Cottage Image */}
          <div className="relative animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <div className="aspect-square rounded-3xl shadow-2xl overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"></div>
              <img 
                src="/images/Garden Exterior.jpg" 
                alt="Cottage Ragati - Beautiful exterior view with lush green lawn" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/Exterior View.jpg';
                }}
              />
            </div>
            
            {/* Floating Stats with Glass Effect */}
            <div 
              onClick={scrollToBooking}
              className="absolute -bottom-8 -left-8 glass-effect rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-3 hover:scale-110 active:scale-105 group"
            >
              <div className="text-center">
                <p className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform">100+</p>
                <p className="text-sm text-gray-700 font-semibold mt-1 group-hover:text-primary-700 transition-colors">Happy Guests</p>
                <p className="text-xs text-primary-600 mt-2 opacity-0 group-hover:opacity-100 transition-opacity font-medium">Click to book →</p>
              </div>
            </div>
            
            <div 
              onClick={scrollToAvailability}
              className="absolute -top-8 -right-8 glass-effect rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-3 hover:scale-110 active:scale-105 group"
            >
              <div className="text-center">
                <p className="text-4xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform">4.9★</p>
                <p className="text-sm text-gray-700 font-semibold mt-1 group-hover:text-primary-700 transition-colors">Average Rating</p>
                <p className="text-xs text-primary-600 mt-2 opacity-0 group-hover:opacity-100 transition-opacity font-medium">View reviews →</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
