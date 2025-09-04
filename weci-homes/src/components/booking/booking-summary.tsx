'use client'

import { motion } from 'framer-motion'
import { MapPin, Calendar, Users, Star } from 'lucide-react'
import { Property } from '@/types'
import { useAppStore } from '@/store'
import { formatCurrency, formatDateRange, calculateNights } from '@/lib/utils'

interface BookingSummaryProps {
  property: Property
}

export function BookingSummary({ property }: BookingSummaryProps) {
  const { bookingFlow } = useAppStore()
  
  const nights = bookingFlow.dateRange 
    ? calculateNights(bookingFlow.dateRange.start, bookingFlow.dateRange.end)
    : 0
  
  const subtotal = property.nightly_price * nights
  const cleaningFee = property.cleaning_fee
  const serviceFee = property.service_fee
  const taxes = Math.round(subtotal * 0.1) // 10% tax
  const total = subtotal + cleaningFee + serviceFee + taxes
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
    >
      {/* Property Header */}
      <div className="flex space-x-4 mb-6 pb-6 border-b border-gray-200">
        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${property.images[0]?.url})` }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
            {property.title}
          </h3>
          <div className="flex items-center text-gray-600 text-sm mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="truncate">{property.location.city}, {property.location.state}</span>
          </div>
          <div className="flex items-center text-sm">
            <Star className="h-4 w-4 mr-1 text-gold-500 fill-current" />
            <span className="font-medium">{property.rating}</span>
            <span className="text-gray-500 ml-1">({property.review_count})</span>
          </div>
        </div>
      </div>
      
      {/* Booking Details */}
      <div className="space-y-4 mb-6">
        {bookingFlow.dateRange && (
          <div>
            <h4 className="font-medium text-gray-900 mb-2 flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              Dates
            </h4>
            <p className="text-gray-700">
              {formatDateRange(bookingFlow.dateRange.start, bookingFlow.dateRange.end)}
            </p>
            <p className="text-sm text-gray-600">
              {nights} {nights === 1 ? 'night' : 'nights'}
            </p>
          </div>
        )}
        
        <div>
          <h4 className="font-medium text-gray-900 mb-2 flex items-center">
            <Users className="h-4 w-4 mr-2" />
            Guests
          </h4>
          <p className="text-gray-700">
            {bookingFlow.guestCount} {bookingFlow.guestCount === 1 ? 'guest' : 'guests'}
          </p>
        </div>
      </div>
      
      {/* Pricing Breakdown */}
      {nights > 0 && (
        <div className="space-y-3 border-t border-gray-200 pt-6">
          <h4 className="font-medium text-gray-900 mb-4">Price breakdown</h4>
          
          <div className="flex justify-between text-gray-700">
            <span>{formatCurrency(property.nightly_price)} x {nights} nights</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          
          <div className="flex justify-between text-gray-700">
            <span>Cleaning fee</span>
            <span>{formatCurrency(cleaningFee)}</span>
          </div>
          
          <div className="flex justify-between text-gray-700">
            <span>Service fee</span>
            <span>{formatCurrency(serviceFee)}</span>
          </div>
          
          <div className="flex justify-between text-gray-700">
            <span>Taxes</span>
            <span>{formatCurrency(taxes)}</span>
          </div>
          
          <div className="border-t border-gray-200 pt-3 mt-4">
            <div className="flex justify-between font-bold text-lg text-gray-900">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Notice */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600 text-center">
          Free cancellation before 48 hours of arrival
        </p>
      </div>
    </motion.div>
  )
}