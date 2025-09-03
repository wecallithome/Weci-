import { HeroSection } from '@/components/home/hero-section'
import { FeaturedProperties } from '@/components/home/featured-properties'
import { AboutSection } from '@/components/home/about-section'
import { CTASection } from '@/components/home/cta-section'
import { StatsSection } from '@/components/home/stats-section'
import { OrganizationSchema, WebsiteSchema } from '@/components/seo/structured-data'

export default function Home() {
  return (
    <>
      <OrganizationSchema
        name="We Call It Homes"
        url="https://wecallithomes.com"
        logo="https://wecallithomes.com/logo.png"
        description="Discover extraordinary properties and create unforgettable memories. We curate the finest homes for the most discerning travelers."
      />
      <WebsiteSchema />
      <div className="flex flex-col">
        <HeroSection />
        <FeaturedProperties />
        <AboutSection />
        <StatsSection />
        <CTASection />
      </div>
    </>
  )
}
