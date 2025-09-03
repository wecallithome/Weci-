'use client'

import Script from 'next/script'

interface OrganizationSchemaProps {
  name: string
  url: string
  logo: string
  description: string
}

export function OrganizationSchema({ name, url, logo, description }: OrganizationSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    logo,
    description,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-555-123-HOMES',
      contactType: 'customer service',
      availableLanguage: ['English'],
    },
    sameAs: [
      'https://www.facebook.com/wecallithomes',
      'https://www.instagram.com/wecallithomes',
      'https://www.twitter.com/wecallithomes',
    ],
  }

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface PropertySchemaProps {
  property: {
    id: string
    title: string
    description: string
    location: string
    nightly_price: number
    main_image: string
    rating?: number
    review_count?: number
  }
}

export function PropertySchema({ property }: PropertySchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: property.title,
    description: property.description,
    image: property.main_image,
    address: {
      '@type': 'PostalAddress',
      addressLocality: property.location,
    },
    priceRange: `$${property.nightly_price}`,
    aggregateRating: property.rating && property.review_count ? {
      '@type': 'AggregateRating',
      ratingValue: property.rating,
      reviewCount: property.review_count,
    } : undefined,
  }

  return (
    <Script
      id="property-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function WebsiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'We Call It Homes',
    url: 'https://wecallithomes.com',
    description: 'Discover extraordinary properties and create unforgettable memories. We curate the finest homes for the most discerning travelers.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://wecallithomes.com/properties?search={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <Script
      id="website-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}