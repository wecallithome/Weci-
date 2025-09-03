'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Users, MapPin, Award, Home } from 'lucide-react'
import { spacing } from '@/lib/utils'

const stats = [
  {
    icon: Home,
    value: 500,
    suffix: '+',
    label: 'Luxury Properties',
    description: 'Handpicked homes worldwide'
  },
  {
    icon: Users,
    value: 25000,
    suffix: '+',
    label: 'Happy Guests',
    description: 'Memorable stays created'
  },
  {
    icon: MapPin,
    value: 50,
    suffix: '+',
    label: 'Global Destinations',
    description: 'Cities and regions covered'
  },
  {
    icon: Award,
    value: 4.9,
    suffix: '',
    label: 'Average Rating',
    description: 'Guest satisfaction score'
  }
]

// Custom hook for number animation
function useCountUp(end: number, duration: number = 2000, startAnimation: boolean = false) {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    if (!startAnimation) return
    
    let startTime: number
    let animationFrame: number
    
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(end * easeOutCubic))
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }
    
    animationFrame = requestAnimationFrame(animate)
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [end, duration, startAnimation])
  
  return count
}

export function StatsSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, threshold: 0.3 })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  
  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      {/* Animated Background */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-emerald-900"
      >
        {/* Overlay Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-repeat" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>
        
        {/* Floating Elements */}
        <motion.div
          animate={{ 
            x: [0, 100, 0], 
            y: [0, -50, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-20 w-4 h-4 bg-gold-400/20 rounded-full"
        />
        <motion.div
          animate={{ 
            x: [0, -80, 0], 
            y: [0, 60, 0],
            rotate: [360, 180, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-32 right-32 w-6 h-6 bg-emerald-400/15 rounded-full"
        />
        <motion.div
          animate={{ 
            x: [0, 120, 0], 
            y: [0, -80, 0],
            scale: [1, 1.5, 1]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 right-16 w-3 h-3 bg-white/10 rounded-full"
        />
      </motion.div>
      
      <div className={`${spacing.container} relative z-10`}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
            Trusted by Travelers
            <span className="block text-gold-400">Around the World</span>
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Numbers that speak to our commitment to excellence and the trust our community places in us.
          </p>
        </motion.div>
        
        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <StatCard 
              key={stat.label} 
              stat={stat} 
              index={index}
              startAnimation={isInView}
            />
          ))}
        </motion.div>
        
        {/* Bottom Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-20"
        >
          <div className="max-w-4xl mx-auto">
            <p className="text-2xl md:text-3xl font-serif text-white/95 italic leading-relaxed mb-6">
              &quot;These numbers represent more than statistics—they reflect real connections, genuine experiences, and the trust our community places in us every day.&quot;
            </p>
            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-lg">W</span>
              </div>
              <div className="text-left">
                <p className="text-white font-semibold">We Call It Homes Team</p>
                <p className="text-white/70 text-sm">Hospitality Excellence</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

interface StatCardProps {
  stat: typeof stats[0]
  index: number
  startAnimation: boolean
}

function StatCard({ stat, index, startAnimation }: StatCardProps) {
  const count = useCountUp(stat.value, 2000 + (index * 200), startAnimation)
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 * index }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="text-center group"
    >
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
        {/* Icon */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="w-16 h-16 bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:from-gold-300 group-hover:to-gold-500 transition-all duration-300"
        >
          <stat.icon className="h-8 w-8 text-black" />
        </motion.div>
        
        {/* Number */}
        <div className="mb-4">
          <motion.span 
            className="text-4xl md:text-5xl font-bold text-white"
            key={count} // Re-trigger animation when count changes
          >
            {stat.value === 4.9 ? (count / 10).toFixed(1) : count.toLocaleString()}
          </motion.span>
          <span className="text-4xl md:text-5xl font-bold text-gold-400">
            {stat.suffix}
          </span>
        </div>
        
        {/* Label */}
        <h3 className="text-xl font-serif font-semibold text-white mb-2">
          {stat.label}
        </h3>
        
        {/* Description */}
        <p className="text-white/80 text-sm leading-relaxed">
          {stat.description}
        </p>
      </div>
    </motion.div>
  )
}