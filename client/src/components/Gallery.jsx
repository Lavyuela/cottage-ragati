import { Image } from 'lucide-react'

export default function Gallery() {
  // Placeholder images - replace with actual cottage photos
  const images = [
    { id: 1, title: 'Living Room', category: 'Interior' },
    { id: 2, title: 'Master Bedroom', category: 'Interior' },
    { id: 3, title: 'Kitchen', category: 'Interior' },
    { id: 4, title: 'Bathroom', category: 'Interior' },
    { id: 5, title: 'Exterior View', category: 'Exterior' },
    { id: 6, title: 'Garden', category: 'Exterior' },
    { id: 7, title: 'Dining Area', category: 'Interior' },
    { id: 8, title: 'Mountain View', category: 'Views' }
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
              className={`relative group overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer ${
                index === 0 ? 'sm:col-span-2 sm:row-span-2' : ''
              }`}
            >
              <div className={`bg-gradient-to-br from-primary-200 to-primary-400 ${
                index === 0 ? 'aspect-square' : 'aspect-square'
              } flex items-center justify-center`}>
                <div className="text-center text-white p-6">
                  <Image className="w-16 h-16 mx-auto mb-3 opacity-50" />
                  <p className="font-semibold text-lg">{image.title}</p>
                  <p className="text-sm opacity-80">{image.category}</p>
                </div>
              </div>
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white font-semibold text-lg">View Photo</p>
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
