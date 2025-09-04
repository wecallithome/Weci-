'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Star, MapPin, Users, Bed, Bath, Heart, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Property } from '@/types'
import { formatCurrency } from '@/lib/utils'

interface PropertyCardProps {
  property: Property
  variant?: 'default' | 'compact' | 'featured'
  showFavorite?: boolean
  onFavoriteToggle?: (propertyId: string) => void
}

export function PropertyCard({ 
  property, 
  variant = 'default',
  showFavorite = true,
  onFavoriteToggle 
}: PropertyCardProps) {
  const [isFavorited, setIsFavorited] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFavorited(!isFavorited)
    onFavoriteToggle?.(property.id)
  }
  
  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    )
  }
  
  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    )
  }
  
  const primaryImage = property.images[currentImageIndex] || property.images[0]
  
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group relative"
    >
      <Link href={`/properties/${property.id}`}>
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100">
          {/* Image Section */}
          <div className="relative h-64 overflow-hidden">
            {/* Image */}
            <motion.div
              className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url(${primaryImage?.url})` }}
            />
            
            {/* Image Navigation */}
            {property.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
                >
                  ←
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
                >
                  →
                </button>
                
                {/* Image Dots */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1">
                  {property.images.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentImageIndex 
                          ? 'bg-white' 
                          : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Top Badges */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
              {/* Rating */}
              <div className="bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1 shadow-sm">
                <Star className="h-4 w-4 text-gold-500 fill-current" />
                <span className="text-sm font-semibold text-gray-900">{property.rating}</span>
                <span className="text-sm text-gray-600">({property.review_count})</span>
              </div>
              
              {/* Favorite Button */}
              {showFavorite && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleFavoriteClick}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isFavorited
                      ? 'bg-red-500 text-white'
                      : 'bg-white/80 backdrop-blur-sm text-gray-600 hover:text-red-500'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isFavorited ? 'fill-current' : ''}`} />
                </motion.button>
              )}
            </div>
            
            {/* Featured Badge */}
            {property.featured && (
              <div className="absolute top-4 right-4 bg-gradient-to-r from-gold-500 to-gold-600 text-black text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                Featured
              </div>
            )}
          </div>
          
          {/* Content */}
          <div className="p-6">
            {/* Title & Location */}
            <div className="mb-4">
              <h3 className="text-xl font-serif font-semibold text-gray-900 mb-2 group-hover:text-navy-900 transition-colors line-clamp-1">
                {property.title}
              </h3>
              <div className="flex items-center text-gray-600 text-sm">
                <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                <span className="line-clamp-1">
                  {property.location.city}, {property.location.state}
                </span>
              </div>
            </div>
            
            {/* Property Details */}
            <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  {property.capacity.guests} guests
                </div>
                <div className="flex items-center">
                  <Bed className="h-4 w-4 mr-1" />
                  {property.capacity.bedrooms} beds
                </div>
                <div className="flex items-center">
                  <Bath className="h-4 w-4 mr-1" />
                  {property.capacity.bathrooms} baths
                </div>
              </div>
            </div>
            
            {/* Amenities Preview */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {property.amenities.slice(0, 3).map((amenity, index) => (
                  <span
                    key={index}
                    className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                  >
                    {amenity.name}
                  </span>
                ))}
                {property.amenities.length > 3 && (
                  <span className="text-xs text-gray-500">
                    +{property.amenities.length - 3} more
                  </span>
                )}
              </div>
            </div>
            
            {/* Price & CTA */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold text-gray-900">
                  {formatCurrency(property.nightly_price)}
                </span>
                <span className="text-gray-600 text-sm ml-1">/ night</span>
              </div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <Button
                  size="sm"
                  variant="outline"
                  className="flex items-center space-x-1"
                >
                  <span>View Details</span>
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}