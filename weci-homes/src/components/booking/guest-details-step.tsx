'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { User, Mail, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAppStore } from '@/store'

const guestDetailsSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  specialRequests: z.string().optional()
})

type GuestDetailsForm = z.infer<typeof guestDetailsSchema>

interface GuestDetailsStepProps {
  onNext: () => void
}

export function GuestDetailsStep({ onNext }: GuestDetailsStepProps) {
  const { bookingFlow, setBookingUserDetails } = useAppStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<GuestDetailsForm>({
    resolver: zodResolver(guestDetailsSchema),
    defaultValues: {
      name: bookingFlow.userDetails?.name || '',
      email: bookingFlow.userDetails?.email || '',
      phone: bookingFlow.userDetails?.phone || '',
      specialRequests: ''
    }
  })
  
  const onSubmit = async (data: GuestDetailsForm) => {
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setBookingUserDetails({
      name: data.name,
      email: data.email,
      phone: data.phone
    })
    
    setIsSubmitting(false)
    onNext()
  }
  
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">
          Tell us about yourself
        </h2>
        <p className="text-gray-600 mb-8">
          We need your contact information to complete the booking
        </p>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="h-4 w-4 inline mr-2" />
              Full Name
            </label>
            <input
              {...register('name')}
              type="text"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent transition-colors ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your full name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>
          
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Mail className="h-4 w-4 inline mr-2" />
              Email Address
            </label>
            <input
              {...register('email')}
              type="email"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent transition-colors ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your email address"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
          
          {/* Phone Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Phone className="h-4 w-4 inline mr-2" />
              Phone Number
            </label>
            <input
              {...register('phone')}
              type="tel"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent transition-colors ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your UK phone number (e.g., 01234 567890)"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>
          
          {/* Special Requests */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Special Requests (Optional)
            </label>
            <textarea
              {...register('specialRequests')}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent transition-colors resize-none"
              placeholder="Any special requests or notes for your stay..."
            />
          </div>
          
          {/* Terms Notice */}
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">
              By continuing, you agree to our{' '}
              <a href="/terms" className="text-navy-600 hover:underline">Terms of Service</a>
              {' '}and{' '}
              <a href="/privacy" className="text-navy-600 hover:underline">Privacy Policy</a>.
            </p>
          </div>
          
          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="w-full md:w-auto min-w-[200px]"
            size="lg"
          >
            {isSubmitting ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Saving...</span>
              </div>
            ) : (
              'Continue to Payment'
            )}
          </Button>
        </form>
      </motion.div>
    </div>
  )
}