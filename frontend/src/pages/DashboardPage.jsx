import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  UserIcon, 
  MapPinIcon, 
  CalendarIcon, 
  ShieldCheckIcon,
  PhoneIcon,
  ExclamationTriangleIcon,
  SparklesIcon,
  CpuChipIcon,
  GlobeAltIcon,
  ChartBarIcon,
  BellIcon,
  CogIcon,
  PlusIcon,
  ArrowRightIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

const DashboardPage = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [user, setUser] = useState(null)
  const [notifications, setNotifications] = useState([])

  // Check authentication on component mount
  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    
    if (!token || !userData) {
      navigate('/login')
      return
    }
    
    setUser(JSON.parse(userData))
    
    // Demo notifications
    setNotifications([
      {
        id: 1,
        type: 'safety',
        message: 'Safety check completed for your upcoming trip',
        time: '2 hours ago',
        read: false
      },
      {
        id: 2,
        type: 'companion',
        message: 'New travel companion request from Sarah',
        time: '1 day ago',
        read: false
      },
      {
        id: 3,
        type: 'trip',
        message: 'Your trip to Tokyo has been confirmed',
        time: '2 days ago',
        read: true
      }
    ])
  }, [navigate])

  const tabs = [
    { id: 'overview', name: 'Overview', icon: ChartBarIcon },
    { id: 'trips', name: 'My Trips', icon: CalendarIcon },
    { id: 'companions', name: 'Companions', icon: UserIcon },
    { id: 'safety', name: 'Safety', icon: ShieldCheckIcon }
  ]

  const quickStats = [
    {
      title: 'Active Trips',
      value: '3',
      change: '+2',
      changeType: 'positive',
      icon: MapPinIcon,
      color: 'from-primary-500 to-primary-600'
    },
    {
      title: 'Safety Score',
      value: '95%',
      change: '+5%',
      changeType: 'positive',
      icon: ShieldCheckIcon,
      color: 'from-safety-500 to-safety-600'
    },
    {
      title: 'Companions',
      value: '7',
      change: '+1',
      changeType: 'positive',
      icon: UserIcon,
      color: 'from-accent-500 to-accent-600'
    },
    {
      title: 'Experiences',
      value: '12',
      change: '+3',
      changeType: 'positive',
      icon: GlobeAltIcon,
      color: 'from-cyber-500 to-cyber-600'
    }
  ]

  const recentTrips = [
    {
      id: 1,
      destination: 'Tokyo, Japan',
      date: 'Dec 15-22, 2024',
      status: 'confirmed',
      companion: 'Sarah Johnson',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=200&fit=crop'
    },
    {
      id: 2,
      destination: 'Paris, France',
      date: 'Jan 10-17, 2025',
      status: 'planning',
      companion: 'Miguel Rodriguez',
      image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400&h=200&fit=crop'
    }
  ]

  const safetyMetrics = [
    { name: 'Emergency Contacts', status: 'complete', icon: CheckCircleIcon },
    { name: 'Location Sharing', status: 'active', icon: CheckCircleIcon },
    { name: 'Safety Preferences', status: 'needs-update', icon: ExclamationTriangleIcon },
    { name: 'Insurance Coverage', status: 'active', icon: CheckCircleIcon },
    { name: 'Travel Alerts', status: 'active', icon: CheckCircleIcon },
    { name: 'Emergency Response', status: 'active', icon: CheckCircleIcon }
  ]

  return (
    <div className="min-h-screen relative overflow-hidden hero-pattern pt-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-cyber-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-3">
                Welcome Back, {user?.firstName || 'Traveler'}!
              </h1>
              <p className="text-xl text-cyber-300">
                Your travel safety command center is ready
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-3 bg-cyber-800/50 backdrop-blur-sm border border-cyber-700/50 rounded-xl hover:border-cyber-600/50 transition-all duration-300">
                <BellIcon className="h-6 w-6 text-cyber-300" />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-safety-500 rounded-full text-xs text-white flex items-center justify-center">
                    {notifications.filter(n => !n.read).length}
                  </span>
                )}
              </button>
              <button className="p-3 bg-cyber-800/50 backdrop-blur-sm border border-cyber-700/50 rounded-xl hover:border-cyber-600/50 transition-all duration-300">
                <CogIcon className="h-6 w-6 text-cyber-300" />
              </button>
            </div>
          </div>
        </div>

        {/* Safety Alert Banner */}
        <div className="card-glass border-l-4 border-l-safety-500 mb-8 animate-slide-up">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-safety-500 to-safety-600 rounded-xl flex items-center justify-center">
              <ExclamationTriangleIcon className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-cyber-100 mb-1">
                Safety Check Required
              </h3>
              <p className="text-cyber-300">
                Please verify your emergency contacts and safety preferences for optimal protection
              </p>
            </div>
            <button className="btn-safety group">
              <span className="flex items-center space-x-2">
                <span>Update Now</span>
                <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <div 
              key={stat.title}
              className="card-glass group hover:scale-105 transition-all duration-500 animate-slide-up"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                  stat.changeType === 'positive' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-cyber-100 mb-1">{stat.value}</h3>
              <p className="text-cyber-400 text-sm">{stat.title}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card-glass text-center group hover:scale-105 transition-all duration-500">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <MapPinIcon className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-cyber-100 mb-3">Plan New Trip</h3>
            <p className="text-cyber-300 mb-6">Create a personalized itinerary with AI-powered safety features</p>
            <button className="btn-primary w-full group">
              <span className="flex items-center justify-center space-x-2">
                <PlusIcon className="h-5 w-5" />
                <span>Start Planning</span>
              </span>
            </button>
          </div>
          
          <div className="card-glass text-center group hover:scale-105 transition-all duration-500">
            <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <UserIcon className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-cyber-100 mb-3">Find Companion</h3>
            <p className="text-cyber-300 mb-6">Connect with verified travel companions worldwide</p>
            <button className="btn-accent w-full group">
              <span className="flex items-center justify-center space-x-2">
                <SparklesIcon className="h-5 w-5" />
                <span>Browse Companions</span>
              </span>
            </button>
          </div>
          
          <div className="card-glass text-center group hover:scale-105 transition-all duration-500">
            <div className="w-16 h-16 bg-gradient-to-br from-safety-500 to-safety-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <ShieldCheckIcon className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-cyber-100 mb-3">Safety Check</h3>
            <p className="text-cyber-300 mb-6">Review your safety settings and emergency protocols</p>
            <button className="btn-safety w-full group">
              <span className="flex items-center justify-center space-x-2">
                <ShieldCheckIcon className="h-5 w-5" />
                <span>Safety Settings</span>
              </span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-cyber-700/50 mb-8">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 px-4 border-b-2 font-medium text-sm transition-all duration-300 flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-400'
                    : 'border-transparent text-cyber-400 hover:text-cyber-300 hover:border-cyber-600/50'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="space-y-8 animate-fade-in">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Trips */}
              <div className="card-glass">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-cyber-100">Recent Trips</h3>
                  <button className="text-primary-400 hover:text-primary-300 text-sm font-medium">
                    View All
                  </button>
                </div>
                <div className="space-y-4">
                  {recentTrips.map((trip) => (
                    <div key={trip.id} className="flex items-center space-x-4 p-4 bg-cyber-800/30 rounded-xl border border-cyber-700/50 hover:border-cyber-600/50 transition-all duration-300">
                      <img src={trip.image} alt={trip.destination} className="w-16 h-16 rounded-lg object-cover" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-cyber-100">{trip.destination}</h4>
                        <p className="text-sm text-cyber-400">{trip.date}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            trip.status === 'confirmed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {trip.status}
                          </span>
                          <span className="text-xs text-cyber-500">with {trip.companion}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Safety Status */}
              <div className="card-glass">
                <h3 className="text-xl font-bold text-cyber-100 mb-6">Safety Status</h3>
                <div className="space-y-4">
                  {safetyMetrics.map((metric) => (
                    <div key={metric.name} className="flex items-center justify-between p-3 bg-cyber-800/30 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <metric.icon className={`h-5 w-5 ${
                          metric.status === 'complete' || metric.status === 'active' 
                            ? 'text-green-400' 
                            : 'text-yellow-400'
                        }`} />
                        <span className="text-cyber-200">{metric.name}</span>
                      </div>
                      <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                        metric.status === 'complete' || metric.status === 'active'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {metric.status === 'complete' ? 'Complete' : 
                         metric.status === 'active' ? 'Active' : 'Needs Update'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'trips' && (
            <div className="card-glass">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-cyber-100">My Trips</h3>
                <button className="btn-primary group">
                  <span className="flex items-center space-x-2">
                    <PlusIcon className="h-5 w-5" />
                    <span>Plan New Trip</span>
                  </span>
                </button>
              </div>
              {recentTrips.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {recentTrips.map((trip) => (
                    <div key={trip.id} className="bg-cyber-800/30 rounded-xl border border-cyber-700/50 overflow-hidden hover:border-cyber-600/50 transition-all duration-300">
                      <img src={trip.image} alt={trip.destination} className="w-full h-32 object-cover" />
                      <div className="p-4">
                        <h4 className="text-lg font-semibold text-cyber-100 mb-2">{trip.destination}</h4>
                        <p className="text-cyber-400 mb-3">{trip.date}</p>
                        <div className="flex items-center justify-between">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            trip.status === 'confirmed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {trip.status}
                          </span>
                          <button className="text-primary-400 hover:text-primary-300 text-sm font-medium">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <CalendarIcon className="h-16 w-16 mx-auto mb-4 text-cyber-500" />
                  <h3 className="text-lg font-semibold text-cyber-200 mb-2">No trips planned yet</h3>
                  <p className="text-cyber-400 mb-6">Start planning your first safe journey with AI-powered recommendations</p>
                  <button className="btn-primary group">
                    <span className="flex items-center space-x-2">
                      <PlusIcon className="h-5 w-5" />
                      <span>Plan Your First Trip</span>
                    </span>
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'companions' && (
            <div className="card-glass">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-cyber-100">My Companions</h3>
                <button className="btn-accent group">
                  <span className="flex items-center space-x-2">
                    <SparklesIcon className="h-5 w-5" />
                    <span>Find New Companions</span>
                  </span>
                </button>
              </div>
              <div className="text-center py-12">
                <UserIcon className="h-16 w-16 mx-auto mb-4 text-cyber-500" />
                <h3 className="text-lg font-semibold text-cyber-200 mb-2">No companions assigned yet</h3>
                <p className="text-cyber-400 mb-6">Connect with verified travel companions for enhanced safety and local expertise</p>
                <button className="btn-accent group">
                  <span className="flex items-center space-x-2">
                    <SparklesIcon className="h-5 w-5" />
                    <span>Browse Companions</span>
                  </span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'safety' && (
            <div className="space-y-6">
              <div className="card-glass">
                <h3 className="text-xl font-bold text-cyber-100 mb-6">Emergency Contacts</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-cyber-200 mb-2">Primary Contact</label>
                    <input type="text" className="input-field" placeholder="Name" />
                    <input type="tel" className="input-field mt-3" placeholder="Phone" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-cyber-200 mb-2">Secondary Contact</label>
                    <input type="text" className="input-field" placeholder="Name" />
                    <input type="tel" className="input-field mt-3" placeholder="Phone" />
                  </div>
                </div>
                <button className="btn-primary mt-6 group">
                  <span className="flex items-center space-x-2">
                    <CheckCircleIcon className="h-5 w-5" />
                    <span>Save Contacts</span>
                  </span>
                </button>
              </div>

              <div className="card-glass">
                <h3 className="text-xl font-bold text-cyber-100 mb-6">Safety Preferences</h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-cyber-800/30 rounded-xl">
                    <div>
                      <span className="text-cyber-200 font-medium">Location Sharing</span>
                      <p className="text-sm text-cyber-400">Share your location with emergency contacts</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-cyber-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-500/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-cyber-800/30 rounded-xl">
                    <div>
                      <span className="text-cyber-200 font-medium">Emergency Alerts</span>
                      <p className="text-sm text-cyber-400">Receive real-time safety notifications</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-cyber-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-500/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Floating SOS Button */}
        <div className="fixed bottom-8 right-8 z-50">
          <button className="btn-safety rounded-full p-5 shadow-2xl hover:shadow-glow transition-all duration-300 group hover:scale-110">
            <PhoneIcon className="h-7 w-7 group-hover:animate-pulse" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
