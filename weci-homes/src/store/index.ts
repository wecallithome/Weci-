import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { 
  AppState, 
  BookingFlowState, 
  UIState, 
  User, 
  Property, 
  DateRange, 
  PricingBreakdown, 
  UserDetails,
  BookingStep 
} from '@/types'

interface AppStore extends AppState {
  // User actions
  setUser: (user: User | null) => void
  clearUser: () => void
  
  // Booking flow actions
  setBookingProperty: (property: Property) => void
  setBookingDateRange: (dateRange: DateRange | null) => void
  setBookingGuestCount: (count: number) => void
  setBookingPricing: (pricing: PricingBreakdown | null) => void
  setBookingUserDetails: (details: UserDetails | null) => void
  setBookingPaymentIntentId: (id: string | null) => void
  setBookingStep: (step: BookingStep) => void
  resetBookingFlow: () => void
  
  // UI actions
  setTheme: (theme: 'light' | 'dark') => void
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
  setLoading: (loading: boolean) => void
  setSearchOpen: (open: boolean) => void
}

const initialBookingFlow: BookingFlowState = {
  currentStep: 'property',
  property: null,
  dateRange: null,
  guestCount: 1,
  pricing: null,
  paymentIntentId: null,
  userDetails: null
}

const initialUIState: UIState = {
  theme: 'light',
  sidebarOpen: false,
  loading: false,
  searchOpen: false
}

export const useAppStore = create<AppStore>()(
  devtools(
    persist(
      (set) => ({
        // Initial state
        user: null,
        bookingFlow: initialBookingFlow,
        ui: initialUIState,
        
        // User actions
        setUser: (user) => set({ user }),
        clearUser: () => set({ user: null }),
        
        // Booking flow actions
        setBookingProperty: (property) =>
          set((state) => ({
            bookingFlow: { ...state.bookingFlow, property, currentStep: 'dates' }
          })),
        
        setBookingDateRange: (dateRange) =>
          set((state) => ({
            bookingFlow: { ...state.bookingFlow, dateRange }
          })),
        
        setBookingGuestCount: (guestCount) =>
          set((state) => ({
            bookingFlow: { ...state.bookingFlow, guestCount }
          })),
        
        setBookingPricing: (pricing) =>
          set((state) => ({
            bookingFlow: { ...state.bookingFlow, pricing }
          })),
        
        setBookingUserDetails: (userDetails) =>
          set((state) => ({
            bookingFlow: { ...state.bookingFlow, userDetails }
          })),
        
        setBookingPaymentIntentId: (paymentIntentId) =>
          set((state) => ({
            bookingFlow: { ...state.bookingFlow, paymentIntentId }
          })),
        
        setBookingStep: (currentStep) =>
          set((state) => ({
            bookingFlow: { ...state.bookingFlow, currentStep }
          })),
        
        resetBookingFlow: () =>
          set({ bookingFlow: initialBookingFlow }),
        
        // UI actions
        setTheme: (theme) =>
          set((state) => ({
            ui: { ...state.ui, theme }
          })),
        
        toggleSidebar: () =>
          set((state) => ({
            ui: { ...state.ui, sidebarOpen: !state.ui.sidebarOpen }
          })),
        
        setSidebarOpen: (sidebarOpen) =>
          set((state) => ({
            ui: { ...state.ui, sidebarOpen }
          })),
        
        setLoading: (loading) =>
          set((state) => ({
            ui: { ...state.ui, loading }
          })),
        
        setSearchOpen: (searchOpen) =>
          set((state) => ({
            ui: { ...state.ui, searchOpen }
          }))
      }),
      {
        name: 'weci-homes-store',
        partialize: (state) => ({
          user: state.user,
          ui: {
            theme: state.ui.theme
            // Don't persist other UI state
          }
          // Don't persist booking flow for security
        })
      }
    ),
    {
      name: 'weci-homes-store'
    }
  )
)

// Selector hooks for better performance
export const useUser = () => useAppStore((state) => state.user)
export const useBookingFlow = () => useAppStore((state) => state.bookingFlow)
export const useUI = () => useAppStore((state) => state.ui)
export const useTheme = () => useAppStore((state) => state.ui.theme)
export const useLoading = () => useAppStore((state) => state.ui.loading)

// Booking flow selectors
export const useBookingProperty = () => useAppStore((state) => state.bookingFlow.property)
export const useBookingDateRange = () => useAppStore((state) => state.bookingFlow.dateRange)
export const useBookingGuestCount = () => useAppStore((state) => state.bookingFlow.guestCount)
export const useBookingPricing = () => useAppStore((state) => state.bookingFlow.pricing)
export const useBookingStep = () => useAppStore((state) => state.bookingFlow.currentStep)