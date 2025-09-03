'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Sparkles, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { spacing, typography } from '@/lib/utils'
import { useRef } from 'react'
import { useAppStore } from '@/store'

export function CTASection() {
  const ref = useRef<HTMLElement>(null)
  const { setSearchOpen } = useAppStore()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  
  return (
    <section ref={ref} className={`${spacing.section} relative overflow-hidden`}>
      {/* Background Elements */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 bg-gradient-to-br from-navy-50 via-white to-emerald-50"
      />
      
      {/* Floating Background Elements */}
      <motion.div
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-gold-200/30 to-gold-300/30 rounded-full blur-xl"
      />
      <motion.div
        animate={{ 
          rotate: [360, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-br from-navy-200/20 to-emerald-200/20 rounded-full blur-2xl"
      />
      
      <div className={`${spacing.container} relative z-10`}>
        <div className="text-center max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full mb-6"
            >
              <Sparkles className="h-8 w-8 text-black" />
            </motion.div>
            
            <h2 className={`${typography.h2} mb-6`}>
              Your Next Extraordinary
              <span className="block text-gold-600">Adventure Awaits</span>
            </h2>
            
            <p className={`${typography.bodyLarge} max-w-3xl mx-auto`}>
              Don&apos;t just book a place to stay—discover a home that will become part of your story. Join thousands of travelers who have elevated their journeys with We Call It Homes.
            </p>
          </motion.div>
          
          {/* Feature Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          >
            {[
              {
                title: "Instant Booking",
                description: "Reserve your perfect stay in just a few clicks"
              },
              {
                title: "24/7 Support",
                description: "Our concierge team is always here to help"
              },
              {
                title: "Best Price Guarantee",
                description: "Find a better price? We'll match it"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="text-center"
              >
                <h3 className="text-lg font-serif font-semibold text-navy-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
          
          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="xl"
                onClick={() => setSearchOpen(true)}
                className="min-w-[240px] text-lg font-semibold bg-gradient-to-r from-navy-900 to-navy-800 hover:from-navy-800 hover:to-navy-700 shadow-xl hover:shadow-2xl"
              >
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="xl"
                variant="outline"
                asChild
                className="min-w-[240px] text-lg font-medium border-2 border-navy-900 hover:bg-navy-900 hover:text-white"
              >
                <Link href="/properties">
                  Browse Properties
                </Link>
              </Button>
            </motion.div>
          </motion.div>
          
          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 shadow-lg"
          >
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
              <div className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-red-500" />
                <span className="text-gray-700 font-medium">Join 25,000+ happy travelers</span>
              </div>
              
              <div className="hidden md:block w-px h-8 bg-gray-300" />
              
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.1 * i }}
                  >
                    <Sparkles className="h-5 w-5 text-gold-500 fill-current" />
                  </motion.div>
                ))}
                <span className="ml-2 text-gray-700 font-medium">4.9/5 average rating</span>
              </div>
              
              <div className="hidden md:block w-px h-8 bg-gray-300" />
              
              <div className="text-gray-700">
                <span className="font-bold text-navy-900">500+</span> luxury properties
              </div>
            </div>
          </motion.div>
          
          {/* Final Encouragement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12"
          >
            <p className="text-lg text-gray-600 italic">
              Your extraordinary escape is just one click away.
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-32 left-16 w-2 h-2 bg-gold-400 rounded-full"
      />
      <motion.div
        animate={{ 
          y: [0, 15, 0],
          opacity: [0.3, 0.7, 0.3]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-48 right-24 w-3 h-3 bg-navy-400 rounded-full"
      />
      <motion.div
        animate={{ 
          y: [0, -25, 0],
          opacity: [0.4, 0.8, 0.4]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-64 right-16 w-1 h-1 bg-emerald-500 rounded-full"
      />
    </section>
  )
}