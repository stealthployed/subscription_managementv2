import React from 'react'
import { motion } from 'framer-motion'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { Subscription } from '../types'

interface SpendingAnalyticsProps {
  subscriptions: Subscription[]
  selectedDate: Date
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D']

const SpendingAnalytics: React.FC<SpendingAnalyticsProps> = ({ subscriptions, selectedDate }) => {
  const monthlySubscriptions = subscriptions.filter(sub => {
    const subDate = new Date(sub.nextBillingDate)
    return subDate.getMonth() === selectedDate.getMonth() && subDate.getFullYear() === selectedDate.getFullYear()
  })

  const data = monthlySubscriptions.map(sub => ({
    name: sub.name,
    value: sub.price
  }))

  const totalSpend = data.reduce((sum, item) => sum + item.value, 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glassmorphism rounded-3xl p-6 shadow-xl mt-6"
    >
      <h2 className="text-2xl font-bold mb-4">Monthly Spending</h2>
      <div className="text-center mb-4">
        <p className="text-3xl font-bold">€{totalSpend.toFixed(2)}</p>
        <p className="text-gray-400">Total for {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-4">
        {data.map((entry, index) => (
          <div key={entry.name} className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <div
                className="w-4 h-4 rounded-full mr-2"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              ></div>
              <span>{entry.name}</span>
            </div>
            <span>€{entry.value.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default SpendingAnalytics