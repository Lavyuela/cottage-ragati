import { Image, X, ZoomIn } from 'lucide-react'
import { useState } from 'react'

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null)

  const images = [
    { id: 1, title: 'Cottage Exterior - Day View', category: 'Exterior', src: '/images/cottage-exterior.jpg', hasImage: true },
    { id: 2, title: 'Cottage Exterior - Night View', category: 'Exterior', src: '/images/cottage-exterior-night.jpg.avif', hasImage: true },
    { id: 3, title: 'Living Room', category: 'Interior', src: '/images/Living Room Interior.jpg', hasImage: true },
    { id: 4, title: 'Master Bedroom', category: 'Interior', src: '/images/Master Bedroom Interior.jpg', hasImage: true },
    { id: 5, title: 'Kitchen', category: 'Interior', src: '/images/Kitchen Interior.jpg', hasImage: true },
    { id: 6, title: 'Bathroom', category: 'Interior', src: '/images/Bathroom Interior.jpg', hasImage: true },
    { id: 7, title: 'Dining Area', category: 'Interior', src: '/images/Dining Area Interior.jpg', hasImage: true },
    { id: 8, title: 'Garden View', category: 'Exterior', src: '/images/Garden Exterior.jpg', hasImage: true },
    { id: 9, title: 'Exterior View', category: 'Exterior', src: '/images/Exterior View.jpg', hasImage: true }
  ]

  const openLightbox = (image) => {
    if (image.hasImage) {
      setSelectedImage(image)
    }
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

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
              onClick={() => openLightbox(image)}
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
                {image.hasImage ? (
                  <div className="text-center">
                    <ZoomIn className="w-12 h-12 text-white mx-auto mb-2" />
                    <p className="text-white font-semibold text-lg">Click to View</p>
                  </div>
                ) : (
                  <p className="text-white font-semibold text-lg">Coming Soon</p>
                )}
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

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-fade-in-up overflow-auto"
          onClick={closeLightbox}
        >
          <button 
            onClick={closeLightbox}
            className="fixed top-4 right-4 text-white hover:text-primary-400 transition-colors z-50 bg-black/50 rounded-full p-2 hover:bg-black/70"
          >
            <X className="w-8 h-8" />
          </button>
          
          <div className="relative w-full max-w-7xl mx-auto my-auto" onClick={(e) => e.stopPropagation()}>
            <img 
              src={selectedImage.src} 
              alt={selectedImage.title}
              className="w-full h-auto max-h-[85vh] object-contain rounded-lg mx-auto"
            />
            <div className="mt-4 bg-gradient-to-t from-black/80 to-black/40 p-6 rounded-lg">
              <h3 className="text-white text-2xl font-bold mb-2">{selectedImage.title}</h3>
              <p className="text-white/90 text-lg">{selectedImage.category}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
