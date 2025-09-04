import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createServerSupabaseClient } from '@/lib/supabase'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
})

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    )
  }

  const supabase = createServerSupabaseClient()

  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        await handlePaymentSuccess(paymentIntent, supabase as unknown as MockSupabaseClient)
        break

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object as Stripe.PaymentIntent
        await handlePaymentFailure(failedPayment, supabase as unknown as MockSupabaseClient)
        break

      default:
        console.log(`Unhandled event type ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Error handling webhook:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}

// Type for mock Supabase client during development
interface MockSupabaseClient {
  from: (table: string) => {
    insert: (data: {
      user_id?: string | null;
      property_id?: string;
      start_date?: string;
      end_date?: string;
      guest_count?: number;
      pricing?: { total: number; currency: string };
      status?: string;
      payment_intent_id?: string;
      booking_id?: string;
      stripe_payment_intent_id?: string;
      amount?: number;
      currency?: string;
    }) => {
      select: () => {
        single: () => Promise<{ data: { id: string } | null; error: unknown | null }>
      }
    } & Promise<{ error: unknown | null }>
    update: (data: {
      status?: string;
    }) => {
      eq: (column: string, value: string) => Promise<{ error: unknown | null }>
    }
  }
}

async function handlePaymentSuccess(paymentIntent: Stripe.PaymentIntent, supabase: MockSupabaseClient) {
  const metadata = paymentIntent.metadata

  try {
    // Create booking record
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .insert({
        user_id: metadata.userId || null, // This should come from authenticated user
        property_id: metadata.propertyId,
        start_date: metadata.startDate,
        end_date: metadata.endDate,
        guest_count: parseInt(metadata.guestCount),
        pricing: {
          total: paymentIntent.amount / 100, // Convert from cents
          currency: paymentIntent.currency
        },
        status: 'confirmed',
        payment_intent_id: paymentIntent.id
      })
      .select()
      .single()

    if (bookingError) {
      console.error('Error creating booking:', bookingError)
      return
    }

    if (!booking) {
      console.error('No booking data returned')
      return
    }

    // Create payment record
    const { error: paymentError } = await supabase
      .from('payments')
      .insert({
        booking_id: booking.id,
        stripe_payment_intent_id: paymentIntent.id,
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency,
        status: 'succeeded'
      })

    if (paymentError) {
      console.error('Error creating payment record:', paymentError)
    }

    // TODO: Send confirmation email
    console.log('Booking confirmed for payment intent:', paymentIntent.id)
  } catch (error) {
    console.error('Error in handlePaymentSuccess:', error)
  }
}

async function handlePaymentFailure(paymentIntent: Stripe.PaymentIntent, supabase: MockSupabaseClient) {
  try {
    // Update any existing booking to failed status
    const { error } = await supabase
      .from('bookings')
      .update({ status: 'cancelled' })
      .eq('payment_intent_id', paymentIntent.id)

    if (error) {
      console.error('Error updating failed booking:', error)
    }

    // TODO: Send payment failure notification
    console.log('Payment failed for payment intent:', paymentIntent.id)
  } catch (error) {
    console.error('Error in handlePaymentFailure:', error)
  }
}