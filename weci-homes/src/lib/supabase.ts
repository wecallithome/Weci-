import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types'

// TODO: Replace these with actual Supabase project credentials
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Development mode checks - using mock values for now
const isDevelopment = process.env.NODE_ENV === 'development'
const isMockSupabase = supabaseUrl.includes('mock-project')

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

// Server-side client for API routes
export const createServerSupabaseClient = () => {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}