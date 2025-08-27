import React, { useState, useEffect } from 'react'

const CalendarIcon: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date())

  useEffect(() => {
    // Update the date every minute to keep it current
    const interval = setInterval(() => {
      setCurrentDate(new Date())
    }, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  const monthNames = [
    'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
    'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
  ]

  const currentMonth = monthNames[currentDate.getMonth()]
  const currentDay = currentDate.getDate()

  return (
    <div 
      className="w-10 h-10 bg-white rounded-lg shadow-lg overflow-hidden sf-font antialiased" 
      style={{ 
        filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.2)) blur(0.4px)',
        transform: 'translateZ(0)', // Force hardware acceleration for smoother rendering
        backfaceVisibility: 'hidden' // Improve rendering quality
      }}
    >
      {/* Red header with month */}
      <div 
        className="bg-red-500 text-white text-[7px] font-bold text-center leading-none tracking-tight antialiased"
        style={{ 
          height: '15px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: '150',
        }}
      >
        {currentMonth}
      </div>
      
      {/* White body with date */}
      <div 
        className="flex items-center justify-center bg-white text-black font-bold text-base leading-none antialiased" 
        style={{ 
          height: '26px', 
          fontWeight: '150'
        }}
      >
        {currentDay}
      </div>
    </div>
  )
}

export default CalendarIcon
