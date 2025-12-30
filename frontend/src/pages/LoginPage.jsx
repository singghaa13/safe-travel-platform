import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { EyeIcon, EyeSlashIcon, ShieldCheckIcon, SparklesIcon, CpuChipIcon, CommandLineIcon } from '@heroicons/react/24/outline'
import axios from 'axios'

const LoginPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Form submitted!')
    console.log('Form data:', formData)
    setError('')
    setIsLoading(true)
    
    try {
      // Try the full API first
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email: formData.email,
        password: formData.password
      })
      
      console.log('Login successful:', response.data)
      
      if (response.data.success && response.data.data) {
        // Store tokens in localStorage
        localStorage.setItem('token', response.data.data.token)
        localStorage.setItem('refreshToken', response.data.data.refreshToken)
        localStorage.setItem('user', JSON.stringify(response.data.data.user))
        
        // Show success message
        alert('Login successful! Redirecting to dashboard...')
        
        // Redirect to dashboard
        navigate('/dashboard')
      } else {
        setError('Login response format is invalid')
      }
    } catch (err) {
      console.error('Login error:', err)
      
      // If full API fails, try demo endpoint
      try {
        console.log('Trying demo login endpoint...')
        const demoResponse = await axios.post('http://localhost:5000/api/demo/login', {
          email: formData.email,
          password: formData.password
        })
        
        if (demoResponse.data.success && demoResponse.data.data) {
          // Store demo tokens in localStorage
          localStorage.setItem('token', demoResponse.data.data.token)
          localStorage.setItem('refreshToken', demoResponse.data.data.refreshToken)
          localStorage.setItem('user', JSON.stringify(demoResponse.data.data.user))
          localStorage.setItem('demoMode', 'true')
          
          // Show success message
          alert('Demo login successful! Redirecting to dashboard...')
          
          // Redirect to dashboard
          navigate('/dashboard')
        } else {
          setError('Demo login failed')
        }
      } catch (demoErr) {
        console.error('Demo login error:', demoErr)
        
        if (err.response?.data?.message) {
          setError(err.response.data.message)
        } else if (err.message) {
          setError(err.message)
        } else {
          setError('Login failed. Please check your credentials.')
        }
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
            Welcome Back
          </h2>
          <p className="text-cyber-300 text-lg">
            Sign in to your secure travel account
          </p>
          <p className="mt-2 text-sm text-cyber-400">
            Or{' '}
            <Link to="/register" className="font-medium text-primary-400 hover:text-primary-300 transition-colors duration-300">
              create a new account
            </Link>
          </p>
        </div>
      </div>

      <div className="relative z-10 mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="card-glass">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-safety-500/10 border border-safety-500/30 text-safety-400 px-4 py-3 rounded-xl backdrop-blur-sm">
                {error}
              </div>
            )}
            
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
                  <CpuChipIcon className="h-5 w-5 text-cyber-500" />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-cyber-200 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="input-field pr-10"
                  placeholder="Enter your password"
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

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-500 focus:ring-primary-400 border-cyber-600 rounded bg-cyber-800/50"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-cyber-300">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-primary-400 hover:text-primary-300 transition-colors duration-300">
                  Forgot password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="flex items-center justify-center space-x-2">
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <SparklesIcon className="h-5 w-5" />
                      <span>Sign in</span>
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
          <h3 className="text-lg font-semibold text-cyber-200 mb-4">Powered by Advanced Technology</h3>
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

export default LoginPage
