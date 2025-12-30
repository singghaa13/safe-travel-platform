import { useState } from 'react'
import { 
  UserIcon, 
  MapPinIcon, 
  StarIcon,
  ShieldCheckIcon,
  PhoneIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline'

const CompanionsPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('')

  // Mock data for companions
  const companions = [
    {
      id: 1,
      name: 'Sarah Johnson',
      location: 'Paris, France',
      languages: ['English', 'French'],
      rating: 4.9,
      reviews: 127,
      verified: true,
      specialties: ['Cultural Tours', 'Food Tours', 'Museums'],
      hourlyRate: 25,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'Miguel Rodriguez',
      location: 'Barcelona, Spain',
      languages: ['English', 'Spanish', 'Catalan'],
      rating: 4.8,
      reviews: 89,
      verified: true,
      specialties: ['Architecture', 'History', 'Local Markets'],
      hourlyRate: 22,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 3,
      name: 'Yuki Tanaka',
      location: 'Tokyo, Japan',
      languages: ['English', 'Japanese'],
      rating: 4.9,
      reviews: 156,
      verified: true,
      specialties: ['Temples', 'Gardens', 'Tea Ceremonies'],
      hourlyRate: 30,
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face'
    }
  ]

  const filteredCompanions = companions.filter(companion => {
    const matchesSearch = companion.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         companion.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLocation = !selectedLocation || companion.location.includes(selectedLocation)
    const matchesLanguage = !selectedLanguage || companion.languages.includes(selectedLanguage)
    
    return matchesSearch && matchesLocation && matchesLanguage
  })

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Your Perfect Travel Companion
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with verified, experienced local guides who prioritize your safety and comfort. 
            All companions undergo thorough background checks and safety verification.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="card mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <input
                type="text"
                placeholder="Name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="input-field"
              >
                <option value="">All Locations</option>
                <option value="Paris">Paris</option>
                <option value="Barcelona">Barcelona</option>
                <option value="Tokyo">Tokyo</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="input-field"
              >
                <option value="">All Languages</option>
                <option value="English">English</option>
                <option value="French">French</option>
                <option value="Spanish">Spanish</option>
                <option value="Japanese">Japanese</option>
              </select>
            </div>
            <div className="flex items-end">
              <button className="btn-primary w-full">
                Search Companions
              </button>
            </div>
          </div>
        </div>

        {/* Safety Features Banner */}
        <div className="bg-safety-50 border border-safety-200 rounded-lg p-6 mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <ShieldCheckIcon className="h-8 w-8 text-safety-600" />
            <h3 className="text-lg font-semibold text-safety-800">
              Safety Guaranteed
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-safety-700">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-safety-500 rounded-full"></span>
              <span>Background verified companions</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-safety-500 rounded-full"></span>
              <span>24/7 emergency support</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-safety-500 rounded-full"></span>
              <span>Real-time location tracking</span>
            </div>
          </div>
        </div>

        {/* Companions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanions.map((companion) => (
            <div key={companion.id} className="card hover:shadow-lg transition-shadow duration-300">
              {/* Companion Header */}
              <div className="flex items-start space-x-4 mb-4">
                <img
                  src={companion.image}
                  alt={companion.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-gray-900">{companion.name}</h3>
                    {companion.verified && (
                      <ShieldCheckIcon className="h-5 w-5 text-primary-600" title="Verified" />
                    )}
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-600 mb-1">
                    <MapPinIcon className="h-4 w-4" />
                    <span>{companion.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <StarIcon className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm font-medium text-gray-900">{companion.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">({companion.reviews} reviews)</span>
                  </div>
                </div>
              </div>

              {/* Languages */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Languages</h4>
                <div className="flex flex-wrap gap-2">
                  {companion.languages.map((language) => (
                    <span
                      key={language}
                      className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full"
                    >
                      {language}
                    </span>
                  ))}
                </div>
              </div>

              {/* Specialties */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Specialties</h4>
                <div className="flex flex-wrap gap-2">
                  {companion.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Rate and Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div>
                  <span className="text-lg font-bold text-gray-900">₹{companion.hourlyRate}</span>
                  <span className="text-sm text-gray-500">/hour</span>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-400 hover:text-primary-600 transition-colors">
                    <EnvelopeIcon className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-primary-600 transition-colors">
                    <PhoneIcon className="h-5 w-5" />
                  </button>
                  <button className="btn-primary text-sm px-4 py-2">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredCompanions.length === 0 && (
          <div className="text-center py-12">
            <UserIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No companions found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or check back later.</p>
          </div>
        )}

        {/* Become a Companion CTA */}
        <div className="mt-12 text-center">
          <div className="card bg-primary-50 border-primary-200">
            <h3 className="text-2xl font-bold text-primary-900 mb-4">
              Become a Travel Companion
            </h3>
            <p className="text-primary-700 mb-6 max-w-2xl mx-auto">
              Share your local knowledge, help travelers feel safe, and earn money while doing what you love.
            </p>
            <button className="btn-primary">
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanionsPage
