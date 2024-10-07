import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Subscription } from '../types'
import { Edit, Trash2 } from 'lucide-react'

interface SubscriptionListProps {
  subscriptions: Subscription[]
  onDelete: (id: string) => void
  onEdit: (subscription: Subscription) => void
}

const SubscriptionList: React.FC<SubscriptionListProps> = ({ subscriptions, onDelete, onEdit }) => {
  return (
    <AnimatePresence>
      <div className="space-y-4">
        {subscriptions.map((sub) => (
          <motion.div
            key={sub.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`subscription-card glassmorphism rounded-2xl p-4 ${sub.company.toLowerCase()}`}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <img src={sub.logo} alt={sub.company} className="w-10 h-10 rounded-full" />
                <div>
                  <h3 className="font-semibold text-lg">{sub.name}</h3>
                  <p className="text-sm text-gray-400">{sub.company}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-lg">€{sub.price.toFixed(2)}</p>
                <p className="text-sm text-gray-400">{sub.billingCycle}</p>
              </div>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <p className="text-sm text-gray-400">
                Next payment: {sub.nextBillingDate.toLocaleDateString()}
              </p>
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onEdit(sub)}
                  className="p-2 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition-colors duration-200"
                >
                  <Edit size={16} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onDelete(sub.id)}
                  className="p-2 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors duration-200"
                >
                  <Trash2 size={16} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </AnimatePresence>
  )
}

export default SubscriptionList