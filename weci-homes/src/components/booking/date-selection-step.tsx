'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Property, DateRange } from '@/types'
import { useAppStore } from '@/store'
import { DayPicker } from 'react-day-picker'
import { formatDateRange, calculateNights } from '@/lib/utils'

interface DateSelectionStepProps {
  property: Property
  onNext: () => void
}

export function DateSelectionStep({ property, onNext }: DateSelectionStepProps) {
  const { bookingFlow, setBookingDateRange } = useAppStore()
  const [selectedRange, setSelectedRange] = useState<DateRange | null>(bookingFlow.dateRange)
  
  const handleDateSelect = (range: { from?: Date; to?: Date } | undefined) => {
    if (range?.from && range?.to) {
      const dateRange = { start: range.from, end: range.to }
      setSelectedRange(dateRange)
      setBookingDateRange(dateRange)
    } else if (range?.from) {
      setSelectedRange({ start: range.from, end: range.from })
    }
  }
  
  const handleContinue = () => {
    if (selectedRange && selectedRange.start && selectedRange.end) {
      onNext()
    }
  }
  
  const nights = selectedRange ? calculateNights(selectedRange.start, selectedRange.end) : 0
  
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">
          When would you like to stay?
        </h2>
        <p className="text-gray-600 mb-8">
          Select your arrival and departure dates
        </p>
        
        {/* Calendar */}
        <div className="mb-8">
          <DayPicker
            mode="range"
            selected={selectedRange ? { from: selectedRange.start, to: selectedRange.end } : undefined}
            onSelect={handleDateSelect}
            disabled={{ before: new Date() }}
            numberOfMonths={2}
            className="rdp-booking"
            modifiersStyles={{
              selected: {
                backgroundColor: '#1a237e',
                color: 'white'
              }
            }}
          />
        </div>
        
        {/* Selected Date Display */}
        {selectedRange && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-50 rounded-xl p-6 mb-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Selected Dates</h3>
                <p className="text-gray-700">
                  {formatDateRange(selectedRange.start, selectedRange.end)}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {nights} {nights === 1 ? 'night' : 'nights'}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">
                  ${(property.nightly_price * nights).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">Total before taxes</p>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Continue Button */}
        <Button
          onClick={handleContinue}
          disabled={!selectedRange || !selectedRange.end}
          className="w-full md:w-auto min-w-[200px]"
          size="lg"
        >
          Continue
        </Button>
      </motion.div>
    </div>
  )
}