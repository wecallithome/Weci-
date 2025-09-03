'use client'

import { motion } from 'framer-motion'
import { PropertyCard } from '@/components/properties/property-card'
import { Property } from '@/types'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { AlertCircle } from 'lucide-react'

interface PropertyGridProps {
  properties: Property[]
  isLoading?: boolean
  error?: Error | null
}

export function PropertyGrid({ properties, isLoading, error }: PropertyGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <PropertyCardSkeleton key={index} />
        ))}
      </div>
    )
  }
  
  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Something went wrong
        </h3>
        <p className="text-gray-600 mb-4">
          We couldn&apos;t load the properties. Please try again later.
        </p>
      </motion.div>
    )
  }
  
  if (properties.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-4xl">🏠</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No properties found
        </h3>
        <p className="text-gray-600 mb-4">
          Try adjusting your filters to see more results.
        </p>
      </motion.div>
    )
  }
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
    >
      {properties.map((property, index) => (
        <motion.div
          key={property.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          <PropertyCard property={property} />
        </motion.div>
      ))}
    </motion.div>
  )
}

function PropertyCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200">
      <div className="h-64 bg-gray-200 animate-pulse" />
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse" />
          <div className="h-3 bg-gray-200 rounded w-3/4 animate-pulse" />
        </div>
        <div className="flex justify-between items-center">
          <div className="h-3 bg-gray-200 rounded w-1/3 animate-pulse" />
          <div className="h-3 bg-gray-200 rounded w-1/4 animate-pulse" />
        </div>
        <div className="flex justify-between items-center">
          <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse" />
          <div className="h-8 bg-gray-200 rounded w-20 animate-pulse" />
        </div>
      </div>
    </div>
  )
}