-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable PostGIS for location data (optional)
-- CREATE EXTENSION IF NOT EXISTS postgis;

-- Create custom types
CREATE TYPE property_type AS ENUM (
  'villa',
  'apartment', 
  'house',
  'condo',
  'townhouse',
  'cabin',
  'loft'
);

CREATE TYPE amenity_category AS ENUM (
  'basic',
  'entertainment',
  'kitchen',
  'bathroom',
  'outdoor',
  'safety',
  'accessibility'
);

CREATE TYPE booking_status AS ENUM (
  'pending',
  'confirmed',
  'cancelled',
  'completed',
  'refunded'
);

CREATE TYPE payment_status AS ENUM (
  'pending',
  'processing',
  'succeeded',
  'failed',
  'cancelled',
  'refunded'
);

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Properties table
CREATE TABLE IF NOT EXISTS public.properties (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  location JSONB NOT NULL, -- {address, city, state, country, zip_code, latitude, longitude}
  images JSONB NOT NULL DEFAULT '[]', -- Array of image objects
  amenities JSONB NOT NULL DEFAULT '[]', -- Array of amenity IDs
  nightly_price DECIMAL(10,2) NOT NULL,
  cleaning_fee DECIMAL(10,2) DEFAULT 0,
  service_fee DECIMAL(10,2) DEFAULT 0,
  capacity JSONB NOT NULL, -- {guests, bedrooms, bathrooms, beds}
  property_type property_type NOT NULL,
  host_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  availability JSONB DEFAULT '[]', -- Array of date ranges
  rating DECIMAL(3,2) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Amenities table
CREATE TABLE IF NOT EXISTS public.amenities (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  icon TEXT NOT NULL, -- Lucide icon name
  category amenity_category NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bookings table
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  guest_count INTEGER NOT NULL,
  pricing JSONB NOT NULL, -- PricingBreakdown object
  status booking_status DEFAULT 'pending',
  payment_intent_id TEXT,
  special_requests TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Ensure end date is after start date
  CONSTRAINT valid_date_range CHECK (end_date > start_date),
  -- Ensure guest count is positive
  CONSTRAINT positive_guest_count CHECK (guest_count > 0)
);

-- Payments table
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
  stripe_payment_intent_id TEXT NOT NULL UNIQUE,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  status payment_status DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews table (optional for future)
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Ensure one review per booking
  UNIQUE(booking_id)
);

-- Favorites table (user wishlist)
CREATE TABLE IF NOT EXISTS public.favorites (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Ensure one favorite per user per property
  UNIQUE(user_id, property_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_properties_location ON public.properties USING GIN (location);
CREATE INDEX IF NOT EXISTS idx_properties_nightly_price ON public.properties (nightly_price);
CREATE INDEX IF NOT EXISTS idx_properties_property_type ON public.properties (property_type);
CREATE INDEX IF NOT EXISTS idx_properties_featured ON public.properties (featured);
CREATE INDEX IF NOT EXISTS idx_properties_rating ON public.properties (rating);

CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON public.bookings (user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_property_id ON public.bookings (property_id);
CREATE INDEX IF NOT EXISTS idx_bookings_dates ON public.bookings (start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings (status);

CREATE INDEX IF NOT EXISTS idx_payments_booking_id ON public.payments (booking_id);
CREATE INDEX IF NOT EXISTS idx_payments_stripe_id ON public.payments (stripe_payment_intent_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON public.payments (status);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON public.properties FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON public.bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON public.payments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view their own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Properties policies (public read, host write)
CREATE POLICY "Anyone can view properties" ON public.properties
  FOR SELECT USING (true);

CREATE POLICY "Hosts can insert their properties" ON public.properties
  FOR INSERT WITH CHECK (auth.uid() = host_id);

CREATE POLICY "Hosts can update their properties" ON public.properties
  FOR UPDATE USING (auth.uid() = host_id);

CREATE POLICY "Hosts can delete their properties" ON public.properties
  FOR DELETE USING (auth.uid() = host_id);

-- Bookings policies
CREATE POLICY "Users can view their own bookings" ON public.bookings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Hosts can view bookings for their properties" ON public.bookings
  FOR SELECT USING (
    auth.uid() IN (
      SELECT host_id FROM public.properties WHERE id = property_id
    )
  );

CREATE POLICY "Users can create bookings" ON public.bookings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bookings" ON public.bookings
  FOR UPDATE USING (auth.uid() = user_id);

-- Payments policies
CREATE POLICY "Users can view their own payments" ON public.payments
  FOR SELECT USING (
    auth.uid() IN (
      SELECT user_id FROM public.bookings WHERE id = booking_id
    )
  );

CREATE POLICY "System can insert payments" ON public.payments
  FOR INSERT WITH CHECK (true);

CREATE POLICY "System can update payments" ON public.payments
  FOR UPDATE USING (true);

-- Reviews policies
CREATE POLICY "Anyone can view reviews" ON public.reviews
  FOR SELECT USING (true);

CREATE POLICY "Users can create reviews for their bookings" ON public.reviews
  FOR INSERT WITH CHECK (
    auth.uid() = user_id AND
    auth.uid() IN (
      SELECT user_id FROM public.bookings WHERE id = booking_id
    )
  );

CREATE POLICY "Users can update their own reviews" ON public.reviews
  FOR UPDATE USING (auth.uid() = user_id);

-- Favorites policies
CREATE POLICY "Users can view their own favorites" ON public.favorites
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own favorites" ON public.favorites
  FOR ALL USING (auth.uid() = user_id);

-- Amenities are public
ALTER TABLE public.amenities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view amenities" ON public.amenities
  FOR SELECT USING (true);

-- Insert default amenities
INSERT INTO public.amenities (name, icon, category) VALUES
  ('WiFi', 'wifi', 'basic'),
  ('Kitchen', 'chef-hat', 'kitchen'),
  ('Parking', 'car', 'basic'),
  ('Pool', 'waves', 'outdoor'),
  ('Hot Tub', 'bath', 'outdoor'),
  ('Air Conditioning', 'thermometer', 'basic'),
  ('Heating', 'flame', 'basic'),
  ('TV', 'tv', 'entertainment'),
  ('Washing Machine', 'washing-machine', 'basic'),
  ('Dryer', 'wind', 'basic'),
  ('Iron', 'iron', 'basic'),
  ('Hair Dryer', 'wind', 'bathroom'),
  ('Shampoo', 'droplet', 'bathroom'),
  ('Gym', 'dumbbell', 'entertainment'),
  ('Beach Access', 'waves', 'outdoor'),
  ('Balcony', 'building', 'outdoor'),
  ('Garden', 'flower', 'outdoor'),
  ('Barbecue', 'flame', 'outdoor'),
  ('Fire Pit', 'flame', 'outdoor'),
  ('Piano', 'music', 'entertainment'),
  ('Fireplace', 'flame', 'entertainment'),
  ('Smoke Alarm', 'shield-alert', 'safety'),
  ('Carbon Monoxide Alarm', 'shield-alert', 'safety'),
  ('Fire Extinguisher', 'shield', 'safety'),
  ('First Aid Kit', 'heart', 'safety'),
  ('Wheelchair Accessible', 'accessibility', 'accessibility')
ON CONFLICT (name) DO NOTHING;