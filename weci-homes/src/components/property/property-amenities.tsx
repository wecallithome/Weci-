'use client'

import { motion } from 'framer-motion'
import { Wifi, Car, Waves, ChefHat, Wind, Flame, Tv, Shield, Heart, Music } from 'lucide-react'
import { Amenity } from '@/types'

interface PropertyAmenitiesProps {
  amenities: Amenity[]
}

// Icon mapping for amenities
const amenityIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'WiFi': Wifi,
  'Parking': Car,
  'Pool': Waves,
  'Kitchen': ChefHat,
  'Air Conditioning': Wind,
  'Heating': Flame,
  'TV': Tv,
  'Beach Access': Waves,
  'Balcony': Shield,
  'Hot Tub': Waves,
  'Fireplace': Flame,
  'Washing Machine': Wind,
  'Gym': Heart,
  'Garden': Heart,
  'Barbecue': Flame,
  'Piano': Music,
  'Default': Shield
}

export function PropertyAmenities({ amenities }: PropertyAmenitiesProps) {
  // Group amenities (show first 6, then "show more" for the rest)
  const visibleAmenities = amenities.slice(0, 6)
  const hiddenAmenities = amenities.slice(6)
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="space-y-6"
    >
      <h3 className="text-xl font-serif font-semibold text-gray-900">What this place offers</h3>
      
      {/* Amenities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {visibleAmenities.map((amenity, index) => {
          const Icon = amenityIcons[amenity.name] || amenityIcons['Default']
          
          return (
            <motion.div
              key={amenity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <Icon className="h-5 w-5 text-gray-600" />
              <span className="text-gray-700 font-medium">{amenity.name}</span>
            </motion.div>
          )
        })}
      </div>
      
      {/* Show More Button */}
      {hiddenAmenities.length > 0 && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="border border-gray-300 rounded-lg px-6 py-3 text-gray-700 font-medium hover:border-gray-400 transition-colors"
        >
          Show all {amenities.length} amenities
        </motion.button>
      )}
    </motion.div>
  )
}