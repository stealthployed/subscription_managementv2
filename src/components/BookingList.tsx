import React from 'react'
import { Booking } from '../types'
import { Video } from 'lucide-react'

interface BookingListProps {
  bookings: Booking[]
}

const BookingList: React.FC<BookingListProps> = ({ bookings }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Upcoming Bookings</h2>
      <div className="space-y-4">
        {bookings.map(booking => (
          <div key={booking.id} className="glassmorphism rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-sm text-gray-300">
                  {booking.date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' })}
                </p>
                <h3 className="font-semibold">{booking.title}</h3>
              </div>
              <p className="text-sm text-gray-300">
                {booking.startTime} - {booking.endTime}
              </p>
            </div>
            <p className="text-sm text-gray-300 mb-2">{booking.attendees.join(', ')}</p>
            <div className="flex items-center text-blue-400">
              <Video size={16} className="mr-1" />
              <span className="text-sm">{booking.platform}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BookingList