'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Calendar, Users, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PropertyFilters as FilterType } from '@/types'

interface SearchHeaderProps {
  filters: FilterType
  onFiltersChange: (filters: FilterType) => void
  resultsCount: number
}

export function SearchHeader({ filters, onFiltersChange, resultsCount }: SearchHeaderProps) {
  const [quickSearch, setQuickSearch] = useState({
    location: filters.location || '',
    checkIn: '',
    checkOut: '',
    guests: filters.guests || 1
  })
  
  const handleQuickSearch = () => {
    onFiltersChange({
      location: quickSearch.location || undefined,
      guests: quickSearch.guests,
      // Add date filtering logic here
    })
  }
  
  return (
    <div className="bg-white border-b border-gray-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-navy-900 mb-4">
            Discover Your Perfect Stay
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse our curated collection of {resultsCount} premium properties worldwide
          </p>
        </motion.div>
        
        {/* Quick Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gray-50 rounded-2xl p-6 shadow-sm border border-gray-200"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="h-4 w-4 inline mr-1" />
                Where
              </label>
              <input
                type="text"
                value={quickSearch.location}
                onChange={(e) => setQuickSearch(prev => ({ ...prev, location: e.target.value }))}
                placeholder="Search destinations"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent bg-white"
              />
            </div>
            
            {/* Check-in */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="h-4 w-4 inline mr-1" />
                Check-in
              </label>
              <input
                type="date"
                value={quickSearch.checkIn}
                onChange={(e) => setQuickSearch(prev => ({ ...prev, checkIn: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent bg-white"
              />
            </div>
            
            {/* Check-out */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Check-out
              </label>
              <input
                type="date"
                value={quickSearch.checkOut}
                onChange={(e) => setQuickSearch(prev => ({ ...prev, checkOut: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent bg-white"
              />
            </div>
            
            {/* Guests & Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Users className="h-4 w-4 inline mr-1" />
                Guests
              </label>
              <div className="flex gap-2">
                <select
                  value={quickSearch.guests}
                  onChange={(e) => setQuickSearch(prev => ({ ...prev, guests: Number(e.target.value) }))}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent bg-white"
                >
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'guest' : 'guests'}
                    </option>
                  ))}
                </select>
                <Button
                  onClick={handleQuickSearch}
                  className="px-6 py-3 h-12"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}