export interface Subscription {
  id: string
  name: string
  company: string
  logo: string
  price: number
  billingCycle: 'monthly' | 'yearly'
  nextBillingDate: Date
  startDate: Date
}

export interface Booking {
  id: string
  title: string
  date: Date
  startTime: string
  endTime: string
  attendees: string[]
  platform: string
}