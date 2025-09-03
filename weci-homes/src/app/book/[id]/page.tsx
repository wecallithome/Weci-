import { Metadata } from 'next'
import { BookingFlowClient } from '@/components/booking/booking-flow-client'

interface BookingPageProps {
  params: {
    id: string
  }
}

export const metadata: Metadata = {
  title: 'Book Your Stay | We Call It Homes',
  description: 'Complete your booking for this luxury property.',
}

export default function BookingPage({ params }: BookingPageProps) {
  return <BookingFlowClient propertyId={params.id} />
}