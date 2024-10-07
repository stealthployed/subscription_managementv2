import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Subscription } from '../types'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

interface AddSubscriptionFormProps {
  subscription?: Subscription
  onAdd: (subscription: Subscription) => void
  onCancel: () => void
}

const AddSubscriptionForm: React.FC<AddSubscriptionFormProps> = ({ subscription, onAdd, onCancel }) => {
  const [name, setName] = useState(subscription?.name || '')
  const [company, setCompany] = useState(subscription?.company || '')
  const [logo, setLogo] = useState(subscription?.logo || '')
  const [price, setPrice] = useState(subscription?.price.toString() || '')
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>(subscription?.billingCycle || 'monthly')
  const [nextBillingDate, setNextBillingDate] = useState<Date>(subscription?.nextBillingDate || new Date())

  useEffect(() => {
    if (subscription) {
      setName(subscription.name)
      setCompany(subscription.company)
      setLogo(subscription.logo)
      setPrice(subscription.price.toString())
      setBillingCycle(subscription.billingCycle)
      setNextBillingDate(subscription.nextBillingDate)
    }
  }, [subscription])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newSubscription: Subscription = {
      id: subscription?.id || Date.now().toString(),
      name,
      company,
      logo,
      price: parseFloat(price),
      billingCycle,
      nextBillingDate,
      startDate: subscription?.startDate || new Date(),
    }
    onAdd(newSubscription)
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="glassmorphism rounded-xl p-6 space-y-4"
    >
      <h2 className="text-2xl font-bold mb-4">{subscription ? 'Edit Subscription' : 'Add New Subscription'}</h2>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-300">
          Subscription Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full rounded-md bg-gray-800 border-gray-600 text-white focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="company" className="block text-sm font-medium text-gray-300">
          Company
        </label>
        <input
          type="text"
          id="company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
          className="mt-1 block w-full rounded-md bg-gray-800 border-gray-600 text-white focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="logo" className="block text-sm font-medium text-gray-300">
          Logo URL
        </label>
        <input
          type="url"
          id="logo"
          value={logo}
          onChange={(e) => setLogo(e.target.value)}
          required
          className="mt-1 block w-full rounded-md bg-gray-800 border-gray-600 text-white focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-300">
          Price
        </label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          min="0"
          step="0.01"
          className="mt-1 block w-full rounded-md bg-gray-800 border-gray-600 text-white focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="billingCycle" className="block text-sm font-medium text-gray-300">
          Billing Cycle
        </label>
        <select
          id="billingCycle"
          value={billingCycle}
          onChange={(e) => setBillingCycle(e.target.value as 'monthly' | 'yearly')}
          className="mt-1 block w-full rounded-md bg-gray-800 border-gray-600 text-white focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        >
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>
      <div>
        <label htmlFor="nextBillingDate" className="block text-sm font-medium text-gray-300">
          Next Billing Date
        </label>
        <DatePicker
          selected={nextBillingDate}
          onChange={(date: Date) => setNextBillingDate(date)}
          className="mt-1 block w-full rounded-md bg-gray-800 border-gray-600 text-white focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
      </div>
      <div className="flex justify-end space-x-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-600 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
        >
          Cancel
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
        >
          {subscription ? 'Update Subscription' : 'Add Subscription'}
        </motion.button>
      </div>
    </motion.form>
  )
}

export default AddSubscriptionForm