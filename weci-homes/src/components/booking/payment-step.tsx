'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { CreditCard, Lock, Shield, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Property } from '@/types'
import { useAppStore } from '@/store'
import { formatCurrency } from '@/lib/utils'
import { getStripe } from '@/lib/stripe'
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import { toast } from '@/components/ui/toast'

const stripePromise = getStripe()

interface PaymentStepProps {
  property: Property
  onNext: () => void
}

export function PaymentStep({ property, onNext }: PaymentStepProps) {
  return (
    <Elements stripe={stripePromise}>
      <PaymentStepContent property={property} onNext={onNext} />
    </Elements>
  )
}

function PaymentStepContent({ property, onNext }: PaymentStepProps) {
  const stripe = useStripe()
  const elements = useElements()
  const { bookingFlow, setBookingPaymentIntentId } = useAppStore()
  const [isProcessing, setIsProcessing] = useState(false)
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [paymentError, setPaymentError] = useState<string | null>(null)
  
  const createPaymentIntent = useCallback(async () => {
    try {
      const response = await fetch('/api/payments/create-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: bookingFlow.pricing!.total,
          bookingData: {
            propertyId: property.id,
            startDate: bookingFlow.dateRange!.start.toISOString(),
            endDate: bookingFlow.dateRange!.end.toISOString(),
            guestCount: bookingFlow.guestCount,
            userEmail: bookingFlow.userDetails!.email,
          },
        }),
      })
      
      const data = await response.json()
      
      if (response.ok && data.clientSecret) {
        setClientSecret(data.clientSecret)
        setBookingPaymentIntentId(data.paymentIntentId)
      } else {
        throw new Error(data.error || 'Failed to create payment intent')
      }
    } catch (error) {
      console.error('Error creating payment intent:', error)
      toast.error('Failed to initialize payment. Please try again.')
    }
  }, [bookingFlow.pricing, bookingFlow.dateRange, bookingFlow.guestCount, bookingFlow.userDetails, property.id, setBookingPaymentIntentId])
  
  // Create payment intent on component mount
  useEffect(() => {
    if (bookingFlow.pricing && bookingFlow.userDetails) {
      createPaymentIntent()
    }
  }, [bookingFlow.pricing, bookingFlow.userDetails, createPaymentIntent])
  
  const handlePayment = async () => {
    if (!stripe || !elements || !clientSecret) {
      toast.error('Payment system not ready. Please wait a moment and try again.')
      return
    }
    
    setIsProcessing(true)
    setPaymentError(null)
    
    try {
      const cardElement = elements.getElement(CardElement)
      
      if (!cardElement) {
        throw new Error('Card element not found')
      }
      
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: bookingFlow.userDetails!.name,
            email: bookingFlow.userDetails!.email,
          },
        },
      })
      
      if (error) {
        setPaymentError(error.message || 'Payment failed')
        toast.error(error.message || 'Payment failed')
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        toast.success('Payment successful!')
        onNext()
      }
    } catch (error) {
      console.error('Payment error:', error)
      setPaymentError('An unexpected error occurred')
      toast.error('An unexpected error occurred')
    } finally {
      setIsProcessing(false)
    }
  }
  
  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#1f2937',
        fontFamily: 'Inter, system-ui, sans-serif',
        '::placeholder': {
          color: '#9ca3af',
        },
        iconColor: '#6b7280',
      },
      invalid: {
        color: '#ef4444',
        iconColor: '#ef4444',
      },
    },
    hidePostalCode: true,
  }
  
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-navy-900 rounded-full flex items-center justify-center">
            <Lock className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-serif font-bold text-gray-900">
              Payment Details
            </h2>
            <p className="text-sm text-gray-600">Your payment information is secure and encrypted</p>
          </div>
        </div>
        
        {/* Security Notice */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
          <div className="flex items-center space-x-3">
            <Shield className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-green-800 font-medium">Secure Payment</p>
              <p className="text-green-700 text-sm">
                Your payment is protected by industry-standard encryption
              </p>
            </div>
          </div>
        </div>
        
        {/* Payment Form */}
        <div className="space-y-6">
          {/* Stripe Card Element */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Card Information
            </label>
            <div className="relative">
              <div className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-navy-500 focus-within:border-transparent transition-colors">
                <CardElement options={cardElementOptions} />
              </div>
              <CreditCard className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            {paymentError && (
              <p className="mt-2 text-sm text-red-600">{paymentError}</p>
            )}
          </div>
        </div>
        
        {/* Payment Summary */}
        {bookingFlow.pricing && (
          <div className="bg-gray-50 rounded-lg p-6 my-8">
            <h3 className="font-semibold text-gray-900 mb-4">Payment Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">
                  {formatCurrency(bookingFlow.pricing.base_price)} x {bookingFlow.pricing.nights} nights
                </span>
                <span>{formatCurrency(bookingFlow.pricing.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Cleaning fee</span>
                <span>{formatCurrency(bookingFlow.pricing.cleaning_fee)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Service fee</span>
                <span>{formatCurrency(bookingFlow.pricing.service_fee)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Taxes</span>
                <span>{formatCurrency(bookingFlow.pricing.taxes)}</span>
              </div>
              <div className="border-t border-gray-200 pt-2 mt-4">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>{formatCurrency(bookingFlow.pricing.total)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Terms */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <p className="text-blue-800 text-sm">
            By clicking &ldquo;Complete Booking&rdquo;, you agree to the{' '}
            <a href="/terms" className="underline hover:no-underline">Terms of Service</a> and{' '}
            <a href="/cancellation" className="underline hover:no-underline">Cancellation Policy</a>.
          </p>
        </div>
        
        {/* Submit Button */}
        <Button
          onClick={handlePayment}
          disabled={isProcessing || !stripe || !elements || !clientSecret}
          className="w-full"
          size="lg"
        >
          {isProcessing ? (
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Processing Payment...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Lock className="h-5 w-5" />
              <span>Complete Booking</span>
            </div>
          )}
        </Button>
        
        {/* Security Footer */}
        <div className="mt-6 flex items-center justify-center space-x-4 text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <Shield className="h-3 w-3" />
            <span>SSL Encrypted</span>
          </div>
          <div className="flex items-center space-x-1">
            <CheckCircle className="h-3 w-3" />
            <span>PCI Compliant</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}