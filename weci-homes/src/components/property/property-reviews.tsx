'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface PropertyReviewsProps {
  rating: number
  reviewCount: number
}

// Mock review data
const mockReviews = [
  {
    id: '1',
    author: 'Sarah M.',
    avatar: 'SM',
    rating: 5,
    date: '2024-01-15',
    content: 'Absolutely stunning property with incredible ocean views. The host was incredibly responsive and the space was even more beautiful than the photos. Would definitely stay here again!'
  },
  {
    id: '2',
    author: 'Michael C.',
    avatar: 'MC',
    rating: 5,
    date: '2024-01-08',
    content: 'Perfect location and amazing amenities. The kitchen was fully equipped and the pool area was incredible. Great for a family holiday.'
  },
  {
    id: '3',
    author: 'Emily R.',
    avatar: 'ER',
    rating: 4,
    date: '2024-01-01',
    content: 'Beautiful property with great attention to detail. Minor issue with arrival but the host resolved it quickly. Overall fantastic experience.'
  }
]

export function PropertyReviews({ rating, reviewCount }: PropertyReviewsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center space-x-2">
        <Star className="h-6 w-6 text-gold-500 fill-current" />
        <h3 className="text-xl font-serif font-semibold text-gray-900">
          {rating} · {reviewCount} reviews
        </h3>
      </div>
      
      {/* Rating Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Rating Categories */}
        <div className="space-y-3">
          {[
            { label: 'Cleanliness', rating: 4.9 },
            { label: 'Accuracy', rating: 4.8 },
            { label: 'Check-in', rating: 4.9 },
            { label: 'Communication', rating: 5.0 },
            { label: 'Location', rating: 4.7 },
            { label: 'Value', rating: 4.6 }
          ].map((category, index) => (
            <motion.div
              key={category.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-center justify-between"
            >
              <span className="text-gray-700 text-sm">{category.label}</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gray-900 rounded-full"
                    style={{ width: `${(category.rating / 5) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-900 w-8 text-right">
                  {category.rating}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Overall Rating Display */}
        <div className="flex flex-col items-center justify-center text-center">
          <div className="text-4xl font-bold text-gray-900 mb-2">{rating}</div>
          <div className="flex space-x-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.floor(rating) 
                    ? 'text-gold-500 fill-current' 
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <p className="text-gray-600 text-sm">{reviewCount} reviews</p>
        </div>
      </div>
      
      {/* Recent Reviews */}
      <div className="space-y-6">
        {mockReviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
            className="border-b border-gray-100 pb-6 last:border-b-0 last:pb-0"
          >
            <div className="flex items-start space-x-3">
              {/* Avatar */}
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-medium text-gray-700">
                  {review.avatar}
                </span>
              </div>
              
              {/* Review Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-medium text-gray-900">{review.author}</h4>
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < review.rating 
                            ? 'text-gold-500 fill-current' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-2">
                  {new Date(review.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long'
                  })}
                </p>
                <p className="text-gray-700 leading-relaxed">{review.content}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Show More Reviews Button */}
      {reviewCount > 3 && (
        <Button variant="outline" className="w-full md:w-auto">
          Show all {reviewCount} reviews
        </Button>
      )}
    </motion.div>
  )
}