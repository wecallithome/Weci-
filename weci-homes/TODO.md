# Development Setup TODOs

## Required for Production

### 1. Supabase Configuration
- [ ] Create a Supabase project at https://supabase.com
- [ ] Update `NEXT_PUBLIC_SUPABASE_URL` in `.env.local` with your project URL
- [ ] Update `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local` with your anon public key
- [ ] Update `SUPABASE_SERVICE_ROLE_KEY` in `.env.local` with your service role key
- [ ] Run the database migrations in `supabase/migrations/`
- [ ] Seed the database with sample data using `supabase/seed.sql`

### 2. Stripe Configuration
- [ ] Create a Stripe account at https://stripe.com
- [ ] Update `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` with your publishable key
- [ ] Update `STRIPE_SECRET_KEY` with your secret key
- [ ] Update `STRIPE_WEBHOOK_SECRET` with your webhook endpoint secret
- [ ] Configure webhook endpoints in Stripe dashboard

### 3. Environment Variables
- [ ] Generate a secure `NEXTAUTH_SECRET` for production
- [ ] Update `NEXT_PUBLIC_APP_URL` with your production domain
- [ ] Set up `RESEND_API_KEY` for email functionality (optional)

### 4. Deployment
- [ ] Deploy to Vercel
- [ ] Configure environment variables in Vercel dashboard
- [ ] Set up custom domain (optional)

## Current Status
✅ **Application configured for development mode**
- Using mock Supabase credentials to prevent errors
- Running on port 3003 as requested
- All dependencies installed and configured

## Notes
- The application will run in development mode with mocked backend services
- Database operations will fail gracefully until real Supabase is configured
- Payment processing will fail until real Stripe keys are configured
- This allows frontend development and testing without backend setup