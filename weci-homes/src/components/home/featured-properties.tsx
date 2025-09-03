'use client'

import { motion } from 'framer-motion'
import { Star, MapPin, Users, Bed } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { spacing, typography } from '@/lib/utils'

// Mock data - in real app this would come from your API
const featuredProperties = [
  {
    id: 'prop-001',
    title: 'Luxury Ocean View Villa',
    location: 'Malibu, California',
    price: 850,
    rating: 4.9,
    reviewCount: 127,
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80'
    ],
    capacity: { guests: 8, bedrooms: 4 },
    featured: true
  },
  {
    id: 'prop-002',
    title: 'Modern Downtown Loft',
    location: 'New York, New York',
    price: 320,
    rating: 4.7,
    reviewCount: 89,
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80'
    ],
    capacity: { guests: 4, bedrooms: 2 },
    featured: true
  },
  {
    id: 'prop-005',
    title: 'Beachfront Paradise House',
    location: 'Miami Beach, Florida',
    price: 680,
    rating: 4.9,
    reviewCount: 203,
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    ],
    capacity: { guests: 10, bedrooms: 5 },
    featured: true
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
}

export function FeaturedProperties() {
  return (
    <section className={`${spacing.section} bg-gray-50`}>
      <div className={spacing.container}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className={`${typography.h2} mb-6`}>
            Featured Properties
          </h2>
          <p className={`${typography.bodyLarge} max-w-3xl mx-auto`}>
            Handpicked exceptional properties that define luxury living. Each home in our curated collection offers something truly extraordinary.
          </p>
        </motion.div>
        
        {/* Properties Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {featuredProperties.map((property, index) => (
            <PropertyCard key={property.id} property={property} index={index} />
          ))}
        </motion.div>
        
        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <Button
            size="lg"
            variant="outline"
            asChild
            className="min-w-[200px]"
          >
            <Link href="/properties">
              View All Properties
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

interface PropertyCardProps {
  property: typeof featuredProperties[0]
  index: number
}

function PropertyCard({ property, index }: PropertyCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      className="group relative"
    >
      <Link href={`/properties/${property.id}`}>
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
          {/* Image */}
          <div className="relative h-64 sm:h-72 overflow-hidden">
            <motion.div
              className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url(${property.images[0]})` }}
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Rating Badge */}
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
              <Star className="h-4 w-4 text-gold-500 fill-current" />
              <span className="text-sm font-semibold text-gray-900">{property.rating}</span>
              <span className="text-sm text-gray-600">({property.reviewCount})</span>
            </div>
            
            {/* Featured Badge */}
            {property.featured && (
              <div className="absolute top-4 right-4 bg-gold-500 text-black text-xs font-semibold px-3 py-1 rounded-full">
                Featured
              </div>
            )}
          </div>
          
          {/* Content */}
          <div className="p-6">
            <div className="mb-4">
              <h3 className="text-xl font-serif font-semibold text-gray-900 mb-2 group-hover:text-navy-900 transition-colors">
                {property.title}
              </h3>
              <div className="flex items-center text-gray-600 text-sm">
                <MapPin className="h-4 w-4 mr-1" />
                {property.location}
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
              </div>
            </div>
            
            {/* Price */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold text-gray-900">${property.price}</span>
                <span className="text-gray-600 text-sm ml-1">/ night</span>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                View Details
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}