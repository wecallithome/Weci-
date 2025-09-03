'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, User, Heart, Calendar, Search, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAppStore } from '@/store'
import { useAuth } from '@/contexts/auth-context'
import { cn, glass } from '@/lib/utils'

interface NavigationProps {
  transparent?: boolean
  fixed?: boolean
}

const navigationItems = [
  { href: '/', label: 'Home' },
  { href: '/properties', label: 'Properties' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' }
]

export function Navigation({ transparent = false, fixed = true }: NavigationProps) {
  const pathname = usePathname()
  const { user, signOut } = useAuth()
  const { ui, toggleSidebar, setSearchOpen } = useAppStore()
  const [scrolled, setScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const isTransparent = transparent && !scrolled && !ui.sidebarOpen
  
  return (
    <>
      {/* Main Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          'w-full z-50 transition-all duration-300',
          fixed ? 'fixed top-0' : 'relative',
          isTransparent
            ? 'bg-transparent'
            : scrolled || !transparent
            ? 'bg-white/95 backdrop-blur-md shadow-lg'
            : glass
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-10 h-10 bg-gradient-to-r from-navy-900 to-navy-700 rounded-xl flex items-center justify-center shadow-lg"
              >
                <span className="text-white font-bold text-lg">W</span>
              </motion.div>
              <div className="hidden sm:block">
                <h1 className={cn(
                  "text-xl font-serif font-bold transition-colors duration-300",
                  isTransparent ? "text-white" : "text-navy-900"
                )}>
                  We Call It Homes
                </h1>
                <p className={cn(
                  "text-xs transition-colors duration-300",
                  isTransparent ? "text-white/80" : "text-gray-600"
                )}>
                  Your Stay, Elevated
                </p>
              </div>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-all duration-300 relative group",
                    pathname === item.href
                      ? isTransparent
                        ? "text-white"
                        : "text-navy-900"
                      : isTransparent
                      ? "text-white/80 hover:text-white"
                      : "text-gray-600 hover:text-navy-900"
                  )}
                >
                  {item.label}
                  <motion.div
                    className={cn(
                      "absolute -bottom-1 left-0 h-0.5 bg-current transform origin-left",
                      pathname === item.href ? "w-full" : "w-0 group-hover:w-full"
                    )}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              ))}
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
              {/* Search Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(true)}
                className={cn(
                  "hidden sm:flex",
                  isTransparent
                    ? "text-white hover:bg-white/10"
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                <Search className="h-5 w-5" />
              </Button>
              
              {user ? (
                <div className="flex items-center space-x-2">
                  {/* Favorites */}
                  <Button
                    variant="ghost"
                    size="icon"
                    asChild
                    className={cn(
                      "hidden sm:flex",
                      isTransparent
                        ? "text-white hover:bg-white/10"
                        : "text-gray-600 hover:bg-gray-100"
                    )}
                  >
                    <Link href="/favorites">
                      <Heart className="h-5 w-5" />
                    </Link>
                  </Button>
                  
                  {/* Bookings */}
                  <Button
                    variant="ghost"
                    size="icon"
                    asChild
                    className={cn(
                      "hidden sm:flex",
                      isTransparent
                        ? "text-white hover:bg-white/10"
                        : "text-gray-600 hover:bg-gray-100"
                    )}
                  >
                    <Link href="/dashboard">
                      <Calendar className="h-5 w-5" />
                    </Link>
                  </Button>
                  
                  {/* Profile */}
                  <Button
                    variant={isTransparent ? "secondary" : "outline"}
                    size="sm"
                    asChild
                  >
                    <Link href="/dashboard" className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span className="hidden sm:block">
                        {user.user_metadata?.first_name || user.email?.split('@')[0]}
                      </span>
                    </Link>
                  </Button>
                  
                  {/* Sign Out */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={signOut}
                    className={cn(
                      "hidden sm:flex",
                      isTransparent
                        ? "text-white hover:bg-white/10"
                        : "text-gray-600 hover:bg-gray-100"
                    )}
                  >
                    <LogOut className="h-5 w-5" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className={cn(
                      isTransparent
                        ? "text-white hover:bg-white/10"
                        : "text-gray-600 hover:bg-gray-100"
                    )}
                  >
                    <Link href="/login">Sign In</Link>
                  </Button>
                  <Button
                    variant={isTransparent ? "secondary" : "default"}
                    size="sm"
                    asChild
                  >
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                </div>
              )}
              
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className={cn(
                  "lg:hidden",
                  isTransparent
                    ? "text-white hover:bg-white/10"
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                {ui.sidebarOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>
      
      {/* Mobile Sidebar */}
      <AnimatePresence>
        {ui.sidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleSidebar}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
            
            {/* Sidebar */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 lg:hidden"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-xl font-serif font-bold text-navy-900">
                      We Call It Homes
                    </h2>
                    <p className="text-sm text-gray-600">Your Stay, Elevated</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                    <X className="h-6 w-6" />
                  </Button>
                </div>
                
                {/* Navigation Links */}
                <div className="space-y-4 mb-8">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={toggleSidebar}
                      className={cn(
                        "block py-3 px-4 rounded-lg text-lg font-medium transition-colors",
                        pathname === item.href
                          ? "bg-navy-900 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
                
                {/* User Actions */}
                {user ? (
                  <div className="space-y-3">
                    <Button asChild variant="outline" className="w-full justify-start">
                      <Link href="/dashboard">
                        <User className="h-4 w-4 mr-3" />
                        Dashboard
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full justify-start">
                      <Link href="/favorites">
                        <Heart className="h-4 w-4 mr-3" />
                        Favorites
                      </Link>
                    </Button>
                    <Button 
                      onClick={signOut}
                      variant="outline" 
                      className="w-full justify-start"
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Button asChild variant="outline" className="w-full">
                      <Link href="/login">Sign In</Link>
                    </Button>
                    <Button asChild className="w-full">
                      <Link href="/signup">Sign Up</Link>
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}