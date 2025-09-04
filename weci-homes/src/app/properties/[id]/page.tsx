import { Metadata } from 'next'
import { PropertyDetailClient } from '@/components/property/property-detail-client'

interface PropertyDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: PropertyDetailPageProps): Promise<Metadata> {
  const _resolvedParams = await params
  // In a real app, you'd fetch the property data here for SEO
  return {
    title: `Property Details | We Call It Homes`,
    description: 'Discover this amazing property and book your luxury stay.',
  }
}

export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const resolvedParams = await params
  return <PropertyDetailClient propertyId={resolvedParams.id} />
}