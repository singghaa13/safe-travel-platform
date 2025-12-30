import { Link } from 'react-router-dom'
import { 
  ShieldCheckIcon, 
  UserGroupIcon, 
  MapPinIcon, 
  ClockIcon,
  GlobeAltIcon,
  HeartIcon,
  SparklesIcon,
  RocketLaunchIcon,
  CpuChipIcon,
  CommandLineIcon
} from '@heroicons/react/24/outline'

const HomePage = () => {
  const features = [
    {
      icon: ShieldCheckIcon,
      title: 'AI-Powered Safety',
      description: 'Advanced AI algorithms continuously monitor and verify all companions and experiences for your safety',
      gradient: 'from-safety-500 to-safety-600'
    },
    {
      icon: UserGroupIcon,
      title: 'Verified Companions',
      description: 'Connect with thoroughly vetted local guides and travel companions through blockchain verification',
      gradient: 'from-primary-500 to-primary-600'
    },
    {
      icon: MapPinIcon,
      title: 'Local Experiences',
      description: 'Discover authentic cultural experiences curated by AI and verified by local communities',
      gradient: 'from-accent-500 to-accent-600'
    },
    {
      icon: ClockIcon,
      title: '24/7 AI Support',
      description: 'Round-the-clock AI assistance and emergency support with real-time response',
      gradient: 'from-cyber-500 to-cyber-600'
    },
    {
      icon: GlobeAltIcon,
      title: 'Global Coverage',
      description: 'Safe travel options available in destinations worldwide with real-time safety updates',
      gradient: 'from-primary-500 to-primary-600'
    },
    {
      icon: HeartIcon,
      title: 'Personalized AI',
      description: 'AI-powered itineraries based on your preferences, safety needs, and real-time data',
      gradient: 'from-accent-500 to-accent-600'
    }
  ]

  const techFeatures = [
    {
      icon: CpuChipIcon,
      title: 'Blockchain Security',
      description: 'Immutable verification system ensuring trust and transparency',
      color: 'text-primary-400'
    },
    {
      icon: CommandLineIcon,
      title: 'AI Verification',
      description: 'Machine learning algorithms for real-time safety assessment',
      color: 'text-accent-400'
    },
    {
      icon: SparklesIcon,
      title: 'Smart Contracts',
      description: 'Automated safety protocols and emergency response systems',
      color: 'text-cyber-400'
    }
  ]

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-cyber-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Hero Section */}
      <section className="relative hero-pattern min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-cyber-900/80 via-cyber-800/60 to-cyber-700/40"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center space-x-2 bg-cyber-800/50 backdrop-blur-sm border border-cyber-700/50 rounded-full px-6 py-3 mb-8">
              <SparklesIcon className="h-5 w-5 text-primary-400" />
              <span className="text-cyber-200 text-sm font-medium">Next-Gen Travel Safety Platform</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-gradient">Travel Safe</span>
              <br />
              <span className="text-cyber-100">Travel Smart</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-cyber-200 mb-12 max-w-4xl mx-auto leading-relaxed">
              Experience the future of safe travel with AI-powered verification, blockchain security, 
              and real-time safety monitoring. Your trusted companion for secure adventures.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                to="/trip-planner"
                className="btn-primary group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <RocketLaunchIcon className="h-5 w-5" />
                  <span>Start Planning Your Trip</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-accent-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              
              <Link
                to="/companions"
                className="btn-secondary group"
              >
                <span className="flex items-center space-x-2">
                  <UserGroupIcon className="h-5 w-5" />
                  <span>Find Travel Companions</span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gradient">Why Choose</span>
              <br />
              <span className="text-cyber-100">Safe Travel Platform?</span>
            </h2>
            <p className="text-xl text-cyber-300 max-w-3xl mx-auto">
              We leverage cutting-edge technology to prioritize your safety and comfort with 
              comprehensive AI verification, real-time monitoring, and personalized experiences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="card-glass group hover:scale-105 transition-all duration-500 animate-slide-up"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-cyber-100 mb-4 group-hover:text-gradient transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-cyber-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Showcase */}
      <section className="py-24 bg-cyber-800/30 relative">
        <div className="absolute inset-0 grid-pattern opacity-20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gradient">Powered by</span>
              <br />
              <span className="text-cyber-100">Cutting-Edge Tech</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {techFeatures.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-cyber-800/50 backdrop-blur-sm border border-cyber-700/50 rounded-2xl mb-6 group-hover:border-cyber-600/50 transition-all duration-300">
                  <feature.icon className={`h-12 w-12 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold text-cyber-100 mb-3">{feature.title}</h3>
                <p className="text-cyber-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="card-glass">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gradient">Ready to Experience</span>
              <br />
              <span className="text-cyber-100">the Future of Travel?</span>
            </h2>
            <p className="text-xl text-cyber-300 mb-10 max-w-3xl mx-auto">
              Join thousands of travelers who trust our AI-powered platform for their safety and comfort. 
              Start planning your next adventure with cutting-edge technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/register"
                className="btn-accent group"
              >
                <span className="flex items-center space-x-2">
                  <SparklesIcon className="h-5 w-5" />
                  <span>Get Started Now</span>
                </span>
              </Link>
              <Link
                to="/trip-planner"
                className="btn-secondary"
              >
                Plan Your Trip
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Features */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-up">
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                <span className="text-gradient-safety">Your Safety is Our</span>
                <br />
                <span className="text-cyber-100">Mission</span>
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-safety-500 to-safety-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-cyber-100 mb-2">AI Background Verification</h3>
                    <p className="text-cyber-300">Advanced AI algorithms conduct thorough background checks on all companions</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-safety-500 to-safety-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-cyber-100 mb-2">Real-time AI Monitoring</h3>
                    <p className="text-cyber-300">Continuous AI-powered tracking and location sharing for your peace of mind</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-safety-500 to-safety-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-cyber-100 mb-2">24/7 AI Emergency Support</h3>
                    <p className="text-cyber-300">Immediate AI assistance and emergency response available anytime, anywhere</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card-glass text-center group hover:scale-105 transition-all duration-500">
              <div className="w-32 h-32 bg-gradient-to-br from-safety-500 to-safety-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <ShieldCheckIcon className="h-16 w-16 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-cyber-100 mb-4">AI-Powered SOS</h3>
              <p className="text-cyber-300 mb-6">
                One-tap emergency assistance with AI-powered response coordination
              </p>
              <button className="btn-safety w-full">
                Emergency SOS
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage

