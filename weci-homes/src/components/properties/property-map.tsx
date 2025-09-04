'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Property } from '@/types'
import { MapPin, Star } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

interface PropertyMapProps {
  properties: Property[]
  isLoading?: boolean
}

// Mock map component - in a real app you'd use Google Maps, Mapbox, etc.
export function PropertyMap({ properties, isLoading }: PropertyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  
  if (isLoading) {
    return (
      <div className="h-[600px] bg-gray-100 rounded-2xl flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-navy-600 mb-4"></div>
          <p className="text-gray-600">Loading map...</p>
        </div>
      </div>
    )
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="relative h-[600px] bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl overflow-hidden shadow-lg border border-gray-200"
    >
      {/* Mock Map Background */}
      <div 
        ref={mapRef}
        className="w-full h-full relative bg-cover bg-center"
        style={{
          backgroundImage: `url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e5e7eb' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")`
        }}
      >
        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2 z-10">
          <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors">
            <span className="text-xl font-bold text-gray-600">+</span>
          </button>
          <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors">
            <span className="text-xl font-bold text-gray-600">−</span>
          </button>
        </div>
        
        {/* Property Markers */}
        {properties.map((property, index) => (
          <PropertyMarker
            key={property.id}
            property={property}
            index={index}
            isSelected={selectedProperty?.id === property.id}
            onClick={() => setSelectedProperty(property)}
          />
        ))}
        
        {/* Selected Property Card */}
        {selectedProperty && (
          <PropertyMapCard
            property={selectedProperty}
            onClose={() => setSelectedProperty(null)}
          />
        )}
        
        {/* No Results */}
        {properties.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No properties found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search criteria
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

interface PropertyMarkerProps {
  property: Property
  index: number
  isSelected: boolean
  onClick: () => void
}

function PropertyMarker({ property, index, isSelected, onClick }: PropertyMarkerProps) {
  // Mock positioning - in real app this would be based on actual coordinates
  const positions = [
    { top: '20%', left: '25%' },
    { top: '35%', left: '60%' },
    { top: '55%', left: '30%' },
    { top: '70%', left: '70%' },
    { top: '45%', left: '80%' },
    { top: '25%', left: '75%' }
  ]
  
  const position = positions[index % positions.length]
  
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="absolute z-20"
      style={position}
    >
      <div className={`relative ${isSelected ? 'z-30' : 'z-20'}`}>
        {/* Price Badge */}
        <div className={`
          px-3 py-2 rounded-full shadow-lg border-2 font-semibold text-sm transition-all duration-200
          ${isSelected 
            ? 'bg-navy-900 text-white border-navy-900 scale-110' 
            : 'bg-white text-gray-900 border-white hover:border-navy-200'
          }
        `}>
          {formatCurrency(property.nightly_price)}
        </div>
        
        {/* Marker Pin */}
        <div className={`
          absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 transition-all duration-200
          ${isSelected 
            ? 'border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-navy-900'
            : 'border-l-3 border-r-3 border-t-3 border-l-transparent border-r-transparent border-t-white'
          }
        `} />
      </div>
    </motion.button>
  )
}

interface PropertyMapCardProps {
  property: Property
  onClose: () => void
}

function PropertyMapCard({ property, onClose }: PropertyMapCardProps) {
  const primaryImage = property.images.find(img => img.is_primary) || property.images[0]
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      className="absolute bottom-6 left-6 right-6 z-30"
    >
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden max-w-sm">
        {/* Image */}
        <div className="relative h-32">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${primaryImage?.url})` }}
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
          >
            ×
          </button>
        </div>
        
        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-serif font-semibold text-gray-900 line-clamp-1">
              {property.title}
            </h3>
            <div className="flex items-center space-x-1 ml-2">
              <Star className="h-4 w-4 text-gold-500 fill-current" />
              <span className="text-sm font-medium text-gray-900">{property.rating}</span>
            </div>
          </div>
          
          <div className="flex items-center text-gray-600 text-sm mb-3">
            <MapPin className="h-4 w-4 mr-1" />
            {property.location.city}, {property.location.state}
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-bold text-gray-900">
                {formatCurrency(property.nightly_price)}
              </span>
              <span className="text-gray-600 text-sm ml-1">/ night</span>
            </div>
            
            <button
              onClick={() => {
                // Navigate to property detail
                window.location.href = `/properties/${property.id}`
              }}
              className="px-4 py-2 bg-navy-900 text-white text-sm font-medium rounded-lg hover:bg-navy-700 transition-colors"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}