import { useState } from 'react'
import { 
  MapPinIcon, 
  StarIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  HeartIcon
} from '@heroicons/react/24/outline'

const ExperiencesPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedPriceRange, setSelectedPriceRange] = useState('')

  // Mock data for experiences
  const experiences = [
    {
      id: 1,
      title: 'Traditional French Cooking Class',
      location: 'Paris, France',
      category: 'Food & Culture',
      rating: 4.9,
      reviews: 234,
      duration: '3 hours',
      price: 89,
      maxGroupSize: 8,
      verified: true,
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
      description: 'Learn to cook authentic French dishes in a historic Parisian kitchen with a local chef.'
    },
    {
      id: 2,
      title: 'Hidden Gems of Barcelona Walking Tour',
      location: 'Barcelona, Spain',
      category: 'Sightseeing',
      rating: 4.8,
      reviews: 189,
      duration: '2.5 hours',
      price: 45,
      maxGroupSize: 12,
      verified: true,
      image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=400&h=300&fit=crop',
      description: 'Discover the secret spots and local favorites that most tourists never see.'
    },
    {
      id: 3,
      title: 'Japanese Tea Ceremony Experience',
      location: 'Kyoto, Japan',
      category: 'Cultural',
      rating: 4.9,
      reviews: 156,
      duration: '1.5 hours',
      price: 65,
      maxGroupSize: 6,
      verified: true,
      image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop',
      description: 'Experience the ancient art of Japanese tea ceremony in a traditional tea house.'
    },
    {
      id: 4,
      title: 'Local Market & Street Food Tour',
      location: 'Bangkok, Thailand',
      category: 'Food & Culture',
      rating: 4.7,
      reviews: 298,
      duration: '4 hours',
      price: 35,
      maxGroupSize: 10,
      verified: true,
      image: 'https://images.unsplash.com/photo-1555992336-03a23c7b20ee?w=400&h=300&fit=crop',
      description: 'Explore vibrant local markets and taste authentic Thai street food with a local guide.'
    }
  ]

  const categories = ['All', 'Food & Culture', 'Sightseeing', 'Cultural', 'Adventure', 'Wellness']
  const priceRanges = ['All Prices', 'Under ₹50', '₹50-₹100', '₹100-₹200', '₹200+']

  const filteredExperiences = experiences.filter(experience => {
    const matchesSearch = experience.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         experience.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || selectedCategory === 'All' || experience.category === selectedCategory
    const matchesPrice = !selectedPriceRange || selectedPriceRange === 'All Prices' || 
                                                 (selectedPriceRange === 'Under ₹50' && experience.price < 50) ||
                         (selectedPriceRange === '₹50-₹100' && experience.price >= 50 && experience.price <= 100) ||
                         (selectedPriceRange === '₹100-₹200' && experience.price > 100 && experience.price <= 200) ||
                         (selectedPriceRange === '₹200+' && experience.price > 200)
    
    return matchesSearch && matchesCategory && matchesPrice
  })

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Local Experiences
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Immerse yourself in authentic local culture with carefully curated experiences. 
            All experiences are safety-verified and led by trusted local experts.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="card mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <input
                type="text"
                placeholder="Experience or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input-field"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
              <select
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
                className="input-field"
              >
                {priceRanges.map(range => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button className="btn-primary w-full">
                Search Experiences
              </button>
            </div>
          </div>
        </div>

        {/* Safety Features Banner */}
        <div className="bg-safety-50 border border-safety-200 rounded-lg p-6 mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <ShieldCheckIcon className="h-8 w-8 text-safety-600" />
            <h3 className="text-lg font-semibold text-safety-800">
              Safety First
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-safety-700">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-safety-500 rounded-full"></span>
              <span>Verified local experts</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-safety-500 rounded-full"></span>
              <span>Small group sizes</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-safety-500 rounded-full"></span>
              <span>Safety protocols in place</span>
            </div>
          </div>
        </div>

        {/* Experiences Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExperiences.map((experience) => (
            <div key={experience.id} className="card hover:shadow-lg transition-shadow duration-300">
              {/* Experience Image */}
              <div className="relative mb-4">
                <img
                  src={experience.image}
                  alt={experience.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute top-3 right-3">
                  <button className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow">
                    <HeartIcon className="h-5 w-5 text-gray-400 hover:text-red-500" />
                  </button>
                </div>
                {experience.verified && (
                  <div className="absolute top-3 left-3">
                    <div className="bg-primary-600 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                      <ShieldCheckIcon className="h-4 w-4" />
                      <span>Verified</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Experience Details */}
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg mb-1">
                    {experience.title}
                  </h3>
                  <div className="flex items-center space-x-1 text-sm text-gray-600 mb-2">
                    <MapPinIcon className="h-4 w-4" />
                    <span>{experience.location}</span>
                  </div>
                </div>

                {/* Rating and Reviews */}
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <StarIcon className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-900">{experience.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">({experience.reviews} reviews)</span>
                </div>

                {/* Category and Duration */}
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full">
                    {experience.category}
                  </span>
                  <div className="flex items-center space-x-1">
                    <ClockIcon className="h-4 w-4" />
                    <span>{experience.duration}</span>
                  </div>
                </div>

                {/* Group Size */}
                <div className="flex items-center space-x-1 text-sm text-gray-600">
                  <UserGroupIcon className="h-4 w-4" />
                  <span>Max {experience.maxGroupSize} people</span>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 line-clamp-2">
                  {experience.description}
                </p>

                {/* Price and Booking */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <div>
                                         <span className="text-2xl font-bold text-gray-900">₹{experience.price}</span>
                    <span className="text-sm text-gray-500"> per person</span>
                  </div>
                  <button className="btn-primary">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredExperiences.length === 0 && (
          <div className="text-center py-12">
            <MapPinIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No experiences found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or check back later.</p>
          </div>
        )}

        {/* Host an Experience CTA */}
        <div className="mt-12 text-center">
          <div className="card bg-primary-50 border-primary-200">
            <h3 className="text-2xl font-bold text-primary-900 mb-4">
              Host Your Own Experience
            </h3>
            <p className="text-primary-700 mb-6 max-w-2xl mx-auto">
              Share your local knowledge and culture with travelers while earning money. 
              All hosts are thoroughly vetted for safety and quality.
            </p>
            <button className="btn-primary">
              Become a Host
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExperiencesPage
