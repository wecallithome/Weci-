'use client'

import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider } from 'next-themes'
import { Navigation } from './navigation'
import { Footer } from './footer'
import { SearchModal } from '@/components/search/search-modal'
import { LoadingScreen } from '@/components/ui/loading-screen'
import { Toast } from '@/components/ui/toast'
import { useAppStore } from '@/store'

interface AppLayoutProps {
  children: ReactNode
}

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
})

export function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname()
  const { ui } = useAppStore()
  
  // Determine navigation style based on route
  const isHomePage = pathname === '/'
  const isAuthPage = pathname?.startsWith('/auth')
  const showMinimalFooter = isAuthPage
  
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem={false}
        disableTransitionOnChange
      >
        <div className="min-h-screen flex flex-col">
          {/* Navigation */}
          {!isAuthPage && (
            <Navigation 
              transparent={isHomePage} 
              fixed={true}
            />
          )}
          
          {/* Main Content */}
          <main className="flex-1">
            {children}
          </main>
          
          {/* Footer */}
          <Footer minimal={showMinimalFooter} />
          
          {/* Global Modals & Overlays */}
          <SearchModal />
          <Toast />
          
          {/* Loading Screen */}
          {ui.loading && <LoadingScreen />}
        </div>
        
        {/* React Query Devtools */}
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
    </QueryClientProvider>
  )
}