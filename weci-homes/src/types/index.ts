// Core entity types
export interface User {
  id: string
  email: string
  name: string
  phone?: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface Property {
  id: string
  title: string
  description: string
  location: Location
  images: ImageAsset[]
  amenities: Amenity[]
  nightly_price: number
  cleaning_fee: number
  service_fee: number
  capacity: PropertyCapacity
  property_type: PropertyType
  host_id: string
  host: User
  availability: DateRange[]
  rating: number
  review_count: number
  featured: boolean
  created_at: string
  updated_at: string
}

export interface Location {
  address: string
  city: string
  state?: string // Optional for backward compatibility
  county?: string // UK county field
  country: string
  zip_code?: string // Optional for backward compatibility
  postcode?: string // UK postcode field
  region?: string // UK region (England, Scotland, Wales, Northern Ireland)
  latitude?: number
  longitude?: number
}

// UK-specific location interface
export interface UKLocation {
  address: string
  city: string
  county?: string
  country: 'United Kingdom'
  postcode: string
  region: 'England' | 'Scotland' | 'Wales' | 'Northern Ireland'
  latitude?: number
  longitude?: number
}

export interface ImageAsset {
  id: string
  url: string
  alt: string
  width?: number
  height?: number
  is_primary: boolean
  order: number
}

export interface Amenity {
  id: string
  name: string
  icon: string
  category: AmenityCategory
}

export interface PropertyCapacity {
  guests: number
  bedrooms: number
  bathrooms: number
  beds: number
}

export interface DateRange {
  start: Date
  end: Date
}

export interface Booking {
  id: string
  user_id: string
  property_id: string
  property: Property
  user: User
  start_date: Date
  end_date: Date
  guest_count: number
  pricing: PricingBreakdown
  status: BookingStatus
  payment_intent_id?: string
  special_requests?: string
  created_at: string
  updated_at: string
}

export interface PricingBreakdown {
  base_price: number
  nights: number
  subtotal: number
  cleaning_fee: number
  service_fee: number
  taxes: number
  total: number
  currency?: string // Add currency field, defaults to GBP
}

export interface Payment {
  id: string
  booking_id: string
  stripe_payment_intent_id: string
  amount: number
  currency: string
  status: PaymentStatus
  created_at: string
  updated_at: string
}

// Enum types
export type PropertyType = 
  | 'villa'
  | 'apartment'
  | 'house'
  | 'condo'
  | 'townhouse'
  | 'cabin'
  | 'loft'

export type AmenityCategory = 
  | 'basic'
  | 'entertainment'
  | 'kitchen'
  | 'bathroom'
  | 'outdoor'
  | 'safety'
  | 'accessibility'

export type BookingStatus = 
  | 'pending'
  | 'confirmed'
  | 'cancelled'
  | 'completed'
  | 'refunded'

export type PaymentStatus = 
  | 'pending'
  | 'processing'
  | 'succeeded'
  | 'failed'
  | 'cancelled'
  | 'refunded'

// Form types
export interface PropertyFilters {
  location?: string
  startDate?: Date
  endDate?: Date
  guests?: number
  priceRange?: {
    min: number
    max: number
  }
  propertyType?: PropertyType[]
  amenities?: string[]
}

export interface BookingFormData {
  property_id: string
  start_date: Date
  end_date: Date
  guest_count: number
  user_details: UserDetails
  special_requests?: string
}

export interface UserDetails {
  name: string
  email: string
  phone: string
}

export interface PaymentFormData {
  card_number: string
  exp_month: string
  exp_year: string
  cvc: string
  name: string
  address: Address
}

export interface Address {
  line1: string
  line2?: string
  city: string
  state?: string // Optional for backward compatibility
  county?: string // UK county field
  postal_code?: string // Optional for backward compatibility
  postcode?: string // UK postcode field
  country: string
}

// API Response types
export interface ApiResponse<T> {
  data: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

// State management types
export interface AppState {
  user: User | null
  bookingFlow: BookingFlowState
  ui: UIState
}

export interface BookingFlowState {
  currentStep: BookingStep
  property: Property | null
  dateRange: DateRange | null
  guestCount: number
  pricing: PricingBreakdown | null
  paymentIntentId: string | null
  userDetails: UserDetails | null
}

export interface UIState {
  theme: 'light' | 'dark'
  sidebarOpen: boolean
  loading: boolean
  searchOpen: boolean
}

export type BookingStep = 
  | 'property'
  | 'dates'
  | 'guests'
  | 'details'
  | 'payment'
  | 'confirmation'

// Component prop types
export interface PropertyCardProps {
  property: Property
  variant?: 'default' | 'featured' | 'compact'
  showFavorite?: boolean
  onFavoriteToggle?: (propertyId: string) => void
}

export interface SearchFiltersProps {
  filters: PropertyFilters
  onFiltersChange: (filters: PropertyFilters) => void
  onClearFilters: () => void
}

export interface DatePickerProps {
  selectedRange: DateRange | null
  onRangeSelect: (range: DateRange | null) => void
  unavailableDates?: Date[]
  minDate?: Date
  maxDate?: Date
}

export interface BookingWidgetProps {
  property: Property
  selectedRange: DateRange | null
  guestCount: number
  onDateRangeChange: (range: DateRange | null) => void
  onGuestCountChange: (count: number) => void
  onBookingSubmit: () => void
}

// Error types
export interface AppError {
  code: string
  message: string
  details?: unknown
}

export interface ValidationError {
  field: string
  message: string
}

// Navigation types
export interface NavigationItem {
  href: string
  label: string
  icon?: string
  external?: boolean
}

export interface BreadcrumbItem {
  href: string
  label: string
}

// Theme types
export interface ThemeConfig {
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    foreground: string
  }
  fonts: {
    sans: string
    serif: string
  }
}

// Animation types
export interface AnimationConfig {
  initial: object
  animate: object
  exit?: object
  transition?: object
}

// Stripe types (extending from @stripe/stripe-js)
export interface StripePaymentIntent {
  id: string
  amount: number
  currency: string
  status: string
  client_secret: string
}

export interface StripePaymentMethod {
  id: string
  type: string
  card?: {
    brand: string
    last4: string
    exp_month: number
    exp_year: number
  }
}

// Utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>

// Generic types for forms
export type FormState<T> = {
  values: T
  errors: Partial<Record<keyof T, string>>
  touched: Partial<Record<keyof T, boolean>>
  isSubmitting: boolean
  isValid: boolean
}

// Database types (for Supabase)
export interface Database {
  public: {
    Tables: {
      users: {
        Row: User
        Insert: Omit<User, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<User, 'id' | 'created_at'>>
      }
      properties: {
        Row: Property
        Insert: Omit<Property, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Property, 'id' | 'created_at'>>
      }
      bookings: {
        Row: Booking
        Insert: Omit<Booking, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Booking, 'id' | 'created_at'>>
      }
      payments: {
        Row: Payment
        Insert: Omit<Payment, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Payment, 'id' | 'created_at'>>
      }
    }
  }
}