import { Image } from 'lucide-react'

export default function Gallery() {
  const images = [
    { id: 1, title: 'Cottage Exterior - Day View', category: 'Exterior', src: '/images/cottage-exterior.jpg', hasImage: true },
    { id: 2, title: 'Cottage Exterior - Night View', category: 'Exterior', src: '/images/cottage-exterior-night.jpg', hasImage: true },
    { id: 3, title: 'Living Room', category: 'Interior', hasImage: false },
    { id: 4, title: 'Master Bedroom', category: 'Interior', hasImage: false },
    { id: 5, title: 'Kitchen', category: 'Interior', hasImage: false },
    { id: 6, title: 'Bathroom', category: 'Interior', hasImage: false },
    { id: 7, title: 'Dining Area', category: 'Interior', hasImage: false },
    { id: 8, title: 'Garden View', category: 'Views', hasImage: false }
  ]

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="section-title">Photo Gallery</h2>
          <p className="section-subtitle">
            Take a virtual tour of Cottage Ragati
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div 
              key={image.id}
              className={`relative group overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer card-hover ${
                index === 0 ? 'sm:col-span-2 sm:row-span-2' : ''
              }`}
            >
              {image.hasImage ? (
                <div className={`${index === 0 ? 'aspect-square' : 'aspect-square'} relative overflow-hidden`}>
                  <img 
                    src={image.src} 
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">
                    <p className="font-bold text-lg">{image.title}</p>
                    <p className="text-sm opacity-90">{image.category}</p>
                  </div>
                </div>
              ) : (
                <div className={`bg-gradient-to-br from-primary-200 to-primary-400 ${
                  index === 0 ? 'aspect-square' : 'aspect-square'
                } flex items-center justify-center`}>
                  <div className="text-center text-white p-6">
                    <Image className="w-16 h-16 mx-auto mb-3 opacity-50" />
                    <p className="font-semibold text-lg">{image.title}</p>
                    <p className="text-sm opacity-80">{image.category}</p>
                  </div>
                </div>
              )}
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white font-semibold text-lg">{image.hasImage ? 'View Full Size' : 'Coming Soon'}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 bg-primary-50 border border-primary-200 rounded-lg p-4 inline-block">
            <strong>Note:</strong> Replace these placeholders with actual high-quality photos of your cottage. 
            Add images to <code className="bg-white px-2 py-1 rounded text-sm">client/public/images/</code> folder.
          </p>
        </div>
      </div>
    </section>
  )
}
