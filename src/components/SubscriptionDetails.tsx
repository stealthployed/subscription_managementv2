import React from 'react'
import { Subscription } from '../types'
import { X, Calendar, DollarSign, Edit, Trash2 } from 'lucide-react'

interface SubscriptionDetailsProps {
  subscription: Subscription
  onClose: () => void
  onEdit: () => void
  onDelete: () => void
}

const SubscriptionDetails: React.FC<SubscriptionDetailsProps> = ({ subscription, onClose, onEdit, onDelete }) => {
  return (
    <div className="glassmorphism rounded-xl p-6 shadow-xl relative">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-400 hover:text-white transition-colors duration-200"
      >
        <X size={24} />
      </button>
      <div className="flex items-center mb-4">
        <img src={subscription.logo} alt={subscription.company} className="w-16 h-16 mr-4 rounded-full" />
        <div>
          <h2 className="text-2xl font-bold">{subscription.name}</h2>
          <p className="text-gray-300">{subscription.company}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center">
          <DollarSign size={20} className="text-green-400 mr-2" />
          <div>
            <p className="text-sm text-gray-300">Price</p>
            <p className="font-semibold">${subscription.price.toFixed(2)} / {subscription.billingCycle}</p>
          </div>
        </div>
        <div className="flex items-center">
          <Calendar size={20} className="text-blue-400 mr-2" />
          <div>
            <p className="text-sm text-gray-300">Next Billing Date</p>
            <p className="font-semibold">{subscription.nextBillingDate.toLocaleDateString()}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <button
          onClick={onEdit}
          className="flex items-center bg-blue-500 bg-opacity-50 hover:bg-opacity-75 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        >
          <Edit size={16} className="mr-2" />
          Edit
        </button>
        <button
          onClick={onDelete}
          className="flex items-center bg-red-500 bg-opacity-50 hover:bg-opacity-75 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        >
          <Trash2 size={16} className="mr-2" />
          Delete
        </button>
      </div>
    </div>
  )
}

export default SubscriptionDetails