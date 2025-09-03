'use client'

import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

export function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 mx-auto mb-4"
        >
          <Loader2 className="w-12 h-12 text-navy-900" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-navy-900 font-medium"
        >
          Loading your experience...
        </motion.p>
      </div>
    </motion.div>
  )
}