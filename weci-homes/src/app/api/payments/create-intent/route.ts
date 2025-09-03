import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { formatAmountForStripe } from '@/lib/stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

export async function POST(request: NextRequest) {
  try {
    const { amount, bookingData } = await request.json()

    // Validate the amount
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      )
    }

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: formatAmountForStripe(amount, 'usd'),
      currency: 'usd',
      metadata: {
        propertyId: bookingData.propertyId,
        startDate: bookingData.startDate,
        endDate: bookingData.endDate,
        guestCount: bookingData.guestCount.toString(),
        userEmail: bookingData.userEmail,
      },
      automatic_payment_methods: {
        enabled: true,
      },
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    })
  } catch (error) {
    console.error('Error creating payment intent:', error)
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    )
  }
}