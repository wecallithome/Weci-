import { Metadata } from 'next'
import { PropertiesPageClient } from '@/components/properties/properties-page-client'

export const metadata: Metadata = {
  title: 'Luxury Properties',
  description: 'Browse our curated collection of premium properties worldwide. Find your perfect luxury stay.',
  openGraph: {
    title: 'Luxury Properties | We Call It Homes',
    description: 'Browse our curated collection of premium properties worldwide.',
  }
}

export default function PropertiesPage() {
  return <PropertiesPageClient />
}