'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { BookingStep } from '@/types'

interface BookingStepIndicatorProps {
  steps: { key: BookingStep; label: string }[]
  currentStep: BookingStep
  completedSteps: BookingStep[]
}

export function BookingStepIndicator({ steps, currentStep, completedSteps }: BookingStepIndicatorProps) {
  const safeCompletedSteps = Array.isArray(completedSteps) ? completedSteps : []
  
  return (
    <div className="py-6">
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        {steps.map((step, index) => {
          const isCompleted = safeCompletedSteps.includes(step.key)
          const isCurrent = currentStep === step.key
          const isLast = index === steps.length - 1
          
          return (
            <div key={step.key} className="flex items-center flex-1">
              {/* Step Circle */}
              <div className="relative">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isCompleted
                      ? 'bg-emerald-500 text-white'
                      : isCurrent
                      ? 'bg-navy-900 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-semibold">{index + 1}</span>
                  )}
                </motion.div>
                
                {/* Step Label */}
                <div className="absolute top-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <span className={`text-sm font-medium ${
                    isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {step.label}
                  </span>
                </div>
              </div>
              
              {/* Connector Line */}
              {!isLast && (
                <div className="flex-1 mx-4">
                  <div className={`h-0.5 transition-all duration-300 ${
                    isCompleted ? 'bg-emerald-500' : 'bg-gray-200'
                  }`} />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}