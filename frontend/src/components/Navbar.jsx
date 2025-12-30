import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Bars3Icon, XMarkIcon, ShieldCheckIcon, UserIcon, ArrowRightOnRectangleIcon, SparklesIcon } from '@heroicons/react/24/outline'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Trip Planner', href: '/trip-planner' },
    { name: 'Companions', href: '/companions' },
    { name: 'Experiences', href: '/experiences' },
    { name: 'Dashboard', href: '/dashboard' },
  ]

  const isActive = (path) => location.pathname === path

  // Check authentication status on component mount and when location changes
  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    
    if (token && userData) {
      setIsAuthenticated(true)
      setUser(JSON.parse(userData))
    } else {
      setIsAuthenticated(false)
      setUser(null)
    }
  }, [location.pathname])

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
    setIsAuthenticated(false)
    setUser(null)
    navigate('/')
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-cyber-900/80 backdrop-blur-md border-b border-cyber-700/50 shadow-2xl' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <ShieldCheckIcon className="h-6 w-6 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gradient">Safe Travel</span>
                <span className="text-xs text-cyber-400 font-mono">Platform</span>
              </div>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 relative group ${
                  isActive(item.href)
                    ? 'text-primary-400 bg-cyber-800/50 border border-primary-500/30'
                    : 'text-cyber-300 hover:text-primary-400 hover:bg-cyber-800/30'
                }`}
              >
                {item.name}
                {isActive(item.href) && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-400 rounded-full"></div>
                )}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/10 to-accent-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            ))}
          </div>

          {/* Auth buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-3 bg-cyber-800/50 backdrop-blur-sm border border-cyber-700/50 rounded-xl px-4 py-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                    <UserIcon className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-cyber-200">
                    {user?.firstName || 'User'}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-cyber-400 hover:text-safety-400 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-cyber-800/30"
                >
                  <ArrowRightOnRectangleIcon className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-cyber-300 hover:text-primary-400 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-cyber-800/30"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-primary text-sm group"
                >
                  <span className="flex items-center space-x-2">
                    <SparklesIcon className="h-4 w-4" />
                    <span>Sign Up</span>
                  </span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-cyber-300 hover:text-primary-400 p-2 rounded-xl hover:bg-cyber-800/30 transition-all duration-300"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-4 pt-4 pb-6 space-y-2 bg-cyber-900/95 backdrop-blur-md border-t border-cyber-700/50">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                  isActive(item.href)
                    ? 'text-primary-400 bg-cyber-800/50 border border-primary-500/30'
                    : 'text-cyber-300 hover:text-primary-400 hover:bg-cyber-800/30'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 space-y-3 border-t border-cyber-700/50">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center space-x-3 px-4 py-3 bg-cyber-800/50 rounded-xl">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                      <UserIcon className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-base font-medium text-cyber-200">
                      {user?.firstName || 'User'}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout()
                      setIsOpen(false)
                    }}
                    className="w-full flex items-center justify-center space-x-2 text-cyber-400 hover:text-safety-400 px-4 py-3 text-base font-medium rounded-xl hover:bg-cyber-800/30 transition-all duration-300"
                  >
                    <ArrowRightOnRectangleIcon className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-4 py-3 text-base font-medium text-cyber-300 hover:text-primary-400 rounded-xl hover:bg-cyber-800/30 transition-all duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block px-4 py-3 text-base font-medium btn-primary text-center rounded-xl"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="flex items-center justify-center space-x-2">
                      <SparklesIcon className="h-5 w-5" />
                      <span>Sign Up</span>
                    </span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
