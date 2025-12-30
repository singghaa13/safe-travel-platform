import { Link } from 'react-router-dom'
import { ShieldCheckIcon, PhoneIcon, EnvelopeIcon, SparklesIcon, CpuChipIcon, GlobeAltIcon } from '@heroicons/react/24/outline'

const Footer = () => {
  return (
    <footer className="relative bg-cyber-900/80 backdrop-blur-sm border-t border-cyber-700/50">
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-10"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center">
                  <ShieldCheckIcon className="h-7 w-7 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl blur opacity-75"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-gradient">Safe Travel</span>
                <span className="text-sm text-cyber-400 font-mono">Platform</span>
              </div>
            </div>
            <p className="text-cyber-300 mb-6 max-w-md leading-relaxed">
              Experience the future of safe travel with AI-powered verification, blockchain security, 
              and real-time safety monitoring. Your trusted companion for secure adventures.
            </p>
            <div className="flex space-x-4">
              <button className="btn-safety group">
                <span className="flex items-center space-x-2">
                  <PhoneIcon className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                  <span>Emergency SOS</span>
                </span>
              </button>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-lg font-bold text-cyber-100 mb-6 flex items-center space-x-2">
              <SparklesIcon className="h-5 w-5 text-primary-400" />
              <span>Quick Links</span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/trip-planner" className="text-cyber-300 hover:text-primary-400 transition-all duration-300 flex items-center space-x-2 group">
                  <div className="w-1 h-1 bg-primary-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span>Trip Planner</span>
                </Link>
              </li>
              <li>
                <Link to="/companions" className="text-cyber-300 hover:text-primary-400 transition-all duration-300 flex items-center space-x-2 group">
                  <div className="w-1 h-1 bg-primary-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span>Travel Companions</span>
                </Link>
              </li>
              <li>
                <Link to="/experiences" className="text-cyber-300 hover:text-primary-400 transition-all duration-300 flex items-center space-x-2 group">
                  <div className="w-1 h-1 bg-primary-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span>Local Experiences</span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-cyber-300 hover:text-primary-400 transition-all duration-300 flex items-center space-x-2 group">
                  <div className="w-1 h-1 bg-primary-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span>Dashboard</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-bold text-cyber-100 mb-6 flex items-center space-x-2">
              <CpuChipIcon className="h-5 w-5 text-accent-400" />
              <span>Support</span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/help" className="text-cyber-300 hover:text-accent-400 transition-all duration-300 flex items-center space-x-2 group">
                  <div className="w-1 h-1 bg-accent-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span>Help Center</span>
                </Link>
              </li>
              <li>
                <Link to="/safety" className="text-cyber-300 hover:text-accent-400 transition-all duration-300 flex items-center space-x-2 group">
                  <div className="w-1 h-1 bg-accent-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span>Safety Guidelines</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-cyber-300 hover:text-accent-400 transition-all duration-300 flex items-center space-x-2 group">
                  <div className="w-1 h-1 bg-accent-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span>Contact Us</span>
                </Link>
              </li>
              <li className="flex items-center space-x-3 text-cyber-300">
                <div className="w-8 h-8 bg-gradient-to-br from-safety-500 to-safety-600 rounded-full flex items-center justify-center">
                  <PhoneIcon className="h-4 w-4 text-white" />
                </div>
                <span className="font-medium">24/7 AI Support</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Technology Badge */}
        <div className="mt-12 p-6 bg-cyber-800/50 backdrop-blur-sm border border-cyber-700/50 rounded-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="flex items-center space-x-2">
                <CpuChipIcon className="h-6 w-6 text-primary-400" />
                <span className="text-cyber-200 font-medium">AI-Powered</span>
              </div>
              <div className="flex items-center space-x-2">
                <GlobeAltIcon className="h-6 w-6 text-accent-400" />
                <span className="text-cyber-200 font-medium">Blockchain Secured</span>
              </div>
              <div className="flex items-center space-x-2">
                <SparklesIcon className="h-6 w-6 text-cyber-400" />
                <span className="text-cyber-200 font-medium">Real-time Monitoring</span>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-cyber-400 text-sm font-mono">Next-Generation Travel Safety</p>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-cyber-700/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-cyber-400 text-sm font-mono">
            © 2024 Safe Travel Platform. Powered by AI & Blockchain.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-cyber-400 hover:text-primary-400 text-sm transition-colors duration-300 font-mono">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-cyber-400 hover:text-primary-400 text-sm transition-colors duration-300 font-mono">
              Terms of Service
            </Link>
            <Link to="/cookies" className="text-cyber-400 hover:text-primary-400 text-sm transition-colors duration-300 font-mono">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
