'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Users, Minus, Plus, CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Property, DateRange, PricingBreakdown } from '@/types'
import { formatCurrency, calculateNights, formatDateRange } from '@/lib/utils'
import { useAppStore } from '@/store'
import { useRouter } from 'next/navigation'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'

interface BookingWidgetProps {
  property: Property
}

export function BookingWidget({ property }: BookingWidgetProps) {
  const router = useRouter()
  const { setBookingProperty, setBookingDateRange, setBookingGuestCount } = useAppStore()
  const [dateRange, setDateRange] = useState<DateRange | null>(null)
  const [guestCount, setGuestCount] = useState(1)
  const [showCalendar, setShowCalendar] = useState(false)
  const [showGuestPicker, setShowGuestPicker] = useState(false)
  const [pricing, setPricing] = useState<PricingBreakdown | null>(null)
  
  // Calculate pricing when dates or guests change
  useEffect(() => {
    if (dateRange) {
      const nights = calculateNights(dateRange.start, dateRange.end)
      const subtotal = property.nightly_price * nights
      const cleaningFee = property.cleaning_fee
      const serviceFee = property.service_fee
      const taxes = Math.round(subtotal * 0.1) // 10% tax
      const total = subtotal + cleaningFee + serviceFee + taxes
      
      setPricing({
        base_price: property.nightly_price,
        nights,
        subtotal,
        cleaning_fee: cleaningFee,
        service_fee: serviceFee,
        taxes,
        total
      })
    } else {
      setPricing(null)
    }
  }, [dateRange, property.nightly_price, property.cleaning_fee, property.service_fee])
  
  const handleDateSelect = (range: { from?: Date; to?: Date } | undefined) => {
    if (range?.from && range?.to) {
      setDateRange({ start: range.from, end: range.to })
      setShowCalendar(false)
    } else if (range?.from) {
      setDateRange({ start: range.from, end: range.from })
    }
  }
  
  const handleReserve = () => {
    if (!dateRange) {
      setShowCalendar(true)
      return
    }
    
    // Set booking data in store
    setBookingProperty(property)
    setBookingDateRange(dateRange)
    setBookingGuestCount(guestCount)
    
    // Navigate to booking flow
    router.push(`/book/${property.id}`)
  }
  
  const incrementGuests = () => {
    if (guestCount < property.capacity.guests) {
      setGuestCount(prev => prev + 1)
    }
  }
  
  const decrementGuests = () => {
    if (guestCount > 1) {
      setGuestCount(prev => prev - 1)
    }
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 space-y-6"
    >
      {/* Price Header */}
      <div className="text-center border-b border-gray-200 pb-6">
        <div className="flex items-baseline justify-center space-x-2">
          <span className="text-3xl font-bold text-gray-900">
            {formatCurrency(property.nightly_price)}
          </span>
          <span className="text-gray-600">per night</span>
        </div>
        {property.review_count > 0 && (
          <div className="flex items-center justify-center space-x-2 mt-2 text-sm text-gray-600">
            <span>★ {property.rating}</span>
            <span>•</span>
            <span>{property.review_count} reviews</span>
          </div>
        )}
      </div>
      
      {/* Date Selection */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Check-in
            </label>
            <button
              onClick={() => setShowCalendar(!showCalendar)}
              className="w-full p-3 text-left border border-gray-300 rounded-lg hover:border-navy-500 focus:border-navy-500 focus:ring-2 focus:ring-navy-500/20 transition-colors"
            >
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                <span className={dateRange?.start ? 'text-gray-900' : 'text-gray-500'}>
                  {dateRange?.start ? dateRange.start.toLocaleDateString() : 'Add date'}
                </span>
              </div>
            </button>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Check-out
            </label>
            <button
              onClick={() => setShowCalendar(!showCalendar)}
              className="w-full p-3 text-left border border-gray-300 rounded-lg hover:border-navy-500 focus:border-navy-500 focus:ring-2 focus:ring-navy-500/20 transition-colors"
            >
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                <span className={dateRange?.end ? 'text-gray-900' : 'text-gray-500'}>
                  {dateRange?.end ? dateRange.end.toLocaleDateString() : 'Add date'}
                </span>
              </div>
            </button>
          </div>
        </div>
        
        {/* Calendar Popup */}
        {showCalendar && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute z-10 bg-white border border-gray-200 rounded-lg shadow-lg p-4"
          >
            <DayPicker
              mode="range"
              selected={dateRange ? { from: dateRange.start, to: dateRange.end } : undefined}
              onSelect={handleDateSelect}
              disabled={{ before: new Date() }}
              className="rdp-custom"
            />
          </motion.div>
        )}
      </div>
      
      {/* Guest Selection */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Guests
        </label>
        <button
          onClick={() => setShowGuestPicker(!showGuestPicker)}
          className="w-full p-3 text-left border border-gray-300 rounded-lg hover:border-navy-500 focus:border-navy-500 focus:ring-2 focus:ring-navy-500/20 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2 text-gray-500" />
              <span className="text-gray-900">
                {guestCount} {guestCount === 1 ? 'guest' : 'guests'}
              </span>
            </div>
          </div>
        </button>
        
        {/* Guest Picker Dropdown */}
        {showGuestPicker && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 right-0 z-10 bg-white border border-gray-200 rounded-lg shadow-lg p-4 mt-1"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Guests</span>
              <div className="flex items-center space-x-3">
                <button
                  onClick={decrementGuests}
                  disabled={guestCount <= 1}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:border-navy-500 transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center font-medium">{guestCount}</span>
                <button
                  onClick={incrementGuests}
                  disabled={guestCount >= property.capacity.guests}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:border-navy-500 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              Maximum {property.capacity.guests} guests
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Pricing Breakdown */}
      {pricing && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="space-y-3 border-t border-gray-200 pt-6"
        >
          <div className="flex justify-between text-gray-700">
            <span>{formatCurrency(pricing.base_price)} x {pricing.nights} nights</span>
            <span>{formatCurrency(pricing.subtotal)}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Cleaning fee</span>
            <span>{formatCurrency(pricing.cleaning_fee)}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Service fee</span>
            <span>{formatCurrency(pricing.service_fee)}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Taxes</span>
            <span>{formatCurrency(pricing.taxes)}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg border-t border-gray-200 pt-3">
            <span>Total</span>
            <span>{formatCurrency(pricing.total)}</span>
          </div>
        </motion.div>
      )}
      
      {/* Reserve Button */}
      <Button
        onClick={handleReserve}
        className="w-full h-12 text-lg font-semibold"
        size="lg"
      >
        <CreditCard className="h-5 w-5 mr-2" />
        Reserve
      </Button>
      
      {/* Notice */}
      <p className="text-center text-sm text-gray-600">
        You won&apos;t be charged yet
      </p>
      
      {/* Quick Info */}
      <div className="bg-gray-50 rounded-lg p-4 space-y-2">
        <h4 className="font-medium text-gray-900">This is a rare find</h4>
        <p className="text-sm text-gray-600">
          {property.host.name}&apos;s place is usually booked.
        </p>
      </div>
    </motion.div>
  )
}