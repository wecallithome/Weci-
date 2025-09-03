'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

// Error boundary component for handling runtime errors

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8, type: 'spring' }}
            className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <AlertTriangle className="h-12 w-12 text-red-600" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
              Something went wrong
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              We&apos;re sorry, but something unexpected happened.
            </p>
            <p className="text-gray-500">
              Our team has been notified and is working to fix this issue.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              onClick={reset}
              size="lg"
              className="flex items-center space-x-2"
            >
              <RefreshCw className="h-5 w-5" />
              <span>Try Again</span>
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              asChild
            >
              <Link href="/" className="flex items-center space-x-2">
                <Home className="h-5 w-5" />
                <span>Go Home</span>
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}