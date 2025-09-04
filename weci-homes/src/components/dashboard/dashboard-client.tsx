'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Calendar, 
  MapPin, 
  User, 
  Settings, 
  CreditCard, 
  Bell,
  Star,
  Search,
  Home,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatCurrency, formatDateRange } from '@/lib/utils'
import { Booking } from '@/types'
import Image from 'next/image'

// Mock data for demonstration
const mockBookings: Booking[] = [
  {
    id: '1',
    property_id: '1',
    user_id: '1',
    start_date: new Date('2024-03-15'),
    end_date: new Date('2024-03-20'),
    guest_count: 4,
    pricing: {
      base_price: 650,
      nights: 5,
      subtotal: 3250,
      cleaning_fee: 150,
      service_fee: 200,
      taxes: 250,
      total: 3850
    },
    status: 'confirmed',
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
    property: {
      id: '1',
      title: 'Luxury Beachfront Villa',
      description: 'Stunning oceanfront villa',
      location: {
        address: '123 Ocean Drive',
        city: 'Malibu',
        state: 'California',
        country: 'USA',
        zip_code: '90265'
      },
      images: [{
        id: '1',
        url: 'https://images.unsplash.com/photo-1502780402662-acc01917d7e6?w=500&q=80',
        alt: 'Luxury Beachfront Villa',
        is_primary: true,
        order: 1
      }],
      amenities: [],
      nightly_price: 650,
      cleaning_fee: 150,
      service_fee: 200,
      capacity: { guests: 8, bedrooms: 4, bathrooms: 3, beds: 4 },
      property_type: 'villa',
      host_id: '1',
      host: { id: '1', email: 'host@example.com', name: 'John Host', created_at: '', updated_at: '' },
      availability: [],
      rating: 4.9,
      review_count: 127,
      featured: true,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    },
    user: { id: '1', email: 'user@example.com', name: 'User', created_at: '', updated_at: '' }
  }
]

const mockUser = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80'
}

export function DashboardClient() {
  const [activeTab, setActiveTab] = useState<'bookings' | 'profile' | 'settings'>('bookings')
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>(mockBookings)
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    let filtered = mockBookings
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(booking => booking.status === statusFilter)
    }
    
    if (searchQuery) {
      filtered = filtered.filter(booking => 
        booking.property?.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        `${booking.property?.location.city}, ${booking.property?.location.state}`.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    setFilteredBookings(filtered)
  }, [statusFilter, searchQuery])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-4 w-4 text-emerald-500" />
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />
      case 'completed':
        return <Star className="h-4 w-4 text-blue-500" />
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200'
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200'
      case 'completed':
        return 'bg-blue-50 text-blue-700 border-blue-200'
      case 'cancelled':
        return 'bg-red-50 text-red-700 border-red-200'
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Home className="h-8 w-8 text-navy-600" />
              <h1 className="text-2xl font-serif font-bold text-gray-900">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <div className="flex items-center space-x-2">
                <Image
                  src={mockUser.avatar}
                  alt={mockUser.firstName}
                  width={32}
                  height={32}
                  className="rounded-full object-cover"
                />
                <span className="text-sm font-medium text-gray-700">
                  {mockUser.firstName}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <nav className="p-4 space-y-2">
                <button
                  onClick={() => setActiveTab('bookings')}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === 'bookings'
                      ? 'bg-navy-50 text-navy-700 border border-navy-200'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Calendar className="h-4 w-4 mr-3" />
                  My Bookings
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === 'profile'
                      ? 'bg-navy-50 text-navy-700 border border-navy-200'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <User className="h-4 w-4 mr-3" />
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === 'settings'
                      ? 'bg-navy-50 text-navy-700 border border-navy-200'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Settings className="h-4 w-4 mr-3" />
                  Settings
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'bookings' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Bookings Header */}
                <div className="mb-8">
                  <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">
                    My Bookings
                  </h2>
                  <p className="text-gray-600">
                    Manage your reservations and travel plans
                  </p>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search properties..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div className="sm:w-48">
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                      >
                        <option value="all">All Bookings</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Bookings List */}
                <div className="space-y-4">
                  {filteredBookings.map((booking) => (
                    <motion.div
                      key={booking.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="p-6">
                        <div className="flex gap-6">
                          {/* Property Image */}
                          <div className="w-24 h-24 flex-shrink-0">
                            <Image
                              src={booking.property?.images[0]?.url || ''}
                              alt={booking.property?.title || ''}
                              width={96}
                              height={96}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>

                          {/* Booking Details */}
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                  {booking.property?.title}
                                </h3>
                                <div className="flex items-center text-gray-600 text-sm mb-2">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  {booking.property?.location.city}, {booking.property?.location.state}
                                </div>
                                <div className="flex items-center text-gray-600 text-sm">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  {formatDateRange(booking.start_date, booking.end_date)}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                                  {getStatusIcon(booking.status)}
                                  <span className="ml-1 capitalize">{booking.status}</span>
                                </div>
                                <div className="mt-2 text-lg font-bold text-gray-900">
                                  {formatCurrency(booking.pricing.total)}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="text-sm text-gray-600">
                                {booking.guest_count} {booking.guest_count === 1 ? 'guest' : 'guests'}
                              </div>
                              <div className="flex items-center space-x-3">
                                <Button variant="outline" size="sm">
                                  View Details
                                </Button>
                                {booking.status === 'confirmed' && (
                                  <Button size="sm">
                                    Manage Booking
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {filteredBookings.length === 0 && (
                  <div className="text-center py-12">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No bookings found
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {searchQuery || statusFilter !== 'all' 
                        ? 'Try adjusting your filters'
                        : 'Start planning your next getaway'}
                    </p>
                    <Button>
                      Browse Properties
                    </Button>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'profile' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="mb-8">
                  <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">
                    Profile
                  </h2>
                  <p className="text-gray-600">
                    Manage your account information
                  </p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center space-x-6 mb-8">
                    <Image
                      src={mockUser.avatar}
                      alt={mockUser.firstName}
                      width={80}
                      height={80}
                      className="rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {mockUser.firstName} {mockUser.lastName}
                      </h3>
                      <p className="text-gray-600">{mockUser.email}</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Change Photo
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        defaultValue={mockUser.firstName}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        defaultValue={mockUser.lastName}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        defaultValue={mockUser.email}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <Button>
                      Save Changes
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="mb-8">
                  <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">
                    Settings
                  </h2>
                  <p className="text-gray-600">
                    Manage your preferences and account settings
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Notifications */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Notifications
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">Email Notifications</h4>
                          <p className="text-sm text-gray-600">Receive booking confirmations and updates</p>
                        </div>
                        <input type="checkbox" defaultChecked className="h-4 w-4 text-navy-600" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">SMS Notifications</h4>
                          <p className="text-sm text-gray-600">Get urgent updates via text message</p>
                        </div>
                        <input type="checkbox" className="h-4 w-4 text-navy-600" />
                      </div>
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Payment Methods
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <CreditCard className="h-5 w-5 text-gray-400" />
                          <div>
                            <h4 className="font-medium text-gray-900">**** **** **** 4242</h4>
                            <p className="text-sm text-gray-600">Expires 12/26</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                      <Button variant="outline" className="w-full">
                        Add Payment Method
                      </Button>
                    </div>
                  </div>

                  {/* Account Actions */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Account
                    </h3>
                    <div className="space-y-4">
                      <Button variant="outline" className="w-full justify-start">
                        Change Password
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        Download My Data
                      </Button>
                      <Button variant="outline" className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50">
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}