'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Share, Heart, MapPin, Users, Bed, Bath, Wifi, Car, Waves, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PropertyImageGallery } from '@/components/property/property-image-gallery'
import { BookingWidget } from '@/components/property/booking-widget'
import { PropertyAmenities } from '@/components/property/property-amenities'
import { PropertyReviews } from '@/components/property/property-reviews'
import { PropertyMap } from '@/components/property/property-map'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { usePropertyData } from '@/hooks/use-properties'
import { useRouter } from 'next/navigation'
import { spacing, typography } from '@/lib/utils'
import { toast } from '@/components/ui/toast'
import Link from 'next/link'

interface PropertyDetailClientProps {
  propertyId: string
}

export function PropertyDetailClient({ propertyId }: PropertyDetailClientProps) {
  const router = useRouter()
  const { data: property, isLoading, error } = usePropertyData(propertyId)
  const [isFavorited, setIsFavorited] = useState(false)
  
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: property?.title,
          text: property?.description,
          url: window.location.href,
        })
      } catch (error) {
        // User cancelled or error occurred
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href)
      toast.success('Link copied to clipboard!')
    }
  }
  
  const handleFavoriteToggle = () => {
    setIsFavorited(!isFavorited)
    toast.success(isFavorited ? 'Removed from favorites' : 'Added to favorites')
  }
  
  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mb-4" />
          <p className="text-gray-600">Loading property details...</p>
        </div>
      </div>
    )
  }
  
  if (error || !property) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h1>
          <p className="text-gray-600 mb-6">The property you're looking for doesn't exist.</p>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen pt-20">
      {/* Back Button */}
      <div className={`${spacing.container} py-6`}>
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to properties</span>
        </Button>
      </div>
      
      {/* Image Gallery */}
      <PropertyImageGallery images={property.images} title={property.title} />
      
      {/* Main Content */}
      <div className={spacing.container}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 py-12">
          {/* Left Column - Property Details */}
          <div className="lg:col-span-2 space-y-12">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h1 className={`${typography.h2} mb-4`}>{property.title}</h1>
                  <div className="flex items-center space-x-4 text-gray-600 mb-4">
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 mr-2" />
                      <span>{property.location.city}, {property.location.state}</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-5 w-5 mr-1 text-gold-500 fill-current" />
                      <span className="font-semibold">{property.rating}</span>
                      <span className="ml-1">({property.review_count} reviews)</span>
                    </div>
                  </div>
                  
                  {/* Property Stats */}
                  <div className="flex items-center space-x-6 text-gray-700">
                    <div className="flex items-center">
                      <Users className="h-5 w-5 mr-2" />
                      <span>{property.capacity.guests} guests</span>
                    </div>
                    <div className="flex items-center">
                      <Bed className="h-5 w-5 mr-2" />
                      <span>{property.capacity.bedrooms} bedrooms</span>
                    </div>
                    <div className="flex items-center">
                      <Bath className="h-5 w-5 mr-2" />
                      <span>{property.capacity.bathrooms} bathrooms</span>
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex items-center space-x-3 ml-6">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleShare}
                    className="rounded-full"
                  >
                    <Share className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleFavoriteToggle}
                    className={`rounded-full ${isFavorited ? 'text-red-500' : ''}`}
                  >
                    <Heart className={`h-5 w-5 ${isFavorited ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </div>
            </motion.div>
            
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="prose prose-gray max-w-none"
            >
              <h3 className="text-xl font-serif font-semibold text-gray-900 mb-4">About this place</h3>
              <p className="text-gray-700 leading-relaxed text-lg">{property.description}</p>
            </motion.div>
            
            {/* Amenities */}
            <PropertyAmenities amenities={property.amenities} />
            
            {/* Host Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gray-50 rounded-2xl p-6"
            >
              <h3 className="text-xl font-serif font-semibold text-gray-900 mb-4">Hosted by {property.host.name}</h3>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-navy-500 to-navy-700 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-xl">
                    {property.host.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{property.host.name}</p>
                  <p className="text-gray-600 text-sm">Superhost • Joined in 2023</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-gray-700">
                  Experienced host committed to providing exceptional stays and personalized service 
                  for every guest. Available 24/7 for any questions or assistance.
                </p>
              </div>
            </motion.div>
            
            {/* Location */}
            <PropertyMap property={property} />
            
            {/* Reviews */}
            <PropertyReviews 
              rating={property.rating}
              reviewCount={property.review_count}
              propertyId={property.id}
            />
          </div>
          
          {/* Right Column - Booking Widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-32">
              <BookingWidget property={property} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}