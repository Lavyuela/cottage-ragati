import { useNavigate } from 'react-router-dom'
import Hero from '../components/Hero'
import { Home, Calendar, Image, Phone, Sparkles } from 'lucide-react'

export default function HomePage() {
  const navigate = useNavigate()

  const quickLinks = [
    {
      title: 'About Us',
      description: 'Learn about our luxury cottage and what makes us special',
      icon: Home,
      path: '/about',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'View Gallery',
      description: 'Browse our beautiful photos and virtual tour',
      icon: Image,
      path: '/gallery',
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Check Availability',
      description: 'See our real-time calendar and available dates',
      icon: Calendar,
      path: '/availability',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Contact Us',
      description: 'Get in touch for inquiries and special requests',
      icon: Phone,
      path: '/contact',
      color: 'from-orange-500 to-orange-600'
    }
  ]

  return (
    <>
      <Hero />
      
      {/* Quick Links Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full mb-4">
              <Sparkles className="w-4 h-4" />
              <span className="font-semibold text-sm">Explore</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Discover Cottage Ragati
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to plan your perfect getaway
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((link, index) => (
              <div
                key={index}
                onClick={() => navigate(link.path)}
                className="group cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-2"
              >
                <div className={`h-2 bg-gradient-to-r ${link.color}`}></div>
                <div className="p-6">
                  <div className={`w-14 h-14 bg-gradient-to-r ${link.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <link.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {link.description}
                  </p>
                  <div className="flex items-center text-primary-600 font-semibold text-sm group-hover:translate-x-2 transition-transform">
                    <span>Learn more</span>
                    <span className="ml-2">→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Book Your Stay?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Experience luxury, comfort, and unforgettable memories at Cottage Ragati
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => navigate('/book-now')}
              className="bg-white text-primary-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95"
            >
              Book Now
            </button>
            <button
              onClick={() => navigate('/availability')}
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-primary-600 transition-colors shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95"
            >
              View Calendar
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
