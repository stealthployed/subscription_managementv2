import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Subscription } from '../types'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

interface CalendarProps {
  subscriptions: Subscription[]
  selectedDate: Date
  onDateChange: (date: Date) => void
}

const Calendar: React.FC<CalendarProps> = ({ subscriptions, selectedDate, onDateChange }) => {
  const [currentMonth, setCurrentMonth] = useState(selectedDate)
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null)

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const getDaysInMonth = (date: Date) => {
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)
    return lastDay.getDate()
  }

  const changeMonth = (increment: number) => {
    const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + increment, 1)
    setCurrentMonth(newMonth)
    onDateChange(newMonth)
  }

  const renderCalendarDays = () => {
    const days = []
    const totalDays = getDaysInMonth(currentMonth)
    const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay()

    // Add empty cells for days before the first of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day opacity-0"></div>)
    }

    for (let i = 1; i <= totalDays; i++) {
      const currentDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i)
      const subscriptionsForDay = subscriptions.filter(subscription => 
        subscription.nextBillingDate.getDate() === currentDate.getDate() &&
        subscription.nextBillingDate.getMonth() === currentDate.getMonth() &&
        subscription.nextBillingDate.getFullYear() === currentDate.getFullYear()
      )

      const isActive = i === selectedDate.getDate() && 
                       currentMonth.getMonth() === selectedDate.getMonth() && 
                       currentMonth.getFullYear() === selectedDate.getFullYear()

      days.push(
        <motion.div 
          key={i} 
          className={`calendar-day relative ${isActive ? 'active bg-blue-500' : ''} hover:bg-gray-700 transition-colors duration-200`}
          onClick={() => onDateChange(currentDate)}
          onMouseEnter={() => setHoveredDate(currentDate)}
          onMouseLeave={() => setHoveredDate(null)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {i}
          {subscriptionsForDay.length > 0 && (
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex flex-wrap justify-center max-w-full">
              {subscriptionsForDay.slice(0, 3).map((sub, index) => (
                <img 
                  key={index} 
                  src={sub.logo} 
                  alt={sub.name} 
                  className="w-3 h-3 rounded-full m-0.5"
                />
              ))}
              {subscriptionsForDay.length > 3 && (
                <span className="text-xs text-gray-400">+{subscriptionsForDay.length - 3}</span>
              )}
            </div>
          )}
          <AnimatePresence>
            {hoveredDate && hoveredDate.getTime() === currentDate.getTime() && subscriptionsForDay.length > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute z-10 bg-gray-800 p-2 rounded-md shadow-lg"
                style={{ top: '100%', left: '50%', transform: 'translateX(-50%)' }}
              >
                {subscriptionsForDay.map((sub, index) => (
                  <div key={index} className="flex items-center mb-1 last:mb-0">
                    <img src={sub.logo} alt={sub.name} className="w-4 h-4 rounded-full mr-2" />
                    <span className="text-xs">{sub.name}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )
    }

    return days
  }

  return (
    <div className="glassmorphism rounded-3xl p-6 shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <motion.button 
            className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors duration-200"
            onClick={() => changeMonth(-1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft size={24} />
          </motion.button>
          <h2 className="text-2xl font-bold">
            {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h2>
          <motion.button 
            className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors duration-200"
            onClick={() => changeMonth(1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight size={24} />
          </motion.button>
        </div>
        <DatePicker
          selected={selectedDate}
          onChange={(date: Date) => onDateChange(date)}
          customInput={
            <motion.button 
              className="bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Change Date
            </motion.button>
          }
        />
      </div>
      <div className="grid grid-cols-7 gap-2 mb-4">
        {daysOfWeek.map(day => (
          <div key={day} className="text-center text-gray-500 text-xs font-medium">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {renderCalendarDays()}
      </div>
    </div>
  )
}

export default Calendar