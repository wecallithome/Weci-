-- Sample data for development and testing

-- Insert sample properties
INSERT INTO public.properties (
  id,
  title,
  description,
  location,
  images,
  amenities,
  nightly_price,
  cleaning_fee,
  service_fee,
  capacity,
  property_type,
  host_id,
  rating,
  review_count,
  featured
) VALUES 
(
  'prop-001',
  'Luxury Ocean View Villa',
  'A stunning luxury villa with panoramic ocean views, featuring modern amenities and elegant design. Perfect for a romantic getaway or family vacation.',
  '{"address": "123 Ocean Drive", "city": "Malibu", "state": "California", "country": "USA", "zip_code": "90265", "latitude": 34.0259, "longitude": -118.7798}',
  '[
    {"id": "img-001", "url": "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80", "alt": "Ocean view villa exterior", "is_primary": true, "order": 1},
    {"id": "img-002", "url": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2075&q=80", "alt": "Modern living room", "is_primary": false, "order": 2},
    {"id": "img-003", "url": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80", "alt": "Master bedroom", "is_primary": false, "order": 3}
  ]',
  '["WiFi", "Pool", "Kitchen", "Parking", "Air Conditioning", "Beach Access", "Balcony"]',
  850.00,
  150.00,
  85.00,
  '{"guests": 8, "bedrooms": 4, "bathrooms": 3, "beds": 4}',
  'villa',
  NULL,
  4.9,
  127,
  true
),
(
  'prop-002',
  'Modern Downtown Loft',
  'Sleek and sophisticated loft in the heart of downtown. Floor-to-ceiling windows, high-end appliances, and walking distance to all major attractions.',
  '{"address": "456 Urban Street", "city": "New York", "state": "New York", "country": "USA", "zip_code": "10001", "latitude": 40.7589, "longitude": -73.9851}',
  '[
    {"id": "img-004", "url": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80", "alt": "Modern loft exterior", "is_primary": true, "order": 1},
    {"id": "img-005", "url": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2016&q=80", "alt": "Open concept living", "is_primary": false, "order": 2}
  ]',
  '["WiFi", "Kitchen", "Air Conditioning", "Heating", "TV", "Washing Machine", "Gym"]',
  320.00,
  75.00,
  32.00,
  '{"guests": 4, "bedrooms": 2, "bathrooms": 2, "beds": 2}',
  'loft',
  NULL,
  4.7,
  89,
  true
),
(
  'prop-003',
  'Cozy Mountain Cabin',
  'Escape to this charming cabin nestled in the mountains. Features a fireplace, hot tub, and stunning nature views. Perfect for a peaceful retreat.',
  '{"address": "789 Mountain Trail", "city": "Aspen", "state": "Colorado", "country": "USA", "zip_code": "81611", "latitude": 39.1911, "longitude": -106.8175}',
  '[
    {"id": "img-006", "url": "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80", "alt": "Mountain cabin exterior", "is_primary": true, "order": 1},
    {"id": "img-007", "url": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80", "alt": "Cozy living room with fireplace", "is_primary": false, "order": 2}
  ]',
  '["WiFi", "Hot Tub", "Fireplace", "Kitchen", "Heating", "Parking", "Garden"]',
  275.00,
  100.00,
  27.50,
  '{"guests": 6, "bedrooms": 3, "bathrooms": 2, "beds": 3}',
  'cabin',
  NULL,
  4.8,
  156,
  false
),
(
  'prop-004',
  'Elegant City Apartment',
  'Beautifully appointed apartment in an elegant neighborhood. Featuring classic architecture, modern amenities, and easy access to cultural attractions.',
  '{"address": "321 Elegant Avenue", "city": "San Francisco", "state": "California", "country": "USA", "zip_code": "94102", "latitude": 37.7749, "longitude": -122.4194}',
  '[
    {"id": "img-008", "url": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80", "alt": "Elegant apartment building", "is_primary": true, "order": 1},
    {"id": "img-009", "url": "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80", "alt": "Spacious living area", "is_primary": false, "order": 2}
  ]',
  '["WiFi", "Kitchen", "Air Conditioning", "TV", "Washing Machine", "Balcony"]',
  450.00,
  120.00,
  45.00,
  '{"guests": 5, "bedrooms": 2, "bathrooms": 2, "beds": 2}',
  'apartment',
  NULL,
  4.6,
  73,
  false
),
(
  'prop-005',
  'Beachfront Paradise House',
  'Wake up to the sound of waves in this stunning beachfront house. Private beach access, outdoor deck, and all the amenities for the perfect beach vacation.',
  '{"address": "567 Beachfront Road", "city": "Miami Beach", "state": "Florida", "country": "USA", "zip_code": "33139", "latitude": 25.7617, "longitude": -80.1918}',
  '[
    {"id": "img-010", "url": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80", "alt": "Beachfront house exterior", "is_primary": true, "order": 1},
    {"id": "img-011", "url": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2049&q=80", "alt": "Ocean view deck", "is_primary": false, "order": 2}
  ]',
  '["WiFi", "Beach Access", "Pool", "Kitchen", "Air Conditioning", "Balcony", "Barbecue"]',
  680.00,
  180.00,
  68.00,
  '{"guests": 10, "bedrooms": 5, "bathrooms": 4, "beds": 5}',
  'house',
  NULL,
  4.9,
  203,
  true
),
(
  'prop-006',
  'Historic Townhouse',
  'Charming historic townhouse with original architectural details and modern renovations. Located in a quiet, tree-lined neighborhood with easy city access.',
  '{"address": "890 Historic Lane", "city": "Boston", "state": "Massachusetts", "country": "USA", "zip_code": "02108", "latitude": 42.3601, "longitude": -71.0589}',
  '[
    {"id": "img-012", "url": "https://images.unsplash.com/photo-1605146769289-440113cc3d00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80", "alt": "Historic townhouse facade", "is_primary": true, "order": 1},
    {"id": "img-013", "url": "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80", "alt": "Classic interior", "is_primary": false, "order": 2}
  ]',
  '["WiFi", "Kitchen", "Heating", "Fireplace", "TV", "Washing Machine", "Garden"]',
  380.00,
  90.00,
  38.00,
  '{"guests": 6, "bedrooms": 3, "bathrooms": 2, "beds": 3}',
  'townhouse',
  NULL,
  4.5,
  67,
  false
);

-- Note: In a real application, you would need actual user IDs from auth.users
-- For this demo, we're leaving host_id as NULL since we don't have real users yet
-- You would typically create users first or update these records after user creation