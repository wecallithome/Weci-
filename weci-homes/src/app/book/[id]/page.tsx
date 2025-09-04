import { Metadata } from 'next'
import { BookingFlowClient } from '@/components/booking/booking-flow-client'

interface BookingPageProps {
  params: Promise<{
    id: string
  }>
}

export const metadata: Metadata = {
  title: 'Book Your Stay | We Call It Homes',
  description: 'Complete your booking for this luxury property.',
}

export default async function BookingPage({ params }: BookingPageProps) {
  const resolvedParams = await params
  return <BookingFlowClient propertyId={resolvedParams.id} />
}