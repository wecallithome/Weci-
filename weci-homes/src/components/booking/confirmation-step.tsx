'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Calendar, MapPin, Users, Mail, Phone, Download, Share } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Property } from '@/types'
import { useAppStore } from '@/store'
import { formatCurrency, formatDateRange } from '@/lib/utils'
import Link from 'next/link'

interface ConfirmationStepProps {
  property: Property
}

export function ConfirmationStep({ property }: ConfirmationStepProps) {
  const { bookingFlow } = useAppStore()
  
  // Generate a mock booking confirmation number
  const confirmationNumber = `WCH${Math.random().toString(36).substr(2, 8).toUpperCase()}`
  
  const handleDownloadConfirmation = () => {
    // In a real app, this would generate and download a PDF
    console.log('Downloading confirmation...')
  }
  
  const handleShareBooking = () => {
    // In a real app, this would open share dialog
    console.log('Sharing booking...')
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="h-10 w-10 text-white" />
        </motion.div>
        
        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
          Booking Confirmed!
        </h1>
        <p className="text-xl text-gray-600 mb-2">
          Thank you for choosing We Call It Homes
        </p>
        <p className="text-gray-500">
          Confirmation #{confirmationNumber}
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Booking Details */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200"
        >
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">
            Your Booking Details
          </h2>
          
          {/* Property Info */}
          <div className="mb-6">
            <div className="flex space-x-4">
              <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${property.images[0]?.url})` }}
                />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{property.title}</h3>
                <div className="flex items-center text-gray-600 text-sm">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{property.location.city}, {property.location.state}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Booking Info */}
          <div className="space-y-4">
            {bookingFlow.dateRange && (
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">
                    {formatDateRange(bookingFlow.dateRange.start, bookingFlow.dateRange.end)}
                  </p>
                  <p className="text-sm text-gray-600">
                    {bookingFlow.pricing?.nights} {bookingFlow.pricing?.nights === 1 ? 'night' : 'nights'}
                  </p>
                </div>
              </div>
            )}
            
            <div className="flex items-center space-x-3">
              <Users className="h-5 w-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">
                  {bookingFlow.guestCount} {bookingFlow.guestCount === 1 ? 'guest' : 'guests'}
                </p>
              </div>
            </div>
            
            {bookingFlow.userDetails && (
              <>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">{bookingFlow.userDetails.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">{bookingFlow.userDetails.phone}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>
        
        {/* Payment Summary */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200"
        >
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">
            Payment Summary
          </h2>
          
          {bookingFlow.pricing && (
            <div className="space-y-3">
              <div className="flex justify-between text-gray-700">
                <span>
                  {formatCurrency(bookingFlow.pricing.base_price)} x {bookingFlow.pricing.nights} nights
                </span>
                <span>{formatCurrency(bookingFlow.pricing.subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Cleaning fee</span>
                <span>{formatCurrency(bookingFlow.pricing.cleaning_fee)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Service fee</span>
                <span>{formatCurrency(bookingFlow.pricing.service_fee)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Taxes</span>
                <span>{formatCurrency(bookingFlow.pricing.taxes)}</span>
              </div>
              <div className="border-t border-gray-200 pt-3 mt-4">
                <div className="flex justify-between font-bold text-xl text-gray-900">
                  <span>Total Paid</span>
                  <span className="text-emerald-600">
                    {formatCurrency(bookingFlow.pricing.total)}
                  </span>
                </div>
              </div>
            </div>
          )}
          
          <div className="mt-8 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
            <div className="flex items-center space-x-2 text-emerald-800">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">Payment Successful</span>
            </div>
            <p className="text-emerald-700 text-sm mt-1">
              Your payment has been processed and confirmed
            </p>
          </div>
        </motion.div>
      </div>
      
      {/* Next Steps */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="bg-gray-50 rounded-2xl p-8 mt-8"
      >
        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">
          What happens next?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-navy-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold">1</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Confirmation Email</h3>
            <p className="text-gray-600 text-sm">
              You&apos;ll receive a detailed confirmation email with arrival instructions
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-navy-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold">2</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Host Contact</h3>
            <p className="text-gray-600 text-sm">
              Your host will reach out 24-48 hours before your arrival
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-navy-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold">3</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Enjoy Your Stay</h3>
            <p className="text-gray-600 text-sm">
              Check in and enjoy your luxury experience
            </p>
          </div>
        </div>
      </motion.div>
      
      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
      >
        <Button
          onClick={handleDownloadConfirmation}
          variant="outline"
          className="flex items-center space-x-2"
        >
          <Download className="h-4 w-4" />
          <span>Download Confirmation</span>
        </Button>
        
        <Button
          onClick={handleShareBooking}
          variant="outline"
          className="flex items-center space-x-2"
        >
          <Share className="h-4 w-4" />
          <span>Share Booking</span>
        </Button>
        
        <Button asChild>
          <Link href="/dashboard" className="flex items-center space-x-2">
            <span>View in Dashboard</span>
          </Link>
        </Button>
      </motion.div>
    </div>
  )
}