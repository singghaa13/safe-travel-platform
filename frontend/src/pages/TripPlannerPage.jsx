import { useState } from 'react'
import { 
  MapPinIcon, 
  CalendarIcon, 
  CurrencyDollarIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  SparklesIcon,
  RocketLaunchIcon,
  CpuChipIcon,
  GlobeAltIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

const TripPlannerPage = () => {
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    budget: '',
    travelers: 1,
    tripType: 'leisure',
    safetyLevel: 'high',
    specialNeeds: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    console.log(`Input changed: ${name} = ${value}`)
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Set minimum date to today
  const today = new Date().toISOString().split('T')[0]
  const maxDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Implement trip planning logic
    console.log('Trip planning data:', formData)
  }

  const safetyFeatures = [
    { icon: ShieldCheckIcon, title: 'Verified Local Companions', description: 'AI-verified local guides' },
    { icon: CpuChipIcon, title: '24/7 AI Support', description: 'Real-time assistance' },
    { icon: GlobeAltIcon, title: 'Location Tracking', description: 'GPS safety monitoring' },
    { icon: CheckCircleIcon, title: 'Safety-Rated Accommodations', description: 'Vetted hotels & stays' }
  ]

  return (
    <div className="min-h-screen relative overflow-hidden hero-pattern pt-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-cyber-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center space-x-2 bg-cyber-800/50 backdrop-blur-sm border border-cyber-700/50 rounded-full px-6 py-3 mb-6">
            <RocketLaunchIcon className="h-5 w-5 text-primary-400" />
            <span className="text-cyber-200 text-sm font-medium">AI-Powered Trip Planning</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="text-gradient">Plan Your Safe</span>
            <br />
            <span className="text-cyber-100">Journey</span>
          </h1>
          <p className="text-xl text-cyber-300 max-w-3xl mx-auto leading-relaxed">
            Tell us about your dream trip and our AI will create a personalized, 
            safety-focused itinerary with verified companions and real-time protection.
          </p>
        </div>

        {/* Trip Planning Form */}
        <div className="card-glass animate-slide-up">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Destination */}
            <div>
              <label className="block text-sm font-medium text-cyber-200 mb-3">
                Where do you want to go?
              </label>
              <div className="relative">
                <MapPinIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-cyber-500" />
                <input
                  type="text"
                  name="destination"
                  value={formData.destination}
                  onChange={handleInputChange}
                  placeholder="Enter destination (city, country)"
                  className="input-field pl-12"
                  required
                />
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-cyber-200 mb-3">
                  Start Date
                </label>
                <div className="relative">
                  <CalendarIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-cyber-500" />
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    min={today}
                    max={maxDate}
                    className="input-field pl-12 cursor-pointer"
                    required
                  />
                </div>
                {formData.startDate && (
                  <p className="text-sm text-cyber-400 mt-2">Selected: {formData.startDate}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-cyber-200 mb-3">
                  End Date
                </label>
                <div className="relative">
                  <CalendarIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-cyber-500" />
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    min={formData.startDate || today}
                    max={maxDate}
                    className="input-field pl-12 cursor-pointer"
                    required
                    disabled={!formData.startDate}
                  />
                </div>
                {formData.endDate && (
                  <p className="text-sm text-cyber-400 mt-2">Selected: {formData.endDate}</p>
                )}
              </div>
            </div>

            {/* Budget and Travelers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-cyber-200 mb-3">
                  Budget Range
                </label>
                <div className="relative">
                  <CurrencyDollarIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-cyber-500" />
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="input-field pl-12"
                    required
                  >
                    <option value="">Select budget range</option>
                    <option value="budget">Budget (₹500 - ₹1,500)</option>
                    <option value="moderate">Moderate (₹1,500 - ₹3,000)</option>
                    <option value="luxury">Luxury (₹3,000+)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-cyber-200 mb-3">
                  Number of Travelers
                </label>
                <div className="relative">
                  <UserGroupIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-cyber-500" />
                  <input
                    type="number"
                    name="travelers"
                    value={formData.travelers}
                    onChange={handleInputChange}
                    min="1"
                    max="10"
                    className="input-field pl-12"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Trip Type and Safety Level */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-cyber-200 mb-3">
                  Trip Type
                </label>
                <select
                  name="tripType"
                  value={formData.tripType}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                >
                  <option value="leisure">Leisure/Vacation</option>
                  <option value="business">Business</option>
                  <option value="adventure">Adventure</option>
                  <option value="cultural">Cultural/Educational</option>
                  <option value="family">Family Trip</option>
                  <option value="solo">Solo Travel</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-cyber-200 mb-3">
                  Safety Priority Level
                </label>
                <select
                  name="safetyLevel"
                  value={formData.safetyLevel}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                >
                  <option value="high">High Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="standard">Standard</option>
                </select>
              </div>
            </div>

            {/* Special Needs */}
            <div>
              <label className="block text-sm font-medium text-cyber-200 mb-3">
                Special Requirements or Safety Concerns
              </label>
              <textarea
                name="specialNeeds"
                value={formData.specialNeeds}
                onChange={handleInputChange}
                placeholder="Any special needs, accessibility requirements, or safety concerns..."
                rows="4"
                className="input-field"
              />
            </div>

            {/* Safety Features Highlight */}
            <div className="bg-cyber-800/30 backdrop-blur-sm border border-cyber-700/50 rounded-2xl p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-safety-500 to-safety-600 rounded-xl flex items-center justify-center">
                  <ShieldCheckIcon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-cyber-100">
                  AI-Powered Safety Features Included
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {safetyFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3 p-4 bg-cyber-800/20 rounded-xl border border-cyber-700/30">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                      <feature.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-cyber-100 text-sm">{feature.title}</h4>
                      <p className="text-cyber-400 text-xs">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="btn-primary text-lg px-12 py-4 group"
              >
                <span className="flex items-center justify-center space-x-3">
                  <SparklesIcon className="h-6 w-6" />
                  <span>Plan My Safe Journey</span>
                  <RocketLaunchIcon className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
            </div>
          </form>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-cyber-300 mb-6 text-lg">
            Need immediate assistance? Our AI safety team is available 24/7
          </p>
          <button className="btn-safety group">
            <span className="flex items-center space-x-2">
              <ShieldCheckIcon className="h-5 w-5" />
              <span>Emergency SOS</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default TripPlannerPage
