import { 
  Wifi, 
  Car, 
  Utensils, 
  Tv, 
  Wind, 
  Droplet,
  Bed,
  Users,
  Shield,
  Coffee,
  Flame,
  TreePine
} from 'lucide-react'

export default function Features() {
  const features = [
    {
      icon: Wifi,
      title: 'High-Speed WiFi',
      description: 'Stay connected with reliable internet throughout your stay'
    },
    {
      icon: Car,
      title: 'Free Parking',
      description: 'Secure parking space available for guests'
    },
    {
      icon: Utensils,
      title: 'Fully Equipped Kitchen',
      description: 'Modern kitchen with all appliances and cookware'
    },
    {
      icon: Tv,
      title: 'Smart TV',
      description: 'Entertainment with streaming services available'
    },
    {
      icon: Wind,
      title: 'Air Conditioning',
      description: 'Climate control for your comfort'
    },
    {
      icon: Droplet,
      title: 'Hot Water',
      description: '24/7 hot water supply'
    },
    {
      icon: Bed,
      title: 'Comfortable Beds',
      description: 'Premium mattresses and quality linens'
    },
    {
      icon: Users,
      title: 'Spacious Living',
      description: 'Accommodates families and groups comfortably'
    },
    {
      icon: Shield,
      title: 'Secure Property',
      description: '24/7 security for peace of mind'
    },
    {
      icon: Coffee,
      title: 'Coffee & Tea',
      description: 'Complimentary coffee and tea supplies'
    },
    {
      icon: Flame,
      title: 'Fireplace',
      description: 'Cozy fireplace for cool evenings'
    },
    {
      icon: TreePine,
      title: 'Garden Access',
      description: 'Beautiful garden and outdoor seating area'
    }
  ]

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="section-title">Amenities & Features</h2>
          <p className="section-subtitle">
            Everything you need for a comfortable and memorable stay
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
