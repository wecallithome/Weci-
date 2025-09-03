'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, MapPin, Calendar, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAppStore } from '@/store'

export function SearchModal() {
  const { ui, setSearchOpen } = useAppStore()
  const [query] = useState('')
  const [location, setLocation] = useState('')
  const [guests, setGuests] = useState(1)
  const inputRef = useRef<HTMLInputElement>(null)
  
  useEffect(() => {
    if (ui.searchOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [ui.searchOpen])
  
  const handleSearch = () => {
    // Implement search logic
    console.log('Search:', { query, location, guests })
    setSearchOpen(false)
  }
  
  if (!ui.searchOpen) return null
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20"
        onClick={() => setSearchOpen(false)}
      >
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl shadow-2xl p-8 mx-4 w-full max-w-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-serif font-bold text-navy-900">
              Find Your Perfect Stay
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          
          {/* Search Form */}
          <div className="space-y-6">
            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="h-4 w-4 inline mr-2" />
                Where are you going?
              </label>
              <input
                ref={inputRef}
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Search destinations"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
              />
            </div>
            
            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="h-4 w-4 inline mr-2" />
                  Check-in
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Check-out
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                />
              </div>
            </div>
            
            {/* Guests */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Users className="h-4 w-4 inline mr-2" />
                Guests
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
              >
                {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'guest' : 'guests'}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Search Button */}
            <Button
              onClick={handleSearch}
              className="w-full h-12 text-lg"
              size="lg"
            >
              <Search className="h-5 w-5 mr-2" />
              Search Properties
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}