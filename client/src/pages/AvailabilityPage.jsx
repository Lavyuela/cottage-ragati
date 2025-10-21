import { useState, useEffect } from 'react'
import Availability from '../components/Availability'

export default function AvailabilityPage() {
  const [availability, setAvailability] = useState({
    bookedDates: [],
    lastUpdated: null,
    loading: true
  })

  useEffect(() => {
    fetchAvailability()
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
    <>
      <Availability 
        bookedDates={availability.bookedDates}
        lastUpdated={availability.lastUpdated}
        loading={availability.loading}
      />
    </>
  )
}
