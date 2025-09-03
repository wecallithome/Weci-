'use client'

import { useQuery } from '@tanstack/react-query'
import { PropertyFilters, Property } from '@/types'

// Mock data - in real app this would come from Supabase
const mockProperties: Property[] = [
  {
    id: 'prop-001',
    title: 'Luxury Ocean View Villa',
    description: 'A stunning luxury villa with panoramic ocean views, featuring modern amenities and elegant design.',
    location: {
      address: '123 Ocean Drive',
      city: 'Malibu',
      state: 'California',
      country: 'USA',
      zip_code: '90265',
      latitude: 34.0259,
      longitude: -118.7798
    },
    images: [
      {
        id: 'img-001',
        url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
        alt: 'Ocean view villa exterior',
        is_primary: true,
        order: 1
      },
      {
        id: 'img-002',
        url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2075&q=80',
        alt: 'Modern living room',
        is_primary: false,
        order: 2
      }
    ],
    amenities: ['WiFi', 'Pool', 'Kitchen', 'Parking', 'Air Conditioning', 'Beach Access', 'Balcony'],
    nightly_price: 850,
    cleaning_fee: 150,
    service_fee: 85,
    capacity: {
      guests: 8,
      bedrooms: 4,
      bathrooms: 3,
      beds: 4
    },
    property_type: 'villa',
    host_id: 'host-001',
    host: {
      id: 'host-001',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      avatar_url: '',
      created_at: '2023-01-01',
      updated_at: '2023-01-01'
    },
    availability: [],
    rating: 4.9,
    review_count: 127,
    featured: true,
    created_at: '2023-01-01',
    updated_at: '2023-01-01'
  },
  {
    id: 'prop-002',
    title: 'Modern Downtown Loft',
    description: 'Sleek and sophisticated loft in the heart of downtown with stunning city views.',
    location: {
      address: '456 Urban Street',
      city: 'New York',
      state: 'New York',
      country: 'USA',
      zip_code: '10001'
    },
    images: [
      {
        id: 'img-004',
        url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80',
        alt: 'Modern loft exterior',
        is_primary: true,
        order: 1
      }
    ],
    amenities: ['WiFi', 'Kitchen', 'Air Conditioning', 'Heating', 'TV', 'Washing Machine', 'Gym'],
    nightly_price: 320,
    cleaning_fee: 75,
    service_fee: 32,
    capacity: {
      guests: 4,
      bedrooms: 2,
      bathrooms: 2,
      beds: 2
    },
    property_type: 'loft',
    host_id: 'host-002',
    host: {
      id: 'host-002',
      name: 'Michael Chen',
      email: 'michael@example.com',
      avatar_url: '',
      created_at: '2023-01-01',
      updated_at: '2023-01-01'
    },
    availability: [],
    rating: 4.7,
    review_count: 89,
    featured: true,
    created_at: '2023-01-01',
    updated_at: '2023-01-01'
  },
  {
    id: 'prop-003',
    title: 'Cozy Mountain Cabin',
    description: 'Charming cabin nestled in the mountains with fireplace and hot tub.',
    location: {
      address: '789 Mountain Trail',
      city: 'Aspen',
      state: 'Colorado',
      country: 'USA',
      zip_code: '81611'
    },
    images: [
      {
        id: 'img-006',
        url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        alt: 'Mountain cabin exterior',
        is_primary: true,
        order: 1
      }
    ],
    amenities: ['WiFi', 'Hot Tub', 'Fireplace', 'Kitchen', 'Heating', 'Parking', 'Garden'],
    nightly_price: 275,
    cleaning_fee: 100,
    service_fee: 27.50,
    capacity: {
      guests: 6,
      bedrooms: 3,
      bathrooms: 2,
      beds: 3
    },
    property_type: 'cabin',
    host_id: 'host-003',
    host: {
      id: 'host-003',
      name: 'Emma Wilson',
      email: 'emma@example.com',
      avatar_url: '',
      created_at: '2023-01-01',
      updated_at: '2023-01-01'
    },
    availability: [],
    rating: 4.8,
    review_count: 156,
    featured: false,
    created_at: '2023-01-01',
    updated_at: '2023-01-01'
  },
  {
    id: 'prop-004',
    title: 'Elegant City Apartment',
    description: 'Beautifully appointed apartment in an elegant neighborhood.',
    location: {
      address: '321 Elegant Avenue',
      city: 'San Francisco',
      state: 'California',
      country: 'USA',
      zip_code: '94102'
    },
    images: [
      {
        id: 'img-008',
        url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        alt: 'Elegant apartment building',
        is_primary: true,
        order: 1
      }
    ],
    amenities: ['WiFi', 'Kitchen', 'Air Conditioning', 'TV', 'Washing Machine', 'Balcony'],
    nightly_price: 450,
    cleaning_fee: 120,
    service_fee: 45,
    capacity: {
      guests: 5,
      bedrooms: 2,
      bathrooms: 2,
      beds: 2
    },
    property_type: 'apartment',
    host_id: 'host-004',
    host: {
      id: 'host-004',
      name: 'David Martinez',
      email: 'david@example.com',
      avatar_url: '',
      created_at: '2023-01-01',
      updated_at: '2023-01-01'
    },
    availability: [],
    rating: 4.6,
    review_count: 73,
    featured: false,
    created_at: '2023-01-01',
    updated_at: '2023-01-01'
  },
  {
    id: 'prop-005',
    title: 'Beachfront Paradise House',
    description: 'Stunning beachfront house with private beach access and outdoor deck.',
    location: {
      address: '567 Beachfront Road',
      city: 'Miami Beach',
      state: 'Florida',
      country: 'USA',
      zip_code: '33139'
    },
    images: [
      {
        id: 'img-010',
        url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        alt: 'Beachfront house exterior',
        is_primary: true,
        order: 1
      }
    ],
    amenities: ['WiFi', 'Beach Access', 'Pool', 'Kitchen', 'Air Conditioning', 'Balcony', 'Barbecue'],
    nightly_price: 680,
    cleaning_fee: 180,
    service_fee: 68,
    capacity: {
      guests: 10,
      bedrooms: 5,
      bathrooms: 4,
      beds: 5
    },
    property_type: 'house',
    host_id: 'host-005',
    host: {
      id: 'host-005',
      name: 'Sofia Rodriguez',
      email: 'sofia@example.com',
      avatar_url: '',
      created_at: '2023-01-01',
      updated_at: '2023-01-01'
    },
    availability: [],
    rating: 4.9,
    review_count: 203,
    featured: true,
    created_at: '2023-01-01',
    updated_at: '2023-01-01'
  },
  {
    id: 'prop-006',
    title: 'Historic Townhouse',
    description: 'Charming historic townhouse with original architectural details.',
    location: {
      address: '890 Historic Lane',
      city: 'Boston',
      state: 'Massachusetts',
      country: 'USA',
      zip_code: '02108'
    },
    images: [
      {
        id: 'img-012',
        url: 'https://images.unsplash.com/photo-1605146769289-440113cc3d00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        alt: 'Historic townhouse facade',
        is_primary: true,
        order: 1
      }
    ],
    amenities: ['WiFi', 'Kitchen', 'Heating', 'Fireplace', 'TV', 'Washing Machine', 'Garden'],
    nightly_price: 380,
    cleaning_fee: 90,
    service_fee: 38,
    capacity: {
      guests: 6,
      bedrooms: 3,
      bathrooms: 2,
      beds: 3
    },
    property_type: 'townhouse',
    host_id: 'host-006',
    host: {
      id: 'host-006',
      name: 'James Thompson',
      email: 'james@example.com',
      avatar_url: '',
      created_at: '2023-01-01',
      updated_at: '2023-01-01'
    },
    availability: [],
    rating: 4.5,
    review_count: 67,
    featured: false,
    created_at: '2023-01-01',
    updated_at: '2023-01-01'
  }
]

async function fetchProperties(filters: PropertyFilters): Promise<Property[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // In a real app, this would be a Supabase query
  return mockProperties
}

export function usePropertiesData(filters: PropertyFilters) {
  return useQuery({
    queryKey: ['properties', filters],
    queryFn: () => fetchProperties(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export function usePropertyData(id: string) {
  return useQuery({
    queryKey: ['property', id],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      const property = mockProperties.find(p => p.id === id)
      if (!property) throw new Error('Property not found')
      return property
    },
    staleTime: 5 * 60 * 1000,
  })
}