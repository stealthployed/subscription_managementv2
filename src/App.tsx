import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Calendar from './components/Calendar'
import SubscriptionList from './components/SubscriptionList'
import SpendingAnalytics from './components/SpendingAnalytics'
import AddSubscriptionForm from './components/AddSubscriptionForm'
import { Subscription } from './types'
import { calculateTotalSpend } from './utils/calculations'

const initialSubscriptions: Subscription[] = [
  {
    id: '1',
    name: 'Amazon Prime',
    company: 'Amazon',
    logo: 'https://logo.clearbit.com/amazon.com',
    price: 3.45,
    billingCycle: 'monthly',
    nextBillingDate: new Date(2024, 9, 30), // October 30, 2024
    startDate: new Date(2023, 0, 1), // January 1, 2023
  },
  {
    id: '2',
    name: 'GoDaddy Hosting',
    company: 'GoDaddy',
    logo: 'https://logo.clearbit.com/godaddy.com',
    price: 3.99,
    billingCycle: 'monthly',
    nextBillingDate: new Date(2024, 9, 30), // October 30, 2024
    startDate: new Date(2023, 0, 1), // January 1, 2023
  },
]

function App() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(initialSubscriptions)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [showAddForm, setShowAddForm] = useState(false)
  const [totalSpend, setTotalSpend] = useState(0)
  const [editingSubscription, setEditingSubscription] = useState<Subscription | null>(null)

  useEffect(() => {
    const total = calculateTotalSpend(subscriptions, selectedDate)
    setTotalSpend(total)
  }, [subscriptions, selectedDate])

  const handleDateChange = (date: Date) => {
    setSelectedDate(date)
  }

  const handleAddSubscription = (newSubscription: Subscription) => {
    setSubscriptions([...subscriptions, newSubscription])
    setShowAddForm(false)
  }

  const handleDeleteSubscription = (id: string) => {
    setSubscriptions(subscriptions.filter(sub => sub.id !== id))
  }

  const handleEditSubscription = (updatedSubscription: Subscription) => {
    setSubscriptions(subscriptions.map(sub => sub.id === updatedSubscription.id ? updatedSubscription : sub))
    setEditingSubscription(null)
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6 text-white">Subscription Manager</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Calendar
            subscriptions={subscriptions}
            selectedDate={selectedDate}
            onDateChange={handleDateChange}
          />
        </motion.div>
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <SpendingAnalytics
            subscriptions={subscriptions}
            selectedDate={selectedDate}
          />
        </motion.div>
      </div>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-6"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Your Subscriptions</h2>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Add Subscription
          </button>
        </div>
        <SubscriptionList
          subscriptions={subscriptions}
          onDelete={handleDeleteSubscription}
          onEdit={setEditingSubscription}
        />
      </motion.div>
      {(showAddForm || editingSubscription) && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <AddSubscriptionForm
            subscription={editingSubscription}
            onAdd={editingSubscription ? handleEditSubscription : handleAddSubscription}
            onCancel={() => {
              setShowAddForm(false)
              setEditingSubscription(null)
            }}
          />
        </motion.div>
      )}
    </div>
  )
}

export default App