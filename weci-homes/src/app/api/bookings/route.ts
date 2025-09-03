import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const bookingData = await request.json()
    const supabase = createServerSupabaseClient()

    // Validate required fields
    if (!bookingData.property_id || !bookingData.start_date || !bookingData.end_date) {
      return NextResponse.json(
        { error: 'Missing required booking information' },
        { status: 400 }
      )
    }

    // Check property availability
    const { data: existingBookings } = await supabase
      .from('bookings')
      .select('id')
      .eq('property_id', bookingData.property_id)
      .or(`start_date.lte.${bookingData.end_date},end_date.gte.${bookingData.start_date}`)
      .eq('status', 'confirmed')

    if (existingBookings && existingBookings.length > 0) {
      return NextResponse.json(
        { error: 'Property is not available for selected dates' },
        { status: 409 }
      )
    }

    // Create pending booking
    const { data: booking, error } = await supabase
      .from('bookings')
      .insert({
        ...bookingData,
        status: 'pending'
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating booking:', error)
      return NextResponse.json(
        { error: 'Failed to create booking' },
        { status: 500 }
      )
    }

    return NextResponse.json({ booking })
  } catch (error) {
    console.error('Error in booking API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    const supabase = createServerSupabaseClient()

    const { data: bookings, error } = await supabase
      .from('bookings')
      .select(`
        *,
        property:properties(*),
        payment:payments(*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching bookings:', error)
      return NextResponse.json(
        { error: 'Failed to fetch bookings' },
        { status: 500 }
      )
    }

    return NextResponse.json({ bookings })
  } catch (error) {
    console.error('Error in booking API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}