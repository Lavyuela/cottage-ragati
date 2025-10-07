import { Home, Mail, Phone, Facebook, Instagram, Twitter } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Features', id: 'features' },
    { label: 'Gallery', id: 'gallery' }
  ]

  const bookingLinks = [
    { label: 'Check Availability', id: 'availability' },
    { label: 'Book Now', id: 'booking' },
    { label: 'Contact Us', id: 'contact' }
  ]

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Home className="w-8 h-8 text-primary-500" />
              <div>
                <h3 className="text-xl font-bold text-white">Cottage Ragati</h3>
                <p className="text-sm text-gray-400">Nanyuki, Kenya</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Your perfect getaway destination in the heart of Nanyuki with stunning Mount Kenya views.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-gray-400 hover:text-primary-500 transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Booking */}
          <div>
            <h4 className="text-white font-semibold mb-4">Booking</h4>
            <ul className="space-y-2">
              {bookingLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-gray-400 hover:text-primary-500 transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2 text-sm">
                <Mail className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                <a href="mailto:info@cottageragati.com" className="text-gray-400 hover:text-primary-500">
                  info@cottageragati.com
                </a>
              </li>
              <li className="flex items-start space-x-2 text-sm">
                <Phone className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                <a href="tel:+254XXXXXXXXX" className="text-gray-400 hover:text-primary-500">
                  +254 XXX XXX XXX
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © {currentYear} Cottage Ragati. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
