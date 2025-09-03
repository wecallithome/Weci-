'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown, Play, Pause } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useAppStore } from '@/store'

const heroImages = [
  {
    url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
    alt: 'Luxury oceanview villa at sunset'
  },
  {
    url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80',
    alt: 'Modern city loft with skyline views'
  },
  {
    url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    alt: 'Cozy mountain cabin in nature'
  }
]

const heroText = [
  {
    headline: "We Call It Homes",
    subheadline: "Your Stay, Elevated",
    description: "Discover extraordinary properties curated for the most discerning travelers. Every home tells a story, every stay creates memories."
  },
  {
    headline: "Luxury Redefined",
    subheadline: "Beyond Ordinary", 
    description: "Experience unparalleled comfort and sophistication in our handpicked collection of premium properties worldwide."
  },
  {
    headline: "Create Memories",
    subheadline: "That Last Forever",
    description: "From intimate getaways to grand celebrations, find the perfect backdrop for life's most precious moments."
  }
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const { setSearchOpen } = useAppStore()
  const { scrollY } = useScroll()
  
  // Parallax effects
  const y = useTransform(scrollY, [0, 1000], [0, -200])
  const opacity = useTransform(scrollY, [0, 800], [1, 0])
  
  // Auto-advance slides
  useEffect(() => {
    if (!isPlaying) return
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 6000)
    
    return () => clearInterval(interval)
  }, [isPlaying])
  
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    })
  }
  
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Images with Parallax */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 w-full h-[120%] top-[-10%]"
      >
        {heroImages.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ 
              opacity: currentSlide === index ? 1 : 0,
              scale: currentSlide === index ? 1 : 1.1
            }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${image.url})` }}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
          </motion.div>
        ))}
      </motion.div>
      
      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex items-center justify-center text-center px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-4xl mx-auto">
          {/* Main Content */}
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-white"
          >
            <motion.h1 
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              {heroText[currentSlide].headline}
            </motion.h1>
            
            <motion.p 
              className="text-2xl sm:text-3xl lg:text-4xl font-light mb-8 text-white/90"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
            >
              {heroText[currentSlide].subheadline}
            </motion.p>
            
            <motion.p 
              className="text-lg sm:text-xl lg:text-2xl font-light mb-12 max-w-3xl mx-auto leading-relaxed text-white/80"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.1 }}
            >
              {heroText[currentSlide].description}
            </motion.p>
            
            {/* Call to Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.3 }}
            >
              <Button
                size="xl"
                variant="gold"
                onClick={() => setSearchOpen(true)}
                className="min-w-[200px] text-lg font-semibold"
              >
                Explore Stays
              </Button>
              
              <Button
                size="xl"
                variant="secondary"
                asChild
                className="min-w-[200px] text-lg font-medium backdrop-blur-md"
              >
                <Link href="/properties">
                  View All Properties
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Slide Indicators */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-3">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? 'bg-white scale-125'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </div>
      
      {/* Play/Pause Control */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute bottom-8 right-8 z-20 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
      >
        {isPlaying ? (
          <Pause className="h-5 w-5" />
        ) : (
          <Play className="h-5 w-5 ml-0.5" />
        )}
      </button>
      
      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 text-white/80 hover:text-white transition-colors"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm font-medium">Scroll to explore</span>
          <ChevronDown className="h-6 w-6" />
        </div>
      </motion.button>
      
      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 right-20 w-4 h-4 bg-white/30 rounded-full"
        animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-40 left-16 w-2 h-2 bg-gold-400/40 rounded-full"
        animate={{ y: [0, 15, 0], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute bottom-40 right-32 w-3 h-3 bg-emerald-400/30 rounded-full"
        animate={{ y: [0, -25, 0], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
    </section>
  )
}