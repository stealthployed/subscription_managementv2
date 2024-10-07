import { Subscription } from '../types'
import { format, addMonths, isSameMonth, isSameYear } from 'date-fns'

export const calculateTotalSpend = (subscriptions: Subscription[], selectedDate: Date): number => {
  return subscriptions.reduce((total, subscription) => {
    if (isSameMonth(subscription.nextBillingDate, selectedDate) && isSameYear(subscription.nextBillingDate, selectedDate)) {
      return total + subscription.price
    }
    return total
  }, 0)
}

export const calculateMonthlySpending = (subscriptions: Subscription[], selectedDate: Date) => {
  const monthlySpending: { month: string; amount: number }[] = []
  let currentDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)

  for (let i = 0; i < 12; i++) {
    const monthTotal = subscriptions.reduce((total, subscription) => {
      if (isSameMonth(subscription.nextBillingDate, currentDate) && isSameYear(subscription.nextBillingDate, currentDate)) {
        return total + subscription.price
      }
      return total
    }, 0)

    monthlySpending.push({
      month: format(currentDate, 'MMM yyyy'),
      amount: monthTotal,
    })

    currentDate = addMonths(currentDate, 1)
  }

  return monthlySpending
}