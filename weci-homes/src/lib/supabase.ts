import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types'

// Get environment variables with fallbacks
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mock-project.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'mock_anon_key'
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'mock_service_role_key'

// Development mode checks - using mock values for now
const isDevelopment = process.env.NODE_ENV === 'development'
const isMockSupabase = supabaseUrl?.includes('mock-project') || false

if (!supabaseUrl || !supabaseAnonKey) {
  if (isDevelopment) {
    console.warn('⚠️  Using mock Supabase configuration for development. TODO: Set up actual Supabase project.')
  } else {
    throw new Error('Missing Supabase environment variables')
  }
}

// Create Supabase client with mock detection
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: !isMockSupabase,
    persistSession: !isMockSupabase,
    detectSessionInUrl: !isMockSupabase
  }
})

// Mock Supabase client interface for build time
interface MockQueryBuilder {
  select: (columns?: string) => MockQueryBuilder
  insert: (data: unknown) => MockQueryBuilder
  update: (data: unknown) => MockQueryBuilder
  delete: () => MockQueryBuilder
  eq: (column: string, value: unknown) => MockQueryBuilder
  or: (condition: string) => MockQueryBuilder
  order: (column: string, options?: { ascending?: boolean }) => MockQueryBuilder
  single: () => { data: null, error: null }
  data?: unknown[]
  error?: null
}

interface MockSupabaseClient {
  from: (table: string) => MockQueryBuilder
}

// Server-side client for API routes
export const createServerSupabaseClient = () => {
  // Return a mock client during build time to prevent errors
  if (typeof window === 'undefined' && process.env.NODE_ENV === 'production') {
    const mockQueryBuilder: MockQueryBuilder = {
      select: () => mockQueryBuilder,
      insert: () => mockQueryBuilder,
      update: () => mockQueryBuilder,
      delete: () => mockQueryBuilder,
      eq: () => mockQueryBuilder,
      or: () => mockQueryBuilder,
      order: () => mockQueryBuilder,
      single: () => ({ data: null, error: null }),
      data: [],
      error: null
    }
    
    return {
      from: () => mockQueryBuilder
    } as MockSupabaseClient
  }
  
  return createClient<Database>(
    supabaseUrl,
    serviceRoleKey
  )
}