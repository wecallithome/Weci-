'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BookingStepIndicator } from '@/components/booking/booking-step-indicator'
import { DateSelectionStep } from '@/components/booking/date-selection-step'
import { GuestDetailsStep } from '@/components/booking/guest-details-step'
import { PaymentStep } from '@/components/booking/payment-step'
import { ConfirmationStep } from '@/components/booking/confirmation-step'
import { BookingSummary } from '@/components/booking/booking-summary'
import { useAppStore } from '@/store'
import { usePropertyData } from '@/hooks/use-properties'
import { useRouter } from 'next/navigation'
import { BookingStep } from '@/types'
import { spacing } from '@/lib/utils'

interface BookingFlowClientProps {
  propertyId: string
}

const steps: { key: BookingStep; label: string }[] = [
  { key: 'dates', label: 'Dates' },
  { key: 'guests', label: 'Guests' },
  { key: 'details', label: 'Details' },
  { key: 'payment', label: 'Payment' },
  { key: 'confirmation', label: 'Confirmation' }
]

export function BookingFlowClient({ propertyId }: BookingFlowClientProps) {
  const router = useRouter()
  const { bookingFlow, setBookingStep, setBookingProperty } = useAppStore()
  const { data: property, isLoading } = usePropertyData(propertyId)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  
  useEffect(() => {
    if (property && !bookingFlow.property) {
      setBookingProperty(property)
    }
  }, [property, bookingFlow.property, setBookingProperty])
  
  useEffect(() => {
    const stepIndex = steps.findIndex(step => step.key === bookingFlow.currentStep)
    setCurrentStepIndex(stepIndex >= 0 ? stepIndex : 0)
  }, [bookingFlow.currentStep])
  
  const handleStepChange = (step: BookingStep) => {
    setBookingStep(step)
  }
  
  const handleNext = () => {
    const nextIndex = Math.min(currentStepIndex + 1, steps.length - 1)
    handleStepChange(steps[nextIndex].key)
  }
  
  const handlePrev = () => {
    const prevIndex = Math.max(currentStepIndex - 1, 0)
    handleStepChange(steps[prevIndex].key)
  }
  
  const handleBack = () => {
    if (currentStepIndex === 0) {
      router.back()
    } else {
      handlePrev()
    }
  }
  
  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-navy-600 mb-4"></div>
          <p className="text-gray-600">Loading booking...</p>
        </div>
      </div>
    )
  }
  
  if (!property) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h1>
          <Button onClick={() => router.push('/properties')}>Browse Properties</Button>
        </div>
      </div>
    )
  }
  
  const currentStep = steps[currentStepIndex]
  const isLastStep = currentStepIndex === steps.length - 1
  
  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className={`${spacing.container} py-6`}>
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={handleBack}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>{currentStepIndex === 0 ? 'Back to property' : 'Back'}</span>
            </Button>
            
            <h1 className="text-2xl font-serif font-bold text-gray-900">
              {isLastStep ? 'Booking Confirmed!' : 'Complete Your Booking'}
            </h1>
            
            <div className="w-24" /> {/* Spacer for centering */}
          </div>
        </div>
      </div>
      
      {/* Step Indicator */}
      {!isLastStep && (
        <div className="bg-white border-b border-gray-200">
          <div className={spacing.container}>
            <BookingStepIndicator
              steps={steps.slice(0, -1)} // Exclude confirmation step
              currentStep={currentStep.key}
              completedSteps={steps.slice(0, currentStepIndex).map(s => s.key)}
            />
          </div>
        </div>
      )}
      
      {/* Main Content */}
      <div className={spacing.container}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-8">
          {/* Left Column - Step Content */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep.key}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {currentStep.key === 'dates' && (
                  <DateSelectionStep 
                    property={property}
                    onNext={handleNext}
                  />
                )}
                {currentStep.key === 'guests' && (
                  <div className="bg-white rounded-2xl p-8 shadow-sm">
                    <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">
                      How many guests?
                    </h2>
                    <p className="text-gray-600 mb-8">
                      This property can accommodate up to {property.capacity.guests} guests.
                    </p>
                    <Button onClick={handleNext} className="w-full md:w-auto">
                      Continue
                    </Button>
                  </div>
                )}
                {currentStep.key === 'details' && (
                  <GuestDetailsStep onNext={handleNext} />
                )}
                {currentStep.key === 'payment' && (
                  <PaymentStep 
                    property={property}
                    onNext={handleNext}
                  />
                )}
                {currentStep.key === 'confirmation' && (
                  <ConfirmationStep property={property} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Right Column - Booking Summary */}
          {!isLastStep && (
            <div className="lg:col-span-1">
              <div className="sticky top-32">
                <BookingSummary property={property} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}