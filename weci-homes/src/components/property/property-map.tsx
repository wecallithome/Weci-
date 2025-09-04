'use client'

import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { Property } from '@/types'

interface PropertyMapProps {
  property: Property
}

export function PropertyMap({ property }: PropertyMapProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="space-y-6"
    >
      <h3 className="text-xl font-serif font-semibold text-gray-900">Where you&apos;ll be</h3>
      
      {/* Location Info */}
      <div className="flex items-center space-x-2 text-gray-700 mb-4">
        <MapPin className="h-5 w-5" />
        <span className="font-medium">
          {property.location.city}, {property.location.state}, {property.location.country}
        </span>
      </div>
      
      {/* Mock Map */}
      <div className="h-80 bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl border border-gray-200 relative overflow-hidden">
        {/* Map Pattern Background */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236b7280' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")`
          }}
        />
        
        {/* Property Marker */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-navy-900 text-white px-4 py-2 rounded-full shadow-lg font-medium flex items-center space-x-2"
          >
            <MapPin className="h-4 w-4" />
            <span>{property.title}</span>
          </motion.div>
          
          {/* Marker Pin */}
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-navy-900" />
        </div>
        
        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors">
            <span className="text-xl font-bold text-gray-600">+</span>
          </button>
          <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors">
            <span className="text-xl font-bold text-gray-600">−</span>
          </button>
        </div>
        
        {/* Neighborhood Indicators */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-md">
          <p className="text-sm font-medium text-gray-900 mb-1">Neighborhood</p>
          <p className="text-xs text-gray-600">
            {property.location.city} • Luxury district
          </p>
        </div>
      </div>
      
      {/* Location Description */}
      <div className="prose prose-gray max-w-none">
        <p className="text-gray-700 leading-relaxed">
          Experience the best of {property.location.city} from this perfectly located property. 
          You&apos;ll be in the heart of the city&apos;s most sought-after neighbourhood, with easy access 
          to premier dining, shopping, and cultural attractions. The area is known for its 
          safety, walkability, and proximity to major landmarks.
        </p>
      </div>
      
      {/* Nearby Attractions */}
      <div className="bg-gray-50 rounded-2xl p-6">
        <h4 className="font-semibold text-gray-900 mb-4">What&apos;s nearby</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: 'Beach', distance: '0.5 miles', time: '7 min walk' },
            { name: 'Downtown', distance: '2.1 miles', time: '5 min drive' },
            { name: 'Airport', distance: '15 miles', time: '25 min drive' },
            { name: 'Restaurants', distance: '0.2 miles', time: '3 min walk' }
          ].map((location, index) => (
            <motion.div
              key={location.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
              className="flex justify-between items-center"
            >
              <span className="text-gray-700">{location.name}</span>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">{location.distance}</div>
                <div className="text-xs text-gray-500">{location.time}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}