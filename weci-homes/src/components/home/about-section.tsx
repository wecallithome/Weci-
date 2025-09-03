'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Award, Heart, Shield, Globe } from 'lucide-react'
import { spacing, typography } from '@/lib/utils'
import { useRef } from 'react'

const features = [
  {
    icon: Heart,
    title: 'Curated with Love',
    description: 'Every property is personally selected and verified by our team to ensure exceptional quality and unique character.'
  },
  {
    icon: Shield,
    title: 'Secure & Trusted',
    description: 'Advanced security measures, verified hosts, and comprehensive insurance coverage for complete peace of mind.'
  },
  {
    icon: Award,
    title: 'Award-Winning Service',
    description: '24/7 concierge support, instant booking confirmation, and personalized recommendations for an effortless experience.'
  },
  {
    icon: Globe,
    title: 'Global Network',
    description: 'Access to premium properties in the world\'s most sought-after destinations, from city centers to hidden gems.'
  }
]

export function AboutSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  
  return (
    <section ref={ref} className={`${spacing.section} relative overflow-hidden`}>
      {/* Background Elements */}
      <motion.div
        style={{ y, opacity }}
        className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-navy-100 to-navy-200 rounded-full blur-3xl opacity-20"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
        className="absolute bottom-20 left-16 w-48 h-48 bg-gradient-to-br from-gold-100 to-gold-200 rounded-full blur-3xl opacity-20"
      />
      
      <div className={spacing.container}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className={`${typography.h2} mb-8`}>
              Where Luxury Meets
              <span className="block text-gold-600">Authentic Hospitality</span>
            </h2>
            
            <div className="space-y-6">
              <p className={typography.bodyLarge}>
                At We Call It Homes, we believe that extraordinary travel experiences begin with extraordinary places to stay. Our mission is to redefine luxury hospitality by connecting discerning travelers with properties that embody the perfect harmony of comfort, style, and authenticity.
              </p>
              
              <p className={typography.body}>
                Founded on the principle that every journey deserves an exceptional home base, we meticulously curate a collection of properties that go beyond mere accommodation. Each home in our portfolio tells a unique story, offers distinctive character, and provides the kind of memorable experiences that transform trips into lifelong memories.
              </p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-gradient-to-r from-navy-50 to-emerald-50 p-6 rounded-2xl border border-navy-100"
              >
                <p className="text-navy-800 font-medium italic text-lg">
                  &ldquo;Our commitment extends beyond providing beautiful spaces – we craft experiences that inspire, comfort that nurtures, and service that anticipates your every need.&rdquo;
                </p>
                <p className="text-navy-600 mt-3 text-sm font-medium">
                  — The We Call It Homes Team
                </p>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="group"
              >
                <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="w-12 h-12 bg-gradient-to-br from-navy-600 to-navy-700 rounded-xl flex items-center justify-center mb-4 group-hover:from-gold-500 group-hover:to-gold-600 transition-all duration-300"
                  >
                    <feature.icon className="h-6 w-6 text-white" />
                  </motion.div>
                  
                  <h3 className="text-lg font-serif font-semibold text-gray-900 mb-3 group-hover:text-navy-900 transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-emerald-800 rounded-3xl p-12 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-gold-400/10 to-transparent rounded-full blur-3xl" />
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                Ready to Experience the Extraordinary?
              </h3>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Join thousands of travelers who have discovered that luxury isn&apos;t just about thread count and marble countertops—it&apos;s about feeling truly at home, anywhere in the world.
              </p>
              
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="text-center sm:text-left">
                  <p className="text-2xl font-bold text-gold-400">500+</p>
                  <p className="text-sm text-white/80">Curated Properties</p>
                </div>
                <div className="hidden sm:block w-px h-12 bg-white/20" />
                <div className="text-center sm:text-left">
                  <p className="text-2xl font-bold text-gold-400">50+</p>
                  <p className="text-sm text-white/80">Global Destinations</p>
                </div>
                <div className="hidden sm:block w-px h-12 bg-white/20" />
                <div className="text-center sm:text-left">
                  <p className="text-2xl font-bold text-gold-400">4.9</p>
                  <p className="text-sm text-white/80">Average Rating</p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}