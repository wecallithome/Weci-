'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Heart, Mail, Phone, MapPin, Instagram, Twitter, Facebook } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface FooterProps {
  minimal?: boolean
}

const footerLinks = {
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press', href: '/press' },
    { label: 'Blog', href: '/blog' }
  ],
  Support: [
    { label: 'Help Center', href: '/help' },
    { label: 'Safety', href: '/safety' },
    { label: 'Cancellation', href: '/cancellation' },
    { label: 'Contact Us', href: '/contact' }
  ],
  Host: [
    { label: 'Host Your Home', href: '/host' },
    { label: 'Host Resources', href: '/host/resources' },
    { label: 'Community Forum', href: '/community' },
    { label: 'Hosting Fees', href: '/host/fees' }
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
    { label: 'Accessibility', href: '/accessibility' }
  ]
}

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' }
]

const contactInfo = [
  { icon: Mail, label: 'hello@wecallithomes.com', href: 'mailto:hello@wecallithomes.com' },
  { icon: Phone, label: '+1 (555) 123-4567', href: 'tel:+15551234567' },
  { icon: MapPin, label: 'San Francisco, CA', href: '#' }
]

export function Footer({ minimal = false }: FooterProps) {
  if (minimal) {
    return (
      <footer className="py-8 px-4 border-t border-gray-200">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 sm:mb-0">
            <span className="text-sm text-gray-600">© 2024 We Call It Homes</span>
            <Heart className="h-4 w-4 text-red-500" />
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/privacy" className="text-sm text-gray-600 hover:text-navy-900">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm text-gray-600 hover:text-navy-900">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className="bg-navy-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-navy-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h3 className="text-2xl font-serif font-bold mb-4">
              Stay in the Loop
            </h3>
            <p className="text-navy-200 mb-6">
              Get exclusive access to new properties, special offers, and travel inspiration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
              <Button variant="gold" className="whitespace-nowrap">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Link href="/" className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-gold-500 to-gold-600 rounded-xl flex items-center justify-center">
                  <span className="text-black font-bold text-lg">W</span>
                </div>
                <div>
                  <h4 className="text-xl font-serif font-bold">We Call It Homes</h4>
                  <p className="text-sm text-navy-200">Your Stay, Elevated</p>
                </div>
              </Link>
              <p className="text-navy-200 mb-6 leading-relaxed">
                Discover extraordinary properties and create unforgettable memories. 
                We curate the finest homes for the most discerning travelers.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <social.icon className="h-5 w-5" />
                    <span className="sr-only">{social.label}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h5 className="font-semibold text-white mb-4">{category}</h5>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-navy-200 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-navy-700"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactInfo.map((contact) => (
              <a
                key={contact.label}
                href={contact.href}
                className="flex items-center space-x-3 text-navy-200 hover:text-white transition-colors group"
              >
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <contact.icon className="h-5 w-5" />
                </div>
                <span className="text-sm">{contact.label}</span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-navy-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 sm:mb-0">
              <span className="text-sm text-navy-200">© 2024 We Call It Homes. All rights reserved.</span>
              <Heart className="h-4 w-4 text-red-500" />
            </div>
            <div className="flex items-center space-x-6">
              <span className="text-sm text-navy-200">
                Made with love in San Francisco
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}