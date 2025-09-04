'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { PropertyFilters } from '@/components/properties/property-filters'
import { PropertyGrid } from '@/components/properties/property-grid'
import { PropertyMap } from '@/components/properties/property-map'
import { SearchHeader } from '@/components/properties/search-header'
import { Button } from '@/components/ui/button'
import { Map, Grid3X3, SlidersHorizontal } from 'lucide-react'
import { PropertyFilters as FilterType } from '@/types'
import { spacing } from '@/lib/utils'
import { usePropertiesData } from '@/hooks/use-properties'

export function PropertiesPageClient() {
  const [filters, setFilters] = useState<FilterType>({})
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'distance'>('rating')
  
  const { data: properties, isLoading, error } = usePropertiesData(filters)
  
  // Filter and sort properties
  const filteredProperties = useMemo(() => {
    if (!properties) return []
    
    let filtered = [...properties]
    
    // Apply filters
    if (filters.location && filters.location.trim()) {
      filtered = filtered.filter(property => {
        if (!property.location) return false
        const searchTerm = filters.location!.toLowerCase()
        return (
          property.location.city?.toLowerCase().includes(searchTerm) ||
          property.location.state?.toLowerCase().includes(searchTerm) ||
          property.location.country?.toLowerCase().includes(searchTerm)
        )
      })
    }
    
    if (filters.priceRange) {
      filtered = filtered.filter(property => 
        property.nightly_price >= filters.priceRange!.min &&
        property.nightly_price <= filters.priceRange!.max
      )
    }
    
    if (filters.guests) {
      filtered = filtered.filter(property => 
        property.capacity.guests >= filters.guests!
      )
    }
    
    if (filters.propertyType && Array.isArray(filters.propertyType) && filters.propertyType.length > 0) {
      filtered = filtered.filter(property => 
        property.property_type && filters.propertyType!.includes(property.property_type)
      )
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.nightly_price - b.nightly_price
        case 'rating':
          return b.rating - a.rating
        case 'distance':
          // For demo purposes, random sort
          return Math.random() - 0.5
        default:
          return 0
      }
    })
    
    return filtered
  }, [properties, filters, sortBy])
  
  const handleFiltersChange = (newFilters: FilterType) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }
  
  const clearFilters = () => {
    setFilters({})
  }
  
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Search Header */}
      <SearchHeader 
        filters={filters}
        onFiltersChange={handleFiltersChange}
        resultsCount={filteredProperties?.length || 0}
      />
      
      <div className={spacing.container}>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="sticky top-32">
              <PropertyFilters
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onClearFilters={clearFilters}
                isLoading={isLoading}
              />
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Controls */}
            <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-xl shadow-sm">
              {/* Mobile Filter Toggle */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
              
              {/* Sort Options */}
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600 hidden sm:block">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                >
                  <option value="rating">Highest Rated</option>
                  <option value="price">Price: Low to High</option>
                  <option value="distance">Distance</option>
                </select>
              </div>
              
              {/* View Mode Toggle */}
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-md"
                >
                  <Grid3X3 className="h-4 w-4" />
                  <span className="hidden sm:inline ml-2">Grid</span>
                </Button>
                <Button
                  variant={viewMode === 'map' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('map')}
                  className="rounded-md"
                >
                  <Map className="h-4 w-4" />
                  <span className="hidden sm:inline ml-2">Map</span>
                </Button>
              </div>
            </div>
            
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {viewMode === 'grid' ? (
                <PropertyGrid 
                  properties={filteredProperties}
                  isLoading={isLoading}
                  error={error}
                />
              ) : (
                <PropertyMap 
                  properties={filteredProperties}
                  isLoading={isLoading}
                />
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}