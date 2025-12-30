import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { EyeIcon, EyeSlashIcon, ShieldCheckIcon, SparklesIcon, CpuChipIcon, CommandLineIcon, UserIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline'
import axios from 'axios'

const RegisterPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    userType: 'traveler',
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelationship: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    
    // Validate password length
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long')
      return
    }
    
    setIsLoading(true)
    
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        userType: formData.userType,
        emergencyContacts: {
          primary: {
            name: formData.emergencyContactName || undefined,
            phone: formData.emergencyContactPhone || undefined,
            relationship: formData.emergencyContactRelationship || undefined
          }
        }
      })
      
      console.log('Registration successful:', response.data)
      alert('Registration successful! Please log in.')
      navigate('/login')
    } catch (err) {
      console.error('Registration error:', err)
      
      // If full API fails, try demo endpoint
      try {
        console.log('Trying demo registration endpoint...')
        const demoResponse = await axios.post('http://localhost:5000/api/demo/register', {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          userType: formData.userType,
          emergencyContacts: {
            primary: {
              name: formData.emergencyContactName || undefined,
              phone: formData.emergencyContactPhone || undefined,
              relationship: formData.emergencyContactRelationship || undefined
            }
          }
        })
        
        if (demoResponse.data.success) {
          console.log('Demo registration successful:', demoResponse.data)
          alert('Demo registration successful! Please log in.')
          navigate('/login')
        } else {
          setError('Demo registration failed')
        }
      } catch (demoErr) {
        console.error('Demo registration error:', demoErr)
        setError(err.response?.data?.message || 'Registration failed. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden hero-pattern flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-cyber-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-6">
          <div className="relative group">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <ShieldCheckIcon className="h-8 w-8 text-white" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
        
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gradient mb-3">
            Join the Future
          </h2>
          <p className="text-cyber-300 text-lg">
            Create your secure travel account
          </p>
          <p className="mt-2 text-sm text-cyber-400">
            Or{' '}
            <Link to="/login" className="font-medium text-primary-400 hover:text-primary-300 transition-colors duration-300">
              sign in to your existing account
            </Link>
          </p>
        </div>
      </div>

      <div className="relative z-10 mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="card-glass">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-safety-500/10 border border-safety-500/30 text-safety-400 px-4 py-3 rounded-xl backdrop-blur-sm">
                {error}
              </div>
            )}
            
            {/* Name fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-cyber-200 mb-2">
                  First name
                </label>
                <div className="relative">
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="input-field"
                    placeholder="First name"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <UserIcon className="h-5 w-5 text-cyber-500" />
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-cyber-200 mb-2">
                  Last name
                </label>
                <div className="relative">
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="input-field"
                    placeholder="Last name"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <UserIcon className="h-5 w-5 text-cyber-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-cyber-200 mb-2">
                Email address
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input-field"
                  placeholder="Enter your email"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <EnvelopeIcon className="h-5 w-5 text-cyber-500" />
                </div>
              </div>
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-cyber-200 mb-2">
                Phone number
              </label>
              <div className="relative">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="input-field"
                  placeholder="Enter your phone number"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <PhoneIcon className="h-5 w-5 text-cyber-500" />
                </div>
              </div>
            </div>

            {/* User Type */}
            <div>
              <label htmlFor="userType" className="block text-sm font-medium text-cyber-200 mb-2">
                I am a
              </label>
              <select
                id="userType"
                name="userType"
                value={formData.userType}
                onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
                className="input-field"
              >
                <option value="traveler">Traveler</option>
                <option value="companion">Travel Companion</option>
                <option value="local">Local Experience Provider</option>
              </select>
            </div>

            {/* Emergency Contact Information */}
            <div className="border-t border-cyber-700/50 pt-6">
              <h3 className="text-lg font-medium text-cyber-100 mb-4 flex items-center space-x-2">
                <ShieldCheckIcon className="h-5 w-5 text-safety-400" />
                <span>Emergency Contact (Optional)</span>
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label htmlFor="emergencyContactName" className="block text-sm font-medium text-cyber-200 mb-2">
                    Emergency Contact Name
                  </label>
                  <input
                    id="emergencyContactName"
                    name="emergencyContactName"
                    type="text"
                    value={formData.emergencyContactName}
                    onChange={(e) => setFormData({ ...formData, emergencyContactName: e.target.value })}
                    className="input-field"
                    placeholder="Emergency contact name"
                  />
                </div>
                <div>
                  <label htmlFor="emergencyContactPhone" className="block text-sm font-medium text-cyber-200 mb-2">
                    Emergency Contact Phone
                  </label>
                  <input
                    id="emergencyContactPhone"
                    name="emergencyContactPhone"
                    type="tel"
                    value={formData.emergencyContactPhone}
                    onChange={(e) => setFormData({ ...formData, emergencyContactPhone: e.target.value })}
                    className="input-field"
                    placeholder="Emergency contact phone"
                  />
                </div>
                <div>
                  <label htmlFor="emergencyContactRelationship" className="block text-sm font-medium text-cyber-200 mb-2">
                    Relationship
                  </label>
                  <input
                    id="emergencyContactRelationship"
                    name="emergencyContactRelationship"
                    type="text"
                    value={formData.emergencyContactRelationship}
                    onChange={(e) => setFormData({ ...formData, emergencyContactRelationship: e.target.value })}
                    className="input-field"
                    placeholder="e.g., Spouse, Parent, Friend"
                  />
                </div>
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-cyber-200 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="input-field pr-10"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-cyber-400 hover:text-primary-400 transition-colors duration-300"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-cyber-200 mb-2">
                Confirm password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="input-field pr-10"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-cyber-400 hover:text-primary-400 transition-colors duration-300"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start space-x-3">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-primary-500 focus:ring-primary-400 border-cyber-600 rounded bg-cyber-800/50 mt-1"
              />
              <label htmlFor="terms" className="block text-sm text-cyber-300 leading-relaxed">
                I agree to the{' '}
                <Link to="/terms" className="text-primary-400 hover:text-primary-300 transition-colors duration-300">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-primary-400 hover:text-primary-300 transition-colors duration-300">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-accent group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="flex items-center justify-center space-x-2">
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Creating account...</span>
                    </>
                  ) : (
                    <>
                      <SparklesIcon className="h-5 w-5" />
                      <span>Create account</span>
                    </>
                  )}
                </span>
              </button>
            </div>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-cyber-700/50" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-cyber-800/50 text-cyber-400 font-mono">Coming Soon</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button disabled className="w-full inline-flex justify-center py-3 px-4 border border-cyber-700/50 rounded-xl shadow-sm bg-cyber-800/30 text-sm font-medium text-cyber-400 cursor-not-allowed backdrop-blur-sm">
                <div className="w-5 h-5 bg-gradient-to-br from-red-500 to-red-600 rounded mr-2"></div>
                Google
              </button>
              <button disabled className="w-full inline-flex justify-center py-3 px-4 border border-cyber-700/50 rounded-xl shadow-sm bg-cyber-800/30 text-sm font-medium text-cyber-400 cursor-not-allowed backdrop-blur-sm">
                <div className="w-5 h-5 bg-gradient-to-br from-blue-500 to-blue-600 rounded mr-2"></div>
                Facebook
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Technology Features */}
      <div className="relative z-10 mt-12 sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-cyber-200 mb-4">Secure & Advanced Technology</h3>
          <div className="flex justify-center space-x-8">
            <div className="flex items-center space-x-2 text-cyber-400">
              <CpuChipIcon className="h-5 w-5 text-primary-400" />
              <span className="text-sm font-mono">AI Security</span>
            </div>
            <div className="flex items-center space-x-2 text-cyber-400">
              <CommandLineIcon className="h-5 w-5 text-accent-400" />
              <span className="text-sm font-mono">Blockchain</span>
            </div>
            <div className="flex items-center space-x-2 text-cyber-400">
              <ShieldCheckIcon className="h-5 w-5 text-safety-400" />
              <span className="text-sm font-mono">Encryption</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
