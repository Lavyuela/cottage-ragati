import { Heart, Mountain, Coffee, Wifi } from 'lucide-react'

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="section-title">About Cottage Ragati</h2>
          <p className="section-subtitle">
            Discover your home away from home in the beautiful highlands of Nanyuki
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              Nestled in the scenic town of Nanyuki, Cottage Ragati offers a perfect blend of comfort, 
              luxury, and natural beauty. Our cottage provides an ideal retreat for families, couples, 
              and solo travelers seeking tranquility and adventure.
            </p>
            
            <p className="text-lg text-gray-700 leading-relaxed">
              With breathtaking views of Mount Kenya and modern amenities, we ensure your stay is 
              memorable and comfortable. Whether you're here for a weekend getaway or an extended 
              vacation, Cottage Ragati is your gateway to experiencing the best of Kenya's highlands.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="flex items-start space-x-3">
                <Heart className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Comfort First</h3>
                  <p className="text-sm text-gray-600">Luxurious amenities for your relaxation</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Mountain className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Scenic Views</h3>
                  <p className="text-sm text-gray-600">Stunning Mount Kenya panoramas</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Coffee className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Full Kitchen</h3>
                  <p className="text-sm text-gray-600">Cook your favorite meals</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Wifi className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">High-Speed WiFi</h3>
                  <p className="text-sm text-gray-600">Stay connected always</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl shadow-xl overflow-hidden group">
              <img 
                src="/images/Living Room Interior.jpg" 
                alt="Cottage Ragati - Cozy living room interior" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
