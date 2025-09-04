'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ImageAsset } from '@/types'

interface PropertyImageGalleryProps {
  images: ImageAsset[]
  title: string
}

export function PropertyImageGallery({ images, title }: PropertyImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  
  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % images.length)
  }
  
  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }
  
  const openLightbox = (index: number) => {
    setSelectedImageIndex(index)
    setIsLightboxOpen(true)
  }
  
  if (!images || images.length === 0) {
    return (
      <div className="h-96 bg-gray-200 flex items-center justify-center">
        <p className="text-gray-500">No images available</p>
      </div>
    )
  }
  
  return (
    <>
      {/* Main Gallery */}
      <div className="relative">
        {/* Desktop Grid Layout */}
        <div className="hidden md:grid grid-cols-4 gap-2 h-96 px-4 sm:px-6 lg:px-8">
          {/* Main Image */}
          <div className="col-span-2 row-span-2 relative group overflow-hidden rounded-l-2xl">
            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={() => openLightbox(0)}
              className="w-full h-full"
            >
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${images[0]?.url})` }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                  <ZoomIn className="h-5 w-5 text-gray-700" />
                </div>
              </div>
            </motion.button>
          </div>
          
          {/* Thumbnail Grid */}
          {images.slice(1, 5).map((image, index) => (
            <div key={image.id} className="relative group overflow-hidden">
              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={() => openLightbox(index + 1)}
                className="w-full h-full"
              >
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${image.url})` }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                {index === 3 && images.length > 5 && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">
                      +{images.length - 5} more
                    </span>
                  </div>
                )}
              </motion.button>
            </div>
          ))}
        </div>
        
        {/* Mobile Carousel */}
        <div className="md:hidden relative h-80">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${images[selectedImageIndex]?.url})` }}
          />
          
          {/* Navigation Buttons */}
          {images.length > 1 && (
            <>
              <Button
                variant="secondary"
                size="icon"
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 rounded-full backdrop-blur-sm"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 rounded-full backdrop-blur-sm"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
              
              {/* Dots Indicator */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === selectedImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
          
          {/* View All Button */}
          <Button
            onClick={() => openLightbox(selectedImageIndex)}
            variant="secondary"
            size="sm"
            className="absolute bottom-4 right-4 backdrop-blur-sm"
          >
            <ZoomIn className="h-4 w-4 mr-2" />
            View All
          </Button>
        </div>
        
        {/* View All Photos Button (Desktop) */}
        <div className="hidden md:block absolute bottom-4 right-8">
          <Button
            onClick={() => openLightbox(0)}
            variant="secondary"
            className="backdrop-blur-sm"
          >
            <ZoomIn className="h-4 w-4 mr-2" />
            View all {images.length} photos
          </Button>
        </div>
      </div>
      
      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
            onClick={() => setIsLightboxOpen(false)}
          >
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-4 right-4 text-white hover:bg-white/10 z-10"
            >
              <X className="h-6 w-6" />
            </Button>
            
            {/* Image Counter */}
            <div className="absolute top-4 left-4 text-white bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 z-10">
              {selectedImageIndex + 1} / {images.length}
            </div>
            
            {/* Main Image */}
            <motion.div
              key={selectedImageIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-7xl max-h-[90vh] mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full">
                <Image
                  src={images[selectedImageIndex]?.url || ''}
                  alt={images[selectedImageIndex]?.alt || title}
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
            </motion.div>
            
            {/* Navigation */}
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation()
                    prevImage()
                  }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/10"
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation()
                    nextImage()
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/10"
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>
              </>
            )}
            
            {/* Thumbnail Strip */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 max-w-full overflow-x-auto px-4">
              {images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedImageIndex(index)
                  }}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    index === selectedImageIndex
                      ? 'border-white'
                      : 'border-white/30 hover:border-white/60'
                  }`}
                >
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${image.url})` }}
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}