'use client'

import { motion } from 'framer-motion'
import { 
  Award, 
  Star, 
  Users, 
  Globe, 
  Heart, 
  Shield, 
  Quote
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const stats = [
  { number: '500+', label: 'Luxury Properties', icon: Award },
  { number: '50,000+', label: 'Happy Guests', icon: Users },
  { number: '25+', label: 'Countries', icon: Globe },
  { number: '4.9', label: 'Average Rating', icon: Star }
]

const values = [
  {
    icon: Heart,
    title: 'Exceptional Experiences',
    description: 'We curate every detail to create unforgettable moments that exceed expectations.'
  },
  {
    icon: Shield,
    title: 'Trust & Security',
    description: 'Your safety and peace of mind are paramount in every booking and stay.'
  },
  {
    icon: Star,
    title: 'Uncompromising Quality',
    description: 'Every property is meticulously vetted to meet our exacting standards.'
  },
  {
    icon: Users,
    title: 'Personal Service',
    description: '24/7 concierge support ensures your needs are met at every moment.'
  }
]

const team = [
  {
    name: 'Sarah Chen',
    role: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b5cc?w=300&q=80',
    bio: 'Former luxury hotel executive with 15 years in hospitality.'
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Head of Properties',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80',
    bio: 'Real estate veteran specializing in premium vacation rentals.'
  },
  {
    name: 'Elena Volkov',
    role: 'Guest Experience Director',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80',
    bio: 'Hospitality expert ensuring every guest feels truly at home.'
  },
  {
    name: 'James Parker',
    role: 'Technology Lead',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80',
    bio: 'Tech innovator making luxury travel seamlessly accessible.'
  }
]

const testimonials = [
  {
    quote: "We Call It Homes transformed our family vacation into something extraordinary. Every detail was perfect.",
    author: "Jennifer Walsh",
    role: "Family Traveler",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80"
  },
  {
    quote: "The level of service and attention to detail is unmatched. This is how luxury travel should be.",
    author: "David Kim",
    role: "Business Executive", 
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80"
  },
  {
    quote: "From booking to checkout, everything exceeded our expectations. We&apos;ve found our go-to for special occasions.",
    author: "Maria Santos",
    role: "Anniversary Traveler",
    image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&q=80"
  }
]

export function AboutClient() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80"
            alt="Luxury interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-900/80 to-navy-700/60" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">
              Your Stay,
              <br />
              <span className="text-gold-400">Elevated</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
              We believe that where you stay shapes how you experience the world. 
              That&apos;s why we&apos;ve dedicated ourselves to curating the finest collection 
              of luxury properties for the most discerning travelers.
            </p>
            <Button size="lg" className="bg-gold-600 hover:bg-gold-700">
              Our Story
            </Button>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce" />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-navy-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-navy-600" />
                </div>
                <h3 className="text-3xl font-bold text-navy-900 mb-2">{stat.number}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-serif font-bold text-navy-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-6 text-gray-700 text-lg">
                <p>
                  Founded in 2018 by a team of hospitality veterans and travel enthusiasts, 
                  We Call It Homes was born from a simple belief: extraordinary experiences 
                  deserve extraordinary places.
                </p>
                <p>
                  Having spent years in luxury hotels and boutique properties worldwide, 
                  our founders recognized that travelers were seeking something more personal, 
                  more authentic, yet equally luxurious. They envisioned a platform that would 
                  bridge the gap between the intimacy of a private home and the service standards 
                  of the world&apos;s finest hotels.
                </p>
                <p>
                  Today, we&apos;re proud to offer a carefully curated collection of properties 
                  that represent the pinnacle of luxury travel. Each home in our portfolio 
                  tells a story, creates memories, and elevates the very concept of "staying somewhere" 
                  into &ldquo;belonging somewhere.&rdquo;
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80"
                alt="Luxury living space"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gold-400 rounded-2xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-serif font-bold text-navy-900 mb-6">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide everything we do, from property selection 
              to guest service excellence.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-navy-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <value.icon className="h-10 w-10 text-navy-600" />
                </div>
                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-serif font-bold text-navy-900 mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Passionate professionals dedicated to making your travel dreams reality.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-navy-900 text-center mb-2">
                  {member.name}
                </h3>
                <p className="text-gold-600 text-center font-medium mb-4">
                  {member.role}
                </p>
                <p className="text-gray-600 text-center text-sm">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-serif font-bold text-white mb-6">
              What Our Guests Say
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Real experiences from travelers who&apos;ve made our properties their home away from home.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
              >
                <Quote className="h-8 w-8 text-gold-400 mb-6" />
                <p className="text-white text-lg mb-6 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center space-x-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-white font-semibold">
                      {testimonial.author}
                    </h4>
                    <p className="text-gray-300 text-sm">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gold-600 to-gold-700">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-serif font-bold text-white mb-6">
              Ready to Experience the Difference?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of discerning travelers who choose We Call It Homes 
              for their most important journeys.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-gold-700 hover:bg-gray-100"
              >
                Browse Properties
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-gold-700"
              >
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}