'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Home, ArrowLeft, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 flex items-center justify-center px-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gold-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 text-center text-white max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-9xl md:text-[12rem] font-bold text-white/10 mb-4"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8, type: 'spring' }}
          >
            404
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mb-8"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Page Not Found
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Sorry, we couldn&apos;t find the page you&apos;re looking for. 
              Perhaps you&apos;d like to explore our luxury properties instead?
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              className="bg-gold-600 hover:bg-gold-700 text-white"
              asChild
            >
              <Link href="/" className="flex items-center space-x-2">
                <Home className="h-5 w-5" />
                <span>Go Home</span>
              </Link>
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-navy-900"
              asChild
            >
              <Link href="/properties" className="flex items-center space-x-2">
                <Search className="h-5 w-5" />
                <span>Browse Properties</span>
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-8"
          >
            <Button
              variant="ghost"
              className="text-gray-300 hover:text-white"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}