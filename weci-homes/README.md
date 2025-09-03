This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# We Call It Homes - Luxury Property Booking Platform

## 🏡 Overview

We Call It Homes is a production-ready, luxury property booking platform inspired by Apple's design language and Airbnb's functionality. Built with Next.js 15, Supabase, and Stripe, it delivers an immersive, cinematic experience for discerning travelers seeking extraordinary accommodations.

## ✨ Features

### 🎨 Design & UX
- **Cinematic Landing Page** with auto-advancing hero carousel and parallax effects
- **Glassmorphism UI** with luxury typography (Playfair Display + Inter)
- **Apple-inspired Animations** using Framer Motion
- **Responsive Design** optimized for all devices
- **Dark/Light Mode** support

### 🏠 Property Management
- **Advanced Property Search** with filters, sorting, and map integration
- **Immersive Property Details** with image galleries and 360° tours
- **Real-time Availability** calendar integration
- **Dynamic Pricing** with seasonal adjustments

### 📅 Booking System
- **Multi-step Booking Flow** with progress indicators
- **Date Selection** with availability checking
- **Guest Management** with detailed requirements
- **Pricing Calculator** with taxes and fees
- **Secure Payments** via Stripe

### 👤 User Management
- **Supabase Authentication** with social login
- **User Dashboard** for booking management
- **Profile Management** with preferences
- **Booking History** and status tracking

### 💳 Payment Processing
- **Stripe Integration** with secure card processing
- **Payment Intent API** for robust transactions
- **Webhook Handling** for payment confirmations
- **Refund Management** and dispute handling

### 🔧 Technical Excellence
- **Next.js 15** with App Router and Turbopack
- **TypeScript** for type safety
- **Supabase** for backend and real-time features
- **Zustand** for state management
- **React Query** for data fetching
- **Tailwind CSS v4** for styling
- **SEO Optimized** with structured data

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account
- Stripe account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/weci-homes.git
   cd weci-homes
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   \n   Fill in your environment variables:
   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   \n   # Stripe
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   \n   # App
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret
   ```\n

4. **Set up Supabase database**
   ```bash
   # Run the migration file
   psql -h your_supabase_host -U postgres -d postgres -f supabase/migrations/001_initial_schema.sql
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication pages
│   ├── properties/        # Property listings and details
│   ├── dashboard/         # User dashboard
│   ├── api/              # API routes
│   └── globals.css       # Global styles
├── components/           # React components
│   ├── ui/              # Reusable UI components
│   ├── layout/          # Layout components
│   ├── home/            # Homepage components
│   ├── properties/      # Property-related components
│   ├── booking/         # Booking flow components
│   ├── dashboard/       # Dashboard components
│   └── auth/            # Authentication components
├── lib/                 # Utility functions
├── store/              # Zustand state management
├── types/              # TypeScript type definitions
└── contexts/           # React contexts
```

## 🛠️ Technology Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS v4** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Zustand** - State management
- **React Query** - Data fetching and caching
- **React Hook Form** - Form handling
- **Zod** - Schema validation

### Backend
- **Supabase** - Backend as a Service
- **PostgreSQL** - Database
- **Row Level Security** - Data security
- **Real-time subscriptions** - Live updates

### Payments
- **Stripe** - Payment processing
- **Stripe Elements** - Secure payment forms
- **Webhooks** - Payment confirmations

### Infrastructure
- **Vercel** - Deployment platform
- **CDN** - Global content delivery
- **Edge Functions** - Serverless functions

## 🎯 Key Features Implementation

### Authentication
- Supabase Auth with social providers
- JWT token management
- Protected routes and API endpoints
- User profile management

### Property Search
- Full-text search with filters
- Geolocation-based results
- Advanced filtering (price, amenities, dates)
- Map integration with clustering

### Booking Engine
- Real-time availability checking
- Dynamic pricing calculations
- Multi-step booking process
- Payment processing with Stripe

### Admin Dashboard
- Property management
- Booking oversight
- User management
- Analytics and reporting

## 🔒 Security

- **Row Level Security** in Supabase
- **CSRF Protection** with tokens
- **XSS Prevention** with content sanitization
- **Secure Headers** configuration
- **Rate Limiting** on API endpoints
- **Input Validation** with Zod schemas

## 📊 Performance Optimizations

- **Image Optimization** with Next.js Image component
- **Bundle Splitting** and lazy loading
- **Edge Caching** with Vercel
- **Database Indexing** for fast queries
- **CDN Integration** for static assets
- **Web Vitals** optimization

## 🌐 SEO Features

- **Structured Data** (JSON-LD)
- **Open Graph** meta tags
- **Twitter Cards** integration
- **Sitemap** generation
- **Robots.txt** configuration
- **Canonical URLs**
- **Schema.org** markup

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository to Vercel**
2. **Set environment variables** in Vercel dashboard
3. **Deploy automatically** on git push

### Manual Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

### Environment Variables for Production

```env
# Production URLs
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
NEXTAUTH_URL=https://yourdomain.com
```

## 🧪 Testing

### Unit Tests
```bash
npm run test
```

### E2E Tests
```bash
npm run test:e2e
```

### Performance Testing
```bash
npm run lighthouse
```

## 📝 API Documentation

### Properties API
- `GET /api/properties` - List properties with filters
- `GET /api/properties/[id]` - Get property details
- `POST /api/properties` - Create new property (admin)

### Bookings API
- `POST /api/bookings` - Create new booking
- `GET /api/bookings` - Get user bookings
- `PATCH /api/bookings/[id]` - Update booking

### Payments API
- `POST /api/payments/create-intent` - Create payment intent
- `POST /api/payments/webhook` - Handle Stripe webhooks

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@wecallithomes.com or join our Discord community.

## 🚧 Roadmap

- [ ] Mobile app (React Native)
- [ ] Host dashboard
- [ ] Multi-language support
- [ ] AI-powered recommendations
- [ ] Virtual property tours
- [ ] Blockchain integration

---
**Built with ❤️ by the We Call It Homes team**
