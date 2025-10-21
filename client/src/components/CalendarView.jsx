import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  addDays, 
  addMonths, 
  subMonths, 
  format, 
  isSameMonth, 
  isSameDay, 
  isToday,
  parseISO,
  isWithinInterval,
  startOfDay,
  endOfDay
} from 'date-fns'

export default function CalendarView({ bookedDates = [] }) {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const isDateBooked = (date) => {
    if (!bookedDates || bookedDates.length === 0) return false
    
    const checkDate = startOfDay(date)
    
    return bookedDates.some(booking => {
      try {
        const start = startOfDay(parseISO(booking.start))
        const end = endOfDay(parseISO(booking.end))
        return isWithinInterval(checkDate, { start, end })
      } catch (error) {
        return false
      }
    })
  }

  const renderHeader = () => {
    return (
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h2 className="text-xl font-bold text-gray-900">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <button
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    )
  }

  const renderDays = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    return (
      <div className="grid grid-cols-7 gap-2 mb-2">
        {days.map((day, index) => (
          <div
            key={index}
            className="text-center text-sm font-semibold text-gray-600 py-2"
          >
            {day}
          </div>
        ))}
      </div>
    )
  }

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth)
    const monthEnd = endOfMonth(monthStart)
    const startDate = startOfWeek(monthStart)
    const endDate = endOfWeek(monthEnd)

    const rows = []
    let days = []
    let day = startDate

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const formattedDate = format(day, 'd')
        const cloneDay = day
        const isBooked = isDateBooked(day)
        const isCurrentMonth = isSameMonth(day, monthStart)
        const isTodayDate = isToday(day)

        days.push(
          <div
            key={day}
            className={`
              aspect-square p-2 text-center rounded-lg cursor-pointer transition-all
              ${!isCurrentMonth ? 'text-gray-300' : ''}
              ${isTodayDate ? 'ring-2 ring-primary-500' : ''}
              ${isBooked && isCurrentMonth 
                ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                : isCurrentMonth 
                ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                : 'hover:bg-gray-100'
              }
            `}
            title={isBooked ? 'Not Available' : 'Available'}
          >
            <div className="flex flex-col items-center justify-center h-full">
              <span className={`text-sm font-semibold ${isTodayDate ? 'text-primary-600' : ''}`}>
                {formattedDate}
              </span>
              {isCurrentMonth && (
                <span className="text-xs mt-1">
                  {isBooked ? '✕' : '✓'}
                </span>
              )}
            </div>
          </div>
        )
        day = addDays(day, 1)
      }
      rows.push(
        <div className="grid grid-cols-7 gap-2" key={day}>
          {days}
        </div>
      )
      days = []
    }

    return <div className="space-y-2">{rows}</div>
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
      
      {/* Legend */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-center space-x-6 text-sm">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-100 rounded mr-2"></div>
            <span className="text-gray-700">Available</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-100 rounded mr-2"></div>
            <span className="text-gray-700">Booked</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 ring-2 ring-primary-500 rounded mr-2"></div>
            <span className="text-gray-700">Today</span>
          </div>
        </div>
      </div>
    </div>
  )
}
