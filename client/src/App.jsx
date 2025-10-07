import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Features from './components/Features'
import Gallery from './components/Gallery'
import Availability from './components/Availability'
import Booking from './components/Booking'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  const [availability, setAvailability] = useState({
    bookedDates: [],
    lastUpdated: null,
    loading: true
  })

  useEffect(() => {
    fetchAvailability()
    // Refresh availability every 5 minutes
    const interval = setInterval(fetchAvailability, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const fetchAvailability = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || ''
      const response = await fetch(`${apiUrl}/api/availability`)
      const data = await response.json()
      setAvailability({
        bookedDates: data.bookedDates || [],
        lastUpdated: data.lastUpdated,
        loading: false
      })
    } catch (error) {
      console.error('Error fetching availability:', error)
      setAvailability(prev => ({ ...prev, loading: false }))
    }
  }

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Features />
      <Gallery />
      <Availability 
        bookedDates={availability.bookedDates}
        lastUpdated={availability.lastUpdated}
        loading={availability.loading}
      />
      <Booking />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
