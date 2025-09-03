'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { X, DollarSign, Users, Bed, Bath, MapPin, Wifi, Car, Waves } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PropertyFilters as FilterType, PropertyType } from '@/types'

interface PropertyFiltersProps {
  filters: FilterType
  onFiltersChange: (filters: FilterType) => void
  onClearFilters: () => void
  isLoading?: boolean
}

const propertyTypes: { value: PropertyType; label: string }[] = [
  { value: 'villa', label: 'Villa' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'house', label: 'House' },
  { value: 'condo', label: 'Condo' },
  { value: 'townhouse', label: 'Townhouse' },
  { value: 'cabin', label: 'Cabin' },
  { value: 'loft', label: 'Loft' }
]

const amenityOptions = [
  { id: 'wifi', label: 'WiFi', icon: Wifi },
  { id: 'parking', label: 'Parking', icon: Car },
  { id: 'pool', label: 'Pool', icon: Waves },
  { id: 'kitchen', label: 'Kitchen', icon: Users },
  { id: 'ac', label: 'Air Conditioning', icon: Users },
  { id: 'heating', label: 'Heating', icon: Users }
]

export function PropertyFilters({ 
  filters, 
  onFiltersChange, 
  onClearFilters, 
  isLoading 
}: PropertyFiltersProps) {
  const [priceRange, setPriceRange] = useState({
    min: filters.priceRange?.min || 0,
    max: filters.priceRange?.max || 2000
  })
  
  const handlePriceChange = (field: 'min' | 'max', value: number) => {
    const newRange = { ...priceRange, [field]: value }
    setPriceRange(newRange)
    onFiltersChange({ priceRange: newRange })
  }
  
  const handlePropertyTypeToggle = (type: PropertyType) => {
    const currentTypes = filters.propertyType || []
    const newTypes = currentTypes.includes(type)
      ? currentTypes.filter(t => t !== type)
      : [...currentTypes, type]
    
    onFiltersChange({ propertyType: newTypes.length > 0 ? newTypes : undefined })
  }
  
  const handleAmenityToggle = (amenityId: string) => {
    const currentAmenities = filters.amenities || []
    const newAmenities = currentAmenities.includes(amenityId)
      ? currentAmenities.filter(a => a !== amenityId)
      : [...currentAmenities, amenityId]
    
    onFiltersChange({ amenities: newAmenities.length > 0 ? newAmenities : undefined })
  }
  
  const hasActiveFilters = Object.keys(filters).some(key => 
    filters[key as keyof FilterType] !== undefined
  )
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-serif font-semibold text-gray-900">Filters</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-4 w-4 mr-1" />
            Clear all
          </Button>
        )}
      </div>
      
      {/* Price Range */}
      <div>
        <h4 className="font-medium text-gray-900 mb-3 flex items-center">
          <DollarSign className="h-4 w-4 mr-2" />
          Price per night
        </h4>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Min</label>
              <input
                type="number"
                value={priceRange.min}
                onChange={(e) => handlePriceChange('min', Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                placeholder="$0"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Max</label>
              <input
                type="number"
                value={priceRange.max}
                onChange={(e) => handlePriceChange('max', Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                placeholder="$2000+"
              />
            </div>
          </div>
          <div className="text-sm text-gray-600">
            ${priceRange.min} - ${priceRange.max}
          </div>
        </div>
      </div>
      
      {/* Guests */}
      <div>
        <h4 className="font-medium text-gray-900 mb-3 flex items-center">
          <Users className="h-4 w-4 mr-2" />
          Guests
        </h4>
        <select
          value={filters.guests || 1}
          onChange={(e) => onFiltersChange({ guests: Number(e.target.value) })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-navy-500 focus:border-transparent"
        >
          {Array.from({ length: 16 }, (_, i) => i + 1).map((num) => (
            <option key={num} value={num}>
              {num} {num === 1 ? 'guest' : 'guests'}
            </option>
          ))}
        </select>
      </div>
      
      {/* Property Type */}
      <div>
        <h4 className="font-medium text-gray-900 mb-3 flex items-center">
          <MapPin className="h-4 w-4 mr-2" />
          Property Type
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {propertyTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => handlePropertyTypeToggle(type.value)}
              className={`p-3 text-sm border rounded-lg transition-all ${
                filters.propertyType?.includes(type.value)
                  ? 'border-navy-500 bg-navy-50 text-navy-700'
                  : 'border-gray-300 hover:border-gray-400 text-gray-700'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Bedrooms */}
      <div>
        <h4 className="font-medium text-gray-900 mb-3 flex items-center">
          <Bed className="h-4 w-4 mr-2" />
          Bedrooms
        </h4>
        <div className="grid grid-cols-4 gap-2">
          {['Any', '1+', '2+', '3+', '4+'].map((option, index) => (
            <button
              key={option}
              onClick={() => {
                const bedrooms = index === 0 ? undefined : index
                onFiltersChange({ 
                  // Add bedrooms to filters if implemented in types
                })
              }}
              className="p-2 text-sm border border-gray-300 rounded-lg hover:border-gray-400 text-gray-700 transition-colors"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      
      {/* Amenities */}
      <div>
        <h4 className="font-medium text-gray-900 mb-3">Amenities</h4>
        <div className="space-y-2">
          {amenityOptions.map((amenity) => (
            <label
              key={amenity.id}
              className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
            >
              <input
                type="checkbox"
                checked={filters.amenities?.includes(amenity.id) || false}
                onChange={() => handleAmenityToggle(amenity.id)}
                className="w-4 h-4 text-navy-600 border-gray-300 rounded focus:ring-navy-500"
              />
              <amenity.icon className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-700">{amenity.label}</span>
            </label>
          ))}
        </div>
      </div>
      
      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-4">
          <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-navy-600"></div>
          <p className="text-sm text-gray-500 mt-2">Updating results...</p>
        </div>
      )}
    </motion.div>
  )
}