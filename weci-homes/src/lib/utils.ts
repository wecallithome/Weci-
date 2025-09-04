import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// UK Configuration Constants
export const UK_CONFIG = {
  currency: {
    code: 'GBP',
    symbol: '£',
    locale: 'en-GB',
    decimalPlaces: 2
  },
  address: {
    format: 'UK',
    postcodePattern: /^[A-Z]{1,2}[0-9R][0-9A-Z]? [0-9][ABD-HJLNP-UW-Z]{2}$/,
    requiredFields: ['address', 'city', 'postcode']
  },
  dateTime: {
    locale: 'en-GB',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24h'
  },
  language: {
    locale: 'en-GB',
    dictionary: 'british-english'
  }
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Glassmorphism utility
export const glass = "bg-white/10 backdrop-blur-md border border-white/20 shadow-lg"

// Button variants using cva
export const buttonVariants = {
  primary: "bg-navy-900 text-white hover:bg-navy-700 transition-all duration-300 shadow-lg hover:shadow-xl",
  secondary: "bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 transition-all duration-300",
  gold: "bg-gradient-to-r from-gold-500 to-gold-600 text-black hover:from-gold-600 hover:to-gold-700 transition-all duration-300 shadow-lg",
  outline: "border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white transition-all duration-300",
  ghost: "text-navy-900 hover:bg-navy-50 transition-all duration-300"
}

// Card variants
export const cardVariants = {
  default: "bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300",
  glass: `${glass} rounded-2xl`,
  elevated: "bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
}

// Animation classes
export const animations = {
  fadeIn: "animate-fade-in",
  slideUp: "animate-slide-up",
  slideDown: "animate-slide-down",
  slideLeft: "animate-slide-left",
  slideRight: "animate-slide-right",
  zoomIn: "animate-zoom-in",
  float: "animate-float",
  pulseFlow: "animate-pulse-slow"
}

// Typography variants
export const typography = {
  h1: "font-serif text-4xl md:text-5xl xl:text-6xl font-bold text-navy-900 leading-tight",
  h2: "font-serif text-3xl md:text-4xl xl:text-5xl font-semibold text-navy-900 leading-tight",
  h3: "font-serif text-2xl md:text-3xl xl:text-4xl font-semibold text-navy-900 leading-tight",
  h4: "font-serif text-xl md:text-2xl xl:text-3xl font-medium text-navy-900 leading-tight",
  body: "font-sans text-base md:text-lg text-gray-700 leading-relaxed",
  bodyLarge: "font-sans text-lg md:text-xl text-gray-700 leading-relaxed",
  caption: "font-sans text-sm text-gray-500",
  label: "font-sans text-sm font-medium text-gray-900"
}

// Responsive grid utilities
export const grid = {
  responsive: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8",
  responsiveCards: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6",
  autoFit: "grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6"
}

// Spacing utilities
export const spacing = {
  section: "py-16 md:py-24 xl:py-32",
  container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  containerSmall: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
}

// Format currency - UK localization
export function formatCurrency(amount: number, currency: string = 'GBP'): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: currency,
  }).format(amount)
}

// Format date range - UK localization
export function formatDateRange(startDate: Date, endDate: Date): string {
  const options: Intl.DateTimeFormatOptions = { 
    month: 'short', 
    day: 'numeric' 
  }
  
  const start = startDate.toLocaleDateString('en-GB', options)
  const end = endDate.toLocaleDateString('en-GB', options)
  
  return `${start} - ${end}`
}

// Calculate nights between dates
export function calculateNights(startDate: Date, endDate: Date): number {
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

// Debounce function
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Image optimization helper
export function getOptimizedImageUrl(url: string): string {
  if (!url) return ''
  
  // For demo purposes, return the URL as-is
  // In production, you'd integrate with your image optimization service
  return url
}

// Generate unique ID
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}

// Clamp number between min and max
export function clamp(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max)
}

// Truncate text
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

// UK Address validation and formatting
export function validateUKPostcode(postcode: string): boolean {
  const cleanPostcode = postcode.replace(/\s/g, '').toUpperCase()
  const formattedPostcode = cleanPostcode.replace(/^(.*)([0-9][ABD-HJLNP-UW-Z]{2})$/, '$1 $2')
  return UK_CONFIG.address.postcodePattern.test(formattedPostcode)
}

export function formatUKPostcode(postcode: string): string {
  const cleanPostcode = postcode.replace(/\s/g, '').toUpperCase()
  return cleanPostcode.replace(/^(.*)([0-9][ABD-HJLNP-UW-Z]{2})$/, '$1 $2')
}

export function formatUKAddress(location: {
  address: string
  city: string
  county?: string
  postcode: string
  country?: string
}): string {
  const parts = [
    location.address,
    location.city,
    location.county,
    formatUKPostcode(location.postcode),
    location.country || 'United Kingdom'
  ].filter(Boolean)
  
  return parts.join(', ')
}

// British English term conversions
export const BRITISH_TERMS = {
  'apartment': 'flat',
  'elevator': 'lift',
  'parking lot': 'car park',
  'trash': 'rubbish',
  'vacation rental': 'holiday let',
  'check-in': 'arrival',
  'check-out': 'departure',
  'zip code': 'postcode',
  'state': 'county'
}

export function convertToBritishTerm(term: string): string {
  return BRITISH_TERMS[term.toLowerCase() as keyof typeof BRITISH_TERMS] || term
}